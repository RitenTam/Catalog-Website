import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductById } from '@/data/products';
import { getOrCreateAnalyticsSessionId, recordWhatsAppClick } from '@/data/whatsappAnalytics';

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

  const handleWhatsAppInquiry = () => {
    if (!product) return;

    recordWhatsAppClick({
      productId: product.id,
      productName: product.name,
      productCategory: product.category,
      source: 'product-details',
      sessionId: getOrCreateAnalyticsSessionId(),
    });

    const message = `Hi, I'm interested in ${product.name} (Code: ${product.productCode}). Please share price and availability.`;
    const phoneNumber = '9779863651986';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

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

                  <Button onClick={handleWhatsAppInquiry} className="w-full sm:w-auto">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Buy / Inquire on WhatsApp
                  </Button>
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