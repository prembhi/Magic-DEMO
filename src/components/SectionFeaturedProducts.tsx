import React, { useState } from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { MAGIC_PRODUCTS } from '../data/products';

interface SectionFeaturedProductsProps {
  onAddToCart?: (productId: string) => void;
}

export const SectionFeaturedProducts: React.FC<SectionFeaturedProductsProps> = ({
  onAddToCart,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Six authentic products
  const products = MAGIC_PRODUCTS;

  return (
    <section
      id="spices"
      className="relative w-full bg-[#F5EDE1] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#3C1518]/10 select-none overflow-hidden"
      aria-labelledby="featured-products-heading"
    >
      {/* Background paper texture & warm glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 right-10 w-96 h-96 rounded-full bg-[#D4A843]/15 blur-3xl" />
        <div className="absolute -bottom-40 left-10 w-96 h-96 rounded-full bg-[#C8102E]/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#C8102E] font-bold mb-1.5">
              <span className="w-4 h-[1.5px] bg-[#C8102E]" />
              <span>Best Sellers · Signature Selection</span>
              <span className="text-[#3C1518]/30">·</span>
              <span className="font-arabic font-normal text-xs text-[#3C1518]/80">المنتجات الأكثر طلباً</span>
            </div>
            <h2
              id="featured-products-heading"
              className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#3C1518] tracking-tight"
            >
              MEET THE MAGIC
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B4226] max-w-md font-medium leading-relaxed">
            The foundation of authentic Indian home cooking. Hand-harvested pulses, stone-milled spices, and single-origin staples ready for export and retail.
          </p>
        </div>

        {/* CURATED PRODUCT PRESENTATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((prod) => {
            const isHovered = hoveredId === prod.id;

            return (
              <div
                key={prod.id}
                onMouseEnter={() => setHoveredId(prod.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-[#FDF6EC] rounded-xl border border-[#3C1518]/12 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Visual plinth / stage for product pouch */}
                <div className="relative w-full aspect-[1/1.18] flex items-center justify-center mb-6 overflow-visible">
                  {/* Atmospheric Glow on Hover */}
                  <div
                    className="absolute w-44 h-44 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundColor: prod.environment.glowColor,
                      opacity: isHovered ? 0.85 : 0.25,
                    }}
                  />

                  {/* Radiating concentric harvest arc lines */}
                  <svg
                    className={`absolute w-48 h-48 pointer-events-none transition-all duration-700 ${
                      isHovered ? 'scale-105 opacity-60 rotate-12' : 'scale-95 opacity-30 rotate-0'
                    }`}
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="44" stroke={prod.environment.accentColor} strokeWidth="1" strokeDasharray="3 3" fill="none" />
                    <circle cx="50" cy="50" r="36" stroke={prod.environment.themeColor} strokeWidth="0.8" fill="none" />
                  </svg>

                  {/* Authentic Stand-Up Packaging Pouch Image */}
                  <div className="relative w-[190px] sm:w-[210px] aspect-[1/1.42] flex items-center justify-center z-10">
                    <img
                      src={prod.image}
                      alt={`MAGIC ${prod.name} pouch`}
                      className={`w-full h-full object-contain transition-all duration-500 select-none pointer-events-none ${
                        isHovered ? 'scale-105' : 'scale-100'
                      }`}
                      style={{
                        filter: isHovered
                          ? 'drop-shadow(0 20px 24px rgba(60, 21, 24, 0.32)) drop-shadow(0 6px 10px rgba(200, 16, 46, 0.16))'
                          : 'drop-shadow(0 12px 16px rgba(60, 21, 24, 0.20))',
                      }}
                    />
                  </div>

                  {/* Drop contact shadow */}
                  <div
                    className="absolute bottom-2 inset-x-12 h-6 rounded-full blur-md pointer-events-none transition-transform duration-500"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.38) 0%, transparent 70%)',
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                </div>

                {/* Product Metadata & Editorial Details */}
                <div className="flex flex-col flex-1 justify-between pt-2 border-t border-[#3C1518]/10">
                  <div>
                    {/* Category & Weight Label (Clean Unboxed) */}
                    <div className="flex items-center justify-between text-xs text-[#6B4226] mb-1.5 font-medium">
                      <span>{prod.spiceCategory}</span>
                      <span className="font-mono font-semibold text-[#3C1518]">
                        {prod.weight} · {prod.weightArabic}
                      </span>
                    </div>

                    {/* Product Name & Arabic Title */}
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#3C1518] group-hover:text-[#C8102E] transition-colors">
                        {prod.name}
                      </h3>
                      <span className="font-arabic font-bold text-lg text-[#C8102E]">
                        {prod.arabicName}
                      </span>
                    </div>

                    {/* Sensory culinary note */}
                    <p className="text-xs text-[#6B4226] line-clamp-2 mt-2 leading-relaxed font-normal">
                      {prod.culinaryProfile}
                    </p>
                  </div>

                  {/* Action & Pricing Tier */}
                  <div className="mt-5 pt-3.5 border-t border-[#3C1518]/10 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#3C1518]/60">
                        Packaging
                      </span>
                      <span className="font-mono text-xs font-bold text-[#3C1518]">
                        Aroma-Lock Pouch
                      </span>
                    </div>

                    {/* Red Brand CTA */}
                    <button
                      onClick={() => onAddToCart && onAddToCart(prod.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#3C1518] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider rounded border border-[#D4A843]/40 hover:border-[#D4A843] transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                      aria-label={`Add sample of ${prod.name} to inquiry bag`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D4A843]" />
                      <span>Request Sample</span>
                      <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-70 group-hover:opacity-100" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
