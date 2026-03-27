import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Box,
  ChevronRight,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  PackagePlus,
  Pencil,
  Search,
  Settings,
  Trash2,
  Upload,
} from "lucide-react";
import { products as catalogProducts } from "@/data/products";
import {
  clearAdminAuthenticated,
  getAdminAuthenticated,
  setAdminAuthenticated,
  validateAdminCredentials,
} from "@/data/adminAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type AdminSection = "dashboard" | "products" | "add-product" | "settings";

type SortOption =
  | "newest"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "stock-asc"
  | "stock-desc";

type AdminProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  colors: string[];
  description: string;
  images: string[];
  stock: number;
  createdAt: string;
  updatedAt: string;
};

type ProductForm = {
  name: string;
  category: string;
  price: string;
  sizes: string[];
  colors: string[];
  description: string;
  images: string[];
  stock: string;
};

const PRODUCT_STORAGE_KEY = "catalog-admin-products";
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

const seedProducts: AdminProduct[] = catalogProducts.map((item, index) => ({
  id: item.id,
  name: item.name,
  category: item.category ?? "General",
  price: 1499 + index * 180,
  sizes: item.sizes,
  colors: item.colors.map((color) => color.name),
  description: item.description,
  images: item.images,
  stock: 5 + ((index + 2) % 7) * 4,
  createdAt: new Date(Date.now() - (index + 1) * 86400000).toISOString(),
  updatedAt: new Date().toISOString(),
}));

const emptyForm: ProductForm = {
  name: "",
  category: "",
  price: "",
  sizes: [],
  colors: [],
  description: "",
  images: [],
  stock: "",
};

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image file"));
    reader.readAsDataURL(file);
  });
}

