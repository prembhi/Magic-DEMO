import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';

interface HomeBrandStatementProps {
  onNavigateImpact: () => void;
  onExplorePantry: () => void;
}

export const HomeBrandStatement: React.FC<HomeBrandStatementProps> = ({
  onNavigateImpact,
  onExplorePantry,
}) => {
  const { isRTL } = useLanguage();
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

  useEffect(() => {
    if (!isReducedMotion) return;
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

  // Subtle 2.5D background drift rate & scale
  const bgDrift = isReducedMotion ? 0 : (scrollProgress - 0.5) * 45;
  const bgScale = isReducedMotion ? 1 : Math.max(1, 1.08 - 0.08 * scrollProgress);
  const fgTranslateY = isReducedMotion ? 0 : Math.max(0, (1 - Math.min(1, scrollProgress * 2.2)) * 35);
  const headlineTranslateY = isReducedMotion ? 0 : Math.max(0, (1 - Math.min(1, scrollProgress * 2.5)) * 35);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#3C1518] text-[#FDF6EC] py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden select-none border-y-2 border-[#D4A843]/30"
      aria-label="MAGIC Brand Statement"
    >
      {/* ========================================================================= */}
      {/* 2.5D LAYER 0: ATMOSPHERIC ENVIRONMENTAL INDIAN SPICE HARVEST BACKGROUND   */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          transform: isReducedMotion
            ? 'none'
            : `translate3d(0, ${bgDrift}px, 0) scale(${bgScale.toFixed(3)})`,
          willChange: 'transform',
        }}
        aria-hidden="true"
      >
        {/* Environmental Harvest Courtyard Image */}
        <img
          src={MAGIC_ASSETS.spiceCourtyard}
          alt=""
          className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.10] saturate-[1.05]"
          loading="lazy"
        />

        {/* Deep Maroon Overlay */}
        <div className="absolute inset-0 bg-[#3C1518]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3C1518] via-[#3C1518]/65 to-[#3C1518]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#3C1518]/40 to-[#3C1518]/90" />
      </div>

      {/* ========================================================================= */}
      {/* CENTRAL EDITORIAL STATEMENT CONTAINER (Pure Negative Space Focus)          */}
      {/* ========================================================================= */}
      <div
        style={{
          transform: isReducedMotion ? 'none' : `translate3d(0, ${fgTranslateY}px, 0)`,
          willChange: 'transform',
        }}
        className="relative max-w-5xl mx-auto text-center z-10"
      >
        {/* EDITORIAL PROMISE EYEBROW */}
        <p className="text-[#D4A843] text-xs font-bold tracking-[0.25em] uppercase mb-4 sm:mb-5">
          {isRTL ? 'عهدنا الصادق لكل منزل' : 'OUR COMMITMENT TO YOUR KITCHEN'}
        </p>

        {/* FRAUNCES STATEMENT HEADLINE */}
        <h2
          style={{
            transform: isReducedMotion ? 'none' : `translate3d(0, ${headlineTranslateY}px, 0)`,
            willChange: 'transform',
          }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.98] mb-5 sm:mb-6 drop-shadow-md"
        >
          <span className="block text-[#FDF6EC]">{isRTL ? 'مكونات نقية.' : 'PURE INGREDIENTS.'}</span>
          <span className="block text-[#D4A843]">{isRTL ? 'مناشئ حقيقية.' : 'REAL ORIGINS.'}</span>
          <span className="block text-[#C8102E] italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-1.5">
            {isRTL ? 'سحر ونقاء في كل رشة.' : 'Magic in every pinch.'}
          </span>
        </h2>

        {/* SUPPORTING NARRATIVE WITH ENHANCED CONTRAST & READABILITY */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#FDF6EC]/90 leading-relaxed font-sans mb-6 sm:mb-8 drop-shadow-sm font-normal">
          {isRTL
            ? 'بلا خلط مع إضافات رخيصة. بلا زيوت تلميع صناعية أو ملونات تجارية. نعمل مباشرة مع المزارعين في الهند لنصل بنقاء أصيل وعطري إلى كل طبق دال وكاري في دولة الإمارات.'
            : 'No blending with cheap fillers. No artificial polishing oils or industrial colorants. We work directly with Indian farmers to bring unhurried, fragrant purity to every pot of dal and every spiced dish in the UAE.'}
        </p>

        {/* EDITORIAL CTAS */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={onNavigateImpact}
            className="h-12 sm:h-13 px-8 sm:px-10 bg-[#C8102E] hover:bg-[#9B0D23] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-md shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 cursor-pointer group active:scale-[0.98] border border-white/20"
          >
            <span>{isRTL ? 'أثرنا الزراعي' : 'OUR FARM IMPACT'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </button>

          <button
            type="button"
            onClick={onExplorePantry}
            className="h-12 sm:h-13 px-8 sm:px-10 bg-white/10 hover:bg-white/20 text-[#FDF6EC] border-2 border-[#D4A843]/60 hover:border-[#D4A843] text-xs sm:text-sm font-bold uppercase tracking-widest rounded-md transition-all cursor-pointer backdrop-blur-md active:scale-[0.98]"
          >
            {isRTL ? 'استكشف الأساسيات' : 'EXPLORE STAPLES'}
          </button>
        </div>
      </div>
    </section>
  );
};
