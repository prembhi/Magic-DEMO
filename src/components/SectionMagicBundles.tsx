import React, { useState } from 'react';
import { Package, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { MAGIC_ASSETS } from '../constants/assets';

interface BundleConcept {
  id: string;
  name: string;
  arabicName: string;
  headline: string;
  description: string;
  products: { image: string; alt: string; offset: { x: number; y: number; rot: number; z: number; scale: number } }[];
  accentColor: string;
  badge: string;
}

interface SectionMagicBundlesProps {
  onAddToCart?: (productId: string) => void;
}

export const SectionMagicBundles: React.FC<SectionMagicBundlesProps> = ({
  onAddToCart,
}) => {
  const [hoveredBundle, setHoveredBundle] = useState<string | null>(null);

  const bundles: BundleConcept[] = [
    {
      id: 'everyday-kitchen',
      name: 'EVERYDAY KITCHEN',
      arabicName: 'مجموعة المطبخ اليومي',
      headline: 'The Core Five Staples for Daily Meals',
      description:
        'A harmonized pantry foundation containing our essential Toor, Masoor, and Moong pulses paired with pure Haldi powder and whole Jeera seeds.',
      accentColor: '#D4881E',
      badge: '5 Essential Staples',
      products: [
        { image: MAGIC_ASSETS.toor, alt: 'Toor Dal', offset: { x: -60, y: 15, rot: -8, z: 10, scale: 0.82 } },
        { image: MAGIC_ASSETS.masoor, alt: 'Masoor Dal', offset: { x: -20, y: 0, rot: -3, z: 20, scale: 0.95 } },
        { image: MAGIC_ASSETS.moong, alt: 'Moong Whole', offset: { x: 30, y: 20, rot: 6, z: 15, scale: 0.85 } },
        { image: MAGIC_ASSETS.haldi, alt: 'Haldi', offset: { x: -45, y: 40, rot: -10, z: 25, scale: 0.75 } },
        { image: MAGIC_ASSETS.jeera, alt: 'Jeera', offset: { x: 45, y: 45, rot: 8, z: 30, scale: 0.75 } },
      ],
    },
    {
      id: 'curry-essentials',
      name: 'CURRY ESSENTIALS',
      arabicName: 'أساسيات الكاري',
      headline: 'The Harmonic Trio of Gravy & Tadka',
      description:
        'Single-origin whole cumin, deep golden turmeric, and pristine split lentils formulated for fragrant curries, kormas, and gravies.',
      accentColor: '#C8102E',
      badge: 'Curry Foundation',
      products: [
        { image: MAGIC_ASSETS.jeera, alt: 'Jeera', offset: { x: -45, y: 10, rot: -6, z: 10, scale: 0.88 } },
        { image: MAGIC_ASSETS.masoor, alt: 'Masoor Dal', offset: { x: 0, y: -10, rot: 0, z: 20, scale: 1.05 } },
        { image: MAGIC_ASSETS.haldi, alt: 'Haldi', offset: { x: 50, y: 15, rot: 7, z: 15, scale: 0.9 } },
      ],
    },
    {
      id: 'starter-box',
      name: 'MAGIC STARTER BOX',
      arabicName: 'صندوق البداية السحري',
      headline: 'The Complete Heritage Discovery Collection',
      description:
        'Experience the complete six-product lineup in one celebratory arrangement. Designed for new pantries and wholesale discovery.',
      accentColor: '#6B381E',
      badge: 'Discovery Collection',
      products: [
        { image: MAGIC_ASSETS.urad, alt: 'Urad Whole', offset: { x: -70, y: 10, rot: -10, z: 5, scale: 0.8 } },
        { image: MAGIC_ASSETS.toor, alt: 'Toor Dal', offset: { x: -35, y: -5, rot: -4, z: 15, scale: 0.92 } },
        { image: MAGIC_ASSETS.moong, alt: 'Moong Whole', offset: { x: 10, y: -12, rot: 2, z: 20, scale: 1.0 } },
        { image: MAGIC_ASSETS.masoor, alt: 'Masoor Dal', offset: { x: 55, y: 5, rot: 8, z: 12, scale: 0.85 } },
        { image: MAGIC_ASSETS.haldi, alt: 'Haldi', offset: { x: 0, y: 40, rot: 0, z: 25, scale: 0.78 } },
      ],
    },
  ];

  return (
    <section
      id="bundles"
      className="relative w-full bg-[#F5EDE1] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#3C1518]/10 select-none overflow-hidden"
      aria-labelledby="magic-bundles-heading"
    >
      {/* Background warm aesthetic lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#D4A843]/10 blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-1.5">
              <span className="w-5 h-[1.5px] bg-[#C8102E]" />
              <span>Curated Pantry Sets</span>
              <span className="text-[#3C1518]/30">·</span>
              <span className="font-arabic font-normal text-xs text-[#3C1518]/80">مجموعات ماجيك الكاملة</span>
            </div>
            <h2
              id="magic-bundles-heading"
              className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#3C1518] tracking-tight"
            >
              MAGIC BUNDLES
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B4226] max-w-md font-medium leading-relaxed">
            Thoughtfully paired culinary combinations. Multiple authentic stand-up packages physically composed for complete regional dishes and pantry setup.
          </p>
        </div>

        {/* 3 DISTINCT PHYSICAL PRODUCT BUNDLE COMPOSITIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {bundles.map((bundle) => {
            const isHovered = hoveredBundle === bundle.id;

            return (
              <div
                key={bundle.id}
                onMouseEnter={() => setHoveredBundle(bundle.id)}
                onMouseLeave={() => setHoveredBundle(null)}
                className="group relative bg-[#FDF6EC] rounded-2xl border border-[#3C1518]/12 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Top Badge & Arabic Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3C1518]/5 border border-[#3C1518]/10 text-[11px] font-bold uppercase tracking-wider text-[#3C1518]">
                    <Sparkles className="w-3 h-3 text-[#D4A843]" />
                    {bundle.badge}
                  </span>
                  <span className="font-arabic font-bold text-sm text-[#C8102E]">
                    {bundle.arabicName}
                  </span>
                </div>

                {/* PHYSICAL PRODUCT COMPOSITION STAGE (Multiple overlapping packages) */}
                <div className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-center my-4 overflow-visible">
                  {/* Subtle plinth glow */}
                  <div
                    className="absolute w-56 h-56 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundColor: `${bundle.accentColor}25`,
                      opacity: isHovered ? 0.9 : 0.4,
                    }}
                  />

                  {/* Contact drop shadow ellipse */}
                  <div
                    className="absolute bottom-2 inset-x-8 h-8 rounded-full blur-md pointer-events-none transition-transform duration-500"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(60, 21, 24, 0.4) 0%, transparent 70%)',
                      transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                    }}
                  />

                  {/* Overlapping Stand-Up Pouches with scale, rotation, z-index */}
                  {bundle.products.map((item, idx) => (
                    <div
                      key={idx}
                      className="absolute flex items-center justify-center transition-all duration-700 ease-out"
                      style={{
                        transform: `translateX(${item.offset.x}px) translateY(${
                          isHovered ? item.offset.y - 6 : item.offset.y
                        }px) rotate(${
                          isHovered ? item.offset.rot * 1.15 : item.offset.rot
                        }deg) scale(${isHovered ? item.offset.scale * 1.04 : item.offset.scale})`,
                        zIndex: item.offset.z,
                      }}
                    >
                      <div className="w-[150px] sm:w-[170px] aspect-[1/1.42] flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="w-full h-full object-contain select-none pointer-events-none drop-shadow-xl"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bundle Details & CTA */}
                <div className="pt-4 border-t border-[#3C1518]/10 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-black text-2xl text-[#3C1518] group-hover:text-[#C8102E] transition-colors mb-1">
                      {bundle.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C8102E] mb-2">
                      {bundle.headline}
                    </p>
                    <p className="text-xs sm:text-sm text-[#6B4226] leading-relaxed font-normal mb-6">
                      {bundle.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (onAddToCart) onAddToCart(bundle.name);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#3C1518] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-[#D4A843]/40 hover:border-[#D4A843] transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95 min-h-[44px]"
                    aria-label={`Explore ${bundle.name} bundle`}
                  >
                    <Package className="w-4 h-4 text-[#D4A843]" />
                    <span>EXPLORE BUNDLE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-[#D4A843] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
