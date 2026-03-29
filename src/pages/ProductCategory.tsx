import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCatalogProducts, getProductsByCategory } from '@/data/products';

const ProductCategory = () => {
  const { categoryId } = useParams();
  const normalizedCategoryId = categoryId?.toLowerCase().trim().replace(/\s+/g, '-') || '';

  const categoryData = {
    turtleneck: {
      name: 'Turtleneck Sweaters',
      description: 'Elegant and sophisticated turtleneck sweaters for a classic look'
    },
    cardigan: {
      name: 'Cardigans',
      description: 'Versatile cardigans perfect for layering and style'
    },
    'long-cardigans': {
      name: 'Long Cardigans',
      description: 'Elegant long cardigans for a cozy statement look'
    },
    'short-cardigans': {
      name: 'Short Cardigans',
      description: 'Chic short cardigans for everyday layering'
    },
    vneck: {
      name: 'V-Neck Sweaters',
      description: 'Flattering V-neck designs for a refined appearance'
    },
    pullover: {
      name: 'Pullovers',
      description: 'Cozy pullovers for ultimate comfort and warmth'
    },
    knit: {
      name: 'Knit Sweaters',
      description: 'Handcrafted knit sweaters with intricate patterns'
    },
    premium: {
      name: 'Premium Collection',
      description: 'Luxury woolen sweaters with the finest materials'
    }
  };

  const currentCategory = categoryData[normalizedCategoryId as keyof typeof categoryData] || categoryData.turtleneck;

  const productsFromCategory = normalizedCategoryId
    ? getProductsByCategory(normalizedCategoryId)
    : getCatalogProducts();
  const products = productsFromCategory.length ? productsFromCategory : [];
  const isEmpty = !productsFromCategory.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Category Header */}
        <section className="py-16 bg-gradient-to-b from-brand-cream to-background">
          <div className="container mx-auto px-4">
            <nav className="mb-8">
              <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                Collections
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-primary font-medium">{currentCategory.name}</span>
            </nav>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                {currentCategory.name}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {currentCategory.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isEmpty ? (
              <div className="text-center py-32">
                <h2 className="text-2xl font-semibold text-foreground mb-3">No products found</h2>
                <p className="text-muted-foreground mb-6">Try selecting another category or explore all products.</p>
                <Link to="/products">
                  <Button variant="outline">Back to Collections</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group block"
                  >
                    <Card className="overflow-hidden bg-card hover:shadow-xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {product.name}
                        </h3>
                        
                        <div className="mb-4">
                          <span className="text-sm text-muted-foreground block mb-2">Available Colors:</span>
                          <div className="flex gap-2">
                            {product.colors.map((color) => (
                              <span key={color.name} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                                {color.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <Button className="w-full" variant="secondary">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductCategory;