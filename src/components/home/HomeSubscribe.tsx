import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Repeat, Sliders, ArrowRight } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface HomeSubscribeProps {
  onNavigateShop: () => void;
  onSelectProduct: (slug: string) => void;
}

export const HomeSubscribe: React.FC<HomeSubscribeProps> = ({
  onNavigateShop,
  onSelectProduct,
}) => {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: headingRef, isRevealed: headingRevealed } = useScrollReveal<HTMLHeadingElement>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Track scroll position across section to reveal benefits sequentially
  useEffect(() => {
    if (isReducedMotion) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section has scrolled through viewport
      const totalDist = rect.height + windowHeight;
      const currentPos = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentPos / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReducedMotion]);

  const benefits = [
    {
      step: '01',
      title: 'REGULAR DELIVERY',
      desc: 'Select your household delivery rhythm. Fresh Indian harvest arrives on your schedule.',
      icon: Calendar,
      detail: 'Cadence: 30, 14, or 7 days',
      revealThreshold: 0.35,
    },
    {
      step: '02',
      title: 'CONVENIENT',
      desc: 'Keep your pantry stocked without remembering to reorder before running empty.',
      icon: Repeat,
      detail: 'Automated pantry continuity',
      revealThreshold: 0.50,
    },
    {
      step: '03',
      title: 'FLEXIBLE',
      desc: 'Going on holiday or changing recipes? Pause, reschedule, or swap products anytime.',
      icon: Sliders,
      detail: 'Zero commitment · Swap anytime',
      revealThreshold: 0.65,
    },
  ];

  // Pantry arrangement product offsets (glide into shelf formation)
  const p1TranslateY = isReducedMotion ? 0 : Math.max(0, (1 - scrollProgress * 1.8) * 40);
  const p2TranslateY = isReducedMotion ? 0 : Math.max(0, (1 - scrollProgress * 1.6) * 30);
  const p3TranslateY = isReducedMotion ? 0 : Math.max(0, (1 - scrollProgress * 2.0) * 50);

  return (
    <section
      id="subscribe"
      ref={sectionRef}
      className="relative w-full bg-[#3C1518] text-[#FDF6EC] pt-20 sm:pt-28 pb-14 sm:pb-20 lg:pb-20 px-4 sm:px-6 lg:px-12 overflow-hidden select-none"
      aria-labelledby="subscribe-heading"
    >
      {/* ATMOSPHERIC GLOW */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C8102E]/15 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* EDITORIAL HEADER */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="font-mono text-xs text-[#D4A843] tracking-[0.25em] uppercase font-bold block mb-3">
            06 / 07 — PANTRY CONTINUITY
          </span>
          <h2
            id="subscribe-heading"
            ref={headingRef}
            className={`reveal-heading font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#FDF6EC] tracking-tight leading-tight mb-4 ${
              headingRevealed ? 'is-revealed' : ''
            }`}
          >
            <span>NEVER RUN OUT</span>
            <br />
            <span className="text-[#D4A843]">OF MAGIC.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#FDF6EC]/80 font-normal leading-relaxed">
            {t(
              'home.subscribe.sub',
              'Keep your everyday staples ready when you need them.'
            )}
          </p>
        </div>

        {/* UNIFIED ART-DIRECTED LAYOUT: PANTRY SHELF ARRANGEMENT + SEQUENTIAL BENEFITS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: ART-DIRECTED PANTRY COMPOSITION (Pouch layers glide into shelf formation) */}
          <div className="lg:col-span-6 relative w-full h-[360px] sm:h-[440px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-3xl border border-white/10 p-6 sm:p-8 flex items-center justify-center overflow-hidden">
            {/* Delivery cadence badge */}
            <div className="absolute top-4 start-4 z-30 px-3.5 py-1.5 rounded-full bg-[#3C1518]/90 border border-[#D4A843]/40 text-xs font-mono text-[#D4A843] shadow-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
              <span>DELIVERY CADENCE: 30 / 14 / 7 DAYS</span>
            </div>

            {/* Ground Contact Shadow */}
            <div
              className="absolute bottom-6 inset-x-12 h-6 rounded-full blur-md opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, transparent 70%)',
              }}
            />

            {/* Subtle background pantry tools motif */}
            <div
              aria-hidden="true"
              className="absolute inset-x-8 bottom-3 flex justify-center pointer-events-none opacity-[0.16] z-0 select-none"
            >
              <img
                src={MAGIC_ASSETS.illustrationPantryTools}
                alt=""
                className="max-h-[160px] sm:max-h-[190px] w-auto object-contain filter contrast-125"
                loading="lazy"
              />
            </div>

            {/* Product Composition with Smooth Pantry Glide */}
            <div className="relative z-10 flex items-end justify-center -space-x-8 sm:-space-x-10 w-full h-full pb-4">
              {/* Haldi */}
              <div
                onClick={() => onSelectProduct('magic-haldi')}
                className="cursor-pointer group/pouch transition-transform duration-700 ease-editorial hover:scale-105"
                style={{
                  transform: `translate3d(0, ${p1TranslateY}px, 0)`,
                  willChange: 'transform',
                }}
              >
                <img
                  src={MAGIC_ASSETS.haldi}
                  alt="MAGIC Haldi"
                  className="max-h-[170px] sm:max-h-[210px] w-auto object-contain filter drop-shadow-[0_14px_22px_rgba(0,0,0,0.4)]"
                  loading="lazy"
                />
              </div>

              {/* Toor Dal Flagship */}
              <div
                onClick={() => onSelectProduct('magic-toor-dal')}
                className="cursor-pointer group/pouch z-20 transition-transform duration-700 ease-editorial hover:scale-105"
                style={{
                  transform: `translate3d(0, ${p2TranslateY}px, 0)`,
                  willChange: 'transform',
                  transitionDelay: '80ms',
                }}
              >
                <img
                  src={MAGIC_ASSETS.toor}
                  alt="MAGIC Toor Dal"
                  className="max-h-[230px] sm:max-h-[280px] w-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] -rotate-2"
                  loading="lazy"
                />
              </div>

              {/* Jeera */}
              <div
                onClick={() => onSelectProduct('magic-jeera')}
                className="cursor-pointer group/pouch transition-transform duration-700 ease-editorial hover:scale-105"
                style={{
                  transform: `translate3d(0, ${p3TranslateY}px, 0)`,
                  willChange: 'transform',
                  transitionDelay: '160ms',
                }}
              >
                <img
                  src={MAGIC_ASSETS.jeera}
                  alt="MAGIC Jeera"
                  className="max-h-[170px] sm:max-h-[210px] w-auto object-contain filter drop-shadow-[0_14px_22px_rgba(0,0,0,0.35)] rotate-3"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: SEQUENTIAL SCROLL REVEAL BENEFITS */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {benefits.map((b) => {
              const Icon = b.icon;
              const isRevealed = isReducedMotion || scrollProgress >= b.revealThreshold;

              return (
                <div
                  key={b.step}
                  className={`p-6 rounded-2xl border transition-all duration-700 ease-editorial flex items-start gap-5 ${
                    isRevealed
                      ? 'bg-white/[0.06] border-[#D4A843]/50 shadow-md translate-y-0 opacity-100'
                      : 'bg-white/[0.02] border-white/10 translate-y-4 opacity-40'
                  }`}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#D4A843]/20 flex items-center justify-center text-[#D4A843] shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-display font-bold text-lg text-[#FDF6EC]">
                        {b.title}
                      </h3>
                      <span className="font-mono text-xs text-[#D4A843] font-bold">
                        {b.step}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#FDF6EC]/75 leading-relaxed font-normal mb-2">
                      {b.desc}
                    </p>

                    <span className="font-mono text-[10px] text-[#D4A843] uppercase tracking-wider block">
                      ✓ {b.detail}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* ACTION CTA */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={onNavigateShop}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C8102E] hover:bg-[#A60D26] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t('home.subscribe.cta', 'SUBSCRIBE & SAVE')}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
