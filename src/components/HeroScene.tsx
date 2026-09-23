import React, { useState, useEffect } from 'react';
import { HeroCarousel } from './HeroCarousel';
import { MAGIC_PRODUCTS } from '../data/products';

interface HeroSceneProps {
  onAddToCart?: (productId: string) => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ onAddToCart }) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Subtle 2.5D mouse parallax movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const xRatio = (clientX - left) / width - 0.5; // -0.5 to 0.5
    const yRatio = (clientY - top) / height - 0.5;
    setMouseParallax({ x: xRatio, y: yRatio });
  };

  const handleMouseLeave = () => {
    setMouseParallax({ x: 0, y: 0 });
  };

  const activeProduct = MAGIC_PRODUCTS[currentProductIndex];

  return (
    <section
      className="relative w-full min-h-[calc(100vh-68px)] flex flex-col justify-between overflow-hidden bg-[#FDF6EC] px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="MAGIC Spice World Hero Experience"
    >
      {/* LAYER 1: WARM IVORY/PARCHMENT CANVAS & SUBTLE GRAIN */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft Radial Ambient Glow matching active product */}
        <div
          className="absolute inset-0 opacity-45 transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 48%, ${activeProduct.environment.glowColor} 0%, rgba(253, 246, 236, 0.35) 60%, #FDF6EC 100%)`,
          }}
        />
        {/* Tactile Parchment Paper Texture Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.032] mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
          <filter id="heroPaperGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroPaperGrain)" />
        </svg>
      </div>

      {/* LAYER 2: PACKAGING-INSPIRED RED RIBBON CURVE & TERROIR CONTOUR */}
      <div
        className="absolute inset-x-0 top-10 sm:top-14 h-72 pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mouseParallax.x * -10}px, ${mouseParallax.y * -6}px)`,
        }}
      >
        <svg
          viewBox="0 0 1440 280"
          className="w-full h-full preserve-3d opacity-25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Organic Rolling Hills */}
          <path
            d="M0,140 C320,210 440,60 720,130 C1000,200 1140,80 1440,140 L1440,280 L0,280 Z"
            fill="#EADBC8"
            fillOpacity="0.4"
          />
          {/* Packaging-inspired Magic Red Organic Wave Line */}
          <path
            d="M-40,170 C280,95 520,230 840,140 C1160,50 1340,185 1500,125"
            stroke="#C8102E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 6"
            opacity="0.32"
          />
          {/* Warm Spice Gold Secondary Horizon Line */}
          <path
            d="M-20,115 C360,180 680,85 1020,155 C1280,210 1400,105 1480,130"
            stroke="#D4A843"
            strokeWidth="1.5"
            opacity="0.28"
          />
        </svg>
      </div>

      {/* LAYER 3: REFINED EDITORIAL HEADLINE (BALANCED PROPORTIONS, NOT VERTICALLY OVERSIZED) */}
      <div
        className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center z-10 select-none pt-1 sm:pt-2 transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mouseParallax.x * -5}px, ${mouseParallax.y * -3}px)`,
        }}
      >
        {/* Subtle Editorial Kicker with Arabic Typography */}
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#C8102E] font-bold mb-1.5">
          <span className="w-5 h-[1.5px] bg-[#C8102E]" />
          <span>The Soul of Indian Kitchens</span>
          <span className="text-[#3C1518]/30">·</span>
          <span className="font-arabic font-normal text-xs text-[#3C1518]/80">جوهر المطبخ الهندي</span>
          <span className="w-5 h-[1.5px] bg-[#C8102E]" />
        </div>

        {/* Expressive Editorial Headline in Fraunces (compacted height so product world dominates) */}
        <h1
          className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] text-[#3C1518] leading-[0.98] tracking-tight max-w-4xl"
          style={{ textWrap: 'balance' }}
        >
          <span className="inline-block transform hover:scale-102 transition-transform">MAGIC</span>{' '}
          <span className="italic font-light text-[#C8102E] font-serif">IN EVERY</span>{' '}
          <span className="inline-block relative">
            PINCH
            {/* Subtle red/gold accent bar */}
            <span className="absolute -bottom-0.5 left-1 right-1 h-[3px] bg-[#D4A843]/60 rounded-full" />
          </span>
        </h1>

        {/* Compact Editorial Subtext */}
        <p className="mt-2 text-xs sm:text-sm text-[#6B4226] max-w-xl font-medium leading-normal">
          From the sun-drenched terroir of India to the grand dining tables of Dubai and the Americas. Single-origin heritage lentils and whole ground spices.
        </p>
      </div>

      {/* LAYER 4 & 5: PRODUCT ENVIRONMENT & 2.5D CAROUSEL STAGE */}
      <div
        className="relative w-full max-w-7xl mx-auto flex-1 flex items-center justify-center my-1 sm:my-2 z-20 transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mouseParallax.x * 6}px, ${mouseParallax.y * 4}px)`,
        }}
      >
        <HeroCarousel
          activeIndex={currentProductIndex}
          onSelectIndex={setCurrentProductIndex}
          onAddToCart={onAddToCart}
        />
      </div>

      {/* LAYER 6: FLOATING FOREGROUND BOTANICAL & SPICE ELEMENTS */}
      <div
        className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
        style={{
          transform: `translate(${mouseParallax.x * 20}px, ${mouseParallax.y * 14}px)`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-hidden="true"
      >
        {/* Floating Star Anise (Top Left) */}
        <div className="absolute top-[18%] left-[3%] sm:left-[7%] animate-subtle-float opacity-80">
          <svg className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-md" viewBox="0 0 60 60" fill="none">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 30 30)`}>
                <path d="M30 10 C 26 18, 27 24, 30 30 C 33 24, 34 18, 30 10 Z" fill="#5A2E16" />
                <circle cx="30" cy="18" r="2.2" fill="#D4A843" />
              </g>
            ))}
            <circle cx="30" cy="30" r="5" fill="#3D1D0D" />
          </svg>
        </div>

        {/* Floating Green Cardamom Pod (Top Right) */}
        <div
          className="absolute top-[20%] right-[4%] sm:right-[8%] animate-subtle-float opacity-80"
          style={{ animationDelay: '1.8s' }}
        >
          <svg className="w-9 h-12 sm:w-12 sm:h-16 drop-shadow-md" viewBox="0 0 40 60" fill="none">
            <ellipse cx="20" cy="30" rx="14" ry="24" fill="#5F8846" transform="rotate(18 20 30)" />
            <path d="M12 12 Q 22 30 14 48" stroke="#3E5C2C" strokeWidth="1.8" fill="none" />
            <path d="M22 10 Q 28 30 24 50" stroke="#3E5C2C" strokeWidth="1.8" fill="none" />
            <circle cx="16" cy="10" r="2" fill="#2E4822" />
          </svg>
        </div>

        {/* Floating Whole Cinnamon Bark (Bottom Left) */}
        <div
          className="absolute bottom-[6%] left-[4%] sm:left-[8%] animate-subtle-float opacity-75"
          style={{ animationDelay: '3.2s' }}
        >
          <svg className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-md" viewBox="0 0 80 80" fill="none">
            <rect x="15" y="32" width="55" height="14" rx="7" transform="rotate(-32 40 40)" fill="#6B381E" />
            <rect x="18" y="35" width="48" height="4" rx="2" transform="rotate(-32 40 40)" fill="#8A4A28" />
            <ellipse cx="23" cy="56" rx="4" ry="7" transform="rotate(-32 23 56)" fill="#4A2412" />
          </svg>
        </div>

        {/* Floating Whole Cumin Seed Flurry (Bottom Right) */}
        <div
          className="absolute bottom-[8%] right-[5%] sm:right-[9%] animate-subtle-float opacity-80"
          style={{ animationDelay: '2.5s' }}
        >
          <svg className="w-12 h-14 sm:w-16 sm:h-18 drop-shadow-sm" viewBox="0 0 60 70" fill="none">
            <ellipse cx="28" cy="35" rx="18" ry="6" fill="#8A5A36" transform="rotate(-25 28 35)" />
            <line x1="12" y1="42" x2="44" y2="28" stroke="#D4A843" strokeWidth="1.5" />
            <ellipse cx="38" cy="52" rx="12" ry="4" fill="#6B4226" transform="rotate(35 38 52)" />
            <line x1="28" y1="45" x2="48" y2="59" stroke="#D4A843" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      {/* LAYER 7: VERIFIED BOTTOM PACKAGING ATTRIBUTES (NO UNSUPPORTED CLAIMS) */}
      <div className="relative w-full max-w-7xl mx-auto pt-3 pb-1 border-t border-[#3C1518]/10 z-20 flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs text-[#6B4226]">
        {/* Left verified packaging seals */}
        <div className="flex items-center gap-3">
          <span className="font-bold uppercase tracking-wider text-[#C8102E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
            100% Organic Selection
          </span>
          <span className="text-[#3C1518]/30">·</span>
          <span className="font-semibold text-[#3C1518]">Best Quality Certified</span>
          <span className="text-[#3C1518]/30">·</span>
          <span>Heritage Indian Pulses & Pure Spices</span>
        </div>

        {/* Right verified markets */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#3C1518]">Global Distribution:</span>
          <span>Dubai Wholesale City, UAE</span>
          <span className="text-[#3C1518]/30">/</span>
          <span>USA Markets</span>
          <span className="text-[#3C1518]/30">·</span>
          <span className="font-arabic font-bold text-sm text-[#C8102E]">جودة عالمية</span>
        </div>
      </div>
    </section>
  );
};
