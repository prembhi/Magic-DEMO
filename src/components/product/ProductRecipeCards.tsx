import React from 'react';
import { ChefHat, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';

interface ProductRecipeCardsProps {
  product: ShopProduct;
  onSelectProduct?: (slug: string) => void;
}

export const ProductRecipeCards: React.FC<ProductRecipeCardsProps> = ({
  product,
  onSelectProduct,
}) => {
  const details = getProductSpecDetails(product.id);

  return (
    <section className="w-full py-16 sm:py-20 border-t border-[#3C1518]/15 bg-[#FAF7F2]" aria-labelledby="recipe-cards-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#3C1518]/15 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ChefHat className="w-4 h-4 text-[#C8102E]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
                Kitchen Applications
              </span>
            </div>
            <h2
              id="recipe-cards-heading"
              className="text-3xl sm:text-4xl font-serif font-bold text-[#3C1518]"
            >
              Cook With MAGIC
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#3C1518]/70 max-w-md font-sans">
            How home cooks and culinary masters elevate daily comfort with unadulterated {product.name}.
          </p>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {details.culinaryDishes.map((dish, idx) => (
            <article
              key={dish.name}
              className="bg-white border border-[#E6E0D6] rounded-xs p-6 flex flex-col justify-between hover:border-[#C8102E]/50 hover:shadow-xs transition-all relative group"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between text-xs text-[#3C1518]/60 mb-3 pb-2 border-b border-[#E6E0D6]/60">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C8102E] bg-[#C8102E]/10 px-2 py-0.5 rounded-2xs">
                    Application 0{idx + 1}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-[#3C1518]/60" />
                    {dish.prepTime}
                  </span>
                </div>

                {/* Dish titles */}
                <div className="mb-2">
                  <h3 className="text-xl font-serif font-bold text-[#3C1518] group-hover:text-[#C8102E] transition-colors">
                    {dish.name}
                  </h3>
                  <span className="font-arabic text-sm text-[#3C1518]/50 block mt-0.5">
                    {dish.arabicName}
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#D4A843] uppercase tracking-wide mb-3">
                  {dish.tagline}
                </p>

                <p className="text-xs text-[#3C1518]/80 leading-relaxed font-sans mb-6">
                  {dish.description}
                </p>
              </div>

              {/* Spice pairings */}
              <div className="pt-4 border-t border-[#E6E0D6] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#3C1518]/60 block flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D4A843]" /> Recommended Pairings:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {dish.pairings.map((p) => {
                    const targetSlug = p.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => onSelectProduct && onSelectProduct(targetSlug)}
                        className="px-2.5 py-1 bg-[#FAF7F2] hover:bg-[#C8102E] text-[#3C1518] hover:text-white border border-[#E6E0D6] hover:border-[#C8102E] rounded-2xs text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span>{p}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
