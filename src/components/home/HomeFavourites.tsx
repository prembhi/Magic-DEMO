import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check, ArrowRight } from 'lucide-react';
import { SHOP_PRODUCTS, ShopProduct } from '../../data/shopProducts';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useShopCart } from '../../context/ShopCartContext';
import { useLanguage } from '../../context/LanguageContext';

export interface HomeFavouritesProps {
  onNavigateShop: (catId?: string) => void;
  onNavigateBundles?: () => void;
  onSelectProduct: (slug: string) => void;
}

export const HomeFavourites: React.FC<HomeFavouritesProps> = ({
  onNavigateShop,
  onNavigateBundles,
  onSelectProduct,
}) => {
  const { isRTL } = useLanguage();
  const { addItem } = useShopCart();

  // Carousel ref and scroll boundary state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Instant feedback for add-to-cart clicks
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Update carousel scroll button availability
  const checkScrollBoundaries = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    // Allow 4px margin of error for fractional pixel rounding
    if (isRTL) {
      // In RTL, scrollLeft can be 0 or negative depending on browser
      const maxScroll = scrollWidth - clientWidth;
      const currentScroll = Math.abs(scrollLeft);
      setCanScrollLeft(currentScroll < maxScroll - 4);
      setCanScrollRight(currentScroll > 4);
    } else {
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }
  }, [isRTL]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    checkScrollBoundaries();
    el.addEventListener('scroll', checkScrollBoundaries, { passive: true });
    window.addEventListener('resize', checkScrollBoundaries, { passive: true });

    return () => {
      el.removeEventListener('scroll', checkScrollBoundaries);
      window.removeEventListener('resize', checkScrollBoundaries);
    };
  }, [checkScrollBoundaries]);

  // Smooth scroll handler for circular arrows
  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;

    // Scroll by ~1 card width plus gap (approx 290px-310px)
    const cardStep = 295;
    const scrollOffset = direction === 'left' ? -cardStep : cardStep;
    const finalOffset = isRTL ? -scrollOffset : scrollOffset;

    el.scrollBy({ left: finalOffset, behavior: 'smooth' });
  };

  // Immediate Add to Cart with feedback
  const handleAddToCart = (e: React.MouseEvent, product: ShopProduct) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((current) => (current === product.id ? null : current));
    }, 1400);
  };

  // Badges per product for visual hierarchy
  const getProductBadge = (product: ShopProduct) => {
    if (product.id === 'toor-dal') {
      return { text: isRTL ? 'الأكثر طلباً' : 'BESTSELLER', color: 'bg-[#C8102E] text-white' };
    }
    if (product.id === 'haldi') {
      return { text: isRTL ? 'جديد الموسم' : 'NEW!', color: 'bg-[#2D6A4F] text-white' };
    }
    if (product.id === 'jeera') {
      return { text: isRTL ? 'أحادي المصدر' : 'SINGLE ORIGIN', color: 'bg-[#D4A843] text-[#3C1518]' };
    }
    return { text: isRTL ? 'غير ملمع 100%' : '100% UNPOLISHED', color: 'bg-white/95 text-[#3C1518] border border-[#3C1518]/15' };
  };

  // Category discovery items for Part B
  const categories = [
    {
      id: 'dals',
      title: isRTL ? 'البقوليات والعدس' : 'Everyday Pulses',
      subtitle: isRTL ? 'غير ملمعة · مفروزة بالليزر' : '100% Unpolished Dals',
      image: MAGIC_ASSETS.dalTadka,
      action: () => onNavigateShop('dals-lentils'),
    },
    {
      id: 'whole-spices',
      title: isRTL ? 'البهارات الكاملة' : 'Whole Spices',
      subtitle: isRTL ? 'حب بلدي نقي وعطري' : 'Sun-Dried Aromatics',
      image: MAGIC_ASSETS.editorial.multipleSpices,
      action: () => onNavigateShop('whole-spices'),
    },
    {
      id: 'ground-spices',
      title: isRTL ? 'التوابل المطحونة' : 'Ground Spices',
      subtitle: isRTL ? 'طحن بارد عالي الكركومين' : 'Cold-Milled Waigaon',
      image: MAGIC_ASSETS.editorial.rawSpicesBasket,
      action: () => onNavigateShop('ground-spices'),
    },
    {
      id: 'bundles',
      title: isRTL ? 'باقات المؤونة' : 'Pantry Bundles',
      subtitle: isRTL ? 'مجموعات التوفير الذكية' : 'Curated Everyday Sets',
      image: MAGIC_ASSETS.kitchen,
      action: () => (onNavigateBundles ? onNavigateBundles() : onNavigateShop()),
    },
    {
      id: 'bestsellers',
      title: isRTL ? 'الأكثر طلباً' : 'Bestsellers',
      subtitle: isRTL ? 'مفضلة المطابخ في الإمارات' : 'UAE Kitchen Favourites',
      image: MAGIC_ASSETS.editorial.dryChilliesInHand,
      action: () => onNavigateShop(),
    },
    {
      id: 'explore-all',
      title: isRTL ? 'جميع الأساسيات' : 'Explore All Staples',
      subtitle: isRTL ? 'توريد مباشر من المزرعة' : 'Direct Farm Collection',
      image: MAGIC_ASSETS.farmHero,
      action: () => onNavigateShop(),
    },
  ];

  return (
    <section
      id="favourites"
      className="w-full bg-[#FDF6EC] text-[#3C1518] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/12 relative overflow-hidden select-none"
      aria-labelledby="editorial-discovery-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* PART A: EDITORIAL PRODUCT SHOWCASE (Two-Column Layout)                     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
          
          {/* LEFT COLUMN: BRAND EDITORIAL PANEL */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between py-2 sm:py-4">
            <div className="space-y-4 sm:space-y-5">
              
              {/* Category Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
                  {isRTL ? 'توريد زراعي حقيقي' : 'FARM-TO-KITCHEN PURITY'}
                </span>
              </div>

              {/* Editorial Statement / Headline */}
              <h2
                id="editorial-discovery-heading"
                className="font-display font-extrabold text-2xl sm:text-3xl xl:text-[2.15rem] text-[#3C1518] leading-[1.2] tracking-tight"
              >
                {isRTL
                  ? '«طعم المزرعة الحقيقي يبدأ بالبقوليات غير الملمعة والتوابل المطحونة عند المصدر.»'
                  : '“Direct from generational farms. Ground and packed at source for pure aroma.”'}
              </h2>

              {/* Primary Action Button & Carousel Controls */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => onNavigateShop()}
                  className="magic-btn-primary min-h-[48px] px-8 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-[#C8102E] hover:bg-[#A60D26] text-white shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
                >
                  <span>{isRTL ? 'تسوق جميع الأساسيات' : 'SHOP ALL STAPLES'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 text-white" />
                </button>

                {/* Circular Arrow Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollCarousel('left')}
                    disabled={!canScrollLeft}
                    className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      !canScrollLeft
                        ? 'border-[#3C1518]/15 text-[#3C1518]/25 cursor-not-allowed bg-transparent'
                        : 'border-[#3C1518]/25 bg-white text-[#3C1518] hover:border-[#C8102E] hover:text-[#C8102E] hover:scale-105 active:scale-95 shadow-2xs'
                    }`}
                    aria-label={isRTL ? 'المنتج السابق' : 'Previous product'}
                  >
                    <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCarousel('right')}
                    disabled={!canScrollRight}
                    className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      !canScrollRight
                        ? 'border-[#3C1518]/15 text-[#3C1518]/25 cursor-not-allowed bg-transparent'
                        : 'border-[#3C1518]/25 bg-white text-[#3C1518] hover:border-[#C8102E] hover:text-[#C8102E] hover:scale-105 active:scale-95 shadow-2xs'
                    }`}
                    aria-label={isRTL ? 'المنتج التالي' : 'Next product'}
                  >
                    <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sourcing Transparency & Quality Credentials (Authentic trust proof) */}
            <div className="pt-6 sm:pt-8 border-t border-[#3C1518]/12 mt-6 sm:mt-8">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#3C1518]/60 mb-2.5">
                {isRTL ? 'معايير النقاء والشفافية المعتمدة' : 'OUR HARVEST & PURITY STANDARDS'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2 rounded-[10px] bg-[#FAF7F2] border border-[#3C1518]/8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-[#3C1518]">
                    {isRTL ? 'غير ملمع 100%' : '100% Unpolished'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-[10px] bg-[#FAF7F2] border border-[#3C1518]/8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-[#3C1518]">
                    {isRTL ? 'فرز ليزري 99.8%' : '99.8% Laser-Sorted'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-[10px] bg-[#FAF7F2] border border-[#3C1518]/8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-[#3C1518]">
                    {isRTL ? 'محصول الموسم الحالي' : 'Current Harvest'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-[10px] bg-[#FAF7F2] border border-[#3C1518]/8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3C1518] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-[#3C1518]">
                    {isRTL ? 'خالٍ من المضافات' : 'Zero Additives'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: HORIZONTALLY BROWSABLE PRODUCT CAROUSEL */}
          <div className="lg:col-span-8 xl:col-span-8 min-w-0 relative flex flex-col justify-center">
            
            {/* Scrollable Container (Shows 3 full cards + partial peek of 4th on desktop) */}
            <div
              ref={carouselRef}
              className="flex gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar select-none pe-4 sm:pe-6"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {SHOP_PRODUCTS.map((product) => {
                const badge = getProductBadge(product);
                const isItemAdded = addedProductId === product.id;
                const displayName = isRTL && product.arabicName ? product.arabicName : product.name;
                const displayWeight = isRTL && product.arabicWeight ? product.arabicWeight : product.weight;
                const displayCategory = isRTL && product.arabicCategory ? product.arabicCategory : product.category;
                const displayPrice = isRTL ? `${product.price.toFixed(2)} د.إ` : `AED ${product.price.toFixed(2)}`;

                return (
                  <article
                    key={product.id}
                    onClick={() => onSelectProduct(product.slug)}
                    className="group bg-white rounded-[14px] border border-[#3C1518]/12 hover:border-[#C8102E] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md cursor-pointer w-[240px] sm:w-[250px] lg:w-[238px] xl:w-[250px] 2xl:w-[268px] shrink-0 snap-start select-none relative"
                    aria-label={`${displayName}, ${displayWeight}, ${displayPrice}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onSelectProduct(product.slug);
                      }
                    }}
                  >
                    <div>
                      {/* Product Packaging Stage */}
                      <div className="relative w-full h-[220px] sm:h-[235px] md:h-[245px] bg-gradient-to-b from-[#FAF7F2] to-[#F5ECE1]/60 flex items-center justify-center p-3 overflow-hidden rounded-t-[14px]">
                        
                        {/* Top Pill Badge */}
                        <span
                          className={`absolute top-3 start-3 z-20 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-2xs ${badge.color}`}
                        >
                          {badge.text}
                        </span>

                        {/* Packaging Pouch Image */}
                        <img
                          src={product.image}
                          alt={product.altText}
                          loading="lazy"
                          draggable={false}
                          className="h-[84%] max-h-[88%] w-auto max-w-[85%] object-contain select-none filter drop-shadow-[0_10px_18px_rgba(60,21,24,0.16)] group-hover:scale-104 transition-transform duration-300"
                        />

                        {/* Ground Contact Shadow */}
                        <div
                          className="absolute bottom-2.5 inset-x-8 h-2 rounded-full blur-xs pointer-events-none opacity-25"
                          style={{
                            background: 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.4) 0%, transparent 70%)',
                          }}
                        />
                      </div>

                      {/* Product Metadata & Info */}
                      <div className="p-3.5 sm:p-4 flex flex-col">
                        
                        {/* Category & Weight Pill */}
                        <div className="flex items-center justify-between gap-1.5 mb-1.5">
                          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C8102E]">
                            {displayCategory}
                          </span>
                          <span className="border border-[#3C1518]/18 rounded-full px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-[#3C1518] bg-white">
                            {displayWeight}
                          </span>
                        </div>

                        {/* Product Title */}
                        <h3 className="font-display font-bold text-base sm:text-[17px] text-[#3C1518] group-hover:text-[#C8102E] transition-colors leading-snug line-clamp-1">
                          {displayName}
                        </h3>

                        {/* Star Rating & Origin */}
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#3C1518]/70">
                          <span className="text-[#D4A843] font-bold tracking-tighter">★★★★★</span>
                          <span className="font-semibold text-[#3C1518] text-[11px]">5.0</span>
                          <span className="text-[#3C1518]/30">·</span>
                          <span className="truncate text-[10px] text-[#3C1518]/60">
                            {product.origin ? product.origin.split(',')[0] : 'India'}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="mt-2 flex items-baseline">
                          <span className="font-display font-extrabold text-base sm:text-lg text-[#3C1518]">
                            {displayPrice}
                          </span>
                        </div>

                        {/* Short Description */}
                        <p className="text-xs text-[#3C1518]/70 line-clamp-2 leading-relaxed min-h-[2.2rem] mt-1 font-sans">
                          {product.culinaryProfile || product.ingredients}
                        </p>

                        {/* Stock Status Indicator */}
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 mt-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          <span>{isRTL ? 'متوفر · محصول الموسم' : 'In stock · Current Harvest'}</span>
                        </div>

                      </div>
                    </div>

                    {/* ADD TO CART ACTION BUTTON */}
                    <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-1">
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, product)}
                        className={`w-full min-h-[44px] h-11 rounded-full text-xs sm:text-[13px] font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                          isItemAdded
                            ? 'bg-[#2D6A4F] text-white scale-[1.02]'
                            : 'bg-[#C8102E] text-white hover:bg-[#A00D24] active:scale-[0.98]'
                        }`}
                        aria-label={`Add ${displayName} to cart`}
                      >
                        {isItemAdded ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>{isRTL ? 'تمت الإضافة' : 'ADDED TO BAG'}</span>
                          </>
                        ) : (
                          <span>{isRTL ? 'أضف إلى السلة' : 'ADD TO CART'}</span>
                        )}
                      </button>
                    </div>

                  </article>
                );
              })}
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* PART B: MOST POPULAR CATEGORIES (Horizontal Discovery Cards)               */}
        {/* ========================================================================= */}
        <div className="pt-12 sm:pt-16 lg:pt-20 border-t border-[#3C1518]/12 mt-12 sm:mt-16">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
                {isRTL ? 'استكشف التشكيلة الكاملة' : 'EXPLORE BY CATEGORY'}
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#3C1518] mt-1 tracking-tight">
                {isRTL ? 'الأكثر طلباً' : 'MOST POPULAR'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#3C1518]/70 max-w-md font-sans">
              {isRTL
                ? 'استكشف البقوليات غير الملمعة، والتوابل المطحونة طازجة، ومجموعات المؤونة الأساسية لكل مطبخ.'
                : 'Single-origin pulses, whole aromatic seeds, and cold-milled spices for daily cooking.'}
            </p>
          </div>

          {/* Categories Row: Horizontal scroll on mobile, 6-col grid on desktop */}
          <div className="flex overflow-x-auto gap-3.5 sm:gap-4 lg:gap-5 pb-3 sm:pb-0 snap-x snap-mandatory no-scrollbar pe-4 md:grid md:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={cat.action}
                className="group rounded-[14px] bg-white border border-[#3C1518]/12 hover:border-[#C8102E] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col shadow-2xs hover:shadow-md shrink-0 w-[155px] sm:w-[175px] md:w-auto snap-start select-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    cat.action();
                  }
                }}
              >
                {/* Photographic Category Thumbnail */}
                <div className="aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#FAF7F2] relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                  />
                  {/* Subtle inner top-to-bottom shading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Category Titles Beneath Image */}
                <div className="p-3 sm:p-3.5 text-center flex flex-col items-center justify-center flex-1 bg-white">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-[#3C1518] group-hover:text-[#C8102E] transition-colors line-clamp-1 leading-snug">
                    {cat.title}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] text-[#3C1518]/60 mt-0.5 line-clamp-1">
                    {cat.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
