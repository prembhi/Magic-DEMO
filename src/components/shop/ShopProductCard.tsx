import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Plus, Minus } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { useShopCart } from '../../context/ShopCartContext';
import { useLanguage } from '../../context/LanguageContext';

export interface ShopProductCardProps {
  product: ShopProduct;
  onSelectProduct?: (productId: string) => void;
  variant?: 'shop' | 'compact';
}

type FrequencyOption = '30' | '14' | '7';

interface FrequencyConfig {
  value: FrequencyOption;
  labelKey: string;
  fallback: string;
}

const FREQUENCY_OPTIONS: FrequencyConfig[] = [
  { value: '30', labelKey: 'product.deliverEvery30', fallback: 'Deliver every 30 days' },
  { value: '14', labelKey: 'product.deliverEvery14', fallback: 'Deliver every 14 days' },
  { value: '7', labelKey: 'product.deliverEvery7', fallback: 'Deliver every 7 days' },
];

export const ShopProductCard: React.FC<ShopProductCardProps> = ({
  product,
  onSelectProduct,
  variant = 'shop',
}) => {
  const { addItem, updateQuantity, getItemQuantity } = useShopCart();
  const { t, isRTL } = useLanguage();
  const quantity = getItemQuantity(product.id);

  const [purchaseOption, setPurchaseOption] = useState<'onetime' | 'subscribe'>('onetime');
  const [deliveryFrequency, setDeliveryFrequency] = useState<FrequencyOption>('30');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSelectOneTime = () => {
    setPurchaseOption('onetime');
    setIsDropdownOpen(false);
  };

  const handleSelectSubscribe = () => {
    setPurchaseOption('subscribe');
  };

  const handleViewProduct = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const targetSlug = product.slug || product.id;
    if (onSelectProduct) {
      onSelectProduct(targetSlug);
    } else if (typeof window !== 'undefined') {
      window.location.hash = `#shop/product/${targetSlug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsDropdownOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsDropdownOpen(false);
      return;
    }

    const currentIndex = FREQUENCY_OPTIONS.findIndex((opt) => opt.value === deliveryFrequency);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % FREQUENCY_OPTIONS.length;
      setDeliveryFrequency(FREQUENCY_OPTIONS[nextIndex].value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + FREQUENCY_OPTIONS.length) % FREQUENCY_OPTIONS.length;
      setDeliveryFrequency(FREQUENCY_OPTIONS[prevIndex].value);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsDropdownOpen(false);
    }
  };

  const selectedFrequencyLabel = t(
    `product.deliverEvery${deliveryFrequency}`,
    deliveryFrequency === '30'
      ? 'Deliver every 30 days'
      : deliveryFrequency === '14'
      ? 'Deliver every 14 days'
      : 'Deliver every 7 days'
  );

  // Compact Variant for dense multi-column editorial listings (e.g. 6-column recipe ingredients)
  if (variant === 'compact') {
    return (
      <article
        onClick={handleViewProduct}
        className="group bg-white rounded-xl border border-[#E6E0D6] hover:border-[#C8102E]/40 hover:shadow-xs p-2 sm:p-2.5 flex flex-col justify-between transition-all relative cursor-pointer"
        aria-label={`${product.name}, ${product.weight}, AED ${product.price.toFixed(2)}`}
      >
        <div>
          <div className="relative w-full h-36 sm:h-40 bg-[#FAF7F2] rounded-lg p-2 flex items-center justify-center overflow-hidden mb-2">
            <img
              src={product.image}
              alt={product.altText}
              loading="lazy"
              className="max-h-full max-w-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-103 motion-reduce:transform-none select-none"
            />
            <div className="absolute bottom-1.5 end-1.5 z-10">
              {quantity === 0 ? (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-7 h-7 rounded-full bg-white border border-[#E6E0D6] text-[#C8102E] hover:bg-[#C8102E] hover:text-white hover:border-[#C8102E] shadow-xs flex items-center justify-center transition-colors cursor-pointer"
                  title={`Add ${product.name} to cart`}
                  aria-label={`Add ${product.name} to cart`}
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              ) : (
                <div
                  className="h-7 bg-white border border-[#C8102E] rounded-full flex items-center px-1 shadow-xs overflow-hidden"
                  role="group"
                  aria-label={`Quantity selector for ${product.name}`}
                >
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-5 h-5 flex items-center justify-center text-[#C8102E] hover:bg-[#C8102E]/10 rounded-full cursor-pointer transition-colors"
                    aria-label="Decrease"
                  >
                    <Minus className="w-3 h-3 stroke-[2.5]" />
                  </button>
                  <span className="w-5 text-center text-xs font-bold text-[#3C1518] font-mono select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="w-5 h-5 flex items-center justify-center text-[#C8102E] hover:bg-[#C8102E]/10 rounded-full cursor-pointer transition-colors"
                    aria-label="Increase"
                  >
                    <Plus className="w-3 h-3 stroke-[2.5]" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-xs sm:text-sm font-bold text-[#3C1518] font-mono leading-none">
              AED {product.price.toFixed(2)}
            </span>
          </div>

          <h3 className="text-xs font-semibold text-[#3C1518] group-hover:text-[#C8102E] transition-colors line-clamp-2 mt-1 leading-snug">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-1 text-[11px] text-[#3C1518]/60">
            <span>{product.weight}</span>
            <span className="font-arabic text-[11px] text-[#3C1518]/45">
              {product.arabicName.split(' ')[0]}
            </span>
          </div>
        </div>
      </article>
    );
  }

  // REBUILT PREMIUM MAGIC FMCG SHOPPING CARD
  return (
    <article
      className="group bg-white rounded-2xl border-2 border-[#3C1518]/15 hover:border-[#C8102E] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md relative"
      aria-label={`${product.name}, ${product.weight}, AED ${product.price.toFixed(2)}`}
    >
      <div>
        {/* 1. PRODUCT IMAGE STAGE (Flush, generous ~280-300px height, packaging occupying 80-85%) */}
        <div
          onClick={handleViewProduct}
          className="relative w-full h-[280px] sm:h-[300px] bg-gradient-to-b from-[#FDF6EC] to-[#FAF3E8]/40 rounded-t-[14px] flex items-center justify-center p-4 cursor-pointer select-none overflow-hidden"
        >
          {/* Optional Pill Badge at top-left (e.g., Bestseller pill in reference) */}
          {product.badge && (
            <span className="absolute top-3.5 start-3.5 z-20 px-3 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-white border border-[#3C1518]/25 text-[#3C1518] shadow-2xs">
              {t(`product.badge.${product.badge.toLowerCase()}`, product.badge)}
            </span>
          )}

          {/* Authentic Packaging Pouch - Hero presence */}
          <img
            src={product.image}
            alt={product.altText}
            loading="lazy"
            className="h-[84%] max-h-[86%] w-auto max-w-[85%] object-contain filter drop-shadow-lg transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none select-none z-10"
          />

          {/* Ground contact shadow */}
          <div
            className="absolute bottom-2.5 inset-x-10 h-3 rounded-full blur-sm pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.45) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* 2. PRODUCT INFORMATION SECTION */}
        <div className="p-3 sm:p-3.5 flex flex-col">
          {/* CATEGORY & DASHED PACK SIZE PILL */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B4226]">
              {product.category}
            </span>
            <span className="border border-dashed border-[#3C1518]/35 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium text-[#3C1518] whitespace-nowrap shrink-0">
              {product.weight}
            </span>
          </div>

          {/* PRODUCT NAME (Fraunces serif, up to 2 full lines, consistent height for grid alignment) */}
          <h3
            onClick={handleViewProduct}
            className="font-display font-bold text-base sm:text-[17px] text-[#3C1518] hover:text-[#C8102E] transition-colors leading-snug line-clamp-2 min-h-[2.5rem] flex items-start mb-2.5 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* 3. CLEAN UNBOXED RADIO ROWS (Grid auto minmax(0, 1fr) auto to prevent any label and price overlap) */}
          <div className="space-y-2 mb-3" role="radiogroup" aria-label="Purchase Options">
            {/* Row 1: One-Time Purchase */}
            <label
              onClick={handleSelectOneTime}
              className="grid items-center gap-2 py-0.5 cursor-pointer select-none group/radio w-full min-w-0"
              style={{ gridTemplateColumns: 'auto minmax(0, 1fr) auto' }}
            >
              {/* Col 1: Radio Indicator */}
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  purchaseOption === 'onetime'
                    ? 'border-[#C8102E]'
                    : 'border-[#3C1518]/40 group-hover/radio:border-[#3C1518]/70'
                }`}
              >
                {purchaseOption === 'onetime' && (
                  <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                )}
              </span>

              {/* Col 2: Label (Flexible middle column, min-w-0 prevents pushing price out) */}
              <span
                className={`text-xs leading-tight text-start min-w-0 transition-colors ${
                  purchaseOption === 'onetime'
                    ? 'font-semibold text-[#3C1518]'
                    : 'font-medium text-[#3C1518]/75'
                }`}
              >
                {t('product.oneTimePurchase', 'One-Time Purchase')}
              </span>

              {/* Col 3: Right-aligned Price (Fixed width, never overflows) */}
              <span className="font-mono font-bold text-xs sm:text-[13px] text-[#3C1518] text-end whitespace-nowrap shrink-0 justify-self-end">
                AED {product.price.toFixed(2)}
              </span>
            </label>

            {/* Row 2: Subscribe & Save */}
            <label
              onClick={handleSelectSubscribe}
              className="grid items-center gap-2 py-0.5 cursor-pointer select-none group/radio w-full min-w-0"
              style={{ gridTemplateColumns: 'auto minmax(0, 1fr) auto' }}
            >
              {/* Col 1: Radio Indicator */}
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  purchaseOption === 'subscribe'
                    ? 'border-[#C8102E]'
                    : 'border-[#3C1518]/40 group-hover/radio:border-[#3C1518]/70'
                }`}
              >
                {purchaseOption === 'subscribe' && (
                  <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                )}
              </span>

              {/* Col 2: Label */}
              <span
                className={`text-xs leading-tight text-start min-w-0 transition-colors ${
                  purchaseOption === 'subscribe'
                    ? 'font-semibold text-[#3C1518]'
                    : 'font-medium text-[#3C1518]/75'
                }`}
              >
                {t('product.subscribeSave', 'Subscribe & Save')}
              </span>

              {/* Col 3: Empty spacer for alignment */}
              <span />
            </label>
          </div>

          {/* 4. INTERACTIVE DELIVERY FREQUENCY DROPDOWN (Matches Reference Screenshot) */}
          {purchaseOption === 'subscribe' && (
            <div ref={dropdownRef} className="mb-3 relative animate-in fade-in duration-200">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen((prev) => !prev);
                }}
                onKeyDown={handleDropdownKeyDown}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-label={t('product.deliverFrequency', 'Delivery frequency')}
                className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2 bg-white border rounded-md text-xs font-semibold text-[#3C1518] transition-colors cursor-pointer focus:outline-hidden ${
                  isDropdownOpen
                    ? 'border-[#C8102E] ring-1 ring-[#C8102E]/25'
                    : 'border-[#3C1518]/30 hover:border-[#3C1518]/60'
                }`}
              >
                <span className="truncate">{selectedFrequencyLabel}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#3C1518]/70 shrink-0 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180 text-[#C8102E]' : ''
                  }`}
                />
              </button>

              {/* Custom Dropdown Menu with Highlighted Selected Item */}
              {isDropdownOpen && (
                <ul
                  role="listbox"
                  aria-label="Delivery frequency options"
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#3C1518]/25 rounded-md shadow-lg overflow-hidden z-40 py-1"
                >
                  {FREQUENCY_OPTIONS.map((opt) => {
                    const isSelected = deliveryFrequency === opt.value;
                    const label = t(opt.labelKey, opt.fallback);
                    return (
                      <li
                        key={opt.value}
                        role="option"
                        aria-selected={isSelected}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeliveryFrequency(opt.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`min-h-[40px] px-3 flex items-center justify-between text-xs cursor-pointer select-none transition-colors ${
                          isSelected
                            ? 'bg-[#C8102E] text-white font-bold'
                            : 'text-[#3C1518] hover:bg-[#FAF7F2] font-medium'
                        }`}
                      >
                        <span>{label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 5. CTA HIERARCHY: SOLID BUTTON + QUIET EDITORIAL LINK WITH UNDERLINE */}
      <div className="px-3 pb-3 sm:px-3.5 sm:pb-3.5 pt-0 flex flex-col items-center">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full h-11 bg-[#C8102E] hover:bg-[#9C0A20] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          aria-label={`Add ${product.name} to cart`}
        >
          <span>{t('product.addToCartBtn', 'ADD TO CART')}</span>
        </button>

        <button
          type="button"
          onClick={handleViewProduct}
          className="text-[11px] font-bold uppercase tracking-wider text-[#3C1518]/75 hover:text-[#C8102E] underline underline-offset-4 transition-colors cursor-pointer py-2 block"
        >
          {t('product.viewProductBtn', 'VIEW PRODUCT')}
        </button>
      </div>
    </article>
  );
};