const AdminDashboard = () => {
  const { toast } = useToast();

  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [adminProducts, setAdminProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const [productForm, setProductForm] = useState<ProductForm>(emptyForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [colorDraft, setColorDraft] = useState("");
  const [imageUrlDraft, setImageUrlDraft] = useState("");
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  const [pendingDelete, setPendingDelete] = useState<AdminProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.title = "Admin Dashboard | ChaurasiyaHojiyari";
  }, []);

  useEffect(() => {
    const savedProducts = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts) as AdminProduct[];
        setAdminProducts(Array.isArray(parsed) ? parsed : seedProducts);
      } catch {
        setAdminProducts(seedProducts);
      }
    } else {
      setAdminProducts(seedProducts);
    }

    setIsAuthenticated(getAdminAuthenticated());

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 550);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (adminProducts.length > 0) {
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(adminProducts));
    }
  }, [adminProducts]);

  const categories = useMemo(() => {
    const values = Array.from(new Set(adminProducts.map((item) => item.category)));
    return values.sort((a, b) => a.localeCompare(b));
  }, [adminProducts]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const list = adminProducts.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.colors.some((color) => color.toLowerCase().includes(query));
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    return [...list].sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "stock-asc":
          return a.stock - b.stock;
        case "stock-desc":
          return b.stock - a.stock;
        case "newest":
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });
  }, [adminProducts, categoryFilter, searchTerm, sortOption]);

  const metrics = useMemo(() => {
    const totalStock = adminProducts.reduce((sum, item) => sum + item.stock, 0);
    const inventoryValue = adminProducts.reduce((sum, item) => sum + item.price * item.stock, 0);
    const lowStockCount = adminProducts.filter((item) => item.stock <= 5).length;
    return {
      totalProducts: adminProducts.length,
      totalStock,
      inventoryValue,
      lowStockCount,
    };
  }, [adminProducts]);

  const lowStockProducts = useMemo(
    () => adminProducts.filter((item) => item.stock <= 5).sort((a, b) => a.stock - b.stock),
    [adminProducts]
  );

  const navItems: { key: AdminSection; label: string; icon: typeof LayoutDashboard }[] = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "products", label: "Products", icon: Box },
    { key: "add-product", label: "Add Product", icon: PackagePlus },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  const onSizeToggle = (size: string) => {
    setProductForm((prev) => {
      if (prev.sizes.includes(size)) {
        return { ...prev, sizes: prev.sizes.filter((value) => value !== size) };
      }
      return { ...prev, sizes: [...prev.sizes, size] };
    });
  };

  const onAddColor = () => {
    const value = colorDraft.trim();
    if (!value) return;

    setProductForm((prev) => {
      if (prev.colors.some((item) => item.toLowerCase() === value.toLowerCase())) {
        return prev;
      }
      return { ...prev, colors: [...prev.colors, value] };
    });
    setColorDraft("");
  };

  const onRemoveColor = (color: string) => {
    setProductForm((prev) => ({ ...prev, colors: prev.colors.filter((item) => item !== color) }));
  };

  const onAddImageUrl = () => {
    const value = imageUrlDraft.trim();
    if (!value) return;

    setProductForm((prev) => ({ ...prev, images: [...prev.images, value] }));
    setImageUrlDraft("");
  };

  const onRemoveImage = (image: string) => {
    setProductForm((prev) => ({ ...prev, images: prev.images.filter((item) => item !== image) }));
  };

  const onUploadFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    try {
      setIsUploadingImages(true);
      const urls = await Promise.all(files.map((file) => readAsDataUrl(file)));
      setProductForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    } catch {
      toast({
        title: "Upload failed",
        description: "One or more images could not be processed.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImages(false);
      event.target.value = "";
    }
  };

  const validateForm = (form: ProductForm) => {
    const errors: Record<string, string> = {};

    if (form.name.trim().length < 2) {
      errors.name = "Product name must be at least 2 characters.";
    }
    if (form.category.trim().length < 2) {
      errors.category = "Category is required.";
    }

    const price = Number(form.price);
    if (!Number.isFinite(price) || price <= 0) {
      errors.price = "Price must be greater than 0.";
    }

    const stock = Number(form.stock);
    if (!Number.isInteger(stock) || stock < 0) {
      errors.stock = "Stock must be a non-negative whole number.";
    }

    if (form.sizes.length === 0) {
      errors.sizes = "Choose at least one size.";
    }

    if (form.colors.length === 0) {
      errors.colors = "Add at least one color.";
    }

    if (form.description.trim().length < 20) {
      errors.description = "Description should be at least 20 characters.";
    }

    if (form.images.length === 0) {
      errors.images = "Add at least one image URL or upload.";
    }

    return errors;
  };

  const resetForm = () => {
    setProductForm(emptyForm);
    setEditingProduct(null);
    setColorDraft("");
    setImageUrlDraft("");
    setFormErrors({});
  };

  const onOpenEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      sizes: product.sizes,
      colors: product.colors,
      description: product.description,
      images: product.images,
      stock: String(product.stock),
    });
    setFormErrors({});
    setIsFormDialogOpen(true);
  };

  const saveProduct = async (isInline: boolean) => {
    const errors = validateForm(productForm);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const payload = {
      name: productForm.name.trim(),
      category: productForm.category.trim(),
      price: Number(productForm.price),
      sizes: productForm.sizes,
      colors: productForm.colors,
      description: productForm.description.trim(),
      images: productForm.images,
      stock: Number(productForm.stock),
    };

    if (editingProduct) {
      setAdminProducts((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id
            ? { ...item, ...payload, updatedAt: new Date().toISOString() }
            : item
        )
      );
      toast({ title: "Product updated", description: "The product details were saved." });
    } else {
      const id = Math.max(0, ...adminProducts.map((item) => item.id)) + 1;
      const created: AdminProduct = {
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...payload,
      };
      setAdminProducts((prev) => [created, ...prev]);
      toast({ title: "Product added", description: "A new product is now in your catalog." });
    }

    setIsSubmitting(false);
    if (!isInline) {
      setIsFormDialogOpen(false);
    }
    resetForm();
    setActiveSection("products");
  };

  const deleteProduct = async () => {
    if (!pendingDelete) return;

    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 450));

    setAdminProducts((prev) => prev.filter((item) => item.id !== pendingDelete.id));
    setPendingDelete(null);
    setIsDeleting(false);

    toast({
      title: "Product deleted",
      description: "The product has been removed from your catalog.",
    });
  };

  const updateStock = (id: number, delta: number) => {
    setAdminProducts((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          stock: Math.max(0, item.stock + delta),
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast({
        title: "Missing credentials",
        description: "Enter email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoggingIn(true);
    await new Promise((resolve) => setTimeout(resolve, 550));

    if (validateAdminCredentials(email, password)) {
      setIsAuthenticated(true);
      setAdminAuthenticated(true);
      toast({ title: "Welcome back", description: "You are now signed in." });
      setEmail("");
      setPassword("");
    } else {
      toast({
        title: "Invalid login",
        description: "Check your admin email or password.",
        variant: "destructive",
      });
    }
    setIsLoggingIn(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    clearAdminAuthenticated();
    toast({ title: "Signed out", description: "Admin session ended." });
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="border-b border-border/80 px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Control Panel</p>
        <h2 className="mt-2 text-xl font-semibold text-foreground">Clothing Admin</h2>
      </div>
      <nav className="space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeSection === item.key;
          return (
            <Button
              key={item.key}
              variant="ghost"
              className={`w-full justify-start rounded-xl px-3 py-2.5 text-sm ${
                active ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-secondary"
              }`}
              onClick={() => setActiveSection(item.key)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
              {active && <ChevronRight className="ml-auto h-4 w-4" />}
            </Button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-border/80 p-4">
        <Button variant="outline" className="w-full" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  const ProductFormFields = () => (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="product-name">Product Name</Label>
        <Input
          id="product-name"
          value={productForm.name}
          onChange={(event) => setProductForm((prev) => ({ ...prev, name: event.target.value }))}
          placeholder="Premium Wool Cardigan"
        />
        {formErrors.name && <p className="text-xs text-destructive">{formErrors.name}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={productForm.category}
            onChange={(event) => setProductForm((prev) => ({ ...prev, category: event.target.value }))}
            placeholder="Long Cardigan"
          />
          {formErrors.category && <p className="text-xs text-destructive">{formErrors.category}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Price (INR)</Label>
          <Input
            id="price"
            type="number"
            min="0"
            value={productForm.price}
            onChange={(event) => setProductForm((prev) => ({ ...prev, price: event.target.value }))}
            placeholder="1999"
          />
          {formErrors.price && <p className="text-xs text-destructive">{formErrors.price}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            value={productForm.stock}
            onChange={(event) => setProductForm((prev) => ({ ...prev, stock: event.target.value }))}
            placeholder="10"
          />
          {formErrors.stock && <p className="text-xs text-destructive">{formErrors.stock}</p>}
        </div>
        <div className="grid gap-2">
          <Label>Available Sizes</Label>
          <div className="flex flex-wrap gap-2 rounded-md border border-input bg-background p-2">
            {SIZE_OPTIONS.map((size) => (
              <Button
                key={size}
                type="button"
                size="sm"
                variant={productForm.sizes.includes(size) ? "default" : "outline"}
                onClick={() => onSizeToggle(size)}
              >
                {size}
              </Button>
            ))}
          </div>
          {formErrors.sizes && <p className="text-xs text-destructive">{formErrors.sizes}</p>}
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Colors</Label>
        <div className="flex flex-wrap gap-2">
          {productForm.colors.map((color) => (
            <Badge key={color} className="cursor-pointer" onClick={() => onRemoveColor(color)}>
              {color} x
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={colorDraft}
            placeholder="Add color (e.g. Beige)"
            onChange={(event) => setColorDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onAddColor();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={onAddColor}>
            Add
          </Button>
        </div>
        {formErrors.colors && <p className="text-xs text-destructive">{formErrors.colors}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={productForm.description}
          onChange={(event) => setProductForm((prev) => ({ ...prev, description: event.target.value }))}
          placeholder="Write a short, attractive product description..."
        />
        {formErrors.description && <p className="text-xs text-destructive">{formErrors.description}</p>}
      </div>

      <div className="grid gap-2">
        <Label>Product Images</Label>
        <div className="flex gap-2">
          <Input
            value={imageUrlDraft}
            placeholder="Paste image URL"
            onChange={(event) => setImageUrlDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onAddImageUrl();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={onAddImageUrl}>
            Add URL
          </Button>
        </div>

        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-input bg-muted/30 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted">
          <Upload className="h-4 w-4" />
          {isUploadingImages ? "Uploading..." : "Upload image files"}
          <input type="file" accept="image/*" multiple className="hidden" onChange={onUploadFiles} />
        </label>

        {productForm.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {productForm.images.map((image, index) => (
              <div key={`${image}-${index}`} className="group relative overflow-hidden rounded-md border">
                <img src={image} alt={`Preview ${index + 1}`} className="h-28 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => onRemoveImage(image)}
                  className="absolute right-1 top-1 rounded bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {formErrors.images && <p className="text-xs text-destructive">{formErrors.images}</p>}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-secondary/40">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading admin experience...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,hsl(var(--brand-cream))_0%,hsl(var(--background))_45%,hsl(var(--secondary))_100%)] px-4 py-12">
        <header className="mx-auto mb-6 flex w-full max-w-5xl items-center justify-between rounded-2xl border border-border/70 bg-background/90 px-4 py-3 shadow-sm backdrop-blur md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Catalog Website</p>
            <h2 className="text-sm font-medium text-foreground md:text-base">Admin Login</h2>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to="/">Go to Home</Link>
          </Button>
        </header>

        <div className="mx-auto max-w-5xl rounded-3xl border border-border/70 bg-background/90 p-6 shadow-xl backdrop-blur md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Admin Access</p>
              <h1 className="mt-3 text-4xl font-semibold text-foreground">Manage Your Catalog Faster</h1>
              <p className="mt-3 text-muted-foreground">
                Secure sign-in gives you access to product management, inventory updates, media previews, and real-time catalog controls.
              </p>
            </div>

            <Card className="border-border/70 bg-card/90">
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Sign in to open your dashboard.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={onLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter password"
                    />
                  </div>
                  <Button className="w-full" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isLoggingIn ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,hsl(var(--brand-cream))_0%,hsl(var(--background))_40%,hsl(var(--secondary))_100%)]">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">E-commerce Admin</p>
              <h1 className="text-lg font-semibold text-foreground">Catalog Dashboard</h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Badge variant="secondary">{metrics.totalProducts} Products</Badge>
            <Badge variant={metrics.lowStockCount > 0 ? "destructive" : "default"}>
              {metrics.lowStockCount} Low Stock
            </Badge>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-0 px-2 py-4 md:px-4">
        <aside className="hidden w-72 rounded-2xl border border-border/70 bg-card/80 shadow-sm backdrop-blur md:block">
          <SidebarContent />
        </aside>

        <main className="flex-1 px-2 md:px-6">
          {activeSection === "dashboard" && (
            <section className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="bg-background/90">
                  <CardHeader className="pb-2">
                    <CardDescription>Total Products</CardDescription>
                    <CardTitle className="text-3xl">{metrics.totalProducts}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-background/90">
                  <CardHeader className="pb-2">
                    <CardDescription>Total Units in Stock</CardDescription>
                    <CardTitle className="text-3xl">{metrics.totalStock}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-background/90">
                  <CardHeader className="pb-2">
                    <CardDescription>Low Stock Products</CardDescription>
                    <CardTitle className="text-3xl">{metrics.lowStockCount}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-background/90">
                  <CardHeader className="pb-2">
                    <CardDescription>Inventory Value</CardDescription>
                    <CardTitle className="text-3xl">₹{metrics.inventoryValue.toLocaleString("en-IN")}</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BarChart3 className="h-5 w-5" />
                    Low Stock Watchlist
                  </CardTitle>
                  <CardDescription>Products at or below 5 units need restocking soon.</CardDescription>
                </CardHeader>
                <CardContent>
                  {lowStockProducts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Everything looks healthy. No low-stock products right now.</p>
                  ) : (
                    <div className="space-y-3">
                      {lowStockProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between rounded-xl border border-border/70 bg-secondary/20 px-4 py-3"
                        >
                          <div>
                            <p className="font-medium text-foreground">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                          </div>
                          <Badge variant="destructive">{product.stock} left</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          )}

          {activeSection === "products" && (
            <section className="space-y-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Product Management</CardTitle>
                  <CardDescription>Search, filter, sort, edit, and remove products from your catalog.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_auto]">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="Search by name, category, or color..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                      />
                    </div>

                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Recently Updated</SelectItem>
                        <SelectItem value="name-asc">Name A-Z</SelectItem>
                        <SelectItem value="name-desc">Name Z-A</SelectItem>
                        <SelectItem value="price-asc">Price Low-High</SelectItem>
                        <SelectItem value="price-desc">Price High-Low</SelectItem>
                        <SelectItem value="stock-asc">Stock Low-High</SelectItem>
                        <SelectItem value="stock-desc">Stock High-Low</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={viewMode === "table" ? "default" : "outline"}
                        onClick={() => setViewMode("table")}
                      >
                        Table
                      </Button>
                      <Button
                        type="button"
                        variant={viewMode === "cards" ? "default" : "outline"}
                        onClick={() => setViewMode("cards")}
                      >
                        Cards
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{filteredProducts.length} results</p>
                    <Button
                      onClick={() => {
                        resetForm();
                        setIsFormDialogOpen(true);
                      }}
                    >
                      <PackagePlus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </div>

                  {viewMode === "table" ? (
                    <div className="rounded-xl border border-border/70">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="h-12 w-12 rounded-md object-cover"
                                  />
                                  <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-xs text-muted-foreground">{product.sizes.join(", ")}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>₹{product.price.toLocaleString("en-IN")}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button size="icon" variant="outline" onClick={() => updateStock(product.id, -1)}>
                                    -
                                  </Button>
                                  <span className="min-w-8 text-center">{product.stock}</span>
                                  <Button size="icon" variant="outline" onClick={() => updateStock(product.id, 1)}>
                                    +
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" onClick={() => onOpenEdit(product)}>
                                    <Pencil className="mr-1 h-3.5 w-3.5" />
                                    Edit
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => setPendingDelete(product)}
                                  >
                                    <Trash2 className="mr-1 h-3.5 w-3.5" />
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {filteredProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden">
                          <img src={product.images[0]} alt={product.name} className="h-44 w-full object-cover" />
                          <CardContent className="space-y-3 p-4">
                            <div>
                              <h3 className="font-semibold text-foreground">{product.name}</h3>
                              <p className="text-xs text-muted-foreground">{product.category}</p>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <span>₹{product.price.toLocaleString("en-IN")}</span>
                              <Badge variant={product.stock <= 5 ? "destructive" : "secondary"}>
                                {product.stock} in stock
                              </Badge>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => updateStock(product.id, -1)}>
                                -1
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => updateStock(product.id, 1)}>
                                +1
                              </Button>
                            </div>

                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1" onClick={() => onOpenEdit(product)}>
                                <Pencil className="mr-1 h-3.5 w-3.5" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="flex-1"
                                onClick={() => setPendingDelete(product)}
                              >
                                <Trash2 className="mr-1 h-3.5 w-3.5" />
                                Delete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          )}

          {activeSection === "add-product" && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Add New Product</CardTitle>
                  <CardDescription>Create a product with full details, image previews, and inventory level.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ProductFormFields />

                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => saveProduct(true)} disabled={isSubmitting || isUploadingImages}>
                      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {isSubmitting ? "Saving..." : "Save Product"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Reset Form
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {activeSection === "settings" && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Settings</CardTitle>
                  <CardDescription>Basic admin controls and data management preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border border-border/70 bg-secondary/20 p-4">
                    <h3 className="font-medium text-foreground">Session</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You are signed in as <strong className="text-foreground">admin</strong>.
                    </p>
                    <Button className="mt-4" variant="outline" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-secondary/20 p-4">
                    <h3 className="font-medium text-foreground">Product Store</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Product changes in this dashboard persist in browser local storage.
                    </p>
                    <Button
                      className="mt-4"
                      variant="destructive"
                      onClick={() => {
                        localStorage.removeItem(PRODUCT_STORAGE_KEY);
                        setAdminProducts(seedProducts);
                        toast({ title: "Catalog reset", description: "Demo data restored." });
                      }}
                    >
                      Reset Demo Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </main>
      </div>

      <Dialog
        open={isFormDialogOpen}
        onOpenChange={(open) => {
          setIsFormDialogOpen(open);
          if (!open) {
            resetForm();
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct
                ? "Update product details, stock, and media."
                : "Create a new catalog item with full details."}
            </DialogDescription>
          </DialogHeader>

          <ProductFormFields />

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveProduct(false)} disabled={isSubmitting || isUploadingImages}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action removes {pendingDelete?.name ?? "the product"} from your catalog and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={deleteProduct}>
              {isDeleting ? "Deleting..." : "Delete Product"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;