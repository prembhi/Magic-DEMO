import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';

interface HomeFinalStatementProps {
  onNavigateImpact: () => void;
  onExplorePantry: () => void;
}

export const HomeFinalStatement: React.FC<HomeFinalStatementProps> = ({
  onNavigateImpact,
  onExplorePantry,
}) => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Passive RAF-driven scroll tracking for cinematic closing sequence
  useEffect(() => {
    if (isReducedMotion) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // As the section enters bottom 95% of viewport towards 15%
        const startY = windowHeight * 0.95;
        const endY = windowHeight * 0.15;
        const rawProgress = (startY - rect.top) / (startY - endY);
        setScrollProgress(Math.max(0, Math.min(1, rawProgress)));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  // Choreography sequence calculations
  const bgP = Math.min(1, scrollProgress / 0.65);
  const bgScale = isReducedMotion ? 1.0 : 1.04 - 0.04 * bgP;
  const bgOpacity = isReducedMotion ? 1.0 : 0.55 + 0.45 * bgP;

  const headP = Math.max(0, Math.min(1, (scrollProgress - 0.10) / 0.55));
  const headlineTranslateY = isReducedMotion ? 0 : 24 * (1 - headP);
  const headlineOpacity = isReducedMotion ? 1 : headP;

  const copyP = Math.max(0, Math.min(1, (scrollProgress - 0.20) / 0.55));
  const copyTranslateY = isReducedMotion ? 0 : 14 * (1 - copyP);
  const copyOpacity = isReducedMotion ? 1 : copyP;

  const ctaP = Math.max(0, Math.min(1, (scrollProgress - 0.30) / 0.55));
  const ctaTranslateY = isReducedMotion ? 0 : 10 * (1 - ctaP);
  const ctaOpacity = isReducedMotion ? 1 : ctaP;

  const prodP = Math.max(0, Math.min(1, (scrollProgress - 0.40) / 0.55));
  const productTranslateY = isReducedMotion ? 0 : 28 * (1 - prodP);
  const productOpacity = isReducedMotion ? 1 : prodP;

  return (
    <section
      id="brand-statement"
      ref={sectionRef}
      className="relative w-full bg-[#3C1518] text-[#FDF6EC] pt-14 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden select-none -mt-px"
      aria-labelledby="statement-heading"
    >
      {/* ============================================================ */}
      {/* 1. BACKGROUND: SINGLE CONTEMPORARY INDIAN KITCHEN PHOTOGRAPH   */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src={MAGIC_ASSETS.kitchen}
          alt="Warm contemporary Indian kitchen preparing wholesome pulse dishes"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.08] transition-all duration-700 ease-editorial"
          style={{
            transform: `scale(${bgScale})`,
            opacity: bgOpacity,
            willChange: 'transform, opacity',
          }}
          loading="lazy"
        />

        {/* ============================================================ */}
        {/* 2. MIDDLE: SUBTLE DEEP MAROON ATMOSPHERIC OVERLAY            */}
        {/* ============================================================ */}
        {/* Base grounding gradient so bottom products anchor naturally */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3C1518] via-[#3C1518]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#3C1518]/30 to-[#3C1518]/80" />

        {/* DEDICATED TOP DEEP MAROON FADE OVERLAY (Seamless blend from #3C1518) */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-44 sm:h-60 lg:h-76 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, #3C1518 0%, rgba(60, 21, 24, 0.98) 12%, rgba(60, 21, 24, 0.92) 22%, rgba(60, 21, 24, 0.65) 45%, rgba(60, 21, 24, 0.22) 70%, rgba(60, 21, 24, 0) 100%)',
          }}
        />
      </div>

      {/* SUBTLE BOTANICAL CORIANDER ACCENT (Tastefully integrated at corner) */}
      <div
        aria-hidden="true"
        className="absolute -bottom-8 -end-8 w-[180px] sm:w-[220px] pointer-events-none opacity-20 z-10"
      >
        <img
          src={MAGIC_ASSETS.illustrationCoriander}
          alt=""
          className="w-full h-auto object-contain"
          loading="lazy"
        />
      </div>

      {/* ============================================================ */}
      {/* 3. FOREGROUND: HEADLINE, SUPPORTING COPY & GROUNDED PRODUCTS   */}
      {/* ============================================================ */}
      <div className="relative max-w-5xl mx-auto z-20 text-center flex flex-col items-center">
        {/* KICKER */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A843] mb-6 backdrop-blur-md shadow-md transition-all duration-700 ease-editorial"
          style={{
            transform: `translate3d(0, ${headlineTranslateY}px, 0)`,
            opacity: headlineOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <Sparkles className="w-3 h-3 text-[#D4A843]" />
          <span>{t('home.statement.kicker', 'OUR PROMISE')}</span>
        </div>

        {/* CINEMATIC HEADLINE */}
        <h2
          id="statement-heading"
          className="font-display font-black text-3xl sm:text-5xl lg:text-7xl text-[#FDF6EC] tracking-tight leading-[1.05] mb-6 max-w-4xl transition-all duration-700 ease-editorial"
          style={{
            transform: `translate3d(0, ${headlineTranslateY}px, 0)`,
            opacity: headlineOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <span>FROM OUR FIELDS.</span>
          <br />
          <span className="text-[#D4A843]">TO YOUR KITCHEN.</span>
        </h2>

        {/* SUPPORTING COPY */}
        <p
          className="text-sm sm:text-lg text-[#FDF6EC]/85 max-w-2xl mx-auto leading-relaxed font-normal mb-10 transition-all duration-700 ease-editorial"
          style={{
            transform: `translate3d(0, ${copyTranslateY}px, 0)`,
            opacity: copyOpacity,
            willChange: 'transform, opacity',
          }}
        >
          {t(
            'home.statement.sub',
            'Directly from verified Indian growers to UAE kitchens. Pure, unpolished, and packed with heritage flavor.'
          )}
        </p>

        {/* DUAL ACTION BUTTONS */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-16 transition-all duration-700 ease-editorial"
          style={{
            transform: `translate3d(0, ${ctaTranslateY}px, 0)`,
            opacity: ctaOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <button
            type="button"
            onClick={onExplorePantry}
            className="px-8 py-3.5 rounded-full bg-[#C8102E] hover:bg-[#A60D26] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer flex items-center gap-2 group"
          >
            <span>{t('home.hero.ctaPantry', 'EXPLORE THE PANTRY')}</span>
            <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          <button
            type="button"
            onClick={onNavigateImpact}
            className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#3C1518] border border-white/30 font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-md"
          >
            <span>{t('home.statement.cta', 'DISCOVER OUR STORY')}</span>
          </button>
        </div>

        {/* GROUNDED AUTHENTIC PRODUCT GROUP (Clearly separated with contact shadows) */}
        <div
          className="relative w-full max-w-2xl h-36 sm:h-44 flex items-end justify-center -space-x-4 sm:-space-x-6 opacity-95 transition-all duration-700 ease-editorial"
          style={{
            transform: `translate3d(0, ${productTranslateY}px, 0)`,
            opacity: productOpacity,
            willChange: 'transform, opacity',
          }}
        >
          {/* Ground Contact Shadow */}
          <div
            className="absolute bottom-1 inset-x-8 h-8 rounded-full blur-[10px] pointer-events-none opacity-60"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.9) 0%, transparent 70%)',
            }}
          />

          <img
            src={MAGIC_ASSETS.haldi}
            alt="MAGIC Haldi"
            className="h-28 sm:h-36 w-auto object-contain filter drop-shadow-2xl -rotate-6 z-10 hover:-translate-y-1 transition-transform duration-500 ease-editorial"
            loading="lazy"
          />
          <img
            src={MAGIC_ASSETS.toor}
            alt="MAGIC Toor Dal"
            className="h-32 sm:h-42 w-auto object-contain filter drop-shadow-2xl -rotate-2 z-20 hover:-translate-y-1.5 transition-transform duration-500 ease-editorial"
            loading="lazy"
          />
          <img
            src={MAGIC_ASSETS.masoor}
            alt="MAGIC Masoor Dal"
            className="h-32 sm:h-42 w-auto object-contain filter drop-shadow-2xl rotate-2 z-20 hover:-translate-y-1.5 transition-transform duration-500 ease-editorial"
            loading="lazy"
          />
          <img
            src={MAGIC_ASSETS.jeera}
            alt="MAGIC Jeera"
            className="h-28 sm:h-36 w-auto object-contain filter drop-shadow-2xl rotate-6 z-10 hover:-translate-y-1 transition-transform duration-500 ease-editorial"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
