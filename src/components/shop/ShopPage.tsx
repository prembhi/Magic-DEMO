import React, { useState, useMemo } from 'react';
import { Filter, ArrowUpDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SHOP_PRODUCTS, SHOP_CATEGORIES, ShopProduct } from '../../data/shopProducts';
import { ShopHeader } from './ShopHeader';
import { ShopBreadcrumb } from './ShopBreadcrumb';
import { ShopSidebar } from './ShopSidebar';
import { ShopProductCard } from './ShopProductCard';
import { ShopCartDrawer } from './ShopCartDrawer';
import { ShopFooter } from './ShopFooter';
import { useShopCart } from '../../context/ShopCartContext';

type SortOption = 'featured' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

interface ShopPageProps {
  onNavigateHome: () => void;
  onSelectProduct?: (productId: string) => void;
  initialCategoryId?: string;
  onNavigateRecipes?: () => void;
  onNavigateBundles?: () => void;
  onNavigateImpact?: () => void;
  onNavigateNewsletter?: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onNavigateHome,
  onSelectProduct,
  initialCategoryId,
  onNavigateRecipes,
  onNavigateBundles,
  onNavigateImpact,
  onNavigateNewsletter,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategoryId || 'all');
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  const { isCartOpen, closeCart, toastMessage } = useShopCart();

  // Find active category definition
  const currentCategory = useMemo(() => {
    return (
      SHOP_CATEGORIES.find((c) => c.id === selectedCategoryId) ||
      SHOP_CATEGORIES[0]
    );
  }, [selectedCategoryId]);

  // Client-side filtering by category, sub-item, and search query
  const filteredProducts = useMemo(() => {
    let list: ShopProduct[] = [...SHOP_PRODUCTS];

    // 1. Category Filter
    if (selectedCategoryId !== 'all') {
      if (selectedCategoryId === 'dals-lentils') {
        list = list.filter((p) => p.category === 'Dals & Lentils');
      } else if (selectedCategoryId === 'whole-spices') {
        list = list.filter((p) => p.category === 'Whole Spices');
      } else if (selectedCategoryId === 'ground-spices') {
        list = list.filter((p) => p.category === 'Ground Spices');
      } else {
        list = [];
      }
    }

    // 2. Sub-Item Filter (if specific sub-item clicked like "Toor Dal")
    if (selectedSubItem) {
      list = list.filter((p) => p.subCategory === selectedSubItem);
    }

    // 3. Search Query Filter
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesKeywords = p.searchKeywords.some((k) => k.includes(query));
        return matchesName || matchesCategory || matchesKeywords;
      });
    }

    // 4. Sorting
    switch (sortBy) {
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
        list.sort((a, b) => a.featuredRank - b.featuredRank);
        break;
    }

    return list;
  }, [selectedCategoryId, selectedSubItem, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategoryId('all');
    setSelectedSubItem(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3C1518] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white relative">
      {/* Toast notification feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-16 right-5 z-50 bg-[#3C1518] text-[#FDF6EC] px-3.5 py-2 rounded shadow-lg border border-[#D4A843]/40 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP STORE HEADER (Wide warm beige with store block) */}
      <ShopHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateHome={onNavigateHome}
        onNavigateRecipes={onNavigateRecipes}
        onNavigateBundles={onNavigateBundles}
        onNavigateImpact={onNavigateImpact}
        onNavigateNewsletter={onNavigateNewsletter}
      />

      {/* 2. COMPACT BREADCRUMB (Centered inside main content width) */}
      <ShopBreadcrumb
        currentCategoryName={
          selectedSubItem
            ? `${currentCategory.name} > ${selectedSubItem}`
            : currentCategory.name
        }
        onNavigateHome={onNavigateHome}
        onResetCategory={handleResetFilters}
      />

      {/* 3. MAIN SHOPPING AREA (Centered max-width with generous whitespace outside) */}
      <div className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* LEFT: Categories Sidebar (~210px Desktop) */}
          <aside className="hidden lg:block w-[210px] shrink-0 sticky top-4">
            <ShopSidebar
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
              selectedSubItem={selectedSubItem}
              onSelectSubItem={setSelectedSubItem}
            />
          </aside>

          {/* RIGHT: Product Content Area */}
          <main className="flex-1 w-full min-w-0 focus:outline-none" id="main-content" tabIndex={-1}>
            {/* MAIN PRODUCT HEADER (Compact Grocery Heading + Controls) */}
            <div className="bg-white rounded border border-[#E6E0D6] p-3 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-[#3C1518] leading-tight">
                    {selectedCategoryId === 'all'
                      ? 'Shop All Products'
                      : selectedSubItem
                      ? selectedSubItem
                      : currentCategory.name}
                  </h2>
                  <span className="text-xs text-[#3C1518]/60 font-medium">
                    ({filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'})
                  </span>
                </div>

                {/* Controls: Mobile Filter Button & Sort */}
                <div className="flex items-center gap-2.5 justify-between sm:justify-end">
                  {/* Mobile category toggle */}
                  <button
                    onClick={() => setMobileDrawerOpen(true)}
                    className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-[#FAF7F2] hover:bg-white text-[#3C1518] border border-[#D9D2C7] rounded cursor-pointer"
                    aria-label="Open categories filter"
                  >
                    <Filter className="w-3.5 h-3.5 text-[#C8102E]" />
                    <span>Categories</span>
                  </button>

                  {/* Active search filter badge */}
                  {searchQuery && (
                    <div className="hidden xs:flex items-center gap-1 text-[11px] bg-[#FDF2F4] text-[#C8102E] px-2 py-0.5 rounded font-medium">
                      <span>"{searchQuery}"</span>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="hover:text-[#3C1518] cursor-pointer"
                        aria-label="Clear search"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Sort selector */}
                  <div className="flex items-center gap-1.5 text-xs text-[#3C1518]/70 ml-auto">
                    <ArrowUpDown className="w-3 h-3 text-[#3C1518]/50" />
                    <label htmlFor="grocery-sort" className="hidden sm:inline-block">
                      Sort:
                    </label>
                    <select
                      id="grocery-sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="text-xs font-semibold text-[#3C1518] bg-[#FAF7F2] hover:bg-white border border-[#D9D2C7] focus:border-[#C8102E] rounded px-2 py-1 cursor-pointer focus:outline-hidden"
                    >
                      <option value="featured">Featured</option>
                      <option value="name-asc">Name A-Z</option>
                      <option value="name-desc">Name Z-A</option>
                      <option value="price-asc">Price Low to High</option>
                      <option value="price-desc">Price High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. DENSE 4-COLUMN PRODUCT GRID (Desktop 4 cols, Tablet 3 cols, Mobile 2 cols) */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
                {filteredProducts.map((product) => (
                  <ShopProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-white rounded border border-[#E6E0D6] p-8 text-center space-y-2">
                <p className="text-sm font-bold text-[#3C1518]">
                  {selectedCategoryId !== 'all' && !currentCategory.isAvailable
                    ? `${currentCategory.name} is arriving soon`
                    : 'No matching products found'}
                </p>
                <p className="text-xs text-[#3C1518]/65 max-w-sm mx-auto">
                  {selectedCategoryId !== 'all' && !currentCategory.isAvailable
                    ? 'We only list authentic, certified MAGIC products. Explore our core Dals & Lentils and Whole Spices.'
                    : `No products matched "${searchQuery}". Please check your spelling or clear filters.`}
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="py-1.5 px-3 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs font-bold rounded cursor-pointer transition-colors"
                  >
                    View All Products (6)
                  </button>
                </div>
              </div>
            )}

            {/* 11. GROCERY PAGINATION (Functional, ready for extensible catalogues) */}
            <div className="mt-6 bg-white rounded border border-[#E6E0D6] px-4 py-2.5 flex items-center justify-between text-xs text-[#3C1518]/70">
              <span>
                Showing 1–{filteredProducts.length} of {filteredProducts.length} products
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled
                  className="p-1 text-[#3C1518]/30 cursor-not-allowed rounded"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="w-6 h-6 rounded bg-[#C8102E] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <button
                  disabled
                  className="p-1 text-[#3C1518]/30 cursor-not-allowed rounded"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Categories Drawer */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Categories drawer"
        >
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-[#3C1518]/60 backdrop-blur-xs"
          />
          <div className="relative w-4/5 max-w-xs h-full bg-white z-10 shadow-xl">
            <ShopSidebar
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
              selectedSubItem={selectedSubItem}
              onSelectSubItem={setSelectedSubItem}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Shopping Basket Drawer */}
      <ShopCartDrawer isOpen={isCartOpen} onClose={closeCart} />

      {/* 13. FULL WIDTH DARK GROCERY FOOTER */}
      <ShopFooter
        onNavigateHome={onNavigateHome}
        onSelectCategory={setSelectedCategoryId}
        onNavigateRecipes={onNavigateRecipes}
        onNavigateBundles={onNavigateBundles}
        onNavigateImpact={onNavigateImpact}
        onNavigateNewsletter={onNavigateNewsletter}
      />
    </div>
  );
};
