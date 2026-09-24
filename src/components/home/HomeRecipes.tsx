import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Clock, ChefHat, Sparkles } from 'lucide-react';
import { RECIPES_DATA, Recipe } from '../../data/recipes';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface HomeRecipesProps {
  onNavigateRecipes: (recipeSlug?: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const HomeRecipes: React.FC<HomeRecipesProps> = ({
  onNavigateRecipes,
  onSelectProduct,
}) => {
  const { t, isRTL } = useLanguage();
  const { ref: headingRef, isRevealed: headingRevealed } = useScrollReveal<HTMLHeadingElement>();
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Exactly 3 strong editorial recipe stories
  const recipesList: Recipe[] = [
    RECIPES_DATA.find((r) => r.slug === 'dal-tadka') || RECIPES_DATA[0],
    RECIPES_DATA.find((r) => r.slug === 'masoor-dal-tadka') || RECIPES_DATA[1],
    RECIPES_DATA.find((r) => r.slug === 'dal-makhani') || RECIPES_DATA[3],
  ];

  const activeRecipe = recipesList[activeStoryIndex] || recipesList[0];

  return (
    <section
      id="recipes"
      className="relative w-full bg-[#FAF5EE] text-[#3C1518] py-20 sm:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden select-none border-t border-[#3C1518]/10"
      aria-labelledby="recipes-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* EDITORIAL HEADER ROW */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-[#C8102E] tracking-[0.25em] uppercase font-bold block mb-3">
              05 / 07 — KITCHEN INSPIRATION
            </span>
            <h2
              id="recipes-heading"
              ref={headingRef}
              className={`font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#3C1518] tracking-tight leading-none mb-3 reveal-heading ${
                headingRevealed ? 'is-revealed' : ''
              }`}
            >
              {t('home.recipes.title', 'COOK WITH MAGIC')}
            </h2>
            <p className="text-sm sm:text-base text-[#3C1518]/70 font-normal">
              {t(
                'home.recipes.sub',
                'Everyday Indian dishes made with the staples in your pantry.'
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateRecipes()}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C8102E] hover:bg-[#A60D26] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer self-start sm:self-end"
          >
            <span>{t('home.recipes.cta', 'EXPLORE ALL RECIPES')}</span>
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* 3 EDITORIAL RECIPE NAVIGATION PILLS */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {recipesList.map((rec, idx) => (
            <button
              key={rec.id}
              type="button"
              onClick={() => setActiveStoryIndex(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeStoryIndex === idx
                  ? 'bg-[#3C1518] text-[#FDF6EC] shadow-md scale-102'
                  : 'bg-white text-[#3C1518]/70 hover:bg-[#3C1518]/10 border border-[#3C1518]/10'
              }`}
            >
              <span className="text-[#D4A843]">0{idx + 1}</span>
              <span>{rec.title}</span>
            </button>
          ))}
        </div>

        {/* FEATURED EDITORIAL RECIPE CINEMATIC STAGE */}
        <div className="bg-white rounded-3xl border-2 border-[#3C1518]/15 p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: LARGE FOOD & STAPLE PRESENTATION WITH PROXIMITY SCALE */}
          <div className="lg:col-span-7 relative w-full h-[360px] sm:h-[440px] lg:h-[500px] bg-gradient-to-b from-[#FDF6EC] to-[#F5ECE0]/60 rounded-3xl flex items-center justify-center p-6 overflow-hidden shadow-inner">
            {/* Ambient gold ring */}
            <div className="absolute inset-8 rounded-full border border-[#D4A843]/20 bg-white/40 pointer-events-none" />
            <div className="absolute inset-16 rounded-full border border-dashed border-[#D4A843]/25 pointer-events-none" />

            {/* Supporting Botanicals around the food stage */}
            {/* Coriander (top-right) */}
            <div
              aria-hidden="true"
              className="absolute -top-6 -right-6 w-[150px] sm:w-[190px] pointer-events-none opacity-30 select-none z-0 rotate-12"
            >
              <img
                src={MAGIC_ASSETS.illustrationCoriander}
                alt=""
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>

            {/* Chili (bottom-left) */}
            <div
              aria-hidden="true"
              className="absolute -bottom-8 -left-6 w-[130px] sm:w-[170px] pointer-events-none opacity-30 select-none z-0 -rotate-12"
            >
              <img
                src={MAGIC_ASSETS.illustrationChili}
                alt=""
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>

            {/* Cumin (top-left) */}
            <div
              aria-hidden="true"
              className="absolute -top-8 left-12 w-[140px] sm:w-[180px] pointer-events-none opacity-25 select-none z-0 rotate-45"
            >
              <img
                src={MAGIC_ASSETS.illustrationCumin}
                alt=""
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>

            {/* Badges */}
            <div className="absolute top-4 start-4 z-20 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/95 border border-[#3C1518]/15 text-[#3C1518] shadow-xs">
                <Clock className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>{activeRecipe.cookingTime}</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-white/95 border border-[#3C1518]/15 text-[#3C1518] shadow-xs">
                {activeRecipe.difficulty}
              </span>
            </div>

            {/* Main Editorial Food Image (magic-dal-tadka.png) */}
            <div
              onClick={() => onNavigateRecipes(activeRecipe.slug)}
              className="relative z-10 w-full h-full flex items-center justify-center cursor-pointer group"
            >
              <div
                key={`recipe-img-${activeRecipe.id}`}
                className="relative max-h-[82%] max-w-[85%] rounded-2xl overflow-hidden shadow-xl border-2 border-white/60 group-hover:scale-102 transition-transform duration-500 animate-in fade-in zoom-in-98 duration-500 ease-editorial"
              >
                <img
                  src={MAGIC_ASSETS.dalTadka}
                  alt={`Authentic home-cooked ${activeRecipe.title} prepared with single-origin MAGIC pulses and spices`}
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-3 start-4 text-xs font-mono font-bold text-white tracking-wider uppercase drop-shadow-md">
                  HOME-COOKED DAL TADKA
                </span>
              </div>

              {/* Accompanying Authentic MAGIC Pouch in Foreground Corner */}
              <div
                key={`recipe-pouch-${activeRecipe.id}`}
                className="absolute bottom-2 end-4 sm:end-8 z-20 w-[110px] sm:w-[145px] lg:w-[160px] filter drop-shadow-[0_16px_25px_rgba(60,21,24,0.35)] group-hover:scale-105 transition-transform duration-300 animate-in fade-in slide-in-from-right-4 duration-500 ease-editorial"
              >
                <img
                  src={activeRecipe.primaryProduct.image}
                  alt={`${activeRecipe.primaryProduct.name} authentic pouch`}
                  className="w-full h-auto object-contain -rotate-3"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: EDITORIAL METADATA & COMPANION STAPLES */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div
              key={`recipe-meta-${activeRecipe.id}`}
              className="animate-in fade-in slide-in-from-bottom-2 duration-500 ease-editorial"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C8102E] block mb-2">
                TESTED HOME RECIPE · {activeRecipe.servings}
              </span>

              <h3 className="font-display font-black text-2xl sm:text-4xl text-[#3C1518] leading-tight mb-3">
                {activeRecipe.title}
              </h3>

              <p className="text-sm text-[#3C1518]/75 leading-relaxed font-normal mb-6">
                {activeRecipe.tagline}
              </p>

              {/* KEY MAGIC STAPLES WITH TACTILE LINKS */}
              <div className="space-y-2 mb-8">
                <span className="font-mono text-[11px] font-bold text-[#3C1518]/70 uppercase tracking-widest block">
                  AUTHENTIC INGREDIENTS REQUIRED:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeRecipe.magicProducts.map((p) => (
                    <button
                      type="button"
                      key={p.slug}
                      onClick={() => onSelectProduct(p.slug)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#FAF5EE] hover:bg-[#C8102E] hover:text-white border border-[#3C1518]/10 text-xs font-semibold text-[#3C1518] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-[#D4A843]" />
                      <span>{p.name.replace('MAGIC ', '')}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="pt-6 border-t border-[#3C1518]/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigateRecipes(activeRecipe.slug)}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8102E] hover:text-[#A60D26] transition-colors cursor-pointer"
              >
                <span>COOK THIS DISH</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateRecipes()}
                className="text-xs font-mono text-[#3C1518]/60 hover:text-[#3C1518] transition-colors cursor-pointer"
              >
                VIEW ALL 6 RECIPES →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
