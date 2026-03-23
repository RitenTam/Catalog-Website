import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';

export type Product = {
  id: number;
  name: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  features: string[];
  description: string;
  category?: string;
  image?: string;
};

export const products: Product[] = [
  {
    id: 1,
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
    description: 'Experience ultimate comfort and elegance with our Classic Wool Turtleneck. Crafted from the finest merino wool, this sweater offers exceptional warmth and softness while maintaining a sophisticated silhouette perfect for any occasion.',
    category: 'Turtleneck',
    image: product1
  },
  {
    id: 2,
    name: 'Premium Cashmere Blend',
    images: [product2, product3, product1],
    colors: [
      { name: 'Pink', hex: '#FFC0CB' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#001F3F' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Cashmere blend for luxurious softness',
      'Lightweight but warm',
      'Fine ribbed collar and sleeve cuffs',
      'Breathable and skin friendly',
      'Modern fit for everyday wear'
    ],
    description: 'Our Premium Cashmere Blend sweater combines heavenly softness with refined style. Made from a premium blend of cashmere and wool, it provides a breathable warmth while maintaining a polished finish.',
    category: 'Cardigan',
    image: product2
  },
  {
    id: 3,
    name: 'Soft Merino Wool',
    images: [product3, product1, product2],
    colors: [
      { name: 'Grey', hex: '#808080' },
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Soft Merino Wool fabric',
      'Durable knit with shape retention',
      'Moisture-wicking performance',
      'Classic fit with modern details'
    ],
    description: 'Soft Merino Wool sweater is an everyday essential with natural insulation and breathable comfort. Perfect for layering in cooler weather or wearing on its own for a clean look.',
    category: 'Pullover',
    image: product3
  }
];

export function getProductById(id: number) {
  return products.find((item) => item.id === id);
}

export function getProductsByCategory(categoryKey: string) {
  return products.filter((item) =>
    item.category?.toLowerCase().includes(categoryKey.toLowerCase())
  );
}
