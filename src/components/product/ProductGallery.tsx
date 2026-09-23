import React, { useState } from 'react';
import { ShieldCheck, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';

interface ProductGalleryProps {
  product: ShopProduct;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const [activeView, setActiveView] = useState<'pouch' | 'terroir' | 'quality'>('pouch');
  const details = getProductSpecDetails(product.id);

  return (
    <div className="w-full flex flex-col gap-3">
      {/* LARGE EDITORIAL PRODUCT STAGE (55% Hero footprint) */}
      <div className="relative w-full bg-[#FAF7F2] border border-[#E6E0D6] rounded-sm p-6 sm:p-10 lg:p-12 flex flex-col items-center justify-between min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] overflow-hidden shadow-2xs">
        {/* Subtle warm background glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#D4A843]/15 blur-3xl" />
        </div>

        {/* Top Assurance Bar */}
        <div className="w-full flex items-center justify-between text-xs text-[#3C1518]/70 z-10 border-b border-[#E6E0D6]/60 pb-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2B6E2A]" />
            <span className="font-bold text-[11px] tracking-wider uppercase text-[#2B6E2A]">
              Authentic Indian Staples
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wide text-[#3C1518]/60">
            {product.weight} • {product.category}
          </span>
        </div>

        {/* Dynamic Interactive Stage Content */}
        {activeView === 'pouch' && (
          <div className="relative w-full flex-1 flex items-center justify-center my-4 z-10">
            <img
              src={product.image}
              alt={product.altText}
              loading="eager"
              className="max-h-[380px] sm:max-h-[440px] lg:max-h-[480px] w-auto max-w-full object-contain filter drop-shadow-md select-none transition-transform duration-300 hover:scale-102"
            />
          </div>
        )}

        {activeView === 'terroir' && (
          <div className="relative w-full flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-8 z-10 bg-white/70 backdrop-blur-xs rounded border border-[#E6E0D6] my-6">
            <div className="w-12 h-12 rounded-full bg-[#D4A843]/15 text-[#D4A843] flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-[#9A7320]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C8102E] mb-1">
              Geographical Terroir
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3C1518] mb-2">
              {details.origin}
            </h3>
            <p className="text-xs sm:text-sm text-[#3C1518]/75 max-w-md leading-relaxed mb-4">
              Cultivated in traditional agricultural belts known for prime mineral soils and ideal sun exposure. Hand-harvested and directly sourced.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF7F2] rounded border border-[#E6E0D6] text-xs font-semibold text-[#3C1518]">
              <span>Packaged for UAE Express Retail</span>
            </div>
          </div>
        )}

        {activeView === 'quality' && (
          <div className="relative w-full flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-8 z-10 bg-white/70 backdrop-blur-xs rounded border border-[#E6E0D6] my-6">
            <div className="w-12 h-12 rounded-full bg-[#2B6E2A]/10 text-[#2B6E2A] flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2B6E2A] mb-1">
              Inspection Standards
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3C1518] mb-2">
              Optical Laser Grade 1
            </h3>
            <p className="text-xs sm:text-sm text-[#3C1518]/75 max-w-md leading-relaxed mb-4">
              Dual-pass optical sorting eliminates stones, foreign matter, and discolored grains. Packaged unpolished with zero artificial dyes.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {details.certificationsVerified.map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3C1518] bg-white px-2.5 py-1 rounded border border-[#E6E0D6]"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#2B6E2A]" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Stage Spec Footer */}
        <div className="w-full flex items-center justify-between text-[11px] text-[#3C1518]/65 z-10 border-t border-[#E6E0D6]/60 pt-3">
          <span>Airtight Multi-Barrier Foil</span>
          <span className="font-arabic text-[#3C1518]/60 text-xs">
            {product.arabicName}
          </span>
        </div>
      </div>

      {/* GALLERY / VIEW SWITCHER CONTROLS */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveView('pouch')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded border transition-all cursor-pointer text-center ${
            activeView === 'pouch'
              ? 'bg-white border-[#C8102E] text-[#C8102E] shadow-2xs font-bold'
              : 'bg-[#FAF7F2] border-[#E6E0D6] text-[#3C1518]/70 hover:bg-white'
          }`}
        >
          Packaging View
        </button>

        <button
          type="button"
          onClick={() => setActiveView('terroir')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded border transition-all cursor-pointer text-center ${
            activeView === 'terroir'
              ? 'bg-white border-[#C8102E] text-[#C8102E] shadow-2xs font-bold'
              : 'bg-[#FAF7F2] border-[#E6E0D6] text-[#3C1518]/70 hover:bg-white'
          }`}
        >
          Terroir & Origin
        </button>

        <button
          type="button"
          onClick={() => setActiveView('quality')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded border transition-all cursor-pointer text-center ${
            activeView === 'quality'
              ? 'bg-white border-[#C8102E] text-[#C8102E] shadow-2xs font-bold'
              : 'bg-[#FAF7F2] border-[#E6E0D6] text-[#3C1518]/70 hover:bg-white'
          }`}
        >
          Purity & Quality
        </button>
      </div>
    </div>
  );
};
