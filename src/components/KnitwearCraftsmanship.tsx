import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const KnitwearCraftsmanship = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Import images from assets
  const craftImages = [
    {
      id: 1,
      title: 'Hand Selection of Yarn',
      description: 'Our artisans carefully select premium merino wool and cashmere blends',
      image: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad1%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:rgb(193,154,107);stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:rgb(218,180,150);stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad1)%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 font-size=%2228%22 fill=%22white%22 text-anchor=%22middle%22 font-family=%22Arial%22%3E🧵 Premium Yarn Selection%3C/text%3E%3C/svg%3E")',
    },
    {
      id: 2,
      title: 'Traditional Knitting',
      description: 'Expert hands craftwork each piece using time-honored techniques',
      image: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad2%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:rgb(169,169,169);stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:rgb(211,211,211);stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad2)%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 font-size=%2224%22 fill=%22white%22 text-anchor=%22middle%22 font-family=%22Arial%22%3E👥 Master Craftsmen at Work%3C/text%3E%3C/svg%3E")',
    },
    {
      id: 3,
      title: 'Quality Inspection',
      description: 'Each sweater undergoes rigorous quality control checks',
      image: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad3%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:rgb(255,228,181);stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:rgb(255,228,225);stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad3)%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 font-size=%2224%22 fill=%22white%22 text-anchor=%22middle%22 font-family=%22Arial%22%3E✓ Quality Assurance%3C/text%3E%3C/svg%3E")',
    },
    {
      id: 4,
      title: 'Finishing Touches',
      description: 'Expert finishing creates the perfect silhouette and comfort',
      image: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad4%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:rgb(199,167,135);stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:rgb(227,195,165);stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad4)%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 font-size=%2224%22 fill=%22white%22 text-anchor=%22middle%22 font-family=%22Arial%22%3E✨ Premium Finishing%3C/text%3E%3C/svg%3E")',
    }
  ];

  const processSteps = [
    {
      icon: '🧵',
      title: 'Yarn Selection',
      description: 'We source the finest merino wool and cashmere from premium suppliers worldwide.'
    },
    {
      icon: '👩‍🦰',
      title: 'Master Craftsmanship',
      description: 'Our skilled artisans hand-knit each sweater with precision and care.'
    },
    {
      icon: '🔍',
      title: 'Quality Control',
      description: 'Every piece is inspected multiple times to ensure perfection.'
    },
    {
      icon: '📦',
      title: 'Careful Packaging',
      description: 'Each sweater is thoughtfully packaged and ready for you.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-brand-cream/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Craftsmanship & Heritage
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the artistry and dedication behind every ChaurasiyaHojiyari sweater. 
            Each piece is a testament to our commitment to quality and timeless elegance.
          </p>
        </div>

        {/* Image Carousel Section */}
        <div className="mb-16">
          <div className="relative bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl overflow-hidden shadow-lg mb-8">
            {/* Main Image Display */}
            <div
              className="w-full h-96 md:h-[500px] flex items-center justify-center text-white font-bold relative"
              style={{
                backgroundImage: craftImages[activeTab].image,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col items-center justify-end pb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-white text-center px-4 mb-2">
                  {craftImages[activeTab].title}
                </h3>
                <p className="text-lg text-white/90 text-center px-4 max-w-2xl">
                  {craftImages[activeTab].description}
                </p>
              </div>
            </div>

            {/* Navigation Controls */}
            <button
              onClick={() => setActiveTab((prev) => (prev - 1 + craftImages.length) % craftImages.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            <button
              onClick={() => setActiveTab((prev) => (prev + 1) % craftImages.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {craftImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    idx === activeTab ? 'bg-white w-8' : 'bg-white/50 w-3'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {craftImages.map((image, idx) => (
              <button
                key={image.id}
                onClick={() => setActiveTab(idx)}
                className={`relative h-32 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                  idx === activeTab ? 'border-primary shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: image.image,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {processSteps.map((step, idx) => (
            <Card key={idx} className="card-shadow hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-5xl mb-4 text-center">{step.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-center">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-white rounded-xl p-8 md:p-12 shadow-md">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Why Our Craftsmanship Matters
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Every ChaurasiyaHojiyari sweater is more than just clothing—it's a wearable work of art. 
              Our artisans, many with decades of experience, pour their passion and expertise into every stitch. 
              We maintain the highest standards of quality while honoring traditional knitwear-making techniques 
              that have been perfected over generations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <h4 className="text-3xl font-bold text-primary mb-2">100%</h4>
                <p className="text-muted-foreground">Hand-crafted quality</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-primary mb-2">25+</h4>
                <p className="text-muted-foreground">Years of expertise</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-primary mb-2">Premium</h4>
                <p className="text-muted-foreground">Materials sourced globally</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnitwearCraftsmanship;
