import React, { useState, useEffect, useRef } from 'react';
import { Mail, Check } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';

export const HomeCommunity: React.FC = () => {
  const { isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
    }
  };

  // Very subtle vertical scroll parallax (8-10px max)
  const bgParallax = isReducedMotion ? 0 : (scrollProgress - 0.5) * 18;

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative w-full flex items-center justify-center py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-12 overflow-hidden select-none"
      aria-label={isRTL ? 'انضم إلى مجتمع مطبخ ماجيك' : 'Join The MAGIC Kitchen Community'}
    >
      {/* ========================================================================= */}
      {/* 1. EXISTING MAGIC KITCHEN FULL-BLEED PHOTOGRAPHIC BACKGROUND LAYER        */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <img
          src={MAGIC_ASSETS.kitchen}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{
            transform:
              isVisible || isReducedMotion
                ? `translate3d(0, ${bgParallax}px, 0) scale(1)`
                : `translate3d(0, ${bgParallax}px, 0) scale(1.04)`,
            transition: isReducedMotion
              ? 'none'
              : 'transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'transform',
          }}
          loading="lazy"
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. DEEP MAGIC RED OVERLAY (65–75%)                                         */}
      {/* ========================================================================= */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#C8102E]/72 pointer-events-none z-1"
      />

      {/* ========================================================================= */}
      {/* 3. SUBTLE DARK/WARM GRADIENT FOR TEXT READABILITY (10–20%)                 */}
      {/* ========================================================================= */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-2"
        style={{
          background:
            'radial-gradient(ellipse 80% 75% at 50% 50%, rgba(60, 21, 24, 0.40) 0%, rgba(60, 21, 24, 0.18) 60%, rgba(60, 21, 24, 0.45) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#3C1518]/25 to-transparent pointer-events-none z-2"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#3C1518]/30 to-transparent pointer-events-none z-2"
      />

      {/* ========================================================================= */}
      {/* 4. CENTERED NEWSLETTER CONTENT (Max width ~700px)                         */}
      {/* ========================================================================= */}
      <div
        style={{
          transform: isVisible || isReducedMotion ? 'translateY(0)' : 'translateY(20px)',
          opacity: isVisible || isReducedMotion ? 1 : 0,
          transition: isReducedMotion
            ? 'none'
            : 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="relative max-w-[700px] w-full mx-auto text-center z-10 px-4"
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4A843] mb-3">
          {isRTL ? 'نشرة ماجيك الموسمية للمحاصيل' : 'THE HARVEST DISPATCH'}
        </p>

        <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-2.5 drop-shadow-[0_2px_12px_rgba(60,21,24,0.30)]">
          {isRTL ? 'انضم إلى مجتمع مطبخ ماجيك.' : 'JOIN THE MAGIC KITCHEN.'}
        </h2>

        <p className="max-w-lg mx-auto text-sm sm:text-base text-white/95 leading-relaxed font-sans mb-6 drop-shadow-xs">
          {isRTL
            ? 'اشترك لتصلك أخبار المحاصيل الطازجة مباشرة من مزارع الهند، ووصفات الطهي المنزلي الأصيلة، وأولوية حجز الدفعات المحدودة في الإمارات.'
            : 'Subscribe for seasonal crop updates from Indian farmers, unhurried home cooking recipes, and early access to fresh micro-lots delivered in the UAE.'}
        </p>

        {subscribed ? (
          <div className="p-6 rounded-2xl bg-[#3C1518]/85 border border-white/30 max-w-md mx-auto animate-in fade-in duration-300 shadow-xl text-white">
            <div className="w-12 h-12 rounded-full bg-white text-[#C8102E] flex items-center justify-center mx-auto mb-3 shadow-md">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-1">
              {isRTL ? 'أهلاً بك في مطبخ ماجيك!' : 'Welcome to the Kitchen!'}
            </h3>
            <p className="text-xs text-white/85">
              {isRTL
                ? 'تفقّد بريدك الإلكتروني للحصول على دليل المحصول الترحيبي وأولى وصفاتنا الحصرية.'
                : 'Check your inbox for our seasonal harvest welcome guide and your first recipe dispatch.'}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <div className="relative w-full">
              <Mail className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3C1518]/50 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                aria-label={isRTL ? 'البريد الإلكتروني لنشرة ماجيك' : 'Email address for MAGIC harvest dispatch'}
                className="w-full h-12 sm:h-14 ps-11 pe-4 rounded-md bg-white text-[#3C1518] placeholder-[#3C1518]/50 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-white border border-white shadow-md text-start"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto h-12 sm:h-14 px-8 bg-[#3C1518] hover:bg-[#250D0F] text-[#FDF6EC] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md shadow-md transition-all shrink-0 cursor-pointer active:scale-[0.98]"
            >
              {isRTL ? 'اشترك الآن' : 'SUBSCRIBE'}
            </button>
          </form>
        )}

        <span className="block mt-4 text-[11px] text-white/80 font-mono">
          {isRTL
            ? 'بدون رسائل مزعجة. يمكنك إلغاء الاشتراك بنقرة واحدة في أي وقت.'
            : 'Zero spam. Unsubscribe anytime with a single click.'}
        </span>
      </div>
    </section>
  );
};
