import React from 'react';
import { Quote, Sparkles, MapPin } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';

interface ProductStorytellingProps {
  product: ShopProduct;
}

export const ProductStorytelling: React.FC<ProductStorytellingProps> = ({ product }) => {
  const details = getProductSpecDetails(product.id);
  const story = details.story;

  return (
    <section className="w-full py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6" aria-labelledby="story-heading">
      {/* Top Tagline */}
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-[#D4A843]" />
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8102E]">
          Terroir & Harvest Story
        </span>
      </div>

      {/* Main Headline */}
      <div className="max-w-3xl mb-10 sm:mb-14">
        <h2
          id="story-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3C1518] leading-[1.1] tracking-tight mb-4"
        >
          {story.headline}
        </h2>
        <p className="text-base sm:text-lg text-[#3C1518]/75 font-serif italic">
          {story.subheadline}
        </p>
      </div>

      {/* Editorial Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Terroir & Soil Story */}
        <div className="md:col-span-6 space-y-5 text-xs sm:text-sm text-[#3C1518]/85 leading-relaxed font-sans">
          <div className="flex items-center gap-2 text-xs font-bold text-[#3C1518] uppercase tracking-wider pb-2 border-b border-[#3C1518]/15">
            <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>Origin Belts: {details.origin}</span>
          </div>
          <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-[#C8102E] first-letter:float-left first-letter:mr-2.5 first-letter:leading-none">
            {story.terroirNotes}
          </p>
          <p>
            {story.harvestStory}
          </p>
        </div>

        {/* Right Column: Flavor Profile & Pull Quote */}
        <div className="md:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xs relative">
            <Quote className="w-8 h-8 text-[#D4A843]/40 absolute top-4 right-4" />
            <p className="text-sm sm:text-base font-serif italic text-[#3C1518] leading-snug mb-3">
              {story.quote}
            </p>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#3C1518]/60 font-semibold">
              The MAGIC Kitchen Philosophy
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3C1518] pb-1 border-b border-[#3C1518]/15">
              Sensory & Culinary Profile
            </h3>
            <p className="text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed font-sans">
              {story.flavorNotes}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
