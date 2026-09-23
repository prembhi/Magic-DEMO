import React from 'react';
import {
  Clock,
  ChefHat,
  ChevronRight,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Users,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { Recipe, RECIPES_DATA } from '../../data/recipes';
import { useShopCart } from '../../context/ShopCartContext';
import { findShopProduct } from '../../data/shopProducts';

interface RecipeDetailPageProps {
  recipe: Recipe;
  onNavigateHome: () => void;
  onNavigateRecipes: () => void;
  onSelectRecipe: (slug: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({
  recipe,
  onNavigateHome,
  onNavigateRecipes,
  onSelectRecipe,
  onSelectProduct,
}) => {
  const { addItem } = useShopCart();

  const handleAddStapleToCart = (productSlug: string) => {
    const shopProd = findShopProduct(productSlug);
    if (shopProd) {
      addItem(shopProd, 1);
    }
  };

  // Find related recipes in the same category or meal
  const otherRecipes = RECIPES_DATA.filter((r) => r.slug !== recipe.slug).slice(0, 3);

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 text-[#3C1518]">
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center flex-wrap gap-1 sm:gap-1.5 text-xs text-[#3C1518]/60">
          <li>
            <button
              onClick={onNavigateHome}
              className="hover:text-[#C8102E] transition-colors cursor-pointer"
            >
              Home
            </button>
          </li>
          <li>
            <ChevronRight className="w-3 h-3 text-[#3C1518]/30 inline" />
          </li>
          <li>
            <button
              onClick={onNavigateRecipes}
              className="hover:text-[#C8102E] transition-colors cursor-pointer"
            >
              Recipes
            </button>
          </li>
          <li>
            <ChevronRight className="w-3 h-3 text-[#3C1518]/30 inline" />
          </li>
          <li aria-current="page">
            <span className="font-semibold text-[#3C1518] truncate max-w-[200px] sm:max-w-none inline-block">
              {recipe.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* Return button */}
      <button
        type="button"
        onClick={onNavigateRecipes}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8102E] hover:underline mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Recipes</span>
      </button>

      {/* 2. RECIPE HEADER */}
      <div className="mb-8 pb-6 border-b border-[#3C1518]/15">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C8102E] bg-[#C8102E]/10 px-2 py-0.5 rounded-2xs">
            {recipe.meal}
          </span>
          <span className="text-xs text-[#3C1518]/40">•</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#3C1518]/70">
            {recipe.category}
          </span>
          <span className="text-xs text-[#3C1518]/40">•</span>
          <span className="text-[11px] font-mono text-[#2B6E2A] font-semibold bg-[#2B6E2A]/10 px-2 py-0.5 rounded-2xs">
            {recipe.diet.join(' • ')}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#3C1518] tracking-tight">
            {recipe.title}
          </h1>
          <span className="font-arabic text-xl sm:text-2xl text-[#3C1518]/65 font-normal">
            {recipe.arabicName}
          </span>
        </div>

        <p className="text-sm sm:text-base font-serif italic text-[#D4A843] mt-2 mb-3">
          {recipe.tagline}
        </p>

        <p className="text-xs sm:text-sm text-[#3C1518]/80 max-w-3xl leading-relaxed">
          {recipe.description}
        </p>

        {/* Quick Recipe Meta Strip */}
        <div className="flex flex-wrap items-center gap-6 mt-5 pt-4 border-t border-[#3C1518]/10 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-[#3C1518]">
            <Clock className="w-4 h-4 text-[#C8102E]" />
            <span>Cook Time: <strong>{recipe.cookingTime}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-[#3C1518]">
            <ChefHat className="w-4 h-4 text-[#D4A843]" />
            <span>Difficulty: <strong>{recipe.difficulty}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-[#3C1518]">
            <Users className="w-4 h-4 text-[#3C1518]/60" />
            <span>Yield: <strong>{recipe.servings}</strong></span>
          </div>
        </div>
      </div>

      {/* 3. MAIN RECIPE BODY (Two-Column Editorial Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
        {/* LEFT COLUMN (5 COLS): Visual Hero & Staples Used */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Presentation Stage */}
          <div className="w-full bg-[#FAF7F2] border border-[#E6E0D6] rounded-xs p-6 flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden shadow-2xs">
            <div className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-wider text-[#3C1518]/60">
              Featured MAGIC Staple
            </div>
            <img
              src={recipe.primaryProduct.image}
              alt={recipe.primaryProduct.name}
              className="max-h-56 w-auto object-contain filter drop-shadow-lg my-4"
            />
            <div className="text-center">
              <span className="text-xs font-serif font-bold text-[#3C1518] block">
                {recipe.primaryProduct.name}
              </span>
              <span className="text-[11px] font-mono text-[#3C1518]/60">
                {recipe.primaryProduct.weight} • AED {recipe.primaryProduct.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* STAPLES USED IN THIS RECIPE MERCHANDISING BLOCK */}
          <div className="bg-white border border-[#E6E0D6] rounded-xs p-5 shadow-2xs">
            <div className="flex items-center gap-1.5 pb-3 border-b border-[#E6E0D6] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3C1518]">
                Staples Used in This Recipe
              </h3>
            </div>

            <div className="divide-y divide-[#E6E0D6]">
              {recipe.magicProducts.map((prod) => (
                <div
                  key={prod.slug}
                  className="py-3 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-10 h-10 object-contain p-0.5 bg-[#FAF7F2] rounded border border-[#E6E0D6]"
                    />
                    <div>
                      <button
                        type="button"
                        onClick={() => onSelectProduct(prod.slug)}
                        className="font-bold text-[#3C1518] hover:text-[#C8102E] text-left cursor-pointer"
                      >
                        {prod.name}
                      </button>
                      <span className="text-[11px] font-mono text-[#3C1518]/60 block">
                        {prod.weight} • AED {prod.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddStapleToCart(prod.slug)}
                    className="py-1 px-2.5 bg-[#C8102E] hover:bg-[#A60D26] text-white text-[11px] font-bold rounded-2xs cursor-pointer transition-colors shadow-2xs flex items-center gap-1 shrink-0"
                    title={`Add ${prod.name} to cart`}
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (7 COLS): Ingredients & Step-by-Step Instructions */}
        <div className="lg:col-span-7 space-y-8">
          {/* Ingredients Section */}
          <div className="bg-white border border-[#E6E0D6] rounded-xs p-6 shadow-2xs">
            <h2 className="text-base font-serif font-bold text-[#3C1518] uppercase tracking-wider pb-3 border-b border-[#E6E0D6] mb-4">
              Ingredients
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#3C1518]/85">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2B6E2A] shrink-0 mt-0.5" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step-by-step Instructions */}
          <div className="bg-white border border-[#E6E0D6] rounded-xs p-6 shadow-2xs">
            <h2 className="text-base font-serif font-bold text-[#3C1518] uppercase tracking-wider pb-3 border-b border-[#E6E0D6] mb-4">
              Method & Preparation
            </h2>
            <ol className="space-y-4 text-xs sm:text-sm text-[#3C1518]/85">
              {recipe.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#E6E0D6] font-mono font-bold text-[#C8102E] text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed flex-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* 4. MORE RECIPES TO EXPLORE */}
      <div className="border-t border-[#3C1518]/15 pt-12">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#3C1518] mb-6">
          More Recipes to Cook
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherRecipes.map((other) => (
            <article
              key={other.slug}
              onClick={() => onSelectRecipe(other.slug)}
              className="bg-white border border-[#E6E0D6] rounded-xs p-4 cursor-pointer hover:border-[#C8102E] transition-all group"
            >
              <div className="h-32 bg-[#FAF7F2] rounded-xs p-2 flex items-center justify-center mb-3">
                <img
                  src={other.primaryProduct.image}
                  alt={other.title}
                  className="max-h-24 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-[10px] font-mono uppercase text-[#C8102E] font-bold">
                {other.meal} • {other.cookingTime}
              </span>
              <h3 className="text-sm font-serif font-bold text-[#3C1518] group-hover:text-[#C8102E] transition-colors mt-0.5">
                {other.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
