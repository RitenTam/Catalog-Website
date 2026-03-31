import { useMemo, useState } from 'react';
import { MessageCircle, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { getCatalogProducts } from '@/data/products';
import { getOrCreateAnalyticsSessionId, recordWhatsAppClick } from '@/data/whatsappAnalytics';
import { useBulkOrder } from '@/context/BulkOrderContext';
import {
  BULK_ORDER_PHONE_NUMBER,
  calculateLinePricing,
  getProductQuantity,
  MIN_PRODUCT_QTY,
  MIN_TOTAL_QTY,
} from '@/lib/bulkOrder';

const BulkOrderCart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [quickCode, setQuickCode] = useState('');

  const {
    items,
    totalQuantity,
    totalEstimatedAmount,
    totalEstimatedSavings,
    validation,
    setVariantQuantity,
    removeVariant,
    removeProduct,
    clearOrder,
    saveCurrentOrderForLater,
    restoreSavedOrder,
    repeatLastOrder,
    markCurrentOrderAsLast,
    getWhatsAppMessage,
  } = useBulkOrder();

  const catalogProducts = useMemo(() => getCatalogProducts(), []);

  const handleQuickCodeJump = () => {
    const normalizedCode = quickCode.trim().toUpperCase();
    if (!normalizedCode) return;

    const found = catalogProducts.find((product) => product.productCode.toUpperCase() === normalizedCode);

    if (!found) {
      toast({
        title: 'Product code not found',
        description: `No product matches ${normalizedCode}.`,
      });
      return;
    }

    setIsOpen(false);
    setQuickCode('');
    navigate(`/product/${found.id}`);
  };

  const handleSaveDraft = () => {
    saveCurrentOrderForLater();
    toast({ title: 'Order draft saved', description: 'You can restore this order later.' });
  };

  const handleRestoreDraft = () => {
    const restored = restoreSavedOrder();
    toast({
      title: restored ? 'Draft restored' : 'No saved draft found',
      description: restored ? 'Your saved quantities are now in the cart.' : 'Save an order first to restore it later.',
    });
  };

  const handleRepeatLastOrder = () => {
    const repeated = repeatLastOrder();
    toast({
      title: repeated ? 'Last order loaded' : 'No previous order found',
      description: repeated ? 'You can edit quantities before sending.' : 'Send one order first to use repeat.',
    });
  };

  const handleOrderViaWhatsApp = () => {
    if (!validation.isValid) {
      toast({
        title: 'MOQ rules not met',
        description: 'Please fix the highlighted order issues before sending.',
      });
      return;
    }

    const message = getWhatsAppMessage();

    items.forEach((item) => {
      recordWhatsAppClick({
        productId: item.productId,
        productName: item.productName,
        productCategory: 'Bulk Order',
        source: 'product-details',
        sessionId: getOrCreateAnalyticsSessionId(),
      });
    });

    markCurrentOrderAsLast();

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${BULK_ORDER_PHONE_NUMBER}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${BULK_ORDER_PHONE_NUMBER}&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="fixed bottom-4 right-4 z-40 h-12 px-4 shadow-xl md:h-14 md:px-6">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Bulk Order Cart
          <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
            {totalQuantity}
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-2xl">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b px-5 py-4">
            <SheetTitle>Bulk Order Cart</SheetTitle>
            <SheetDescription>
              MOQ per product: {MIN_PRODUCT_QTY} pcs | Minimum total: {MIN_TOTAL_QTY} pcs
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 border-b px-5 py-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
              <Input
                value={quickCode}
                onChange={(event) => setQuickCode(event.target.value)}
                placeholder="Quick order by product code (e.g. SW-101)"
              />
              <Button variant="outline" onClick={handleQuickCodeJump}>Go</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveDraft}>Save for later</Button>
              <Button variant="outline" size="sm" onClick={handleRestoreDraft}>Restore saved</Button>
              <Button variant="outline" size="sm" onClick={handleRepeatLastOrder}>Repeat last order</Button>
              <Button variant="ghost" size="sm" onClick={clearOrder}>Clear all</Button>
            </div>
          </div>

          <div className="flex-1 space-y-4 px-5 py-4">
            {items.length === 0 ? (
              <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                No products added yet. Open any product and fill the size-color quantity matrix.
              </p>
            ) : (
              items.map((item) => {
                const productQty = getProductQuantity(item);
                const pricing = calculateLinePricing(item.baseUnitPrice, productQty);
                const productError = validation.productErrors[item.productId];

                return (
                  <div key={item.productId} className="space-y-3 rounded-lg border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">{item.productCode}</p>
                        <h4 className="text-base font-semibold leading-tight">{item.productName}</h4>
                        <p className="text-xs text-muted-foreground">{pricing.tierLabel}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeProduct(item.productId)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {item.variants.map((variant) => (
                        <div
                          key={`${item.productId}-${variant.color}-${variant.size}`}
                          className="grid grid-cols-[1fr_88px_30px] items-center gap-2"
                        >
                          <span className="text-sm">
                            {variant.color} {variant.size}
                          </span>
                          <Input
                            type="number"
                            min={0}
                            value={variant.quantity}
                            onChange={(event) => {
                              const value = Number(event.target.value);
                              setVariantQuantity(item.productId, variant.size, variant.color, Number.isFinite(value) ? value : 0);
                            }}
                          />
                          <button
                            className="text-xs text-muted-foreground hover:text-destructive"
                            onClick={() => removeVariant(item.productId, variant.size, variant.color)}
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-md bg-muted/30 p-3 text-sm">
                      <p>Product Qty: <strong>{productQty} pcs</strong></p>
                      <p>Unit Price: <strong>Rs {pricing.unitPrice.toLocaleString()}</strong></p>
                      <p>Est. Total: <strong>Rs {pricing.lineTotal.toLocaleString()}</strong></p>
                      {pricing.savings > 0 ? <p>You save: <strong>Rs {pricing.savings.toLocaleString()}</strong></p> : null}
                    </div>

                    {productError ? <p className="text-sm text-destructive">{productError}</p> : null}
                  </div>
                );
              })
            )}
          </div>

          <div className="space-y-3 border-t px-5 py-4">
            {validation.errors.map((error) => (
              <p key={error} className="text-sm text-destructive">{error}</p>
            ))}

            <div className="rounded-lg bg-primary/5 p-3 text-sm">
              <p>Total Items: <strong>{totalQuantity} pcs</strong></p>
              <p>Estimated Order Value: <strong>Rs {totalEstimatedAmount.toLocaleString()}</strong></p>
              {totalEstimatedSavings > 0 ? (
                <p>Estimated Savings: <strong>Rs {totalEstimatedSavings.toLocaleString()}</strong></p>
              ) : null}
            </div>

            <Button className="w-full" onClick={handleOrderViaWhatsApp} disabled={items.length === 0}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Order via WhatsApp
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BulkOrderCart;
