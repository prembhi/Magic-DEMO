import React from 'react';
import { Calendar, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface SectionSubscribeSaveProps {
  onAddToCart?: (productId: string) => void;
  onNavigateShop?: () => void;
}

export const SectionSubscribeSave: React.FC<SectionSubscribeSaveProps> = ({
  onNavigateShop,
}) => {
  const { t, isRTL } = useLanguage();

  const handleCtaClick = () => {
    if (onNavigateShop) {
      onNavigateShop();
    } else if (typeof window !== 'undefined') {
      window.location.hash = '#shop';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      step: '01',
      title: t('subSave.benefit1.title', 'SHIPS EVERY 3 MONTHS'),
      desc: t(
        'subSave.benefit1.desc',
        'Freshly milled spices and heritage pulses dispatched on your cooking rhythm, keeping your pantry seamlessly stocked.'
      ),
      icon: <Calendar className="w-6 h-6 text-[#C8102E]" />,
    },
    {
      step: '02',
      title: t('subSave.benefit2.title', 'FREE DELIVERY'),
      desc: t(
        'subSave.benefit2.desc',
        'Complimentary direct delivery across Dubai, Abu Dhabi, and all Emirates on recurring subscription orders.'
      ),
      icon: <Truck className="w-6 h-6 text-[#C8102E]" />,
    },
    {
      step: '03',
      title: t('subSave.benefit3.title', 'EXCLUSIVE BENEFITS'),
      desc: t(
        'subSave.benefit3.desc',
        'Priority access to fresh regional harvest batches, seasonal culinary pairings, and dedicated pantry care.'
      ),
      icon: <Sparkles className="w-6 h-6 text-[#C8102E]" />,
    },
  ];

  return (
    <section
      id="subscription"
      className="relative w-full bg-[#FDF6EC] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#3C1518]/10 select-none overflow-hidden"
      aria-labelledby="subscribe-heading"
    >
      {/* Subtle radial warmth & botanical accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4A843]/8 blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
            <span className="w-4 h-[1.5px] bg-[#C8102E]" />
            <span>{t('subSave.kicker', 'Pantry Continuity Program')}</span>
            <span className="w-4 h-[1.5px] bg-[#C8102E]" />
          </div>

          <h2
            id="subscribe-heading"
            className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#3C1518] tracking-tight leading-tight"
          >
            {t('subSave.heading', 'SUBSCRIBE & SAVE')}
          </h2>
        </div>

        {/* 3 Editorial Benefit Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center">
          {benefits.map((b) => (
            <div
              key={b.step}
              className="flex flex-col items-center p-6 sm:p-7 rounded-xl bg-white/70 border border-[#3C1518]/8 shadow-xs hover:border-[#C8102E]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#3C1518]/10 shadow-xs flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105">
                {b.icon}
              </div>

              <span className="font-mono text-xs font-bold text-[#C8102E] tracking-widest uppercase mb-1">
                {b.step}
              </span>

              <h3 className="font-display font-bold text-base sm:text-lg text-[#3C1518] uppercase tracking-wide mb-2.5">
                {b.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#6B4226] leading-relaxed font-normal max-w-xs">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Centered Action Button */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <button
            type="button"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#C8102E] hover:bg-[#9C0A20] text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer min-h-[48px]"
          >
            <span>{t('subSave.cta', 'SUBSCRIBE & SAVE')}</span>
            <ArrowRight
              className={`w-4 h-4 text-[#D4A843] transition-transform ${
                isRTL ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
