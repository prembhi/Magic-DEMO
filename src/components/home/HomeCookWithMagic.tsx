import React, { useState, useEffect, useRef } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { RECIPES_DATA } from '../../data/recipes';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';

interface HomeCookWithMagicProps {
  onNavigateRecipes: (slug?: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const HomeCookWithMagic: React.FC<HomeCookWithMagicProps> = ({
  onNavigateRecipes,
  onSelectProduct,
}) => {
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const featuredRecipes = RECIPES_DATA.slice(0, 3);
  const primaryRecipe = featuredRecipes[0];
  const secondaryRecipes = featuredRecipes.slice(1, 3);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const recipeVisuals = [
    { photo: MAGIC_ASSETS.dalTadka },
    { photo: MAGIC_ASSETS.kitchen },
    { photo: MAGIC_ASSETS.kitchenSunset },
  ];

  return (
    <section
      ref={sectionRef}
      id="recipes"
      className="w-full bg-[#FDF6EC] text-[#3C1518] py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-12 border-b border-[#3C1518]/12 select-none relative overflow-hidden"
      aria-labelledby="recipes-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-3 border-b border-[#3C1518]/15 gap-3 sm:gap-6">
          <div
            className="min-w-0"
            style={{
              transform: isVisible || isReducedMotion ? 'none' : 'translateY(25px)',
              opacity: isVisible || isReducedMotion ? 1 : 0,
              transition: 'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <h2
              id="recipes-heading"
              className="font-display font-extrabold text-[1.75rem] xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-[#3C1518] tracking-tight leading-[1.05] sm:leading-[1.0] sm:whitespace-nowrap"
            >
              {isRTL ? 'اطبخ سحر النكهات.' : 'COOK SOMETHING MAGIC.'}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigateRecipes()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#C8102E] hover:text-[#A60D26] transition-colors cursor-pointer group pb-1 shrink-0"
          >
            <span>{isRTL ? 'عرض أرشيف الوصفات' : 'VIEW CULINARY ARCHIVE'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 shrink-0" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 1. PRIMARY FEATURED RECIPE (CALIBRATED EDITORIAL SPREAD: ~410px HEIGHT)   */}
        {/* ========================================================================= */}
        {primaryRecipe && (
          <article
            onClick={() => onNavigateRecipes(primaryRecipe.slug)}
            style={{
              transform: isVisible || isReducedMotion ? 'none' : 'translateY(30px)',
              opacity: isVisible || isReducedMotion ? 1 : 0,
              transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms',
            }}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center bg-white rounded-2xl border border-[#3C1518]/15 hover:border-[#C8102E] p-4 sm:p-5 lg:p-6 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer mb-6 sm:mb-8 will-change-transform"
          >
            {/* LEFT / FOOD PHOTOGRAPHY (approx 58-60% Desktop Width, 7 cols, height ~350-360px) */}
            <div className="w-full lg:col-span-7 min-w-0 overflow-hidden rounded-xl sm:rounded-2xl bg-[#FAF7F2] relative h-[210px] xs:h-[240px] sm:h-[280px] md:h-[320px] lg:h-[350px] xl:h-[360px]">
              <img
                src={recipeVisuals[0]?.photo || MAGIC_ASSETS.dalTadka}
                alt={primaryRecipe.title}
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                loading="eager"
              />
            </div>

            {/* RIGHT / RECIPE INFORMATION (approx 40-42% Desktop Width, 5 cols, vertically centered) */}
            <div className="w-full lg:col-span-5 min-w-0 flex flex-col justify-center my-auto lg:py-2 lg:px-2 xl:px-4 space-y-2.5 sm:space-y-3">
              {/* Title & Cooking Time Grouped */}
              <div className="space-y-1 sm:space-y-1.5">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-[2.1rem] text-[#3C1518] group-hover:text-[#C8102E] transition-colors leading-[1.1]">
                  {primaryRecipe.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3C1518]/75">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C8102E]" />
                    {primaryRecipe.cookingTime}
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-sm sm:text-base text-[#3C1518]/85 font-sans leading-relaxed">
                {primaryRecipe.tagline}
              </p>

              {/* Action Button */}
              <div className="pt-1.5 sm:pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateRecipes(primaryRecipe.slug)}
                  className="w-full sm:w-auto min-h-[44px] h-11 sm:h-12 px-6 sm:px-7 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group active:scale-[0.98]"
                >
                  <span>{isRTL ? 'عرض الوصفة' : 'VIEW RECIPE'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================================= */}
        {/* 2. SECONDARY RECIPES (2-COLUMN EDITORIAL ENTRIES)                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {secondaryRecipes.map((recipe, idx) => {
            const visual = recipeVisuals[idx + 1] || recipeVisuals[0];
            return (
              <article
                key={recipe.id}
                onClick={() => onNavigateRecipes(recipe.slug)}
                style={{
                  transform: isVisible || isReducedMotion ? 'none' : 'translateY(25px)',
                  opacity: isVisible || isReducedMotion ? 1 : 0,
                  transition: `opacity 650ms cubic-bezier(0.22, 1, 0.36, 1) ${300 + idx * 100}ms, transform 650ms cubic-bezier(0.22, 1, 0.36, 1) ${300 + idx * 100}ms`,
                }}
                className="group bg-white rounded-xl border border-[#3C1518]/15 hover:border-[#C8102E] p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer will-change-transform"
              >
                <div>
                  {/* Photo Stage */}
                  <div className="relative w-full h-[200px] sm:h-[220px] overflow-hidden rounded-lg bg-[#FAF7F2] mb-3">
                    <img
                      src={visual.photo}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-xs text-[#3C1518]/70 mb-1">
                    <span className="flex items-center gap-1 font-semibold text-[#3C1518]">
                      <Clock className="w-3.5 h-3.5 text-[#C8102E]" />
                      {recipe.cookingTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display font-extrabold text-lg sm:text-xl text-[#3C1518] group-hover:text-[#C8102E] transition-colors leading-tight mb-1.5">
                    {recipe.title}
                  </h4>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-[#3C1518]/80 line-clamp-2 leading-relaxed font-sans">
                    {recipe.tagline}
                  </p>
                </div>

                {/* Bottom Link */}
                <div className="pt-2.5 mt-2.5 border-t border-[#3C1518]/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#C8102E] group-hover:underline">
                  <span>{isRTL ? 'عرض الوصفة' : 'VIEW RECIPE'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
