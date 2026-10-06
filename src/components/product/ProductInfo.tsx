import React, { useState } from 'react';
import {
  Plus,
  Minus,
  ShoppingBag,
  Check,
  RefreshCw,
  Truck,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';
import { useShopCart } from '../../context/ShopCartContext';
import { useLanguage } from '../../context/LanguageContext';

interface ProductInfoProps {
  product: ShopProduct;
  onNavigateCategory?: (category: string) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  onNavigateCategory,
}) => {
  const { addItem, openCart } = useShopCart();
  const { isRTL } = useLanguage();
  const details = getProductSpecDetails(product.id);

  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');
  const [deliveryFrequency, setDeliveryFrequency] = useState<'30' | '60' | '90'>('30');
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // Calculate prices
  const regularPrice = product.price;
  const subscriptionDiscount = 0.1; // 10% save
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
    <div className="w-full flex flex-col justify-start text-[#3C1518] select-none">
      {/* ========================================================================= */}
      {/* 1. CATEGORY / PRODUCT TYPE                                                */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 mb-2.5">
        <button
          type="button"
          onClick={() => onNavigateCategory && onNavigateCategory(product.category)}
          className="text-xs font-sans font-bold tracking-widest uppercase text-[#C8102E] hover:underline cursor-pointer"
        >
          {isRTL && product.arabicCategory ? product.arabicCategory : product.category}
        </button>
        {product.subCategory && (
          <>
            <span className="text-xs text-[#3C1518]/30">/</span>
            <span className="text-xs font-sans text-[#3C1518]/60 font-semibold">
              {product.subCategory}
            </span>
          </>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. PRODUCT NAME                                                           */}
      {/* ========================================================================= */}
      <div className="mb-3.5">
        <span className="font-display font-bold text-xs tracking-widest uppercase text-[#C8102E] block mb-1">
          MAGIC
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#3C1518] leading-[1.04] tracking-tight">
          {product.name.replace(/^MAGIC\s*/i, '')}
        </h1>
        <div className="flex items-baseline gap-3 mt-2 flex-wrap">
          <span className="font-arabic text-base sm:text-lg text-[#3C1518]/80 font-medium">
            {product.arabicName}
          </span>
          {product.englishSub && (
            <span className="text-xs sm:text-sm text-[#3C1518]/60 italic font-medium">
              • {product.englishSub}
            </span>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SHORT PRODUCT DESCRIPTION                                              */}
      {/* ========================================================================= */}
      <p className="text-sm sm:text-base text-[#3C1518]/85 font-sans leading-relaxed mb-5">
        {details.shortDescription || product.culinaryProfile}
      </p>

      {/* ========================================================================= */}
      {/* 4. VISUALLY DOMINANT PRICE                                                */}
      {/* ========================================================================= */}
      <div className="py-3.5 border-y border-[#3C1518]/12 flex items-baseline justify-between gap-3 mb-5">
        <div className="flex items-baseline gap-2.5">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-[#3C1518] leading-none">
            AED {activeUnitPrice.toFixed(2)}
          </span>
          {purchaseType === 'subscription' && (
            <span className="text-sm font-sans font-semibold text-[#3C1518]/50 line-through">
              AED {regularPrice.toFixed(2)}
            </span>
          )}
          <span className="text-xs text-[#3C1518]/60 font-medium">
            {isRTL ? 'شامل ضريبة القيمة المضافة' : 'VAT Inclusive'}
          </span>
        </div>
        <div>
          <span className="inline-block text-xs font-sans font-semibold text-[#2B6E2A] bg-[#2B6E2A]/10 px-3 py-1 rounded-full border border-[#2B6E2A]/20">
            {isRTL ? 'متوفر • شحن سريع' : 'In Stock • UAE Express'}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. WEIGHT / SIZE / EXISTING PRODUCT OPTIONS                               */}
      {/* ========================================================================= */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-[#3C1518] uppercase tracking-wider text-xs">
            {isRTL ? 'وزن العبوة' : 'Pack Weight'}
          </span>
          <span className="text-[#3C1518]/60 text-xs font-sans font-medium">
            {isRTL ? 'عبوة فردية محكمة الإغلاق' : 'Single Pouch Format'}
          </span>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-white border-2 border-[#C8102E] text-[#C8102E] font-bold text-xs sm:text-sm font-sans rounded-lg shadow-2xs flex items-center gap-1.5">
            <span>{isRTL && product.arabicWeight ? product.arabicWeight : product.weight}</span>
            <span className="text-xs text-[#3C1518]/50 font-normal">
              ({isRTL ? 'قياسي' : 'Standard'})
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. PURCHASE MODE: ONE-TIME VS. SUBSCRIBE & SAVE                           */}
      {/* ========================================================================= */}
      <div className="mb-4 border border-[#3C1518]/15 rounded-xl bg-white overflow-hidden shadow-2xs">
        {/* OPTION 1: One-Time Purchase */}
        <label
          onClick={() => setPurchaseType('one-time')}
          className={`flex items-center justify-between p-3.5 sm:p-4 cursor-pointer border-b border-[#3C1518]/10 transition-colors ${
            purchaseType === 'one-time' ? 'bg-[#FAF7F2]' : 'hover:bg-[#FAF7F2]/50'
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
              {isRTL ? 'شراء لمرة واحدة' : 'One-Time Purchase'}
            </span>
          </div>
          <span className="text-xs sm:text-sm font-bold font-sans text-[#3C1518]">
            AED {regularPrice.toFixed(2)}
          </span>
        </label>

        {/* OPTION 2: Subscribe & Save 10% */}
        <div className={purchaseType === 'subscription' ? 'bg-[#FAF7F2]' : ''}>
          <label
            onClick={() => setPurchaseType('subscription')}
            className="flex items-center justify-between p-3.5 sm:p-4 cursor-pointer transition-colors"
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
                  {isRTL ? 'اشترك ووفر' : 'Subscribe & Save'}
                </span>
                <span className="bg-[#2B6E2A] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                  {isRTL ? 'وفر 10%' : 'Save 10%'}
                </span>
              </div>
            </div>
            <span className="text-xs sm:text-sm font-bold font-sans text-[#C8102E]">
              AED {subscriptionPrice.toFixed(2)}
            </span>
          </label>

          {/* Subscription Controls & Perks */}
          {purchaseType === 'subscription' && (
            <div className="px-4 pb-4 pt-1 border-t border-[#3C1518]/10 bg-[#FAF7F2] space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs pt-2">
                <span className="font-sans font-bold text-[#3C1518] uppercase tracking-wider text-[11px]">
                  {isRTL ? 'تكرار التوصيل:' : 'Deliver Every:'}
                </span>
                <span className="text-[#2B6E2A] font-sans font-bold text-xs uppercase">
                  {isRTL ? 'خصم 10% على كل دفعة' : '10% OFF Every Order'}
                </span>
              </div>

              {/* Frequency Selector */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: '30', labelEn: '30 Days', labelAr: '30 يوم', descEn: 'Recommended', descAr: 'مستحسن' },
                  { value: '60', labelEn: '60 Days', labelAr: '60 يوم', descEn: 'Standard', descAr: 'عادي' },
                  { value: '90', labelEn: '90 Days', labelAr: '90 يوم', descEn: 'Extended', descAr: 'ممتد' },
                ].map((freq) => (
                  <button
                    key={freq.value}
                    type="button"
                    onClick={() => setDeliveryFrequency(freq.value as any)}
                    className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer min-h-[44px] ${
                      deliveryFrequency === freq.value
                        ? 'border-[#C8102E] bg-white text-[#C8102E] font-bold shadow-2xs'
                        : 'border-[#3C1518]/15 bg-white/70 text-[#3C1518]/70 hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-sans font-bold">
                      {isRTL ? freq.labelAr : freq.labelEn}
                    </div>
                    <div className="text-[10px] text-[#3C1518]/50 uppercase tracking-tight font-medium">
                      {isRTL ? freq.descAr : freq.descEn}
                    </div>
                  </button>
                ))}
              </div>

              {/* Perks */}
              <div className="pt-2 border-t border-[#3C1518]/10 text-xs text-[#3C1518]/80 space-y-1.5 font-sans">
                <div className="flex items-center gap-2">
                  <span className="text-[#2B6E2A] font-bold">✓</span>
                  <span>{isRTL ? 'توفير 10% مستمر على كل طلب دوري' : 'Save 10% on every recurring harvest order'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#2B6E2A] font-bold">✓</span>
                  <span>{isRTL ? 'جدول توصيل مرن ومباشر إلى باب منزلك' : 'Flexible schedule delivered to your doorstep'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#2B6E2A] font-bold">✓</span>
                  <span>{isRTL ? 'يمكنك التخطي أو التعديل أو الإلغاء في أي وقت' : 'Skip, pause, or cancel anytime with zero fee'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. QUANTITY STEPPER + DOMINANT ADD TO CART CTA                            */}
      {/* ========================================================================= */}
      <div className="mb-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Quantity Stepper (min 48px touch targets) */}
        <div
          className="h-12 sm:h-14 bg-white border border-[#3C1518]/20 rounded-lg flex items-center px-1 shadow-2xs min-w-[130px] justify-between"
          role="group"
          aria-label={`Quantity selector for ${product.name}`}
        >
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="w-11 h-11 flex items-center justify-center text-[#3C1518] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:hover:bg-transparent rounded-md cursor-pointer transition-colors"
            aria-label={isRTL ? 'تقليل الكمية' : 'Decrease quantity'}
          >
            <Minus className="w-4 h-4 stroke-[2.5]" />
          </button>
          <span
            className="w-10 text-center text-sm sm:text-base font-bold text-[#3C1518] font-sans select-none"
            aria-live="polite"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-11 h-11 flex items-center justify-center text-[#3C1518] hover:bg-[#FAF7F2] rounded-md cursor-pointer transition-colors"
            aria-label={isRTL ? 'زيادة الكمية' : 'Increase quantity'}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Primary CTA (Dominant MAGIC Red, min 48px) */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 h-12 sm:h-14 px-7 rounded-lg font-bold text-xs sm:text-sm font-sans tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer transition-all shadow-md ${
            justAdded
              ? 'bg-[#2B6E2A] text-white'
              : 'bg-[#C8102E] hover:bg-[#A60D26] text-white active:scale-[0.99] border border-white/20'
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
              <span>{isRTL ? 'تمت الإضافة للسلة' : 'Added to Bag'}</span>
            </>
          ) : purchaseType === 'subscription' ? (
            <>
              <RefreshCw className="w-4 h-4 stroke-[2.5]" />
              <span>{isRTL ? 'اشترك ووفر' : 'SUBSCRIBE & SAVE'}</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span>{isRTL ? 'أضف إلى السلة' : 'ADD TO CART'}</span>
            </>
          )}
        </button>

        {/* View Bag Quick Trigger */}
        <button
          type="button"
          onClick={openCart}
          className="h-12 sm:h-14 px-5 bg-white hover:bg-[#FAF7F2] text-[#3C1518] border border-[#3C1518]/20 rounded-lg text-xs sm:text-sm font-sans font-bold cursor-pointer transition-colors hidden md:inline-flex items-center justify-center shadow-2xs"
        >
          {isRTL ? 'عرض السلة' : 'View Bag'}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 8. SUPPORTING ASSURANCE STRIP                                             */}
      {/* ========================================================================= */}
      <div className="pt-3 border-t border-[#3C1518]/12 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-[11px] text-[#3C1518]/75">
        <div className="p-2 bg-white/70 rounded-lg border border-[#3C1518]/10">
          <Truck className="w-3.5 h-3.5 text-[#C8102E] mx-auto mb-1" />
          <span className="font-bold block text-[#3C1518]">
            {isRTL ? 'توصيل مجاني' : 'Free Delivery'}
          </span>
          <span className="text-[10px] text-[#3C1518]/60">
            {isRTL ? 'للطلبات فوق 50 درهم' : 'Orders over AED 50'}
          </span>
        </div>
        <div className="p-2 bg-white/70 rounded-lg border border-[#3C1518]/10">
          <Clock className="w-3.5 h-3.5 text-[#C8102E] mx-auto mb-1" />
          <span className="font-bold block text-[#3C1518]">
            {isRTL ? 'شحن سريع' : 'UAE Express'}
          </span>
          <span className="text-[10px] text-[#3C1518]/60">
            {isRTL ? '30–45 دقيقة' : '30–45 min dispatch'}
          </span>
        </div>
        <div className="p-2 bg-white/70 rounded-lg border border-[#3C1518]/10">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2B6E2A] mx-auto mb-1" />
          <span className="font-bold block text-[#3C1518]">
            {isRTL ? 'تغليف نيتروجين' : 'Airtight Foil'}
          </span>
          <span className="text-[10px] text-[#3C1518]/60">
            {isRTL ? 'حماية تامة للأريج' : '100% Sealed Purity'}
          </span>
        </div>
      </div>
    </div>
  );
};
