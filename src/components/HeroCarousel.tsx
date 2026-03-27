import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { setAdminAuthenticated, validateAdminCredentials } from '@/data/adminAuth';
import carouselImage1 from '@/assets/Carousel Image/Carousel Img 1.png';
import carouselImage2 from '@/assets/Carousel Image/Carousel Img 2.png';
import carouselImage3 from '@/assets/Carousel Image/Carousel Img 3.png';

const HeroCarousel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [adminEmail, setAdminEmail] = useState('ritendratam404@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slides = [
    {
      id: 1,
      image: carouselImage1,
      imagePosition: 'center center',
      title: "Soft Floral Knit",
      subtitle: "Generated hero concept in your sample style",
      description: "Flat-lay cardigan visual with warm boutique backdrop and detailed knit texture"
    },
    {
      id: 2,
      image: carouselImage2,
      imagePosition: 'center center',
      title: "Classic Dot Motif",
      subtitle: "Generated hero concept in your sample style",
      description: "A clean sample-like composition focused on patterned knitwear and product-first framing"
    },
    {
      id: 3,
      image: carouselImage3,
      imagePosition: 'center center',
      title: "Cable Knit Essential",
      subtitle: "Generated hero concept in your sample style",
      description: "Textured cardigan artwork created for hero usage without relying on product folder photos"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const onAdminLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!adminEmail.trim() || !adminPassword.trim()) {
      toast({
        title: 'Missing credentials',
        description: 'Enter admin email and password.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 450));

    if (validateAdminCredentials(adminEmail, adminPassword)) {
      setAdminAuthenticated(true);
      toast({
        title: 'Admin logged in',
        description: 'Redirecting to dashboard...',
      });
      setAdminPassword('');
      navigate('/admin');
    } else {
      toast({
        title: 'Invalid credentials',
        description: 'Use the configured admin email and password.',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 carousel-slide ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: slide.imagePosition }}
              />
              <div className="absolute inset-0 bg-black/38"></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div className="text-center text-white md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 fade-in-up">
                      {slide.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium mb-6 slide-in-right">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl md:mx-0 mx-auto bounce-in">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start bounce-in">
                      <Button className="btn-hero" onClick={() => window.location.href = '/products'}>
                        View Collection
                      </Button>
                    </div>
                  </div>

                  <Card className="mx-auto w-full max-w-md border-white/20 bg-white/90 text-foreground backdrop-blur md:mx-0">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Lock className="h-4 w-4" />
                        Admin Login
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-3" onSubmit={onAdminLogin}>
                        <div className="space-y-1.5">
                          <Label htmlFor="hero-admin-email">Email</Label>
                          <Input
                            id="hero-admin-email"
                            type="email"
                            value={adminEmail}
                            onChange={(event) => setAdminEmail(event.target.value)}
                            placeholder="ritendratam404@gmail.com"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="hero-admin-password">Password</Label>
                          <Input
                            id="hero-admin-password"
                            type="password"
                            value={adminPassword}
                            onChange={(event) => setAdminPassword(event.target.value)}
                            placeholder="admin@123"
                          />
                        </div>
                        <Button className="w-full" type="submit" disabled={isSubmitting}>
                          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          {isSubmitting ? 'Signing in...' : 'Login to Admin'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary bg-black/20 hover:bg-white/20 rounded-full p-3 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary bg-black/20 hover:bg-white/20 rounded-full p-3 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;