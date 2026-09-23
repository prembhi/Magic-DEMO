import React from 'react';
import { MagicLogo } from './MagicLogo';
import { Globe, Heart, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SectionFooter: React.FC = () => {
  const { language, setLanguage, isRTL, t } = useLanguage();

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
            <div className="sm:border-l sm:border-white/15 sm:pl-6 rtl:sm:border-l-0 rtl:sm:border-r rtl:sm:border-white/15 rtl:sm:pr-6 rtl:sm:pl-0 flex flex-col">
              <span className="font-display font-bold text-sm text-[#FDF6EC] tracking-wider uppercase">
                {isRTL ? 'أغذية وتوابل هندية أصيلة' : 'Authentic Indian Spices & Heritage Foods'}
              </span>
              <span className="font-normal text-xs text-[#D4A843] mt-0.5">
                {isRTL
                  ? 'توابل هندية نقية وبقوليات تراثية - الإمارات العربية المتحدة'
                  : 'توابل هندية أصيلة ومواد غذائية تراثية • United Arab Emirates'}
              </span>
            </div>
          </div>

          {/* Quick Back to Top */}
          <button
            onClick={scrollToTop}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#D4A843] border border-[#D4A843]/30 transition-colors cursor-pointer min-h-[44px]"
            aria-label="Back to top of page"
          >
            <span>{isRTL ? 'العودة إلى الأعلى' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
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

          {/* COL 2: EXPLORE */}
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
                <a href="#bundles" className="hover:text-white transition-colors">
                  {t('bundles.title')}
                </a>
              </li>
            </ul>
          </div>

          {/* COL 3: CUSTOMER CARE */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-4">
              {t('footer.support')}
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-[#FDF6EC]/70 font-medium">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {t('footer.uaeDelivery')}
                </span>
              </li>
              <li>
                <a href="mailto:hello@magicspices.com" className="hover:text-white transition-colors">
                  hello@magicspices.com
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {t('footer.shippingPolicy')}
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {t('footer.privacy')}
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {t('footer.terms')}
                </span>
              </li>
            </ul>
          </div>

          {/* COL 4: LANGUAGE & UAE REGION */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-4">
              {t('footer.language')}
            </span>

            {/* Language Switcher Buttons */}
            <div className="flex flex-col gap-2 mb-4">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer min-h-[44px] ${
                  language === 'en'
                    ? 'bg-white/15 text-[#D4A843] border-[#D4A843]/50'
                    : 'bg-white/5 text-[#FDF6EC]/70 border-white/10 hover:bg-white/10'
                }`}
              >
                <span>English</span>
                <span className="font-mono text-[10px] text-white/50">EN</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer font-arabic min-h-[44px] ${
                  language === 'ar'
                    ? 'bg-white/15 text-[#D4A843] border-[#D4A843]/50'
                    : 'bg-white/5 text-[#FDF6EC]/70 border-white/10 hover:bg-white/10'
                }`}
              >
                <span>العربية</span>
                <span className="font-mono text-[10px] text-white/50">AR</span>
              </button>
            </div>

            {/* Static UAE Market Note (No USA/switching) */}
            <div className="p-2 rounded bg-white/5 border border-white/10 text-xs text-[#FDF6EC]/70 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2B6E2A]" />
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
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDF6EC]/60">
          <div className="flex items-center gap-3">
            <span className="font-mono text-white/40">UAE STORE</span>
            <span>•</span>
            <span>{t('footer.rights')}</span>
          </div>

          <div className="flex items-center gap-2 text-white/40">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C8102E] fill-current" />
            <span>for UAE Culinary Kitchens</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
