import React, { useState } from 'react';
import { Calendar, Repeat, Sparkles, Check, ArrowRight } from 'lucide-react';
import toorImg from '../assets/images/toor_clean.png';
import haldiImg from '../assets/images/haldi_clean.png';
import jeeraImg from '../assets/images/jeera_clean.png';
import masoorImg from '../assets/images/masoordal_clean.png';

interface SectionSubscribeSaveProps {
  onAddToCart?: (productId: string) => void;
}

export const SectionSubscribeSave: React.FC<SectionSubscribeSaveProps> = ({
  onAddToCart,
}) => {
  const [selectedCadence, setSelectedCadence] = useState<'30' | '60' | '90'>('30');

  const steps = [
    {
      step: '01',
      title: 'Choose Your Spices',
      arabic: 'اختر توابلك وبقولك',
      desc: 'Select your preferred dal varieties and ground spice pantry essentials.',
      icon: <Sparkles className="w-5 h-5 text-[#D4A843]" />,
    },
    {
      step: '02',
      title: 'Set Your Cadence',
      arabic: 'حدد وتيرة التوصيل',
      desc: 'Deliveries scheduled every 30, 60, or 90 days directly to your door.',
      icon: <Calendar className="w-5 h-5 text-[#C8102E]" />,
    },
    {
      step: '03',
      title: 'Save on Every Order',
      arabic: 'وفر مع كل طلب دوري',
      desc: 'Guaranteed pantry continuity with recurring subscriber priority privileges.',
      icon: <Repeat className="w-5 h-5 text-[#D4A843]" />,
    },
  ];

  return (
    <section
      id="subscription"
      className="relative w-full bg-[#FDF6EC] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#3C1518]/10 select-none overflow-hidden"
      aria-labelledby="subscribe-heading"
    >
      {/* Background radial warmth */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#C8102E]/8 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT 6 COLS: EDITORIAL SUBSCRIPTION NARRATIVE & STEPS */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-2">
              <span className="w-5 h-[1.5px] bg-[#C8102E]" />
              <span>Pantry Continuity Program</span>
              <span className="text-[#3C1518]/30">·</span>
              <span className="font-arabic font-normal text-xs text-[#3C1518]/80">الاشتراك والتوفير</span>
            </div>

            <h2
              id="subscribe-heading"
              className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#3C1518] tracking-tight leading-none mb-4"
            >
              NEVER RUN OUT OF MAGIC
            </h2>

            <p className="text-sm sm:text-base text-[#6B4226] leading-relaxed font-normal mb-8 max-w-lg">
              Freshly milled spices and heritage pulses dispatched on your family's cooking schedule. Experience the uninterrupted rhythm of authentic homemade meals.
            </p>

            {/* 3-Step Sequence */}
            <div className="flex flex-col gap-4 mb-8">
              {steps.map((st) => (
                <div
                  key={st.step}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/80 border border-[#3C1518]/10 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#3C1518]/5 border border-[#3C1518]/10 flex items-center justify-center shrink-0">
                    {st.icon}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#C8102E]">
                        {st.step}
                      </span>
                      <span className="font-display font-bold text-base text-[#3C1518]">
                        {st.title}
                      </span>
                      <span className="font-arabic text-xs text-[#6B4226]">
                        {st.arabic}
                      </span>
                    </div>
                    <span className="text-xs text-[#6B4226] font-normal mt-0.5">
                      {st.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Frequency Selector & CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Cadence Pills */}
              <div className="inline-flex rounded-lg bg-white border border-[#3C1518]/15 p-1">
                {(['30', '60', '90'] as const).map((days) => (
                  <button
                    key={days}
                    onClick={() => setSelectedCadence(days)}
                    className={`px-4 py-2 rounded-md font-mono text-xs font-bold transition-colors cursor-pointer min-h-[44px] ${
                      selectedCadence === days
                        ? 'bg-[#3C1518] text-[#FDF6EC] shadow-xs'
                        : 'text-[#3C1518]/70 hover:text-[#C8102E]'
                    }`}
                  >
                    Every {days} Days
                  </button>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (onAddToCart) onAddToCart('Subscription Pantry Box');
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C8102E] hover:bg-[#9C0A20] text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer min-h-[44px]"
              >
                <span>SUBSCRIBE & SAVE</span>
                <ArrowRight className="w-4 h-4 text-[#D4A843]" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#6B4226]">
              <Check className="w-4 h-4 text-[#C8102E]" />
              <span>Pause, adjust frequency, or cancel at any time with zero hassle.</span>
            </div>
          </div>

          {/* RIGHT 6 COLS: THE RECURRING PHYSICAL PRODUCT STACK */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[420px] h-[380px] sm:h-[440px] flex items-center justify-center">
              {/* Concentric Gold Radiance */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="160" stroke="#D4A843" strokeWidth="1" strokeDasharray="3 4" opacity="0.3" fill="none" />
                <circle cx="200" cy="200" r="120" stroke="#C8102E" strokeWidth="1.2" opacity="0.25" fill="none" />
              </svg>

              {/* Ground Shadow */}
              <div
                className="absolute bottom-4 inset-x-12 h-10 rounded-full blur-md pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.45) 0%, transparent 70%)',
                }}
              />

              {/* Physical Overlapping Authentic Product Stack */}
              {/* Back Layer: Masoor Dal */}
              <div
                className="absolute transition-transform duration-700 ease-out"
                style={{
                  transform: 'translateX(-65px) translateY(-15px) rotate(-8deg) scale(0.88)',
                  zIndex: 10,
                }}
              >
                <div className="w-[180px] sm:w-[210px] aspect-[1/1.42] flex items-center justify-center">
                  <img
                    src={masoorImg}
                    alt="Masoor Dal in subscription stack"
                    className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Center Anchor: Toor Dal */}
              <div
                className="absolute transition-transform duration-700 ease-out"
                style={{
                  transform: 'translateX(0px) translateY(-25px) rotate(0deg) scale(1.05)',
                  zIndex: 20,
                }}
              >
                <div className="w-[190px] sm:w-[220px] aspect-[1/1.42] flex items-center justify-center">
                  <img
                    src={toorImg}
                    alt="Toor Dal in subscription stack"
                    className="w-full h-full object-contain pointer-events-none select-none drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Front Right: Haldi Powder */}
              <div
                className="absolute transition-transform duration-700 ease-out"
                style={{
                  transform: 'translateX(65px) translateY(20px) rotate(7deg) scale(0.85)',
                  zIndex: 30,
                }}
              >
                <div className="w-[160px] sm:w-[190px] aspect-[1/1.42] flex items-center justify-center">
                  <img
                    src={haldiImg}
                    alt="Haldi in subscription stack"
                    className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Front Left: Jeera Seeds */}
              <div
                className="absolute transition-transform duration-700 ease-out"
                style={{
                  transform: 'translateX(-30px) translateY(45px) rotate(-4deg) scale(0.82)',
                  zIndex: 40,
                }}
              >
                <div className="w-[150px] sm:w-[180px] aspect-[1/1.42] flex items-center justify-center">
                  <img
                    src={jeeraImg}
                    alt="Jeera in subscription stack"
                    className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Floating Benefit Callout Badge */}
              <div className="absolute top-4 right-0 z-50 bg-[#C8102E] text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg border border-[#D4A843]/50 flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" />
                <span>SAVE ON EVERY ORDER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
