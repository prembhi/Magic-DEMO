import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ChevronDown, Sparkles } from 'lucide-react';
import { MAGIC_PRODUCTS } from '../data/products';

interface SectionScrollStoryProps {
  onAddToCart?: (productId: string) => void;
}

export const SectionScrollStory: React.FC<SectionScrollStoryProps> = ({
  onAddToCart,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Browser-native pinned scroll calculation (Zero heavy libraries)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // When the top of container reaches 0 or higher
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);

      // Determine active product index (0 to 5)
      const numProducts = MAGIC_PRODUCTS.length;
      const calculatedIndex = Math.min(
        Math.floor(progress * numProducts),
        numProducts - 1
      );
      setActiveIndex(calculatedIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jump to specific product index
  const scrollToProduct = (index: number) => {
    if (!containerRef.current) return;
    const windowHeight = window.innerHeight;
    const totalScrollable = containerRef.current.offsetHeight - windowHeight;
    const targetScroll = (index / (MAGIC_PRODUCTS.length - 1)) * totalScrollable;
    const elementTop = containerRef.current.offsetTop;

    window.scrollTo({
      top: elementTop + targetScroll,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const activeProduct = MAGIC_PRODUCTS[activeIndex] || MAGIC_PRODUCTS[0];

  return (
    <section
      ref={containerRef}
      id="scroll-story"
      className="relative w-full h-[450vh] bg-[#FDF6EC] select-none"
      aria-label="Interactive Product Journey"
    >
      {/* PINNED STICKY SCENE VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-8 lg:px-12 border-b border-[#3C1518]/10">
        {/* Dynamic Background Atmosphere that transitions with active product */}
        <div
          className="absolute inset-0 transition-colors duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 45%, ${activeProduct.environment.glowColor} 0%, rgba(253, 246, 236, 0.95) 60%, #FDF6EC 100%)`,
          }}
        />

        {/* TOP EDITORIAL METADATA BAR */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-[#3C1518]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E] animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
              Scroll Story · Chapter {activeProduct.number}
            </span>
            <span className="text-[#3C1518]/30">|</span>
            <span className="text-xs font-medium text-[#6B4226] hidden sm:inline">
              {activeProduct.environment.environmentTitle}
            </span>
          </div>

          {/* Interactive Progress Counter */}
          <div className="flex items-center gap-4">
            <div className="font-mono text-xs font-bold text-[#3C1518] tracking-widest">
              <span className="text-[#C8102E] text-sm">{activeProduct.number}</span>
              <span className="text-[#3C1518]/40"> / 06</span>
            </div>

            {/* Subtle progress track */}
            <div className="w-20 h-1.5 bg-[#3C1518]/10 rounded-full overflow-hidden hidden sm:block">
              <div
                className="h-full bg-[#C8102E] transition-all duration-300"
                style={{ width: `${(scrollProgress * 100).toFixed(1)}%` }}
              />
            </div>
          </div>
        </div>

        {/* CENTER STAGE: ENVIRONMENT + PRODUCT POUCH + EDITORIAL TYPOGRAPHY */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 my-auto">
          {/* LEFT: EDITORIAL COPY & PRODUCT METADATA */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 max-w-lg">
            {/* Arabic Name & Origin */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <span className="font-arabic font-bold text-xl sm:text-2xl text-[#C8102E]">
                {activeProduct.arabicName}
              </span>
              <span className="text-[#3C1518]/25">·</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B4226]">
                {activeProduct.origin}
              </span>
            </div>

            {/* Main Product Headline */}
            <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#3C1518] tracking-tight leading-none mb-3">
              {activeProduct.name}
            </h3>

            {/* Category & Pack Size */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono font-bold text-[#3C1518] mb-4">
              <span className="px-2 py-0.5 rounded bg-[#3C1518]/5 border border-[#3C1518]/10">
                {activeProduct.spiceCategory}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#C8102E]/10 border border-[#C8102E]/20 text-[#C8102E]">
                {activeProduct.weight} · {activeProduct.weightArabic}
              </span>
            </div>

            {/* Sensory Tasting & Cooking Notes */}
            <p className="text-xs sm:text-sm md:text-base text-[#6B4226] leading-relaxed font-medium mb-6">
              {activeProduct.culinaryProfile}. Sealed inside an Aroma-Lock multilayer barrier for pristine kitchen aroma.
            </p>

            {/* Action Bar */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onAddToCart && onAddToCart(activeProduct.id)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C8102E] hover:bg-[#9C0A20] text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 border border-[#D4A843]/40 cursor-pointer"
                aria-label={`Request sample of ${activeProduct.name}`}
              >
                <ShoppingBag className="w-4 h-4 text-[#D4A843]" />
                <span>Request Sample Pack</span>
              </button>

              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#3C1518]/60">
                  Commercial Tier
                </span>
                <span className="font-mono text-xs font-bold text-[#3C1518]">
                  Export Ready
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: THE PRODUCT REVEALS ITS WORLD (ENVIRONMENT LAYER BEHIND ISOLATED POUCH) */}
          <div className="relative w-full lg:w-1/2 flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] aspect-square flex items-center justify-center">
              {/* TERROIR ENVIRONMENT LAYER (BEHIND POUCH) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Concentric botanical ring */}
                <div
                  className="w-full h-full rounded-full transition-transform duration-700 opacity-70"
                  style={{
                    border: `1.5px dashed ${activeProduct.environment.accentColor}`,
                    transform: prefersReducedMotion ? 'none' : `rotate(${scrollProgress * 180}deg)`,
                  }}
                />

                {/* Inner Terroir Atmosphere Glow */}
                <div
                  className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl transition-colors duration-700 pointer-events-none"
                  style={{
                    backgroundColor: activeProduct.environment.themeColor,
                    opacity: 0.35,
                  }}
                />

                {/* Illustrated Terroir Botanical Badges */}
                <div className="absolute top-2 left-4 px-3 py-1.5 rounded-lg bg-white/80 border border-[#3C1518]/10 backdrop-blur-xs flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" />
                  <span className="text-[10px] font-bold text-[#3C1518]">
                    {activeProduct.environment.elements[0]?.name || 'Terroir Botanical'}
                  </span>
                </div>

                <div className="absolute bottom-6 right-2 px-3 py-1.5 rounded-lg bg-white/80 border border-[#3C1518]/10 backdrop-blur-xs flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                  <span className="text-[10px] font-bold text-[#3C1518]">
                    {activeProduct.environment.elements[1]?.name || 'Culinary Harvest'}
                  </span>
                </div>
              </div>

              {/* CONTACT BASE DROP SHADOW */}
              <div
                className="absolute bottom-4 inset-x-12 h-8 rounded-full blur-md pointer-events-none transition-all duration-500"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.45) 0%, transparent 70%)',
                }}
              />

              {/* AUTHENTIC STAND-UP PACKAGING POUCH (Clean transparent PNG, never baked into environment) */}
              <div className="relative z-10 w-[240px] sm:w-[280px] md:w-[320px] aspect-[1/1.42] flex items-center justify-center">
                {MAGIC_PRODUCTS.map((prod, idx) => {
                  const isActive = idx === activeIndex;

                  return (
                    <img
                      key={prod.id}
                      src={prod.image}
                      alt={`MAGIC ${prod.name} authentic pouch`}
                      className={`absolute inset-0 w-full h-full object-contain select-none pointer-events-none transition-all duration-700 ease-out ${
                        isActive
                          ? 'opacity-100 scale-100 z-10'
                          : prefersReducedMotion
                          ? 'opacity-0 scale-95 pointer-events-none z-0'
                          : 'opacity-0 scale-90 translate-y-6 pointer-events-none z-0'
                      }`}
                      style={{
                        filter: isActive
                          ? 'drop-shadow(0 26px 32px rgba(60, 21, 24, 0.35)) drop-shadow(0 6px 12px rgba(200, 16, 46, 0.16))'
                          : 'none',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CONTROLS & VERTICAL DOTS */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between pt-2 border-t border-[#3C1518]/10">
          {/* Product indicator dots */}
          <div className="flex items-center gap-2">
            {MAGIC_PRODUCTS.map((prod, idx) => (
              <button
                key={prod.id}
                onClick={() => scrollToProduct(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 h-2 bg-[#C8102E]'
                    : 'w-2 h-2 bg-[#3C1518]/25 hover:bg-[#3C1518]/50'
                }`}
                aria-label={`Jump to product ${prod.name}`}
              />
            ))}
          </div>

          {/* Gentle scroll indicator prompt */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#6B4226]">
            <span>Scroll to explore stories</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#C8102E] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
