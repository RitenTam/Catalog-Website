import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import longCardigan1 from '@/assets/Long-Cardigan 1.jpg';
import longCardigan2 from '@/assets/Long-Cardigan 2.jpg';
import longCardigan3 from '@/assets/Long-Cardigan 3.jpg';
import longCardigan4 from '@/assets/Long-Cardigan 4.jpg';
import longCardigan5 from '@/assets/Long-Cardigan 5.jpg';
import longCardigan6 from '@/assets/Long-Cardigan 6.jpg';
import longCardigan7 from '@/assets/Long-Cardigan 7.jpg';
import longCardigan8 from '@/assets/Long-Cardigan 8.jpg';
import longCardigan9 from '@/assets/Long-Cardigan 9.jpg';

const ProductCategory = () => {
  const { categoryId } = useParams();

  const categoryData = {
    turtleneck: {
      name: 'Turtleneck Sweaters',
      description: 'Elegant and sophisticated turtleneck sweaters for a classic look'
    },
    cardigan: {
      name: 'Cardigans',
      description: 'Versatile cardigans perfect for layering and style'
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

  const currentCategory = categoryData[categoryId as keyof typeof categoryData] || categoryData.turtleneck;

  const getProductsForCategory = (categoryId: string) => {
    switch (categoryId) {
      case 'cardigan':
        return [
          { id: 1, name: 'Long Cardigan Style 1', image: longCardigan1, colors: ['Cream', 'Beige', 'Grey'] },
          { id: 2, name: 'Long Cardigan Style 2', image: longCardigan2, colors: ['Pink', 'White', 'Navy'] },
          { id: 3, name: 'Long Cardigan Style 3', image: longCardigan3, colors: ['Grey', 'Black', 'Brown'] },
          { id: 4, name: 'Long Cardigan Style 4', image: longCardigan4, colors: ['Maroon', 'Purple', 'Green'] },
          { id: 5, name: 'Long Cardigan Style 5', image: longCardigan5, colors: ['Pink', 'Coral', 'Peach'] },
          { id: 6, name: 'Long Cardigan Style 6', image: longCardigan6, colors: ['Camel', 'Ivory', 'Charcoal'] },
          { id: 7, name: 'Long Cardigan Style 7', image: longCardigan7, colors: ['Cream', 'Beige', 'Grey'] },
          { id: 8, name: 'Long Cardigan Style 8', image: longCardigan8, colors: ['Pink', 'White', 'Navy'] },
          { id: 9, name: 'Long Cardigan Style 9', image: longCardigan9, colors: ['Grey', 'Black', 'Brown'] }
        ];
      default:
        return [
          { id: 1, name: 'Classic Wool Turtleneck', image: product1, colors: ['Cream', 'Beige', 'Grey'] },
          { id: 2, name: 'Premium Cashmere Blend', image: product2, colors: ['Pink', 'White', 'Navy'] },
          { id: 3, name: 'Soft Merino Wool', image: product3, colors: ['Grey', 'Black', 'Brown'] },
          { id: 4, name: 'Elegant Ribbed Design', image: product1, colors: ['Maroon', 'Purple', 'Green'] },
          { id: 5, name: 'Cozy Winter Blend', image: product2, colors: ['Pink', 'Coral', 'Peach'] },
          { id: 6, name: 'Luxurious Alpaca Wool', image: product3, colors: ['Camel', 'Ivory', 'Charcoal'] }
        ];
    }
  };

  const products = getProductsForCategory(categoryId || 'turtleneck');

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="group overflow-hidden bg-card hover:shadow-xl transition-all duration-300">
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
                          <span key={color} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <Link to={`/product/${product.id}`}>
                        <Button className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductCategory;