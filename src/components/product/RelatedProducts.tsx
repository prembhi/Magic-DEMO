import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SHOP_PRODUCTS, ShopProduct } from '../../data/shopProducts';
import { ShopProductCard } from '../shop/ShopProductCard';

interface RelatedProductsProps {
  currentProduct: ShopProduct;
  onSelectProduct: (productSlug: string) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProduct,
  onSelectProduct,
}) => {
  // Filter out current product, return up to 4 authentic catalog items
  const related = SHOP_PRODUCTS.filter((p) => p.id !== currentProduct.id).slice(0, 4);

  return (
    <section className="w-full py-16 sm:py-20 border-t border-[#3C1518]/15 bg-white select-none" aria-labelledby="related-products-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#3C1518]/15 gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
                Complete Your Pantry
              </span>
            </div>
            <h2
              id="related-products-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#3C1518]"
            >
              EXPLORE MORE FROM MAGIC
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#3C1518]/65 font-sans">
            Single-origin pulses and unadulterated spices from verified Indian harvests
          </p>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
          {related.map((prod) => (
            <ShopProductCard
              key={prod.id}
              product={prod}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
