import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import BestSellers from '@/components/BestSellers';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update page title and meta description
    document.title = 'ChaurasiyaHojiyari - Premium Woolen Sweaters for Women';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover elegant woolen sweaters for women aged 30-70. Premium quality cardigans, turtlenecks, and pullovers crafted for comfort and sophistication.');
    }

    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ClothingStore",
      "name": "ChaurasiyaHojiyari",
      "description": "Premium woolen sweaters and knitwear for sophisticated women",
      "url": window.location.origin,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Fashion Street, Textile District",
        "addressLocality": "New Delhi",
        "addressCountry": "IN",
        "postalCode": "110001"
      },
      "telephone": "+91-12345-67890",
      "email": "info@chaurasiyahojiyari.com",
      "priceRange": "₹₹",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Woolen Sweaters Collection",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Woolen Cardigans",
              "category": "Women's Clothing"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Product",
              "name": "Turtleneck Sweaters",
              "category": "Women's Clothing"
            }
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Clean up structured data script
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Semantic HTML structure for better SEO */}
      <Header />
      
      <main role="main">
        <HeroCarousel />
        <BestSellers />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;