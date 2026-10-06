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
      className="w-full bg-[#FAF5EE] text-[#3C1518] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/12 select-none relative overflow-hidden"
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
          className="max-w-3xl mb-8 sm:mb-10"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#5A7247] mb-2.5">
            {isRTL ? 'المنشأ الزراعي والتوريد المتوارث' : 'SOURCING ETHOS & PROVENANCE'}
          </p>
          <h2
            id="farm-provenance-heading"
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#3C1518] tracking-tight leading-[0.98] mb-3.5"
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
        {/* 2. AUTHENTIC EDITORIAL PHOTOGRAPHY SPREAD                                 */}
        {/* ========================================================================= */}
        <div
          style={{
            transform: isVisible || isReducedMotion ? 'none' : 'translateY(30px)',
            opacity: isVisible || isReducedMotion ? 1 : 0,
            transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms',
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          {/* DOMINANT LANDSCAPE PHOTOGRAPHY (7 Cols on Desktop) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-[#3C1518]/15 bg-[#3C1518] min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] flex flex-col justify-end p-6 sm:p-8 group shadow-md">
            <img
              src={MAGIC_ASSETS.editorial.chilliField}
              alt="Authentic Indian Chilli Harvest Field"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] group-hover:scale-103 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3C1518]/90 via-[#3C1518]/30 to-transparent pointer-events-none" />

            <div className="relative z-10 text-white max-w-xl">
              <span className="text-xs font-semibold tracking-widest text-[#D4A843] uppercase block mb-1.5">
                {isRTL ? 'حقول حصاد الشمس المفتوحة' : 'OPEN-AIR SUN HARVEST BELTS'}
              </span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#FDF6EC] leading-tight mb-2">
                {isRTL ? 'عائلات زراعية تتوارث الأرض والمحصول' : 'Generational Growers Preserving Soil & Heritage'}
              </h3>
              <p className="text-xs sm:text-sm text-[#FDF6EC]/85 font-sans leading-relaxed mb-4">
                {isRTL
                  ? 'محاصيل تُحصد في أوانها الطبيعي، وتجفف تحت أشعة الشمس بدون أي معالجات كيميائية أو زيوت صناعية.'
                  : 'Crops harvested at peak physiological maturity, open-air cured without synthetic sulfur baths or chemical polishes.'}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#D4A843] bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full border border-[#D4A843]/40">
                  {isRTL ? '15–20% علاوة سعر عادل' : '15–20% Fair Price Premium'}
                </span>
              </div>
            </div>
          </div>

          {/* HUMAN STORYTELLING COMPANION SPREAD (4 Cols on Desktop) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            {/* Real Grower Portrait Card */}
            <div className="relative rounded-2xl overflow-hidden border border-[#3C1518]/15 bg-white p-5 flex flex-col justify-between shadow-xs flex-1">
              <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-[#FAF5EE] mb-4">
                <img
                  src={MAGIC_ASSETS.editorial.oldLadyInFarm}
                  alt="Generational Indian Farmer"
                  className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8102E] block mb-1">
                  {isRTL ? 'الكرامة الزراعية' : 'GROWER DIGNITY'}
                </span>
                <h4 className="font-display font-extrabold text-lg sm:text-xl text-[#3C1518] leading-snug mb-2">
                  {isRTL ? 'شراكات مباشرة 100%' : '100% Direct Partnerships'}
                </h4>
                <p className="text-xs sm:text-sm text-[#3C1518]/80 font-sans leading-relaxed mb-4">
                  {isRTL
                    ? 'نحن نلغي كافة الوسطاء التجاريين لضمان وصول القيمة العادلة مباشرة للأسر التي تزرع طعامنا.'
                    : 'Middlemen are bypassed so fair financial reward reaches the families whose generational knowledge nurtures every harvest.'}
                </p>
              </div>

              <button
                type="button"
                onClick={onNavigateImpact}
                className="w-full min-h-[46px] h-11 sm:h-12 px-6 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] group"
              >
                <span>{isRTL ? 'استكشف أثرنا الزراعي' : 'OUR SOURCING ETHOS'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
