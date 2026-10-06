import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { SHOP_PRODUCTS } from '../../data/shopProducts';
import { ShopProductCard } from '../shop/ShopProductCard';
import { useLanguage } from '../../context/LanguageContext';

interface HomeFavouritesProps {
  onNavigateShop: () => void;
  onSelectProduct: (slug: string) => void;
}

export const HomeFavourites: React.FC<HomeFavouritesProps> = ({
  onNavigateShop,
  onSelectProduct,
}) => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    const factor = direction === 'left' ? -1 : 1;
    scrollContainerRef.current.scrollBy({
      left: factor * scrollAmount * (isRTL ? -1 : 1),
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="favourites"
      className="w-full bg-[#FDF6EC] text-[#3C1518] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/12 select-none relative overflow-hidden"
      aria-labelledby="favourites-heading"
    >
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* EDITORIAL HEADER: CLEAN SPREAD INTRO (NO CLUTTERED FLOATING ARTWORK)       */}
        {/* ========================================================================= */}
        <div className="mb-10 sm:mb-12 pb-4 border-b border-[#3C1518]/15 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-2">
            <div className="max-w-3xl">
              <h2
                id="favourites-heading"
                style={{
                  transform: isVisible || isReducedMotion ? 'none' : 'translateY(40px)',
                  opacity: isVisible || isReducedMotion ? 1 : 0,
                  transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 100ms',
                }}
                className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#3C1518] tracking-tight leading-[0.98] mb-3"
              >
                {isRTL ? (
                  <>
                    مختارات المطبخ.
                    <br />
                    <span className="text-[#C8102E]">الأساسيات اليومية.</span>
                  </>
                ) : (
                  <>
                    KITCHEN FAVOURITES.
                    <br />
                    <span className="text-[#C8102E]">DAILY ESSENTIALS.</span>
                  </>
                )}
              </h2>
              <p
                style={{
                  transform: isVisible || isReducedMotion ? 'none' : 'translateY(25px)',
                  opacity: isVisible || isReducedMotion ? 1 : 0,
                  transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 200ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 200ms',
                }}
                className="text-lg sm:text-xl text-[#3C1518]/85 font-normal leading-relaxed max-w-2xl font-sans"
              >
                {isRTL
                  ? 'بقوليات كاملة مفروزة بالليزر وتوابل مجففة بالشمس قادمة مباشرة من أخصب الترب الزراعية الهندية إلى مطبخك في الإمارات.'
                  : 'Laser-sorted whole pulses and cold-milled spices harvested from generational soil and brought directly to your UAE pantry.'}
              </p>
            </div>
          </div>

          {/* Navigation controls row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-[#3C1518]/10">
            <button
              type="button"
              onClick={onNavigateShop}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#C8102E] hover:text-[#A60D26] transition-colors cursor-pointer group"
            >
              <span>{isRTL ? `عرض جميع الأساسيات (${SHOP_PRODUCTS.length})` : `VIEW ALL ${SHOP_PRODUCTS.length} STAPLES`}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>

            {/* Carousel Navigation Arrows */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs font-semibold text-[#3C1518]/60 me-1 uppercase tracking-wider">
                {isRTL ? 'اسحب ←' : 'SWIPE →'}
              </span>
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-11 h-11 rounded-full bg-white border border-[#3C1518]/25 hover:border-[#C8102E] text-[#3C1518] hover:text-[#C8102E] hover:scale-105 active:scale-95 shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label="Scroll products left"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-11 h-11 rounded-full bg-white border border-[#3C1518]/25 hover:border-[#C8102E] text-[#3C1518] hover:text-[#C8102E] hover:scale-105 active:scale-95 shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label="Scroll products right"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LARGE PRODUCT PRESENTATION SPREAD (25-35% LARGER PROMINENCE)              */}
        {/* ========================================================================= */}
        <div
          style={{
            transform: isVisible || isReducedMotion ? 'none' : 'translateX(60px)',
            opacity: isVisible || isReducedMotion ? 1 : 0,
            transition: 'opacity 750ms cubic-bezier(0.22, 1, 0.36, 1) 200ms, transform 750ms cubic-bezier(0.22, 1, 0.36, 1) 200ms',
          }}
          className="relative will-change-transform pt-1 pb-2"
        >
          {/* CAROUSEL OF LARGE AUTHENTIC PACKAGING PRODUCTS */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 sm:gap-6 lg:gap-7 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar pe-8 sm:pe-14 lg:pe-20 relative z-10"
          >
            {SHOP_PRODUCTS.map((product, idx) => (
              <div
                key={product.id}
                style={{
                  transform: isVisible || isReducedMotion ? 'none' : 'translateY(35px)',
                  opacity: isVisible || isReducedMotion ? 1 : 0,
                  transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${250 + idx * 80}ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${250 + idx * 80}ms`,
                }}
                className="shrink-0 w-[340px] sm:w-[390px] md:w-[430px] lg:w-[470px] xl:w-[500px] 2xl:w-[520px] snap-start will-change-transform"
              >
                <ShopProductCard
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              </div>
            ))}
          </div>

          {/* Right Edge Editorial Fade Overlay */}
          <div
            className="absolute top-0 bottom-4 end-0 w-16 sm:w-28 lg:w-36 pointer-events-none z-20"
            style={{
              background: isRTL
                ? 'linear-gradient(to left, transparent 0%, rgba(253, 246, 236, 0.4) 40%, rgba(253, 246, 236, 0.85) 75%, #FDF6EC 100%)'
                : 'linear-gradient(to right, transparent 0%, rgba(253, 246, 236, 0.4) 40%, rgba(253, 246, 236, 0.85) 75%, #FDF6EC 100%)',
            }}
            aria-hidden="true"
          />
        </div>

      </div>
    </section>
  );
};
