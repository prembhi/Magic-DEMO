import React from 'react';
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
  // Filter out current product, return up to 4 other authentic products
  const related = SHOP_PRODUCTS.filter((p) => p.id !== currentProduct.id).slice(0, 4);

  return (
    <section className="w-full mt-14 pt-10 border-t border-[#E6E0D6]" aria-labelledby="related-products-heading">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C8102E] block mb-1">
              Pairing Staples
            </span>
            <h2
              id="related-products-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-[#3C1518]"
            >
              EXPLORE MORE FROM MAGIC
            </h2>
          </div>
          <p className="text-xs text-[#3C1518]/60 mt-1 sm:mt-0">
            Single-origin pulses and spices from verified Indian harvests
          </p>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
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
