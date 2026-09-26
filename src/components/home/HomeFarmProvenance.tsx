import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';

interface HomeFarmProvenanceProps {
  onNavigateImpact: () => void;
}

export const HomeFarmProvenance: React.FC<HomeFarmProvenanceProps> = ({
  onNavigateImpact,
}) => {
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
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
      { threshold: 0.12 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="farm-to-kitchen"
      className="w-full bg-[#FAF5EE] text-[#3C1518] py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/12 select-none relative overflow-hidden"
      aria-labelledby="farm-provenance-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. EDITORIAL INTRO                                                        */}
        {/* ========================================================================= */}
        <div
          style={{
            transform: isVisible || isReducedMotion ? 'none' : 'translateY(25px)',
            opacity: isVisible || isReducedMotion ? 1 : 0,
            transition: 'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="max-w-3xl mb-6 sm:mb-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#5A7247] mb-2">
            {isRTL ? 'المنشأ الزراعي والتوريد المتوارث' : 'SOURCING ETHOS & PROVENANCE'}
          </p>
          <h2
            id="farm-provenance-heading"
            className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#3C1518] tracking-tight leading-[0.98] mb-3"
          >
            {isRTL ? (
              <>
                من مزارع الهند الأصيلة
                <br />
                <span className="text-[#C8102E]">إلى مخزن ماجيك في منزلك.</span>
              </>
            ) : (
              <>
                FROM INDIAN FARMS
                <br />
                <span className="text-[#C8102E]">TO YOUR MAGIC PANTRY.</span>
              </>
            )}
          </h2>
          <p className="text-base sm:text-lg text-[#3C1518]/85 leading-relaxed font-sans max-w-2xl">
            {isRTL
              ? 'نحن لا نشتري من مزادات الحبوب المجهولة. نحن نبني شراكات مباشرة مع عائلات زراعية معتمدة عبر أرقى الأحزمة الزراعية في الهند، وندفع علاوات عادلة مع الحفاظ على البذور التراثية النقية لطهي منزلي أصيل في دولة الإمارات.'
              : 'We don\'t buy from anonymous wholesale grain auctions. We partner directly with verified farming families across India\'s premier agricultural belts, paying fair premiums and preserving heritage seed varieties for unhurried home cooking in the UAE.'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. ONE EDITORIAL FARM LANDSCAPE STORY (INTEGRATED LANDSCAPE + FARMER)     */}
        {/* ========================================================================= */}
        <div
          style={{
            transform: isVisible || isReducedMotion ? 'none' : 'translateY(30px)',
            opacity: isVisible || isReducedMotion ? 1 : 0,
            transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms',
          }}
          className="relative w-full rounded-2xl overflow-hidden border border-[#3C1518]/15 bg-[#FDF6EC] shadow-xs"
        >
          {/* Main Landscape Stage */}
          <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px] overflow-hidden">
            {/* Background Agricultural Landscape Artwork */}
            <img
              src={MAGIC_ASSETS.farmEditorial}
              alt="Indian Farm Harvest Landscape"
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Subtle base gradient scrim for editorial readability without occluding artwork */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3C1518]/85 via-[#3C1518]/25 to-transparent pointer-events-none" />

            {/* INTEGRATED FARMER ILLUSTRATION (Standing in the farm landscape on the right side) */}
            <div
              aria-hidden="true"
              className="absolute right-4 sm:right-8 md:right-12 lg:right-16 bottom-0 z-10 pointer-events-none select-none flex items-end justify-center"
            >
              <img
                src={MAGIC_ASSETS.illustrations.farmerField}
                alt=""
                className="w-32 sm:w-44 md:w-52 lg:w-60 xl:w-64 h-auto max-h-[200px] sm:max-h-[250px] md:max-h-[290px] lg:max-h-[330px] object-contain object-bottom drop-shadow-sm"
                loading="lazy"
              />
            </div>

            {/* Editorial Caption & Action Band */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between text-white gap-3 sm:gap-6">
              <div className="max-w-sm sm:max-w-md md:max-w-lg">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#D4A843] font-bold block mb-1">
                  {isRTL ? 'شراكات حصاد مباشرة 100%' : '100% DIRECT HARVEST PARTNERSHIPS'}
                </span>
                <p className="font-display font-bold text-sm sm:text-lg md:text-xl text-[#FDF6EC] leading-snug">
                  {isRTL ? '15–20% أعلى من أسعار السوق تُدفع مباشرة للمزارعين' : '15–20% Above Mandi Rates Paid Directly to Generational Growers'}
                </p>
              </div>

              <button
                type="button"
                onClick={onNavigateImpact}
                className="h-10 px-5 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto active:scale-[0.98] group"
              >
                <span>{isRTL ? 'استكشف أثرنا الزراعي' : 'EXPLORE THE IMPACT'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
