import React from 'react';
import { Clock, ChefHat, Sparkles, ArrowRight } from 'lucide-react';
import { Recipe } from '../../data/recipes';

interface RecipeCardProps {
  recipe: Recipe;
  onSelectRecipe: (slug: string) => void;
  onSelectProduct?: (slug: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelectRecipe,
  onSelectProduct,
}) => {
  return (
    <article
      onClick={() => onSelectRecipe(recipe.slug)}
      className="group bg-white border border-[#E6E0D6] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#C8102E] hover:shadow-md cursor-pointer select-none relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] active:scale-[0.99]"
      tabIndex={0}
      role="button"
      aria-label={`View recipe for ${recipe.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectRecipe(recipe.slug);
        }
      }}
    >
      {/* 1. ART-DIRECTED CULINARY STAGE WITH AUTHENTIC PACKAGING HERO */}
      <div className="relative w-full h-52 sm:h-56 bg-gradient-to-b from-[#FAF7F2] to-[#F5ECE1] p-4 flex flex-col items-center justify-center overflow-hidden border-b border-[#E6E0D6]/70">
        {/* Subtle decorative background motif */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#D4A843]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-dashed border-[#C8102E]" />
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 text-xs">
          <span className="font-sans font-bold uppercase tracking-wider text-[#C8102E] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#E6E0D6] shadow-2xs">
            {recipe.meal}
          </span>
          <span className="font-sans text-[#3C1518]/80 bg-white/95 px-2 py-1 rounded-md border border-[#E6E0D6] flex items-center gap-1.5 font-medium shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#C8102E]" />
            {recipe.cookingTime}
          </span>
        </div>

        {/* Authentic MAGIC Pouch Visual Hero */}
        <div className="relative z-10 flex items-center justify-center h-full pt-4">
          <img
            src={recipe.primaryProduct.image}
            alt={recipe.primaryProduct.name}
            loading="lazy"
            className="max-h-40 sm:max-h-44 w-auto object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Bottom Tagline Overlay */}
        <div className="absolute bottom-2 inset-x-2 text-center z-10">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#3C1518]/75 bg-white/90 px-2.5 py-0.5 rounded-full shadow-2xs">
            {recipe.category}
          </span>
        </div>
      </div>

      {/* 2. CARD CONTENT & EDITORIAL METADATA */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Dual language and title */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#C8102E]">
              MAGIC Recipe
            </span>
            <span className="font-arabic text-xs text-[#3C1518]/60">
              {recipe.arabicName}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-display font-bold text-[#3C1518] group-hover:text-[#C8102E] transition-colors leading-snug line-clamp-1 mb-2">
            {recipe.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#3C1518]/75 font-sans line-clamp-2 leading-relaxed mb-3.5">
            {recipe.description}
          </p>
        </div>

        {/* Bottom meta row */}
        <div className="pt-3 border-t border-[#E6E0D6] space-y-2.5">
          {/* Difficulty and diet */}
          <div className="flex items-center justify-between text-xs text-[#3C1518]/75">
            <span className="flex items-center gap-1.5 font-medium">
              <ChefHat className="w-3.5 h-3.5 text-[#D4A843]" />
              <span>{recipe.difficulty}</span>
            </span>
            <span className="text-xs font-sans text-[#2B6E2A] font-semibold bg-[#2B6E2A]/10 px-2 py-0.5 rounded-full">
              {recipe.diet[0]}
            </span>
          </div>

          {/* Primary staple used pill */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectProduct) {
                  onSelectProduct(recipe.primaryProduct.slug);
                }
              }}
              className="text-xs font-semibold text-[#3C1518] hover:text-[#C8102E] flex items-center gap-1.5 truncate pr-2 group/prod cursor-pointer"
              title={`View ${recipe.primaryProduct.name}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4A843] shrink-0" />
              <span className="truncate group-hover/prod:underline">
                {recipe.primaryProduct.name}
              </span>
            </button>

            <span className="text-xs font-bold font-sans text-[#C8102E] flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform shrink-0">
              <span>Cook</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
