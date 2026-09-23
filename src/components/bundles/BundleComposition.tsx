import React from 'react';
import { ShopProduct } from '../../data/shopProducts';

interface BundleCompositionProps {
  products: ShopProduct[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BundleComposition: React.FC<BundleCompositionProps> = ({
  products,
  className = '',
  size = 'md',
}) => {
  const containerHeight =
    size === 'sm' ? 'h-44' : size === 'lg' ? 'h-64 sm:h-80' : 'h-52 sm:h-60';

  // Different dynamic layouts based on count of items (2, 3, 4, 5)
  return (
    <div
      className={`relative w-full ${containerHeight} bg-gradient-to-b from-[#FAF5EE] to-[#F5ECE0] rounded-xs border border-[#E6DFC8]/70 flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      {/* Artisan culinary spice-plate backdrop with brass hairline borders */}
      <div className="absolute inset-4 rounded-full border border-[#D4A843]/20 bg-white/40 pointer-events-none" />
      <div className="absolute inset-8 rounded-full border border-dashed border-[#D4A843]/30 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-[#D4A843]/10 via-transparent to-transparent pointer-events-none" />

      {/* Composition arrangements */}
      {products.length === 2 && (
        <div className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 px-4 w-full h-full">
          <img
            src={products[0].image}
            alt={products[0].name}
            className="max-h-[75%] w-auto object-contain filter drop-shadow-[0_10px_16px_rgba(60,21,24,0.2)] transform -rotate-3 transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <img
            src={products[1].image}
            alt={products[1].name}
            className="max-h-[75%] w-auto object-contain filter drop-shadow-[0_12px_18px_rgba(60,21,24,0.22)] transform rotate-3 -ml-4 transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {products.length === 3 && (
        <div className="relative z-10 flex items-center justify-center px-2 w-full h-full">
          <img
            src={products[0].image}
            alt={products[0].name}
            className="max-h-[68%] w-auto object-contain filter drop-shadow-[0_8px_14px_rgba(60,21,24,0.18)] transform -rotate-6 z-10 transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <img
            src={products[1].image}
            alt={products[1].name}
            className="max-h-[82%] w-auto object-contain filter drop-shadow-[0_14px_22px_rgba(60,21,24,0.25)] z-20 -mx-6 transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <img
            src={products[2].image}
            alt={products[2].name}
            className="max-h-[68%] w-auto object-contain filter drop-shadow-[0_8px_14px_rgba(60,21,24,0.18)] transform rotate-6 z-10 transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {products.length === 4 && (
        <div className="relative z-10 flex items-center justify-center px-1 w-full h-full">
          <img
            src={products[0].image}
            alt={products[0].name}
            className="max-h-[62%] w-auto object-contain filter drop-shadow-[0_6px_12px_rgba(60,21,24,0.16)] transform -rotate-8 z-10 transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <img
            src={products[1].image}
            alt={products[1].name}
            className="max-h-[74%] w-auto object-contain filter drop-shadow-[0_12px_18px_rgba(60,21,24,0.22)] transform -rotate-2 z-20 -ml-5 transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <img
            src={products[2].image}
            alt={products[2].name}
            className="max-h-[74%] w-auto object-contain filter drop-shadow-[0_12px_18px_rgba(60,21,24,0.22)] transform rotate-2 z-20 -ml-5 transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <img
            src={products[3].image}
            alt={products[3].name}
            className="max-h-[62%] w-auto object-contain filter drop-shadow-[0_6px_12px_rgba(60,21,24,0.16)] transform rotate-8 z-10 -ml-5 transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {products.length >= 5 && (
        <div className="relative z-10 flex items-center justify-center px-1 w-full h-full">
          {/* Back row pulses */}
          <div className="flex items-center justify-center -space-x-4 w-full">
            {products.slice(0, 3).map((prod, idx) => (
              <img
                key={prod.id}
                src={prod.image}
                alt={prod.name}
                className={`max-h-[68%] w-auto object-contain filter drop-shadow-[0_8px_14px_rgba(60,21,24,0.18)] transition-transform duration-300 hover:scale-105 ${
                  idx === 0 ? '-rotate-6 z-10' : idx === 1 ? 'z-20 scale-105' : 'rotate-6 z-10'
                }`}
                loading="lazy"
              />
            ))}
          </div>

          {/* Front row spices */}
          <div className="absolute bottom-2 flex items-center justify-center gap-3 z-30">
            {products.slice(3).map((prod, idx) => (
              <img
                key={prod.id}
                src={prod.image}
                alt={prod.name}
                className={`max-h-20 sm:max-h-24 w-auto object-contain filter drop-shadow-[0_12px_18px_rgba(60,21,24,0.3)] transition-transform duration-300 hover:scale-110 ${
                  idx === 0 ? '-rotate-3' : 'rotate-3'
                }`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}

      {/* Product count pill badge */}
      <div className="absolute top-2.5 right-2.5 z-30 bg-white/90 backdrop-blur-xs border border-[#D9CEBA] px-2 py-0.5 rounded-2xs text-[10px] font-mono font-bold text-[#3C1518]/70 shadow-2xs">
        {products.length} STAPLES
      </div>
    </div>
  );
};
