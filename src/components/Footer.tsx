import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const quickLinks = [
    { name: 'Product', href: '/products' },
    { name: 'About Us', href: '#about' }
  ];

  const categories = [
    'Turtleneck Sweaters',
    'Cardigans',
    'V-Neck Sweaters', 
    'Pullovers',
    'Knit Sweaters',
    'Premium Collection'
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">ChaurasiyaHojiyari</h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Crafting elegant woolen sweaters for sophisticated women. Experience the perfect blend of comfort, style, and premium quality in every piece.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="p-2 hover:bg-primary-foreground/10" asChild>
                <a href="https://www.facebook.com/profile.php?id=100092708685384" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5" />
                </a>
              </Button>
              <Button size="sm" variant="ghost" className="p-2 hover:bg-primary-foreground/10" asChild>
                <a href="https://wa.me/9779863651986" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="footer-link text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Collections</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href="#products"
                    className="footer-link text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-foreground/80 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    Ganabaha Marg, Lagan Chowk<br />
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-foreground/80 flex-shrink-0" />
                <div>
                  <a href="tel:+9779863651986" className="footer-link text-primary-foreground/80 hover:text-primary-foreground">
                    9863651986
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-foreground/80 flex-shrink-0" />
                <div>
                  <a href="mailto:contact@chaurasiyahojiyari.com" className="footer-link text-primary-foreground/80 hover:text-primary-foreground">
                    contact@chaurasiyahojiyari.com
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-primary-foreground/80 flex-shrink-0" />
                <div>
                  <a href="https://wa.me/9779863651986" className="footer-link text-primary-foreground/80 hover:text-primary-foreground">
                    WhatsApp: 9863651986
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Map */}
            <div className="order-2 lg:order-1">
              <h4 className="text-lg font-semibold mb-4">Visit Our Store</h4>
              <div className="rounded-lg overflow-hidden elegant-shadow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.7!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a29e8c0b9%3A0x1234567890abcdef!2sGanabaha+Marg%2C+Lagan+Chowk%2C+Kathmandu%2C+Nepal!5e0!3m2!1sen!2snp!4v1234567890"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ChaurasiyaHojiyari Store Location"
                ></iframe>
              </div>
            </div>

            {/* Why Visit Us */}
            <div className="order-1 lg:order-2">
              <h4 className="text-lg font-semibold mb-4">Why Visit Us?</h4>
              <ul className="list-disc list-inside space-y-2 text-primary-foreground/80">
                <li>✔ Try before you buy</li>
                <li>✔ Exclusive in-store collection</li>
                <li>✔ Personalized fitting</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/70 text-center md:text-left">
              <p>&copy; 2024 ChaurasiyaHojiyari. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#terms" className="footer-link text-primary-foreground/70 hover:text-primary-foreground">
                Terms & Conditions
              </a>
              <a href="#privacy" className="footer-link text-primary-foreground/70 hover:text-primary-foreground">
                Privacy Policy
              </a>
              <a href="#shipping" className="footer-link text-primary-foreground/70 hover:text-primary-foreground">
                Shipping Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;