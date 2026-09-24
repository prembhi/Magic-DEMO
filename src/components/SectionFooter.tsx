import React, { useState } from 'react';
import { MagicLogo } from './MagicLogo';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LegalModal, LegalDocType } from './common/LegalModal';
import { MAGIC_ASSETS } from '../constants/assets';

export const SectionFooter: React.FC = () => {
  const { language, setLanguage, isRTL, t } = useLanguage();
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative w-full bg-[#3C1518] text-[#FDF6EC] pt-14 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#D4A843]/20 select-none overflow-hidden"
      aria-label="Site Footer"
    >
      {/* ============================================================ */}
      {/* 1. CONTINUOUS ILLUSTRATED AGRICULTURAL LANDSCAPE ARTWORK      */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      >
        {/* Continuous Illustrated Agricultural Landscape with Left & Right Farmers */}
        <img
          src={MAGIC_ASSETS.footerLandscape}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-bottom opacity-80 filter contrast-[1.04]"
          loading="lazy"
        />

        {/* Central Darkening Vignette: Keeps central 35-40% quiet and columns fully readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 50% 60%, #3C1518 0%, #3C1518 40%, rgba(60, 21, 24, 0.78) 68%, rgba(60, 21, 24, 0.15) 90%, transparent 100%)',
          }}
        />

        {/* Top Fade to Solid Deep Maroon: Behind Brand Row & Logo */}
        <div
          className="absolute top-0 inset-x-0 h-36 sm:h-44 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, #3C1518 0%, rgba(60, 21, 24, 0.96) 35%, rgba(60, 21, 24, 0.4) 75%, transparent 100%)',
          }}
        />

        {/* Bottom Grounding Fade: Behind UAE Store & Copyright */}
        <div
          className="absolute bottom-0 inset-x-0 h-24 sm:h-28 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, #3C1518 0%, rgba(60, 21, 24, 0.92) 30%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative max-w-[1240px] mx-auto z-10">
        {/* TOP BRAND HERO ROW */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-10 mb-12 border-b border-[#D4A843]/[0.12] gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5">
              <MagicLogo size="lg" />
              <span className="text-[#D4A843]/60 font-sans text-xs -mt-3 select-none">®</span>
            </div>
            <div className="sm:border-l sm:border-white/15 sm:pl-6 rtl:sm:border-l-0 rtl:sm:border-r rtl:sm:border-white/15 rtl:sm:pr-6 rtl:sm:pl-0 flex flex-col">
              <span className="font-display font-bold text-sm text-[#FDF6EC] tracking-wider uppercase">
                {isRTL ? 'أغذية وتوابل هندية أصيلة' : 'Authentic Indian Spices & Heritage Foods'}
              </span>
              <span className="font-normal text-xs text-[#D4A843] mt-0.5 font-arabic">
                {isRTL
                  ? 'توابل هندية أصيلة ومواد غذائية تراثية • United Arab Emirates'
                  : 'توابل هندية أصيلة ومواد غذائية تراثية • United Arab Emirates'}
              </span>
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black/20 hover:bg-black/40 text-xs font-semibold text-[#D4A843] border border-[#D4A843]/30 transition-colors cursor-pointer min-h-[40px]"
            aria-label="Back to top of page"
          >
            <span>{isRTL ? 'العودة إلى الأعلى' : 'Back to top'}</span>
            <span className="text-sm font-mono">↑</span>
          </button>
        </div>

        {/* MULTI-COLUMN EDITORIAL FOOTER GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* COL 1: SHOP */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-4">
              {t('footer.shop')}
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-[#FDF6EC]/70 font-medium">
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  {t('shop.allProducts')}
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  {t('shop.dals')}
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  {t('shop.pureSpices')}
                </a>
              </li>
              <li>
                <a href="#bundles" className="hover:text-white transition-colors">
                  {t('nav.bundles')}
                </a>
              </li>
            </ul>
          </div>

          {/* COL 2: DISCOVER */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-4">
              {t('footer.discover')}
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-[#FDF6EC]/70 font-medium">
              <li>
                <a href="#recipes" className="hover:text-white transition-colors">
                  {t('nav.recipes')}
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-white transition-colors">
                  {t('nav.ourImpact')}
                </a>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-white transition-colors">
                  {t('nav.newsletter')}
                </a>
              </li>
              <li>
                <a href="#bundles" className="hover:text-white transition-colors uppercase tracking-wider text-[11px]">
                  {t('bundles.title')}
                </a>
              </li>
            </ul>
          </div>

          {/* COL 3: CARE & CONTACT */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-4">
              {t('footer.support')}
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-[#FDF6EC]/70 font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveLegalDoc('shipping')}
                  className="hover:text-white transition-colors cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-[#D4A843] rounded"
                >
                  {t('footer.uaeDelivery')}
                </button>
              </li>
              <li>
                <a href="mailto:hello@magicspices.com" className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#D4A843] rounded">
                  hello@magicspices.com
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveLegalDoc('shipping')}
                  className="hover:text-white transition-colors cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-[#D4A843] rounded"
                >
                  {t('footer.shippingPolicy')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveLegalDoc('privacy')}
                  className="hover:text-white transition-colors cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-[#D4A843] rounded"
                >
                  {t('footer.privacy')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveLegalDoc('terms')}
                  className="hover:text-white transition-colors cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-[#D4A843] rounded"
                >
                  {t('footer.terms')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveLegalDoc('accessibility')}
                  className="hover:text-white transition-colors cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-[#D4A843] rounded"
                >
                  {isRTL ? 'إمكانية الوصول (WCAG)' : 'Accessibility Statement'}
                </button>
              </li>
            </ul>
          </div>

          {/* COL 4: LANGUAGE / اللغة */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-4">
              {t('footer.language')}
            </span>

            {/* Language Switcher Buttons */}
            <div className="flex flex-col gap-2 mb-4">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer min-h-[42px] ${
                  language === 'en'
                    ? 'bg-black/30 text-[#D4A843] border-[#D4A843]/50 shadow-xs'
                    : 'bg-black/15 text-[#FDF6EC]/70 border-white/10 hover:bg-black/25'
                }`}
              >
                <span>English</span>
                <span className="font-mono text-[10px] text-white/50">EN</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer font-arabic min-h-[42px] ${
                  language === 'ar'
                    ? 'bg-black/30 text-[#D4A843] border-[#D4A843]/50 shadow-xs'
                    : 'bg-black/15 text-[#FDF6EC]/70 border-white/10 hover:bg-black/25'
                }`}
              >
                <span>العربية</span>
                <span className="font-mono text-[10px] text-white/50">AR</span>
              </button>
            </div>

            {/* Static UAE Market Note */}
            <div className="p-2 rounded bg-black/20 border border-white/10 text-xs text-[#FDF6EC]/70 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2B6E2A] shrink-0" />
              <span>United Arab Emirates (AED)</span>
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
        <div className="pt-8 border-t border-[#D4A843]/[0.12] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDF6EC]/60">
          <div className="flex items-center gap-3">
            <span className="font-mono text-white/40">UAE STORE</span>
            <span>•</span>
            <span>
              {isRTL
                ? `© ${new Date().getFullYear()} أغذية ماجيك الإمارات. جميع الحقوق محفوظة.`
                : `© ${new Date().getFullYear()} MAGIC Foods UAE. All rights reserved.`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-white/40">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C8102E] fill-current" />
            <span>for UAE Culinary Kitchens</span>
            <span>•</span>
            <a
              href="https://encesmarketing.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#D4A843] hover:underline transition-colors"
            >
              Made by ENCES Marketing
            </a>
          </div>
        </div>
      </div>

      {/* ACCESSIBLE LEGAL POLICY MODAL */}
      <LegalModal
        isOpen={Boolean(activeLegalDoc)}
        docType={activeLegalDoc || 'privacy'}
        onClose={() => setActiveLegalDoc(null)}
      />
    </footer>
  );
};
