import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import carouselImage1 from '@/assets/Carousel Image/Carousel Img 1.png';
import carouselImage2 from '@/assets/Carousel Image/Carousel Img 2.png';
import carouselImage3 from '@/assets/Carousel Image/Carousel Img 3.png';

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

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
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="mx-auto w-full max-w-4xl px-4">
                  <div className="text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 fade-in-up">
                      {slide.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium mb-6 slide-in-right">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto bounce-in">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center bounce-in">
                      <Button className="btn-hero" onClick={() => navigate('/products')}>
                        View Collection
                      </Button>
                    </div>
                  </div>
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