import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';

interface ProductFaqSectionProps {
  product: ShopProduct;
}

export const ProductFaqSection: React.FC<ProductFaqSectionProps> = ({ product }) => {
  const details = getProductSpecDetails(product.id);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6" aria-labelledby="faq-heading">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F2] rounded-full border border-[#E6E0D6] text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8102E] mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Product Transparency</span>
        </div>
        <h2
          id="faq-heading"
          className="text-3xl sm:text-4xl font-serif font-bold text-[#3C1518]"
        >
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-[#3C1518]/70 mt-2 max-w-md mx-auto">
          Clear answers regarding harvesting, optical laser grading, cooking times, and storage in the UAE.
        </p>
      </div>

      {/* Accordion List */}
      <div className="border-t border-[#3C1518]/15 divide-y divide-[#3C1518]/15">
        {details.faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-2">
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="w-full py-4 flex items-center justify-between text-left cursor-pointer group gap-4"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-serif font-bold text-[#3C1518] group-hover:text-[#C8102E] transition-colors leading-snug">
                  {faq.question}
                </span>
                <div className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#E6E0D6] flex items-center justify-center shrink-0 text-[#3C1518] group-hover:border-[#C8102E] group-hover:text-[#C8102E] transition-all">
                  {isOpen ? (
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="pb-6 pt-1 text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed font-sans pr-8 animate-in fade-in duration-200">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
