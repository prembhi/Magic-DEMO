import React from 'react';
import { Quote, Sparkles, MapPin, Sprout } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';

interface ProductStorytellingProps {
  product: ShopProduct;
}

export const ProductStorytelling: React.FC<ProductStorytellingProps> = ({ product }) => {
  const { isRTL } = useLanguage();
  const details = getProductSpecDetails(product.id);
  const story = details.story;

  // Select authentic visual based on product category & terroir
  let storyImage: string = MAGIC_ASSETS.farmHero;
  if (product.category === 'Ground Spices' || product.category === 'Whole Spices') {
    storyImage = MAGIC_ASSETS.spiceCourtyard;
  } else if (product.id === 'toor-dal') {
    storyImage = MAGIC_ASSETS.harvest;
  } else if (product.id === 'masoor-dal') {
    storyImage = MAGIC_ASSETS.soilRoots;
  } else if (product.id === 'moong-whole') {
    storyImage = MAGIC_ASSETS.cropDetail;
  }

  return (
    <section
      className="w-full py-12 sm:py-16 lg:py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 select-none"
      aria-labelledby="story-heading"
    >
      {/* Top Tagline */}
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#C8102E]">
          {isRTL ? 'قصة الحصاد والأصل الزراعي' : 'FROM FARM TO PANTRY • HARVEST STORY'}
        </span>
      </div>

      {/* Main Headline */}
      <div className="max-w-3xl mb-8 sm:mb-12">
        <h2
          id="story-heading"
          className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-[#3C1518] leading-[1.08] tracking-tight mb-3"
        >
          {story.headline}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-[#3C1518]/75 font-serif italic">
          {story.subheadline}
        </p>
      </div>

      {/* Editorial Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Authentic Photography Stage */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-[#3C1518]/15 shadow-md bg-[#FAF7F2]">
            <img
              src={storyImage}
              alt={`${product.name} Generational Farm Story`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3C1518]/60 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-3.5 inset-x-3.5 z-10 flex items-center justify-between text-white text-xs">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3C1518]/80 backdrop-blur-xs border border-white/20">
                <MapPin className="w-3 h-3 text-[#D4A843]" />
                <span className="font-mono text-[11px] font-bold">
                  {details.origin}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider opacity-85">
                {isRTL ? 'توثيق الحصاد' : 'Verified Harvest'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Terroir Narrative & Pull Quote */}
        <div className="lg:col-span-6 space-y-5">
          {/* Terroir & Soil Story */}
          <div className="space-y-3 text-xs sm:text-sm text-[#3C1518]/85 leading-relaxed font-sans">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#5A7247] uppercase tracking-wider pb-1.5 border-b border-[#3C1518]/10">
              <Sprout className="w-4 h-4 text-[#5A7247]" />
              <span>{isRTL ? 'التربة والبيئة الزراعية' : 'TERROIR & SOIL ECOLOGY'}</span>
            </div>
            <p className="first-letter:text-4xl first-letter:font-display first-letter:font-black first-letter:text-[#C8102E] first-letter:float-left rtl:first-letter:float-right first-letter:mr-2 rtl:first-letter:mr-0 rtl:first-letter:ml-2 first-letter:leading-none">
              {story.terroirNotes}
            </p>
            <p className="text-[#3C1518]/80">
              {story.harvestStory}
            </p>
          </div>

          {/* Editorial Pull Quote Box */}
          <div className="p-5 sm:p-6 bg-[#FAF7F2] border border-[#3C1518]/15 rounded-xl relative shadow-2xs">
            <Quote className="w-7 h-7 text-[#D4A843]/40 absolute top-4 end-4" />
            <p className="text-sm sm:text-base font-serif italic text-[#3C1518] leading-snug mb-2.5 pe-6">
              &ldquo;{story.quote}&rdquo;
            </p>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#6B4226] font-bold">
              {isRTL ? 'فلسفة مطبخ ماجيك' : 'THE MAGIC KITCHEN PHILOSOPHY'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
