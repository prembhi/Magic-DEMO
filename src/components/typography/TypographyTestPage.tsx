import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface TypographyTestPageProps {
  onNavigateHome: () => void;
}

interface TypographyOption {
  id: string;
  title: string;
  optionNumber: string;
  displayFont: string;
  displayFontFamily: string;
  bodyFont: string;
  bodyFontFamily: string;
  displayRecommendedWeights: string;
  bodyRecommendedWeights: string;
  description: string;
}

const TYPOGRAPHY_OPTIONS: TypographyOption[] = [
  {
    id: 'option-2',
    optionNumber: 'OPTION 02',
    title: 'Bold High-Contrast Contemporary (Benchmark Direction)',
    displayFont: 'Bricolage Grotesque',
    displayFontFamily: "'Bricolage Grotesque', sans-serif",
    bodyFont: 'Poppins',
    bodyFontFamily: "'Poppins', sans-serif",
    displayRecommendedWeights: 'Display: 800 ExtraBold / 700 Bold',
    bodyRecommendedWeights: 'Body / UI: 400 Regular / 500 Medium / 600 SemiBold',
    description: 'The benchmark pairing: High-personality grotesque display headlines with distinct ink-trap warmth and confident FMCG packaging punch, paired with clean, accessible Poppins body text.',
  },
  {
    id: 'option-3',
    optionNumber: 'OPTION 03',
    title: 'Expressive High-Contrast Grotesque & Modern UI',
    displayFont: 'Clash Grotesk',
    displayFontFamily: "'Clash Grotesk', sans-serif",
    bodyFont: 'Poppins',
    bodyFontFamily: "'Poppins', sans-serif",
    displayRecommendedWeights: 'Display: 700 Bold / 600 SemiBold',
    bodyRecommendedWeights: 'Body / UI: 400 Regular / 500 Medium / 600 SemiBold',
    description: 'Indian Type Foundry’s expressive display grotesque with dramatic stroke contrast and unexpected terminal flares, giving strong FMCG shelf presence balanced by balanced Poppins body text.',
  },
  {
    id: 'option-4',
    optionNumber: 'OPTION 04',
    title: 'Eccentric Artisanal Grotesk & Clean UI',
    displayFont: 'Cabinet Grotesk',
    displayFontFamily: "'Cabinet Grotesk', sans-serif",
    bodyFont: 'Poppins',
    bodyFontFamily: "'Poppins', sans-serif",
    displayRecommendedWeights: 'Display: 800 ExtraBold / 700 Bold',
    bodyRecommendedWeights: 'Body / UI: 400 Regular / 500 Medium / 600 SemiBold',
    description: 'Quirky, slightly condensed display grotesk with distinct 19th-century poster quirks and heavy ink personality, paired with crisp Poppins UI text.',
  },
  {
    id: 'option-5',
    optionNumber: 'OPTION 05',
    title: 'Confident Modernist French Grotesque & Geometric Sans',
    displayFont: 'General Sans',
    displayFontFamily: "'General Sans', sans-serif",
    bodyFont: 'Poppins',
    bodyFontFamily: "'Poppins', sans-serif",
    displayRecommendedWeights: 'Display: 700 Bold / 600 SemiBold',
    bodyRecommendedWeights: 'Body / UI: 400 Regular / 500 Medium / 600 SemiBold',
    description: 'Sturdy, balanced grotesque rooted in mid-century French design with clean optical weights and subtle organic warmth, grounded by Poppins body prose.',
  },
  {
    id: 'option-6',
    optionNumber: 'OPTION 06',
    title: 'Contemporary Humanist Grotesque & Geometric Body',
    displayFont: 'Host Grotesk',
    displayFontFamily: "'Host Grotesk', sans-serif",
    bodyFont: 'Poppins',
    bodyFontFamily: "'Poppins', sans-serif",
    displayRecommendedWeights: 'Display: 800 ExtraBold / 700 Bold',
    bodyRecommendedWeights: 'Body / UI: 400 Regular / 500 Medium / 600 SemiBold',
    description: 'A fresh neo-grotesque featuring subtle humanist curving and deep ink-wells that evoke tactile print craftsmanship, paired with readable Poppins.',
  },
  {
    id: 'option-7',
    optionNumber: 'OPTION 07',
    title: 'Geometric Low-Contrast Display & Clarity Body',
    displayFont: 'Urbanist',
    displayFontFamily: "'Urbanist', sans-serif",
    bodyFont: 'Poppins',
    bodyFontFamily: "'Poppins', sans-serif",
    displayRecommendedWeights: 'Display: 800 ExtraBold / 700 Bold',
    bodyRecommendedWeights: 'Body / UI: 400 Regular / 500 Medium / 600 SemiBold',
    description: 'Clean geometric architecture inspired by mid-century modernism and transit signs, providing high-clarity FMCG headline punch with clear Poppins UI body.',
  },
  {
    id: 'option-8',
    optionNumber: 'OPTION 08',
    title: 'Warm Nordic Modernist & Contemporary Sans',
    displayFont: 'Albert Sans',
    displayFontFamily: "'Albert Sans', sans-serif",
    bodyFont: 'Poppins',
    bodyFontFamily: "'Poppins', sans-serif",
    displayRecommendedWeights: 'Display: 800 ExtraBold / 700 Bold',
    bodyRecommendedWeights: 'Body / UI: 400 Regular / 500 Medium / 600 SemiBold',
    description: 'Modern geometric sans inspired by Scandinavian packaging and posters with generous apertures and a friendly, confident tone, paired with Poppins.',
  },
  {
    id: 'option-9',
    optionNumber: 'OPTION 09',
    title: 'Swiss-Engineered Precision & Modern Balance',
    displayFont: 'Geist',
    displayFontFamily: "'Geist', sans-serif",
    bodyFont: 'Poppins',
    bodyFontFamily: "'Poppins', sans-serif",
    displayRecommendedWeights: 'Display: 800 ExtraBold / 700 Bold',
    bodyRecommendedWeights: 'Body / UI: 400 Regular / 500 Medium / 600 SemiBold',
    description: 'Ultra-refined Swiss neo-grotesque with uncompromising geometric discipline and immaculate legibility, creating strong structural contrast against friendly Poppins.',
  },
  {
    id: 'option-10',
    optionNumber: 'OPTION 10',
    title: 'Open Compact Grotesque & Geometric Clarity',
    displayFont: 'Onest',
    displayFontFamily: "'Onest', sans-serif",
    bodyFont: 'Poppins',
    bodyFontFamily: "'Poppins', sans-serif",
    displayRecommendedWeights: 'Display: 800 ExtraBold / 700 Bold',
    bodyRecommendedWeights: 'Body / UI: 400 Regular / 500 Medium / 600 SemiBold',
    description: 'Neutral yet expressive contemporary grotesque with open counters and robust stroke weight, designed for packaging legibility and paired with Poppins text.',
  },
];

