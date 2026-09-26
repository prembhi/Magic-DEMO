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
  const [isVisible, setIsVisible] = useState(false);
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

  const recipeVisuals = [
    { photo: MAGIC_ASSETS.dalTadka },
    { photo: MAGIC_ASSETS.kitchen },
    { photo: MAGIC_ASSETS.kitchenSunset },
  ];

  return (
    <section
      ref={sectionRef}
      id="recipes"
      className="w-full bg-[#FDF6EC] text-[#3C1518] py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/12 select-none relative overflow-hidden"
      aria-labelledby="recipes-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-3.5 border-b border-[#3C1518]/15 gap-4">
          <div
            style={{
              transform: isVisible || isReducedMotion ? 'none' : 'translateY(25px)',
              opacity: isVisible || isReducedMotion ? 1 : 0,
              transition: 'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <h2
              id="recipes-heading"
              className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#3C1518] tracking-tight leading-[0.96]"
            >
              {isRTL ? 'اطبخ مع ماجيك.' : 'COOK WITH MAGIC.'}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigateRecipes()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C8102E] hover:text-[#A60D26] transition-colors cursor-pointer group pb-1"
          >
            <span>{isRTL ? 'عرض أرشيف الوصفات كاملاً' : 'VIEW COMPLETE CULINARY ARCHIVE'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 1. PRIMARY FEATURED RECIPE (LARGE DOMINANT EDITORIAL SPREAD)              */}
        {/* ========================================================================= */}
        {primaryRecipe && (
          <article
            onClick={() => onNavigateRecipes(primaryRecipe.slug)}
            style={{
              transform: isVisible || isReducedMotion ? 'none' : 'translateY(30px)',
              opacity: isVisible || isReducedMotion ? 1 : 0,
              transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms',
            }}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center bg-white rounded-2xl border border-[#3C1518]/15 hover:border-[#C8102E] p-4 sm:p-6 lg:p-7 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer mb-8 sm:mb-10 will-change-transform"
          >
            {/* LEFT / DOMINANT FOOD PHOTOGRAPHY (60% Desktop Width) */}
            <div className="lg:col-span-7 overflow-hidden rounded-xl bg-[#FAF7F2] aspect-[16/10] sm:aspect-[16/10] max-h-[420px] relative">
              <img
                src={recipeVisuals[0]?.photo || MAGIC_ASSETS.dalTadka}
                alt={primaryRecipe.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>

            {/* RIGHT / SUPPORTING RECIPE EDITORIAL STORY (40% Desktop Width) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5 sm:space-y-4">
              {/* Metadata */}
              <div className="flex items-center gap-2.5 text-xs text-[#3C1518]/70 font-mono">
                <span className="flex items-center gap-1 font-semibold text-[#3C1518]">
                  <Clock className="w-3.5 h-3.5 text-[#C8102E]" />
                  {primaryRecipe.cookingTime}
                </span>
                <span>•</span>
                <span>{primaryRecipe.difficulty}</span>
                <span>•</span>
                <span>{primaryRecipe.servings}</span>
              </div>

              {/* Title */}
              <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#3C1518] group-hover:text-[#C8102E] transition-colors leading-[1.05]">
                {primaryRecipe.title}
              </h3>

              {/* Story / Description */}
              <p className="text-sm sm:text-base text-[#3C1518]/85 font-sans leading-relaxed">
                {primaryRecipe.tagline}
              </p>

              {/* Primary Staple Line */}
              {primaryRecipe.primaryProduct && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(primaryRecipe.primaryProduct.slug);
                  }}
                  className="flex items-center gap-3 pt-2 pb-1 border-t border-[#3C1518]/10 cursor-pointer group/staple"
                >
                  <img
                    src={primaryRecipe.primaryProduct.image}
                    alt={primaryRecipe.primaryProduct.name}
                    className="w-9 h-9 object-contain filter drop-shadow-2xs"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono uppercase text-[#6B4226] block font-semibold">
                      {isRTL ? 'المكوّن الأساسي' : 'PRIMARY STAPLE'}
                    </span>
                    <span className="text-xs font-bold text-[#3C1518] group-hover/staple:text-[#C8102E] transition-colors truncate block">
                      {primaryRecipe.primaryProduct.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#C8102E]">
                    {isRTL ? `${primaryRecipe.primaryProduct.price.toFixed(2)} د.إ` : `AED ${primaryRecipe.primaryProduct.price.toFixed(2)}`}
                  </span>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateRecipes(primaryRecipe.slug)}
                  className="h-11 px-7 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs font-bold uppercase tracking-widest rounded-md shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group active:scale-[0.98]"
                >
                  <span>{isRTL ? 'عرض طريقة الإعداد' : 'VIEW RECIPE & METHOD'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        )}

        {/* ========================================================================= */}
        {/* 2. SECONDARY RECIPES (2-COLUMN EDITORIAL ENTRIES)                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
                  <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden rounded-lg bg-[#FAF7F2] mb-3.5">
                    <img
                      src={visual.photo}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-2.5 text-xs text-[#3C1518]/60 font-mono mb-1.5">
                    <span className="flex items-center gap-1 font-semibold text-[#3C1518]">
                      <Clock className="w-3.5 h-3.5 text-[#C8102E]" />
                      {recipe.cookingTime}
                    </span>
                    <span>•</span>
                    <span>{recipe.difficulty}</span>
                    <span>•</span>
                    <span>{recipe.servings}</span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display font-bold text-lg sm:text-xl text-[#3C1518] group-hover:text-[#C8102E] transition-colors leading-tight mb-1.5">
                    {recipe.title}
                  </h4>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-[#3C1518]/80 line-clamp-2 leading-relaxed font-sans">
                    {recipe.tagline}
                  </p>
                </div>

                {/* Bottom Link */}
                <div className="pt-3 mt-3 border-t border-[#3C1518]/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#C8102E] group-hover:underline">
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
