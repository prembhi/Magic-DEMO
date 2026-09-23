import React from 'react';
import { ChevronRight } from 'lucide-react';

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
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-[#FAF7F2] border-b border-[#EAE4D9] py-2"
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex items-center gap-1.5 text-[11px] text-[#3C1518]/65">
        <button
          onClick={onNavigateHome}
          className="hover:text-[#C8102E] transition-colors cursor-pointer"
        >
          Home
        </button>

        <ChevronRight className="w-3 h-3 text-[#3C1518]/30 shrink-0" aria-hidden="true" />

        <button
          onClick={onResetCategory}
          className={`hover:text-[#C8102E] transition-colors cursor-pointer ${
            currentCategoryName === 'All Products' ? 'text-[#C8102E] font-bold' : ''
          }`}
        >
          Shop
        </button>

        {currentCategoryName !== 'All Products' && (
          <>
            <ChevronRight className="w-3 h-3 text-[#3C1518]/30 shrink-0" aria-hidden="true" />
            <span className="text-[#C8102E] font-semibold" aria-current="page">
              {currentCategoryName}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};
