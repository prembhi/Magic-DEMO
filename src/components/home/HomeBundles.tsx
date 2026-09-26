import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';

interface HomeBundlesProps {
  onNavigateBundles: (bundleSlug?: string) => void;
  onSelectProduct?: (slug: string) => void;
}

interface BundleStory {
  id: string;
  slug: string;
  dishName: string;
  tagline: string;
  description: string;
  badge: string;
  dishPhoto: string;
  stapleCountText: string;
  products: {
    name: string;
    weight: string;
    image: string;
    slug: string;
  }[];
}

export const HomeBundles: React.FC<HomeBundlesProps> = ({
  onNavigateBundles,
  onSelectProduct,
}) => {
  const { t, isRTL } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height + windowHeight;
      const currentPos = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentPos / totalDist));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReducedMotion]);

  // Authentic Recipe-Based Sets mapped strictly to current MAGIC catalog
  const bundles: BundleStory[] = [
    {
      id: 'dal-tadka',
      slug: 'indian-kitchen-starter',
      dishName: isRTL ? 'دال تادكا' : 'DAL TADKA',
      tagline: isRTL ? 'عدس أصفر متبل بالكمون المحمص والسمن البلدي' : 'Tempered Yellow Pigeon Peas with Sizzled Cumin & Ghee',
      description: isRTL
        ? 'طبق الدال الأصفر الأكثر دفئاً وأصالة في البيوت الهندية. تور دال ذهبي نقي غير ملمع ممزوج بكركم سالم ومزين بطشة كمون عطري فواح.'
        : 'The quintessential comforting yellow dal of Indian homes. Golden unpolished Toor Dal infused with potent Salem turmeric, finished with an aromatic sputtering tadka of whole cumin seeds.',
      badge: isRTL ? 'كلاسيكي منزلي' : 'HOMESTYLE CLASSIC',
      dishPhoto: MAGIC_ASSETS.dalTadka,
      stapleCountText: isRTL ? '3 أساسيات من مؤونة ماجيك' : '3 MAGIC PANTRY STAPLES',
      products: [
        {
          name: isRTL ? 'تور دال' : 'Toor Dal',
          weight: '1 KG',
          image: MAGIC_ASSETS.toor,
          slug: 'magic-toor-dal',
        },
        {
          name: isRTL ? 'كركم هالدي' : 'Pure Haldi',
          weight: '100 G',
          image: MAGIC_ASSETS.haldi,
          slug: 'magic-haldi',
        },
        {
          name: isRTL ? 'كمون جيرا' : 'Whole Jeera',
          weight: '100 G',
          image: MAGIC_ASSETS.jeera,
          slug: 'magic-jeera',
        },
      ],
    },
    {
      id: 'dal-makhani',
      slug: 'dal-lovers-kit',
      dishName: isRTL ? 'دال مخني' : 'DAL MAKHANI',
      tagline: isRTL ? 'عدس أسود مطهو ببطء على نار هادئة مع منكهات عطرية' : 'Slow-Simmered Creamy Black Lentils & Whole Aromatics',
      description: isRTL
        ? 'طبق غني ومخملي من شمال الهند، يرتكز على حبوب أوراد سوداء مفروزة بالليزر مع بذور الكمون الفواحة والكركم الذهبي النقي.'
        : 'A rich, velvety North Indian classic built around laser-sorted whole black Urad, fragrant blooming cumin seeds, and golden single-origin ground turmeric.',
      badge: isRTL ? 'وصفة تراثية' : 'HERITAGE RECIPE',
      dishPhoto: MAGIC_ASSETS.kitchenSunset,
      stapleCountText: isRTL ? '3 أساسيات من مؤونة ماجيك' : '3 MAGIC PANTRY STAPLES',
      products: [
        {
          name: isRTL ? 'أوراد حب كامل' : 'Urad Whole',
          weight: '1 KG',
          image: MAGIC_ASSETS.urad,
          slug: 'magic-urad-whole',
        },
        {
          name: isRTL ? 'كركم هالدي' : 'Pure Haldi',
          weight: '100 G',
          image: MAGIC_ASSETS.haldi,
          slug: 'magic-haldi',
        },
        {
          name: isRTL ? 'كمون جيرا' : 'Whole Jeera',
          weight: '100 G',
          image: MAGIC_ASSETS.jeera,
          slug: 'magic-jeera',
        },
      ],
    },
    {
      id: 'masoor-comfort',
      slug: 'everyday-dal-kit',
      dishName: isRTL ? 'مسور دال مريح' : 'MASOOR COMFORT',
      tagline: isRTL ? 'عدس أحمر سريع الطهي لوجبات خفيفة مغذية' : 'Quick-Cooking Red Lentils for Gentle Restorative Meals',
      description: isRTL
        ? 'عدس مسور أحمر مجروش سريع الطهي مقترن بالكمون والكركم المجفف بالشمس لوجبات مسائية سريعة وأطباق خيشدي مهدئة.'
        : 'Tender, sweet split red Masoor Dal paired with whole cumin and sun-dried turmeric for quick weeknight dals, soothing khichdi, and fragrant tempered soups.',
      badge: isRTL ? 'خيار العشاء السريع' : 'WEEKNIGHT HERO',
      dishPhoto: MAGIC_ASSETS.kitchen,
      stapleCountText: isRTL ? '3 أساسيات من مؤونة ماجيك' : '3 MAGIC PANTRY STAPLES',
      products: [
        {
          name: isRTL ? 'مسور دال' : 'Masoor Dal',
          weight: '1 KG',
          image: MAGIC_ASSETS.masoor,
          slug: 'magic-masoor-dal',
        },
        {
          name: isRTL ? 'كركم هالدي' : 'Pure Haldi',
          weight: '100 G',
          image: MAGIC_ASSETS.haldi,
          slug: 'magic-haldi',
        },
        {
          name: isRTL ? 'كمون جيرا' : 'Whole Jeera',
          weight: '100 G',
          image: MAGIC_ASSETS.jeera,
          slug: 'magic-jeera',
        },
      ],
    },
    {
      id: 'complete-pantry',
      slug: 'everyday-pantry',
      dishName: isRTL ? 'المؤونة الكاملة' : 'COMPLETE PANTRY',
      tagline: isRTL ? 'أساس المطبخ الهندي المتكامل بستة مكونات' : 'The Definitive 6-Staple Indian Kitchen Foundation',
      description: isRTL
        ? 'جميع البقوليات الأربعة غير الملمعة أحادية المنشأ مع التوابل الكاملة والمطحونة الأساسية. القاعدة المتكاملة لطهي منزلي أصيل في الإمارات.'
        : 'All 4 unpolished single-origin pulses and both essential whole and ground spices. The ultimate culinary foundation for complete, unhurried home cooking across the UAE.',
      badge: isRTL ? 'باقة الأساسيات الست' : 'FOUNDATION 6-PACK',
      dishPhoto: MAGIC_ASSETS.spiceCourtyard,
      stapleCountText: isRTL ? '6 أساسيات من مؤونة ماجيك' : '6 MAGIC PANTRY STAPLES',
      products: [
        {
          name: isRTL ? 'تور دال' : 'Toor Dal',
          weight: '1 KG',
          image: MAGIC_ASSETS.toor,
          slug: 'magic-toor-dal',
        },
        {
          name: isRTL ? 'مسور دال' : 'Masoor Dal',
          weight: '1 KG',
          image: MAGIC_ASSETS.masoor,
          slug: 'magic-masoor-dal',
        },
        {
          name: isRTL ? 'مونج حب كامل' : 'Moong Whole',
          weight: '1 KG',
          image: MAGIC_ASSETS.moong,
          slug: 'magic-moong-whole',
        },
        {
          name: isRTL ? 'أوراد حب كامل' : 'Urad Whole',
          weight: '1 KG',
          image: MAGIC_ASSETS.urad,
          slug: 'magic-urad-whole',
        },
        {
          name: isRTL ? 'كركم هالدي' : 'Pure Haldi',
          weight: '100 G',
          image: MAGIC_ASSETS.haldi,
          slug: 'magic-haldi',
        },
        {
          name: isRTL ? 'كمون جيرا' : 'Whole Jeera',
          weight: '100 G',
          image: MAGIC_ASSETS.jeera,
          slug: 'magic-jeera',
        },
      ],
    },
  ];

  const currentBundle = bundles[activeIndex];

  const [transitionStage, setTransitionStage] = useState<'idle' | 'exiting' | 'entering'>('idle');

  const handleSelectBundle = (index: number) => {
    if (index === activeIndex || transitionStage !== 'idle') return;
    setTransitionStage('exiting');
    setTimeout(() => {
      setActiveIndex(index);
      setTransitionStage('entering');
      setTimeout(() => {
        setTransitionStage('idle');
      }, 350);
    }, 220);
  };

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? bundles.length - 1 : activeIndex - 1;
    handleSelectBundle(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activeIndex === bundles.length - 1 ? 0 : activeIndex + 1;
    handleSelectBundle(nextIdx);
  };

  const imgParallax = isReducedMotion ? 0 : (scrollProgress - 0.5) * 16;

  return (
    <section
      ref={sectionRef}
      id="bundles"
      className="w-full bg-[#F3ECE0] text-[#3C1518] py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/12 select-none relative overflow-hidden"
      aria-labelledby="bundles-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. SECTION INTRO WITH SUPPORTING KITCHEN COOKING ARTWORK                  */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4 sm:mb-6">
          <div className="max-w-2xl">
            <h2
              id="bundles-heading"
              className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#3C1518] tracking-tight leading-[0.96] mb-2.5"
            >
              {isRTL ? 'اطبخ سحر النكهات.' : 'COOK SOMETHING MAGIC.'}
            </h2>
            <p className="text-sm sm:text-base text-[#3C1518]/85 font-normal font-sans leading-relaxed max-w-xl">
              {isRTL
                ? 'أساسيات مؤونة منسقة للأطباق التي تعشق طهيها. بقوليات هندية أحادية المنشأ وتوابل عطرية موزونة خصيصاً لوصفات منزلية أصيلة في دولة الإمارات.'
                : 'Curated pantry staples for the dishes you love to cook. Single-origin Indian dals and aromatic spices proportioned for authentic regional recipes in the UAE.'}
            </p>
          </div>

          {/* EDITORIAL KITCHEN COOKING ARTWORK IN UPPER-RIGHT WHITESPACE */}
          <div
            aria-hidden="true"
            className="shrink-0 self-start md:self-end w-36 sm:w-44 lg:w-52 max-w-full pointer-events-none select-none flex items-center justify-center opacity-80 pb-1"
          >
            <img
              src={MAGIC_ASSETS.illustrations.kitchenCooking}
              alt=""
              className="w-full h-auto max-h-[110px] sm:max-h-[125px] lg:max-h-[135px] object-contain filter drop-shadow-xs"
              loading="lazy"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. QUIET EDITORIAL RECIPE SELECTOR TABS                                   */}
        {/* ========================================================================= */}
        <div className="mb-5 sm:mb-6 border-b border-[#3C1518]/15 pb-1">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth">
            {bundles.map((b, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleSelectBundle(idx)}
                  className={`pb-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                    isActive
                      ? 'text-[#C8102E] border-[#C8102E]'
                      : 'text-[#3C1518]/60 hover:text-[#3C1518] border-transparent'
                  }`}
                >
                  {b.dishName}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. RECIPE EDITORIAL SPREAD: LEFT NARRATIVE + RIGHT DOMINANT PHOTOGRAPH     */}
        {/* ========================================================================= */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center"
        >
          {/* --------------------------------------------------------------------- */}
          {/* LEFT COLUMN: DISH STORY, INGREDIENT LINEUP, CTA & STEPPER             */}
          {/* --------------------------------------------------------------------- */}
          <div
            style={{
              transform:
                transitionStage === 'exiting'
                  ? 'translateX(-20px)'
                  : transitionStage === 'entering'
                  ? 'translateX(20px)'
                  : 'translateX(0)',
              opacity: transitionStage === 'idle' ? 1 : 0,
              transition: isReducedMotion
                ? 'none'
                : 'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="lg:col-span-5 flex flex-col justify-between space-y-4 sm:space-y-5 order-2 lg:order-1 will-change-transform"
          >
            {/* Dish Eyebrow & Title */}
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#C8102E] block mb-1">
                {currentBundle.badge}
              </span>

              <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#3C1518] tracking-tight leading-[1.02] mb-2">
                {currentBundle.dishName}
              </h3>

              <p className="text-sm sm:text-base text-[#3C1518]/85 font-sans leading-relaxed">
                {currentBundle.description}
              </p>
            </div>

            {/* Ingredients Lineup */}
            <div
              style={{
                transform:
                  transitionStage === 'entering'
                    ? 'translateY(12px)'
                    : 'translateY(0)',
                transition: isReducedMotion
                  ? 'none'
                  : 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="pt-1 will-change-transform"
            >
              <div className="flex items-center justify-between mb-2 border-b border-[#3C1518]/15 pb-1">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6B4226]">
                  {isRTL ? 'الحبوب والتوابل المشمولة' : 'INCLUDED STAPLES'}
                </span>
                <span className="text-xs font-mono font-bold text-[#C8102E]">
                  {currentBundle.stapleCountText}
                </span>
              </div>

              {/* Horizontal Product Packaging Lineup */}
              <div className="flex items-end gap-4 sm:gap-6 pt-1 pb-1 overflow-x-auto no-scrollbar">
                {currentBundle.products.map((prod, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectProduct && onSelectProduct(prod.slug)}
                    className="flex flex-col items-center shrink-0 cursor-pointer group/prod transition-transform hover:-translate-y-1.5 duration-200"
                    title={`${prod.name} (${prod.weight})`}
                  >
                    <div className="relative flex items-end justify-center mb-1">
                      <div
                        className="absolute bottom-0 inset-x-1 h-3 rounded-full blur-xs opacity-35 pointer-events-none"
                        style={{
                          background: 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.8) 0%, transparent 70%)',
                        }}
                      />
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="h-20 sm:h-24 lg:h-26 w-auto object-contain filter drop-shadow-md group-hover/prod:drop-shadow-xl transition-all"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xs font-bold text-[#3C1518] text-center leading-tight group-hover/prod:text-[#C8102E] transition-colors">
                      {prod.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#6B4226] font-medium">
                      {prod.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Row & Stepper Controls */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#3C1518]/15 pt-3">
              <button
                type="button"
                onClick={() => onNavigateBundles(currentBundle.slug)}
                className="h-11 sm:h-12 px-7 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group active:scale-[0.98] border border-white/20"
              >
                <span>{isRTL ? 'استكشف تفاصيل الباقة' : 'EXPLORE THE BUNDLE'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
              </button>

              {/* Stepper Controls */}
              <div className="flex items-center gap-2 self-start sm:self-auto bg-white/90 px-3 py-1.5 rounded-full border border-[#3C1518]/15 shadow-2xs">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#3C1518] hover:text-[#C8102E] hover:bg-[#FAF5EE] transition-colors cursor-pointer active:scale-95"
                  aria-label="Previous recipe set"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                </button>

                <span className="text-xs font-mono font-bold text-[#3C1518] px-1">
                  0{activeIndex + 1} / 0{bundles.length}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#3C1518] hover:text-[#C8102E] hover:bg-[#FAF5EE] transition-colors cursor-pointer active:scale-95"
                  aria-label="Next recipe set"
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: DOMINANT RECIPE PHOTOGRAPH (20-30% LARGER SCALE)        */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div
              onClick={() => onNavigateBundles(currentBundle.slug)}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/11] lg:min-h-[460px] xl:min-h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-[#FAF5EE] border border-[#3C1518]/10 cursor-pointer group mt-2 lg:mt-0"
            >
              <img
                src={currentBundle.dishPhoto}
                alt={currentBundle.dishName}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                style={{
                  transform: `translate3d(0, ${imgParallax}px, 0) scale(${
                    transitionStage === 'entering' ? 1.04 : 1
                  })`,
                  opacity: transitionStage === 'exiting' ? 0 : 1,
                  transition: isReducedMotion
                    ? 'none'
                    : 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                loading="lazy"
              />

              {/* Gentle Bottom Inset Shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3C1518]/75 via-transparent to-transparent pointer-events-none" />

              {/* Clean Bottom Inset Tagline Caption */}
              <div className="absolute bottom-5 inset-x-5 sm:inset-x-7 z-10 text-white">
                <p className="font-display font-bold text-lg sm:text-xl md:text-2xl text-[#FDF6EC] leading-tight drop-shadow-sm">
                  {currentBundle.tagline}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
