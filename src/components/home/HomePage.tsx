import React, { useState } from 'react';
import { MagicHeader } from '../MagicHeader';
import { SectionFooter } from '../SectionFooter';
import { ShopCartDrawer } from '../shop/ShopCartDrawer';
import { useShopCart } from '../../context/ShopCartContext';

import { HomeHero } from './HomeHero';
import { HomeBenefitStrip } from './HomeBenefitStrip';
import { HomeFavourites } from './HomeFavourites';
import { HomeCookWithMagic } from './HomeCookWithMagic';
import { HomeFarmProvenance } from './HomeFarmProvenance';
import { HomeWhyMagic } from './HomeWhyMagic';
import { HomeFaq } from './HomeFaq';
import { HomeCommunity } from './HomeCommunity';

interface HomePageProps {
  onNavigateHome: () => void;
  onNavigateShop: (catId?: string) => void;
  onNavigateRecipes: (recipeSlug?: string) => void;
  onNavigateBundles: (bundleSlug?: string) => void;
  onNavigateImpact: () => void;
  onNavigateNewsletter: () => void;
  onSelectProduct: (productSlug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateHome,
  onNavigateShop,
  onNavigateRecipes,
  onNavigateBundles,
  onNavigateImpact,
  onNavigateNewsletter,
  onSelectProduct,
}) => {
  const { totalItems, isCartOpen, openCart, closeCart } = useShopCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] text-[#3C1518] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white relative">
      {/* FEEDBACK TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-24 right-6 z-50 bg-[#3C1518] text-[#FDF6EC] px-4 py-2.5 rounded-lg shadow-xl border border-[#D4A843]/40 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP NAVIGATION BAR (Overlay on hero, transitions to solid Magic Red on scroll) */}
      <MagicHeader
        overlayHero={true}
        cartCount={totalItems}
        onNavigateHome={onNavigateHome}
        onNavigateShop={() => onNavigateShop()}
        onNavigateRecipes={() => onNavigateRecipes()}
        onNavigateBundles={() => onNavigateBundles()}
        onNavigateImpact={() => onNavigateImpact()}
        onNavigateNewsletter={() => onNavigateNewsletter()}
        onSelectProduct={onSelectProduct}
        onOpenCart={openCart}
      />

      {/* CONSOLIDATED EDITORIAL ECOMMERCE HOMEPAGE (STRICT 7-SECTION STRUCTURE) */}
      <main className="flex-1 flex flex-col focus:outline-none" id="main-content" tabIndex={-1}>
        {/* 01. HERO + BRAND BENEFITS (Hero + compact single-origin standards strip) */}
        <HomeHero
          onExplorePantry={() => scrollToSection('favourites')}
          onDiscoverStory={() => scrollToSection('farm-to-kitchen')}
          onSelectProduct={onSelectProduct}
        />
        <HomeBenefitStrip />

        {/* 02. KITCHEN FAVOURITES (Hero product showcase with large packaging & immediate add-to-cart) */}
        <HomeFavourites
          onNavigateShop={() => onNavigateShop()}
          onSelectProduct={onSelectProduct}
        />

        {/* 03. COOK SOMETHING MAGIC (Unified recipe experience: 1 large featured spread + 2 supporting recipes) */}
        <HomeCookWithMagic
          onNavigateRecipes={onNavigateRecipes}
          onSelectProduct={onSelectProduct}
        />

        {/* 04. FROM INDIAN FARMS TO YOUR MAGIC PANTRY (Unified sourcing: editorial field spread + interactive India atlas) */}
        <HomeFarmProvenance
          onNavigateImpact={onNavigateImpact}
          onSelectProduct={onSelectProduct}
        />

        {/* 05. WHAT SETS MAGIC APART (Editorial Sourcing Model & Lab-Tested Purity Comparison) */}
        <HomeWhyMagic />

        {/* 06. FREQUENTLY ASKED QUESTIONS (Clear, accessible questions on sourcing, delivery & storage) */}
        <HomeFaq />

        {/* 07. FINAL CTA & HARVEST DISPATCH (Single clean newsletter signup experience) */}
        <HomeCommunity />
      </main>

      {/* 11. FOOTER (Preserved approved Deep Maroon Agricultural Footer) */}
      <SectionFooter />

      {/* CART DRAWER */}
      <ShopCartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
};
