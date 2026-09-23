import React, { useState } from 'react';
import { ShoppingBag, Globe, Menu, X, ArrowUpRight } from 'lucide-react';
import { MagicLogo } from './MagicLogo';

interface MagicHeaderProps {
  cartCount?: number;
}

export const MagicHeader: React.FC<MagicHeaderProps> = ({ cartCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<'Dubai / UAE' | 'USA'>('Dubai / UAE');

  return (
    <header className="relative w-full z-40 bg-[#FDF6EC]/95 backdrop-blur-md border-b border-[#3C1518]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* ZONE 1: BRAND ZONE (Authentic Brand Cartouche Logo) */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded px-1 py-0.5"
            aria-label="MAGIC Spices & Foods Home"
          >
            <MagicLogo size="sm" withRegistered={true} className="transform group-hover:scale-102 transition-transform" />
          </a>
        </div>

        {/* ZONE 2: CLEAN EDITORIAL NAVIGATION (Restrained, elegant typography) */}
        <nav
          className="hidden md:flex items-center gap-7 text-[13px] font-semibold tracking-wide text-[#3C1518]/85"
          aria-label="Primary Navigation"
        >
          <a
            href="#pulses"
            className="hover:text-[#C8102E] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#C8102E] py-1"
          >
            Heritage Pulses
          </a>
          <a
            href="#spices"
            className="hover:text-[#C8102E] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#C8102E] py-1"
          >
            Pure Spices
          </a>
          <a
            href="#origin"
            className="hover:text-[#C8102E] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#C8102E] py-1"
          >
            Source Terroir
          </a>
          <a
            href="#packaging"
            className="hover:text-[#C8102E] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#C8102E] py-1"
          >
            Pouch Craft
          </a>
          <a
            href="#distribution"
            className="hover:text-[#C8102E] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#C8102E] py-1"
          >
            Global Distribution
          </a>
        </nav>

        {/* ZONE 3: ACTIONS & REGION SELECTOR (Restrained, brand system) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Market Switcher: Dubai / UAE vs USA */}
          <button
            onClick={() => setSelectedMarket(m => (m === 'Dubai / UAE' ? 'USA' : 'Dubai / UAE'))}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#3C1518] hover:text-[#C8102E] transition-colors py-1.5 px-2.5 rounded border border-[#3C1518]/15 hover:border-[#C8102E]/40 bg-white/60 cursor-pointer min-h-[38px]"
            title="Switch Market (Dubai, UAE / USA)"
            aria-label={`Current market ${selectedMarket}. Click to toggle.`}
          >
            <Globe className="w-3.5 h-3.5 text-[#C8102E]" />
            <span className="whitespace-nowrap">{selectedMarket}</span>
          </button>

          {/* Red CTA Button (Clean, sharp, brand red) */}
          <a
            href="#inquire"
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#C8102E] hover:bg-[#a60d26] rounded shadow-xs transition-all hover:shadow cursor-pointer whitespace-nowrap min-h-[38px]"
          >
            <span>Request Catalog</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Cart Bag Icon with real counter */}
          <button
            className="relative p-2 text-[#3C1518] hover:text-[#C8102E] rounded hover:bg-black/5 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#C8102E]"
            aria-label={`Shopping bag containing ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C8102E] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#3C1518] rounded hover:bg-black/5 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#C8102E]"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#3C1518]/10 bg-[#FDF6EC] px-6 py-4 shadow-xl transition-all">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-[#3C1518]">
            <a
              href="#pulses"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C8102E] transition-colors"
            >
              Heritage Pulses
            </a>
            <a
              href="#spices"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C8102E] transition-colors"
            >
              Pure Spices
            </a>
            <a
              href="#origin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C8102E] transition-colors"
            >
              Source Terroir
            </a>
            <a
              href="#packaging"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C8102E] transition-colors"
            >
              Pouch Craft
            </a>
            <a
              href="#distribution"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C8102E] transition-colors"
            >
              Global Distribution
            </a>

            <div className="pt-3 border-t border-[#3C1518]/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setSelectedMarket(m => (m === 'Dubai / UAE' ? 'USA' : 'Dubai / UAE'));
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between text-xs font-semibold py-2 px-3 rounded border border-[#3C1518]/20 bg-white"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#C8102E]" />
                  <span>Market: {selectedMarket}</span>
                </span>
                <span className="text-[#C8102E] font-bold">Switch</span>
              </button>

              <a
                href="#inquire"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#C8102E] rounded shadow-xs"
              >
                Request Export Catalog
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
