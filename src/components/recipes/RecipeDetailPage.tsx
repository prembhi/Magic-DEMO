import React, { useState, useMemo } from 'react';
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
  Printer,
  Check,
  RotateCcw,
  ArrowDown,
  BookOpen,
  ArrowUpRight,
  UtensilsCrossed,
} from 'lucide-react';
import { Recipe, RECIPES_DATA } from '../../data/recipes';
import { useShopCart } from '../../context/ShopCartContext';
import { findShopProduct, SHOP_PRODUCTS } from '../../data/shopProducts';
import { ProductNewsletter } from '../product/ProductNewsletter';

export interface RecipeDetailPageProps {
  recipe: Recipe;
  onNavigateHome: () => void;
  onNavigateShop?: (category?: string) => void;
  onNavigateRecipes: (recipeSlug?: string) => void;
  onSelectRecipe: (slug: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({
  recipe,
  onNavigateHome,
  onNavigateShop,
  onNavigateRecipes,
  onSelectRecipe,
  onSelectProduct,
}) => {
  const { addItem } = useShopCart();

  // Local state for interactive cooking checklist
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [shareToast, setShareToast] = useState(false);
  const [cartFeedback, setCartFeedback] = useState<string | null>(null);

  // Toggle ingredient checkbox
  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Reset ingredient checklist
  const handleResetChecklist = () => {
    setCheckedIngredients({});
  };

  // Check all ingredients
  const handleCheckAllIngredients = () => {
    const allChecked: Record<number, boolean> = {};
    recipe.ingredients.forEach((_, idx) => {
      allChecked[idx] = true;
    });
    setCheckedIngredients(allChecked);
  };

  // Toggle step completion
  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Smooth scroll to recipe instructions
  const handleJumpToRecipe = () => {
    const element = document.getElementById('recipe-preparation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Share recipe action
  const handleShare = async () => {
    const shareData = {
      title: `${recipe.title} — Cook With MAGIC`,
      text: recipe.description,
      url: window.location.href,
    };

    if (navigator.share && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  // Print recipe action
  const handlePrint = () => {
    window.print();
  };

  // Add a MAGIC staple directly to the shop cart
  const handleAddStapleToCart = (productSlug: string, productName: string) => {
    const shopProd = findShopProduct(productSlug);
    if (shopProd) {
      addItem(shopProd, 1);
      setCartFeedback(`Added "${productName}" to sample bag`);
      setTimeout(() => setCartFeedback(null), 2800);
    }
  };

  // Related recipes: prioritize recipes sharing MAGIC products, then category
  const relatedRecipes = useMemo(() => {
    const currentProductSlugs = new Set(recipe.magicProducts.map((p) => p.slug));
    const candidates = RECIPES_DATA.filter((r) => r.slug !== recipe.slug);

    return candidates
      .sort((a, b) => {
        const aShared = a.magicProducts.filter((p) => currentProductSlugs.has(p.slug)).length;
        const bShared = b.magicProducts.filter((p) => currentProductSlugs.has(p.slug)).length;
        if (bShared !== aShared) return bShared - aShared;
        if (a.category === recipe.category && b.category !== recipe.category) return -1;
        if (b.category === recipe.category && a.category !== recipe.category) return 1;
        return 0;
      })
      .slice(0, 4);
  }, [recipe]);

  // Complementary products for "MAKE IT A MAGIC PANTRY" cross-sell
  const complementaryProducts = useMemo(() => {
    const recipeProductSlugs = new Set(recipe.magicProducts.map((p) => p.slug));
    return SHOP_PRODUCTS.filter((prod) => !recipeProductSlugs.has(prod.slug)).slice(0, 3);
  }, [recipe]);

  const checkedCount = Object.values(checkedIngredients).filter(Boolean).length;
  const allIngredientsChecked =
    recipe.ingredients.length > 0 && checkedCount === recipe.ingredients.length;

  return (
    <article className="w-full bg-[#FDF6EC] text-[#3C1518] selection:bg-[#C8102E] selection:text-white">
      {/* Toast notifications */}
      {shareToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-6 z-50 bg-[#3C1518] text-[#FDF6EC] px-4 py-2.5 rounded-lg shadow-xl border border-[#D4A843]/40 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2"
        >
          <Check className="w-3.5 h-3.5 text-[#D4A843]" />
          <span>Recipe link copied to clipboard</span>
        </div>
      )}

      {cartFeedback && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-6 z-50 bg-[#3C1518] text-[#FDF6EC] px-4 py-2.5 rounded-lg shadow-xl border border-[#D4A843]/40 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
          <span>{cartFeedback}</span>
        </div>
      )}

      {/* 1. TOP BREADCRUMB & RETURN LINK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#3C1518]/10 pb-4">
          {/* Unboxed breadcrumb with typographic separators */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[#3C1518]/65 font-medium">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li aria-hidden="true" className="text-[#3C1518]/30">
                /
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateRecipes()}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Recipes
                </button>
              </li>
              <li aria-hidden="true" className="text-[#3C1518]/30">
                /
              </li>
              <li aria-current="page" className="font-semibold text-[#3C1518] truncate max-w-[240px] sm:max-w-none">
                {recipe.title}
              </li>
            </ol>
          </nav>

          {/* Quick back link */}
          <button
            type="button"
            onClick={() => onNavigateRecipes()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8102E] hover:text-[#9B0D23] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Recipes</span>
          </button>
        </div>
      </div>

      {/* 2. EDITORIAL SPLIT-SCREEN HERO SECTION */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pb-16"
        aria-label="Recipe Introduction"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          {/* LEFT COLUMN: Editorial Metadata, Title, and Direct Actions */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between">
            <div>
              {/* Kicker with subtle spice glyph */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
                  COOK WITH MAGIC
                </span>
                <span className="text-[#3C1518]/25 text-xs">·</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#3C1518]/65 font-medium">
                  {recipe.meal}
                </span>
              </div>

              {/* Recipe Titles: English + Arabic */}
              <div className="mb-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#3C1518] tracking-tight leading-[1.08]">
                  {recipe.title}
                </h1>
                <p className="font-arabic text-xl sm:text-2xl text-[#3C1518]/60 mt-1 font-normal tracking-wide">
                  {recipe.arabicName}
                </p>
              </div>

              {/* Tagline */}
              <p className="text-base sm:text-lg font-serif italic text-[#D4A843] mb-5 leading-snug">
                {recipe.tagline}
              </p>

              {/* Zero-Pill Unboxed Metadata Line */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-[#3C1518]/70 font-medium mb-6 pb-5 border-b border-[#3C1518]/12">
                <span>{recipe.category}</span>
                <span aria-hidden="true" className="text-[#3C1518]/30">·</span>
                <span>{recipe.diet.join(' · ')}</span>
                <span aria-hidden="true" className="text-[#3C1518]/30">·</span>
                <span>Single-Origin Heritage Staples</span>
              </div>

              {/* Quick Summary Grid */}
              <div className="grid grid-cols-3 gap-4 p-4 sm:p-5 bg-white border border-[#E6DFC8] rounded-xs mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/60 block mb-1">
                    Cook Time
                  </span>
                  <div className="flex items-center gap-1.5 text-sm sm:text-base font-serif font-bold text-[#3C1518]">
                    <Clock className="w-4 h-4 text-[#C8102E] shrink-0" />
                    <span>{recipe.cookingTime}</span>
                  </div>
                </div>

                <div className="border-l border-[#3C1518]/10 pl-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/60 block mb-1">
                    Difficulty
                  </span>
                  <div className="flex items-center gap-1.5 text-sm sm:text-base font-serif font-bold text-[#3C1518]">
                    <ChefHat className="w-4 h-4 text-[#D4A843] shrink-0" />
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>

                <div className="border-l border-[#3C1518]/10 pl-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/60 block mb-1">
                    Yield
                  </span>
                  <div className="flex items-center gap-1.5 text-sm sm:text-base font-serif font-bold text-[#3C1518]">
                    <Users className="w-4 h-4 text-[#3C1518]/65 shrink-0" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Row: Primary Jump to Recipe + Secondary Share & Print */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleJumpToRecipe}
                className="flex-1 sm:flex-initial min-h-[48px] px-7 py-3 bg-[#C8102E] hover:bg-[#9B0D23] text-white text-xs font-bold uppercase tracking-widest rounded-xs cursor-pointer transition-colors shadow-sm flex items-center justify-center gap-2 group"
              >
                <span>Jump to Recipe</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="min-h-[48px] px-4 py-3 bg-white hover:bg-[#F5EBE1] text-[#3C1518] text-xs font-bold rounded-xs border border-[#D9CEBA] transition-colors cursor-pointer flex items-center justify-center gap-2"
                title="Share this recipe"
              >
                <Share2 className="w-3.5 h-3.5 text-[#3C1518]/70" />
                <span className="hidden sm:inline">Share</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="min-h-[48px] px-4 py-3 bg-white hover:bg-[#F5EBE1] text-[#3C1518] text-xs font-bold rounded-xs border border-[#D9CEBA] transition-colors cursor-pointer flex items-center justify-center gap-2"
                title="Print recipe for kitchen use"
              >
                <Printer className="w-3.5 h-3.5 text-[#3C1518]/70" />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Magazine Cover Editorial Recipe Canvas */}
          <div className="lg:col-span-6 xl:col-span-5 flex">
            <div className="w-full relative rounded-xs overflow-hidden border border-[#D9CEBA] bg-gradient-to-br from-[#FAF5EE] via-[#F4ECE1] to-[#EFE2D2] p-7 sm:p-9 flex flex-col justify-between shadow-sm min-h-[440px] sm:min-h-[500px]">
              {/* Subtle decorative concentric brass rim and geometric motifs */}
              <div className="absolute inset-3 border border-[#D4A843]/25 pointer-events-none rounded-2xs" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#D4A843]/15 to-transparent pointer-events-none" />

              {/* Editorial Magazine Masthead Strip */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#3C1518]/10 text-[10px] font-mono uppercase tracking-[0.2em] text-[#3C1518]/65">
                <span className="flex items-center gap-1.5 font-bold text-[#C8102E]">
                  <Sparkles className="w-3 h-3 text-[#D4A843]" />
                  <span>MAGIC CULINARY ARCHIVE</span>
                </span>
                <span>VOL. 01</span>
              </div>

              {/* Elevated Stage with Authentic Primary Packaging & Plate Graphics */}
              <div className="relative z-10 my-6 flex flex-col items-center justify-center flex-1">
                {/* Artisan Graphic Plate / Spice Halo */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[#D4A843]/30 bg-white/40 shadow-inner" />
                  <div className="absolute inset-3 rounded-full border border-dashed border-[#D4A843]/40" />
                  <div className="absolute inset-8 rounded-full bg-radial from-[#D4A843]/10 via-transparent to-transparent" />

                  {/* Authentic Verified Product Asset */}
                  <img
                    src={recipe.primaryProduct.image}
                    alt={recipe.primaryProduct.name}
                    className="relative z-10 max-h-56 sm:max-h-64 w-auto object-contain filter drop-shadow-[0_14px_24px_rgba(60,21,24,0.18)] hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Subtle Arabic script badge */}
                <span className="font-arabic text-lg sm:text-xl text-[#3C1518]/60 mt-2">
                  {recipe.arabicName}
                </span>
              </div>

              {/* Editorial Placard / Caption */}
              <div className="relative z-10 pt-4 border-t border-[#3C1518]/10 bg-white/70 backdrop-blur-xs p-3.5 rounded-2xs border border-[#E6DFC8]/60">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8102E] font-bold block">
                      Primary Heritage Staple
                    </span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-[#3C1518] block">
                      {recipe.primaryProduct.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#3C1518]/65">
                      {recipe.primaryProduct.weight} · AED {recipe.primaryProduct.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProduct(recipe.primaryProduct.slug)}
                    className="px-3 py-1.5 bg-[#3C1518] hover:bg-[#C8102E] text-white text-[10px] font-bold uppercase tracking-wider rounded-2xs transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RECIPE INTRO & STORY (Generous Editorial Section) */}
      <section className="bg-white border-y border-[#E6DFC8] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#3C1518]/65 font-bold">
              Culinary Notes & Provenance
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#3C1518] mb-4 tracking-tight leading-tight">
            {recipe.tagline}
          </h2>

          <p className="text-base sm:text-lg lg:text-xl font-serif text-[#3C1518]/85 leading-relaxed font-normal">
            {recipe.description}
          </p>

          {/* Editorial Trust Signature */}
          <div className="mt-6 pt-6 border-t border-[#3C1518]/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#3C1518]/65">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2B6E2A]" />
              <span>100% Optical Laser Sorted Pulses & Single-Origin Spices</span>
            </div>
            <div className="flex items-center gap-1 text-[#C8102E] font-bold">
              <span>Cook With Magic</span>
              <span className="text-[#3C1518]/30">/</span>
              <span>Kitchen Tested</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECIPE AT A GLANCE (Compact Information Strip) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#FAF7F2] border border-[#E6DFC8] rounded-xs p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Clock className="w-5 h-5 text-[#C8102E] mb-1.5" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/60">
              Total Time
            </span>
            <span className="text-sm font-serif font-bold text-[#3C1518] mt-0.5">
              {recipe.cookingTime}
            </span>
          </div>

          <div className="flex flex-col items-center border-l border-[#3C1518]/10">
            <ChefHat className="w-5 h-5 text-[#D4A843] mb-1.5" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/60">
              Skill Level
            </span>
            <span className="text-sm font-serif font-bold text-[#3C1518] mt-0.5">
              {recipe.difficulty}
            </span>
          </div>

          <div className="flex flex-col items-center sm:border-l border-[#3C1518]/10">
            <Users className="w-5 h-5 text-[#3C1518]/65 mb-1.5" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/60">
              Serving Yield
            </span>
            <span className="text-sm font-serif font-bold text-[#3C1518] mt-0.5">
              {recipe.servings}
            </span>
          </div>

          <div className="flex flex-col items-center border-l border-[#3C1518]/10">
            <UtensilsCrossed className="w-5 h-5 text-[#2B6E2A] mb-1.5" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/60">
              Category
            </span>
            <span className="text-sm font-serif font-bold text-[#3C1518] mt-0.5 truncate max-w-[120px]">
              {recipe.category}
            </span>
          </div>
        </div>
      </div>

      {/* 5. INGREDIENTS + METHOD (The Core of the Page) */}
      <section
        id="recipe-preparation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14"
        aria-label="Ingredients and Preparation Method"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN (5 cols on Desktop): INGREDIENTS CHECKLIST */}
          <div className="lg:col-span-5 bg-white border border-[#E6DFC8] rounded-xs p-6 sm:p-8 shadow-xs sticky top-20">
            <div className="flex items-center justify-between pb-4 border-b border-[#3C1518]/12 mb-4">
              <div>
                <h2 className="text-2xl font-serif font-black text-[#3C1518] tracking-tight">
                  Ingredients
                </h2>
                <p className="text-xs text-[#3C1518]/65 mt-0.5 font-sans">
                  {checkedCount} of {recipe.ingredients.length} prepped
                </p>
              </div>

              {/* Quick toggle actions */}
              <div className="flex items-center gap-2">
                {checkedCount > 0 ? (
                  <button
                    type="button"
                    onClick={handleResetChecklist}
                    className="text-[11px] font-bold text-[#C8102E] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCheckAllIngredients}
                    className="text-[11px] font-bold text-[#3C1518]/70 hover:text-[#C8102E] cursor-pointer"
                  >
                    Check all
                  </button>
                )}
              </div>
            </div>

            {/* Checklist */}
            <ul className="space-y-3.5 pt-2">
              {recipe.ingredients.map((ingredient, idx) => {
                const isChecked = !!checkedIngredients[idx];
                const isMagicStaple = ingredient.toLowerCase().includes('magic');

                return (
                  <li
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`flex items-start gap-3 p-2.5 rounded-2xs cursor-pointer transition-colors select-none ${
                      isChecked
                        ? 'bg-[#FAF7F2] text-[#3C1518]/45 line-through'
                        : 'hover:bg-[#FAF7F2] text-[#3C1518]'
                    }`}
                  >
                    {/* Custom accessible checkbox */}
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isChecked}
                      className={`w-5 h-5 rounded-2xs border shrink-0 flex items-center justify-center mt-0.5 transition-all ${
                        isChecked
                          ? 'bg-[#2B6E2A] border-[#2B6E2A] text-white'
                          : 'border-[#C8102E]/60 bg-white hover:border-[#C8102E]'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="text-xs sm:text-sm font-sans flex-1 leading-relaxed">
                      {isMagicStaple ? (
                        <span className="font-semibold text-[#C8102E]">
                          {ingredient}
                        </span>
                      ) : (
                        <span>{ingredient}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {allIngredientsChecked && (
              <div className="mt-6 p-3 bg-[#FAF7F2] border border-[#2B6E2A]/30 rounded-2xs flex items-center gap-2 text-xs font-semibold text-[#2B6E2A]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>All ingredients prepped! Ready to begin cooking.</span>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (7 cols on Desktop): STEP-BY-STEP METHOD */}
          <div className="lg:col-span-7 space-y-6">
            <div className="pb-4 border-b border-[#3C1518]/12">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-1">
                Kitchen Method
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#3C1518] tracking-tight">
                Preparation & Cooking Steps
              </h2>
            </div>

            <ol className="space-y-6">
              {recipe.instructions.map((step, idx) => {
                const stepNum = idx + 1;
                const formattedNum = stepNum < 10 ? `0${stepNum}` : `${stepNum}`;
                const isStepDone = !!completedSteps[idx];

                return (
                  <li
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`bg-white border p-6 sm:p-7 rounded-xs transition-all cursor-pointer ${
                      isStepDone
                        ? 'border-[#2B6E2A]/30 bg-[#FAF7F2]/60'
                        : 'border-[#E6DFC8] hover:border-[#D4A843]'
                    }`}
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Step Number in Fraunces serif */}
                      <span
                        className={`text-3xl sm:text-4xl font-serif font-black leading-none shrink-0 select-none ${
                          isStepDone ? 'text-[#2B6E2A]' : 'text-[#C8102E]'
                        }`}
                      >
                        {formattedNum}
                      </span>

                      <div className="flex-1">
                        <p
                          className={`text-sm sm:text-base leading-relaxed font-sans max-w-xl ${
                            isStepDone ? 'text-[#3C1518]/50 line-through' : 'text-[#3C1518]/90'
                          }`}
                        >
                          {step}
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-[11px] font-mono font-medium text-[#3C1518]/50">
                          {isStepDone ? (
                            <span className="text-[#2B6E2A] flex items-center gap-1 font-bold">
                              <Check className="w-3.5 h-3.5" />
                              <span>Step Completed</span>
                            </span>
                          ) : (
                            <span className="hover:text-[#C8102E] transition-colors">
                              Click to mark done
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* 6. COOKING NOTES SECTION (Rendered only if genuine notes exist) */}
            {recipe.cookingNotes && (
              <div className="mt-10 p-6 sm:p-7 bg-[#FAF7F2] border border-[#D4A843]/40 rounded-xs relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-[0.2em] text-[#D4A843] font-bold">
                  <BookOpen className="w-4 h-4 text-[#D4A843]" />
                  <span>Chef's Pantry Notes & Technique</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-[#3C1518] mb-2">
                  Unlocking Maximum Flavor
                </h3>
                <p className="text-xs sm:text-sm text-[#3C1518]/85 leading-relaxed font-sans">
                  {recipe.cookingNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. MAGIC STAPLES USED IN THIS RECIPE (MADE WITH MAGIC) */}
      <section
        className="w-full bg-[#FAF5EE] border-t border-[#E6DFC8] py-14 sm:py-18"
        aria-labelledby="made-with-magic-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-1">
              AUTHENTIC INGREDIENTS
            </span>
            <h2
              id="made-with-magic-heading"
              className="text-3xl sm:text-4xl font-serif font-black text-[#3C1518] tracking-tight mb-2"
            >
              MADE WITH MAGIC
            </h2>
            <p className="text-sm text-[#3C1518]/70 font-sans">
              The MAGIC staples behind this recipe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipe.magicProducts.map((prod) => {
              const shopItem = findShopProduct(prod.slug);
              const price = shopItem ? shopItem.price : prod.price;

              return (
                <div
                  key={prod.slug}
                  className="bg-white border border-[#E6DFC8] rounded-xs p-6 flex flex-col justify-between hover:border-[#C8102E] transition-all group shadow-2xs"
                >
                  <div>
                    {/* Authentic Product Stage */}
                    <div className="w-full h-48 bg-[#FAF7F2] rounded-2xs p-4 flex items-center justify-center mb-4 relative overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                      />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/50 block mb-1">
                      {prod.weight} · Single Origin
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#3C1518] group-hover:text-[#C8102E] transition-colors mb-1">
                      {prod.name}
                    </h3>
                    <span className="text-sm font-mono font-bold text-[#C8102E] block mb-4">
                      AED {price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-[#3C1518]/10">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(prod.slug)}
                      className="flex-1 py-2.5 px-3 bg-white hover:bg-[#FAF7F2] text-[#3C1518] text-xs font-bold rounded-2xs border border-[#D9CEBA] transition-colors cursor-pointer text-center"
                    >
                      View Product
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddStapleToCart(prod.slug, prod.name)}
                      className="py-2.5 px-4 bg-[#C8102E] hover:bg-[#9B0D23] text-white text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                      title={`Add ${prod.name} to cart`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. RECIPE PRODUCT CROSS-SELL (MAKE IT A MAGIC PANTRY) */}
      {complementaryProducts.length > 0 && (
        <section
          className="w-full bg-white border-t border-[#E6DFC8] py-14 sm:py-18"
          aria-labelledby="magic-pantry-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#3C1518]/12 gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4A843] font-bold block mb-1">
                  PANTRY EXPANSION
                </span>
                <h2
                  id="magic-pantry-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#3C1518] tracking-tight"
                >
                  MAKE IT A MAGIC PANTRY
                </h2>
                <p className="text-xs sm:text-sm text-[#3C1518]/70 mt-1 font-sans">
                  Curated pulses and freshly ground single-origin spices to complete your home kitchen.
                </p>
              </div>

              {onNavigateShop && (
                <button
                  type="button"
                  onClick={() => onNavigateShop()}
                  className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1 cursor-pointer self-start md:self-auto"
                >
                  <span>Explore Full Catalogue</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {complementaryProducts.map((comp) => (
                <div
                  key={comp.slug}
                  className="bg-[#FAF7F2] border border-[#E6DFC8] rounded-xs p-6 flex flex-col justify-between hover:border-[#D4A843] transition-all group"
                >
                  <div>
                    <div className="w-full h-44 bg-white rounded-2xs p-4 flex items-center justify-center mb-4">
                      <img
                        src={comp.image}
                        alt={comp.altText}
                        className="max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                      />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/50 block mb-0.5">
                      {comp.weight} · {comp.category}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#3C1518] group-hover:text-[#C8102E] transition-colors mb-1">
                      {comp.name}
                    </h3>
                    <p className="text-xs text-[#3C1518]/70 line-clamp-2 mb-3">
                      {comp.culinaryProfile}
                    </p>
                    <span className="text-sm font-mono font-bold text-[#3C1518] block mb-3">
                      AED {comp.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#3C1518]/10">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(comp.slug)}
                      className="flex-1 py-2 px-3 bg-white hover:bg-[#F0ECE1] text-[#3C1518] text-xs font-bold rounded-2xs border border-[#D9CEBA] transition-colors cursor-pointer text-center"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddStapleToCart(comp.slug, comp.name)}
                      className="py-2 px-3.5 bg-[#3C1518] hover:bg-[#C8102E] text-white text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. MORE RECIPES TO COOK */}
      <section
        className="w-full bg-[#FAF7F2] border-t border-[#E6DFC8] py-14 sm:py-18"
        aria-labelledby="more-recipes-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-3 border-b border-[#3C1518]/12 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-1">
                CULINARY INSPIRATION
              </span>
              <h2
                id="more-recipes-heading"
                className="text-2xl sm:text-3xl font-serif font-black text-[#3C1518] tracking-tight"
              >
                MORE RECIPES TO COOK
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateRecipes()}
              className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All 12 Recipes</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedRecipes.map((other) => (
              <article
                key={other.slug}
                onClick={() => {
                  onSelectRecipe(other.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white border border-[#E6DFC8] rounded-xs p-5 flex flex-col justify-between cursor-pointer hover:border-[#C8102E] transition-all group shadow-2xs"
              >
                <div>
                  {/* Recipe Image / Packaging Frame */}
                  <div className="h-40 bg-[#FAF7F2] rounded-2xs p-3 flex items-center justify-center mb-3 group-hover:bg-[#F5EFE6] transition-colors relative">
                    <img
                      src={other.primaryProduct.image}
                      alt={other.title}
                      className="max-h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                    />
                    <span className="absolute bottom-2 right-2 text-[9px] font-mono uppercase text-[#3C1518]/50 bg-white/80 px-1.5 py-0.5 rounded-2xs">
                      {other.meal}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase text-[#C8102E] font-bold block mb-1">
                    {other.cookingTime} · {other.difficulty}
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#3C1518] group-hover:text-[#C8102E] transition-colors mb-1 line-clamp-1">
                    {other.title}
                  </h3>
                  <p className="text-xs text-[#3C1518]/70 line-clamp-2 leading-relaxed">
                    {other.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#3C1518]/10 flex items-center justify-between text-xs font-bold text-[#C8102E]">
                  <span>Cook Recipe</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL MAGIC CTA (Campaign Moment) */}
      <section
        className="w-full bg-[#3C1518] text-[#FDF6EC] py-16 sm:py-20 relative overflow-hidden"
        aria-label="Magic Call to Action"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#D4A843_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 rounded-full border border-[#D4A843]/30 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4A843] mb-4">
            <Sparkles className="w-3 h-3 text-[#D4A843]" />
            <span>THE HERITAGE PANTRY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#FDF6EC] tracking-tight mb-4 leading-tight">
            COOK SOMETHING MAGICAL.
          </h2>

          <p className="text-sm sm:text-base text-[#FDF6EC]/80 max-w-xl mx-auto mb-8 font-sans leading-relaxed">
            Bring the staples behind your favourite recipes into your pantry. Single-origin pulses, 100% unadulterated spices, and time-honoured heritage.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => (onNavigateShop ? onNavigateShop() : onNavigateHome())}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs font-bold uppercase tracking-widest rounded-xs cursor-pointer transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>SHOP MAGIC</span>
              <ShoppingBag className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateRecipes()}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-transparent hover:bg-white/10 text-[#FDF6EC] text-xs font-bold uppercase tracking-widest rounded-xs border border-[#D4A843]/50 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>EXPLORE RECIPES</span>
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 11. REUSED APPROVED MAGIC NEWSLETTER */}
      <ProductNewsletter />
    </article>
  );
};
