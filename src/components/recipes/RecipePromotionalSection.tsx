import React from 'react';
import { ChefHat, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';

interface RecipePromotionalSectionProps {
  onShopClick?: () => void;
}

export const RecipePromotionalSection: React.FC<RecipePromotionalSectionProps> = ({
  onShopClick,
}) => {
  return (
    <section className="w-full my-16 sm:my-20 bg-[#3C1518] text-[#FDF6EC] rounded-xs border border-[#D4A843]/30 overflow-hidden relative select-none">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8102E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4A843]/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-16 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
        <div className="max-w-xl text-center md:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#D4A843]/40 text-[#D4A843] text-xs uppercase tracking-[0.25em] font-semibold mb-4">
            <ChefHat className="w-3.5 h-3.5" />
            <span>The Chef's Choice</span>
            <span className="opacity-40">·</span>
            <span className="font-arabic font-normal text-xs text-[#FDF6EC]/90">اختيار الطهاة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-[#FDF6EC] leading-[1.1] mb-3">
            COOK WITH MAGIC
          </h2>

          <p className="text-base sm:text-lg text-[#D4A843] font-serif italic mb-4">
            Discover everyday Indian cooking made with MAGIC.
          </p>

          <p className="text-xs sm:text-sm text-[#FDF6EC]/80 leading-relaxed font-sans mb-6">
            Every dish tells a story of heat, time, and tempered aromatics. Our single-origin pulses and slow-milled spices provide the unadulterated foundation for home comforts and festive feasts alike.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            {onShopClick && (
              <button
                type="button"
                onClick={onShopClick}
                className="py-3 px-6 bg-[#C8102E] hover:bg-[#A60D26] text-white font-bold text-xs rounded-xs shadow-md transition-all cursor-pointer inline-flex items-center gap-2 active:scale-[0.98]"
              >
                <span>Stock Your Pantry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center gap-2 text-xs text-[#FDF6EC]/70">
              <ShieldCheck className="w-4 h-4 text-[#2B6E2A]" />
              <span>Direct Harvest • UAE Express Dispatch</span>
            </div>
          </div>
        </div>

        {/* Visual Product Showcase Stamp */}
        <div className="relative shrink-0 flex items-center justify-center">
          <div className="relative w-48 sm:w-56 h-48 sm:h-56 rounded-full border border-[#D4A843]/30 bg-white/5 flex items-center justify-center p-4">
            <img
              src={MAGIC_ASSETS.toor}
              alt="MAGIC Pantry Staple"
              className="max-h-40 sm:max-h-48 w-auto object-contain filter drop-shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
