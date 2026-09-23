import React, { useState, useMemo, useEffect } from 'react';
import {
  ChevronRight,
  Filter,
  Sparkles,
  ArrowUpDown,
  ShoppingBag,
} from 'lucide-react';
import {
  HYDRATED_BUNDLES,
  HydratedBundle,
  BundleCategory,
  BundleMainUse,
  findBundle,
} from '../../data/bundles';
import { ShopHeader } from '../shop/ShopHeader';
import { ShopFooter } from '../shop/ShopFooter';
import { ShopCartDrawer } from '../shop/ShopCartDrawer';
import { useShopCart } from '../../context/ShopCartContext';
import { BundleCard } from './BundleCard';
import { BundleFilterSidebar, BundleFilterState } from './BundleFilterSidebar';
import { BundleDetailPage } from './BundleDetailPage';
import { BundlePromoSection } from './BundlePromoSection';
import { BundleFaqSection } from './BundleFaqSection';
import { ProductNewsletter } from '../product/ProductNewsletter';

interface BundlesPageProps {
  bundleSlug?: string;
  onNavigateHome: () => void;
  onNavigateShop: (categoryId?: string) => void;
  onNavigateRecipes: (recipeSlug?: string) => void;
  onNavigateBundles: (bundleSlug?: string) => void;
  onNavigateImpact?: () => void;
  onSelectProduct: (productSlug: string) => void;
}

type CategoryTab = 'ALL' | 'DAL ESSENTIALS' | 'SPICE PAIRINGS' | 'STARTER KITS' | 'FAMILY BUNDLES';

const CATEGORY_TABS: CategoryTab[] = [
  'ALL',
  'DAL ESSENTIALS',
  'SPICE PAIRINGS',
  'STARTER KITS',
  'FAMILY BUNDLES',
];

type SortOption =
  | 'Featured'
  | 'Name A-Z'
  | 'Name Z-A'
  | 'Price Low to High'
  | 'Price High to Low';

