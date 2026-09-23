import React from 'react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';

interface ProductAboutProps {
  product: ShopProduct;
}

export const ProductAbout: React.FC<ProductAboutProps> = ({ product }) => {
  const details = getProductSpecDetails(product.id);

  return (
    <section className="w-full mt-14 pt-10 border-t border-[#E6E0D6]" aria-labelledby="about-product-heading">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C8102E] block mb-1">
            Provenance & Specifications
          </span>
          <h2
            id="about-product-heading"
            className="text-2xl sm:text-3xl font-serif font-bold text-[#3C1518]"
          >
            About This Product
          </h2>
          <p className="text-xs sm:text-sm text-[#3C1518]/75 mt-2.5 max-w-2xl mx-auto leading-relaxed">
            {details.shortDescription}
          </p>
        </div>

        {/* Structured Information Grid (Art-directed editorial grid) */}
        <div className="bg-white border border-[#E6E0D6] rounded-xs divide-y divide-[#E6E0D6] shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3C1518]/60">
              Category
            </span>
            <span className="sm:col-span-2 text-sm font-semibold text-[#3C1518] mt-0.5 sm:mt-0">
              {product.category} {product.subCategory ? `(${product.subCategory})` : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3C1518]/60">
              Pack Weight
            </span>
            <span className="sm:col-span-2 text-sm font-bold font-mono text-[#3C1518] mt-0.5 sm:mt-0">
              {product.weight}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3C1518]/60">
              Harvest Origin
            </span>
            <span className="sm:col-span-2 text-sm font-semibold text-[#3C1518] mt-0.5 sm:mt-0">
              {details.origin}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3C1518]/60">
              Ingredient Statement
            </span>
            <span className="sm:col-span-2 text-sm text-[#3C1518] mt-0.5 sm:mt-0">
              {details.ingredients}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3C1518]/60">
              Processing & Sorting
            </span>
            <span className="sm:col-span-2 text-sm text-[#3C1518]/85 mt-0.5 sm:mt-0">
              {details.processing}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3C1518]/60">
              Storage Instructions
            </span>
            <span className="sm:col-span-2 text-sm text-[#3C1518]/85 mt-0.5 sm:mt-0">
              {details.storage}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3C1518]/60">
              Shelf Life
            </span>
            <span className="sm:col-span-2 text-sm font-mono text-[#3C1518] mt-0.5 sm:mt-0">
              {details.shelfLife}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
