import React, { useState, useMemo } from 'react';
import { ChevronRight, Filter, Sparkles, ChefHat } from 'lucide-react';
import { RECIPES_DATA, Recipe, findRecipe } from '../../data/recipes';
import { RecipeCard } from './RecipeCard';
import { RecipeFilterSidebar, RecipeFilterState } from './RecipeFilterSidebar';
import { RecipePagination } from './RecipePagination';
import { RecipeFeaturedProducts } from './RecipeFeaturedProducts';
import { RecipePromotionalSection } from './RecipePromotionalSection';
import { RecipeDetailPage } from './RecipeDetailPage';
import { ProductNewsletter } from '../product/ProductNewsletter';
import { ShopHeader } from '../shop/ShopHeader';
import { ShopFooter } from '../shop/ShopFooter';
import { ShopCartDrawer } from '../shop/ShopCartDrawer';
import { useShopCart } from '../../context/ShopCartContext';

interface RecipesPageProps {
  recipeSlug?: string | null;
  onNavigateHome: () => void;
  onNavigateShop: (category?: string) => void;
  onNavigateRecipes: (recipeSlug?: string) => void;
  onSelectProduct: (productSlug: string) => void;
}

const CATEGORY_TABS = [
  'ALL',
  'BREAKFAST',
  'LUNCH',
  'DINNER',
  'SNACKS & SIDES',
  'DRINKS',
];

const PAGE_SIZE = 8;

export const RecipesPage: React.FC<RecipesPageProps> = ({
  recipeSlug,
  onNavigateHome,
  onNavigateShop,
  onNavigateRecipes,
  onSelectProduct,
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('ALL');
  const [filters, setFilters] = useState<RecipeFilterState>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { isCartOpen, closeCart, toastMessage } = useShopCart();

  // If a specific recipe slug is requested, look it up
  const activeDetailRecipe = useMemo(() => {
    return recipeSlug ? findRecipe(recipeSlug) : undefined;
  }, [recipeSlug]);

  // Filter recipes based on category tabs and sidebar filter options
  const filteredRecipes = useMemo(() => {
    return RECIPES_DATA.filter((recipe) => {
      // 1. Horizontal Category Tab Filter
      if (activeCategoryTab !== 'ALL') {
        const normalizedTab = activeCategoryTab.toLowerCase();
        const normalizedMeal = recipe.meal.toLowerCase();
        if (normalizedTab !== normalizedMeal) {
          return false;
        }
      }

      // 2. Sidebar Meal Filter
      if (filters.meal && recipe.meal.toLowerCase() !== filters.meal.toLowerCase()) {
        return false;
      }

      // 3. Sidebar Product Filter
      if (filters.product) {
        const matchesProduct = recipe.magicProducts.some(
          (p) => p.slug === filters.product
        );
        if (!matchesProduct) return false;
      }

      // 4. Sidebar Difficulty Filter
      if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
        return false;
      }

      // 5. Sidebar Cooking Time Filter
      if (filters.cookingTimeRange && recipe.cookingTimeRange !== filters.cookingTimeRange) {
        return false;
      }

      // 6. Sidebar Diet Filter
      if (filters.diet && !recipe.diet.includes(filters.diet as any)) {
        return false;
      }

      // 7. Search query if any
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(q);
        const matchesDesc = recipe.description.toLowerCase().includes(q);
        const matchesProduct = recipe.magicProducts.some((p) =>
          p.name.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesDesc && !matchesProduct) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategoryTab, filters, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredRecipes.length / PAGE_SIZE) || 1;
  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredRecipes.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredRecipes, currentPage]);

  const handleTabClick = (tab: string) => {
    setActiveCategoryTab(tab);
    setCurrentPage(1);
    // Also clear meal filter if tab is explicitly selected
    if (tab !== 'ALL') {
      setFilters((prev) => ({ ...prev, meal: null }));
    }
  };

  const handleClearFilters = () => {
    setFilters({});
    setActiveCategoryTab('ALL');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: RecipeFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSelectRecipe = (slug: string) => {
    onNavigateRecipes(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] text-[#3C1518] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white relative">
      {/* Toast notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-14 right-4 sm:right-6 z-50 bg-[#3C1518] text-[#FDF6EC] px-4 py-2.5 rounded-lg shadow-xl border border-[#D4A843]/40 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in"
        >
          <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. EXISTING APPROVED MARKETPLACE HEADER */}
      <ShopHeader
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        onNavigateHome={onNavigateHome}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full flex flex-col">
        {activeDetailRecipe ? (
          /* RECIPE DETAIL VIEW (/recipes/:slug) */
          <RecipeDetailPage
            recipe={activeDetailRecipe}
            onNavigateHome={onNavigateHome}
            onNavigateRecipes={() => onNavigateRecipes()}
            onSelectRecipe={handleSelectRecipe}
            onSelectProduct={onSelectProduct}
          />
        ) : (
          /* RECIPES DISCOVERY CATALOG VIEW (/recipes) */
          <>
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
              {/* 2. BREADCRUMB */}
              <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
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
                  <li aria-current="page">
                    <span className="font-semibold text-[#3C1518]">Recipes</span>
                  </li>
                </ol>
              </nav>

              {/* 3. RECIPES EDITORIAL INTRO */}
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[#E6E0D6] text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8102E] mb-2.5 shadow-2xs">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Cook With MAGIC</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#3C1518] tracking-tight leading-none mb-3">
                  RECIPES
                </h1>
                <p className="text-base sm:text-lg font-serif italic text-[#D4A843] mb-2">
                  Cook something magical.
                </p>
                <p className="text-xs sm:text-sm text-[#3C1518]/75 leading-relaxed font-sans max-w-xl mx-auto">
                  Everyday homestyle dals, celebratory biryanis, and soothing spiced elixirs created with single-origin Indian pulses and unadulterated spices.
                </p>
              </div>

              {/* 4. RECIPE CATEGORY HORIZONTAL NAVIGATION */}
              <div className="flex items-center justify-between gap-4 border-b border-[#3C1518]/15 pb-4 mb-8">
                {/* Horizontal tabs */}
                <div
                  role="tablist"
                  aria-label="Recipe categories"
                  className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pb-1"
                >
                  {CATEGORY_TABS.map((tab) => {
                    const isActive = activeCategoryTab === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => handleTabClick(tab)}
                        className={`px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xs transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'bg-[#C8102E] text-white shadow-2xs'
                            : 'bg-white hover:bg-white/80 text-[#3C1518]/70 hover:text-[#3C1518] border border-[#E6E0D6]'
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {/* Mobile Filter Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden shrink-0 inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-[#D9D2C7] rounded-xs text-xs font-bold text-[#3C1518] hover:border-[#C8102E] cursor-pointer shadow-2xs"
                  aria-label="Open filter drawer"
                >
                  <Filter className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>Filter</span>
                </button>
              </div>

              {/* 5 & 6. SIDEBAR + RECIPE GRID LAYOUT */}
              <div className="flex items-start gap-8 lg:gap-10 mb-14">
                {/* Desktop Filter Sidebar */}
                <RecipeFilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  isOpenMobile={isMobileFilterOpen}
                  onCloseMobile={() => setIsMobileFilterOpen(false)}
                  totalFilteredCount={filteredRecipes.length}
                />

                {/* Recipe Cards Grid Column */}
                <div className="flex-1 flex flex-col min-w-0">
                  {paginatedRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6">
                      {paginatedRecipes.map((recipe) => (
                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          onSelectRecipe={handleSelectRecipe}
                          onSelectProduct={onSelectProduct}
                        />
                      ))}
                    </div>
                  ) : (
                    /* Empty Filter State */
                    <div className="py-20 text-center bg-white rounded-xs border border-[#E6E0D6] p-8 max-w-md mx-auto">
                      <Sparkles className="w-8 h-8 text-[#D4A843] mx-auto mb-3" />
                      <h2 className="text-lg font-serif font-bold text-[#3C1518] mb-1">
                        No Recipes Found
                      </h2>
                      <p className="text-xs text-[#3C1518]/70 mb-4 leading-relaxed">
                        We couldn't find any recipes matching your current filter combination.
                      </p>
                      <button
                        type="button"
                        onClick={handleClearFilters}
                        className="py-2 px-4 bg-[#C8102E] text-white text-xs font-bold rounded-xs cursor-pointer hover:bg-[#A60D26] transition-colors"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}

                  {/* 10. PAGINATION */}
                  <RecipePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p) => {
                      setCurrentPage(p);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    totalItems={filteredRecipes.length}
                    pageSize={PAGE_SIZE}
                  />
                </div>
              </div>

              {/* 12. COOK WITH MAGIC PROMOTIONAL SECTION */}
              <RecipePromotionalSection
                onShopClick={() => onNavigateShop()}
              />
            </div>

            {/* 11. FEATURED PRODUCT MERCHANDISING SECTION */}
            <RecipeFeaturedProducts
              onSelectProduct={onSelectProduct}
              onNavigateShop={() => onNavigateShop()}
            />

            {/* 13. NEWSLETTER */}
            <ProductNewsletter />
          </>
        )}
      </main>

      {/* 14. FULL MAGIC FOOTER */}
      <ShopFooter
        onNavigateHome={onNavigateHome}
        onSelectCategory={(id) => onNavigateShop(id)}
      />

      {/* Cart Drawer */}
      <ShopCartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </div>
  );
};
