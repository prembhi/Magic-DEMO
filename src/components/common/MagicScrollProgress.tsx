import React, { useEffect, useState, useRef, useCallback } from 'react';

/**
 * MAGIC Editorial Custom Scrollbar
 * 
 * - Strictly locked to physical right edge in both LTR (English) and RTL (Arabic)
 * - Isolated from document RTL mirroring (dir="ltr", direction: ltr, right: fixed)
 * - Perfectly straight vertical thin rail at normal state
 * - Smoothly curves inward toward the left (18–28px) on hover
 * - Magic Red (#C8102E) thumb follows the exact curved geometry
 * - Full drag, click-to-jump, wheel, and keyboard scrolling support
 * - Pure pointer-events isolation (header & content never blocked)
 * - Hidden on mobile (< 768px)
 * - Respects prefers-reduced-motion
 */

const TOTAL_HEIGHT = 390;
const THUMB_HEIGHT = 38;
const SVG_WIDTH = 44;
const STRAIGHT_X = 36;
const CURVE_CONTROL_X = 4; // Max curve inward ~21.5px toward the LEFT (from X=36 to X=14.5 at midpoint)

/**
 * Evaluates cubic bezier X coordinate at normalized parameter t (0 <= t <= 1)
 * Path: M 36 0 C 4 110, 4 280, 36 390
 */
function getCurvedX(t: number): number {
  const p0 = STRAIGHT_X;
  const p1 = CURVE_CONTROL_X;
  const p2 = CURVE_CONTROL_X;
  const p3 = STRAIGHT_X;
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

export const MagicScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartYRef = useRef<number>(0);
  const dragStartScrollYRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Update scroll progress based on vertical document scroll
  const updateScrollProgress = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = docHeight - windowHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = window.requestAnimationFrame(() => {
        updateScrollProgress();
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [updateScrollProgress]);

  // Click on track to jump to position
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const targetProgress = Math.min(1, Math.max(0, clickY / TOTAL_HEIGHT));
    
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = docHeight - windowHeight;
    
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: isReducedMotion ? 'auto' : 'smooth',
    });
  };

  // Drag thumb handler
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartYRef.current = e.clientY;
    dragStartScrollYRef.current = window.scrollY || window.pageYOffset || 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaY = e.clientY - dragStartYRef.current;
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = docHeight - windowHeight;
    
    const scrollFactor = maxScroll / (TOTAL_HEIGHT - THUMB_HEIGHT);
    const targetScrollY = Math.min(maxScroll, Math.max(0, dragStartScrollYRef.current + deltaY * scrollFactor));
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'auto',
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe release
      }
      setIsDragging(false);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = docHeight - windowHeight;
    const step = windowHeight * 0.4;

    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      window.scrollBy({ top: -step, behavior: isReducedMotion ? 'auto' : 'smooth' });
    } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      window.scrollBy({ top: step, behavior: isReducedMotion ? 'auto' : 'smooth' });
    } else if (e.key === 'Home') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: isReducedMotion ? 'auto' : 'smooth' });
    } else if (e.key === 'End') {
      e.preventDefault();
      window.scrollTo({ top: maxScroll, behavior: isReducedMotion ? 'auto' : 'smooth' });
    }
  };

  // Compute Thumb Coordinates
  const availableTrackHeight = TOTAL_HEIGHT - THUMB_HEIGHT;
  const thumbY = scrollProgress * availableTrackHeight;
  const normalizedThumbT = (thumbY + THUMB_HEIGHT / 2) / TOTAL_HEIGHT;
  
  // Calculate X based on hover curve or straight rail (strictly physical LTR coordinates)
  const targetThumbX = isHovered ? getCurvedX(normalizedThumbT) : STRAIGHT_X;

  // Path definitions for SVG rail morphing
  const straightPath = `M ${STRAIGHT_X} 0 L ${STRAIGHT_X} ${TOTAL_HEIGHT}`;
  const curvedPath = `M ${STRAIGHT_X} 0 C ${CURVE_CONTROL_X} 110, ${CURVE_CONTROL_X} 280, ${STRAIGHT_X} ${TOTAL_HEIGHT}`;
  const currentRailPath = isHovered && !isReducedMotion ? curvedPath : straightPath;

  return (
    <aside
      dir="ltr"
      aria-label="Page scroll position"
      className="hidden md:block fixed right-1.5 sm:right-2 lg:right-3 top-1/2 -translate-y-1/2 z-[90] pointer-events-none select-none"
      style={{
        height: `${TOTAL_HEIGHT}px`,
        width: `${SVG_WIDTH}px`,
        direction: 'ltr',
        left: 'auto',
        right: undefined, // Controlled by Tailwind right-* class and locked LTR
      }}
    >
      {/* INVISIBLE HOVER & INTERACTION ZONE */}
      <div
        ref={containerRef}
        dir="ltr"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          if (!isDragging) setIsHovered(false);
        }}
        onClick={handleTrackClick}
        className="w-full h-full relative pointer-events-auto cursor-pointer flex items-center justify-end"
        style={{ direction: 'ltr' }}
      >
        {/* SVG RAIL (STRAIGHT BY DEFAULT -> MORPHS TO GENTLE CURVE TOWARD LEFT ON HOVER) */}
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${TOTAL_HEIGHT}`}
          className="w-full h-full overflow-visible pointer-events-none"
          fill="none"
          aria-hidden="true"
          style={{ direction: 'ltr' }}
        >
          {/* Rail Track Line */}
          <path
            d={currentRailPath}
            stroke="#3C1518"
            strokeWidth="2"
            strokeOpacity={isHovered ? 0.35 : 0.22}
            strokeLinecap="round"
            style={{
              transition: isReducedMotion
                ? 'none'
                : 'd 400ms cubic-bezier(0.22, 1, 0.36, 1), stroke-opacity 400ms ease',
            }}
          />
        </svg>

        {/* CUSTOM MAGIC RED SCROLL THUMB */}
        <div
          role="scrollbar"
          dir="ltr"
          aria-valuenow={Math.round(scrollProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Scroll thumb"
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          className="absolute top-0 left-0 pointer-events-auto cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
          style={{
            width: '12px',
            height: `${THUMB_HEIGHT}px`,
            left: '0px',
            right: 'auto',
            direction: 'ltr',
            transform: `translate3d(${targetThumbX - 6}px, ${thumbY}px, 0)`,
            transition: isDragging
              ? 'none'
              : isReducedMotion
              ? 'none'
              : 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'transform',
          }}
        >
          {/* Pill / Capsule Visual */}
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`rounded-full transition-all duration-300 ${
                isHovered || isDragging
                  ? 'w-1.5 h-full bg-[#C8102E] shadow-[0_1px_8px_rgba(200,16,46,0.5)] ring-1 ring-white/70'
                  : 'w-1 h-full bg-[#C8102E] opacity-90 shadow-xs ring-1 ring-white/50'
              }`}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
