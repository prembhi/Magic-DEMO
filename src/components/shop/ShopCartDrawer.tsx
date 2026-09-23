import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { useShopCart } from '../../context/ShopCartContext';
import { useLanguage } from '../../context/LanguageContext';

interface ShopCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShopCartDrawer: React.FC<ShopCartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, clearCart, totalItems, subtotal } = useShopCart();
  const { isRTL, t } = useLanguage();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Delivery calculation for UAE
  const freeShippingThreshold = 50.0;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const standardShippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 10.0;
  const finalTotal = subtotal + standardShippingCost;

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Handle ESC key press to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderPlaced(true);
      clearCart();
    }, 1200);
  };

  const handleResetCheckout = () => {
    setOrderPlaced(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex ${isRTL ? 'justify-start' : 'justify-end'}`}
      role="dialog"
      aria-modal="true"
      aria-label={t('cart.title')}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#3C1518]/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Drawer Surface */}
      <div
        className={`relative w-full max-w-md h-full bg-[#FDF6EC] text-[#3C1518] shadow-2xl flex flex-col z-10 animate-in duration-300 ${
          isRTL ? 'slide-in-from-left text-right' : 'slide-in-from-right text-left'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#3C1518]/12 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xs bg-[#C8102E]/10 flex items-center justify-center text-[#C8102E]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#3C1518] leading-tight">
                {t('cart.title')}
              </h2>
              <p className="text-xs text-[#3C1518]/65">
                {t('cart.itemsCount', `${totalItems} items`, { count: totalItems })}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#3C1518]/60 hover:text-[#C8102E] hover:bg-[#FDF6EC] rounded-xs transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF4EB] px-4 py-2.5 border-b border-[#3C1518]/10 text-xs">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#3C1518]">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#C8102E]" />
              {subtotal >= freeShippingThreshold ? (
                <span className="text-[#5A7247] font-bold">
                  {t('cart.freeShippingUnlocked')}
                </span>
              ) : (
                <span>
                  {t('cart.freeShippingNotice', `Add AED ${amountNeededForFreeShipping.toFixed(2)} more for FREE Delivery`, {
                    amount: amountNeededForFreeShipping.toFixed(2),
                  })}
                </span>
              )}
            </span>
            <span className="font-mono text-[#3C1518]/60">{progressToFreeShipping.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#3C1518]/10 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-[#C8102E] transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {orderPlaced ? (
            /* Order Success State */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#5A7247]/15 flex items-center justify-center text-[#5A7247]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-[#3C1518]">
                  {isRTL ? 'تم تسجيل طلبك بنجاح!' : 'Order Inquiry Registered!'}
                </h3>
                <p className="text-xs text-[#3C1518]/70 mt-1 leading-relaxed">
                  {isRTL
                    ? 'شكراً لك! يتم تجهيز عبوات ماجيك الأصيلة مباشرة من مركز التوزيع الإقليمي في دولة الإمارات العربية المتحدة.'
                    : 'Thank you! Your simulated sample order has been registered for demonstration. Authentic MAGIC packaging is prepared direct from our regional distribution hub in the UAE.'}
                </p>
              </div>
              <button
                onClick={handleResetCheckout}
                className="w-full py-3 bg-[#C8102E] hover:bg-[#a60d26] text-white font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
              >
                {t('cart.startShopping')}
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#3C1518]/5 flex items-center justify-center text-[#3C1518]/30">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-[#3C1518]">
                {t('cart.empty')}
              </h3>
              <p className="text-xs text-[#3C1518]/65 max-w-xs">
                {t('cart.emptyDesc')}
              </p>
              <button
                onClick={onClose}
                className="mt-2 py-2 px-5 bg-[#C8102E] hover:bg-[#a60d26] text-white font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
              >
                {t('cart.startShopping')}
              </button>
            </div>
          ) : (
            /* Cart Item Rows */
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-3 bg-white rounded-xs border border-[#3C1518]/10 flex items-center gap-3 shadow-2xs"
              >
                {/* Product Thumbnail */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-[#FAF4EB] p-1.5 rounded-2xs border border-[#3C1518]/6 shrink-0 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#3C1518] truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-[#3C1518]/60 font-medium">
                    {product.weight} • <span className="font-mono">AED {product.price.toFixed(2)}</span>
                  </p>

                  {/* Quantity Stepper Row */}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center bg-[#FDF6EC] border border-[#3C1518]/15 rounded-xs overflow-hidden">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#3C1518]/80 hover:bg-[#C8102E] hover:text-white transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold font-mono text-[#3C1518]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#3C1518]/80 hover:bg-[#C8102E] hover:text-white transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#3C1518] font-mono">
                        AED {(product.price * quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-[#3C1518]/40 hover:text-[#C8102E] transition-colors p-1 cursor-pointer"
                        aria-label={`Remove ${product.name} from bag`}
                        title={t('cart.remove')}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Financial Summary & Checkout Action */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#3C1518]/12 space-y-3">
            <div className="space-y-1.5 text-xs text-[#3C1518]">
              <div className="flex justify-between text-[#3C1518]/70">
                <span>{t('cart.subtotal')} ({totalItems})</span>
                <span className="font-mono font-medium">AED {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#3C1518]/70">
                <span>{t('cart.shipping')}</span>
                <span className="font-mono font-medium">
                  {standardShippingCost === 0 ? (
                    <span className="text-[#5A7247] font-bold">{t('cart.freeShipping')}</span>
                  ) : (
                    `AED ${standardShippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#3C1518] pt-2 border-t border-[#3C1518]/10">
                <span>{t('cart.total')}</span>
                <span className="font-mono text-base text-[#C8102E]">
                  AED {finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-[#3C1518]/50 text-center italic">
              {t('cart.deliveryNote')}
            </p>

            <button
              onClick={handleSimulateCheckout}
              disabled={isCheckingOut}
              className="w-full py-3 bg-[#C8102E] hover:bg-[#a60d26] disabled:bg-[#C8102E]/60 text-white font-bold text-xs uppercase tracking-wider rounded-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              {isCheckingOut ? (
                <span>{isRTL ? 'جاري تجهيز الطلب...' : 'Confirming Order Dispatch...'}</span>
              ) : (
                <>
                  <span>{t('cart.checkout')}</span>
                  <ArrowIcon className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