export const BundlesPage: React.FC<BundlesPageProps> = ({
  bundleSlug,
  onNavigateHome,
  onNavigateShop,
  onNavigateRecipes,
  onNavigateBundles,
  onNavigateImpact,
  onSelectProduct,
}) => {
  const { totalItems, isCartOpen, closeCart } = useShopCart();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState<CategoryTab>('ALL');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('Featured');

  const [filters, setFilters] = useState<BundleFilterState>({
    bundleTypes: [],
    mainUses: [],
    includes: [],
    availability: [],
  });

  // Handle active detail bundle if slug is in URL
  const activeDetailBundle = useMemo(() => {
    return findBundle(bundleSlug);
  }, [bundleSlug]);

  const handleClearFilters = () => {
    setFilters({
      bundleTypes: [],
      mainUses: [],
      includes: [],
      availability: [],
    });
    setActiveCategoryTab('ALL');
    setSearchQuery('');
  };

  const handleCategoryTabClick = (tab: CategoryTab) => {
    setActiveCategoryTab(tab);
    if (tab === 'ALL') {
      setFilters((prev) => ({ ...prev, bundleTypes: [] }));
    } else {
      const typeMap: Record<string, BundleCategory> = {
        'DAL ESSENTIALS': 'Dal Essentials',
        'SPICE PAIRINGS': 'Spice Pairings',
        'STARTER KITS': 'Starter Kits',
        'FAMILY BUNDLES': 'Family Bundles',
      };
      const cat = typeMap[tab];
      if (cat) {
        setFilters((prev) => ({ ...prev, bundleTypes: [cat] }));
      }
    }
  };

  // Filtered and sorted bundles
  const filteredBundles = useMemo(() => {
    return HYDRATED_BUNDLES.filter((bundle) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = bundle.name.toLowerCase().includes(q);
        const matchesDesc = bundle.description.toLowerCase().includes(q);
        const matchesItems = bundle.products.some((p) => p.name.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesItems) return false;
      }

      // 2. Category Tab (if not ALL)
      if (activeCategoryTab !== 'ALL') {
        const tabLower = activeCategoryTab.toLowerCase();
        if (bundle.category.toLowerCase() !== tabLower) return false;
      }

      // 3. Bundle Types Filter
      if (filters.bundleTypes.length > 0) {
        if (!filters.bundleTypes.includes(bundle.category)) return false;
      }

      // 4. Main Use Filter
      if (filters.mainUses.length > 0) {
        if (!filters.mainUses.includes(bundle.mainUse)) return false;
      }

      // 5. Includes Products Filter
      if (filters.includes.length > 0) {
        // e.g. 'Toor Dal' -> checks if any product name includes 'Toor Dal'
        const hasAllSelected = filters.includes.every((inc) =>
          bundle.products.some((p) => p.name.toLowerCase().includes(inc.toLowerCase()))
        );
        if (!hasAllSelected) return false;
      }

      // 6. Availability Filter
      if (filters.availability.length > 0) {
        if (!filters.availability.includes(bundle.status)) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortOption) {
        case 'Name A-Z':
          return a.name.localeCompare(b.name);
        case 'Name Z-A':
          return b.name.localeCompare(a.name);
        case 'Price Low to High':
          return a.price - b.price;
        case 'Price High to Low':
          return b.price - a.price;
        case 'Featured':
        default:
          return a.featuredOrder - b.featuredOrder;
      }
    });
  }, [searchQuery, activeCategoryTab, filters, sortOption]);

  const handleSelectBundle = (slug: string) => {
    onNavigateBundles(slug);
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] text-[#3C1518] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white">
      {/* 1. TOP HEADER WITH REAL SEARCH AND CART */}
      <ShopHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateHome={onNavigateHome}
        onNavigateShop={() => onNavigateShop()}
        onNavigateRecipes={() => onNavigateRecipes()}
        onNavigateBundles={() => onNavigateBundles()}
        onNavigateImpact={onNavigateImpact}
      />

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 w-full flex flex-col">
        {activeDetailBundle ? (
          /* BUNDLE DETAIL VIEW (/bundles/:slug) */
          <BundleDetailPage
            bundle={activeDetailBundle}
            onNavigateHome={onNavigateHome}
            onNavigateShop={() => onNavigateShop()}
            onNavigateRecipes={() => onNavigateRecipes()}
            onNavigateBundles={onNavigateBundles}
            onSelectBundle={handleSelectBundle}
            onSelectProduct={onSelectProduct}
          />
        ) : (
          /* BUNDLES COLLECTION CATALOG VIEW (/bundles) */
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
            {/* Breadcrumb */}
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
                <li>
                  <button
                    onClick={() => onNavigateShop()}
                    className="hover:text-[#C8102E] transition-colors cursor-pointer"
                  >
                    Shop
                  </button>
                </li>
                <li>
                  <ChevronRight className="w-3 h-3 text-[#3C1518]/30 inline" />
                </li>
                <li aria-current="page">
                  <span className="font-semibold text-[#3C1518]">Bundles</span>
                </li>
              </ol>
            </nav>

            {/* 1. PAGE INTRO (Compact, does not push grid far below fold) */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[#E6E0D6] text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8102E] mb-2 shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#D4A843]" />
                <span>MAGIC PANTRY</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#3C1518] tracking-tight leading-none mb-2">
                BUNDLES
              </h1>
              <p className="text-base sm:text-lg font-serif italic text-[#D4A843] mb-2">
                Curated for the way you cook.
              </p>
              <p className="text-xs sm:text-sm text-[#3C1518]/75 leading-relaxed font-sans max-w-xl mx-auto">
                Bring everyday Indian kitchen staples together with thoughtfully curated MAGIC bundles for dals, tadkas, family meals and more.
              </p>
            </div>

            {/* 2. CATEGORY NAVIGATION (Horizontal Tabs) */}
            <div className="flex items-center justify-between gap-4 border-b border-[#3C1518]/15 pb-4 mb-6">
              <div
                role="tablist"
                aria-label="Bundle categories"
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
                      onClick={() => handleCategoryTabClick(tab)}
                      className={`px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xs transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-[#C8102E] text-white shadow-2xs'
                          : 'bg-white hover:bg-white/80 text-[#3C1518]/75 hover:text-[#3C1518] border border-[#E6E0D6]'
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

            {/* SORTING & RESULT COUNT BAR */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-2 text-xs text-[#3C1518]/70">
              <span className="font-mono font-semibold">
                {filteredBundles.length} {filteredBundles.length === 1 ? 'bundle' : 'bundles'}
              </span>

              <div className="flex items-center gap-2">
                <span className="font-mono uppercase tracking-wider text-[11px] hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="bg-white border border-[#D9CEBA] text-xs text-[#3C1518] font-medium rounded-xs px-2.5 py-1.5 cursor-pointer focus:outline-hidden focus:border-[#C8102E]"
                >
                  <option value="Featured">Featured</option>
                  <option value="Name A-Z">Name A-Z</option>
                  <option value="Name Z-A">Name Z-A</option>
                  <option value="Price Low to High">Price Low to High</option>
                  <option value="Price High to Low">Price High to Low</option>
                </select>
              </div>
            </div>

            {/* 3 & 4. SIDEBAR + BUNDLE COLLECTION GRID */}
            <div className="flex items-start gap-8 lg:gap-10 mb-14">
              {/* Desktop Filter Sidebar */}
              <BundleFilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={handleClearFilters}
                isOpenMobile={isMobileFilterOpen}
                onCloseMobile={() => setIsMobileFilterOpen(false)}
                totalFilteredCount={filteredBundles.length}
              />

              {/* Bundle Cards Grid */}
              <div className="flex-1 flex flex-col min-w-0">
                {filteredBundles.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                    {filteredBundles.map((bundle) => (
                      <BundleCard
                        key={bundle.id}
                        bundle={bundle}
                        onSelectBundle={handleSelectBundle}
                        onSelectProduct={onSelectProduct}
                      />
                    ))}
                  </div>
                ) : (
                  /* Empty state */
                  <div className="py-20 text-center bg-white rounded-xs border border-[#E6E0D6] p-8 max-w-md mx-auto">
                    <Sparkles className="w-8 h-8 text-[#D4A843] mx-auto mb-3" />
                    <h2 className="text-lg font-serif font-bold text-[#3C1518] mb-1">
                      No Bundles Found
                    </h2>
                    <p className="text-xs text-[#3C1518]/70 mb-4 leading-relaxed font-sans">
                      We couldn't find any bundles matching your active filter combination.
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
              </div>
            </div>

            {/* 12. PROMOTIONAL SECTION (BUILD YOUR MAGIC PANTRY) */}
            <BundlePromoSection
              onShopClick={() => onNavigateShop()}
              onRecipesClick={() => onNavigateRecipes()}
            />

            {/* 13. FAQ SECTION */}
            <BundleFaqSection />

            {/* 14. NEWSLETTER */}
            <ProductNewsletter />
          </div>
        )}
      </main>

      {/* 15. APPROVED FOOTER */}
      <ShopFooter
        onNavigateHome={onNavigateHome}
        onSelectCategory={(id) => onNavigateShop(id)}
        onNavigateRecipes={() => onNavigateRecipes()}
        onNavigateBundles={() => onNavigateBundles()}
        onNavigateImpact={onNavigateImpact}
      />

      {/* Cart Drawer */}
      <ShopCartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
};
