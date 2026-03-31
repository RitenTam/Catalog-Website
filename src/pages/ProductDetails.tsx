import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductById } from '@/data/products';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const productIdValue = Number(productId);
  const product = getProductById(productIdValue);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!product) {
      // if product invalid, redirect to collection page
      navigate('/products', { replace: true });
      return;
    }

    setCurrentImageIndex(0);
  }, [product, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Product not found</h2>
          <p className="text-muted-foreground mb-6">We could not find that product at the moment.</p>
          <Link to="/products">
            <Button>Back to Collections</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                Collections
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <Link
                to={product?.categoryKey ? `/products/${product.categoryKey}` : '/products'}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {product?.category || 'Category'}
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-primary font-medium">{product?.name || 'Unknown Product'}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div>
                <div className="mb-4">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
                  />
                </div>
                <div className="flex gap-3 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-6">
                  {product.name}
                </h1>

                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    Code: {product.productCode}
                  </span>
                </div>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {product.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Available Sizes</h3>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Badge key={size} variant="secondary" className="text-sm">
                        {size}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mb-3">Available Colors</h3>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Badge key={color.name} variant="outline" className="text-sm">
                        {color.name}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mb-3">Variant Matrix</h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Rows are sizes and columns are colors.
                  </p>

                  <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full min-w-[460px] border-collapse text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border px-3 py-2 text-left font-semibold">Size / Color</th>
                          {product.colors.map((color) => (
                            <th key={color.name} className="border px-3 py-2 text-center font-semibold">
                              {color.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {product.sizes.map((size) => (
                          <tr key={size}>
                            <td className="border px-3 py-2 font-medium">{size}</td>
                            {product.colors.map((color) => (
                              <td key={`${size}-${color.name}`} className="border px-3 py-2 text-center text-muted-foreground">
                                Available
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Product Features */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Product Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;