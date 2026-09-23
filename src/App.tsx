/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MagicHeader } from './components/MagicHeader';
import { HeroScene } from './components/HeroScene';
import { SectionTrustStrip } from './components/SectionTrustStrip';
import { SectionExploreRange } from './components/SectionExploreRange';
import { SectionFeaturedProducts } from './components/SectionFeaturedProducts';
import { SectionBrandStory } from './components/SectionBrandStory';
import { SectionScrollStory } from './components/SectionScrollStory';
import { SectionCookWithMagic } from './components/SectionCookWithMagic';
import { SectionMagicBundles } from './components/SectionMagicBundles';
import { SectionSubscribeSave } from './components/SectionSubscribeSave';
import { SectionFinalCta } from './components/SectionFinalCta';
import { SectionFooter } from './components/SectionFooter';
import { ShopPage } from './components/shop/ShopPage';
import { ProductPage } from './components/product/ProductPage';
import { RecipesPage } from './components/recipes/RecipesPage';
import { BundlesPage } from './components/bundles/BundlesPage';
import { ImpactPage } from './components/impact/ImpactPage';
import { ShopCartDrawer } from './components/shop/ShopCartDrawer';
import { ShopCartProvider, useShopCart } from './context/ShopCartContext';

interface RouteState {
  page: 'shop' | 'home' | 'product' | 'recipes' | 'bundles' | 'impact';
  productSlug?: string;
  categoryId?: string;
  recipeSlug?: string;
  bundleSlug?: string;
}

