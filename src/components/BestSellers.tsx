import { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { products as allProducts } from '@/data/products';

const BestSellers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const products = allProducts.slice(0, 6);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.querySelector('.products-slider');
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleWhatsAppInquiry = (product: any) => {
    const message = `Hi, I'm interested in ${product.name}. Can you provide more details?`;
    const phoneNumber = '9779863651986';
    
    // Detect if user is on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let whatsappUrl;
    if (isMobile) {
      // Use whatsapp:// scheme for mobile app
      whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    } else {
      // Use web WhatsApp for desktop
      whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    }
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="products" className="py-16 bg-gradient-to-b from-background to-brand-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Best Sellers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved woolen sweaters, carefully crafted for comfort and elegance
          </p>
        </div>

        {/* Products Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          {/* Products Slider */}
          <div
            className="products-slider flex overflow-x-auto scroll-smooth gap-6 px-12 py-4 scrollbar-hide"
          >
            {products.map((product) => (
              <Card key={product.id} className="product-card group flex-shrink-0 w-72 bg-card">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  
                  {/* Product Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Best Seller
                    </span>
                  </div>


                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      className="btn-secondary"
                      onClick={() => handleWhatsAppInquiry(product)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Inquire
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 text-foreground truncate">
                    {product.name}
                  </h3>
                  

                  <div className="flex items-center justify-center">
                    <Button 
                      size="sm" 
                      className="btn-outline w-full"
                      onClick={() => window.location.href = `/product/${product.id}`}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button className="btn-hero" onClick={() => window.location.href = '/products'}>
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;