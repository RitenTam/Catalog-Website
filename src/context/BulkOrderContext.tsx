import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/data/products';
import {
  BULK_ORDER_DRAFT_KEY,
  BULK_ORDER_LAST_KEY,
  BULK_ORDER_STORAGE_KEY,
  type BulkOrderItem,
  type BulkValidation,
  type VariantQuantity,
  buildWhatsAppBulkOrderMessage,
  calculateLinePricing,
  getDefaultProductCode,
  getOrderTotalQuantity,
  getProductQuantity,
  toVariantKey,
  validateBulkOrder,
} from '@/lib/bulkOrder';

type BulkOrderContextValue = {
  items: BulkOrderItem[];
  totalQuantity: number;
  totalEstimatedAmount: number;
  totalEstimatedSavings: number;
  validation: BulkValidation;
  addProductVariants: (product: Product, variants: VariantQuantity[]) => void;
  setVariantQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  removeVariant: (productId: number, size: string, color: string) => void;
  removeProduct: (productId: number) => void;
  clearOrder: () => void;
  saveCurrentOrderForLater: () => void;
  restoreSavedOrder: () => boolean;
  repeatLastOrder: () => boolean;
  markCurrentOrderAsLast: () => void;
  getWhatsAppMessage: () => string;
};

const BulkOrderContext = createContext<BulkOrderContextValue | null>(null);

function safelyParseItems(value: string | null): BulkOrderItem[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value) as BulkOrderItem[];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && typeof item.productId === 'number' && Array.isArray(item.variants))
      .map((item) => ({
        ...item,
        productCode: item.productCode || `PR-${String(item.productId).padStart(3, '0')}`,
        baseUnitPrice: Number(item.baseUnitPrice) > 0 ? Number(item.baseUnitPrice) : 1200,
        variants: item.variants
          .filter((variant) => variant && variant.quantity > 0)
          .map((variant) => ({
            size: variant.size,
            color: variant.color,
            quantity: Number(variant.quantity),
          })),
      }))
      .filter((item) => item.variants.length > 0);
  } catch {
    return [];
  }
}

export function BulkOrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BulkOrderItem[]>(() => {
    if (typeof window === 'undefined') return [];
    return safelyParseItems(localStorage.getItem(BULK_ORDER_STORAGE_KEY));
  });

  useEffect(() => {
    localStorage.setItem(BULK_ORDER_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const totalQuantity = useMemo(() => getOrderTotalQuantity(items), [items]);

  const pricingSnapshot = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        const quantity = getProductQuantity(item);
        const pricing = calculateLinePricing(item.baseUnitPrice, quantity);
        acc.amount += pricing.lineTotal;
        acc.savings += pricing.savings;
        return acc;
      },
      { amount: 0, savings: 0 }
    );
  }, [items]);

  const validation = useMemo(() => validateBulkOrder(items), [items]);

  const addProductVariants = (product: Product, variants: VariantQuantity[]) => {
    const validVariants = variants.filter((variant) => Number(variant.quantity) > 0);
    if (validVariants.length === 0) return;

    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.productId === product.id);

      if (!existing) {
        return [
          ...prevItems,
          {
            productId: product.id,
            productName: product.name,
            productCode: product.productCode || getDefaultProductCode(product),
            image: product.image,
            baseUnitPrice: product.basePrice || 1200,
            variants: validVariants,
          },
        ];
      }

      const variantMap = new Map<string, number>();

      for (const variant of existing.variants) {
        variantMap.set(toVariantKey(variant.size, variant.color), variant.quantity);
      }

      for (const variant of validVariants) {
        const key = toVariantKey(variant.size, variant.color);
        const current = variantMap.get(key) || 0;
        variantMap.set(key, current + variant.quantity);
      }

      const mergedVariants: VariantQuantity[] = Array.from(variantMap.entries())
        .map(([key, quantity]) => {
          const [size, color] = key.split('::');
          return { size, color, quantity };
        })
        .filter((variant) => variant.quantity > 0);

      return prevItems.map((item) =>
        item.productId === product.id
          ? {
              ...item,
              productName: product.name,
              productCode: product.productCode || getDefaultProductCode(product),
              image: product.image,
              baseUnitPrice: product.basePrice || item.baseUnitPrice,
              variants: mergedVariants,
            }
          : item
      );
    });
  };

  const setVariantQuantity = (productId: number, size: string, color: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.productId !== productId) return item;

          const keyToUpdate = toVariantKey(size, color);
          const variantMap = new Map<string, number>(
            item.variants.map((variant) => [toVariantKey(variant.size, variant.color), variant.quantity])
          );

          if (quantity <= 0) {
            variantMap.delete(keyToUpdate);
          } else {
            variantMap.set(keyToUpdate, quantity);
          }

          const variants = Array.from(variantMap.entries()).map(([key, qty]) => {
            const [variantSize, variantColor] = key.split('::');
            return {
              size: variantSize,
              color: variantColor,
              quantity: qty,
            };
          });

          return {
            ...item,
            variants,
          };
        })
        .filter((item) => item.variants.length > 0)
    );
  };

  const removeVariant = (productId: number, size: string, color: string) => {
    setVariantQuantity(productId, size, color, 0);
  };

  const removeProduct = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  };

  const clearOrder = () => {
    setItems([]);
  };

  const saveCurrentOrderForLater = () => {
    localStorage.setItem(BULK_ORDER_DRAFT_KEY, JSON.stringify(items));
  };

  const restoreSavedOrder = () => {
    const draft = safelyParseItems(localStorage.getItem(BULK_ORDER_DRAFT_KEY));
    if (!draft.length) {
      return false;
    }

    setItems(draft);
    return true;
  };

  const repeatLastOrder = () => {
    const previous = safelyParseItems(localStorage.getItem(BULK_ORDER_LAST_KEY));
    if (!previous.length) {
      return false;
    }

    setItems(previous);
    return true;
  };

  const markCurrentOrderAsLast = () => {
    localStorage.setItem(BULK_ORDER_LAST_KEY, JSON.stringify(items));
  };

  const getWhatsAppMessage = () => {
    return buildWhatsAppBulkOrderMessage(items, totalQuantity);
  };

  const value: BulkOrderContextValue = {
    items,
    totalQuantity,
    totalEstimatedAmount: pricingSnapshot.amount,
    totalEstimatedSavings: pricingSnapshot.savings,
    validation,
    addProductVariants,
    setVariantQuantity,
    removeVariant,
    removeProduct,
    clearOrder,
    saveCurrentOrderForLater,
    restoreSavedOrder,
    repeatLastOrder,
    markCurrentOrderAsLast,
    getWhatsAppMessage,
  };

  return <BulkOrderContext.Provider value={value}>{children}</BulkOrderContext.Provider>;
}

export function useBulkOrder() {
  const context = useContext(BulkOrderContext);
  if (!context) {
    throw new Error('useBulkOrder must be used inside BulkOrderProvider');
  }
  return context;
}
