import React from 'react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';

interface ShopFooterProps {
  onNavigateHome: () => void;
  onSelectCategory?: (catId: string) => void;
  onNavigateRecipes?: () => void;
  onNavigateBundles?: () => void;
  onNavigateImpact?: () => void;
  onNavigateNewsletter?: () => void;
}

export const ShopFooter: React.FC<ShopFooterProps> = ({
  onNavigateHome,
  onSelectCategory,
  onNavigateRecipes,
  onNavigateBundles,
  onNavigateImpact,
  onNavigateNewsletter,
}) => {
  const { language, setLanguage, isRTL, t } = useLanguage();

  const handleRecipesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateRecipes) {
      onNavigateRecipes();
    } else {
      window.location.hash = '#recipes';
    }
  };

  const handleBundlesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateBundles) {
      onNavigateBundles();
    } else {
      window.location.hash = '#bundles';
    }
  };

  const handleImpactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateImpact) {
      onNavigateImpact();
    } else {
      window.location.hash = '#impact';
    }
  };

  const handleNewsletterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateNewsletter) {
      onNavigateNewsletter();
    } else {
      window.location.hash = '#newsletter';
    }
  };

  return (
    <footer className="w-full bg-[#2A0E10] text-[#FDF6EC] border-t border-[#3C1518] mt-12 select-none">
      {/* Main Multi-Column Content Area */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          {/* COL 1: SHOP */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              {t('footer.shop')}
            </h4>
            <ul className="space-y-2 text-[#FDF6EC]/70">
              <li>
                <button
                  onClick={onNavigateHome}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-start"
                >
                  {t('shop.allProducts')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('dals')}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-start"
                >
                  {t('shop.dals')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('spices')}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-start"
                >
                  {t('shop.pureSpices')}
                </button>
              </li>
              <li>
                <button
                  onClick={handleBundlesClick}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-start"
                >
                  {t('nav.bundles')}
                </button>
              </li>
            </ul>
          </div>

          {/* COL 2: ABOUT & SOURCING */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              {t('footer.discover')}
            </h4>
            <ul className="space-y-2 text-[#FDF6EC]/70">
              <li>
                <button
                  onClick={handleImpactClick}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-start"
                >
                  {t('nav.ourImpact')}
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4A843] transition-colors">
                  {isRTL ? 'معايير الجودة والفرز' : 'Triple Optical Sorting'}
                </a>
              </li>
              <li>
                <button
                  onClick={handleNewsletterClick}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-start"
                >
                  {t('nav.newsletter')}
                </button>
              </li>
              <li>
                <a href="mailto:hello@magicspices.com" className="hover:text-[#D4A843] transition-colors">
                  {isRTL ? 'تجارة الجملة والتموين' : 'Trade & Wholesale Inquiries'}
                </a>
              </li>
            </ul>
          </div>

          {/* COL 3: RECIPES & INSPIRATION */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              {t('nav.recipes')}
            </h4>
            <ul className="space-y-2 text-[#FDF6EC]/70">
              <li>
                <button
                  onClick={handleRecipesClick}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-start"
                >
                  {t('recipes.title')}
                </button>
              </li>
              <li>
                <button
                  onClick={handleRecipesClick}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-start"
                >
                  {t('recipes.category.dal')}
                </button>
              </li>
              <li>
                <button
                  onClick={handleNewsletterClick}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-start"
                >
                  {t('newsletter.kicker')}
                </button>
              </li>
            </ul>
          </div>

          {/* COL 4: LANGUAGE & UAE REGION */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              {t('footer.language')}
            </h4>
            <div className="flex flex-col gap-2 mb-3">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-xs font-semibold border transition-all cursor-pointer ${
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
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-xs font-semibold border transition-all cursor-pointer font-arabic ${
                  language === 'ar'
                    ? 'bg-white/15 text-[#D4A843] border-[#D4A843]/50'
                    : 'bg-white/5 text-[#FDF6EC]/70 border-white/10 hover:bg-white/10'
                }`}
              >
                <span>العربية</span>
                <span className="font-mono text-[10px] text-white/50">AR</span>
              </button>
            </div>

            <div className="p-2 rounded bg-white/5 border border-white/10 text-xs text-[#FDF6EC]/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2B6E2A]" />
              <span>United Arab Emirates (AED)</span>
            </div>
          </div>

          {/* COL 5: BRAND & SOCIAL */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <div className="inline-block bg-[#FAF7F2] px-3 py-1.5 rounded border border-[#E6E0D6] shadow-xs">
                <img
                  src={MAGIC_ASSETS.logo}
                  alt="MAGIC"
                  className="h-7 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-[11px] text-[#FDF6EC]/60 leading-relaxed mb-3">
              {t('footer.brandDescription')}
            </p>
            <h5 className="font-bold text-white text-[11px] uppercase tracking-wider mb-2">
              SOCIAL
            </h5>
            <div className="flex items-center gap-3 text-[#FDF6EC]/70 text-xs">
              <span className="hover:text-[#D4A843] cursor-pointer">Instagram</span>
              <span>•</span>
              <span className="hover:text-[#D4A843] cursor-pointer">Facebook</span>
              <span>•</span>
              <span className="hover:text-[#D4A843] cursor-pointer">Pinterest</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="border-t border-white/10 bg-[#1F0B0D] py-4 text-[11px] text-[#FDF6EC]/50">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-start">
          <p>{t('footer.rights')}</p>
          <div className="flex items-center gap-4 text-[#FDF6EC]/60">
            <span>{t('footer.privacy')}</span>
            <span>•</span>
            <span>{t('footer.terms')}</span>
            <span>•</span>
            <span>{t('footer.uaeDelivery')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
