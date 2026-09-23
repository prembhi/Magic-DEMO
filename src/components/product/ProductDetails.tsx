import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';

interface ProductDetailsProps {
  product: ShopProduct;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const details = getProductSpecDetails(product.id);
  const [openSection, setOpenSection] = useState<'ingredients' | 'specifications' | 'storage' | null>('ingredients');

  const toggleSection = (section: 'ingredients' | 'specifications' | 'storage') => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="w-full mt-14 pt-10 border-t border-[#E6E0D6]" aria-labelledby="product-details-heading">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C8102E] block mb-1">
            Technical & Ingredient Data
          </span>
          <h2
            id="product-details-heading"
            className="text-2xl sm:text-3xl font-serif font-bold text-[#3C1518]"
          >
            Product Details & Transparency
          </h2>
        </div>

        {/* Clean Accordion List */}
        <div className="border border-[#E6E0D6] rounded-xs bg-white divide-y divide-[#E6E0D6] shadow-2xs">
          {/* SECTION 1: INGREDIENTS */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('ingredients')}
              className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF7F2]/40 transition-colors"
              aria-expanded={openSection === 'ingredients'}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                <span className="text-sm font-bold text-[#3C1518]">
                  Ingredients & Purity Assurance
                </span>
              </div>
              {openSection === 'ingredients' ? (
                <ChevronUp className="w-4 h-4 text-[#3C1518]/60" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#3C1518]/60" />
              )}
            </button>

            {openSection === 'ingredients' && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed border-t border-[#E6E0D6]/40 bg-[#FAF7F2]/30 space-y-3">
                <p className="font-medium text-[#3C1518]">
                  {details.ingredients}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#E6E0D6]/50 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#2B6E2A] font-bold">✓</span>
                    <span>100% Single-origin natural agricultural staple</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#2B6E2A] font-bold">✓</span>
                    <span>No artificial food coloring or synthetic polishing oils</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#2B6E2A] font-bold">✓</span>
                    <span>Naturally free from gluten and cholesterol</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#2B6E2A] font-bold">✓</span>
                    <span>Optical sorting level Grade 1 purity</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: SPECIFICATIONS */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('specifications')}
              className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF7F2]/40 transition-colors"
              aria-expanded={openSection === 'specifications'}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#D4A843]" />
                <span className="text-sm font-bold text-[#3C1518]">
                  Product Specifications & Origin Terroir
                </span>
              </div>
              {openSection === 'specifications' ? (
                <ChevronUp className="w-4 h-4 text-[#3C1518]/60" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#3C1518]/60" />
              )}
            </button>

            {openSection === 'specifications' && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed border-t border-[#E6E0D6]/40 bg-[#FAF7F2]/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#3C1518]/60 block">
                      Origin Belts
                    </span>
                    <span className="font-semibold text-[#3C1518] mt-0.5 block">
                      {details.origin}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#3C1518]/60 block">
                      Net Unit Weight
                    </span>
                    <span className="font-mono font-bold text-[#3C1518] mt-0.5 block">
                      {product.weight}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#3C1518]/60 block">
                      Processing Standards
                    </span>
                    <span className="text-xs text-[#3C1518]/80 mt-0.5 block">
                      {details.processing}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#3C1518]/60 block">
                      Retail Packaging Format
                    </span>
                    <span className="text-xs text-[#3C1518]/80 mt-0.5 block">
                      Airtight Standup Pouch with Nitrogen Barrier Foil
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: STORAGE */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('storage')}
              className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF7F2]/40 transition-colors"
              aria-expanded={openSection === 'storage'}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#3C1518]" />
                <span className="text-sm font-bold text-[#3C1518]">
                  Storage Guidelines & Shelf Life
                </span>
              </div>
              {openSection === 'storage' ? (
                <ChevronUp className="w-4 h-4 text-[#3C1518]/60" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#3C1518]/60" />
              )}
            </button>

            {openSection === 'storage' && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed border-t border-[#E6E0D6]/40 bg-[#FAF7F2]/30 space-y-2">
                <p>
                  <strong className="text-[#3C1518]">Storage: </strong>
                  {details.storage}
                </p>
                <p>
                  <strong className="text-[#3C1518]">Best Before: </strong>
                  {details.shelfLife}
                </p>
                <p className="text-xs text-[#3C1518]/60 pt-2 border-t border-[#E6E0D6]/50">
                  Tip: In warmer Gulf climates, transfer to a dry glass or stainless steel jar after opening for optimal aroma retention.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
