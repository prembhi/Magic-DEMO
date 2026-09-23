import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, Check, RefreshCw, Truck, ShieldCheck, Clock } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { useShopCart } from '../../context/ShopCartContext';

interface ProductInfoProps {
  product: ShopProduct;
  onNavigateCategory?: (category: string) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  onNavigateCategory,
}) => {
  const { addItem, openCart } = useShopCart();
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');
  const [deliveryFrequency, setDeliveryFrequency] = useState<'30' | '60' | '90'>('30');
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // Calculate prices
  const regularPrice = product.price;
  const subscriptionDiscount = 0.10; // 10% save
  const subscriptionPrice = Number((regularPrice * (1 - subscriptionDiscount)).toFixed(2));
  const activeUnitPrice = purchaseType === 'subscription' ? subscriptionPrice : regularPrice;
  const totalPrice = (activeUnitPrice * quantity).toFixed(2);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => (prev < 99 ? prev + 1 : prev));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1800);
  };

  return (
    <div className="w-full flex flex-col justify-start text-[#3C1518]">
      {/* 1. SMALL CATEGORY LABEL */}
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => onNavigateCategory && onNavigateCategory(product.category)}
          className="text-[11px] font-bold tracking-widest uppercase text-[#C8102E] hover:underline cursor-pointer"
        >
          {product.category}
        </button>
        {product.subCategory && (
          <>
            <span className="text-xs text-[#3C1518]/30">/</span>
            <span className="text-[11px] text-[#3C1518]/60 font-medium">
              {product.subCategory}
            </span>
          </>
        )}
      </div>

      {/* 2. PRODUCT TITLE & DUAL LANGUAGE */}
      <div className="mb-3">
        <span className="font-serif text-sm tracking-widest uppercase text-[#C8102E] font-bold block mb-0.5">
          MAGIC
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#3C1518] leading-[1.05] tracking-tight">
          {product.name.replace(/^MAGIC\s*/i, '')}
        </h1>
        <div className="flex items-baseline gap-3 mt-1.5">
          <span className="font-arabic text-base sm:text-lg text-[#3C1518]/75 font-normal">
            {product.arabicName}
          </span>
          {product.englishSub && (
            <span className="text-xs sm:text-sm text-[#3C1518]/60 italic font-medium">
              • {product.englishSub}
            </span>
          )}
        </div>
      </div>

      {/* 3. VISUALLY DOMINANT PRICE */}
      <div className="py-3 border-y border-[#E6E0D6] flex items-baseline justify-between gap-3 my-2">
        <div className="flex items-baseline gap-2.5">
          <span className="text-3xl sm:text-4xl font-bold font-mono text-[#3C1518] leading-none">
            AED {activeUnitPrice.toFixed(2)}
          </span>
          {purchaseType === 'subscription' && (
            <span className="text-xs font-mono text-[#3C1518]/50 line-through">
              AED {regularPrice.toFixed(2)}
            </span>
          )}
          <span className="text-[11px] text-[#3C1518]/60 font-medium">
            VAT Inclusive
          </span>
        </div>
        <div className="text-right">
          <span className="inline-block text-[11px] font-semibold text-[#2B6E2A] bg-[#2B6E2A]/10 px-2 py-0.5 rounded-2xs">
            In Stock • Express Dispatch
          </span>
        </div>
      </div>

      {/* 4. WEIGHT / VARIANT SELECTOR */}
      <div className="my-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-bold text-[#3C1518] uppercase tracking-wider text-[11px]">
            Pack Weight
          </span>
          <span className="text-[#3C1518]/60 text-[11px]">
            Single Pouch Format
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-white border-2 border-[#C8102E] text-[#C8102E] font-bold text-xs font-mono rounded-xs shadow-2xs cursor-default flex items-center gap-1.5"
            aria-selected="true"
          >
            <span>{product.weight}</span>
            <span className="text-[10px] text-[#3C1518]/50 font-normal">
              (Standard)
            </span>
          </button>
        </div>
      </div>

      {/* 5. PURCHASE OPTIONS (SUBSCRIPTION UI ACCORDING TO UX RESEARCH) */}
      <div className="my-4 border border-[#E6E0D6] rounded-xs bg-white overflow-hidden shadow-2xs">
        <div className="px-3.5 py-2 bg-[#FAF7F2] border-b border-[#E6E0D6] flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#3C1518]">
            Purchase Options
          </span>
          <span className="text-[10px] text-[#3C1518]/60">
            Cancel Anytime
          </span>
        </div>

        {/* OPTION 1: One-Time Purchase */}
        <label
          onClick={() => setPurchaseType('one-time')}
          className={`flex items-center justify-between p-3.5 cursor-pointer border-b border-[#E6E0D6] transition-colors ${
            purchaseType === 'one-time' ? 'bg-[#FAF7F2]/40' : 'hover:bg-[#FAF7F2]/20'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="purchase_option"
              checked={purchaseType === 'one-time'}
              onChange={() => setPurchaseType('one-time')}
              className="w-4 h-4 accent-[#C8102E] cursor-pointer"
            />
            <span className="text-xs sm:text-sm font-bold text-[#3C1518]">
              One-Time Purchase
            </span>
          </div>
          <span className="text-xs sm:text-sm font-bold font-mono text-[#3C1518]">
            AED {regularPrice.toFixed(2)}
          </span>
        </label>

        {/* OPTION 2: Subscribe & Save 10% */}
        <div className={purchaseType === 'subscription' ? 'bg-[#FAF7F2]/40' : ''}>
          <label
            onClick={() => setPurchaseType('subscription')}
            className="flex items-center justify-between p-3.5 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="purchase_option"
                checked={purchaseType === 'subscription'}
                onChange={() => setPurchaseType('subscription')}
                className="w-4 h-4 accent-[#C8102E] cursor-pointer"
              />
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-[#3C1518]">
                  Subscribe & Save
                </span>
                <span className="bg-[#2B6E2A] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-2xs uppercase tracking-wide">
                  Save 10%
                </span>
              </div>
            </div>
            <span className="text-xs sm:text-sm font-bold font-mono text-[#C8102E]">
              AED {subscriptionPrice.toFixed(2)}
            </span>
          </label>

          {/* REVEALED SUBSCRIPTION CONTROLS WHEN SELECTED */}
          {purchaseType === 'subscription' && (
            <div className="px-4 pb-4 pt-1 border-t border-[#E6E0D6]/70 bg-[#FAF7F2]/80 space-y-3">
              {/* Delivery Frequency Header */}
              <div className="flex items-center justify-between text-[11px] pt-2">
                <span className="font-bold text-[#3C1518] uppercase tracking-wider">
                  Deliver Every:
                </span>
                <span className="text-[#2B6E2A] font-bold text-[10px] uppercase">
                  Save 10% on every order
                </span>
              </div>

              {/* Radio-Style Frequency Selector (30 / 60 / 90 Days) */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: '30', label: '30 Days', desc: 'Recommended' },
                  { value: '60', label: '60 Days', desc: 'Standard' },
                  { value: '90', label: '90 Days', desc: 'Extended' },
                ].map((freq) => (
                  <button
                    key={freq.value}
                    type="button"
                    onClick={() => setDeliveryFrequency(freq.value as any)}
                    className={`py-2 px-2 rounded-xs border text-center transition-all cursor-pointer ${
                      deliveryFrequency === freq.value
                        ? 'border-[#C8102E] bg-white text-[#C8102E] font-bold shadow-2xs'
                        : 'border-[#E6E0D6] bg-white/60 text-[#3C1518]/70 hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-mono">{freq.label}</div>
                    <div className="text-[9px] text-[#3C1518]/50 uppercase tracking-tighter">
                      {freq.desc}
                    </div>
                  </button>
                ))}
              </div>

              {/* Subscription Benefits List */}
              <div className="pt-2 border-t border-[#E6E0D6]/60 text-[11px] text-[#3C1518]/80 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#2B6E2A] font-bold">✓</span>
                  <span>Save 10% on every recurring order</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#2B6E2A] font-bold">✓</span>
                  <span>Flexible delivery schedule to your doorstep</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#2B6E2A] font-bold">✓</span>
                  <span>Skip, modify, or cancel anytime with zero penalty</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 6. QUANTITY + PRIMARY CTA */}
      <div className="my-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Quantity Stepper (44x44px touch targets) */}
        <div
          className="h-12 bg-white border border-[#D9D2C7] rounded-xs flex items-center px-1 shadow-2xs min-w-[120px] justify-between"
          role="group"
          aria-label={`Quantity selector for ${product.name}`}
        >
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center text-[#3C1518] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:hover:bg-transparent rounded-xs cursor-pointer transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4 stroke-[2.5]" />
          </button>
          <span
            className="w-10 text-center text-sm font-bold text-[#3C1518] font-mono select-none"
            aria-live="polite"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-10 h-10 flex items-center justify-center text-[#3C1518] hover:bg-[#FAF7F2] rounded-xs cursor-pointer transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Primary CTA (Dominant MAGIC Red) */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 h-12 px-6 rounded-xs font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs ${
            justAdded
              ? 'bg-[#2B6E2A] text-white'
              : 'bg-[#C8102E] hover:bg-[#A60D26] text-white active:scale-[0.99]'
          }`}
          aria-label={
            purchaseType === 'subscription'
              ? `Subscribe and save ${quantity} of ${product.name}`
              : `Add ${quantity} of ${product.name} to cart`
          }
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Added to Bag</span>
            </>
          ) : purchaseType === 'subscription' ? (
            <>
              <RefreshCw className="w-4 h-4 stroke-[2.5]" />
              <span>SUBSCRIBE & SAVE • AED {totalPrice}</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span>ADD TO CART • AED {totalPrice}</span>
            </>
          )}
        </button>

        {/* View Bag Quick Button */}
        <button
          type="button"
          onClick={openCart}
          className="h-12 px-4 bg-white hover:bg-[#FAF7F2] text-[#3C1518] border border-[#D9D2C7] rounded-xs text-xs font-bold cursor-pointer transition-colors hidden md:inline-flex items-center justify-center shadow-2xs"
        >
          View Bag
        </button>
      </div>

      {/* 7. DELIVERY / TRUST STRIP */}
      <div className="mt-2 pt-3 border-t border-[#E6E0D6] grid grid-cols-3 gap-2 text-center text-[10px] sm:text-[11px] text-[#3C1518]/75">
        <div className="p-2 bg-white/60 rounded border border-[#E6E0D6]/60">
          <Truck className="w-4 h-4 text-[#C8102E] mx-auto mb-1" />
          <span className="font-bold block text-[#3C1518]">Free Delivery</span>
          <span>Orders over AED 50</span>
        </div>
        <div className="p-2 bg-white/60 rounded border border-[#E6E0D6]/60">
          <Clock className="w-4 h-4 text-[#C8102E] mx-auto mb-1" />
          <span className="font-bold block text-[#3C1518]">UAE Express</span>
          <span>Dispatched in 30–45m</span>
        </div>
        <div className="p-2 bg-white/60 rounded border border-[#E6E0D6]/60">
          <ShieldCheck className="w-4 h-4 text-[#2B6E2A] mx-auto mb-1" />
          <span className="font-bold block text-[#3C1518]">Airtight Foil</span>
          <span>100% Sealed Purity</span>
        </div>
      </div>
    </div>
  );
};
