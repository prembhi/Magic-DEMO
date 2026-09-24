import React from 'react';
import { Home, ShoppingBag, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { MagicHeader } from './MagicHeader';
import { SectionFooter } from './SectionFooter';
import { MAGIC_ASSETS } from '../constants/assets';
import { useShopCart } from '../context/ShopCartContext';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateRecipes: () => void;
  onNavigateBundles?: () => void;
  onNavigateImpact?: () => void;
  onNavigateNewsletter?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onNavigateShop,
  onNavigateRecipes,
  onNavigateBundles,
  onNavigateImpact,
  onNavigateNewsletter,
}) => {
  const { totalItems, openCart } = useShopCart();

  return (
    <div className="min-h-screen bg-[#FDF6EC] text-[#3C1518] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white">
      {/* HEADER */}
      <MagicHeader
        cartCount={totalItems}
        onNavigateHome={onNavigateHome}
        onNavigateShop={onNavigateShop}
        onNavigateRecipes={onNavigateRecipes}
        onNavigateBundles={onNavigateBundles}
        onNavigateImpact={onNavigateImpact}
        onNavigateNewsletter={onNavigateNewsletter}
        onOpenCart={openCart}
      />

      {/* 404 ERROR HERO */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 lg:py-28 focus:outline-hidden"
      >
        <div className="relative max-w-xl mx-auto flex flex-col items-center">
          {/* Subtle packaging silhouette */}
          <div className="w-24 h-24 mb-6 opacity-75 animate-bounce">
            <img
              src={MAGIC_ASSETS.toor}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>

          <span className="font-mono text-xs text-[#C8102E] uppercase tracking-[0.25em] font-bold mb-3">
            ERROR 404
          </span>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#3C1518] tracking-tight leading-tight mb-4">
            THIS PANTRY SHELF IS EMPTY.
          </h1>

          <p className="text-sm sm:text-base text-[#3C1518]/75 max-w-md mx-auto leading-relaxed font-normal mb-8">
            The page or spice blend you are looking for does not exist or has been moved to a new section of our pantry.
          </p>

          {/* HELPFUL NAVIGATION CTAS */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onNavigateHome}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#C8102E] hover:bg-[#A60D26] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Home className="w-4 h-4" />
              <span>RETURN HOME</span>
            </button>

            <button
              type="button"
              onClick={onNavigateShop}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF5EE] text-[#3C1518] border border-[#3C1518]/25 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4 text-[#C8102E]" />
              <span>EXPLORE SHOP</span>
            </button>

            <button
              type="button"
              onClick={onNavigateRecipes}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF5EE] text-[#3C1518] border border-[#3C1518]/25 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
            >
              <UtensilsCrossed className="w-4 h-4 text-[#D4A843]" />
              <span>VIEW RECIPES</span>
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <SectionFooter />
    </div>
  );
};
