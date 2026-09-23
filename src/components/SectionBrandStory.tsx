import React from 'react';
import { Sparkles, Globe, ShieldCheck, Flame } from 'lucide-react';
import { MAGIC_ASSETS } from '../constants/assets';

export const SectionBrandStory: React.FC = () => {
  return (
    <section
      id="heritage"
      className="relative w-full bg-[#3C1518] text-[#FDF6EC] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
      aria-labelledby="brand-story-heading"
    >
      {/* BRAND TRANSITION MOTIF: The sweeping MAGIC Red organic curve */}
      <div className="absolute top-0 inset-x-0 h-16 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="w-full h-full text-[#F5EDE1] fill-current"
        >
          <path d="M0,0 L1440,0 L1440,24 C1080,64 360,64 0,24 Z" />
        </svg>
      </div>

      {/* Atmospheric culinary depth & spice ambient glow */}
      <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-[#C8102E]/20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-[450px] h-[450px] rounded-full bg-[#D4A843]/15 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10 pt-4">
        {/* EDITORIAL TOP BANNER */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#D4A843]/30 text-xs text-[#D4A843] uppercase tracking-[0.25em] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" />
            <span>The Magic Philosophy</span>
            <span className="text-white/30">·</span>
            <span className="font-arabic font-normal text-sm text-[#FDF6EC]/80">فلسفة ماجيك</span>
          </div>

          <h2
            id="brand-story-heading"
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#FDF6EC] tracking-tight leading-tight"
          >
            FROM INDIA TO YOUR KITCHEN
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#C8102E] to-transparent mx-auto mt-6" />
        </div>

        {/* IMMERSIVE LAYERED COMPOSITION (Not image-left text-right) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT EDITORIAL COLUMN: Brand Roots & Heritage Foundation */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xs relative overflow-hidden group hover:border-[#D4A843]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#C8102E]/20 border border-[#C8102E]/40 flex items-center justify-center mb-4 text-[#D4A843]">
                <ShieldCheck className="w-5 h-5 text-[#D4A843]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#FDF6EC] mb-2">
                Uncompromising Ingredient Integrity
              </h3>
              <p className="text-xs sm:text-sm text-[#FDF6EC]/70 leading-relaxed font-normal">
                Every pulse, grain, and spice seed is hand-inspected to preserve natural essential oils, vibrant natural colors, and deep aromatic punch without artificial treatment.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xs relative overflow-hidden group hover:border-[#D4A843]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#C8102E]/20 border border-[#C8102E]/40 flex items-center justify-center mb-4 text-[#D4A843]">
                <Flame className="w-5 h-5 text-[#D4A843]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#FDF6EC] mb-2">
                The Living Soul of the Tadka
              </h3>
              <p className="text-xs sm:text-sm text-[#FDF6EC]/70 leading-relaxed font-normal">
                True Indian cuisine breathes through the crackle of cumin in warm ghee, the golden bloom of turmeric, and the comforting comfort of perfectly tempered dal.
              </p>
            </div>
          </div>

          {/* CENTER HERO VISUAL: Large layered Brass Vessel, Spice Bowls & Botanical Composition */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 my-4 lg:my-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square flex items-center justify-center">
              {/* Concentric gold celestial spice orbits */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="180" stroke="#D4A843" strokeWidth="1" strokeDasharray="4 6" opacity="0.25" fill="none" />
                <circle cx="200" cy="200" r="140" stroke="#C8102E" strokeWidth="1.2" opacity="0.35" fill="none" />
                <circle cx="200" cy="200" r="95" stroke="#FDF6EC" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.2" fill="none" />
              </svg>

              {/* Central Artisanal Brass Katori & Spice Composition */}
              <div className="relative z-10 w-72 h-72 rounded-full p-2 bg-gradient-to-tr from-[#996E24] via-[#D4A843] to-[#F5C342] shadow-2xl flex items-center justify-center">
                {/* Deep hammered brass interior */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#4A2412] to-[#200B0D] p-5 flex flex-col items-center justify-center text-center overflow-hidden border border-[#D4A843]/60 shadow-inner">
                  {/* Authentic MAGIC Brand Logo */}
                  <img
                    src={MAGIC_ASSETS.logo}
                    alt="MAGIC Heritage Brand"
                    className="h-14 sm:h-16 w-auto object-contain drop-shadow-md mb-2 select-none pointer-events-none"
                  />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4A843] font-bold mt-0.5">
                    HERITAGE SPICE ARTISTRY
                  </span>
                  <span className="font-arabic text-sm text-[#FDF6EC]/80 mt-1">
                    أصالة النكهة الهندية
                  </span>
                </div>
              </div>

              {/* Floating Spice Satellites */}
              {/* Turmeric Rhizome Orb */}
              <div className="absolute -top-4 right-4 w-20 h-20 rounded-full bg-[#3C1518]/90 border border-[#D4A843]/60 flex flex-col items-center justify-center p-2 shadow-lg backdrop-blur-sm animate-pulse">
                <span className="text-xl">✨</span>
                <span className="text-[9px] font-bold uppercase text-[#D4A843] tracking-wider mt-1 text-center">
                  Haldi Roots
                </span>
              </div>

              {/* Whole Cumin Seeds Orb */}
              <div className="absolute -bottom-4 left-4 w-20 h-20 rounded-full bg-[#3C1518]/90 border border-[#C8102E]/60 flex flex-col items-center justify-center p-2 shadow-lg backdrop-blur-sm">
                <span className="text-xl">🌿</span>
                <span className="text-[9px] font-bold uppercase text-[#FDF6EC] tracking-wider mt-1 text-center">
                  Cumin Seeds
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT EDITORIAL COLUMN: Global Kitchen Reach & Culinary Bridge */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-3">
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xs relative overflow-hidden group hover:border-[#D4A843]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#C8102E]/20 border border-[#C8102E]/40 flex items-center justify-center mb-4 text-[#D4A843]">
                <Globe className="w-5 h-5 text-[#D4A843]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#FDF6EC] mb-2">
                Bridging Continents to Pantries
              </h3>
              <p className="text-xs sm:text-sm text-[#FDF6EC]/70 leading-relaxed font-normal">
                From bustling retail shelves in Dubai and the GCC to diaspora and gourmet home chefs worldwide, MAGIC bridges centuries of agrarian traditions directly to modern kitchen tables.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#C8102E]/30 to-transparent border border-[#C8102E]/40 backdrop-blur-xs relative overflow-hidden">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#D4A843]">
                Aroma-Lock Standard
              </span>
              <p className="font-display text-lg text-[#FDF6EC] font-bold mt-1.5 leading-snug">
                "When you tear open a pouch of MAGIC, the room fills with the warmth of an Indian spice market at dawn."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
