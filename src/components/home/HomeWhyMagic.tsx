import React, { useState, useEffect, useRef } from 'react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';

interface ComparisonPrinciple {
  title: string;
  magic: string;
  bulk: string;
  packaged: string;
}

export const HomeWhyMagic: React.FC = () => {
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Three Core Sourcing Dimensions
  const principles: ComparisonPrinciple[] = [
    {
      title: isRTL ? 'التوريد الزراعي المباشر' : 'DIRECT FARM SOURCING',
      magic: isRTL ? 'شراكات مباشرة 100% مع مزارع أسرية متوارثة' : 'Direct partnerships with generational growers',
      bulk: isRTL ? 'مزادات حبوب مجهولة عبر وسطاء متعددين' : 'Anonymous auctions through multiple intermediaries',
      packaged: isRTL ? 'سلاسل توريد تجارية غير محددة المنشأ' : 'Commercial supply chains without origin disclosure',
    },
    {
      title: isRTL ? 'طزاجة الحصاد والمعالجة' : 'FRESHNESS & PROCESSING',
      magic: isRTL ? 'مطحون على البارد ومغلف بالنيتروجين لحفظ الأريج' : 'Cold-milled & nitrogen-flushed to lock in aroma',
      bulk: isRTL ? 'تخزين مطول مع معالجة بالزيوت أو الكبريت' : 'Extended warehousing with artificial polishing oils',
      packaged: isRTL ? 'معالجة تجارية مع إضافات لمنع التكتل' : 'Industrial processing with potential flow agents',
    },
    {
      title: isRTL ? 'النقاء والفحص المخبري' : 'PURITY & TESTING',
      magic: isRTL ? 'محاصيل مفحوصة مخبرياً ومفروزة بالليزر 100%' : 'Lab-tested single-origin staples, laser-sorted for purity',
      bulk: isRTL ? 'درجات نقاء متفاوتة وخلط بين شحنات متعددة' : 'Inconsistent commodity grading and batch blending',
      packaged: isRTL ? 'مطابقة للمواصفات العامة دون تتبع المزرعة' : 'Standard compliance without farm traceability',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="why-magic"
      className="w-full bg-[#FAF5EE] text-[#3C1518] py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-12 border-b border-[#3C1518]/12 select-none relative overflow-hidden"
      aria-labelledby="why-magic-heading"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. EDITORIAL HEADLINE & SPACIOUS INTRO                                    */}
        {/* ========================================================================= */}
        <div
          style={{
            transform: isVisible || isReducedMotion ? 'none' : 'translateY(25px)',
            opacity: isVisible || isReducedMotion ? 1 : 0,
            transition: 'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="w-full max-w-none lg:max-w-3xl mb-6 sm:mb-8"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#C8102E] block mb-2">
            {isRTL ? 'معيار ماجيك' : 'THE MAGIC STANDARD'}
          </span>

          <h2
            id="why-magic-heading"
            className="font-display font-extrabold text-[1.75rem] xs:text-3xl sm:text-5xl lg:text-7xl text-[#3C1518] tracking-tight leading-[1.02] sm:leading-[0.98] mb-2.5"
          >
            {isRTL ? 'ما الذي يجعل ماجيك متفردة؟' : 'WHAT MAKES MAGIC DIFFERENT?'}
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#3C1518]/85 font-sans leading-relaxed w-full lg:max-w-2xl">
            {isRTL
              ? 'من الشراكات الزراعية المباشرة إلى الطحن البارد والفحص المخبري، هكذا نحمي كل محصول.'
              : 'From direct grower partnerships to cold-milling and laboratory testing, here is how we protect every harvest.'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. LAYER 1: LARGE OUTER EDITORIAL BACKGROUND PANEL (#F3ECE0)              */}
        {/* ========================================================================= */}
        <div
          style={{
            transform: isVisible || isReducedMotion ? 'none' : 'translateY(30px)',
            opacity: isVisible || isReducedMotion ? 1 : 0,
            transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 100ms',
          }}
          className="bg-[#F3ECE0] rounded-3xl border border-[#3C1518]/12 p-4 sm:p-6 lg:p-8"
        >
          {/* THREE-COLUMN LAYOUT WITH DEDICATED CENTER MAGIC INNER HIGHLIGHT PANEL */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.35fr_1fr] gap-4 sm:gap-6 lg:gap-8 items-stretch">
            
            {/* ------------------------------------------------------------------- */}
            {/* COLUMN 1: CONVENTIONAL BULK MARKET (LEFT - UNHIGHLIGHTED CANVAS)    */}
            {/* ------------------------------------------------------------------- */}
            <div className="p-3 sm:p-4 lg:p-5 flex flex-col justify-between order-2 md:order-1">
              {/* Header Visual */}
              <div className="flex flex-col items-center text-center pb-3 border-b border-[#3C1518]/15">
                <div className="h-28 sm:h-34 lg:h-36 w-full flex items-center justify-center opacity-85 pointer-events-none select-none">
                  <img
                    src={MAGIC_ASSETS.illustrations.harvestBasket}
                    alt="Conventional Bulk Market Produce"
                    style={{ mixBlendMode: 'multiply' }}
                    className="max-h-24 sm:max-h-30 lg:max-h-32 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#3C1518] tracking-tight mt-2.5 block leading-tight">
                  {isRTL ? 'أسواق الجملة' : 'CONVENTIONAL'}
                </h3>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B4226] block mt-0.5">
                  {isRTL ? 'التجارية التقليدية' : 'BULK MARKET'}
                </span>
              </div>

              {/* 4 Comparison Principles */}
              <div className="divide-y divide-[#3C1518]/10 flex-1 flex flex-col justify-between">
                {principles.map((p) => (
                  <div key={p.title} className="py-2.5 sm:py-3 lg:py-3.5 flex flex-col justify-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6B4226] block mb-0.5">
                      {p.title}
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-[#3C1518]/75 leading-relaxed">
                      {p.bulk}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* COLUMN 2: MAGIC (CENTER - LAYER 2: CONTINUOUS HIGHLIGHTED PANEL)    */}
            {/* ------------------------------------------------------------------- */}
            <div className="bg-[#FDF6EC] rounded-2xl border border-[#3C1518]/12 border-t-2 border-t-[#C8102E] shadow-2xs p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between order-1 md:order-2 relative">
              {/* Header Visual: Authentic Toor Dal Product Packaging */}
              <div className="flex flex-col items-center text-center pb-3 border-b border-[#3C1518]/15">
                <div className="h-36 sm:h-44 lg:h-48 w-full flex items-center justify-center pointer-events-none select-none">
                  <img
                    src={MAGIC_ASSETS.toor}
                    alt="MAGIC Toor Dal Authentic Packaging Pouch"
                    className="max-h-full w-auto object-contain filter drop-shadow-md"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#C8102E] tracking-tight mt-2.5 block leading-tight">
                  {isRTL ? 'ماجيك' : 'MAGIC'}
                </h3>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3C1518] block mt-0.5">
                  {isRTL ? 'معيارنا المعتمد' : 'OUR STANDARD'}
                </span>
              </div>

              {/* 4 Comparison Principles (Continuous inside highlight) */}
              <div className="divide-y divide-[#3C1518]/12 flex-1 flex flex-col justify-between">
                {principles.map((p) => (
                  <div key={p.title} className="py-2.5 sm:py-3 lg:py-3.5 flex flex-col justify-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C8102E] block mb-0.5">
                      {p.title}
                    </span>
                    <p className="font-sans font-semibold text-sm sm:text-base text-[#3C1518] leading-relaxed">
                      {p.magic}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* COLUMN 3: TYPICAL PACKAGED SPICE (RIGHT - UNHIGHLIGHTED CANVAS)     */}
            {/* ------------------------------------------------------------------- */}
            <div className="p-3 sm:p-4 lg:p-5 flex flex-col justify-between order-3 md:order-3">
              {/* Header Visual */}
              <div className="flex flex-col items-center text-center pb-3 border-b border-[#3C1518]/15">
                <div className="h-28 sm:h-34 lg:h-36 w-full flex items-center justify-center opacity-85 pointer-events-none select-none">
                  <img
                    src={MAGIC_ASSETS.illustrations.brassBowl}
                    alt="Typical Packaged Spice"
                    style={{ mixBlendMode: 'multiply' }}
                    className="max-h-24 sm:max-h-30 lg:max-h-32 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#3C1518] tracking-tight mt-2.5 block leading-tight">
                  {isRTL ? 'التوابل التجارية' : 'TYPICAL'}
                </h3>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B4226] block mt-0.5">
                  {isRTL ? 'المعلبة المتداولة' : 'PACKAGED SPICE'}
                </span>
              </div>

              {/* 4 Comparison Principles */}
              <div className="divide-y divide-[#3C1518]/10 flex-1 flex flex-col justify-between">
                {principles.map((p) => (
                  <div key={p.title} className="py-2.5 sm:py-3 lg:py-3.5 flex flex-col justify-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6B4226] block mb-0.5">
                      {p.title}
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-[#3C1518]/75 leading-relaxed">
                      {p.packaged}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RESTRAINED MARGIN DETAIL INSIDE PANEL */}
          <div className="mt-5 pt-4 border-t border-[#3C1518]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-[#6B4226] tracking-wider uppercase">
              {isRTL ? 'محاصيل موثقة أحادية المنشأ مخصصة للمطابخ المنزلية في الإمارات' : 'DOCUMENTED SINGLE-ORIGIN HARVESTS FOR UAE HOME KITCHENS'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
