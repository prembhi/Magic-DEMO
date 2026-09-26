import React from 'react';
import { Compass, Sparkles, ShieldCheck, Leaf } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';
import { useLanguage } from '../../context/LanguageContext';

interface ProductEditorialBenefitStripProps {
  product: ShopProduct;
}

export const ProductEditorialBenefitStrip: React.FC<ProductEditorialBenefitStripProps> = ({
  product,
}) => {
  const { isRTL } = useLanguage();
  const details = getProductSpecDetails(product.id);

  const pillars = [
    {
      num: '01',
      icon: <Compass className="w-4 h-4 text-[#C8102E]" />,
      titleEn: details.benefits[0]?.title || 'Single-Origin Belts',
      titleAr: 'أقاليم أحادية المنشأ',
      subtitleEn: details.benefits[0]?.subtitle || 'Sourced directly from verified regional terroirs in India.',
      subtitleAr: 'توريد مباشر من مزارع وأقاليم هندية متوارثة.',
    },
    {
      num: '02',
      icon: <Sparkles className="w-4 h-4 text-[#C8102E]" />,
      titleEn: details.benefits[1]?.title || 'Optical Sort Grade 1',
      titleAr: 'فرز ليزري نقي الدرجة 1',
      subtitleEn: details.benefits[1]?.subtitle || 'Dual-pass optical laser sorting for uniform grain purity.',
      subtitleAr: 'فرز ليزري دقيق لضمان جودة ونقاء الحبوب دون لمعان كيميائي.',
    },
    {
      num: '03',
      icon: <ShieldCheck className="w-4 h-4 text-[#C8102E]" />,
      titleEn: details.benefits[2]?.title || 'Nitrogen-Flushed Foil',
      titleAr: 'تغليف مغلق بالنيتروجين',
      subtitleEn: details.benefits[2]?.subtitle || 'Airtight multi-barrier packaging locking in farm aromatics.',
      subtitleAr: 'أكياس محكمة متعددة الطبقات تحفظ الزيوت العطرية ونقاء المزرعة.',
    },
    {
      num: '04',
      icon: <Leaf className="w-4 h-4 text-[#C8102E]" />,
      titleEn: details.benefits[3]?.title || '100% Pure & Clean',
      titleAr: 'نقي وخالٍ من الغش 100%',
      subtitleEn: details.benefits[3]?.subtitle || 'Completely unpolished with zero artificial dyes or polishing oils.',
      subtitleAr: 'غير ملمع نهائياً وبدون أي ملونات أو إضافات صناعية.',
    },
  ];

  return (
    <section
      className="w-full mt-10 sm:mt-14 border-y border-[#3C1518]/15 bg-[#FAF7F2] py-8 sm:py-10 select-none"
      aria-labelledby="product-benefits-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-7">
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#C8102E] block mb-1">
            {isRTL ? 'معيار ماجيك المعتمد' : 'THE MAGIC BENCHMARK'}
          </span>
          <h2
            id="product-benefits-heading"
            className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-[#3C1518] tracking-tight"
          >
            {isRTL ? 'أساسيات نقية متجذرة في بيئتها الأصلية.' : 'Pure Staples, Rooted in Terroir.'}
          </h2>
        </div>

        {/* 4-Column Editorial Rhythm Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="flex flex-col items-start border-t border-[#3C1518]/15 pt-3.5"
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="font-mono text-xs font-bold text-[#D4A843] tracking-widest">
                  {p.num}
                </span>
                <div className="p-1.5 bg-white rounded-full border border-[#3C1518]/10 shadow-2xs">
                  {p.icon}
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-display font-bold text-[#3C1518] mb-1">
                {isRTL ? p.titleAr : p.titleEn}
              </h3>
              <p className="text-xs text-[#3C1518]/75 leading-relaxed font-sans">
                {isRTL ? p.subtitleAr : p.subtitleEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
