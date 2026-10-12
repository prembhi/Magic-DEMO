import React, { useState } from 'react';
import { ArrowRight, MapPin, ShieldCheck, Award } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { INDIA_MAP_STATES } from '../../data/indiaMapData';
import { findShopProduct } from '../../data/shopProducts';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface HomeFarmProvenanceProps {
  onNavigateImpact: () => void;
  onSelectProduct?: (slug: string) => void;
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
  xPercent: number;
  yPercent: number;
  accentColor: string;
  stateIds: string[];
}

export const HomeFarmProvenance: React.FC<HomeFarmProvenanceProps> = ({
  onNavigateImpact,
  onSelectProduct,
}) => {
  const { isRTL } = useLanguage();
  const { ref: sectionRef, isRevealed } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const [activeHotspotId, setActiveHotspotId] = useState<string>('gulbarga');
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);

  const sourcingHotspots: SourcingHotspot[] = [
    {
      id: 'unjha',
      region: isRTL ? 'أونجا، غوجارات' : 'Unjha, Gujarat',
      state: isRTL ? 'غوجارات' : 'Gujarat',
      crop: isRTL ? 'كمون جيرا حب عطري' : 'Whole Jeera (Cumin)',
      primaryProduct: isRTL ? 'كمون جيرا حب 100 غرام' : 'MAGIC Whole Jeera 100G',
      productSlug: 'magic-jeera',
      terroir: isRTL
        ? 'تربة رملية طميية جافة تحت شمس ساطعة تركّز الزيوت العطرية النقية.'
        : 'Arid sandy loam with intense dry heat, concentrating essential aromatic oils.',
      farmerNetwork: isRTL ? '24 عائلة زراعية' : '24 Generational Farms',
      premiumPaid: isRTL ? '+18% أعلى من السوق' : '+18% Above Mandi',
      xPercent: 17.4,
      yPercent: 47.5,
      accentColor: '#D4A843',
      stateIds: ['INGJ'],
    },
    {
      id: 'madhya-pradesh',
      region: isRTL ? 'وادي نارمادا، ماديا براديش' : 'Narmada Valley, MP',
      state: isRTL ? 'ماديا براديش' : 'Madhya Pradesh',
      crop: isRTL ? 'عدس مسور أحمر تراثي' : 'Heritage Masoor Dal',
      primaryProduct: isRTL ? 'مسور دال أحمر 1 كغ' : 'MAGIC Masoor Dal 1KG',
      productSlug: 'magic-masoor-dal',
      terroir: isRTL
        ? 'سهول نهرية معتدلة وتربة غرينية تنتج عدساً أحمر حلو المذاق سريع الطهي.'
        : 'Gentle river plains and alluvial silt producing naturally sweet, fast-cooking lentils.',
      farmerNetwork: isRTL ? '38 تعاونية زراعية' : '38 Smallholder Co-ops',
      premiumPaid: isRTL ? '+16% أعلى من السوق' : '+16% Above Mandi',
      xPercent: 38.1,
      yPercent: 48.2,
      accentColor: '#C8102E',
      stateIds: ['INMP'],
    },
    {
      id: 'gulbarga',
      region: isRTL ? 'حزام غولبارغا، كارناتاكا' : 'Gulbarga, Karnataka',
      state: isRTL ? 'كارناتاكا' : 'Karnataka',
      crop: isRTL ? 'بقوليات تور وأوراد المعتمدة' : 'GI-Certified Toor & Urad',
      primaryProduct: isRTL ? 'تور دال 1 كغ' : 'MAGIC Toor Dal 1KG',
      productSlug: 'magic-toor-dal',
      terroir: isRTL
        ? 'تربة قطنية سوداء عميقة تحت شمس دافئة تمنح الحبوب لوناً ذهبياً وبروتيناً غنياً.'
        : 'Deep black cotton soil with dry sun, giving pulses rich golden color and high protein.',
      farmerNetwork: isRTL ? '52 مزرعة عائلية' : '52 Certified Family Farms',
      premiumPaid: isRTL ? '+20% أعلى من السوق' : '+20% Above Mandi',
      xPercent: 32.1,
      yPercent: 67.5,
      accentColor: '#E8922F',
      stateIds: ['INKA', 'INMH'],
    },
    {
      id: 'salem',
      region: isRTL ? 'تلال سالم، تاميل نادو' : 'Salem Hills, Tamil Nadu',
      state: isRTL ? 'تاميل نادو' : 'Tamil Nadu',
      crop: isRTL ? 'كركم هالدي نقي عالي الكركمين' : 'High-Curcumin Pure Haldi',
      primaryProduct: isRTL ? 'كركم هالدي نقي 100 غرام' : 'MAGIC Pure Haldi 100G',
      productSlug: 'magic-haldi',
      terroir: isRTL
        ? 'تربة لاتيريت حمراء تثمر جذامير براقة بنسبة كركمين طبيعية تفوق 4.8%.'
        : 'Iron-rich red laterite foothills yielding rhizomes with 4.8%+ natural curcumin.',
      farmerNetwork: isRTL ? '31 شريكاً زراعياً' : '31 Organic Partners',
      premiumPaid: isRTL ? '+22% أعلى من السوق' : '+22% Above Mandi',
      xPercent: 35.7,
      yPercent: 86.0,
      accentColor: '#F5C342',
      stateIds: ['INTN'],
    },
  ];

  const activeHotspot =
    sourcingHotspots.find((h) => h.id === (hoveredHotspotId || activeHotspotId)) ||
    sourcingHotspots[0];

  const activeProduct = findShopProduct(activeHotspot.productSlug);

  return (
    <section
      ref={sectionRef}
      id="farm-to-kitchen"
      className="w-full bg-[#FAF5EE] text-[#3C1518] py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-12 border-b border-[#3C1518]/12 select-none relative overflow-hidden"
      aria-labelledby="farm-provenance-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================================= */}
        {/* 1. EDITORIAL INTRO (MAX 2 SHORT SENTENCES)                                */}
        {/* ========================================================================= */}
        <div className={`w-full max-w-none lg:max-w-4xl xl:max-w-5xl mb-6 sm:mb-8 transition-all duration-700 ease-out ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#5A7247] mb-2">
            {isRTL ? 'المنشأ الزراعي والتوريد' : 'SOURCING ETHOS & PROVENANCE'}
          </p>
          <h2
            id="farm-provenance-heading"
            className="font-display font-extrabold text-[1.75rem] xs:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#3C1518] tracking-tight leading-[1.02] sm:leading-[0.98] mb-3"
          >
            {isRTL ? (
              <>
                من مزارع الهند
                <br />
                <span className="text-[#C8102E]">إلى مخزنك في الإمارات.</span>
              </>
            ) : (
              <>
                FROM INDIAN FARMS
                <br />
                <span className="text-[#C8102E]">TO YOUR PANTRY.</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#3C1518]/85 leading-relaxed font-sans w-full lg:max-w-2xl">
            {isRTL
              ? 'نتشارك مباشرة مع عائلات زراعية متوارثة عبر أفضل الأقاليم في الهند. نضمن أسعاراً عادلة للمزارعين ونقاءً تراثياً لمطبخك.'
              : 'We partner directly with generational farming families across India\'s premier agricultural belts. Fair prices paid above market rates preserve heirloom crop purity for your UAE kitchen.'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN SOURCING SPREAD: EDITORIAL PHOTOGRAPHY + SOURCING ATLAS           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          
          {/* LEFT: MAJOR EDITORIAL FARM PHOTOGRAPH (7 Cols) */}
          <div className={`lg:col-span-7 flex flex-col justify-between gap-6 transition-all duration-700 delay-100 ease-out ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="relative rounded-2xl overflow-hidden border border-[#3C1518]/15 bg-[#3C1518] min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] flex flex-col justify-end p-5 sm:p-7 group shadow-md flex-1">
              <img
                src={MAGIC_ASSETS.editorial.chilliField}
                alt="Authentic Indian Chilli Harvest Field"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] group-hover:scale-102 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3C1518]/92 via-[#3C1518]/35 to-transparent pointer-events-none" />

              <div className="relative z-10 text-white max-w-xl">
                <span className="text-[11px] font-semibold tracking-widest text-[#D4A843] uppercase block mb-1">
                  {isRTL ? 'حقول الحصاد المفتوحة' : 'OPEN-AIR HARVEST'}
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#FDF6EC] leading-tight mb-2">
                  {isRTL ? 'عائلات زراعية تتوارث الأرض والمحصول' : 'Generational Growers Preserving Soil & Heritage'}
                </h3>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={onNavigateImpact}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-[#D4A843] transition-colors cursor-pointer group/link py-1"
                  >
                    <span>{isRTL ? 'استكشف أثرنا الزراعي' : 'OUR FARM IMPACT'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: PROMINENT INTERACTIVE SOURCING MAP & REGIONAL TERROIR (5 Cols) */}
          <div className={`lg:col-span-5 flex flex-col justify-between gap-5 transition-all duration-700 delay-200 ease-out ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="bg-white rounded-2xl border-2 border-[#3C1518]/15 shadow-md p-5 sm:p-6 flex flex-col justify-between h-full">
              
              {/* Header */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#3C1518]/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8102E] block">
                    {isRTL ? 'خريطة المنشأ الإقليمي' : 'INTERACTIVE SOURCING ATLAS'}
                  </span>
                  <h4 className="font-display font-extrabold text-lg sm:text-xl text-[#3C1518]">
                    {activeHotspot.region}
                  </h4>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2B6E2A] bg-[#2B6E2A]/10 px-2.5 py-1 rounded-full border border-[#2B6E2A]/20">
                  <ShieldCheck className="w-3 h-3" />
                  {isRTL ? 'تتبع 100%' : 'Traceable'}
                </span>
              </div>

              {/* Compact Visual Map Stage */}
              <div
                dir="ltr"
                style={{ direction: 'ltr' }}
                className="relative w-full aspect-[840/640] bg-[#FAF5EE] rounded-xl border border-[#3C1518]/12 p-2 shadow-inner flex items-center justify-center overflow-hidden mb-4"
              >
                <svg
                  viewBox="70 80 840 850"
                  className="w-full h-full filter drop-shadow-2xs select-none pointer-events-none"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern id="farm-map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#3C1518" strokeWidth="0.5" strokeOpacity="0.05" />
                    </pattern>
                  </defs>
                  <rect x="70" y="80" width="840" height="850" fill="url(#farm-map-grid)" />

                  {/* Water Labels */}
                  <text x="135" y="690" fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" fill="#3C1518" opacity="0.25" letterSpacing="0.14em">ARABIAN SEA</text>
                  <text x="590" y="690" fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" fill="#3C1518" opacity="0.25" letterSpacing="0.14em">BAY OF BENGAL</text>

                  {/* Geographic States */}
                  <g id="india-states-compact">
                    {INDIA_MAP_STATES.map((state) => {
                      const isStateActive = activeHotspot.stateIds.includes(state.id);
                      return (
                        <path
                          key={state.id}
                          d={state.d}
                          id={`compact-${state.id}`}
                          fill={isStateActive ? '#FEEBD0' : '#FDF6EC'}
                          stroke="#3C1518"
                          strokeWidth={isStateActive ? '1.5' : '0.8'}
                          strokeOpacity={isStateActive ? '0.95' : '0.35'}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-colors duration-300"
                        />
                      );
                    })}
                  </g>
                </svg>

                {/* 4 Regional Hotspots */}
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
                        aria-label={`Sourcing Region: ${hotspot.region}`}
                        className="group relative flex items-center justify-center w-9 h-9 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] rounded-full"
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                            isActive
                              ? 'bg-[#C8102E] scale-110 ring-4 ring-[#C8102E]/20 text-white'
                              : 'bg-[#3C1518] hover:bg-[#C8102E] text-white'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Terroir & Origin Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-[#3C1518] text-[#FDF6EC] px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                    {activeHotspot.crop}
                  </span>
                  <span className="text-xs font-bold text-[#2B6E2A]">
                    {activeHotspot.premiumPaid}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#3C1518]/85 font-sans leading-relaxed">
                  {activeHotspot.terroir}
                </p>

                {/* Region Selector Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#3C1518]/10">
                  {sourcingHotspots.map((hotspot) => {
                    const isSelected = activeHotspot.id === hotspot.id;
                    return (
                      <button
                        key={hotspot.id}
                        type="button"
                        onClick={() => setActiveHotspotId(hotspot.id)}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#3C1518] text-[#FDF6EC] border-[#3C1518] shadow-2xs'
                            : 'bg-[#FAF5EE] hover:bg-white text-[#3C1518] border-[#3C1518]/15'
                        }`}
                      >
                        {hotspot.state}
                      </button>
                    );
                  })}
                </div>

                {/* Connected Product Quick Access */}
                {activeProduct && onSelectProduct && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(activeProduct.slug)}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#FAF5EE] hover:bg-[#F3ECE0] border border-[#3C1518]/15 flex items-center justify-between text-xs font-semibold text-[#3C1518] transition-colors cursor-pointer group"
                    >
                      <span className="truncate">
                        {isRTL && activeProduct.arabicName ? activeProduct.arabicName : activeProduct.name}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#C8102E] font-bold shrink-0">
                        <span>{isRTL ? 'عرض المنتج' : 'VIEW'}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                      </span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
