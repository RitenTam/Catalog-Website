import product1 from '@/assets/ShortCardiganPhotos/Short Cardigan (1).jpg';
import product2 from '@/assets/ShortCardiganPhotos/Short Cardigan (2).jpg';
import product3 from '@/assets/ShortCardiganPhotos/Short Cardigan (3).jpg';
import shortCardigan1 from '@/assets/ShortCardiganPhotos/Short Cardigan (1).jpg';
import shortCardigan2 from '@/assets/ShortCardiganPhotos/Short Cardigan (2).jpg';
import shortCardigan3 from '@/assets/ShortCardiganPhotos/Short Cardigan (3).jpg';
import longCardigan1 from '@/assets/LongCardiganPhotos/Long Cardigan (1).jpg';
import longCardigan2 from '@/assets/LongCardiganPhotos/Long Cardigan (2).jpg';
import longCardigan3 from '@/assets/LongCardiganPhotos/Long Cardigan (3).jpg';

export const PRODUCT_STORAGE_KEY = 'catalog-admin-products';
export const CATALOG_PRODUCTS_UPDATED_EVENT = 'catalog-products-updated';

export type Product = {
  id: number;
  name: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  features: string[];
  description: string;
  category?: string;
  categoryKey?: string;
  image?: string;
};

type StoredAdminProduct = {
  id: number;
  name: string;
  category?: string;
  price?: number;
  sizes?: string[];
  colors?: string[];
  description?: string;
  images?: string[];
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Classic Wool Turtleneck',
    category: 'Turtleneck',
    categoryKey: 'turtleneck',
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
    image: product1
  },
  {
    id: 2,
    name: 'Premium Cashmere Blend',
    category: 'Cardigan',
    categoryKey: 'cardigan',
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
    image: product2
  },
  {
    id: 3,
    name: 'Soft Merino Wool',
    category: 'Pullover',
    categoryKey: 'pullover',
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
    image: product3
  },
  {
    id: 4,
    name: 'Long Cardigan Style 1',
    category: 'Long Cardigan',
    categoryKey: 'long-cardigans',
    images: [longCardigan1, longCardigan2, longCardigan3],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Charcoal', hex: '#36454F' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Long-line warm fit',
      'Soft knit fabric',
      'Functional side pockets',
      'Versatile layering piece'
    ],
    description: 'Long Cardigan Style 1 offers cozy warmth and elegant length for cooler days. Perfect for pairing with jeans or dresses.',
    image: longCardigan1
  },
  {
    id: 5,
    name: 'Short Cardigan Style 1',
    category: 'Short Cardigan',
    categoryKey: 'short-cardigans',
    images: [shortCardigan1, shortCardigan2, shortCardigan3],
    colors: [
      { name: 'Maroon', hex: '#800000' },
      { name: 'Teal', hex: '#008080' },
      { name: 'Cream', hex: '#FFFDD0' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Cropped flattering fit',
      'Lightweight cozy yarn',
      'Easy on/off button front',
      'Fall-to-spring styling'
    ],
    description: 'Short Cardigan Style 1 is a versatile layering item with polished finish. The perfect lightweight knit for transitional weather.',
    image: shortCardigan1
  },
  {
    id: 6,
    name: 'Long Cardigan Style 2',
    category: 'Long Cardigan',
    categoryKey: 'long-cardigans',
    images: [longCardigan1, longCardigan2, longCardigan3],
    colors: [
      { name: 'Olive', hex: '#808000' },
      { name: 'Smoke', hex: '#778899' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Soft brushed knit',
      'Deep front pockets',
      'Open-front design',
      'Relaxed drape'
    ],
    description: 'Long Cardigan Style 2 is a comfortable, statement-making layer built for all-day softness and effortless pairing with both dresses and denim.',
    image: longCardigan1
  },
  {
    id: 7,
    name: 'Short Cardigan Style 2',
    category: 'Short Cardigan',
    categoryKey: 'short-cardigans',
    images: [shortCardigan1, shortCardigan2, shortCardigan3],
    colors: [
      { name: 'Blush', hex: '#FFDAB9' },
      { name: 'Navy', hex: '#001F3F' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Button-up front',
      'Soft cashmere blend feel',
      'Ribbed waistband',
      'Cropped silhouette'
    ],
    description: 'Short Cardigan Style 2 has a polished, modern cut that works for office layering and casual weekend outfits. Excellent with high-waist bottoms.',
    image: shortCardigan1
  },
  {
    id: 8,
    name: 'Long Cardigan Style 3',
    category: 'Long Cardigan',
    categoryKey: 'long-cardigans',
    images: [longCardigan1, longCardigan2, longCardigan3],
    colors: [
      { name: 'Sand', hex: '#C2B280' },
      { name: 'Pearl', hex: '#F8F8FF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Textured weave',
      'Mid-calf coverage',
      'Soft shawl collar',
      'Heavyweight cozy knit'
    ],
    description: 'Long Cardigan Style 3 brings bold texture and extra warmth with its full length, perfect for cooler climates and stylish layering needs.',
    image: longCardigan1
  }
];

function slugifyCategory(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function mapStoredToProduct(item: StoredAdminProduct, index: number): Product {
  const fallbackImage = products[index % products.length]?.image;
  const category = item.category?.trim() || 'General';

  return {
    id: item.id,
    name: item.name,
    images: Array.isArray(item.images) && item.images.length > 0
      ? item.images
      : fallbackImage
        ? [fallbackImage]
        : [],
    colors: Array.isArray(item.colors) && item.colors.length > 0
      ? item.colors.map((name) => ({ name, hex: '#6b7280' }))
      : [{ name: 'Default', hex: '#6b7280' }],
    sizes: Array.isArray(item.sizes) && item.sizes.length > 0 ? item.sizes : ['M'],
    features: ['Premium knitwear', 'Comfort fit', 'Carefully curated for everyday wear'],
    description: item.description?.trim() || 'Premium woolen product from our latest collection.',
    category,
    categoryKey: slugifyCategory(category),
    image: (Array.isArray(item.images) && item.images[0]) || fallbackImage,
  };
}

export function getCatalogProducts(): Product[] {
  if (typeof window === 'undefined') {
    return products;
  }

  try {
    const stored = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!stored) {
      return products;
    }

    const parsed = JSON.parse(stored) as StoredAdminProduct[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return products;
    }

    return parsed.map((item, index) => mapStoredToProduct(item, index));
  } catch {
    return products;
  }
}

export function notifyCatalogProductsChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(CATALOG_PRODUCTS_UPDATED_EVENT));
  }
}

export function getProductById(id: number) {
  return getCatalogProducts().find((item) => item.id === id);
}

export function getProductsByCategory(categoryKey: string) {
  const allProducts = getCatalogProducts();
  const slug = categoryKey?.toLowerCase().trim();
  if (!slug) return allProducts;

  return allProducts.filter((item) => {
    const key = item.categoryKey?.toLowerCase().trim() || '';
    const category = item.category?.toLowerCase().trim() || '';

    if (key === slug) return true;
    if (slug === 'cardigan' && category.includes('cardigan')) return true;
    if (slug === 'turtleneck' && category.includes('turtleneck')) return true;

    return category.includes(slug) || key.includes(slug);
  });
}
