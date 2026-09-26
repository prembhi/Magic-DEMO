import React, { useState } from 'react';
import { MagicHeader } from '../MagicHeader';
import { SectionFooter } from '../SectionFooter';
import { ShopCartDrawer } from '../shop/ShopCartDrawer';
import { useShopCart } from '../../context/ShopCartContext';

import { HomeHero } from './HomeHero';
import { HomeBenefitStrip } from './HomeBenefitStrip';
import { HomeFavourites } from './HomeFavourites';
import { HomeBundles } from './HomeBundles';
import { HomeBrandStatement } from './HomeBrandStatement';
import { HomeCookWithMagic } from './HomeCookWithMagic';
import { HomeFarmProvenance } from './HomeFarmProvenance';
import { HomeWhyMagic } from './HomeWhyMagic';
import { HomeSourcingMap } from './HomeSourcingMap';
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

      {/* REBUILT EDITORIAL ECOMMERCE HOMEPAGE (10-SECTION RHYTHM) */}
      <main className="flex-1 flex flex-col focus:outline-none" id="main-content" tabIndex={-1}>
        {/* 01. HERO (2.5D Depth Composition + Authentic Packaging + Editorial Headlines) */}
        <HomeHero
          onExplorePantry={() => scrollToSection('favourites')}
          onDiscoverStory={() => scrollToSection('farm-to-kitchen')}
          onSelectProduct={onSelectProduct}
        />

        {/* 02. BENEFIT STRIP (Single Origin · Farm Sourced · Fresh Harvest · Unadulterated) */}
        <HomeBenefitStrip />

        {/* 03. MAGIC FAVOURITES (Editorial Split + Canonical ShopProductCards) */}
        <HomeFavourites
          onNavigateShop={() => onNavigateShop()}
          onSelectProduct={onSelectProduct}
        />

        {/* 04. BUILD YOUR MAGIC PANTRY (Recipe-Based Curated Pantry Sets) */}
        <HomeBundles
          onNavigateBundles={onNavigateBundles}
          onSelectProduct={onSelectProduct}
        />

        {/* 05. BRAND STATEMENT (Pure Ingredients · Real Origins · Magic in Every Pinch) */}
        <HomeBrandStatement
          onNavigateImpact={onNavigateImpact}
          onExplorePantry={() => onNavigateShop()}
        />

        {/* 06. COOK WITH MAGIC (Mixed Photography + Culinary Illustrations + Recipe Cards) */}
        <HomeCookWithMagic
          onNavigateRecipes={onNavigateRecipes}
          onSelectProduct={onSelectProduct}
        />

        {/* 07. FROM INDIAN FARMS TO YOUR MAGIC PANTRY (Intro + 2.5D Landscape Banner) */}
        <HomeFarmProvenance
          onNavigateImpact={onNavigateImpact}
        />

        {/* 08. WHAT SETS MAGIC APART (Editorial Sourcing Model Comparison Table) */}
        <HomeWhyMagic />

        {/* 09. WHERE MAGIC BEGINS (India Sourcing Map + Connected Harvest Product) */}
        <HomeSourcingMap
          onSelectProduct={onSelectProduct}
        />

        {/* 10. FREQUENTLY ASKED QUESTIONS (Hand-Drawn Bee & Flowers + Accessible Accordion) */}
        <HomeFaq />

        {/* 11. COMMUNITY & HARVEST DISPATCH (Brand Newsletter Subscription) */}
        <HomeCommunity />
      </main>

      {/* 11. FOOTER (Preserved approved Deep Maroon Agricultural Footer) */}
      <SectionFooter />

      {/* CART DRAWER */}
      <ShopCartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
};
