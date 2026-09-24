import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ShopBreadcrumbProps {
  currentCategoryName: string;
  onNavigateHome: () => void;
  onResetCategory: () => void;
}

export const ShopBreadcrumb: React.FC<ShopBreadcrumbProps> = ({
  currentCategoryName,
  onNavigateHome,
  onResetCategory,
}) => {
  const { isRTL, t } = useLanguage();
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-[#FAF7F2] border-b border-[#EAE4D9] py-2 select-none"
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-[11px] text-[#3C1518]/65">
        <button
          onClick={onNavigateHome}
          className="hover:text-[#C8102E] transition-colors cursor-pointer"
        >
          {t('nav.home', 'Home')}
        </button>

        <ChevronIcon className="w-3 h-3 text-[#3C1518]/30 shrink-0" aria-hidden="true" />

        <button
          onClick={onResetCategory}
          className={`hover:text-[#C8102E] transition-colors cursor-pointer ${
            currentCategoryName === 'All Products' || currentCategoryName === 'جميع المنتجات'
              ? 'text-[#C8102E] font-bold'
              : ''
          }`}
        >
          {t('nav.shop', 'Shop')}
        </button>

        {currentCategoryName !== 'All Products' && currentCategoryName !== 'جميع المنتجات' && (
          <>
            <ChevronIcon className="w-3 h-3 text-[#3C1518]/30 shrink-0" aria-hidden="true" />
            <span className="text-[#C8102E] font-semibold" aria-current="page">
              {currentCategoryName}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};
