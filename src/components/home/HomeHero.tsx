import React, { useState, useRef, useCallback } from 'react';
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface HomeHeroProps {
  onExplorePantry: () => void;
  onDiscoverStory: () => void;
  onSelectProduct: (slug: string) => void;
}

interface HeroCarouselProduct {
  id: string;
  slug: string;
  name: string;
  sub: string;
  weight: string;
  price: number;
  image: string;
  category: string;
  rotation: number;
}

const HERO_PRODUCTS: HeroCarouselProduct[] = [
  {
    id: 'toor-dal',
    slug: 'magic-toor-dal',
    name: 'MAGIC Toor Dal',
    sub: 'Split Yellow Pigeon Peas',
    weight: '1 KG',
    price: 14.5,
    image: MAGIC_ASSETS.toor,
    category: 'Dals & Lentils',
    rotation: -1,
  },
  {
    id: 'masoor-dal',
    slug: 'magic-masoor-dal',
    name: 'MAGIC Masoor Dal',
    sub: 'Split Red Lentils',
    weight: '1 KG',
    price: 14.5,
    image: MAGIC_ASSETS.masoor,
    category: 'Dals & Lentils',
    rotation: -2,
  },
  {
    id: 'moong-whole',
    slug: 'magic-moong-whole',
    name: 'MAGIC Moong Whole',
    sub: 'Whole Green Gram',
    weight: '1 KG',
    price: 15.0,
    image: MAGIC_ASSETS.moong,
    category: 'Dals & Lentils',
    rotation: 2,
  },
  {
    id: 'urad-whole',
    slug: 'magic-urad-whole',
    name: 'MAGIC Urad Whole',
    sub: 'Black Matpe Beans',
    weight: '1 KG',
    price: 15.5,
    image: MAGIC_ASSETS.urad,
    category: 'Dals & Lentils',
    rotation: -2,
  },
  {
    id: 'haldi',
    slug: 'magic-haldi',
    name: 'MAGIC Pure Haldi',
    sub: 'Salem Turmeric Powder',
    weight: '100 G',
    price: 6.5,
    image: MAGIC_ASSETS.haldi,
    category: 'Ground Spices',
    rotation: 3,
  },
  {
    id: 'jeera',
    slug: 'magic-jeera',
    name: 'MAGIC Whole Jeera',
    sub: 'Unjha Whole Cumin',
    weight: '100 G',
    price: 8.0,
    image: MAGIC_ASSETS.jeera,
    category: 'Whole Spices',
    rotation: -3,
  },
];

