import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SHOP_PRODUCTS } from '../../data/shopProducts';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface HomeProductShowcaseProps {
  onNavigateShop: () => void;
  onSelectProduct: (slug: string) => void;
}

export const HomeProductShowcase: React.FC<HomeProductShowcaseProps> = ({
  onNavigateShop,
  onSelectProduct,
}) => {
  const { t, isRTL } = useLanguage();
  const { ref: headingRef, isRevealed: headingRevealed } = useScrollReveal<HTMLHeadingElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Track vertical scroll with gentle inertia to drive silky horizontal translation
  useEffect(() => {
    if (isReducedMotion) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId: number | null = null;
    let isTicking = false;

    const updateGlide = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0004) {
        currentProgress += diff * 0.082; // Physical glide inertia
        setScrollProgress(currentProgress);
        rafId = requestAnimationFrame(updateGlide);
      } else {
        currentProgress = targetProgress;
        setScrollProgress(currentProgress);
        isTicking = false;
        rafId = null;
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      targetProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(updateGlide);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  // Total horizontal distance to translate across 6 cards
  // 6 cards * ~380px width + gaps = ~2300px track
  const maxTranslate = 1600;
  const currentTranslate = isRTL
    ? scrollProgress * maxTranslate
    : -scrollProgress * maxTranslate;

  return (
    <section
      id="pantry"
      ref={containerRef}
      className={`relative w-full bg-[#FAF5EE] text-[#3C1518] select-none border-t border-[#3C1518]/10 ${
        isReducedMotion ? 'py-20 sm:py-28 px-4 sm:px-6 lg:px-12' : 'h-[260vh] lg:h-[300vh]'
      }`}
      aria-labelledby="pantry-heading"
    >
      {/* DESKTOP STICKY VIEWPORT WITH HORIZONTAL TRACK DRIVEN BY SCROLL */}
      <div
        className={`${
          isReducedMotion
            ? 'relative max-w-7xl mx-auto'
            : 'hidden lg:flex sticky top-0 h-screen w-full flex-col justify-between overflow-hidden px-8 lg:px-16 pt-10 pb-10 z-10'
        }`}
      >
        {/* HEADER BLOCK */}
        <div className="max-w-7xl mx-auto w-full flex items-end justify-between pb-6 border-b border-[#3C1518]/10">
          <div>
            <span className="font-mono text-xs text-[#C8102E] tracking-[0.25em] uppercase font-bold block mb-2">
              03 / 07 — EVERYDAY STAPLES
            </span>
            <h2
              id="pantry-heading"
              ref={headingRef}
              className={`font-display font-black text-4xl lg:text-6xl text-[#3C1518] tracking-tight leading-none reveal-heading ${
                headingRevealed ? 'is-revealed' : ''
              }`}
            >
              {t('home.pantry.title', 'THE MAGIC PANTRY')}
            </h2>
          </div>

          <button
            type="button"
            onClick={onNavigateShop}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8102E] hover:text-[#A60D26] transition-colors cursor-pointer pb-1"
          >
            <span>{t('home.pantry.viewAll', 'VIEW ALL IN SHOP')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* HORIZONTAL TRACK DRIVEN BY VERTICAL SCROLL */}
        <div className="relative w-full my-auto overflow-visible py-8">
          {/* Subtle botanical motifs behind products (Cumin & Turmeric at low opacity) */}
          <div
            aria-hidden="true"
            className="absolute -top-12 left-[12%] w-[260px] pointer-events-none opacity-[0.14] select-none z-0"
            style={{
              transform: `translate3d(${isRTL ? scrollProgress * 100 : -scrollProgress * 100}px, 0, 0) rotate(-10deg)`,
            }}
          >
            <img
              src={MAGIC_ASSETS.illustrationCumin}
              alt=""
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute -bottom-10 right-[8%] w-[240px] pointer-events-none opacity-[0.14] select-none z-0"
            style={{
              transform: `translate3d(${isRTL ? -scrollProgress * 80 : scrollProgress * 80}px, 0, 0) rotate(12deg)`,
            }}
          >
            <img
              src={MAGIC_ASSETS.illustrationTurmeric}
              alt=""
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          <div
            ref={trackRef}
            className="relative z-10 flex items-center gap-8 transition-transform duration-100 ease-out"
            style={{
              transform: `translate3d(${currentTranslate}px, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {SHOP_PRODUCTS.map((product, idx) => {
              // Calculate proximity to viewport center (0.0 to 1.0)
              const cardCenterProgress = idx / (SHOP_PRODUCTS.length - 1);
              const distanceFromCenter = Math.abs(scrollProgress - cardCenterProgress);
              
              // Scale from 1.0 (center) down to 0.82 (periphery)
              const dynamicScale = Math.max(0.82, 1 - distanceFromCenter * 0.45);
              const isHovered = hoveredProduct === product.id;

              return (
                <article
                  key={product.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectProduct(product.slug)}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProduct(product.slug);
                    }
                  }}
                  aria-label={`View details for ${product.name}, ${product.weight}, AED ${product.price.toFixed(2)}`}
                  className="shrink-0 w-[320px] lg:w-[350px] bg-white rounded-3xl border-2 border-[#3C1518]/15 hover:border-[#C8102E] focus-visible:border-[#C8102E] focus-visible:ring-2 focus-visible:ring-[#C8102E] p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer select-none relative focus:outline-hidden"
                  style={{
                    transform: `scale(${isHovered ? dynamicScale * 1.03 : dynamicScale})`,
                    boxShadow: isHovered
                      ? '0 24px 40px -8px rgba(60,21,24,0.18)'
                      : '0 10px 25px -5px rgba(60,21,24,0.08)',
                    willChange: 'transform',
                  }}
                >
                  {/* LARGE AUTHENTIC POUCH STAGE */}
                  <div className="relative w-full h-[280px] bg-gradient-to-b from-[#FDF6EC] to-[#F5ECE0]/60 rounded-2xl flex items-center justify-center p-4 overflow-hidden mb-4">
                    {product.badge && (
                      <span className="absolute top-3 start-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white border border-[#3C1518]/20 text-[#3C1518] shadow-2xs">
                        {product.badge}
                      </span>
                    )}

                    <img
                      src={product.image}
                      alt={product.altText}
                      loading="lazy"
                      className="h-[86%] max-h-[88%] w-auto max-w-[85%] object-contain filter drop-shadow-[0_16px_25px_rgba(60,21,24,0.22)] transition-transform duration-300 group-hover:scale-105 z-10"
                    />

                    {/* Ground shadow */}
                    <div
                      className="absolute bottom-3 inset-x-8 h-3 rounded-full blur-xs pointer-events-none opacity-30"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.5) 0%, transparent 70%)',
                      }}
                    />
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B4226]">
                        {product.category}
                      </span>
                      <span className="border border-dashed border-[#3C1518]/30 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-medium text-[#3C1518]">
                        {product.weight}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#3C1518] hover:text-[#C8102E] transition-colors leading-snug mb-1 line-clamp-1">
                      {product.name}
                    </h3>

                    {product.origin && (
                      <p className="text-xs text-[#3C1518]/65 mb-4 line-clamp-1">
                        Origin: {product.origin}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-[#3C1518]/10">
                      <div className="font-mono text-base font-black text-[#3C1518]">
                        AED {product.price.toFixed(2)}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C8102E] group-hover:underline">
                        EXPLORE →
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* BOTTOM SCROLL PROGRESS BAR */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-4 border-t border-[#3C1518]/10 text-xs text-[#3C1518]/60">
          <span className="font-mono text-[11px] uppercase tracking-wider">
            SCROLL VERTICALLY TO EXPLORE PANTRY
          </span>
          <div className="w-36 h-1.5 rounded-full bg-[#3C1518]/10 overflow-hidden">
            <div
              className="h-full bg-[#C8102E] transition-all duration-150"
              style={{ width: `${Math.min(100, Math.max(12, scrollProgress * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* MOBILE / REDUCED-MOTION NATIVE HORIZONTAL SWIPE CAROUSEL (Never traps mobile screen) */}
      <div className={`lg:hidden px-4 sm:px-6 py-12 ${isReducedMotion ? 'block' : ''}`}>
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="font-mono text-xs text-[#C8102E] tracking-[0.25em] uppercase font-bold block mb-1">
              03 / 07 — EVERYDAY STAPLES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#3C1518]">
              {t('home.pantry.title', 'THE MAGIC PANTRY')}
            </h2>
          </div>
          <button
            type="button"
            onClick={onNavigateShop}
            className="text-xs font-bold uppercase tracking-wider text-[#C8102E]"
          >
            VIEW ALL →
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
          {SHOP_PRODUCTS.map((product) => (
            <article
              key={product.id}
              onClick={() => onSelectProduct(product.slug)}
              className="shrink-0 w-[270px] sm:w-[300px] bg-white rounded-2xl border-2 border-[#3C1518]/15 p-4 flex flex-col justify-between snap-start cursor-pointer shadow-xs"
            >
              <div className="relative w-full h-[220px] bg-gradient-to-b from-[#FDF6EC] to-[#F5ECE0]/60 rounded-xl flex items-center justify-center p-3 mb-3">
                <img
                  src={product.image}
                  alt={product.altText}
                  className="h-[88%] w-auto object-contain filter drop-shadow-md"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold uppercase text-[#6B4226]">{product.category}</span>
                  <span className="font-mono text-[#3C1518]/70">{product.weight}</span>
                </div>
                <h3 className="font-display font-bold text-base text-[#3C1518] mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between pt-2 border-t border-[#3C1518]/10 text-sm font-mono font-bold text-[#3C1518]">
                  <span>AED {product.price.toFixed(2)}</span>
                  <span className="text-xs text-[#C8102E]">VIEW →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