function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { page: 'shop' };
  }

  const hash = window.location.hash || '';
  const pathname = window.location.pathname || '';

  // 1. Check Pathname first (e.g. /impact, /bundles/:slug, /bundles, /recipes/:slug, /recipes, /shop/product/:slug)
  if (pathname === '/impact' || pathname.startsWith('/impact/')) {
    return { page: 'impact' };
  }

  const bundlePathMatch = pathname.match(/^\/bundles\/?([^/?#]*)/i);
  if (bundlePathMatch) {
    const slug = bundlePathMatch[1]?.trim();
    return { page: 'bundles', bundleSlug: slug ? slug : undefined };
  }

  const recipePathMatch = pathname.match(/^\/recipes\/?([^/?#]*)/i);
  if (recipePathMatch) {
    const slug = recipePathMatch[1]?.trim();
    return { page: 'recipes', recipeSlug: slug ? slug : undefined };
  }

  const pathMatch = pathname.match(/^\/(?:shop\/product\/|product\/)([^/?#]+)/i);
  if (pathMatch) {
    return { page: 'product', productSlug: pathMatch[1] };
  }

  // 2. Check Hash patterns
  const cleanHash = hash.replace(/^#\/?/, '');

  if (cleanHash === 'impact' || cleanHash.startsWith('impact/')) {
    return { page: 'impact' };
  }

  if (cleanHash.startsWith('bundles')) {
    const bundleSlug = cleanHash.replace(/^bundles\/?/, '').trim();
    return { page: 'bundles', bundleSlug: bundleSlug ? bundleSlug : undefined };
  }

  if (cleanHash.startsWith('recipes')) {
    const recipeSlug = cleanHash.replace(/^recipes\/?/, '').trim();
    return { page: 'recipes', recipeSlug: recipeSlug ? recipeSlug : undefined };
  }

  // Match /shop/product/:slug or #shop/product/:slug or #product/:slug or direct slugs
  const hashProductMatch = cleanHash.match(
    /^(?:shop\/product\/|product\/)?(magic-[a-z0-9-]+|toor-dal|masoor-dal|moong-whole|urad-whole|haldi|jeera)$/i
  );
  if (hashProductMatch) {
    return { page: 'product', productSlug: hashProductMatch[1] };
  }

  if (cleanHash === 'home') {
    return { page: 'home' };
  }

  // Check category hash if any e.g. #shop/dals-lentils
  if (cleanHash.startsWith('shop/')) {
    const cat = cleanHash.replace(/^shop\//, '');
    return { page: 'shop', categoryId: cat };
  }

  if (cleanHash === 'shop') {
    return { page: 'shop' };
  }

  return { page: 'shop' };
}

function MainAppContent() {
  const [routeState, setRouteState] = useState<RouteState>(() => parseCurrentRoute());
  const { totalItems, openCart, isCartOpen, closeCart } = useShopCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync hash/history with page state
  useEffect(() => {
    const handleRouteChange = () => {
      setRouteState(parseCurrentRoute());
    };
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const handleNavigateShop = (categoryId?: string) => {
    setRouteState({ page: 'shop', categoryId });
    window.location.hash = categoryId ? `#shop/${categoryId}` : '#shop';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setRouteState({ page: 'home' });
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateRecipes = (recipeSlug?: string) => {
    setRouteState({ page: 'recipes', recipeSlug });
    window.location.hash = recipeSlug ? `#recipes/${recipeSlug}` : '#recipes';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateBundles = (bundleSlug?: string) => {
    setRouteState({ page: 'bundles', bundleSlug });
    window.location.hash = bundleSlug ? `#bundles/${bundleSlug}` : '#bundles';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateImpact = () => {
    setRouteState({ page: 'impact' });
    window.location.hash = '#impact';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateProduct = (productSlug: string) => {
    const targetSlug = productSlug.startsWith('magic-') ? productSlug : `magic-${productSlug}`;
    setRouteState({ page: 'product', productSlug: targetSlug });
    window.location.hash = `#shop/product/${targetSlug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (productName: string) => {
    setToastMessage(`Added "${productName}" to sample inquiry bag`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleShopAllClick = () => {
    handleNavigateShop();
  };

  return (
    <>
      {routeState.page === 'product' ? (
        /* REUSABLE DYNAMIC SINGLE PRODUCT PAGE */
        <ProductPage
          productSlug={routeState.productSlug}
          onNavigateHome={handleNavigateHome}
          onNavigateShop={handleNavigateShop}
          onSelectProduct={handleNavigateProduct}
        />
      ) : routeState.page === 'recipes' ? (
        /* RECIPES DISCOVERY & DETAIL PAGE */
        <RecipesPage
          recipeSlug={routeState.recipeSlug}
          onNavigateHome={handleNavigateHome}
          onNavigateShop={handleNavigateShop}
          onNavigateRecipes={handleNavigateRecipes}
          onSelectProduct={handleNavigateProduct}
        />
      ) : routeState.page === 'bundles' ? (
        /* BUNDLES COLLECTION & DETAIL PAGE */
        <BundlesPage
          bundleSlug={routeState.bundleSlug}
          onNavigateHome={handleNavigateHome}
          onNavigateShop={handleNavigateShop}
          onNavigateRecipes={handleNavigateRecipes}
          onNavigateBundles={handleNavigateBundles}
          onNavigateImpact={handleNavigateImpact}
          onSelectProduct={handleNavigateProduct}
        />
      ) : routeState.page === 'impact' ? (
        /* IMPACT STORY PAGE: FROM FARM TO MAGIC */
        <ImpactPage
          onNavigateHome={handleNavigateHome}
          onNavigateShop={handleNavigateShop}
          onNavigateRecipes={handleNavigateRecipes}
          onNavigateBundles={handleNavigateBundles}
          onNavigateImpact={handleNavigateImpact}
          onSelectProduct={handleNavigateProduct}
        />
      ) : routeState.page === 'shop' ? (
        /* SHOP PAGE */
        <ShopPage
          onNavigateHome={handleNavigateHome}
          onSelectProduct={handleNavigateProduct}
          initialCategoryId={routeState.categoryId}
          onNavigateRecipes={handleNavigateRecipes}
          onNavigateBundles={handleNavigateBundles}
          onNavigateImpact={handleNavigateImpact}
        />
      ) : (
        /* APPROVED HOME PAGE (Untouched sections 1 to 11) */
        <div className="min-h-screen bg-[#FDF6EC] text-[#3C1518] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white relative">
          {/* Interactive feedback toast */}
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

          {/* TOP NAVIGATION BAR */}
          <MagicHeader
            cartCount={totalItems}
            onNavigateShop={() => handleNavigateShop()}
            onNavigateRecipes={() => handleNavigateRecipes()}
            onNavigateBundles={() => handleNavigateBundles()}
            onNavigateImpact={() => handleNavigateImpact()}
            onOpenCart={openCart}
          />

          {/* HOMEPAGE SECTIONS 1 TO 11 IN EXACT RHYTHMIC ORDER */}
          <main className="flex-1 flex flex-col">
            {/* SECTION 1 — HERO SCENE */}
            <HeroScene onAddToCart={handleAddToCart} />

            {/* SECTION 2 — TRUST / BRAND BENEFITS */}
            <SectionTrustStrip />

            {/* SECTION 3 — EXPLORE OUR RANGE */}
            <SectionExploreRange />

            {/* SECTION 4 — FEATURED PRODUCTS */}
            <SectionFeaturedProducts onAddToCart={handleAddToCart} />

            {/* SECTION 5 — BRAND STORY */}
            <SectionBrandStory />

            {/* SECTION 6 — SCROLL-DRIVEN PRODUCT STORY */}
            <SectionScrollStory onAddToCart={handleAddToCart} />

            {/* SECTION 7 — COOK WITH MAGIC */}
            <SectionCookWithMagic onAddToCart={handleAddToCart} />

            {/* SECTION 8 — MAGIC BUNDLES */}
            <SectionMagicBundles onAddToCart={handleAddToCart} />

            {/* SECTION 9 — SUBSCRIBE & SAVE */}
            <SectionSubscribeSave onAddToCart={handleAddToCart} />

            {/* SECTION 10 — FINAL CTA + NEWSLETTER */}
            <SectionFinalCta onShopClick={handleShopAllClick} />
          </main>

          {/* SECTION 11 — FOOTER */}
          <SectionFooter />

          {/* Cart Drawer for Home */}
          <ShopCartDrawer isOpen={isCartOpen} onClose={closeCart} />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <ShopCartProvider>
      <MainAppContent />
    </ShopCartProvider>
  );
}