export const HomeHero: React.FC<HomeHeroProps> = ({
  onExplorePantry,
  onDiscoverStory,
  onSelectProduct,
}) => {
  const { t, isRTL } = useLanguage();
  const { ref: headingRef, isRevealed: headingRevealed } = useScrollReveal<HTMLHeadingElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  const activeProduct = HERO_PRODUCTS[activeIndex];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : HERO_PRODUCTS.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < HERO_PRODUCTS.length - 1 ? prev + 1 : 0));
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null) {
      if (touchDeltaX.current > 45) {
        if (isRTL) handleNext();
        else handlePrev();
      } else if (touchDeltaX.current < -45) {
        if (isRTL) handlePrev();
        else handleNext();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <section
      className="relative w-full min-h-[88vh] lg:min-h-[92vh] bg-[#FDF6EC] text-[#3C1518] select-none flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-12 pt-4 sm:pt-6 pb-6"
      aria-label="MAGIC UAE Editorial Hero"
    >
      {/* WARM AMBIENT BACKDROP WASH */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 translate-x-1/4 w-[600px] sm:w-[850px] lg:w-[1050px] h-[550px] rounded-full bg-radial from-[#F5DEB3]/50 via-[#FDF6EC]/40 to-transparent blur-3xl opacity-80" />
        <div className="absolute top-12 right-1/4 translate-x-1/3 w-[850px] h-[850px] rounded-full border border-[#D4A843]/15 pointer-events-none opacity-50" />
        <div className="absolute top-28 right-1/4 translate-x-1/3 w-[680px] h-[680px] rounded-full border border-dashed border-[#D4A843]/20 pointer-events-none opacity-40" />
      </div>

      {/* TOP EDITORIAL STATUS KICKER */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 border border-[#3C1518]/15 text-[#3C1518] text-xs font-semibold tracking-wider uppercase backdrop-blur-xs shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
          <span>{t('home.hero.kicker', 'INDIAN FOOD · FARM ORIGIN · UAE EXCELLENCE')}</span>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] text-[#3C1518]/60 tracking-wider">
          SINGLE-ORIGIN CROPS · LAB TESTED
        </span>
      </div>

      {/* CENTERPIECE: 40% EDITORIAL COPY / 60% CENTERED PRODUCT CAROUSEL */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* LEFT COLUMN: 40% EDITORIAL TYPOGRAPHY */}
        <div className="lg:col-span-5 flex flex-col items-start text-start">
          {/* EYEBROW */}
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>{t('home.hero.eyebrow', 'THE PURE PANTRY')}</span>
          </div>

          {/* HEADLINE */}
          <h1
            ref={headingRef}
            className={`font-display font-black text-4xl sm:text-6xl xl:text-7xl text-[#3C1518] tracking-tight leading-[0.95] mb-5 reveal-heading ${
              headingRevealed ? 'is-revealed' : ''
            }`}
          >
            <span>MAGIC</span>
            <br />
            <span className="text-[#C8102E]">IN EVERY</span>
            <br />
            <span>PINCH.</span>
          </h1>

          {/* SUPPORTING COPY */}
          <p className="text-sm sm:text-base text-[#3C1518]/80 max-w-md leading-relaxed font-normal mb-8">
            {t(
              'home.hero.sub',
              'Pure single-origin Indian pulses & whole spices, sourced directly from verified farmer clusters to everyday UAE kitchens.'
            )}
          </p>

          {/* DUAL CTA BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onExplorePantry}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C8102E] hover:bg-[#A60D26] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>{t('home.hero.ctaPantry', 'EXPLORE THE PANTRY')}</span>
              <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onDiscoverStory}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/85 hover:bg-white text-[#3C1518] border border-[#3C1518]/25 font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:border-[#3C1518] cursor-pointer flex items-center justify-center"
            >
              <span>{t('home.hero.ctaFarm', 'FROM THE FARM')}</span>
            </button>
          </div>

          {/* QUALITY PROOF BADGES */}
          <div className="flex items-center gap-4 mt-8 pt-5 border-t border-[#3C1518]/15 text-[11px] font-mono text-[#3C1518]/70">
            <span>✓ 100% UNPOLISHED</span>
            <span>·</span>
            <span>✓ OPTICAL SORTED</span>
            <span>·</span>
            <span>✓ ZERO CHEMICALS</span>
          </div>
        </div>

        {/* RIGHT COLUMN: 60% CENTERED HORIZONTAL PRODUCT CAROUSEL */}
        <div
          className="lg:col-span-7 relative w-full flex flex-col items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* CAROUSEL STAGE VIEWPORT */}
          <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] flex items-center justify-center overflow-hidden">
            {/* Ambient circular halo behind active center */}
            <div className="absolute w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] rounded-full bg-radial from-[#F5DEB3]/60 via-[#FDF6EC]/20 to-transparent blur-2xl pointer-events-none z-0" />

            {/* PRODUCT TRACK */}
            <div className="relative w-full h-full flex items-center justify-center">
              {HERO_PRODUCTS.map((prod, idx) => {
                const diff = idx - activeIndex;
                const isCenter = diff === 0;
                const isPrev = diff === -1 || (activeIndex === 0 && idx === HERO_PRODUCTS.length - 1 && HERO_PRODUCTS.length > 2);
                const isNext = diff === 1 || (activeIndex === HERO_PRODUCTS.length - 1 && idx === 0 && HERO_PRODUCTS.length > 2);

                // Compute horizontal offset relative to center
                let offsetPx = 0;
                if (diff === 0) offsetPx = 0;
                else if (diff === -1) offsetPx = -240;
                else if (diff === 1) offsetPx = 240;
                else if (diff < -1) offsetPx = -420;
                else offsetPx = 420;

                if (isRTL) offsetPx = -offsetPx;

                const isVisible = Math.abs(diff) <= 1;

                return (
                  <div
                    key={prod.id}
                    onClick={() => {
                      if (!isCenter) setActiveIndex(idx);
                    }}
                    className={`absolute flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-editorial select-none ${
                      isCenter
                        ? 'z-30 opacity-100 scale-100'
                        : isVisible
                        ? 'z-10 opacity-45 hover:opacity-75 scale-75'
                        : 'z-0 opacity-0 pointer-events-none scale-50'
                    }`}
                    style={{
                      transform: `translate3d(${offsetPx}px, 0, 0) rotate(${isCenter ? prod.rotation : prod.rotation * 1.5}deg)`,
                      willChange: 'transform, opacity',
                    }}
                    role="button"
                    tabIndex={isCenter ? 0 : -1}
                    aria-label={`Product ${idx + 1} of ${HERO_PRODUCTS.length}: ${prod.name}`}
                  >
                    {/* Realistic Grounding Shadow */}
                    <div
                      className={`absolute -bottom-4 inset-x-4 rounded-full blur-[8px] pointer-events-none transition-opacity duration-300 ${
                        isCenter ? 'h-6 opacity-55' : 'h-4 opacity-25'
                      }`}
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.65) 0%, rgba(60, 21, 24, 0.15) 55%, transparent 70%)',
                      }}
                    />

                    {/* Packaging Pouch Image */}
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className={`h-auto object-contain transition-all duration-300 ${
                        isCenter
                          ? 'w-[200px] sm:w-[260px] lg:w-[310px] xl:w-[335px] filter drop-shadow-[0_24px_38px_rgba(60,21,24,0.30)]'
                          : 'w-[160px] sm:w-[200px] lg:w-[240px] filter drop-shadow-[0_12px_20px_rgba(60,21,24,0.18)]'
                      }`}
                      loading="eager"
                      fetchPriority={isCenter ? 'high' : 'auto'}
                    />
                  </div>
                );
              })}
            </div>

            {/* LEFT / RIGHT CAROUSEL NAVIGATION ARROWS */}
            <button
              type="button"
              onClick={isRTL ? handleNext : handlePrev}
              className="absolute start-1 sm:start-4 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-[#3C1518] hover:text-[#FDF6EC] text-[#3C1518] border border-[#3C1518]/15 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C8102E]"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={isRTL ? handlePrev : handleNext}
              className="absolute end-1 sm:end-4 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-[#3C1518] hover:text-[#FDF6EC] text-[#3C1518] border border-[#3C1518]/15 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C8102E]"
              aria-label="Next product"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* ACTIVE PRODUCT DEDICATED EDITORIAL METADATA & VIEW PRODUCT CTA */}
          <div className="mt-3 flex flex-col items-center text-center animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C8102E]">
                {activeProduct.category}
              </span>
              <span className="text-[#3C1518]/30">·</span>
              <span className="font-mono text-xs text-[#3C1518]/70 font-semibold">
                {activeProduct.weight}
              </span>
            </div>

            <h3 className="font-display font-black text-xl sm:text-2xl text-[#3C1518] leading-tight mb-1">
              {activeProduct.name}
            </h3>

            <p className="text-xs text-[#3C1518]/70 font-normal mb-3">
              {activeProduct.sub} · <span className="font-mono font-bold text-[#3C1518]">AED {activeProduct.price.toFixed(2)}</span>
            </p>

            {/* EXPLICIT VIEW PRODUCT CTA */}
            <button
              type="button"
              onClick={() => onSelectProduct(activeProduct.slug)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#3C1518] hover:bg-[#C8102E] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <span>{t('home.hero.viewProduct', 'VIEW PRODUCT')}</span>
              <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            {/* CAROUSEL PAGINATION PILLS */}
            <div className="flex items-center gap-1.5 mt-4">
              {HERO_PRODUCTS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i ? 'w-6 bg-[#C8102E]' : 'w-1.5 bg-[#3C1518]/25 hover:bg-[#3C1518]/50'
                  }`}
                  aria-label={`Jump to ${p.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SCROLL CUE */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-[#3C1518]/60 pt-2 border-t border-[#3C1518]/10">
        <span className="font-mono text-[11px] uppercase tracking-wider">
          01 / 07 — EDITORIAL HERO
        </span>

        <button
          type="button"
          onClick={onDiscoverStory}
          className="inline-flex items-center gap-1.5 hover:text-[#C8102E] transition-colors cursor-pointer group/scroll"
          aria-label="Scroll to Farm Story"
        >
          <span className="font-semibold text-xs tracking-wider uppercase">SCROLL TO DISCOVER</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover/scroll:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
