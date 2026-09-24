import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HYDRATED_BUNDLES, HydratedBundle } from '../../data/bundles';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface HomeBundlesProps {
  onNavigateBundles: (bundleSlug?: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const HomeBundles: React.FC<HomeBundlesProps> = ({
  onNavigateBundles,
  onSelectProduct,
}) => {
  const { t, isRTL } = useLanguage();
  const { ref: headingRef, isRevealed: headingRevealed } = useScrollReveal<HTMLHeadingElement>();
  const sectionRef = useRef<HTMLElement>(null);
  const bundleStageRef = useRef<HTMLDivElement>(null);
  const [activeBundleIndex, setActiveBundleIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Mouse tracking with smooth lerp
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const [scrollScale, setScrollScale] = useState(1);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const updateMouseLerp = useCallback(() => {
    if (isReducedMotion) return;
    const lerp = 0.08;
    mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * lerp;
    mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * lerp;

    const dx = Math.abs(mouseTarget.current.x - mouseCurrent.current.x);
    const dy = Math.abs(mouseTarget.current.y - mouseCurrent.current.y);
    if (dx > 0.0005 || dy > 0.0005) {
      setSmoothMouse({ x: mouseCurrent.current.x, y: mouseCurrent.current.y });
    }
    animFrameId.current = requestAnimationFrame(updateMouseLerp);
  }, [isReducedMotion]);

  useEffect(() => {
    if (!isReducedMotion) {
      animFrameId.current = requestAnimationFrame(updateMouseLerp);
    }
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [updateMouseLerp, isReducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || !bundleStageRef.current) return;
    const rect = bundleStageRef.current.getBoundingClientRect();
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

  // Scroll scale subtle response (0.97 to 1.02)
  useEffect(() => {
    if (isReducedMotion) return;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(viewportCenter - sectionCenter) / window.innerHeight;
      const scale = Math.max(0.97, Math.min(1.02, 1.02 - distanceFromCenter * 0.08));
      setScrollScale(scale);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReducedMotion]);

  const bundlesList: HydratedBundle[] = HYDRATED_BUNDLES.slice(0, 3);
  const heroBundle = bundlesList[activeBundleIndex] || bundlesList[0];

  const mx = smoothMouse.x;
  const my = smoothMouse.y;

  return (
    <section
      id="bundles"
      ref={sectionRef}
      className="relative w-full bg-[#FDF6EC] text-[#3C1518] py-20 sm:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden select-none border-t border-[#3C1518]/10"
      aria-labelledby="bundles-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* EDITORIAL HEADER ROW */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-[#6B4226] tracking-[0.25em] uppercase font-bold block mb-3">
              04 / 07 — CURATED SETS
            </span>
            <h2
              id="bundles-heading"
              ref={headingRef}
              className={`font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#3C1518] tracking-tight leading-none mb-3 reveal-heading ${
                headingRevealed ? 'is-revealed' : ''
              }`}
            >
              {t('home.bundles.title', 'BUILD YOUR MAGIC PANTRY')}
            </h2>
            <p className="text-sm sm:text-base text-[#3C1518]/70 font-normal">
              {t('home.bundles.sub', 'Curated combinations for everyday Indian cooking.')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateBundles(heroBundle.slug)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C8102E] hover:bg-[#A60D26] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer self-start sm:self-end"
          >
            <span>{t('home.bundles.cta', 'EXPLORE BUNDLES')}</span>
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* HERO EDITORIAL BUNDLE STAGE WITH 2.5D MOUSE DEPTH */}
        <div
          ref={bundleStageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-white rounded-3xl border-2 border-[#3C1518]/15 p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scrollScale})`,
            willChange: 'transform',
          }}
        >
          {/* LEFT: 2.5D MULTI-LAYER BUNDLE COMPOSITION */}
          <div className="lg:col-span-7 relative w-full h-[340px] sm:h-[420px] lg:h-[460px] bg-gradient-to-b from-[#FAF5EE] to-[#F5ECE0]/60 rounded-2xl flex items-center justify-center p-6 overflow-hidden perspective-1000 transform-style-3d">
            {/* Background Ambience Sieve Rings */}
            <div
              className="absolute inset-8 rounded-full border border-[#D4A843]/20 bg-white/40 pointer-events-none transition-transform duration-150"
              style={{
                transform: `translate3d(${mx * -4}px, ${my * -4}px, -40px)`,
              }}
            />
            <div
              className="absolute inset-16 rounded-full border border-dashed border-[#D4A843]/25 pointer-events-none transition-transform duration-150"
              style={{
                transform: `translate3d(${mx * -6}px, ${my * -6}px, -20px)`,
              }}
            />

            {/* Badge */}
            {heroBundle.badge && (
              <span className="absolute top-4 start-4 z-30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-[#3C1518]/20 text-[#3C1518] shadow-xs">
                {heroBundle.badge}
              </span>
            )}

            {/* Ground Contact Shadow */}
            <div
              className="absolute bottom-6 inset-x-12 h-8 rounded-full blur-md opacity-35 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.6) 0%, transparent 70%)',
                transform: `translate3d(${mx * -3}px, 0, 0)`,
              }}
            />

            {/* Subtle environmental/decorative pantry tools illustration */}
            <div
              aria-hidden="true"
              className="absolute inset-x-8 bottom-4 flex justify-center pointer-events-none opacity-[0.20] z-0 select-none"
              style={{
                transform: `translate3d(${mx * -4}px, ${my * -3}px, -30px)`,
              }}
            >
              <img
                src={MAGIC_ASSETS.illustrationPantryTools}
                alt=""
                className="max-h-[160px] sm:max-h-[200px] w-auto object-contain filter contrast-125"
                loading="lazy"
              />
            </div>

            {/* Layered Authentic Packaging Composition with Differential Depths */}
            <div className="relative z-10 flex items-center justify-center -space-x-8 sm:-space-x-12 w-full h-full transform-style-3d">
              {heroBundle.products.map((product, idx) => {
                const rotations = [-5, 3, -2, 4];
                const baseRot = rotations[idx % rotations.length];
                const zDepths = [-15, 20, 45, 10];
                const zDepth = zDepths[idx % zDepths.length];

                // Differential mouse multiplier per depth plane
                const depthMultiplier = (idx + 1) * 3.5;
                const layerX = isReducedMotion ? 0 : mx * depthMultiplier;
                const layerY = isReducedMotion ? 0 : my * depthMultiplier;
                const layerRot = isReducedMotion ? baseRot : baseRot + mx * 1.5;

                return (
                  <button
                    type="button"
                    key={product.id}
                    onClick={() => onSelectProduct(product.slug)}
                    aria-label={`View ${product.name} (${product.weight}) packaging`}
                    className="relative cursor-pointer transition-transform duration-150 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#C8102E] rounded-xl focus:outline-hidden"
                    style={{
                      transform: `translate3d(${layerX}px, ${layerY}px, ${zDepth}px) rotate(${layerRot}deg)`,
                      zIndex: idx === 1 || idx === 2 ? 30 : 20,
                      willChange: 'transform',
                    }}
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} (${product.weight}) packaging pouch`}
                      className="max-h-[230px] sm:max-h-[290px] w-auto object-contain filter drop-shadow-[0_16px_25px_rgba(60,21,24,0.25)]"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: BUNDLE EDITORIAL SPECIFICATION & SWITCHER */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Bundle Switcher Tabs */}
              <div className="flex gap-2 mb-6">
                {bundlesList.map((b, idx) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setActiveBundleIndex(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                      activeBundleIndex === idx
                        ? 'bg-[#3C1518] text-[#FDF6EC]'
                        : 'bg-[#FAF5EE] text-[#3C1518]/70 hover:bg-[#3C1518]/10'
                    }`}
                  >
                    SET 0{idx + 1}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C8102E]">
                  {heroBundle.category}
                </span>
                <span className="text-[#3C1518]/30">·</span>
                <span className="font-mono text-xs text-[#3C1518]/60">
                  {heroBundle.totalWeight}
                </span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#3C1518] leading-tight mb-3">
                {heroBundle.name}
              </h3>

              <p className="text-sm text-[#3C1518]/75 leading-relaxed font-normal mb-6">
                {heroBundle.description}
              </p>

              {/* CURATED PRODUCTS INCLUDED */}
              <div className="space-y-2 mb-8">
                <span className="font-mono text-[11px] font-bold text-[#3C1518]/70 uppercase tracking-widest block">
                  INCLUDED IN THIS COLLECTION:
                </span>
                <div className="flex flex-wrap gap-2">
                  {heroBundle.products.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => onSelectProduct(p.slug)}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF5EE] hover:bg-[#C8102E] hover:text-white border border-[#3C1518]/10 text-xs font-medium text-[#3C1518] transition-colors cursor-pointer"
                    >
                      {p.name} ({p.weight})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* PRICE & ACTION */}
            <div className="pt-6 border-t border-[#3C1518]/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#3C1518]/60 uppercase block">
                  BUNDLE VALUE
                </span>
                <span className="font-mono text-2xl font-black text-[#3C1518]">
                  AED {heroBundle.price.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onNavigateBundles(heroBundle.slug)}
                className="px-6 py-3 rounded-full bg-[#3C1518] hover:bg-[#C8102E] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                VIEW SET DETAILS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
