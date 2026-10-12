import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { generateLargeSpiceComposition, LargeSpiceItem } from './largeSpiceData';
import './SpiceLoader.css';

interface SpiceLoadingScreenProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const STORAGE_KEY = 'magic_intro_seen_v1';

export const SpiceLoadingScreen: React.FC<SpiceLoadingScreenProps> = ({
  onComplete,
  forceShow = false,
}) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (forceShow) return true;
    if (typeof window === 'undefined') return false;
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
      }
      return sessionStorage.getItem(STORAGE_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  // Animation phase:
  // 'falling': spices dropping & accumulating
  // 'curtainIn': red curtain sweeps up to cover full screen
  // 'curtainHold': screen is 100% red, middle spice scene is hidden/unmounted
  // 'curtainExit': red curtain sweeps upward revealing the live website directly underneath
  // 'done': component unmounted
  const [phase, setPhase] = useState<'falling' | 'curtainIn' | 'curtainHold' | 'curtainExit' | 'done'>('falling');
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  // Percentage counter progression: 0% -> 35% -> 65% -> 90% -> 100%
  const [percent, setPercent] = useState<number>(0);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const spiceItems: LargeSpiceItem[] = useMemo(() => {
    return generateLargeSpiceComposition(isMobile);
  }, [isMobile]);

  const handleFinish = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {}
    setIsVisible(false);
    setPhase('done');
    document.body.style.overflow = '';
    document.body.style.position = '';
    if (onComplete) onComplete();
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    handleFinish();
  }, [handleFinish]);

  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, handleSkip]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Master Choreography & Counter Progression:
  // t = 0.0s: 0% (Clean ivory canvas with logo + counter)
  // t = 0.5s: 35% (First 2-3 large spices enter)
  // t = 1.1s: 65% (Mid cascade fills middle & sides)
  // t = 1.7s: 90% (Upper and ceiling pieces arrive)
  // t = 2.2s: 100% (Dense full-screen accumulation complete)
  // t = 2.30s: Full Red Curtain sweeps up from bottom (takes 0.55s, reaches 100% full coverage at 2.85s)
  // t = 2.85s: curtainHold: Spices, ivory background, and counter are permanently removed/hidden.
  // t = 3.00s: curtainExit: Red Curtain smoothly sweeps up out of viewport (0.8s, cubic-bezier(0.76, 0, 0.24, 1)).
  //            Live website directly underneath is progressively revealed.
  // curtainExit animationend -> handleFinish()
  useEffect(() => {
    if (!isVisible) return;

    if (prefersReducedMotion) {
      const quickTimer = setTimeout(() => {
        handleFinish();
      }, 80);
      return () => clearTimeout(quickTimer);
    }

    // Counter timers
    const p1 = setTimeout(() => setPercent(35), 500);
    const p2 = setTimeout(() => setPercent(65), 1100);
    const p3 = setTimeout(() => setPercent(90), 1700);
    const p4 = setTimeout(() => setPercent(100), 2200);

    // Curtain In: sweeps up over spice composition
    const curtainInTimer = setTimeout(() => {
      setPhase('curtainIn');
    }, 2300);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(p4);
      clearTimeout(curtainInTimer);
    };
  }, [isVisible, prefersReducedMotion, handleFinish]);

  // Transition from curtainIn -> curtainHold -> curtainExit
  const handleCurtainInEnd = useCallback(() => {
    if (phase === 'curtainIn') {
      // Step 3: Screen is 100% covered by red curtain.
      // Set to 'curtainHold' which removes the middle spice scene and ivory container immediately!
      setPhase('curtainHold');
      // Hold for a confident, editorial moment (150ms) then start the smooth curtain exit
      setTimeout(() => {
        setPhase('curtainExit');
      }, 150);
    }
  }, [phase]);

  const handleCurtainExitEnd = useCallback(() => {
    if (phase === 'curtainExit') {
      handleFinish();
    }
  }, [phase, handleFinish]);

  if (!isVisible) {
    return null;
  }

  // Once curtain reaches 100% coverage (curtainHold or curtainExit), the spice scene is permanently hidden!
  const showSpiceScene = phase === 'falling' || phase === 'curtainIn';
  const showCurtain = phase === 'curtainIn' || phase === 'curtainHold' || phase === 'curtainExit';

  return (
    <>
      {/* 1. MIDDLE LAYER: SPICE SCENE & IVORY CANVAS (z-index: 99990)
          Mounted only during 'falling' and 'curtainIn'.
          When curtain is 100% covering screen ('curtainHold' & 'curtainExit'),
          this layer is COMPLETELY REMOVED from DOM, guaranteeing spices NEVER reappear! */}
      {showSpiceScene && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="MAGIC Loading Experience"
          className="fixed inset-0 z-[99990] overflow-hidden select-none bg-[#FDF6EC]"
        >
          {/* Logo at top + Restrained Counter at Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-between p-6 sm:p-10 pointer-events-none z-0">
            {/* Top authentic MAGIC Logo */}
            <div className="pt-2 sm:pt-4">
              <img
                src={MAGIC_ASSETS.logo}
                alt="MAGIC"
                className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-xs"
              />
            </div>

            {/* Center Prominent Bricolage Grotesque Counter */}
            <div
              className="text-center my-auto transition-opacity duration-500 ease-in-out"
              style={{ opacity: phase === 'curtainIn' ? 0 : 1 }}
            >
              <div className="font-display font-extrabold text-7xl sm:text-8xl md:text-9xl text-[#3C1518] tracking-tighter leading-none select-none">
                {percent}
                <span className="text-[#C8102E] text-4xl sm:text-5xl md:text-6xl font-bold ml-1">%</span>
              </div>
              <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#3C1518]/60 uppercase mt-3">
                SOURCING PURE HARVEST
              </p>
            </div>

            {/* Bottom subtle accent line */}
            <div className="pb-3 text-center opacity-30">
              <span className="inline-block w-8 h-1 bg-[#D4A843] rounded-full" />
            </div>
          </div>

          {/* LARGE ART-DIRECTED CUT-PAPER SPICES */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            {spiceItems.map((item) => (
              <div
                key={item.id}
                className="absolute animate-large-spice-fall"
                style={{
                  top: 0,
                  left: 0,
                  width: `${item.widthPx}px`,
                  height: `${item.heightPx}px`,
                  zIndex: item.zIndex,
                  ['--start-x' as string]: `${item.startXPercent}vw`,
                  ['--target-x' as string]: `calc(${item.targetXPercent}vw - ${item.widthPx / 2}px)`,
                  ['--target-y' as string]: `calc(${item.targetYPercent}vh - ${item.heightPx / 2}px)`,
                  ['--init-deg' as string]: `${item.initialRotateDeg}deg`,
                  ['--target-deg' as string]: `${item.targetRotateDeg}deg`,
                  animationDuration: `${item.fallDurationSec}s`,
                  animationDelay: `${item.fallDelaySec}s`,
                }}
              >
                <img
                  src={item.imgSrc}
                  alt=""
                  className="w-full h-full object-contain filter drop-shadow-[0_6px_14px_rgba(60,21,24,0.18)]"
                  loading="eager"
                  decoding="sync"
                />
              </div>
            ))}
          </div>

          {/* ACCESSIBLE SKIP BUTTON (Active during falling phase) */}
          <button
            type="button"
            onClick={handleSkip}
            aria-label="Skip introduction animation"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[99995] px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[#3C1518]/20 text-[#3C1518] text-xs font-body font-semibold uppercase tracking-wider shadow-sm transition-all duration-200 cursor-pointer backdrop-blur-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          >
            Skip (Esc)
          </button>
        </div>
      )}

      {/* 2. FRONT LAYER: SOLID BRAND-RED (#C8102E) FULL-VIEWPORT CURTAIN (z-index: 99999)
          Separated from the spice scene so it exists independently.
          Directly behind this curtain is the live website!
          During curtainExit, as the curtain sweeps upward, only the live website is revealed. */}
      {showCurtain && (
        <div
          className={`fixed inset-0 z-[99999] pointer-events-none flex flex-col items-center justify-center bg-[#C8102E] text-[#FDF6EC] magic-curtain ${
            phase === 'curtainIn'
              ? 'animate-magic-curtain-in'
              : phase === 'curtainExit'
              ? 'animate-magic-curtain-exit'
              : ''
          }`}
          onAnimationEnd={() => {
            if (phase === 'curtainIn') {
              handleCurtainInEnd();
            } else if (phase === 'curtainExit') {
              handleCurtainExitEnd();
            }
          }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-display font-extrabold text-5xl sm:text-7xl tracking-wider text-white">
              MAGIC
            </span>
            <span className="font-body text-xs sm:text-sm uppercase tracking-[0.32em] text-[#D4A843] font-semibold">
              PURE INDIAN SPICES & PULSES
            </span>
          </div>
        </div>
      )}
    </>
  );
};
