import type { Product } from '@/data/products';

export const BULK_ORDER_PHONE_NUMBER = '9779863651986';
export const BULK_ORDER_STORAGE_KEY = 'catalog-bulk-order-items';
export const BULK_ORDER_DRAFT_KEY = 'catalog-bulk-order-draft';
export const BULK_ORDER_LAST_KEY = 'catalog-bulk-order-last';

export const MIN_PRODUCT_QTY = 10;
export const MIN_TOTAL_QTY = 50;

export type PricingTier = 'high' | 'medium' | 'discounted';

export type VariantQuantity = {
  size: string;
  color: string;
  quantity: number;
};

export type BulkOrderItem = {
  productId: number;
  productName: string;
  productCode: string;
  image?: string;
  baseUnitPrice: number;
  variants: VariantQuantity[];
};

export type BulkValidation = {
  isValid: boolean;
  errors: string[];
  productErrors: Record<number, string>;
};

export function toVariantKey(size: string, color: string) {
  return `${size}::${color}`;
}

export function fromVariantKey(value: string) {
  const [size, color] = value.split('::');
  return { size, color };
}

export function getDefaultProductCode(product: Product) {
  const categoryPrefix = (product.category || 'WOOL')
    .replace(/[^a-zA-Z]/g, '')
    .slice(0, 2)
    .toUpperCase()
    .padEnd(2, 'X');

  return `${categoryPrefix}-${String(product.id).padStart(3, '0')}`;
}

export function getPricingTier(quantity: number): PricingTier {
  if (quantity >= 50) return 'discounted';
  if (quantity >= 10) return 'medium';
  return 'high';
}

export function getTierLabel(quantity: number) {
  const tier = getPricingTier(quantity);
  if (tier === 'discounted') return '50+ units (discounted)';
  if (tier === 'medium') return '10-49 units (medium)';
  return '1-9 units (higher)';
}

export function getUnitPrice(baseUnitPrice: number, quantity: number) {
  const tier = getPricingTier(quantity);

  if (tier === 'discounted') {
    return roundMoney(baseUnitPrice * 0.8);
  }

  if (tier === 'medium') {
    return roundMoney(baseUnitPrice * 0.9);
  }

  return roundMoney(baseUnitPrice);
}

export function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export function calculateLinePricing(baseUnitPrice: number, quantity: number) {
  const unitPrice = getUnitPrice(baseUnitPrice, quantity);
  const lineTotal = roundMoney(unitPrice * quantity);
  const regularTotal = roundMoney(baseUnitPrice * quantity);
  const savings = roundMoney(Math.max(0, regularTotal - lineTotal));

  return {
    tier: getPricingTier(quantity),
    tierLabel: getTierLabel(quantity),
    unitPrice,
    lineTotal,
    regularTotal,
    savings,
  };
}

export function getOrderTotalQuantity(items: BulkOrderItem[]) {
  return items.reduce(
    (sum, item) =>
      sum + item.variants.reduce((variantSum, variant) => variantSum + variant.quantity, 0),
    0
  );
}

export function getProductQuantity(item: BulkOrderItem) {
  return item.variants.reduce((sum, variant) => sum + variant.quantity, 0);
}

export function validateBulkOrder(items: BulkOrderItem[]): BulkValidation {
  const errors: string[] = [];
  const productErrors: Record<number, string> = {};

  if (items.length === 0) {
    errors.push('Add at least one product to continue.');
  }

  for (const item of items) {
    const productQty = getProductQuantity(item);
    if (productQty < MIN_PRODUCT_QTY) {
      productErrors[item.productId] = `${item.productCode} must have at least ${MIN_PRODUCT_QTY} pcs.`;
    }
  }

  const totalQuantity = getOrderTotalQuantity(items);
  if (totalQuantity > 0 && totalQuantity < MIN_TOTAL_QTY) {
    errors.push(`Minimum total order is ${MIN_TOTAL_QTY} pcs. Current total: ${totalQuantity} pcs.`);
  }

  const isValid = errors.length === 0 && Object.keys(productErrors).length === 0;

  return {
    isValid,
    errors,
    productErrors,
  };
}

export function buildWhatsAppBulkOrderMessage(items: BulkOrderItem[], totalQuantity: number) {
  const lines: string[] = ['Hello, I want to place a bulk order:'];

  for (const item of items) {
    lines.push('');
    lines.push(`Product: ${item.productCode} - ${item.productName}`);

    for (const variant of item.variants) {
      if (variant.quantity <= 0) continue;
      lines.push(`* ${variant.color} ${variant.size}: ${variant.quantity} pcs`);
    }
  }

  lines.push('');
  lines.push(`Total Items: ${totalQuantity} pcs`);
  lines.push('Please confirm availability and final wholesale pricing.');

  return lines.join('\n');
}
