import { useState, useEffect } from 'react';

/**
 * Lightweight scroll inertia hook utilizing requestAnimationFrame.
 * Interpolates scroll position for silky parallax/transforms without replacing native scrolling.
 * Fully respects prefers-reduced-motion and touch device responsiveness.
 */
export function useSmoothScroll() {
  const [smoothY, setSmoothY] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion || typeof window === 'undefined') return;

    // On touch/mobile devices, use 1:1 direct native scroll for zero lag
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      const handleNative = () => setSmoothY(window.scrollY);
      window.addEventListener('scroll', handleNative, { passive: true });
      return () => window.removeEventListener('scroll', handleNative);
    }

    let current = window.scrollY;
    let target = window.scrollY;
    let rafId: number | null = null;
    let isRunning = false;

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) > 0.4) {
        current += diff * 0.085; // Subtle cinematic inertia
        setSmoothY(current);
        rafId = requestAnimationFrame(tick);
      } else {
        current = target;
        setSmoothY(current);
        isRunning = false;
        rafId = null;
      }
    };

    const handleScroll = () => {
      target = window.scrollY;
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  return { smoothY: isReducedMotion ? 0 : smoothY, isReducedMotion };
}
