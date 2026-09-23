import React from 'react';
import { Compass, Sparkles, ShieldCheck, Leaf } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';

interface ProductEditorialBenefitStripProps {
  product: ShopProduct;
}

export const ProductEditorialBenefitStrip: React.FC<ProductEditorialBenefitStripProps> = ({
  product,
}) => {
  const details = getProductSpecDetails(product.id);

  const pillars = [
    {
      num: '01',
      icon: <Compass className="w-5 h-5 text-[#C8102E]" />,
      title: details.benefits[0]?.title || 'Single-Origin Belts',
      subtitle: details.benefits[0]?.subtitle || 'Sourced directly from verified regional terroirs in India.',
    },
    {
      num: '02',
      icon: <Sparkles className="w-5 h-5 text-[#C8102E]" />,
      title: details.benefits[1]?.title || 'Optical Sort Grade 1',
      subtitle: details.benefits[1]?.subtitle || 'Dual-pass optical laser sorting for uniform grain purity.',
    },
    {
      num: '03',
      icon: <ShieldCheck className="w-5 h-5 text-[#C8102E]" />,
      title: details.benefits[2]?.title || 'Nitrogen-Flushed Foil',
      subtitle: details.benefits[2]?.subtitle || 'Airtight multi-barrier packaging locking in farm aromatics.',
    },
    {
      num: '04',
      icon: <Leaf className="w-5 h-5 text-[#C8102E]" />,
      title: details.benefits[3]?.title || '100% Pure & Clean',
      subtitle: details.benefits[3]?.subtitle || 'Completely unpolished with zero artificial dyes or polishing oils.',
    },
  ];

  return (
    <section className="w-full mt-14 sm:mt-18 border-y border-[#3C1518]/15 bg-[#FAF7F2] py-10 sm:py-14 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8102E] block mb-1">
            The MAGIC Benchmark
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3C1518]">
            Pure Staples, Rooted in Terroir
          </h2>
        </div>

        {/* 4-Column Editorial Rhythm Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map((p) => (
            <div key={p.num} className="flex flex-col items-start border-t border-[#3C1518]/15 pt-4">
              <div className="flex items-center justify-between w-full mb-3">
                <span className="font-mono text-xs font-bold text-[#D4A843] tracking-widest">
                  {p.num}
                </span>
                <div className="p-1.5 bg-white rounded-full border border-[#E6E0D6] shadow-2xs">
                  {p.icon}
                </div>
              </div>
              <h3 className="text-base font-serif font-bold text-[#3C1518] mb-1.5">
                {p.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-[#3C1518]/75 leading-relaxed">
                {p.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
