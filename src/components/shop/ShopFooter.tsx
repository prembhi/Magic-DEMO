import React from 'react';
import { SectionFooter } from '../SectionFooter';

interface ShopFooterProps {
  onNavigateHome?: () => void;
  onSelectCategory?: (catId: string) => void;
  onNavigateRecipes?: () => void;
  onNavigateBundles?: () => void;
  onNavigateImpact?: () => void;
  onNavigateNewsletter?: () => void;
}

export const ShopFooter: React.FC<ShopFooterProps> = () => {
  return <SectionFooter />;
};
