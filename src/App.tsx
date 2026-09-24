/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/shop/ShopPage';
import { ProductPage } from './components/product/ProductPage';
import { RecipesPage } from './components/recipes/RecipesPage';
import { BundlesPage } from './components/bundles/BundlesPage';
import { ImpactPage } from './components/impact/ImpactPage';
import { NewsletterPage } from './components/newsletter/NewsletterPage';
import { NotFoundPage } from './components/NotFoundPage';
import { ShopCartProvider, useShopCart } from './context/ShopCartContext';
import { LanguageProvider } from './context/LanguageContext';
import { updatePageMetadata } from './utils/seo';
import { SHOP_PRODUCTS } from './data/shopProducts';

interface RouteState {
  page: 'shop' | 'home' | 'product' | 'recipes' | 'bundles' | 'impact' | 'newsletter' | '404';
  productSlug?: string;
  categoryId?: string;
  recipeSlug?: string;
  bundleSlug?: string;
}

function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { page: 'home' };
  }

  const hash = window.location.hash || '';
  let pathname = window.location.pathname || '';

  // Normalize base path for GitHub Pages (e.g. /Magic-DEMO/ -> /)
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  if (base && pathname.startsWith(base)) {
    pathname = pathname.slice(base.length) || '/';
  } else if (pathname.startsWith('/Magic-DEMO')) {
    pathname = pathname.replace(/^\/Magic-DEMO/, '') || '/';
  }

  // 1. Check Pathname first
  if (pathname === '/404' || pathname === '/404.html') {
    return { page: '404' };
  }

  if (pathname === '/newsletter' || pathname.startsWith('/newsletter/')) {
    return { page: 'newsletter' };
  }

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

  if (pathname === '/shop' || pathname.startsWith('/shop/')) {
    const cat = pathname.replace(/^\/shop\/?/, '').trim();
    return { page: 'shop', categoryId: cat ? cat : undefined };
  }

  // If path is not root and not recognized, check if it's 404
  if (pathname !== '/' && pathname !== '' && pathname !== '/index.html') {
    return { page: '404' };
  }

  // 2. Check Hash patterns
  const cleanHash = hash.replace(/^#\/?/, '');

  if (cleanHash === '404') {
    return { page: '404' };
  }

  if (cleanHash === 'newsletter' || cleanHash.startsWith('newsletter/')) {
    return { page: 'newsletter' };
  }

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

  if (cleanHash === 'home' || cleanHash === '') {
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

  return { page: 'home' };
}

function MainAppContent() {
  const [routeState, setRouteState] = useState<RouteState>(() => parseCurrentRoute());
  const { totalItems, openCart } = useShopCart();
  const [, setToastMessage] = useState<string | null>(null);

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

  // Synchronize SEO & dynamic structured data per route
  useEffect(() => {
    switch (routeState.page) {
      case 'home':
        updatePageMetadata({
          title: 'MAGIC UAE | Single-Origin Pulses & Spices | Direct From Indian Farms',
          description: 'Single-origin pulses, whole spices, and staples sourced directly from generational Indian farms for kitchens in Dubai, Abu Dhabi, and across the UAE.',
          canonicalPath: '/',
          ogType: 'website',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'MAGIC UAE',
            url: 'https://prembhi.github.io/Magic-DEMO/',
            description: 'Single-origin pulses and spices delivered across the UAE.',
          },
        });
        break;
      case 'shop':
        updatePageMetadata({
          title: 'Shop Single-Origin Staples | MAGIC UAE',
          description: 'Browse single-origin pulses and spices in 500g, 1kg, and 2kg packs. Free UAE delivery on orders above AED 150.',
          canonicalPath: '/#shop',
          ogType: 'website',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'MAGIC Shop - Single-Origin Pulses & Spices',
            url: 'https://prembhi.github.io/Magic-DEMO/#shop',
            description: 'Clean-label, lab-tested whole dals, spices, and grains.',
          },
        });
        break;
      case 'product': {
        const product = SHOP_PRODUCTS.find((p) => p.slug === routeState.productSlug || p.id === routeState.productSlug);
        const name = product ? product.name : 'Single-Origin Product';
        const price = product ? product.price.toFixed(2) : '14.50';
        updatePageMetadata({
          title: `${name} | MAGIC UAE Single-Origin`,
          description: product
            ? `Buy authentic ${name} (${product.weight}) in Dubai & UAE. Single-origin, direct from Indian farms. Clean label, no preservatives.`
            : 'Single-origin farm-sourced staples in Dubai and UAE.',
          canonicalPath: `/#shop/product/${routeState.productSlug || ''}`,
          ogType: 'product',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: name,
            description: product ? `${product.name} - ${product.englishSub || ''}. Origin: ${product.origin || 'India'}.` : 'Authentic single-origin pulses and spices direct from generational farms.',
            image: product?.image,
            offers: {
              '@type': 'Offer',
              price: price,
              priceCurrency: 'AED',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'MAGIC UAE',
              },
            },
          },
        });
        break;
      }
      case 'recipes':
        updatePageMetadata({
          title: 'Authentic Kitchen Recipes | Cook With MAGIC UAE',
          description: 'Tested home recipes for authentic Dal Tadka, Khichdi, and comforting pulse dishes made with single-origin Indian ingredients.',
          canonicalPath: routeState.recipeSlug ? `/#recipes/${routeState.recipeSlug}` : '/#recipes',
          ogType: 'article',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: routeState.recipeSlug ? `MAGIC Recipe: ${routeState.recipeSlug}` : 'MAGIC Recipes Collection',
            description: 'Simple, unhurried recipes showcasing single-origin dals and spices.',
            publisher: {
              '@type': 'Organization',
              name: 'MAGIC UAE',
            },
          },
        });
        break;
      case 'bundles':
        updatePageMetadata({
          title: 'Curated Pantry Bundles | MAGIC UAE',
          description: 'Thoughtfully paired single-origin sets for everyday home cooking. Curated pulses, spices, and staples delivered across the UAE.',
          canonicalPath: routeState.bundleSlug ? `/#bundles/${routeState.bundleSlug}` : '/#bundles',
          ogType: 'website',
        });
        break;
      case 'impact':
        updatePageMetadata({
          title: 'Our Impact & Direct Farm Sourcing | MAGIC UAE',
          description: 'How MAGIC partners directly with Indian generational farming communities, eliminating middlemen and paying 15-20% above mandi rates.',
          canonicalPath: '/#impact',
          ogType: 'article',
        });
        break;
      case 'newsletter':
        updatePageMetadata({
          title: 'The MAGIC Letter | Harvest Notes & Recipes from UAE',
          description: 'Subscribe to our monthly harvest dispatch for seasonal recipes, origin stories, and early access to limited micro-lots.',
          canonicalPath: '/#newsletter',
          ogType: 'website',
        });
        break;
      case '404':
        updatePageMetadata({
          title: 'Page Not Found | MAGIC UAE',
          description: 'The requested page could not be located. Explore our authentic single-origin pulses, recipes, and farm stories.',
          canonicalPath: '/404.html',
          ogType: 'website',
        });
        break;
    }
  }, [routeState]);

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

  const handleNavigateNewsletter = () => {
    setRouteState({ page: 'newsletter' });
    window.location.hash = '#newsletter';
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
      {/* WCAG 2.2 AA (Criterion 2.4.1) Bypass Blocks: Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[9999] focus:px-5 focus:py-2.5 focus:bg-[#C8102E] focus:text-white focus:font-bold focus:rounded-full focus:shadow-2xl focus:outline-hidden focus:ring-2 focus:ring-white text-xs tracking-wider uppercase transition-all"
      >
        Skip to main content
      </a>

      {routeState.page === 'product' ? (
        /* REUSABLE DYNAMIC SINGLE PRODUCT PAGE */
        <ProductPage
          productSlug={routeState.productSlug}
          onNavigateHome={handleNavigateHome}
          onNavigateShop={handleNavigateShop}
          onNavigateRecipes={handleNavigateRecipes}
          onNavigateBundles={handleNavigateBundles}
          onNavigateImpact={handleNavigateImpact}
          onNavigateNewsletter={handleNavigateNewsletter}
          onSelectProduct={handleNavigateProduct}
        />
      ) : routeState.page === 'recipes' ? (
        /* RECIPES DISCOVERY & DETAIL PAGE */
        <RecipesPage
          recipeSlug={routeState.recipeSlug}
          onNavigateHome={handleNavigateHome}
          onNavigateShop={handleNavigateShop}
          onNavigateRecipes={handleNavigateRecipes}
          onNavigateBundles={handleNavigateBundles}
          onNavigateImpact={handleNavigateImpact}
          onNavigateNewsletter={handleNavigateNewsletter}
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
          onNavigateNewsletter={handleNavigateNewsletter}
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
          onNavigateNewsletter={handleNavigateNewsletter}
          onSelectProduct={handleNavigateProduct}
        />
      ) : routeState.page === 'newsletter' ? (
        /* DEDICATED MAGIC NEWSLETTER PAGE */
        <NewsletterPage
          onNavigateHome={handleNavigateHome}
          onNavigateShop={handleNavigateShop}
          onNavigateRecipes={handleNavigateRecipes}
          onNavigateBundles={handleNavigateBundles}
          onNavigateImpact={handleNavigateImpact}
          onNavigateNewsletter={handleNavigateNewsletter}
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
          onNavigateNewsletter={handleNavigateNewsletter}
        />
      ) : routeState.page === '404' ? (
        /* 404 NOT FOUND PAGE */
        <NotFoundPage
          onNavigateHome={handleNavigateHome}
          onNavigateShop={handleNavigateShop}
          onNavigateRecipes={handleNavigateRecipes}
          onNavigateBundles={handleNavigateBundles}
          onNavigateImpact={handleNavigateImpact}
          onNavigateNewsletter={handleNavigateNewsletter}
        />
      ) : (
        /* REBUILT PREMIUM EDITORIAL HOME PAGE (7 EXPERIENCES) */
        <HomePage
          onNavigateHome={handleNavigateHome}
          onNavigateShop={handleNavigateShop}
          onNavigateRecipes={handleNavigateRecipes}
          onNavigateBundles={handleNavigateBundles}
          onNavigateImpact={handleNavigateImpact}
          onNavigateNewsletter={handleNavigateNewsletter}
          onSelectProduct={handleNavigateProduct}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ShopCartProvider>
        <MainAppContent />
      </ShopCartProvider>
    </LanguageProvider>
  );
}