export const TypographyTestPage: React.FC<TypographyTestPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    document.title = 'Typography Comparison Test | MAGIC UAE';
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FDF6EC] text-[#3C1518] antialiased">
      {/* Dynamic Font Loaders: Google Fonts & Fontshare for verified high-fidelity rendering */}
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:ital,wght@0,400..900;1,400..900&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Geist:wght@400..900&family=Host+Grotesk:wght@400..800&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Onest:wght@400..900&family=Poppins:wght@400;500;600&family=Urbanist:ital,wght@0,400..900;1,400..900&display=swap');
        
        .arabic-fallback {
          font-family: 'Noto Sans Arabic', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      {/* STICKY CONTROL & NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#FDF6EC]/95 backdrop-blur-sm border-b border-[#3C1518]/15 px-4 sm:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-sans font-medium font-bold uppercase tracking-wider text-[#3C1518] hover:text-[#C8102E] transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Site</span>
          </button>
          <span className="text-[#3C1518]/30">|</span>
          <h1 className="font-sans font-medium text-xs font-bold uppercase tracking-widest text-[#C8102E]">
            MAGIC Typography Lab (Bricolage Alternatives)
          </h1>
        </div>

        {/* Anchor Jump Links (Scrollable Pills) */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] font-sans font-medium overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {TYPOGRAPHY_OPTIONS.map((opt) => (
            <a
              key={opt.id}
              href={`#${opt.id}`}
              className="px-2 py-1 whitespace-nowrap rounded bg-white border border-[#3C1518]/15 hover:border-[#C8102E] hover:text-[#C8102E] text-[#3C1518] font-bold transition-all shadow-2xs"
            >
              {opt.optionNumber.replace('OPTION ', 'Opt ')}: {opt.displayFont}
            </a>
          ))}
        </nav>
      </header>

      {/* LAB INTRO HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-8 border-b border-[#3C1518]/15">
        <div className="max-w-3xl">
          <span className="text-xs font-sans font-medium font-bold uppercase tracking-widest text-[#C8102E] block mb-2">
            Typography Comparison Suite
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#3C1518] leading-[1.0] mb-4">
            Bold Contemporary Grotesque Alternatives
          </h2>
          <p className="text-base text-[#3C1518]/80 leading-relaxed font-sans">
            Evaluating contemporary Grotesque display typefaces sharing the bold, unconventional, human, and premium FMCG character of Bricolage Grotesque, all paired with Poppins body text.
          </p>
        </div>
      </section>

      {/* MAIN TEST SUITE: 9 COMPLETE FULL-WIDTH SECTIONS */}
      <main className="divide-y divide-[#3C1518]/20">
        {TYPOGRAPHY_OPTIONS.map((opt, index) => (
          <article
            key={opt.id}
            id={opt.id}
            className={`w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 ${
              index % 2 === 1 ? 'bg-[#FAF5EE]' : 'bg-[#FDF6EC]'
            }`}
          >
            <div className="max-w-7xl mx-auto">
              {/* OPTION HEADER / SPECIFICATION BADGE */}
              <div className="border-b-2 border-[#3C1518]/20 pb-6 mb-10 sm:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-1 bg-[#C8102E] text-white text-xs font-sans font-medium font-bold uppercase tracking-wider rounded">
                      {opt.optionNumber}
                    </span>
                    <span className="text-xs font-sans font-medium uppercase text-[#3C1518]/70 font-semibold tracking-wider">
                      {opt.title}
                    </span>
                  </div>
                  <h3
                    style={{ fontFamily: opt.displayFontFamily }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3C1518] tracking-tight"
                  >
                    {opt.displayFont} <span className="font-normal text-[#3C1518]/60">&amp;</span> {opt.bodyFont}
                  </h3>
                  <p className="text-sm text-[#3C1518]/80 max-w-2xl mt-2 font-sans">
                    {opt.description}
                  </p>
                </div>

                {/* Technical Specifications Callout */}
                <div className="bg-white border border-[#3C1518]/15 rounded-lg p-4 font-sans font-medium text-xs text-[#3C1518]/80 space-y-1 shrink-0 lg:max-w-md">
                  <div className="font-bold text-[#3C1518] uppercase text-[11px] mb-1">Font Stack Specs:</div>
                  <div><span className="text-[#C8102E] font-bold">Display:</span> {opt.displayFont} — {opt.displayRecommendedWeights}</div>
                  <div><span className="text-[#5A7247] font-bold">Body/UI:</span> {opt.bodyFont} — {opt.bodyRecommendedWeights}</div>
                </div>
              </div>

              {/* 11 REQUIRED TYPOGRAPHY TOUCHPOINTS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
                
                {/* LEFT COLUMN: HERO HEADINGS & EDITORIAL STORY (7 Cols) */}
                <div className="lg:col-span-7 space-y-8">
                  {/* 1. Eyebrow */}
                  <div>
                    <span className="text-[10px] font-sans font-medium uppercase text-[#3C1518]/50 block mb-1">
                      1. Eyebrow
                    </span>
                    <p
                      style={{ fontFamily: opt.bodyFontFamily }}
                      className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#C8102E]"
                    >
                      KITCHEN FAVOURITES
                    </p>
                  </div>

                  {/* 2. Main heading */}
                  <div>
                    <span className="text-[10px] font-sans font-medium uppercase text-[#3C1518]/50 block mb-1">
                      2. Main Heading (Display 700 / 800)
                    </span>
                    <h2
                      style={{ fontFamily: opt.displayFontFamily }}
                      className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#3C1518] tracking-tight leading-[0.95]"
                    >
                      PURE INDIAN SPICES.
                      <br />
                      <span className="text-[#C8102E]">FARM SOURCED.</span>
                    </h2>
                  </div>

                  {/* 3. Secondary heading */}
                  <div>
                    <span className="text-[10px] font-sans font-medium uppercase text-[#3C1518]/50 block mb-1">
                      3. Secondary Heading
                    </span>
                    <h3
                      style={{ fontFamily: opt.displayFontFamily }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3C1518] italic tracking-tight"
                    >
                      Magic in every pinch.
                    </h3>
                  </div>

                  {/* 4. Body copy */}
                  <div>
                    <span className="text-[10px] font-sans font-medium uppercase text-[#3C1518]/50 block mb-1">
                      4. Body Copy (Font size 16px / 18px — Leading Relaxed)
                    </span>
                    <p
                      style={{ fontFamily: opt.bodyFontFamily }}
                      className="text-base sm:text-lg text-[#3C1518]/85 leading-relaxed max-w-xl"
                    >
                      From generational Indian farms to your everyday kitchen, MAGIC brings authentic spices and pantry essentials closer to home.
                    </p>
                  </div>

                  {/* 5. Section heading */}
                  <div className="pt-4 border-t border-[#3C1518]/15">
                    <span className="text-[10px] font-sans font-medium uppercase text-[#3C1518]/50 block mb-1">
                      5. Section Heading
                    </span>
                    <h4
                      style={{ fontFamily: opt.displayFontFamily }}
                      className="text-3xl sm:text-4xl font-extrabold text-[#3C1518] tracking-tight"
                    >
                      COOK SOMETHING MAGIC.
                    </h4>
                  </div>
                </div>

                {/* RIGHT COLUMN: PRODUCT CARD, UI CONTROLS, NAV & ARABIC (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* 9. Navigation sample */}
                  <div className="bg-white border border-[#3C1518]/15 rounded-xl p-5">
                    <span className="text-[10px] font-sans font-medium uppercase text-[#3C1518]/50 block mb-2">
                      9. Navigation Sample (Menu Bar UI)
                    </span>
                    <nav
                      style={{ fontFamily: opt.bodyFontFamily }}
                      className="flex items-center justify-between text-xs sm:text-sm font-bold uppercase tracking-wider text-[#3C1518] pt-1"
                    >
                      <span className="hover:text-[#C8102E] cursor-pointer">SHOP</span>
                      <span className="hover:text-[#C8102E] cursor-pointer">RECIPES</span>
                      <span className="hover:text-[#C8102E] cursor-pointer">OUR STORY</span>
                      <span className="hover:text-[#C8102E] cursor-pointer">ABOUT</span>
                    </nav>
                  </div>

                  {/* PRODUCT COMMERCE TOUCHPOINT (6, 7, 8, 11) */}
                  <div className="bg-white border border-[#3C1518]/15 rounded-xl p-6 shadow-xs space-y-4">
                    <span className="text-[10px] font-sans font-medium uppercase text-[#3C1518]/50 block">
                      Product Merchandising Unit
                    </span>

                    {/* 11. Small metadata */}
                    <div>
                      <span className="text-[10px] font-sans font-medium uppercase text-[#3C1518]/50 block mb-0.5">
                        11. Small Metadata
                      </span>
                      <p
                        style={{ fontFamily: opt.bodyFontFamily }}
                        className="text-[11px] font-sans font-medium uppercase font-bold tracking-widest text-[#5A7247]"
                      >
                        TOOR DAL · 1 KG
                      </p>
                    </div>

                    {/* 6. Product name */}
                    <div>
                      <span className="text-[10px] font-sans font-medium uppercase text-[#3C1518]/50 block mb-0.5">
                        6. Product Name
                      </span>
                      <h5
                        style={{ fontFamily: opt.displayFontFamily }}
                        className="text-2xl sm:text-3xl font-black text-[#3C1518] tracking-tight leading-tight"
                      >
                        Premium Toor Dal
                      </h5>
                    </div>

                    {/* 7. Price */}
                    <div>
                      <span className="text-[10px] font-sans font-medium uppercase text-[#3C1518]/50 block mb-0.5">
                        7. Price Display
                      </span>
                      <p
                        style={{ fontFamily: opt.bodyFontFamily }}
                        className="text-xl sm:text-2xl font-black font-sans font-medium text-[#C8102E]"
                      >
                        AED 14.50
                      </p>
                    </div>

                    {/* 8. Button */}
                    <div className="pt-2">
                      <span className="text-[10px] font-sans font-medium uppercase text-[#3C1518]/50 block mb-1">
                        8. Interactive Button (UI CTA)
                      </span>
                      <button
                        type="button"
                        style={{ fontFamily: opt.bodyFontFamily }}
                        className="w-full h-12 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>ADD TO CART</span>
                      </button>
                    </div>
                  </div>

                  {/* 10. Arabic sample */}
                  <div className="bg-white border border-[#3C1518]/15 rounded-xl p-5" dir="rtl">
                    <span className="text-[10px] font-sans font-medium uppercase text-[#3C1518]/50 block mb-1 text-left" dir="ltr">
                      10. Arabic Sample (Fallback verification)
                    </span>
                    <p className="arabic-fallback text-lg sm:text-2xl font-bold text-[#3C1518] leading-relaxed">
                      نكهة هندية أصيلة في كل رشة
                    </p>
                    <span className="text-[10px] font-sans font-medium text-[#3C1518]/60 block mt-1 text-left" dir="ltr">
                      Renders in Noto Sans Arabic without conflicting with Latin test stack.
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* FOOTER NOTE */}
      <footer className="w-full bg-[#3C1518] text-[#FDF6EC] py-10 px-4 sm:px-8 border-t border-[#3C1518]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans font-medium">
          <p className="text-[#FDF6EC]/70">
            MAGIC Typography Evaluation Environment · Bricolage Grotesque Alternatives
          </p>
          <button
            type="button"
            onClick={onNavigateHome}
            className="px-4 py-2 bg-[#C8102E] hover:bg-[#A60D26] text-white font-bold uppercase tracking-wider rounded transition-colors"
          >
            Return to Main Site
          </button>
        </div>
      </footer>
    </div>
  );
};

