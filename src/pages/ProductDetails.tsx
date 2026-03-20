import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MessageCircle, Minus, Plus } from 'lucide-react';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';

const ProductDetails = () => {
  const { productId } = useParams();
  const [selectedColor, setSelectedColor] = useState('Cream');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState<number | string>(1);

  const product = {
    id: productId,
    name: 'Classic Wool Turtleneck',
    images: [product1, product2, product3],
    colors: [
      { name: 'Cream', hex: '#F5F5DC' },
      { name: 'Beige', hex: '#F5F5DC' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Pink', hex: '#FFC0CB' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      '100% Premium Merino Wool',
      'Hand-knitted with care',
      'Machine washable (delicate cycle)',
      'Ribbed collar and cuffs',
      'Regular fit for comfortable wear',
      'Made in India with ethical practices'
    ],
    description: 'Experience ultimate comfort and elegance with our Classic Wool Turtleneck. Crafted from the finest merino wool, this sweater offers exceptional warmth and softness while maintaining a sophisticated silhouette perfect for any occasion.'
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setQuantity('');
    } else {
      const num = parseInt(val);
      if (!isNaN(num) && num > 0) {
        setQuantity(num);
      }
    }
  };

  const handleQuantityBlur = () => {
    if (quantity === '' || quantity === 0) {
      setQuantity(1);
    }
  };

  const handleWhatsAppInquiry = () => {
    const message = `Hi, I'm interested in the ${product.name} in ${selectedColor} color, size ${selectedSize}, quantity ${quantity}. Can you provide more details?`;
    const phoneNumber = '9779863651986';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

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
              <Link to="/products/turtleneck" className="text-muted-foreground hover:text-primary transition-colors">
                Turtleneck Sweaters
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-primary font-medium">{product.name}</span>
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

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Color: {selectedColor}</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-12 h-12 rounded-full border-4 transition-all ${
                          selectedColor === color.name ? 'border-primary scale-110' : 'border-muted'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Size: {selectedSize}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted bg-background hover:border-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, (Number(quantity) || 1) - 1))}
                      className="p-2 rounded-lg border border-muted hover:border-primary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      onBlur={handleQuantityBlur}
                      className="w-20 text-center"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity((Number(quantity) || 1) + 1)}
                      className="p-2 rounded-lg border border-muted hover:border-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Order Inquiry */}
                <Button className="w-full mb-8" size="lg" onClick={handleWhatsAppInquiry}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Order / Inquire on WhatsApp
                </Button>

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