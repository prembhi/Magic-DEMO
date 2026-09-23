/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (productName: string) => {
    setCartCount((c) => c + 1);
    setToastMessage(`Added "${productName}" to sample inquiry bag`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleShopAllClick = () => {
    const el = document.getElementById('spices');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] text-[#3C1518] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white relative">
      {/* Interactive feedback toast (Zero dead clicks) */}
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

      {/* TOP NAVIGATION BAR (Strict 3-Zone Contract with Official Transparent Logo) */}
      <MagicHeader cartCount={cartCount} />

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
    </div>
  );
}
