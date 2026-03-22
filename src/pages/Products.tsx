import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';

const Products = () => {
  const categories = [
    {
      id: 'long-cardigans',
      name: 'Long Cardigans',
      image: product2,
      description: 'Elegant long cardigans for a cozy, statement look',
      itemCount: 18
    },
    {
      id: 'short-cardigans',
      name: 'Short Cardigans',
      image: product3,
      description: 'Stylish short cardigans for everyday layering',
      itemCount: 12
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 bg-gradient-to-b from-brand-cream to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Our Collections
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated collection of premium woolen sweaters, 
              designed for the modern woman who values both style and comfort.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Card key={category.id} className="group overflow-hidden bg-card hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link to={`/products/${category.id}`}>
                        <Button className="w-full bg-white text-primary hover:bg-white/90">
                          View Collection
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.itemCount} items
                      </span>
                      <Link to={`/products/${category.id}`}>
                        <Button variant="outline" size="sm">
                          Explore
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

export default Products;