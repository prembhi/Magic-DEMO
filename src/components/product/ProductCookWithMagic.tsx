import React, { useState } from 'react';
import { ChefHat, Clock, Sparkles } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';

interface ProductCookWithMagicProps {
  product: ShopProduct;
  onSelectProduct?: (slug: string) => void;
}

export const ProductCookWithMagic: React.FC<ProductCookWithMagicProps> = ({
  product,
  onSelectProduct,
}) => {
  const details = getProductSpecDetails(product.id);
  const [activeDishIndex, setActiveDishIndex] = useState(0);

  const activeDish = details.culinaryDishes[activeDishIndex] || details.culinaryDishes[0];

  return (
    <section className="w-full mt-14 pt-10 border-t border-[#E6E0D6]" aria-labelledby="cook-with-magic-heading">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E6E0D6]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C8102E] block mb-1">
              Culinary Heritage
            </span>
            <h2
              id="cook-with-magic-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-[#3C1518]"
            >
              Cook With MAGIC
            </h2>
          </div>
          <p className="text-xs text-[#3C1518]/70 mt-1 sm:mt-0 max-w-sm">
            Traditional culinary applications and dish pairings for {product.name}.
          </p>
        </div>

        {/* Dish Switcher Tabs */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 mb-6">
          {details.culinaryDishes.map((dish, idx) => (
            <button
              key={dish.name}
              type="button"
              onClick={() => setActiveDishIndex(idx)}
              className={`py-2 px-4 rounded-xs border text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeDishIndex === idx
                  ? 'border-[#C8102E] bg-white text-[#C8102E] shadow-2xs'
                  : 'border-[#E6E0D6] bg-[#FAF7F2] text-[#3C1518]/70 hover:bg-white'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>{dish.name}</span>
              <span className="text-[10px] font-mono opacity-60">({dish.prepTime})</span>
            </button>
          ))}
        </div>

        {/* Selected Dish Editorial Card */}
        <div className="bg-white border border-[#E6E0D6] rounded-xs p-6 sm:p-8 relative shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-[#3C1518]/60 mb-2">
                <span className="font-mono text-[#C8102E] font-bold uppercase text-[10px] bg-[#C8102E]/10 px-2 py-0.5 rounded-2xs">
                  Featured Application
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#3C1518]/60" />
                  {activeDish.prepTime}
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3C1518]">
                  {activeDish.name}
                </h3>
                <span className="font-arabic text-base text-[#3C1518]/60">
                  {activeDish.arabicName}
                </span>
              </div>

              <p className="text-xs font-semibold text-[#D4A843] uppercase tracking-wider mt-1 mb-3">
                {activeDish.tagline}
              </p>

              <p className="text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed max-w-2xl mb-5">
                {activeDish.description}
              </p>

              {/* Spice Pairing Recommendations */}
              <div className="pt-4 border-t border-[#E6E0D6] flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#3C1518]/60 mr-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C8102E]" /> Recommended Pairings:
                </span>
                {activeDish.pairings.map((p) => {
                  const targetSlug = p.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => onSelectProduct && onSelectProduct(targetSlug)}
                      className="px-2.5 py-1 bg-[#FAF7F2] hover:bg-white border border-[#E6E0D6] hover:border-[#C8102E] text-xs font-semibold text-[#3C1518] hover:text-[#C8102E] rounded-xs transition-colors cursor-pointer"
                    >
                      + {p}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
