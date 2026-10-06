import React, { useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { SHOP_PRODUCTS, ShopProduct } from '../../data/shopProducts';
import { ShopProductCard } from '../shop/ShopProductCard';
import { useLanguage } from '../../context/LanguageContext';

interface RelatedProductsProps {
  currentProduct: ShopProduct;
  onSelectProduct: (productSlug: string) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProduct,
  onSelectProduct,
}) => {
  const { isRTL } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter out current product and display remaining authentic staples
  const related = SHOP_PRODUCTS.filter((p) => p.id !== currentProduct.id).slice(0, 4);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 320;
    const mult = isRTL ? (direction === 'left' ? 1 : -1) : direction === 'left' ? -1 : 1;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount * mult,
      behavior: 'smooth',
    });
  };

  return (
    <section
      className="w-full py-12 sm:py-16 border-t border-[#3C1518]/15 bg-white select-none overflow-hidden"
      aria-labelledby="related-products-heading"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3.5 border-b border-[#3C1518]/15 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#C8102E] mb-1">
              <Sparkles className="w-3.5 h-3.5 fill-[#C8102E]" />
              <span>{isRTL ? 'أكمل مؤونة مطبخك' : 'COMPLETE YOUR PANTRY'}</span>
            </div>
            <h2
              id="related-products-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-[#3C1518] tracking-tight"
            >
              {isRTL ? 'قد يعجبك أيضاً من ماجيك.' : 'YOU MAY ALSO LIKE.'}
            </h2>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-block text-xs font-sans font-semibold text-[#3C1518]/60 me-1">
              {isRTL ? 'اسحب ←' : 'SWIPE →'}
            </span>
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full bg-white border border-[#3C1518]/20 hover:border-[#C8102E] text-[#3C1518] hover:text-[#C8102E] shadow-2xs flex items-center justify-center transition-all cursor-pointer min-h-[44px]"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full bg-white border border-[#3C1518]/20 hover:border-[#C8102E] text-[#3C1518] hover:text-[#C8102E] shadow-2xs flex items-center justify-center transition-all cursor-pointer min-h-[44px]"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Canonical Product Cards Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar"
        >
          {related.map((prod) => (
            <div
              key={prod.id}
              className="shrink-0 w-[290px] sm:w-[320px] lg:w-[340px] snap-start"
            >
              <ShopProductCard
                product={prod}
                onSelectProduct={onSelectProduct}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
