import React from 'react';
import { Compass, Sparkles, ShieldCheck, Leaf } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';

interface ProductWhyMagicProps {
  product: ShopProduct;
}

export const ProductWhyMagic: React.FC<ProductWhyMagicProps> = ({ product }) => {
  const details = getProductSpecDetails(product.id);

  const iconList = [
    <Compass className="w-5 h-5 text-[#C8102E]" />,
    <Sparkles className="w-5 h-5 text-[#C8102E]" />,
    <ShieldCheck className="w-5 h-5 text-[#C8102E]" />,
    <Leaf className="w-5 h-5 text-[#C8102E]" />,
  ];

  return (
    <section className="w-full mt-14 pt-10 border-t border-[#E6E0D6]" aria-labelledby="why-magic-heading">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C8102E] block mb-1">
            The MAGIC Quality Standard
          </span>
          <h2
            id="why-magic-heading"
            className="text-2xl sm:text-3xl font-serif font-bold text-[#3C1518]"
          >
            Why Choose MAGIC Pantry Staples
          </h2>
          <p className="text-xs sm:text-sm text-[#3C1518]/70 mt-2 max-w-xl mx-auto">
            Direct farmer sourcing, optical purity sorting, and protective packaging tailored for UAE pantries.
          </p>
        </div>

        {/* Art-Directed Editorial Benefit Grid (Restrained, elegant, non-generic) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {details.benefits.map((b, index) => (
            <div
              key={index}
              className="flex flex-col items-start border-l-2 border-[#C8102E]/30 pl-4 py-1"
            >
              <div className="mb-2 p-1.5 bg-[#FAF7F2] rounded border border-[#E6E0D6]">
                {iconList[index % iconList.length]}
              </div>
              <h3 className="text-sm font-bold text-[#3C1518] font-serif mb-1">
                {b.title}
              </h3>
              <p className="text-xs text-[#3C1518]/75 leading-relaxed">
                {b.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
