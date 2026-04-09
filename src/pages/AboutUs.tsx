import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, Award, Leaf } from 'lucide-react';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-brand-cream to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              About ChaurasiyaHojiyari
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Crafting warmth, comfort, and elegance through premium woolen sweaters 
              for the discerning modern woman.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Story</h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p className="text-lg leading-relaxed">
                  ChaurasiyaHojiyari was born from a simple yet powerful vision: to create beautiful, 
                  comfortable woolen sweaters that celebrate the grace and sophistication of women 
                  aged 30-70. Founded with deep respect for traditional craftsmanship and modern 
                  design sensibilities, our brand represents the perfect fusion of heritage and innovation.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Our journey began when our founders recognized a gap in the market for premium 
                  woolen garments that truly understood the needs of mature, confident women. 
                  We believed that fashion should not only be beautiful but also comfortable, 
                  practical, and age-appropriate without compromising on style.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Each ChaurasiyaHojiyari sweater is meticulously crafted using the finest merino wool 
                  and traditional knitting techniques passed down through generations. Our artisans, 
                  many of whom have been with us since our inception, bring decades of expertise 
                  to every stitch, ensuring that each piece meets our exacting standards of quality and comfort.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Based in the heart of India, we draw inspiration from rich cultural heritage 
                  while embracing contemporary design trends. Our colors are carefully chosen to 
                  complement the sophisticated palette preferences of our clientele - from elegant 
                  creams and warm beiges to rich maroons and soft greys.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-brand-cream/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-12 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-shadow text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Passion</h3>
                  <p className="text-muted-foreground">
                    Every sweater is crafted with love and attention to detail, 
                    reflecting our passion for creating beautiful garments.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-shadow text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Quality</h3>
                  <p className="text-muted-foreground">
                    We use only the finest materials and time-tested techniques 
                    to ensure durability and comfort in every piece.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-shadow text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Community</h3>
                  <p className="text-muted-foreground">
                    We support local artisans and ethical practices, 
                    building a community of skilled craftspeople.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-shadow text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Sustainability</h3>
                  <p className="text-muted-foreground">
                    Committed to sustainable practices and eco-friendly materials 
                    for a better tomorrow.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-8">Our Mission</h2>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8">
                <p className="text-xl text-foreground font-medium leading-relaxed">
                  "To empower women with timeless, comfortable, and elegant woolen sweaters 
                  that enhance their confidence and celebrate their individual style. 
                  We are committed to preserving traditional craftsmanship while embracing 
                  modern design, creating garments that are not just worn, but cherished."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-brand-cream/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Experience ChaurasiyaHojiyari</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover our collection of premium woolen sweaters and experience 
              the perfect blend of comfort, quality, and elegance.
            </p>
            <div className="space-x-4">
              <button 
                onClick={() => navigate('/products')}
                className="btn-hero px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 elegant-shadow bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Shop Collection
              </button>
              <button 
                onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;