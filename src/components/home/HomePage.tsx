import React, { useState } from 'react';
import { MagicHeader } from '../MagicHeader';
import { SectionFooter } from '../SectionFooter';
import { ShopCartDrawer } from '../shop/ShopCartDrawer';
import { useShopCart } from '../../context/ShopCartContext';
import { HomeHero } from './HomeHero';
import { HomeFarmStory } from './HomeFarmStory';
import { HomeProductShowcase } from './HomeProductShowcase';
import { HomeBundles } from './HomeBundles';
import { HomeRecipes } from './HomeRecipes';
import { HomeSubscribe } from './HomeSubscribe';
import { HomeFinalStatement } from './HomeFinalStatement';

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

  const handleAddToCart = (productName: string) => {
    setToastMessage(`Added "${productName}" to sample inquiry bag`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

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

      {/* TOP NAVIGATION BAR (Preserved approved UAE Header) */}
      <MagicHeader
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

      {/* EDITORIAL HOMEPAGE ARCHITECTURE (7 MEANINGFUL EXPERIENCES) */}
      <main className="flex-1 flex flex-col focus:outline-none" id="main-content" tabIndex={-1}>
        {/* 01 HERO */}
        <HomeHero
          onExplorePantry={() => scrollToSection('pantry')}
          onDiscoverStory={() => scrollToSection('farm-to-kitchen')}
          onSelectProduct={onSelectProduct}
        />

        {/* 02 FROM FARM TO KITCHEN */}
        <HomeFarmStory onNavigateImpact={onNavigateImpact} />

        {/* 03 THE MAGIC PANTRY */}
        <HomeProductShowcase
          onNavigateShop={() => onNavigateShop()}
          onSelectProduct={onSelectProduct}
        />

        {/* 04 BUILD YOUR MAGIC PANTRY (BUNDLES) */}
        <HomeBundles
          onNavigateBundles={onNavigateBundles}
          onSelectProduct={onSelectProduct}
        />

        {/* 05 COOK WITH MAGIC (RECIPES) */}
        <HomeRecipes
          onNavigateRecipes={onNavigateRecipes}
          onSelectProduct={onSelectProduct}
        />

        {/* 06 NEVER RUN OUT OF MAGIC (SUBSCRIBE & SAVE) */}
        <HomeSubscribe
          onNavigateShop={() => onNavigateShop()}
          onSelectProduct={onSelectProduct}
        />

        {/* 07 FINAL BRAND STATEMENT */}
        <HomeFinalStatement
          onNavigateImpact={onNavigateImpact}
          onExplorePantry={() => onNavigateShop()}
        />
      </main>

      {/* 08 FOOTER (Preserved approved MAGIC Footer) */}
      <SectionFooter />

      {/* CART DRAWER */}
      <ShopCartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
};
