import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { MAGIC_PRODUCTS } from '../data/products';
import { PackagingPouch } from './PackagingPouch';
import { ProductEnvironment } from './ProductEnvironment';

interface HeroCarouselProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onAddToCart?: (productId: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  activeIndex,
  onSelectIndex,
  onAddToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalProducts = MAGIC_PRODUCTS.length;
  const currentProduct = MAGIC_PRODUCTS[activeIndex];

  // Advance carousel with continuous smooth pacing
  const goToNext = useCallback(() => {
    onSelectIndex((activeIndex + 1) % totalProducts);
  }, [activeIndex, totalProducts, onSelectIndex]);

  const goToPrev = useCallback(() => {
    onSelectIndex((activeIndex - 1 + totalProducts) % totalProducts);
  }, [activeIndex, totalProducts, onSelectIndex]);

  const goToIndex = (index: number) => {
    onSelectIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Premium slow auto-play carousel loop (pause on hover/interaction)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsAutoPlaying(false);
      return;
    }

    if (!isAutoPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, 5200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, isHovered, goToNext]);

  // Pointer & Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX === null) return;
    const delta = e.clientX - dragStartX;
    setDragOffset(delta);
  };

  const handlePointerUp = () => {
    if (dragStartX === null) return;
    if (dragOffset > 45) {
      goToPrev();
    } else if (dragOffset < -45) {
      goToNext();
    }
    setDragStartX(null);
    setDragOffset(0);
  };

  const handlePointerCancel = () => {
    setDragStartX(null);
    setDragOffset(0);
  };

  // Compute position offset (-2, -1, 0, 1, 2)
  const getProductSlot = (index: number) => {
    let diff = (index - activeIndex) % totalProducts;
    if (diff < -Math.floor(totalProducts / 2)) diff += totalProducts;
    if (diff > Math.floor(totalProducts / 2)) diff -= totalProducts;
    return diff;
  };

  return (
    <div
      ref={carouselContainerRef}
      className="relative w-full flex flex-col items-center justify-center select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{ touchAction: 'pan-y' }}
      aria-roledescription="carousel"
      aria-label="MAGIC Spices and Pulses Product Carousel"
    >
      {/* 2.5D PRODUCT PHYSICAL INSTALLATION STAGE */}
      <div className="relative w-full h-[470px] sm:h-[520px] md:h-[560px] lg:h-[590px] flex items-center justify-center overflow-visible">
        {MAGIC_PRODUCTS.map((prod, idx) => {
          const slot = getProductSlot(idx);
          const isCenter = slot === 0;

          // Hide products beyond +/- 2 slots for visual focus
          const isVisible = Math.abs(slot) <= 2;
          if (!isVisible) return null;

          // 2.5D Physical Depth Configuration:
          // Center product is dominant (scale 1.12-1.16).
          // Side products have vertical offsets, slight rotation, perspective and controlled overlap.
          let xPercent = 0;
          let yOffset = 0;
          let scale = 1.0;
          let rotate = 0;
          let zIndex = 30;
          let opacity = 1.0;
          let filter = 'none';

          if (isCenter) {
            scale = isHovered ? 1.16 : 1.12;
            yOffset = isHovered ? -8 : 0;
            rotate = 0;
            xPercent = 0;
            zIndex = 40;
            opacity = 1.0;
            filter = 'none';
          } else if (slot === -1) {
            // Immediate Left: tucked slightly behind center, lower elevation, inward tilt
            scale = isHovered ? 0.73 : 0.76;
            xPercent = -48;
            yOffset = 16;
            rotate = -3.5;
            zIndex = 26;
            opacity = isHovered ? 0.52 : 0.72;
            filter = 'brightness(0.95) blur(0.4px)';
          } else if (slot === 1) {
            // Immediate Right: tucked slightly behind center, slightly higher elevation for asymmetry
            scale = isHovered ? 0.74 : 0.78;
            xPercent = 48;
            yOffset = -10;
            rotate = 3.0;
            zIndex = 25;
            opacity = isHovered ? 0.52 : 0.72;
            filter = 'brightness(0.95) blur(0.4px)';
          } else if (slot === -2) {
            // Far Left: farther back in depth, lower, steeper tilt
            scale = 0.62;
            xPercent = -82;
            yOffset = 26;
            rotate = -6.0;
            zIndex = 12;
            opacity = isHovered ? 0.25 : 0.42;
            filter = 'brightness(0.88) blur(1.2px)';
          } else if (slot === 2) {
            // Far Right: farther back in depth, lower, steeper tilt
            scale = 0.64;
            xPercent = 82;
            yOffset = 20;
            rotate = 5.0;
            zIndex = 11;
            opacity = isHovered ? 0.25 : 0.42;
            filter = 'brightness(0.88) blur(1.2px)';
          }

          // Responsive drag resistance
          const dragTranslate = isCenter ? dragOffset * 0.4 : dragOffset * 0.2;

          return (
            <div
              key={prod.id}
              onClick={() => {
                if (!isCenter) goToIndex(idx);
              }}
              onMouseEnter={() => {
                if (isCenter) setIsHovered(true);
              }}
              onMouseLeave={() => {
                if (isCenter) setIsHovered(false);
              }}
              onFocus={() => {
                if (isCenter) setIsHovered(true);
              }}
              onBlur={() => {
                if (isCenter) setIsHovered(false);
              }}
              tabIndex={isCenter ? 0 : -1}
              role="group"
              aria-roledescription="slide"
              aria-label={`${prod.name} - ${prod.arabicName} (${idx + 1} of ${totalProducts})`}
              className={`absolute flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCenter ? 'cursor-pointer' : 'cursor-pointer hover:opacity-85'
              }`}
              style={{
                transform: `translateX(calc(${xPercent}% + ${dragTranslate}px)) translateY(${yOffset}px) scale(${scale}) rotate(${rotate}deg)`,
                opacity,
                zIndex,
                filter,
              }}
            >
              {/* Product Environment blooms from BEHIND the center active pouch */}
              {isCenter && (
                <ProductEnvironment
                  product={prod}
                  isHovered={isHovered}
                />
              )}

              {/* Physical Pouch Graphic */}
              <PackagingPouch
                product={prod}
                isCenter={isCenter}
                isHovered={isHovered}
              />
            </div>
          );
        })}
      </div>

      {/* REFINED EDITORIAL CONTROLS & PRODUCT CTA */}
      <div className="relative mt-2 sm:mt-5 flex flex-col items-center gap-3 z-30">
        {/* Carousel Navigation Bar */}
        <div className="flex items-center gap-6 sm:gap-8 bg-[#FDF6EC]/85 backdrop-blur-md px-5 py-2 rounded-full border border-[#3C1518]/15 shadow-sm">
          {/* PREV BUTTON (Accessible min 44x44px touch target) */}
          <button
            onClick={goToPrev}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#3C1518] hover:text-white hover:bg-[#C8102E] border border-[#3C1518]/20 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C8102E] active:scale-95"
            aria-label="Previous Product"
            title="Previous Product (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Minimal Numerical Counter: 01 / 06 */}
          <div className="flex items-center gap-2 font-mono tabular-nums text-sm font-semibold tracking-wider text-[#3C1518]">
            <span className="text-[#C8102E] font-bold text-base">
              {currentProduct.number}
            </span>
            <span className="text-[#3C1518]/30">/</span>
            <span className="text-[#3C1518]/60">0{totalProducts}</span>
          </div>

          {/* Dot Indicators */}
          <div className="hidden sm:flex items-center gap-2" aria-hidden="true">
            {MAGIC_PRODUCTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToIndex(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === activeIndex
                    ? 'w-6 h-2 bg-[#C8102E]'
                    : 'w-2 h-2 bg-[#3C1518]/25 hover:bg-[#3C1518]/60'
                }`}
                aria-label={`Go to product ${i + 1}`}
              />
            ))}
          </div>

          {/* NEXT BUTTON (Accessible min 44x44px touch target) */}
          <button
            onClick={goToNext}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#3C1518] hover:text-white hover:bg-[#C8102E] border border-[#3C1518]/20 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C8102E] active:scale-95"
            aria-label="Next Product"
            title="Next Product (Right Arrow)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ACTIVE PRODUCT BRAND CTA & METADATA (BRAND SYSTEM STYLING) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left mt-1">
          {/* Authentic Product Identity Tag */}
          <div className="flex items-center gap-2 text-xs text-[#6B4226]">
            <span className="font-bold text-[#3C1518] uppercase tracking-wider">{currentProduct.name}</span>
            <span className="text-[#3C1518]/30">·</span>
            <span className="font-arabic font-bold text-sm text-[#C8102E]">{currentProduct.arabicName}</span>
            <span className="text-[#3C1518]/30 hidden md:inline">·</span>
            <span className="text-[11px] font-mono text-[#3C1518]/80 hidden md:inline bg-[#3C1518]/5 px-2 py-0.5 rounded border border-[#3C1518]/10">
              {currentProduct.weight} · {currentProduct.weightArabic}
            </span>
          </div>

          {/* REFINED BRAND CTA BUTTON */}
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(currentProduct.id)}
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#3C1518] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-[0.16em] rounded-md border border-[#D4A843]/40 hover:border-[#D4A843] transition-all duration-300 cursor-pointer min-h-[42px] shadow-sm hover:shadow-md active:scale-98"
            >
              <span>Explore {currentProduct.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4A843] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
