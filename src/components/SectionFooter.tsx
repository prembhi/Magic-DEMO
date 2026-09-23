import React, { useState } from 'react';
import { MagicLogo } from './MagicLogo';
import { Globe, Heart, ArrowUp } from 'lucide-react';

export const SectionFooter: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<'EN' | 'AR'>('EN');
  const [selectedRegion, setSelectedRegion] = useState<'UAE' | 'USA'>('UAE');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative w-full bg-[#3C1518] text-[#FDF6EC] pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#D4A843]/20 select-none overflow-hidden"
      aria-label="Site Footer"
    >
      {/* Background warm golden ambient floor */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#200B0D] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* TOP BRAND HERO ROW */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-12 mb-12 border-b border-white/10 gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <MagicLogo size="lg" />
            <div className="sm:border-l sm:border-white/15 sm:pl-6 flex flex-col">
              <span className="font-display font-bold text-sm text-[#FDF6EC] tracking-wider uppercase">
                Authentic Indian Spices & Heritage Foods
              </span>
              <span className="font-arabic font-normal text-xs text-[#D4A843] mt-0.5">
                توابل هندية أصيلة ومواد غذائية تراثية
              </span>
            </div>
          </div>

          {/* Quick Back to Top */}
          <button
            onClick={scrollToTop}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#D4A843] border border-[#D4A843]/30 transition-colors cursor-pointer min-h-[44px]"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* MULTI-COLUMN EDITORIAL FOOTER GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* COL 1: SHOP */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-4">
              SHOP
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-[#FDF6EC]/70 font-medium">
              <li>
                <a href="#spices" className="hover:text-white transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="#pulses" className="hover:text-white transition-colors">
                  Dals & Lentils
                </a>
              </li>
              <li>
                <a href="#spices" className="hover:text-white transition-colors">
                  Whole Spices
                </a>
              </li>
              <li>
                <a href="#spices" className="hover:text-white transition-colors">
                  Ground Spices
                </a>
              </li>
              <li>
                <a href="#pulses" className="hover:text-white transition-colors">
                  Masalas
                </a>
              </li>
              <li>
                <a href="#bundles" className="hover:text-white transition-colors">
                  Bundles
                </a>
              </li>
            </ul>
          </div>

          {/* COL 2: EXPLORE */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-4">
              EXPLORE
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-[#FDF6EC]/70 font-medium">
              <li>
                <a href="#recipes" className="hover:text-white transition-colors">
                  Recipes
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#subscription" className="hover:text-white transition-colors">
                  Subscribe & Save
                </a>
              </li>
              <li>
                <a href="#scroll-story" className="hover:text-white transition-colors">
                  Terroir Journey
                </a>
              </li>
            </ul>
          </div>

          {/* COL 3: SUPPORT */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-4">
              SUPPORT
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-[#FDF6EC]/70 font-medium">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Contact Inquiry
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  FAQ
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Export Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Returns Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms of Trade
                </span>
              </li>
            </ul>
          </div>

          {/* COL 4: REGION & LANGUAGE */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-4">
              REGION
            </span>
            <div className="flex flex-col gap-2 mb-6">
              {(['UAE', 'USA'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer min-h-[44px] ${
                    selectedRegion === r
                      ? 'bg-white/15 text-[#D4A843] border-[#D4A843]/50'
                      : 'bg-white/5 text-[#FDF6EC]/70 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span>{r === 'UAE' ? 'United Arab Emirates' : 'United States'}</span>
                  <span className="font-mono text-[10px] text-white/50">{r}</span>
                </button>
              ))}
            </div>

            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-2">
              LANGUAGE
            </span>
            <div className="inline-flex rounded-lg bg-white/5 border border-white/10 p-1">
              {(['EN', 'AR'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                    currentLang === lang
                      ? 'bg-[#C8102E] text-white shadow-xs'
                      : 'text-[#FDF6EC]/60 hover:text-white'
                  }`}
                >
                  {lang === 'EN' ? 'English' : 'العربية'}
                </button>
              ))}
            </div>
          </div>

          {/* COL 5: SOCIAL */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-4">
              SOCIAL
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-[#FDF6EC]/70 font-medium">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM METADATA & LEGAL BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDF6EC]/60">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} MAGIC Spices & Foods. All rights reserved.</span>
            <span className="text-white/20">|</span>
            <span className="font-arabic">ماجيك للأغذية والبهارات</span>
          </div>

          {/* Payment Icons Placeholder */}
          <div className="flex items-center gap-2">
            {['VISA', 'MC', 'AMEX', 'APPLE PAY'].map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 rounded bg-white/10 border border-white/15 text-[10px] font-mono font-bold tracking-wider text-[#FDF6EC]/80"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
