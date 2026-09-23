import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  arabicName: string;
  tagline: string;
  accentColor: string;
  renderIllustration: () => React.ReactNode;
}

export const SectionExploreRange: React.FC = () => {
  const categories: CategoryItem[] = [
    {
      id: 'dals-lentils',
      name: 'Dals & Lentils',
      arabicName: 'البقول والعدس',
      tagline: 'Split & Whole Heritage Grains',
      accentColor: '#D4881E',
      renderIllustration: () => (
        <svg className="w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-500 group-hover:scale-105" viewBox="0 0 120 120" fill="none">
          {/* Subtle agricultural hill aura */}
          <ellipse cx="60" cy="90" rx="42" ry="14" fill="#F4E8D4" />
          {/* Golden stalks & leaves */}
          <path d="M35 85 C 45 60, 55 40, 85 20" stroke="#C46816" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="50" cy="55" rx="9" ry="4.5" transform="rotate(-30 50 55)" fill="#6B8E4E" opacity="0.85" />
          <ellipse cx="68" cy="38" rx="8" ry="4" transform="rotate(-20 68 38)" fill="#5A7A40" opacity="0.85" />
          {/* Split lentil pod */}
          <path d="M42 45 C 50 40, 62 48, 70 54" stroke="#8A4A28" strokeWidth="2" strokeLinecap="round" />
          {/* Cascading yellow and red lentils */}
          {[
            { cx: 52, cy: 75, r: 4.2, fill: '#F5C342' },
            { cx: 62, cy: 82, r: 4.5, fill: '#E85D04' },
            { cx: 72, cy: 76, r: 4.0, fill: '#F5C342' },
            { cx: 58, cy: 68, r: 3.8, fill: '#E8922F' },
            { cx: 68, cy: 70, r: 3.6, fill: '#5A7247' },
          ].map((pt, i) => (
            <circle key={i} cx={pt.cx} cy={pt.cy} r={pt.r} fill={pt.fill} />
          ))}
        </svg>
      ),
    },
    {
      id: 'whole-spices',
      name: 'Whole Spices',
      arabicName: 'بهارات صحيحة',
      tagline: 'Sun-Dried Cumin, Cardamom & Bark',
      accentColor: '#B87333',
      renderIllustration: () => (
        <svg className="w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-500 group-hover:scale-105" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="92" rx="40" ry="12" fill="#EFE5D6" />
          {/* Cinnamon quill */}
          <rect x="25" y="55" width="48" height="12" rx="6" transform="rotate(-25 49 61)" fill="#6B381E" />
          <rect x="28" y="57" width="42" height="3" rx="1.5" transform="rotate(-25 49 61)" fill="#8A4A28" />
          {/* Cardamom pod */}
          <g transform="translate(68, 52) rotate(25)">
            <ellipse cx="0" cy="0" rx="9" ry="16" fill="#5F8846" />
            <path d="M-5 -10 Q 0 0 -4 10" stroke="#3E5C2C" strokeWidth="1.2" fill="none" />
            <path d="M3 -10 Q 6 0 2 10" stroke="#3E5C2C" strokeWidth="1.2" fill="none" />
          </g>
          {/* Whole cumin seed scatter */}
          {[
            { cx: 45, cy: 85, rot: 25 },
            { cx: 60, cy: 88, rot: -30 },
            { cx: 75, cy: 84, rot: 40 },
          ].map((s, i) => (
            <ellipse key={i} cx={s.cx} cy={s.cy} rx="5" ry="2" fill="#5C381E" transform={`rotate(${s.rot} ${s.cx} ${s.cy})`} />
          ))}
        </svg>
      ),
    },
    {
      id: 'ground-spices',
      name: 'Ground Spices',
      arabicName: 'توابل مطحونة',
      tagline: 'Fine Stone-Milled Powders',
      accentColor: '#C47A1E',
      renderIllustration: () => (
        <svg className="w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-500 group-hover:scale-105" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="94" rx="42" ry="13" fill="#F4E8D4" />
          {/* Brass Mortar body */}
          <ellipse cx="60" cy="78" rx="28" ry="10" fill="#D4A843" />
          <path d="M32 78 L 40 102 L 80 102 L 88 78 Z" fill="#996E24" />
          {/* Pestle */}
          <path d="M42 42 L 58 78" stroke="#DAA520" strokeWidth="9" strokeLinecap="round" />
          {/* Fine golden turmeric and red chili powder swirls */}
          <ellipse cx="60" cy="76" rx="22" ry="7" fill="#FFA500" />
          <path d="M35 68 C 45 55, 75 52, 85 64" stroke="#C8102E" strokeWidth="2.5" strokeDasharray="4 3" fill="none" />
        </svg>
      ),
    },
    {
      id: 'masalas',
      name: 'Masalas',
      arabicName: 'خلطات البهارات',
      tagline: 'Artisanal Spice Bowl Blends',
      accentColor: '#C8102E',
      renderIllustration: () => (
        <svg className="w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-500 group-hover:scale-105" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="95" rx="42" ry="12" fill="#EADBC8" />
          {/* Traditional Masala Dabba Round Outer Rim */}
          <ellipse cx="60" cy="72" rx="36" ry="18" fill="#4A4744" stroke="#D4A843" strokeWidth="1.5" />
          {/* Inner small spice katoris (cups) */}
          <ellipse cx="46" cy="67" rx="11" ry="6" fill="#C8102E" />
          <ellipse cx="74" cy="67" rx="11" ry="6" fill="#F5C342" />
          <ellipse cx="60" cy="78" rx="12" ry="6.5" fill="#5A7247" />
          {/* Center spice highlight */}
          <circle cx="60" cy="78" r="2.5" fill="#D4881E" />
        </svg>
      ),
    },
    {
      id: 'ready-mixes',
      name: 'Ready Mixes',
      arabicName: 'خلطات جاهزة',
      tagline: 'Traditional Kadai & Handi Bases',
      accentColor: '#8B4513',
      renderIllustration: () => (
        <svg className="w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-500 group-hover:scale-105" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="94" rx="40" ry="12" fill="#F4E8D4" />
          {/* Cast Handi cooking vessel with dual handles */}
          <ellipse cx="60" cy="68" rx="28" ry="10" fill="#6B381E" />
          <path d="M32 68 C 30 96, 90 96, 88 68 Z" fill="#4A2412" />
          {/* Brass loop handles */}
          <path d="M28 72 C 22 72, 22 80, 28 80" stroke="#D4A843" strokeWidth="2.5" fill="none" />
          <path d="M92 72 C 98 72, 98 80, 92 80" stroke="#D4A843" strokeWidth="2.5" fill="none" />
          {/* Simmering aromatic tadka steam swirls */}
          <path d="M52 52 C 50 44, 56 36, 52 30" stroke="#C8102E" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
          <path d="M68 50 C 70 42, 64 34, 68 28" stroke="#D4A843" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
        </svg>
      ),
    },
    {
      id: 'bundles',
      name: 'Bundles & Sets',
      arabicName: 'المجموعات الكاملة',
      tagline: 'Curated Pantry Collections',
      accentColor: '#3C1518',
      renderIllustration: () => (
        <svg className="w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-500 group-hover:scale-105" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="94" rx="42" ry="12" fill="#EADBC8" />
          {/* Grouped silhouette of multiple standing pouches */}
          <rect x="30" y="44" width="22" height="38" rx="4" fill="#3C1518" />
          <rect x="68" y="44" width="22" height="38" rx="4" fill="#5A2E16" />
          <rect x="46" y="36" width="28" height="48" rx="5" fill="#C8102E" stroke="#D4A843" strokeWidth="1.2" />
          {/* Central red ribbon seal */}
          <path d="M52 54 H 68" stroke="#D4A843" strokeWidth="2" />
          <circle cx="60" cy="54" r="3.5" fill="#FDF6EC" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="pulses"
      className="relative w-full bg-[#FDF6EC] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#3C1518]/10 select-none overflow-hidden"
      aria-labelledby="explore-range-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#C8102E] font-bold mb-1.5">
              <span className="w-4 h-[1.5px] bg-[#C8102E]" />
              <span>Full Pantry Spectrum</span>
              <span className="text-[#3C1518]/30">·</span>
              <span className="font-arabic font-normal text-xs text-[#3C1518]/80">تشكيلة المطبخ الكاملة</span>
            </div>
            <h2
              id="explore-range-heading"
              className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#3C1518] tracking-tight"
            >
              EXPLORE OUR RANGE
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B4226] max-w-md font-medium leading-relaxed">
            From essential yellow & red lentils to unadulterated whole spices and artisanal regional blends, explore the complete culinary repertoire.
          </p>
        </div>

        {/* 6 MINIATURE ILLUSTRATED WORLDS (Horizontal scroll on mobile, structured grid on desktop) */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5 overflow-x-auto pb-4 sm:pb-0 scrollbar-none snap-x snap-mandatory">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative flex-none w-[240px] sm:w-auto snap-center bg-white/70 hover:bg-white rounded-xl p-5 border border-[#3C1518]/10 hover:border-[#C8102E]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Category illustrated world */}
              <div className="relative w-full aspect-square flex items-center justify-center mb-3 rounded-lg bg-[#FDF6EC]/80 group-hover:bg-[#FDF6EC] transition-colors overflow-hidden">
                {/* Subtle radiating aura */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-lg"
                  style={{
                    background: `radial-gradient(circle at center, ${cat.accentColor} 0%, transparent 70%)`,
                  }}
                />
                {cat.renderIllustration()}
              </div>

              {/* Category details */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-base text-[#3C1518] group-hover:text-[#C8102E] transition-colors">
                    {cat.name}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#3C1518]/30 group-hover:text-[#C8102E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <span className="font-arabic font-bold text-xs text-[#C8102E] mt-0.5">
                  {cat.arabicName}
                </span>
                <span className="text-[11px] text-[#6B4226] font-medium mt-1 leading-snug">
                  {cat.tagline}
                </span>
              </div>

              {/* Bottom active indicator */}
              <div className="mt-3 pt-2.5 border-t border-[#3C1518]/10 flex items-center justify-between text-[11px] font-semibold text-[#3C1518]/60 group-hover:text-[#C8102E]">
                <span>Discover</span>
                <span className="text-xs">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
