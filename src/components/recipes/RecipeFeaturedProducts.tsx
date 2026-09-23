import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SHOP_PRODUCTS } from '../../data/shopProducts';
import { ShopProductCard } from '../shop/ShopProductCard';

interface RecipeFeaturedProductsProps {
  onSelectProduct: (productSlug: string) => void;
  onNavigateShop?: () => void;
}

export const RecipeFeaturedProducts: React.FC<RecipeFeaturedProductsProps> = ({
  onSelectProduct,
  onNavigateShop,
}) => {
  return (
    <section className="w-full py-14 sm:py-18 border-t border-[#3C1518]/15 bg-white select-none" aria-labelledby="featured-products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#3C1518]/15 gap-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
                Pantry Essentials
              </span>
            </div>
            <h2
              id="featured-products-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#3C1518]"
            >
              EXPLORE MAGIC PRODUCTS USED IN RECIPES
            </h2>
          </div>

          {onNavigateShop && (
            <button
              type="button"
              onClick={onNavigateShop}
              className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 6-Product Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SHOP_PRODUCTS.map((product) => (
            <ShopProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
