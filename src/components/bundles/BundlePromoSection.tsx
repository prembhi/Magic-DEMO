import React from 'react';
import { ShoppingBag, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';

interface BundlePromoSectionProps {
  onShopClick: () => void;
  onRecipesClick: () => void;
}

export const BundlePromoSection: React.FC<BundlePromoSectionProps> = ({
  onShopClick,
  onRecipesClick,
}) => {
  return (
    <section
      className="w-full bg-[#3C1518] text-[#FDF6EC] py-16 sm:py-20 my-12 rounded-xs border border-[#D4A843]/30 relative overflow-hidden shadow-md"
      aria-label="Build Your Magic Pantry Promotional Campaign"
    >
      {/* Background Indian botanical & spice geometry */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4A843_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#D4A843]/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-radial from-[#C8102E]/25 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Campaign Copy & Actions */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-[#D4A843]/30 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4A843] mb-4">
              <Sparkles className="w-3 h-3 text-[#D4A843]" />
              <span>THE HERITAGE COOK'S PANTRY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#FDF6EC] tracking-tight mb-4 leading-[1.1]">
              BUILD YOUR MAGIC PANTRY
            </h2>

            <p className="text-base sm:text-lg text-[#FDF6EC]/85 font-serif italic mb-3 text-[#D4A843]">
              Start with the staples behind everyday Indian cooking.
            </p>

            <p className="text-xs sm:text-sm text-[#FDF6EC]/75 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0 mb-8">
              From comforting yellow dal tadkas to slow-simmered celebratory feasts, keep your kitchen stocked with unpolished, single-origin pulses and 100% unadulterated spices.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                type="button"
                onClick={onShopClick}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs font-bold uppercase tracking-widest rounded-xs cursor-pointer transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>SHOP ALL MAGIC</span>
                <ShoppingBag className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onRecipesClick}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-transparent hover:bg-white/10 text-[#FDF6EC] text-xs font-bold uppercase tracking-widest rounded-xs border border-[#D4A843]/60 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>EXPLORE RECIPES</span>
                <BookOpen className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Authentic Packaging Ensemble Stage */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg h-72 sm:h-80 flex items-center justify-center">
              {/* Backing halo disc */}
              <div className="absolute inset-4 rounded-full border border-[#D4A843]/30 bg-white/5 shadow-inner" />
              <div className="absolute inset-8 rounded-full border border-dashed border-[#D4A843]/40" />

              {/* Verified Authentic MAGIC Assets Arranged */}
              <div className="relative z-10 flex items-end justify-center -space-x-8 sm:-space-x-12 w-full h-full pb-4">
                <img
                  src={MAGIC_ASSETS.toor}
                  alt="MAGIC Toor Dal"
                  className="max-h-48 sm:max-h-56 w-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transform -rotate-6 z-10 hover:scale-105 transition-transform"
                />
                <img
                  src={MAGIC_ASSETS.masoor}
                  alt="MAGIC Masoor Dal"
                  className="max-h-56 sm:max-h-64 w-auto object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.6)] z-20 hover:scale-105 transition-transform"
                />
                <img
                  src={MAGIC_ASSETS.moong}
                  alt="MAGIC Moong Whole"
                  className="max-h-48 sm:max-h-56 w-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transform rotate-6 z-10 hover:scale-105 transition-transform"
                />
                <div className="absolute -bottom-2 right-4 sm:right-8 z-30 flex items-center gap-2">
                  <img
                    src={MAGIC_ASSETS.jeera}
                    alt="MAGIC Jeera"
                    className="max-h-24 sm:max-h-28 w-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] transform rotate-4"
                  />
                  <img
                    src={MAGIC_ASSETS.haldi}
                    alt="MAGIC Haldi"
                    className="max-h-24 sm:max-h-28 w-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] transform -rotate-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
