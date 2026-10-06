import React, { useState } from 'react';
import { MapPin, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { INDIA_MAP_STATES } from '../../data/indiaMapData';
import { findShopProduct } from '../../data/shopProducts';
import { useLanguage } from '../../context/LanguageContext';

interface HomeSourcingMapProps {
  onSelectProduct: (slug: string) => void;
}

interface SourcingHotspot {
  id: string;
  region: string;
  state: string;
  crop: string;
  primaryProduct: string;
  productSlug: string;
  terroir: string;
  farmerNetwork: string;
  premiumPaid: string;
  xPercent: number; // Left % on Map (0-100)
  yPercent: number; // Top % on Map (0-100)
  accentColor: string;
  stateIds: string[];
  labelPosition?: 'left' | 'right';
  cropIllustration: string;
}

export const HomeSourcingMap: React.FC<HomeSourcingMapProps> = ({ onSelectProduct }) => {
  const { isRTL } = useLanguage();
  const [activeHotspotId, setActiveHotspotId] = useState<string>('gulbarga');
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);

  // SOURCING HOTSPOTS (Exact 4 authentic locations aligned with geographic coordinates)
  const sourcingHotspots: SourcingHotspot[] = [
    {
      id: 'unjha',
      region: isRTL ? 'أونجا وشمال غوجارات' : 'Unjha & North Gujarat',
      state: isRTL ? 'غوجارات' : 'Gujarat',
      crop: isRTL ? 'كمون جيرا حب عطري' : 'Aromatic Whole Jeera (Cumin)',
      primaryProduct: isRTL ? 'كمون جيرا حب 100 غرام' : 'MAGIC Whole Jeera 100G',
      productSlug: 'magic-jeera',
      terroir: isRTL
        ? 'تربة رملية طميية جافة تحت شمس ساطعة تركّز الزيوت العطرية النقية وتمنح الكمون نكهة دافئة قوية.'
        : 'Arid sandy loam with intense dry heat, concentrating essential cuminaldehyde oils for pungent warmth.',
      farmerNetwork: isRTL ? '24 عائلة زراعية متوارثة' : '24 Generational Grower Families',
      premiumPaid: isRTL ? '+18% أعلى من سعر السوق' : '+18% Above Mandi Price',
      xPercent: 17.4,
      yPercent: 47.5,
      accentColor: '#D4A843', // Spice Gold
      stateIds: ['INGJ'],
      labelPosition: 'right',
      cropIllustration: MAGIC_ASSETS.illustrations.cumin,
    },
    {
      id: 'madhya-pradesh',
      region: isRTL ? 'بوندلخاند ووادي نارمادا' : 'Bundelkhand & Narmada Valley',
      state: isRTL ? 'ماديا براديش' : 'Madhya Pradesh',
      crop: isRTL ? 'عدس مسور أحمر تراثي' : 'Heritage Masoor (Red Lentils)',
      primaryProduct: isRTL ? 'مسور دال أحمر 1 كغ' : 'MAGIC Masoor Dal 1KG',
      productSlug: 'magic-masoor-dal',
      terroir: isRTL
        ? 'سهول نهرية معتدلة وتربة غرينية تنتج عدساً أحمر حلو المذاق بشكل طبيعي وسريع الطهي.'
        : 'Gentle temperate river plains and alluvial silt producing naturally sweet, fast-cooking heirloom lentils.',
      farmerNetwork: isRTL ? '38 تعاونية لصغار المزارعين' : '38 Smallholder Cooperatives',
      premiumPaid: isRTL ? '+16% أعلى من سعر السوق' : '+16% Above Mandi Price',
      xPercent: 38.1,
      yPercent: 48.2,
      accentColor: '#C8102E', // Magic Red
      stateIds: ['INMP'],
      labelPosition: 'right',
      cropIllustration: MAGIC_ASSETS.illustrations.lentils,
    },
    {
      id: 'gulbarga',
      region: isRTL ? 'حزام غولبارغا وماهاراشترا' : 'Gulbarga & Maharashtra Belt',
      state: isRTL ? 'كارناتاكا وماهاراشترا' : 'Karnataka & Maharashtra',
      crop: isRTL ? 'بقوليات تور وأوراد المعتمدة' : 'GI-Certified Toor & Urad Pulses',
      primaryProduct: isRTL ? 'تور دال 1 كغ وأوراد دال' : 'MAGIC Toor Dal 1KG & Urad Dal',
      productSlug: 'magic-toor-dal',
      terroir: isRTL
        ? 'تربة قطنية سوداء عميقة (ريغور) مع شمس شتوية دافئة، تمنح الحبوب لوناً ذهبياً غنياً ونسبة بروتين عالية.'
        : 'Deep black cotton soil (Regur) with dry winter sun, giving pulses a rich golden color and high protein density.',
      farmerNetwork: isRTL ? '52 مزرعة عائلية معتمدة' : '52 Certified Family Farms',
      premiumPaid: isRTL ? '+20% أعلى من سعر السوق' : '+20% Above Mandi Price',
      xPercent: 32.1,
      yPercent: 67.5,
      accentColor: '#E8922F', // Saffron
      stateIds: ['INKA', 'INMH'],
      labelPosition: 'right',
      cropIllustration: MAGIC_ASSETS.illustrations.lentils,
    },
    {
      id: 'salem',
      region: isRTL ? 'تلال سالم وإيرود' : 'Salem & Erode Hills',
      state: isRTL ? 'تاميل نادو' : 'Tamil Nadu',
      crop: isRTL ? 'كركم هالدي نقي عالي الكركمين' : 'High-Curcumin Pure Haldi (Turmeric)',
      primaryProduct: isRTL ? 'كركم هالدي نقي 100 غرام' : 'MAGIC Pure Haldi 100G',
      productSlug: 'magic-haldi',
      terroir: isRTL
        ? 'سفوح غنية بالحديد وتربة لاتيريت حمراء تثمر جذامير ذهبية براقة بنسبة كركمين طبيعية مثبتة تفوق 4.8%.'
        : 'Iron-rich red laterite foothills yielding bright golden rhizomes with tested 4.8%+ natural curcumin content.',
      farmerNetwork: isRTL ? '31 شريكاً زراعياً عضوياً' : '31 Organic Sourcing Partners',
      premiumPaid: isRTL ? '+22% أعلى من سعر السوق' : '+22% Above Mandi Price',
      xPercent: 35.7,
      yPercent: 86.0,
      accentColor: '#F5C342', // Turmeric Yellow
      stateIds: ['INTN'],
      labelPosition: 'right',
      cropIllustration: MAGIC_ASSETS.illustrations.turmeric,
    },
  ];

  const activeHotspot =
    sourcingHotspots.find((h) => h.id === (hoveredHotspotId || activeHotspotId)) ||
    sourcingHotspots[0];

  const activeProduct = findShopProduct(activeHotspot.productSlug);

  return (
    <section
      id="sourcing-map"
      className="w-full bg-[#FAF5EE] text-[#3C1518] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/12 select-none relative overflow-hidden"
      aria-labelledby="sourcing-map-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================================= */}
        {/* EDITORIAL INDIA SOURCING MAP: "WHERE MAGIC BEGINS"                        */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border-2 border-[#3C1518]/15 shadow-xl p-5 sm:p-7 lg:p-8 relative overflow-hidden">
          {/* Section Header */}
          <div className="max-w-3xl mb-5 sm:mb-6 lg:mb-8">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#C8102E] mb-2">
              {isRTL ? 'سجلات المنشأ والتوريد' : 'SOURCING MAP & REGISTERS'}
            </p>
            <h3
              id="sourcing-map-heading"
              className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#3C1518] tracking-tight leading-[0.98] mb-3"
            >
              {isRTL ? 'من هنا يبدأ السحر.' : 'WHERE MAGIC BEGINS.'}
            </h3>
            <p className="text-sm sm:text-base text-[#3C1518]/85 font-sans leading-relaxed">
              {isRTL
                ? 'أربعة أقاليم زراعية عريقة. محاصيل نقية متباينة. التزام صارم بالشفافية الكاملة من المزرعة إلى مائدتك. مرر المؤشر فوق الخريطة لاستكشاف بيئة كل محصول.'
                : 'Four growing regions. Distinct crops. One commitment to traceable sourcing. Hover or tap a hotspot on the map to explore our terroir credentials.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* MAP STAGE (LEFT / CENTER COLUMN) WITH FIELD JOURNAL ANNOTATIONS */}
            {/* Geographic coordinates strictly require LTR direction so pins are not mirrored */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
              <div
                dir="ltr"
                style={{ direction: 'ltr' }}
                className="relative w-full max-w-[460px] aspect-[840/930] bg-[#FAF5EE] rounded-2xl border-2 border-[#3C1518]/15 p-2 sm:p-3 shadow-inner flex items-center justify-center overflow-hidden"
              >
                {/* SVG Accurate Geographic Map of India */}
                <svg
                  viewBox="70 20 840 930"
                  className="w-full h-full filter drop-shadow-xs select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {/* Subtle Grid / Cartographic Texture */}
                  <defs>
                    <pattern id="map-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                      <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#3C1518" strokeWidth="0.5" strokeOpacity="0.05" />
                    </pattern>
                  </defs>
                  <rect x="70" y="20" width="840" height="930" fill="url(#map-grid)" />

                  {/* Water Body Typographic Labels */}
                  <text
                    x="135"
                    y="690"
                    fontSize="13"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fill="#3C1518"
                    opacity="0.28"
                    letterSpacing="0.14em"
                  >
                    ARABIAN SEA
                  </text>
                  <text
                    x="590"
                    y="690"
                    fontSize="13"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fill="#3C1518"
                    opacity="0.28"
                    letterSpacing="0.14em"
                  >
                    BAY OF BENGAL
                  </text>
                  <text
                    x="370"
                    y="930"
                    fontSize="11"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fill="#3C1518"
                    opacity="0.22"
                    letterSpacing="0.16em"
                  >
                    INDIAN OCEAN
                  </text>

                  {/* Authentic Geographic State Outlines of India */}
                  <g id="india-states">
                    {INDIA_MAP_STATES.map((state) => {
                      const isStateActive = activeHotspot.stateIds.includes(state.id);
                      return (
                        <path
                          key={state.id}
                          d={state.d}
                          id={state.id}
                          fill={isStateActive ? '#FEEBD0' : '#FDF6EC'}
                          stroke="#3C1518"
                          strokeWidth={isStateActive ? '1.5' : '0.8'}
                          strokeOpacity={isStateActive ? '0.95' : '0.45'}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-colors duration-300"
                        />
                      );
                    })}
                  </g>

                  {/* Compass Rose Accent */}
                  <g transform="translate(670, 110)" opacity="0.6">
                    <circle cx="0" cy="0" r="18" fill="none" stroke="#3C1518" strokeWidth="0.8" strokeDasharray="2 2" />
                    <path d="M 0 -15 L 3.5 -3.5 L 15 0 L 3.5 3.5 L 0 15 L -3.5 3.5 L -15 0 L -3.5 -3.5 Z" fill="#D4A843" />
                    <text x="0" y="-18" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#3C1518">N</text>
                  </g>
                </svg>

                {/* 4 INTERACTIVE SOURCING HOTSPOTS */}
                {sourcingHotspots.map((hotspot) => {
                  const isActive = activeHotspot.id === hotspot.id;
                  return (
                    <div
                      key={hotspot.id}
                      style={{
                        top: `${hotspot.yPercent}%`,
                        left: `${hotspot.xPercent}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveHotspotId(hotspot.id)}
                        onMouseEnter={() => setHoveredHotspotId(hotspot.id)}
                        onMouseLeave={() => setHoveredHotspotId(null)}
                        onFocus={() => setActiveHotspotId(hotspot.id)}
                        aria-label={`Sourcing Region: ${hotspot.region}, ${hotspot.crop}`}
                        className="group relative flex items-center justify-center w-11 h-11 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] rounded-full"
                      >
                        {/* Pulse Ring */}
                        <span
                          className={`absolute inset-1 rounded-full animate-ping opacity-40 transition-colors ${
                            isActive ? 'bg-[#C8102E]' : 'bg-[#D4A843]'
                          }`}
                        />

                        {/* Outer Glow Disc */}
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                            isActive
                              ? 'bg-[#C8102E] scale-125 ring-4 ring-[#C8102E]/20'
                              : 'bg-[#3C1518] hover:scale-110 hover:bg-[#C8102E]'
                          }`}
                        >
                          <MapPin className="w-4 h-4 text-[#FDF6EC] stroke-[2.5]" />
                        </span>

                        {/* Floating Micro Location Label */}
                        <span
                          className={`hidden sm:flex items-center gap-1.5 absolute whitespace-nowrap start-full ms-2.5 px-2.5 py-1 rounded-md text-[10px] font-sans font-medium font-bold tracking-wider uppercase border transition-all duration-200 pointer-events-none shadow-xs z-30 ${
                            isActive
                              ? 'bg-[#3C1518] text-[#FDF6EC] border-[#D4A843]/70 scale-105 shadow-md'
                              : 'bg-white/95 text-[#3C1518] border-[#3C1518]/20 group-hover:border-[#C8102E] group-hover:text-[#C8102E]'
                          }`}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: hotspot.accentColor }}
                          />
                          <span>{hotspot.state}</span>
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ACTIVE REGION INFOGRAPHIC PANEL (RIGHT COLUMN) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
              <div
                key={activeHotspot.id}
                className="bg-[#FAF5EE] rounded-2xl border-2 border-[#3C1518]/15 p-4 sm:p-5 lg:p-6 relative overflow-hidden transition-all duration-300"
              >
                {/* Accent Ribbon */}
                <div
                  className="absolute top-0 inset-x-0 h-1.5"
                  style={{ backgroundColor: activeHotspot.accentColor }}
                />

                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] sm:text-[11px] font-sans font-medium font-bold text-[#6B4226] uppercase tracking-widest">
                    {isRTL ? 'توريد إقليمي معتمد وموثق' : 'VERIFIED REGIONAL SOURCING'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-sans font-medium font-bold text-[#2B6E2A] bg-white px-2.5 py-0.5 rounded-full border border-[#2B6E2A]/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {isRTL ? 'قابل للتتبع 100%' : '100% Traceable'}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display font-black text-2xl sm:text-3xl text-[#3C1518] mb-1">
                      {activeHotspot.region}
                    </h4>

                    <div className="inline-block bg-[#3C1518] text-[#FDF6EC] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-3">
                      {activeHotspot.crop}
                    </div>
                  </div>

                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 opacity-90 select-none pointer-events-none">
                    <img
                      src={activeHotspot.cropIllustration}
                      alt={activeHotspot.crop}
                      style={{ mixBlendMode: 'multiply' }}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                <p className="text-sm text-[#3C1518]/85 font-sans leading-relaxed mb-5">
                  {activeHotspot.terroir}
                </p>

                {/* Sourcing Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 pb-1 border-t border-[#3C1518]/15 text-xs font-sans font-medium">
                  <div>
                    <span className="text-[#3C1518]/60 block mb-0.5">
                      {isRTL ? 'شبكة المزارعين' : 'GROWER NETWORK'}
                    </span>
                    <span className="font-bold text-[#3C1518]">
                      {activeHotspot.farmerNetwork}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#3C1518]/60 block mb-0.5">
                      {isRTL ? 'علاوة السعر العادل' : 'DIRECT PREMIUM'}
                    </span>
                    <span className="font-bold text-[#2B6E2A]">
                      {activeHotspot.premiumPaid}
                    </span>
                  </div>
                </div>

                {/* CONNECTED MAGIC PRODUCT CARD */}
                {activeProduct && (
                  <div className="mt-5 p-4 rounded-xl bg-white border border-[#3C1518]/15 shadow-2xs hover:border-[#C8102E]/40 hover:shadow-sm transition-all duration-200 group">
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#3C1518]/10">
                      <div className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-[#C8102E] tracking-wider">
                        <Award className="w-4 h-4 text-[#D4A843]" />
                        <span>{isRTL ? 'محصول أساسي فاخر من المؤونة' : 'HARVESTED PANTRY STAPLE'}</span>
                      </div>
                      <span className="text-xs text-[#6B4226] font-semibold">
                        {isRTL && activeProduct.arabicWeight ? activeProduct.arabicWeight : activeProduct.weight}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Authentic Packaging Thumbnail */}
                      <button
                        type="button"
                        onClick={() => onSelectProduct(activeProduct.slug)}
                        aria-label={`View ${activeProduct.name} details`}
                        className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 bg-[#FAF5EE] rounded-lg p-2.5 border border-[#3C1518]/10 flex items-center justify-center cursor-pointer overflow-hidden transition-transform duration-200 group-hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
                      >
                        <img
                          src={activeProduct.image}
                          alt={activeProduct.altText}
                          className="w-full h-full object-contain filter drop-shadow-xs"
                          loading="lazy"
                        />
                      </button>

                      {/* Product Info & Action */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] uppercase tracking-wider text-[#6B4226] block truncate font-medium">
                          {isRTL && activeProduct.arabicCategory ? activeProduct.arabicCategory : activeProduct.category}{' '}
                          {activeProduct.englishSub ? `· ${activeProduct.englishSub}` : ''}
                        </span>
                        <h5
                          onClick={() => onSelectProduct(activeProduct.slug)}
                          className="font-display font-bold text-base sm:text-lg text-[#3C1518] hover:text-[#C8102E] transition-colors cursor-pointer truncate"
                        >
                          {isRTL && activeProduct.arabicName ? activeProduct.arabicName : activeProduct.name}
                        </h5>
                        <div className="flex items-baseline gap-2 mt-0.5 mb-2.5">
                          <span className="font-bold text-sm sm:text-base text-[#C8102E]">
                            {isRTL ? `${activeProduct.price.toFixed(2)} د.إ` : `AED ${activeProduct.price.toFixed(2)}`}
                          </span>
                          <span className="text-xs text-[#3C1518]/60">
                            / {isRTL && activeProduct.arabicWeight ? activeProduct.arabicWeight : activeProduct.weight}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onSelectProduct(activeProduct.slug)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C8102E] hover:text-[#A60D26] transition-all cursor-pointer font-sans"
                        >
                          <span>{isRTL ? 'عرض المنتج' : 'VIEW PRODUCT'}</span>
                          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Navigation Region Selector Chips */}
              <div className="flex flex-wrap gap-2.5">
                {sourcingHotspots.map((hotspot) => {
                  const isSelected = activeHotspot.id === hotspot.id;
                  return (
                    <button
                      key={hotspot.id}
                      type="button"
                      onClick={() => setActiveHotspotId(hotspot.id)}
                      className={`px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#3C1518] text-[#FDF6EC] border-[#3C1518] shadow-xs'
                          : 'bg-white hover:bg-[#FAF5EE] text-[#3C1518] border-[#3C1518]/15'
                      }`}
                    >
                      {hotspot.state}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
