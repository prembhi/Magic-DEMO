import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';

interface HomeHeroProps {
  onExplorePantry: () => void;
  onDiscoverStory: () => void;
  onSelectProduct?: (slug: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onExplorePantry,
  onDiscoverStory,
}) => {
  const { t, isRTL } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // 2.5D Subtle Cinematic Depth Tracking with Lerp
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const updateParallax = useCallback(() => {
    if (isReducedMotion) return;
    const lerpFactor = 0.07;
    mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * lerpFactor;
    mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * lerpFactor;

    const dx = Math.abs(mouseTarget.current.x - mouseCurrent.current.x);
    const dy = Math.abs(mouseTarget.current.y - mouseCurrent.current.y);
    if (dx > 0.0001 || dy > 0.0001) {
      setSmoothMouse({ x: mouseCurrent.current.x, y: mouseCurrent.current.y });
    }
    animFrameId.current = requestAnimationFrame(updateParallax);
  }, [isReducedMotion]);

  useEffect(() => {
    if (!isReducedMotion) {
      animFrameId.current = requestAnimationFrame(updateParallax);
    }
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [updateParallax, isReducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isReducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseTarget.current = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    };
  };

  const handleMouseLeave = () => {
    mouseTarget.current = { x: 0, y: 0 };
  };

  useEffect(() => {
    if (isReducedMotion) return;
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      setScrollOffset(scrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReducedMotion]);

  // Attempt autoPlay gracefully
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted on some devices; poster fallback is active
      });
    }
  }, []);

  const [heroReady, setHeroReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // Choreographed entrance trigger immediately on mount
    const timer1 = setTimeout(() => {
      setHeroReady(true);
    }, 50);
    const timer2 = setTimeout(() => {
      setHasEntered(true);
    }, 1100);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const mx = smoothMouse.x;
  const my = smoothMouse.y;
  const sy = scrollOffset;

  // Normalized hero scroll progression (0 at top, 1 at 550px scrolled)
  const scrollT = isReducedMotion ? 0 : Math.min(1, Math.max(0, sy / 550));

  // Dynamic scroll response per element
  const headlineScrollY = -70 * scrollT;
  const headlineOpacity = Math.max(0, 1 - scrollT * 1.25);

  const copyScrollY = -45 * scrollT;
  const copyOpacity = Math.max(0, 1 - scrollT * 1.15);

  const ctaScrollY = -25 * scrollT;
  const ctaOpacity = Math.max(0, 1 - scrollT * 1.05);

  const videoScale = 1.03 + 0.07 * scrollT;
  const overlayOpacity = 0.5 + 0.3 * scrollT;

  return (
    <section
      ref={heroRef}
      id="farm"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100dvh] lg:min-h-[100dvh] bg-[#3C1518] text-[#FDF6EC] flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-12 pt-[94px] sm:pt-[106px] lg:pt-[116px] pb-12 sm:pb-16 lg:pb-20 select-none border-b-2 border-[#D4A843]/30"
      aria-label="MAGIC Farm-to-Spice Cinematic Hero"
    >
      {/* ========================================================================= */}
      {/* 2.5D LAYER 0: CINEMATIC FULL-BLEED BACKGROUND VIDEO (Indian Farm-to-Spice)*/}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          transform: isReducedMotion
            ? 'none'
            : `translate3d(${mx * 8}px, ${my * 6 - sy * 0.06}px, 0) scale(${videoScale})`,
          willChange: 'transform',
        }}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={MAGIC_ASSETS.heroPoster}
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover filter brightness-[0.78] contrast-[1.08] saturate-[1.12] transition-opacity duration-1000 ease-out ${
            videoLoaded ? 'opacity-100' : 'opacity-80'
          }`}
        >
          <source src={MAGIC_ASSETS.heroVideoWebm} type="video/webm" />
          <source src={MAGIC_ASSETS.heroVideoMp4} type="video/mp4" />
        </video>

        {/* Atmospheric Tonal Overlays */}
        <div
          className="absolute inset-0 bg-[#3C1518] mix-blend-multiply"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#3C1518]/40 to-[#3C1518]/90" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#3C1518]/80 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#3C1518] to-transparent" />
      </div>

      {/* ========================================================================= */}
      {/* 2.5D LAYER 1: EDITORIAL HEADLINE, VALUES & ACTIONS                        */}
      {/* ========================================================================= */}
      <div
        className="relative max-w-6xl mx-auto w-full z-10 my-auto flex flex-col items-center text-center py-1 sm:py-2"
        style={{
          transform: isReducedMotion ? 'none' : `translate3d(${mx * -6}px, ${my * -5}px, 0)`,
          willChange: 'transform',
        }}
      >
        {/* 1. MAIN HEADLINE (STRICT MAXIMUM 2 LINES) */}
        <h1
          style={{
            opacity: heroReady ? (isReducedMotion ? 1 : (hasEntered ? headlineOpacity : 1)) : 0,
            transform: heroReady ? `translateY(${isReducedMotion ? 0 : (hasEntered ? headlineScrollY : 0)}px)` : 'translateY(35px)',
            transition: hasEntered ? 'none' : 'opacity 750ms cubic-bezier(0.22, 1, 0.36, 1) 120ms, transform 750ms cubic-bezier(0.22, 1, 0.36, 1) 120ms',
          }}
          className="font-display font-extrabold text-[1.35rem] xs:text-[1.55rem] sm:text-3xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] text-[#FDF6EC] tracking-tight leading-[1.06] sm:leading-[1.0] mb-3.5 sm:mb-5 max-w-6xl"
        >
          {isRTL ? (
            <>
              توابل وبقوليات هندية أصيلة.
              <br />
              <span className="text-[#D4A843] not-italic font-bold">مباشرة من المزارع إلى مائدتك.</span>
            </>
          ) : (
            <>
              PURE INDIAN SPICES & PULSES.
              <br />
              <span className="text-[#D4A843] not-italic font-bold">Direct from generational farms.</span>
            </>
          )}
        </h1>

        {/* 2. ONE SHORT SUPPORTING SENTENCE */}
        <p
          style={{
            opacity: heroReady ? (isReducedMotion ? 1 : (hasEntered ? copyOpacity : 1)) : 0,
            transform: heroReady ? `translateY(${isReducedMotion ? 0 : (hasEntered ? copyScrollY : 0)}px)` : 'translateY(20px)',
            transition: hasEntered ? 'none' : 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 240ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 240ms',
          }}
          className="max-w-xl text-sm sm:text-base md:text-lg text-[#FDF6EC]/90 font-sans font-normal leading-relaxed mb-6 sm:mb-8 drop-shadow-sm px-2"
        >
          {isRTL
            ? 'توابل هندية نقية وبقوليات غير مصقولة من المزارع المتوارثة مباشرة إلى مطبخك في الإمارات.'
            : 'Direct-sourced Indian spices and unpolished pulses delivered fresh to UAE kitchens.'}
        </p>

        {/* 4. HIGH-IMPACT CTAS: Rises from 20px on load, translateY(0 -> -25px) on scroll */}
        <div
          style={{
            opacity: heroReady ? (isReducedMotion ? 1 : (hasEntered ? ctaOpacity : 1)) : 0,
            transform: heroReady ? `translateY(${isReducedMotion ? 0 : (hasEntered ? ctaScrollY : 0)}px)` : 'translateY(20px)',
            transition: hasEntered ? 'none' : 'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1) 460ms, transform 650ms cubic-bezier(0.22, 1, 0.36, 1) 460ms',
          }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-2 sm:mb-4"
        >
          <button
            type="button"
            onClick={onExplorePantry}
            className="magic-btn-primary min-h-[48px] h-14 sm:h-16 px-8 sm:px-10 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md shadow-xl hover:shadow-2xl flex items-center gap-2.5 cursor-pointer group border border-white/20 active:scale-[0.98] transition-all"
          >
            <span>{isRTL ? 'تسوق المحصول' : 'SHOP THE HARVEST'}</span>
            <ArrowIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
          </button>

          <button
            type="button"
            onClick={onDiscoverStory}
            className="magic-btn-secondary min-h-[48px] h-14 sm:h-16 px-8 sm:px-10 bg-white/10 hover:bg-white/20 text-[#FDF6EC] border-2 border-[#D4A843]/60 hover:border-[#D4A843] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md shadow-lg cursor-pointer backdrop-blur-md active:scale-[0.98] transition-all"
          >
            {isRTL ? 'قصة التوريد الأصيل' : 'OUR SOURCING ETHOS'}
          </button>
        </div>
      </div>
    </section>
  );
};
