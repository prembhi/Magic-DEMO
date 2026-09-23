import React, { useState } from 'react';
import { Search, ShoppingBag, MapPin, Globe, ChevronDown, Clock, ShieldCheck, X } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useShopCart } from '../../context/ShopCartContext';

interface ShopHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateHome: () => void;
  onNavigateRecipes?: () => void;
  onNavigateShop?: () => void;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onNavigateHome,
  onNavigateRecipes,
  onNavigateShop,
}) => {
  const { totalItems, subtotal, openCart } = useShopCart();
  const [selectedRegion, setSelectedRegion] = useState<'UAE' | 'USA'>('UAE');
  const [selectedLang, setSelectedLang] = useState<'English' | 'العربية'>('English');

  const handleRecipesClick = () => {
    if (onNavigateRecipes) {
      onNavigateRecipes();
    } else {
      window.location.hash = '#recipes';
    }
  };

  const handleShopClick = () => {
    if (onNavigateShop) {
      onNavigateShop();
    } else {
      window.location.hash = '#shop';
    }
  };

  return (
    <header className="w-full bg-[#FAF7F2] border-b border-[#E6E0D6] text-[#3C1518]">
      {/* ROW 1: TOP UTILITY ROW (Compact marketplace navbar) */}
      <div className="border-b border-[#E6E0D6]/80 bg-white">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4 text-xs">
          {/* Left: Brand Logo & Navigation */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded py-0.5"
              title="Return to MAGIC Brand Homepage"
              aria-label="MAGIC Home"
            >
              <img
                src={MAGIC_ASSETS.logo}
                alt="MAGIC"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </button>
            <span className="hidden md:inline-block text-[#3C1518]/30">|</span>
            <button
              onClick={onNavigateHome}
              className="hidden md:inline-flex text-[11px] font-semibold text-[#3C1518]/70 hover:text-[#C8102E] transition-colors cursor-pointer"
            >
              Brand Homepage
            </button>
            <span className="hidden sm:inline-block text-[#3C1518]/30">|</span>
            <button
              onClick={handleShopClick}
              className="hidden sm:inline-flex text-[11px] font-semibold text-[#3C1518]/70 hover:text-[#C8102E] transition-colors cursor-pointer"
            >
              Shop
            </button>
            <span className="hidden sm:inline-block text-[#3C1518]/30">|</span>
            <button
              onClick={handleRecipesClick}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C8102E] hover:underline transition-colors cursor-pointer"
            >
              <span>Recipes</span>
            </button>
          </div>

          {/* Center: Search Field (Dense Grocery Input) */}
          <div className="flex-1 max-w-md mx-2 hidden sm:block">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search in MAGIC store..."
                className="w-full pl-8 pr-7 py-1.5 bg-[#FAF7F2] hover:bg-white focus:bg-white text-xs text-[#3C1518] placeholder-[#3C1518]/50 border border-[#D9D2C7] focus:border-[#C8102E] focus:outline-hidden rounded transition-all"
                aria-label="Search spices and dals"
              />
              <Search className="w-3.5 h-3.5 text-[#3C1518]/50 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#3C1518]/40 hover:text-[#C8102E] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Region, Language & Quick Cart */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Region selector */}
            <button
              onClick={() => setSelectedRegion((r) => (r === 'UAE' ? 'USA' : 'UAE'))}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#3C1518]/80 hover:text-[#C8102E] cursor-pointer"
              title="Change Delivery Region"
            >
              <MapPin className="w-3 h-3 text-[#C8102E]" />
              <span>{selectedRegion}</span>
              <ChevronDown className="w-2.5 h-2.5 text-[#3C1518]/50" />
            </button>

            {/* Language toggle */}
            <button
              onClick={() => setSelectedLang((l) => (l === 'English' ? 'العربية' : 'English'))}
              className="hidden xs:inline-flex items-center gap-1 text-[11px] font-medium text-[#3C1518]/80 hover:text-[#C8102E] cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3 h-3 text-[#3C1518]/50" />
              <span>{selectedLang}</span>
            </button>

            {/* Header Basket Trigger */}
            <button
              onClick={openCart}
              className="inline-flex items-center gap-2 py-1 px-2.5 bg-[#C8102E] hover:bg-[#A60D26] text-white rounded text-xs font-bold transition-colors cursor-pointer shadow-xs"
              aria-label={`Open Basket with ${totalItems} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="font-mono">AED {subtotal.toFixed(2)}</span>
              {totalItems > 0 && (
                <span className="bg-white text-[#C8102E] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ROW 2: STORE DETAILS ROW (Matches Talabat Grocery Store Block) */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-3.5 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Store Branding Block */}
          <div className="flex items-center gap-3">
            {/* Store Avatar Thumbnail */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded border border-[#E6E0D6] p-1 shadow-2xs shrink-0 flex items-center justify-center">
              <img
                src={MAGIC_ASSETS.logo}
                alt="MAGIC Store"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Store Information */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-[#3C1518] leading-tight">
                  MAGIC
                </h1>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-2xs text-[10px] font-bold bg-[#E8F3E6] text-[#2B6E2A]">
                  <ShieldCheck className="w-3 h-3" />
                  Direct Exporter
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#3C1518]/70 mt-0.5">
                Authentic Indian Spices, Dals & FMCG Staples • UAE Express
              </p>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-[#3C1518]/60">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C8102E]" />
                  <span>30–45 mins</span>
                </span>
                <span>•</span>
                <span>Min. order AED 20.00</span>
                <span>•</span>
                <span className="text-[#2B6E2A] font-semibold">Free delivery above AED 50</span>
              </div>
            </div>
          </div>

          {/* Mobile search row */}
          <div className="sm:hidden w-full pt-1">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search in MAGIC store..."
                className="w-full pl-8 pr-7 py-1.5 bg-white text-xs text-[#3C1518] placeholder-[#3C1518]/50 border border-[#D9D2C7] focus:border-[#C8102E] rounded"
              />
              <Search className="w-3.5 h-3.5 text-[#3C1518]/50 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
