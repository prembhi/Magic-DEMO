import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SHOP_PRODUCTS } from '../../data/shopProducts';
import { ShopProductCard } from '../shop/ShopProductCard';
import { useLanguage } from '../../context/LanguageContext';

interface HomeFavouritesProps {
  onNavigateShop: () => void;
  onSelectProduct: (slug: string) => void;
}

// Hermite smoothstep interpolation helper
const smoothstep = (min: number, max: number, value: number): number => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

// Linear interpolation helper
const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * t;
};

export const HomeFavourites: React.FC<HomeFavouritesProps> = ({
  onNavigateShop,
  onSelectProduct,
}) => {
  const { isRTL } = useLanguage();

  // Region B scroll track & sticky stage refs
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Region B dedicated typography slot refs (completely outside packet movement)
  const typoContainerRef = useRef<HTMLDivElement>(null);
  const productTitleRef = useRef<HTMLHeadingElement>(null);
  const productDescRef = useRef<HTMLParagraphElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Direct element refs for 6 product packets (strictly inside animation box)
  const packetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sheenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Region C lineup carousel ref (in normal document flow)
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // State
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const animFrameId = useRef<number | null>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Update Region B animation based strictly on scroll progress
  const updateScrollAnimation = useCallback(() => {
    if (isReducedMotion || !trackRef.current) return;

    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const totalScrollableDistance = track.offsetHeight - viewportHeight;

    if (totalScrollableDistance <= 0) return;

    // Normalized progress p in [0, 1]
    const scrolledAmount = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolledAmount / totalScrollableDistance));

    // Responsive spread factor: scales packet horizontal translations proportionally
    const spread = Math.min(1, Math.max(0.35, viewportWidth / 1200));

    // =========================================================================
    // REGION B TYPOGRAPHY: SEPARATED FROM PACKET MOVEMENT
    //
    // Retains only: Product name + One short description.
    // Zero numbered stage captions. Zero overlapping pills.
    // =========================================================================
    let title = isRTL ? 'توار دال هندي ممتاز' : 'MAGIC TOOR DAL';
    let subtitle = isRTL
      ? 'بقوليات صفراء طبيعية غير ملمعة مفروزة بالليزر من حقول كارناتاكا وماراشترا'
      : '100% unpolished yellow pigeon peas · Laser-sorted from Karnataka & Maharashtra';

    if (progress >= 0.35 && progress < 0.65) {
      title = isRTL ? 'البقوليات التأسيسية اليومية' : 'THE FOUNDATIONAL PULSES';
      subtitle = isRTL
        ? 'توار ومسور ومونغ · مفروزة بالليزر بنسبة 99.8% للمطبخ اليومي'
        : 'Toor, Masoor and Moong · Cold-cleaned to 99.8% laser purity';
    } else if (progress >= 0.65) {
      title = isRTL ? 'توابل مطحونة على البارد وعدس أسود' : 'COLD-MILLED SPICES & WHOLE URAD';
      subtitle = isRTL
        ? 'كركم نقي عالي الكركومين وكمون حب بلدي وأوراد أسود غني بالبروتين'
        : 'Pure Haldi, Aromatic Jeera and protein-dense Whole Black Matpe';
    }

    if (productTitleRef.current && productTitleRef.current.textContent !== title) {
      productTitleRef.current.textContent = title;
    }
    if (productDescRef.current && productDescRef.current.textContent !== subtitle) {
      productDescRef.current.textContent = subtitle;
    }
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress * 100}%`;
    }

    // Dynamic fade on entrance and exit towards Region C
    let typoOpacity = 1;
    if (progress < 0.10) {
      typoOpacity = smoothstep(0.01, 0.10, progress);
    } else if (progress > 0.88) {
      typoOpacity = 1 - smoothstep(0.88, 0.98, progress);
    }
    if (typoContainerRef.current) {
      typoContainerRef.current.style.opacity = `${typoOpacity}`;
    }

    let railOpacity = 1;
    if (progress < 0.08) {
      railOpacity = smoothstep(0.01, 0.08, progress);
    } else if (progress > 0.90) {
      railOpacity = 1 - smoothstep(0.90, 0.98, progress);
    }
    if (railRef.current) {
      railRef.current.style.opacity = `${railOpacity}`;
    }

    // =========================================================================
    // PACKET TRANSFORMS (Contained strictly inside explicitly sized box)
    // =========================================================================

    // --- Product 0: Toor Dal ---
    let toorX = 0;
    let toorY = 0;
    let toorZ = 30;
    let toorScale = 1.05;
    let toorRotY = 0;
    let toorOpacity = 0;

    if (progress < 0.35) {
      // Stage A: Hero Toor Dal
      const enterT = smoothstep(0.00, 0.14, progress);
      toorY = lerp(60, 0, enterT);
      toorRotY = lerp(-3, 0, enterT);
      toorScale = lerp(0.92, 1.05, enterT);
      toorOpacity = smoothstep(0.00, 0.08, progress);
    } else if (progress >= 0.35 && progress < 0.60) {
      // Stage B1: Center focal point of pulse trio
      toorX = 0;
      toorY = 0;
      toorZ = 35;
      toorScale = 1.05;
      toorRotY = 0;
      toorOpacity = 1;
    } else if (progress >= 0.60 && progress < 0.68) {
      // Crossfade transition out of B1
      const fadeT = smoothstep(0.60, 0.68, progress);
      toorScale = lerp(1.05, 0.98, fadeT);
      toorOpacity = 1 - fadeT;
    } else {
      toorOpacity = 0;
    }

    // --- Product 1: Masoor Dal ---
    let masoorX = -260 * spread;
    let masoorY = 0;
    const masoorZ = 0;
    let masoorScale = 0.92;
    let masoorRotY = 4;
    let masoorOpacity = 0;

    if (progress >= 0.32 && progress < 0.60) {
      const enterT = smoothstep(0.32, 0.44, progress);
      masoorX = lerp(-360 * spread, -260 * spread, enterT);
      masoorY = lerp(30, 0, enterT);
      masoorScale = lerp(0.82, 0.92, enterT);
      masoorRotY = lerp(7, 4, enterT);
      masoorOpacity = smoothstep(0.32, 0.40, progress);
    } else if (progress >= 0.60 && progress < 0.68) {
      const fadeT = smoothstep(0.60, 0.68, progress);
      masoorOpacity = 1 - fadeT;
    }

    // --- Product 2: Moong Whole ---
    let moongX = 260 * spread;
    let moongY = 0;
    const moongZ = 0;
    let moongScale = 0.92;
    let moongRotY = -4;
    let moongOpacity = 0;

    if (progress >= 0.35 && progress < 0.60) {
      const enterT = smoothstep(0.35, 0.46, progress);
      moongX = lerp(360 * spread, 260 * spread, enterT);
      moongY = lerp(30, 0, enterT);
      moongScale = lerp(0.82, 0.92, enterT);
      moongRotY = lerp(-7, -4, enterT);
      moongOpacity = smoothstep(0.35, 0.42, progress);
    } else if (progress >= 0.60 && progress < 0.68) {
      const fadeT = smoothstep(0.60, 0.68, progress);
      moongOpacity = 1 - fadeT;
    }

    // --- Product 3: Urad Whole ---
    let uradX = -260 * spread;
    let uradY = 0;
    const uradZ = 0;
    let uradScale = 0.92;
    let uradRotY = 4;
    let uradOpacity = 0;

    if (progress >= 0.62 && progress <= 1.00) {
      const enterT = smoothstep(0.62, 0.72, progress);
      uradX = lerp(-360 * spread, -260 * spread, enterT);
      uradY = lerp(30, 0, enterT);
      uradScale = lerp(0.82, 0.92, enterT);
      uradRotY = lerp(7, 4, enterT);
      uradOpacity = smoothstep(0.62, 0.68, progress);
    }

    // --- Product 4: Haldi ---
    let haldiX = 0;
    let haldiY = 0;
    let haldiZ = 35;
    let haldiScale = 1.05;
    let haldiRotY = 0;
    let haldiOpacity = 0;

    if (progress >= 0.60 && progress <= 1.00) {
      const enterT = smoothstep(0.60, 0.70, progress);
      haldiY = lerp(40, 0, enterT);
      haldiScale = lerp(0.92, 1.05, enterT);
      haldiOpacity = smoothstep(0.60, 0.66, progress);
    }

    // --- Product 5: Jeera ---
    let jeeraX = 260 * spread;
    let jeeraY = 0;
    const jeeraZ = 0;
    let jeeraScale = 0.92;
    let jeeraRotY = -4;
    let jeeraOpacity = 0;

    if (progress >= 0.62 && progress <= 1.00) {
      const enterT = smoothstep(0.62, 0.72, progress);
      jeeraX = lerp(360 * spread, 260 * spread, enterT);
      jeeraY = lerp(30, 0, enterT);
      jeeraScale = lerp(0.82, 0.92, enterT);
      jeeraRotY = lerp(-7, -4, enterT);
      jeeraOpacity = smoothstep(0.62, 0.68, progress);
    }

    // Smooth exit fade for Stage B2 packets as user transitions into Region C
    if (progress >= 0.88) {
      const exitFade = 1 - smoothstep(0.88, 0.98, progress);
      uradOpacity *= exitFade;
      haldiOpacity *= exitFade;
      jeeraOpacity *= exitFade;
    }

    const transforms = [
      { x: toorX, y: toorY, z: toorZ, scale: toorScale, rotY: toorRotY, opacity: toorOpacity },
      { x: masoorX, y: masoorY, z: masoorZ, scale: masoorScale, rotY: masoorRotY, opacity: masoorOpacity },
      { x: moongX, y: moongY, z: moongZ, scale: moongScale, rotY: moongRotY, opacity: moongOpacity },
      { x: uradX, y: uradY, z: uradZ, scale: uradScale, rotY: uradRotY, opacity: uradOpacity },
      { x: haldiX, y: haldiY, z: haldiZ, scale: haldiScale, rotY: haldiRotY, opacity: haldiOpacity },
      { x: jeeraX, y: jeeraY, z: jeeraZ, scale: jeeraScale, rotY: jeeraRotY, opacity: jeeraOpacity },
    ];

    transforms.forEach((tf, idx) => {
      const packetEl = packetRefs.current[idx];
      const sheenEl = sheenRefs.current[idx];
      const shadowEl = shadowRefs.current[idx];

      if (packetEl) {
        packetEl.style.transform = `translate3d(${tf.x}px, ${tf.y}px, ${tf.z}px) rotateY(${tf.rotY}deg) scale(${tf.scale})`;
        packetEl.style.opacity = `${tf.opacity}`;
        packetEl.style.display = tf.opacity > 0.01 ? 'flex' : 'none';
      }

      if (sheenEl) {
        const sheenAngle = 110 + tf.rotY * 2.5;
        sheenEl.style.background = `linear-gradient(${sheenAngle}deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.06) 28%, transparent 58%, rgba(60,21,24,0.05) 100%)`;
        sheenEl.style.opacity = `${Math.max(0.15, Math.min(0.45, 0.30 + tf.rotY / 25))}`;
      }

      if (shadowEl) {
        shadowEl.style.transform = `scale(${tf.scale})`;
        shadowEl.style.opacity = `${Math.max(0, Math.min(0.36, tf.opacity * 0.36))}`;
      }
    });
  }, [isReducedMotion, isRTL]);

  // Window scroll & resize listeners
  useEffect(() => {
    if (isReducedMotion) return;

    const onScrollOrResize = () => {
      if (animFrameId.current === null) {
        animFrameId.current = window.requestAnimationFrame(() => {
          animFrameId.current = null;
          updateScrollAnimation();
        });
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Initial update
    updateScrollAnimation();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (animFrameId.current !== null) {
        window.cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isReducedMotion, updateScrollAnimation]);

  // Horizontal carousel scroll handler for Region C lineup
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
      id="favourites"
      className="w-full bg-[#FDF6EC] text-[#3C1518] border-b border-[#3C1518]/12 select-none relative"
      aria-labelledby="favourites-heading"
    >
      <div className="max-w-7xl 2xl:max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-12">

        {/* ========================================================================= */}
        {/* REGION A: SECTION HEADING (In Normal Document Flow)                       */}
        {/* ========================================================================= */}
        <header className="pt-10 sm:pt-14 lg:pt-16 pb-4 sm:pb-6 border-b border-[#3C1518]/15">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="w-full max-w-none lg:max-w-4xl min-w-0">
              <h2
                id="favourites-heading"
                className="font-display font-extrabold text-[1.75rem] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#3C1518] tracking-tight leading-[1.02] sm:leading-[0.98]"
              >
                {isRTL ? (
                  <>
                    مختارات المطبخ. <span className="text-[#C8102E]">الأساسيات اليومية.</span>
                  </>
                ) : (
                  <>
                    KITCHEN FAVOURITES. <span className="text-[#C8102E]">DAILY ESSENTIALS.</span>
                  </>
                )}
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-[#3C1518]/80 font-normal leading-relaxed mt-1.5 max-w-xl font-sans">
                {isRTL
                  ? 'بقوليات مفروزة بالليزر وتوابل مطحونة على البارد مباشرة إلى مطبخك في الإمارات.'
                  : 'Laser-sorted whole pulses and cold-milled spices brought directly to your UAE pantry.'}
              </p>
            </div>

            {/* View all staples button */}
            <div className="shrink-0 pt-1 sm:pt-0">
              <button
                type="button"
                onClick={onNavigateShop}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#C8102E] hover:text-[#A60D26] transition-colors cursor-pointer group"
              >
                <span>{isRTL ? `عرض جميع الأساسيات (${SHOP_PRODUCTS.length})` : `VIEW ALL ${SHOP_PRODUCTS.length} STAPLES`}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* REGION B: PRODUCT ANIMATION STAGE (Scroll-Driven Interactive Showcase)   */}
        {/* ========================================================================= */}
        {!isReducedMotion && (
          <div
            ref={trackRef}
            className="relative h-[180vh] sm:h-[200vh] lg:h-[220vh] w-full"
          >
            {/* Sticky Stage Container */}
            <div className="sticky top-16 sm:top-20 w-full flex flex-col justify-between py-4 sm:py-6 z-10">

              {/* 1. SEPARATED TYPOGRAPHY SLOT (Completely outside packet movement layer) */}
              <div
                ref={typoContainerRef}
                className="text-center py-2 shrink-0 z-20"
              >
                <h3
                  ref={productTitleRef}
                  className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-[#3C1518] tracking-tight leading-snug"
                >
                  {isRTL ? 'توار دال هندي ممتاز' : 'MAGIC TOOR DAL'}
                </h3>
                <p
                  ref={productDescRef}
                  className="text-xs sm:text-sm text-[#3C1518]/75 font-normal max-w-md mx-auto mt-1 leading-relaxed font-sans px-4"
                >
                  {isRTL
                    ? 'بقوليات صفراء طبيعية غير ملمعة مفروزة بالليزر من حقول كارناتاكا وماراشترا'
                    : '100% unpolished yellow pigeon peas · Laser-sorted from Karnataka & Maharashtra'}
                </p>
              </div>

              {/* 2. DEDICATED PACKET ANIMATION CONTAINER (Explicit height, overflow-hidden) */}
              <div
                className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[450px] overflow-hidden flex items-center justify-center my-auto"
                style={{
                  perspective: '1400px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {SHOP_PRODUCTS.map((product, idx) => (
                  <div
                    ref={(el) => { packetRefs.current[idx] = el; }}
                    key={product.id}
                    onClick={() => onSelectProduct(product.slug)}
                    className="absolute cursor-pointer will-change-transform flex flex-col items-center justify-center select-none"
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      opacity: 0,
                      display: 'none',
                    }}
                    title={`Click to inspect ${product.name}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onSelectProduct(product.slug);
                      }
                    }}
                  >
                    {/* Authentic Pouch Container */}
                    <div className="relative group/pouch">
                      <img
                        src={product.image}
                        alt={product.altText}
                        loading="eager"
                        draggable={false}
                        className="h-[210px] sm:h-[270px] md:h-[320px] lg:h-[370px] w-auto max-w-[85vw] object-contain select-none filter drop-shadow-[0_16px_24px_rgba(60,21,24,0.2)] group-hover/pouch:drop-shadow-[0_20px_30px_rgba(200,16,46,0.28)] transition-all duration-300"
                      />

                      {/* Tactile matte foil pouch dynamic sheen highlight */}
                      <div
                        ref={(el) => { sheenRefs.current[idx] = el; }}
                        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-150"
                        style={{
                          background: 'linear-gradient(110deg, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.06) 28%, transparent 58%, rgba(60,21,24,0.05) 100%)',
                          mixBlendMode: 'overlay',
                          opacity: 0.30,
                        }}
                      />
                    </div>

                    {/* Elliptical Ground Contact Shadow */}
                    <div
                      ref={(el) => { shadowRefs.current[idx] = el; }}
                      className="w-32 sm:w-44 md:w-56 h-3 mt-1.5 rounded-full blur-sm pointer-events-none"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.40) 0%, transparent 70%)',
                        opacity: 0.30,
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* 3. SEQUENCE PROGRESS RAIL (Subtle, non-obtrusive) */}
              <div
                ref={railRef}
                className="flex items-center justify-center gap-3 py-2 shrink-0 text-xs text-[#3C1518]/65"
              >
                <span className="font-semibold uppercase tracking-wider text-[11px] tabular-nums">
                  {isRTL ? 'استكشف التشكيلة بالتمرير' : 'SCROLL TO EXPLORE THE RANGE'}
                </span>
                <div className="w-24 sm:w-36 h-1.5 rounded-full bg-[#3C1518]/12 overflow-hidden">
                  <div
                    ref={progressBarRef}
                    className="h-full bg-[#C8102E] rounded-full transition-none"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* REGION C: FINAL SHOPPING LINEUP (In Normal Document Flow)                  */}
        {/* ========================================================================= */}
        <div className="w-full pt-10 sm:pt-14 pb-12 sm:pb-16 border-t border-[#3C1518]/15 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 gap-3">
            <div className="min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C8102E]">
                {isRTL ? 'المجموعة الكاملة' : 'THE COMPLETE COLLECTION'}
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#3C1518] mt-1 tracking-tight leading-snug">
                {isRTL ? 'تسوق الأساسيات الستة' : 'SHOP THE COMPLETE LINEUP'}
              </h3>
              <p className="text-xs sm:text-sm text-[#3C1518]/75 mt-1 font-sans max-w-xl">
                {isRTL
                  ? 'بقوليات وتوابل مفروزة بالليزر مع خيارات شراء فوري أو اشتراك دوري وتوصيل سريع في الإمارات'
                  : 'Authentic single-origin pulses and cold-milled spices with flexible delivery options.'}
              </p>
            </div>

            {/* Carousel navigation arrows */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-white border border-[#3C1518]/25 hover:border-[#C8102E] text-[#3C1518] hover:text-[#C8102E] hover:scale-105 active:scale-95 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
                aria-label="Scroll products left"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-white border border-[#3C1518]/25 hover:border-[#C8102E] text-[#3C1518] hover:text-[#C8102E] hover:scale-105 active:scale-95 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
                aria-label="Scroll products right"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Carousel with all 6 ShopProductCard items in normal document flow */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 sm:gap-6 lg:gap-7 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar pe-6 sm:pe-12 lg:pe-16"
          >
            {SHOP_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="shrink-0 w-[84vw] max-w-[320px] sm:w-[350px] md:w-[380px] lg:w-[410px] snap-start"
              >
                <ShopProductCard
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
