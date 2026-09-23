import React, { useState } from 'react';
import { Clock, ChefHat, ShoppingBag, ArrowUpRight, Flame } from 'lucide-react';
import toorImg from '../assets/images/toor_clean.png';
import masoorImg from '../assets/images/masoordal_clean.png';
import moongImg from '../assets/images/moong_clean.png';
import uradImg from '../assets/images/urad_clean.png';
import haldiImg from '../assets/images/haldi_clean.png';
import jeeraImg from '../assets/images/jeera_clean.png';

interface RecipeIngredient {
  name: string;
  image: string;
  weight: string;
}

interface Recipe {
  id: string;
  name: string;
  arabicName: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Signature';
  tagline: string;
  description: string;
  accentColor: string;
  ingredients: RecipeIngredient[];
}

interface SectionCookWithMagicProps {
  onAddToCart?: (productId: string) => void;
}

export const SectionCookWithMagic: React.FC<SectionCookWithMagicProps> = ({
  onAddToCart,
}) => {
  const [activeRecipeId, setActiveRecipeId] = useState<string>('dal-tadka');
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);

  const recipes: Recipe[] = [
    {
      id: 'dal-tadka',
      name: 'Dal Tadka',
      arabicName: 'دال تادكا',
      cookTime: '30 MIN',
      difficulty: 'Easy',
      tagline: 'Tempered Yellow Pigeon Peas with Sizzled Cumin & Ghee',
      description:
        'The quintessential comfort food of Indian households. Tender Toor Dal infused with turmeric, finished with a sputtering tadka of whole cumin, dried chilies, and fresh garlic.',
      accentColor: '#D4881E',
      ingredients: [
        { name: 'Magic Toor Dal', image: toorImg, weight: '1 KG' },
        { name: 'Magic Jeera', image: jeeraImg, weight: '100 G' },
        { name: 'Magic Haldi', image: haldiImg, weight: '100 G' },
      ],
    },
    {
      id: 'butter-chicken',
      name: 'Butter Chicken',
      arabicName: 'دجاج بالزبدة',
      cookTime: '45 MIN',
      difficulty: 'Signature',
      tagline: 'Rich Tomato Silk Infused with Kashmiri Aromatics',
      description:
        'A velvety restaurant classic elevated by freshly ground whole spices, golden turmeric marinade, and warm aromatic cumin roasted to nutty perfection.',
      accentColor: '#C8102E',
      ingredients: [
        { name: 'Magic Haldi', image: haldiImg, weight: '100 G' },
        { name: 'Magic Jeera', image: jeeraImg, weight: '100 G' },
        { name: 'Magic Masoor Dal', image: masoorImg, weight: '1 KG' },
      ],
    },
    {
      id: 'chana-masala',
      name: 'Chana Masala',
      arabicName: 'تشانا ماسالا',
      cookTime: '35 MIN',
      difficulty: 'Easy',
      tagline: 'Hearty Chickpeas in Tangy Spiced Onion-Tomato Gravy',
      description:
        'Robust North Indian street flavors. Chickpeas gently braised with golden turmeric, fragrant cumin seeds, and a punchy medley of hand-pounded whole spices.',
      accentColor: '#8B4513',
      ingredients: [
        { name: 'Magic Jeera', image: jeeraImg, weight: '100 G' },
        { name: 'Magic Haldi', image: haldiImg, weight: '100 G' },
        { name: 'Magic Moong Whole', image: moongImg, weight: '1 KG' },
      ],
    },
    {
      id: 'biryani',
      name: 'Dum Biryani',
      arabicName: 'برياني دم',
      cookTime: '60 MIN',
      difficulty: 'Medium',
      tagline: 'Layered Basmati Fragranced with Whole Spices & Saffron Ghee',
      description:
        'Royal Hyderabadi culinary heritage. Long-grain rice steam-cooked under a sealed dum with unadulterated whole spices, golden haldi marinade, and fried shallots.',
      accentColor: '#9C3A18',
      ingredients: [
        { name: 'Magic Jeera', image: jeeraImg, weight: '100 G' },
        { name: 'Magic Haldi', image: haldiImg, weight: '100 G' },
        { name: 'Magic Urad Whole', image: uradImg, weight: '1 KG' },
      ],
    },
  ];

  const activeRecipe = recipes.find((r) => r.id === activeRecipeId) || recipes[0];

  return (
    <section
      id="recipes"
      className="relative w-full bg-[#FDF6EC] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#3C1518]/10 select-none overflow-hidden"
      aria-labelledby="cook-with-magic-heading"
    >
      {/* Background warm grain aura */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#E8922F]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#C8102E]/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-1.5">
              <span className="w-5 h-[1.5px] bg-[#C8102E]" />
              <span>Authentic Culinary Tales</span>
              <span className="text-[#3C1518]/30">·</span>
              <span className="font-arabic font-normal text-xs text-[#3C1518]/80">اطبخ مع ماجيك</span>
            </div>
            <h2
              id="cook-with-magic-heading"
              className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#3C1518] tracking-tight"
            >
              COOK WITH MAGIC
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B4226] max-w-md font-medium leading-relaxed">
            Every dish tells a story of heat, time, and tempered aromatics. Select a recipe to see the authentic single-origin MAGIC staples that create its foundation.
          </p>
        </div>

        {/* RECIPE SELECTION TABS (Clean Editorial Style) */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none snap-x">
          {recipes.map((recipe) => {
            const isActive = recipe.id === activeRecipeId;
            return (
              <button
                key={recipe.id}
                onClick={() => {
                  setActiveRecipeId(recipe.id);
                  setSelectedIngredient(null);
                }}
                className={`relative px-5 py-3 rounded-xl font-display font-bold text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 whitespace-nowrap cursor-pointer snap-start min-h-[44px] ${
                  isActive
                    ? 'bg-[#3C1518] text-[#FDF6EC] shadow-md border border-[#D4A843]/40'
                    : 'bg-white/80 hover:bg-white text-[#3C1518]/80 hover:text-[#C8102E] border border-[#3C1518]/10'
                }`}
                aria-pressed={isActive}
              >
                {isActive && <span className="w-2 h-2 rounded-full bg-[#C8102E]" />}
                <span>{recipe.name}</span>
                <span className="text-[11px] font-arabic font-normal opacity-70">
                  {recipe.arabicName}
                </span>
              </button>
            );
          })}
        </div>

        {/* FEATURED EDITORIAL RECIPE SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/70 rounded-2xl border border-[#3C1518]/12 p-6 sm:p-10 shadow-xs">
          {/* LEFT 6 COLS: Illustrated Food Story & Dish Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Recipe Meta Badges */}
              <div className="flex items-center gap-3 text-xs font-mono font-bold text-[#6B4226] mb-3">
                <span className="flex items-center gap-1.5 text-[#3C1518]">
                  <Clock className="w-4 h-4 text-[#C8102E]" />
                  {activeRecipe.cookTime}
                </span>
                <span className="text-[#3C1518]/30">·</span>
                <span className="flex items-center gap-1.5 text-[#3C1518]">
                  <ChefHat className="w-4 h-4 text-[#D4A843]" />
                  {activeRecipe.difficulty}
                </span>
                <span className="text-[#3C1518]/30">·</span>
                <span className="font-arabic font-bold text-sm text-[#C8102E]">
                  {activeRecipe.arabicName}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#3C1518] mb-2 tracking-tight">
                {activeRecipe.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#C8102E] mb-4">
                {activeRecipe.tagline}
              </p>

              {/* Story Narrative */}
              <p className="text-sm text-[#6B4226] leading-relaxed mb-6 font-normal">
                {activeRecipe.description}
              </p>

              {/* Tadka Infusion Callout (No Stock Photos, Pure Vector Craft) */}
              <div className="p-4 rounded-xl bg-[#FDF6EC] border border-[#3C1518]/10 flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#C8102E]/10 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-[#C8102E]" />
                </div>
                <div className="flex flex-col text-xs text-[#3C1518]">
                  <span className="font-bold">Aroma Secret</span>
                  <span className="text-[#6B4226]">
                    Tempering whole cumin in hot ghee before adding turmeric releases essential terpenes.
                  </span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#3C1518]/10">
              <button
                onClick={() => {
                  activeRecipe.ingredients.forEach((ing) => {
                    if (onAddToCart) onAddToCart(ing.name);
                  });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C8102E] hover:bg-[#9C0A20] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all cursor-pointer min-h-[44px]"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4A843]" />
                <span>Shop Recipe Ingredients</span>
              </button>

              <button
                onClick={() => setSelectedIngredient(activeRecipe.ingredients[0].name)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-transparent hover:bg-black/5 text-[#3C1518] text-xs font-bold uppercase tracking-wider rounded-lg border border-[#3C1518]/20 transition-all cursor-pointer min-h-[44px]"
              >
                <span>View Recipe Method</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C8102E]" />
              </button>
            </div>
          </div>

          {/* RIGHT 6 COLS: Product Ingredient Reveal Stage (Uses authentic transparent PNG assets) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full text-center lg:text-left mb-3">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#6B4226]">
                Authentic Staples Used In This Recipe
              </span>
            </div>

            {/* Stage with 3 Overlapping / Cascading Ingredient Pouches */}
            <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center overflow-visible">
              {/* Radial glow background */}
              <div
                className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
                style={{
                  backgroundColor: `${activeRecipe.accentColor}30`,
                }}
              />

              {/* Three Authentic Stand-Up Pouches for this Recipe */}
              {activeRecipe.ingredients.map((ing, idx) => {
                // Staggered physical arrangement
                const offsets = [
                  { x: -75, y: 15, rot: -5, z: 10, scale: 0.85 },
                  { x: 0, y: -10, rot: 0, z: 20, scale: 1.05 },
                  { x: 75, y: 15, rot: 5, z: 15, scale: 0.88 },
                ][idx] || { x: 0, y: 0, rot: 0, z: 10, scale: 1 };

                const isSelected = selectedIngredient === ing.name;

                return (
                  <div
                    key={ing.name}
                    onClick={() => {
                      setSelectedIngredient(ing.name);
                      if (onAddToCart) onAddToCart(ing.name);
                    }}
                    className={`absolute flex flex-col items-center cursor-pointer transition-all duration-500 hover:scale-110 ${
                      isSelected ? 'scale-110 z-30' : ''
                    }`}
                    style={{
                      transform: `translateX(${offsets.x}px) translateY(${offsets.y}px) rotate(${offsets.rot}deg) scale(${offsets.scale})`,
                      zIndex: isSelected ? 30 : offsets.z,
                    }}
                  >
                    {/* The Authentic Isolated Transparent PNG */}
                    <div className="w-[140px] sm:w-[170px] aspect-[1/1.42] flex items-center justify-center">
                      <img
                        src={ing.image}
                        alt={ing.name}
                        className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xl"
                      />
                    </div>

                    {/* Compact Label Tag */}
                    <div className="mt-2 bg-[#3C1518]/90 text-[#FDF6EC] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border border-[#D4A843]/30 whitespace-nowrap">
                      {ing.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
