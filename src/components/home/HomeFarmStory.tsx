import React, { useState } from 'react';
import { Sprout, Sun, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

interface HomeFarmStoryProps {
  onNavigateImpact: () => void;
}

export const HomeFarmStory: React.FC<HomeFarmStoryProps> = ({ onNavigateImpact }) => {
  const { t, isRTL } = useLanguage();
  const { ref: headingRef, isRevealed: headingRevealed } = useScrollReveal<HTMLHeadingElement>();
  const { smoothY, isReducedMotion } = useSmoothScroll();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'THE FARM & SOIL',
      sub: 'Single-Origin Heritage Terroirs',
      desc: 'Direct partnerships with generational farming clusters across Karnataka, Gujarat and Tamil Nadu. Heritage crops grown in mineral-rich, unadulterated black soils.',
      icon: Sprout,
      envImage: MAGIC_ASSETS.farmHero,
      envAlt: 'Cinematic view of generational Indian farm fields under natural sunlight',
      secondaryTexture: MAGIC_ASSETS.soilRoots,
      asset: MAGIC_ASSETS.toor,
      caption: 'Toor Dal · Gulbarga Heritage Soil',
      originTag: 'GULBARGA, KARNATAKA',
      color: '#D4A843',
    },
    {
      num: '02',
      title: 'THE HARVEST',
      sub: 'Open-Air Sun Curing',
      desc: 'Whole crops naturally sun-cured across open-air village courtyards, protecting delicate aromatic essential oils without aggressive artificial kilns.',
      icon: Sun,
      envImage: MAGIC_ASSETS.harvest,
      envAlt: 'Sun-drenched agricultural harvest landscape with farmers hand-curing crops',
      secondaryTexture: MAGIC_ASSETS.cropDetail,
      asset: MAGIC_ASSETS.jeera,
      caption: 'Whole Cumin · Unjha Sun Curing',
      originTag: 'UNJHA, GUJARAT',
      color: '#E8922F',
    },
    {
      num: '03',
      title: 'THE CRAFT',
      sub: 'Triple Optical Laser Sorting',
      desc: 'Precision optical-laser inspection separates every grain without synthetic polishes, talc powders, or chemical coloring agents. What you see is pure unadulterated grain.',
      icon: ShieldCheck,
      envImage: MAGIC_ASSETS.spiceCourtyard,
      envAlt: 'Traditional spice courtyard with natural aeration and artisanal sorting',
      secondaryTexture: null,
      asset: MAGIC_ASSETS.haldi,
      caption: 'Golden Turmeric · High Curcumin',
      originTag: 'SALEM, TAMIL NADU',
      color: '#F5C342',
    },
    {
      num: '04',
      title: 'YOUR KITCHEN',
      sub: 'Pure Everyday Cooking',
      desc: 'Arriving fresh in the UAE ready for daily comforting tadka dals, nourishing khichdis, and aromatic weekend curries that taste like home.',
      icon: HeartHandshake,
      envImage: MAGIC_ASSETS.kitchen,
      envAlt: 'Warm, luminous home kitchen preparing traditional Indian pulse dishes',
      secondaryTexture: null,
      asset: MAGIC_ASSETS.masoor,
      caption: 'Masoor Dal · UAE Kitchen Comfort',
      originTag: 'DIRECT TO UAE KITCHENS',
      color: '#C8102E',
    },
  ];

  const currentStep = steps[activeStep];
  const StepIcon = currentStep.icon;

  return (
    <section
      id="farm-to-kitchen"
      className="relative w-full bg-[#3C1518] text-[#FDF6EC] select-none overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12"
      aria-labelledby="farm-story-heading"
    >
      {/* ============================================================ */}
      {/* VISIBLE CINEMATIC ENVIRONMENTAL BACKGROUND WITH WARM MAROON  */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          key={currentStep.envImage}
          src={currentStep.envImage}
          alt={currentStep.envAlt}
          className="w-full h-full object-cover object-center filter brightness-[0.50] contrast-[1.08] transition-all duration-1000 ease-cinematic animate-in fade-in zoom-in-102"
          loading="lazy"
        />
        {/* Balanced warm maroon overlay preserving visibility of agricultural landscape */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3C1518] via-[#3C1518]/78 to-[#3C1518]/82" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#3C1518]/40 to-[#3C1518]/90" />
      </div>

      {/* ============================================================ */}
      {/* INTENTIONALLY ANCHORED BOTANICAL (Lentil motif at base)       */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -start-10 w-[200px] sm:w-[260px] lg:w-[320px] pointer-events-none opacity-25 z-10 transition-transform duration-300 ease-editorial depth-botanical"
        style={{
          transform: isReducedMotion ? 'none' : `translate3d(0, ${(smoothY * 0.02).toFixed(1)}px, 0)`,
        }}
      >
        <img
          src={MAGIC_ASSETS.illustrationLentils}
          alt=""
          className="w-full h-auto object-contain filter drop-shadow-lg"
          loading="lazy"
        />
      </div>

      {/* ============================================================ */}
      {/* SECTION CONTENT CONTAINER (Vertically compact & balanced)     */}
      {/* ============================================================ */}
      <div className="relative max-w-7xl mx-auto w-full z-20 flex flex-col justify-between">
        {/* EDITORIAL SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-8 sm:mb-12 border-b border-white/15">
          <div>
            <span className="font-mono text-xs text-[#D4A843] tracking-[0.25em] uppercase font-bold block mb-2">
              02 / 07 — SOURCING ETHOS
            </span>
            <h2
              id="farm-story-heading"
              ref={headingRef}
              className={`font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#FDF6EC] tracking-tight leading-tight reveal-heading ${
                headingRevealed ? 'is-revealed' : ''
              }`}
            >
              <span>FROM THE FARM.</span>{' '}
              <span className="text-[#D4A843]">TO YOUR KITCHEN.</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onNavigateImpact}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#D4A843] hover:text-white uppercase tracking-wider transition-colors cursor-pointer group self-start sm:self-end pb-1"
          >
            <span>{t('home.farm.cta', 'EXPLORE SOURCING JOURNEY')}</span>
            <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* STEP SELECTOR TABS */}
        <div className="flex items-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {steps.map((st, i) => (
            <button
              key={st.num}
              type="button"
              onClick={() => setActiveStep(i)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 ${
                activeStep === i
                  ? 'bg-[#D4A843] text-[#3C1518] shadow-md scale-102'
                  : 'bg-white/10 hover:bg-white/20 text-[#FDF6EC]/80 border border-white/10'
              }`}
            >
              <span>{st.num}</span>
              <span className="font-sans font-semibold">{st.title}</span>
            </button>
          ))}
        </div>

        {/* MAIN BALANCED COMPOSITION: STORYTELLING + VISUAL STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          {/* LEFT: STEP CONTENT & SOURCING DETAILS */}
          <div key={currentStep.num} className="lg:col-span-6 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-2 duration-600 ease-editorial">
            <div className="mb-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A843] font-bold block mb-1">
                {currentStep.sub}
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-[#FDF6EC] tracking-tight leading-tight">
                {currentStep.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#FDF6EC]/85 leading-relaxed font-normal mb-6 max-w-lg">
              {currentStep.desc}
            </p>

            {/* Provenance Badge */}
            <div className="inline-flex items-center gap-3 p-3.5 rounded-xl bg-[#3C1518]/90 border border-white/20 backdrop-blur-md w-fit shadow-md">
              <div className="w-8 h-8 rounded-lg bg-[#D4A843]/20 flex items-center justify-center text-[#D4A843]">
                <StepIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest block">
                  ORIGIN HARVEST REGION
                </span>
                <span className="text-xs font-bold text-[#FDF6EC] tracking-wider">
                  {currentStep.originTag}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: ART-DIRECTED VISUAL COMPOSITION (Moved upward, integrated) */}
          <div className="lg:col-span-6 relative w-full h-[300px] sm:h-[360px] lg:h-[390px] flex items-center justify-center">
            {/* Soft Ambient Glow */}
            <div className="absolute w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full bg-[#D4A843]/15 blur-2xl pointer-events-none" />

            {/* Environmental Terroir Texture Frame */}
            <div className="absolute inset-2 sm:inset-4 rounded-3xl border border-white/20 bg-white/[0.05] backdrop-blur-xs flex items-center justify-center overflow-hidden shadow-xl">
              {currentStep.secondaryTexture && (
                <img
                  src={currentStep.secondaryTexture}
                  alt="Agricultural texture"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 filter contrast-125 transition-opacity duration-700 ease-in-out"
                  loading="lazy"
                />
              )}
              <div className="absolute w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full border border-dashed border-[#D4A843]/25" />
            </div>

            {/* Authentic Product Packaging (Clean & Prominent) */}
            <div className="relative z-20 flex flex-col items-center justify-center">
              <img
                key={currentStep.num}
                src={currentStep.asset}
                alt={currentStep.caption}
                className="max-h-[220px] sm:max-h-[270px] lg:max-h-[290px] w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] animate-in fade-in slide-in-from-bottom-3 zoom-in-98 duration-700 ease-editorial"
                loading="lazy"
              />

              {/* Dynamic Caption Pill */}
              <div className="mt-3 px-4 py-1.5 rounded-full bg-[#3C1518]/95 border border-[#D4A843]/50 text-xs font-mono text-[#D4A843] shadow-lg backdrop-blur-md">
                {currentStep.caption}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STEP RESOLUTION: FARM → INGREDIENTS → KITCHEN */}
        <div className="w-full pt-4 border-t border-white/15 flex flex-wrap items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-2 sm:gap-4 font-mono text-[11px] uppercase tracking-wider">
            <span className={activeStep === 0 ? 'text-[#D4A843] font-bold' : ''}>FARM</span>
            <span>→</span>
            <span className={activeStep === 1 || activeStep === 2 ? 'text-[#D4A843] font-bold' : ''}>INGREDIENTS</span>
            <span>→</span>
            <span className={activeStep === 3 ? 'text-[#D4A843] font-bold' : ''}>KITCHEN</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-white/50">STEP {activeStep + 1} OF {steps.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
