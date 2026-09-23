import React from 'react';
import { MagicHeader } from '../MagicHeader';

export interface ShopHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onNavigateHome: () => void;
  onNavigateRecipes?: (recipeSlug?: string) => void;
  onNavigateShop?: (categoryId?: string) => void;
  onNavigateBundles?: (bundleSlug?: string) => void;
  onNavigateImpact?: () => void;
  onNavigateNewsletter?: () => void;
  onSelectProduct?: (productSlug: string) => void;
}

/**
 * Reusable ShopHeader wrapping the unified MAGIC header navigation system.
 * Keeps compatibility across all pages with zero layout disruptions.
 */
export const ShopHeader: React.FC<ShopHeaderProps> = ({
  searchQuery = '',
  onSearchChange,
  onNavigateHome,
  onNavigateRecipes,
  onNavigateShop,
  onNavigateBundles,
  onNavigateImpact,
  onNavigateNewsletter,
  onSelectProduct,
}) => {
  return (
    <MagicHeader
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      onNavigateHome={onNavigateHome}
      onNavigateRecipes={onNavigateRecipes}
      onNavigateShop={onNavigateShop}
      onNavigateBundles={onNavigateBundles}
      onNavigateImpact={onNavigateImpact}
      onNavigateNewsletter={onNavigateNewsletter}
      onSelectProduct={onSelectProduct}
    />
  );
};
