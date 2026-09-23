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
      className="group bg-white border border-[#E6E0D6] rounded-xs overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#C8102E] hover:shadow-md cursor-pointer select-none relative"
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
      <div className="relative w-full h-48 sm:h-52 bg-gradient-to-b from-[#FAF7F2] to-[#F5ECE1] p-4 flex flex-col items-center justify-center overflow-hidden border-b border-[#E6E0D6]/70">
        {/* Subtle decorative background motif */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-[#D4A843]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-dashed border-[#C8102E]" />
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 text-[10px]">
          <span className="font-mono font-bold uppercase tracking-wider text-[#C8102E] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-2xs border border-[#E6E0D6] shadow-2xs">
            {recipe.meal}
          </span>
          <span className="font-mono text-[#3C1518]/70 bg-white/90 px-1.5 py-0.5 rounded-2xs border border-[#E6E0D6] flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#C8102E]" />
            {recipe.cookingTime}
          </span>
        </div>

        {/* Authentic MAGIC Pouch Visual Hero */}
        <div className="relative z-10 flex items-center justify-center h-full pt-3">
          <img
            src={recipe.primaryProduct.image}
            alt={recipe.primaryProduct.name}
            loading="lazy"
            className="max-h-36 sm:max-h-40 w-auto object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Bottom Tagline Overlay */}
        <div className="absolute bottom-1.5 inset-x-2 text-center z-10">
          <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-[#3C1518]/70 bg-white/80 px-2 py-0.5 rounded-2xs">
            {recipe.category}
          </span>
        </div>
      </div>

      {/* 2. CARD CONTENT & EDITORIAL METADATA */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Dual language and title */}
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8102E]">
              MAGIC Recipe
            </span>
            <span className="font-arabic text-xs text-[#3C1518]/60">
              {recipe.arabicName}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#3C1518] group-hover:text-[#C8102E] transition-colors leading-snug line-clamp-1 mb-1.5">
            {recipe.title}
          </h3>

          <p className="text-xs text-[#3C1518]/70 font-sans line-clamp-2 leading-relaxed mb-3">
            {recipe.description}
          </p>
        </div>

        {/* Bottom meta row */}
        <div className="pt-3 border-t border-[#E6E0D6] space-y-2">
          {/* Difficulty and diet */}
          <div className="flex items-center justify-between text-[11px] text-[#3C1518]/70">
            <span className="flex items-center gap-1">
              <ChefHat className="w-3 h-3 text-[#D4A843]" />
              <span>{recipe.difficulty}</span>
            </span>
            <span className="text-[10px] font-mono text-[#2B6E2A] font-semibold bg-[#2B6E2A]/10 px-1.5 py-0.2 rounded-2xs">
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
              className="text-[11px] font-semibold text-[#3C1518] hover:text-[#C8102E] flex items-center gap-1.5 truncate pr-2 group/prod"
              title={`View ${recipe.primaryProduct.name}`}
            >
              <Sparkles className="w-3 h-3 text-[#D4A843] shrink-0" />
              <span className="truncate group-hover/prod:underline">
                {recipe.primaryProduct.name}
              </span>
            </button>

            <span className="text-xs font-bold text-[#C8102E] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0">
              <span>Cook</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
