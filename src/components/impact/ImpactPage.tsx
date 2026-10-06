import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Sprout,
  Droplets,
  Layers,
  Wheat,
  ShieldCheck,
  Scale,
  Sun,
  Eye,
  HeartHandshake,
  Award,
  Globe,
  Truck,
  Flame,
  Check,
  MapPin,
  Clock,
  BookOpen,
} from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { INDIA_MAP_STATES } from '../../data/indiaMapData';
import { ShopHeader } from '../shop/ShopHeader';
import { ShopFooter } from '../shop/ShopFooter';
import { useShopCart } from '../../context/ShopCartContext';
import { ShopCartDrawer } from '../shop/ShopCartDrawer';

interface ImpactPageProps {
  onNavigateHome: () => void;
  onNavigateShop: (catId?: string) => void;
  onNavigateRecipes: () => void;
  onNavigateBundles: () => void;
  onNavigateImpact?: () => void;
  onNavigateNewsletter?: () => void;
  onSelectProduct: (slug: string) => void;
}

interface SourcingHotspot {
  id: string;
  region: string;
  state: string;
  hindiName: string;
  crop: string;
  category: 'Dals & Lentils' | 'Whole Spices' | 'Ground Spices';
  primaryProduct: string;
  productSlug: string;
  assetImage: string;
  terroir: string;
  harvestCycle: string;
  farmerNetwork: string;
  premiumPaid: string;
  story: string;
  xPercent: number; // Percentage on India SVG bounding box
  yPercent: number;
  accentColor: string;
  stateIds: string[];
}

export const ImpactPage: React.FC<ImpactPageProps> = ({
  onNavigateHome,
  onNavigateShop,
  onNavigateRecipes,
  onNavigateBundles,
  onNavigateImpact,
  onNavigateNewsletter,
  onSelectProduct,
}) => {
  const { isCartOpen, closeCart } = useShopCart();
  const [activeHotspotId, setActiveHotspotId] = useState<string>('unjha-cumin');
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 4 Primary Verified Sourcing Hubs across Indian Terroirs
  const sourcingHotspots: SourcingHotspot[] = [
    {
      id: 'unjha-cumin',
      region: 'Unjha & North Gujarat',
      state: 'Gujarat',
      hindiName: 'जीरा',
      crop: 'Whole Cumin Seeds (Jeera)',
      category: 'Whole Spices',
      primaryProduct: 'MAGIC Whole Jeera 100G',
      productSlug: 'magic-jeera',
      assetImage: MAGIC_ASSETS.jeera,
      terroir:
        'Arid sandy loam soil with intense dry daytime heat and crisp winter nights that concentrate natural cuminaldehyde essential oils.',
      harvestCycle: 'Winter Rabi (February – March)',
      farmerNetwork: '24 Generational Grower Families in the Unjha Cluster',
      premiumPaid: '+18% Above Mandi Benchmark Price',
      story:
        'Unjha has been the spiritual and commercial heart of global cumin cultivation for generations. MAGIC sources unbroken, sun-cured cumin seeds known for their pointed needle shape, warm citrus-wood undertones, and instant fragrance when bloomed in hot ghee.',
      xPercent: 17.4,
      yPercent: 47.5,
      accentColor: '#D4A843',
      stateIds: ['INGJ'],
    },
    {
      id: 'mp-masoor',
      region: 'Bundelkhand & Narmada River Valley',
      state: 'Madhya Pradesh',
      hindiName: 'मसूर दाल',
      crop: 'Heritage Split Red Lentils (Masoor)',
      category: 'Dals & Lentils',
      primaryProduct: 'MAGIC Masoor Dal 1KG',
      productSlug: 'magic-masoor-dal',
      assetImage: MAGIC_ASSETS.masoor,
      terroir:
        'Alluvial river silt and mild winter sunlight yielding small, coral-red lentil kernels with elevated protein density.',
      harvestCycle: 'Spring Rabi Harvest (February – April)',
      farmerNetwork: '38 Smallholder Pulse Cooperatives',
      premiumPaid: '+16% Above Mandi Benchmark Price',
      story:
        'Harvested across the river plains of Central India. Naturally dehusked and split without chemical polishing agents or oil baths, our Masoor dal cooks into a velvety, creamy consistency essential for hearty home meals.',
      xPercent: 38.1,
      yPercent: 48.2,
      accentColor: '#C8102E',
      stateIds: ['INMP'],
    },
    {
      id: 'gulbarga-toor',
      region: 'Gulbarga & Marathwada Belt',
      state: 'Karnataka & Maharashtra',
      hindiName: 'तूर दाल / अरहर',
      crop: 'GI-Protected Toor & Urad Dal',
      category: 'Dals & Lentils',
      primaryProduct: 'MAGIC Toor Dal 1KG',
      productSlug: 'magic-toor-dal',
      assetImage: MAGIC_ASSETS.toor,
      terroir:
        'Deep calcium-rich black cotton soil (Regur) nourished solely by natural monsoon showers, producing plump, sweet-nutty yellow pigeon peas.',
      harvestCycle: 'Post-Monsoon Winter (December – January)',
      farmerNetwork: '52 Certified Family Farms in Kalaburagi District',
      premiumPaid: '+20% Above Mandi Benchmark Price',
      story:
        'Gulbarga Toor Dal is internationally renowned for its aroma and grain integrity. Sourced directly from family-run fields, our pigeon peas undergo optical laser cleaning to remove debris, leaving them 100% unpolished with zero artificial water or oil glazes.',
      xPercent: 32.1,
      yPercent: 67.5,
      accentColor: '#E8922F',
      stateIds: ['INKA', 'INMH'],
    },
    {
      id: 'salem-turmeric',
      region: 'Salem & Erode Foothills',
      state: 'Tamil Nadu',
      hindiName: 'हल्दी',
      crop: 'High-Curcumin Ground Turmeric (Haldi)',
      category: 'Ground Spices',
      primaryProduct: 'MAGIC Pure Haldi 100G',
      productSlug: 'magic-haldi',
      assetImage: MAGIC_ASSETS.haldi,
      terroir:
        'Tropical red loamy soils fed by seasonal mountain runoffs, nurturing dense finger rhizomes with tested 4.8%+ natural curcumin.',
      harvestCycle: 'Post-Pongal Spring (January – March)',
      farmerNetwork: '31 Organic Sourcing Partners in the Cauvery Basin',
      premiumPaid: '+22% Above Mandi Benchmark Price',
      story:
        'Grown for 9 months in living earth before harvesting. The rhizomes are cured through traditional boiling in copper vessels and slow courtyard sun-drying before mechanical low-heat milling, preserving their brilliant golden-orange warmth without fillers or artificial dye.',
      xPercent: 35.7,
      yPercent: 86.0,
      accentColor: '#D4A843',
      stateIds: ['INTN'],
    },
  ];

  const activeHotspot =
    sourcingHotspots.find((h) => h.id === (hoveredHotspotId || activeHotspotId)) ||
    sourcingHotspots[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] text-[#3C1518] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white">
      {/* GLOBAL SHOP HEADER */}
      <ShopHeader
        onNavigateHome={onNavigateHome}
        onNavigateShop={() => onNavigateShop()}
        onNavigateRecipes={onNavigateRecipes}
        onNavigateBundles={onNavigateBundles}
        onNavigateImpact={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateNewsletter={onNavigateNewsletter}
      />

      <main className="flex-1 w-full flex flex-col focus:outline-none" id="main-content" tabIndex={-1}>
        {/* ========================================================================= */}
        {/* CHAPTER 01: OPENING HERO (THE MAGIC IDEA - CINEMATIC AGRICULTURAL DEPTH) */}
        {/* ========================================================================= */}
        <section
          className="relative w-full bg-[#3C1518] text-[#FDF6EC] pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 lg:pb-36 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-[#D4A843]/30"
          aria-label="Impact Hero"
        >
          {/* Subtle Indian agricultural terroir backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(#D4A843_1px,transparent_1px)] [background-size:36px_36px] opacity-15 pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full bg-radial from-[#D4A843]/20 via-[#E8922F]/10 to-transparent pointer-events-none blur-2xl" />
          <div className="absolute -bottom-40 -left-40 w-[550px] h-[550px] rounded-full bg-radial from-[#C8102E]/25 via-transparent to-transparent pointer-events-none blur-2xl" />

          {/* Golden hairline horizon accent */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Large Editorial Fraunces Typography */}
              <div className="lg:col-span-7 text-center lg:text-left">
                {/* Editorial Micro Kicker */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 rounded-full border border-[#D4A843]/40 text-[11px] font-sans uppercase tracking-[0.25em] text-[#D4A843] mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" />
                  <span>THE SOURCING DISPATCH · 2026/2027</span>
                </div>

                {/* Primary Fraunces Headline */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-[#FDF6EC] tracking-tight leading-[1.02] mb-6">
                  MAGIC BEGINS
                  <br />
                  <span className="text-[#D4A843] italic font-normal">WITH WHAT'S REAL.</span>
                </h1>

                {/* Editorial Narrative */}
                <p className="text-lg sm:text-2xl font-display italic text-[#FDF6EC]/90 mb-5 font-normal leading-snug">
                  "An editorial journey through the soils, farmers, harvests, and spice courtyards of India — into everyday home kitchens."
                </p>

                <p className="text-xs sm:text-sm text-[#FDF6EC]/75 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10">
                  Every grain and spice in your pantry begins somewhere real. In living black soil. Under seasonal monsoon skies. Tended by generational hands. We build direct, unhurried connections between Indian agricultural origins and modern home cooking.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                  <button
                    type="button"
                    onClick={() => scrollToSection('origins')}
                    className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs font-bold uppercase tracking-widest rounded-2xs transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span>BEGIN THE JOURNEY</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('philosophy')}
                    className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-transparent hover:bg-white/10 text-[#FDF6EC] text-xs font-bold uppercase tracking-widest rounded-2xs border border-[#D4A843]/60 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>OUR PHILOSOPHY</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4A843]" />
                  </button>
                </div>
              </div>

              {/* Right Column: Layered 2.5D Artwork Composition */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                  {/* Concentric Terroir Rings */}
                  <div className="absolute inset-2 rounded-full border border-[#D4A843]/20 bg-white/5 shadow-inner" />
                  <div className="absolute inset-8 rounded-full border border-dashed border-[#D4A843]/30" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-2 right-2 sm:right-6 bg-white/15 border border-[#D4A843]/50 backdrop-blur-xs px-3.5 py-1.5 rounded-2xs text-[10px] font-sans uppercase tracking-widest text-[#D4A843] z-20 shadow-md">
                    DOCUMENTED ORIGIN
                  </div>

                  {/* Authentic Editorial Illustration Asset */}
                  <div className="relative z-10 w-4/5 h-4/5 flex items-center justify-center">
                    <img
                      src={MAGIC_ASSETS.farmerHeroRight}
                      alt="Indian farmer tending spice crops"
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)] transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Bottom Verification Label */}
                  <div className="absolute bottom-2 bg-[#3C1518]/95 border border-[#D4A843]/40 px-4 py-2 rounded-full text-[10px] font-sans uppercase tracking-widest text-[#FDF6EC]/90 z-20 shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2B6E2A] inline-block" />
                    <span>100% UNPOLISHED · TRACEABLE TERROIR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 02: WHERE MAGIC BEGINS (ACCURATE INDIA SOURCING MAP)             */}
        {/* ========================================================================= */}
        <section
          id="origins"
          className="w-full bg-[#FAF5EE] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/15"
          aria-labelledby="origins-heading"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
                <Compass className="w-4 h-4 text-[#C8102E]" />
                <span>CHAPTER 01 · GEOGRAPHIC TERROIR</span>
              </div>
              <h2
                id="origins-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#3C1518] tracking-tight leading-[1.08] mb-4"
              >
                A LAND OF DEEP FLAVOUR.
              </h2>
              <p className="text-sm sm:text-base text-[#3C1518]/80 leading-relaxed font-sans">
                Spices and pulses are living reflections of soil chemistry, sunshine intensity, and generations of farming wisdom. Tap any sourcing hotspot below to inspect the micro-region where each MAGIC staple is born.
              </p>
            </div>

            {/* Sourcing Atlas Container */}
            <div className="bg-white rounded-2xl border-2 border-[#3C1518]/15 shadow-lg overflow-hidden">
              {/* Atlas Top Bar */}
              <div className="bg-[#3C1518] text-[#FDF6EC] px-6 py-4 border-b border-[#D4A843]/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#D4A843]" />
                  <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#D4A843] font-bold">
                    VERIFIED REGIONAL SOURCING ATLAS
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sans text-[#FDF6EC]/70">
                  <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
                  <span>4 Verified Single-Origin Agricultural Belts</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left Column: Geographic India Map with States & Hotspots */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col items-center justify-center bg-radial from-[#FAF1D6]/60 via-[#FAF5EE] to-[#FAF5EE] border-b lg:border-b-0 lg:border-r border-[#3C1518]/12 relative min-h-[460px] sm:min-h-[560px]">
                  {/* Subtle Cartographic Rose */}
                  <div className="absolute top-4 right-4 pointer-events-none opacity-20">
                    <div className="w-24 h-24 rounded-full border border-dashed border-[#3C1518]/50 flex items-center justify-center">
                      <span className="text-[10px] font-sans font-bold text-[#3C1518]">N ↑</span>
                    </div>
                  </div>

                  {/* SVG Accurate Geographic India Map */}
                  <div className="relative w-full max-w-[480px] aspect-[840/930]">
                    <svg
                      viewBox="70 20 840 930"
                      className="w-full h-full filter drop-shadow-sm select-none"
                      role="img"
                      aria-label="Accurate Geographic Sourcing Map of India"
                    >
                      <defs>
                        <pattern id="impact-map-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#3C1518" strokeWidth="0.5" strokeOpacity="0.05" />
                        </pattern>
                        <filter id="hotspotShadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3C1518" floodOpacity="0.35" />
                        </filter>
                      </defs>

                      <rect x="70" y="20" width="840" height="930" fill="url(#impact-map-grid)" />

                      {/* Maritime Typographic Watermarks */}
                      <text x="135" y="690" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic" fill="#3C1518" opacity="0.25" letterSpacing="0.14em">
                        ARABIAN SEA
                      </text>
                      <text x="590" y="690" fontSize="13" fontFamily="Georgia, serif" fontStyle="italic" fill="#3C1518" opacity="0.25" letterSpacing="0.14em">
                        BAY OF BENGAL
                      </text>
                      <text x="370" y="920" fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" fill="#3C1518" opacity="0.25" letterSpacing="0.14em">
                        INDIAN OCEAN
                      </text>

                      {/* Accurate State Outlines */}
                      <g id="india-state-layers">
                        {INDIA_MAP_STATES.map((state) => {
                          const isHighlightedState = activeHotspot.stateIds.includes(state.id);

                          return (
                            <path
                              key={state.id}
                              d={state.d}
                              fill={isHighlightedState ? '#FAF0D2' : '#F7EFE4'}
                              stroke={isHighlightedState ? '#C8102E' : '#D2C3AA'}
                              strokeWidth={isHighlightedState ? '1.8' : '0.8'}
                              className="transition-colors duration-300"
                            >
                              <title>{state.name}</title>
                            </path>
                          );
                        })}
                      </g>

                      {/* Sourcing Hotspot Pins */}
                      {sourcingHotspots.map((hotspot) => {
                        const isSelected = hotspot.id === (hoveredHotspotId || activeHotspotId);
                        // Map coordinates in SVG viewBox units (x: 70-910, y: 20-950)
                        const svgX = 70 + (hotspot.xPercent / 100) * 840;
                        const svgY = 20 + (hotspot.yPercent / 100) * 930;

                        return (
                          <g
                            key={hotspot.id}
                            onClick={() => {
                              setActiveHotspotId(hotspot.id);
                              setHoveredHotspotId(null);
                            }}
                            onMouseEnter={() => setHoveredHotspotId(hotspot.id)}
                            onMouseLeave={() => setHoveredHotspotId(null)}
                            className="cursor-pointer group focus:outline-none"
                            role="button"
                            tabIndex={0}
                            aria-label={`Select ${hotspot.state} for ${hotspot.crop}`}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setActiveHotspotId(hotspot.id);
                              }
                            }}
                          >
                            {/* Animated Pulse on Selected Hotspot */}
                            {isSelected && (
                              <>
                                <circle
                                  cx={svgX}
                                  cy={svgY}
                                  r="26"
                                  fill="none"
                                  stroke="#C8102E"
                                  strokeWidth="1.5"
                                  opacity="0.4"
                                  className="animate-ping"
                                />
                                <circle
                                  cx={svgX}
                                  cy={svgY}
                                  r="18"
                                  fill="#C8102E"
                                  opacity="0.15"
                                />
                              </>
                            )}

                            {/* Outer Pin Body */}
                            <circle
                              cx={svgX}
                              cy={svgY}
                              r={isSelected ? '14' : '10'}
                              fill={isSelected ? '#C8102E' : '#3C1518'}
                              stroke="#FFFFFF"
                              strokeWidth="3"
                              filter="url(#hotspotShadow)"
                              className="transition-all duration-300 group-hover:scale-125"
                            />

                            {/* Center Core Accent */}
                            <circle
                              cx={svgX}
                              cy={svgY}
                              r={isSelected ? '5' : '3.5'}
                              fill={isSelected ? '#FAF1D6' : '#D4A843'}
                              className="transition-all"
                            />

                            {/* Label Callout */}
                            <text
                              x={svgX + 18}
                              y={svgY + 5}
                              fontSize="14"
                              fontFamily="Plus Jakarta Sans, sans-serif"
                              fontWeight={isSelected ? '900' : '700'}
                              fill={isSelected ? '#C8102E' : '#3C1518'}
                              className="transition-all pointer-events-none select-none drop-shadow-xs"
                            >
                              {hotspot.state.split('&')[0].trim()}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Micro Guidance */}
                  <div className="mt-4 pt-3 border-t border-[#3C1518]/10 w-full flex flex-wrap items-center justify-between text-xs text-[#3C1518]/70 font-sans">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E] inline-block" />
                      <span>Active Verified Sourcing Hub</span>
                    </span>
                    <span className="text-[11px] text-[#3C1518]/50 italic">
                      Click or tap a hotspot to reveal crop details
                    </span>
                  </div>
                </div>

                {/* Right Column: Editorial Crop Dossier */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-white">
                  <div>
                    {/* Region Selector Pills */}
                    <div className="mb-6">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#3C1518]/60 font-semibold block mb-2.5">
                        SELECT SOURCING REGION
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {sourcingHotspots.map((hotspot) => {
                          const isSelected = hotspot.id === activeHotspot.id;
                          return (
                            <button
                              key={hotspot.id}
                              type="button"
                              onClick={() => {
                                setActiveHotspotId(hotspot.id);
                                setHoveredHotspotId(null);
                              }}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-2xs border transition-colors cursor-pointer text-left ${
                                isSelected
                                  ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-xs'
                                  : 'bg-[#FAF7F2] text-[#3C1518]/80 border-[#3C1518]/15 hover:border-[#C8102E]'
                              }`}
                            >
                              {hotspot.state.split('&')[0].trim()}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dossier Card Container */}
                    <div className="border border-[#3C1518]/15 bg-[#FAF7F2] rounded-xs p-6 mb-6 transition-all duration-300">
                      {/* Crop Title & Packaging Asset */}
                      <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[#3C1518]/10">
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-widest text-[#C8102E] font-bold mb-1">
                            <Sparkles className="w-3 h-3 text-[#D4A843]" />
                            <span>{activeHotspot.category}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-display font-black text-[#3C1518] leading-tight">
                            {activeHotspot.crop}
                          </h3>
                          <span className="font-hindi text-sm text-[#3C1518]/60">
                            {activeHotspot.hindiName}
                          </span>
                        </div>

                        <div className="w-20 h-20 bg-white rounded-2xs border border-[#3C1518]/15 p-1.5 flex items-center justify-center shrink-0 shadow-xs">
                          <img
                            src={activeHotspot.assetImage}
                            alt={activeHotspot.crop}
                            className="max-h-full max-w-full object-contain drop-shadow-xs"
                          />
                        </div>
                      </div>

                      {/* Detail Metrics */}
                      <div className="space-y-3.5 text-xs mb-5 font-sans">
                        <div>
                          <span className="text-[10px] font-sans uppercase tracking-wider text-[#3C1518]/55 block">
                            TERROIR & REGION
                          </span>
                          <p className="font-bold text-[#3C1518] text-sm">
                            {activeHotspot.region}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-sans uppercase tracking-wider text-[#3C1518]/55 block">
                            FARMER NETWORK
                          </span>
                          <p className="font-medium text-[#3C1518]">
                            {activeHotspot.farmerNetwork}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-sans uppercase tracking-wider text-[#3C1518]/55 block">
                            GROWER PREMIUM PAID
                          </span>
                          <p className="font-bold text-[#2B6E2A]">
                            {activeHotspot.premiumPaid}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-sans uppercase tracking-wider text-[#3C1518]/55 block">
                            TERROIR PROFILE
                          </span>
                          <p className="text-[#3C1518]/80 leading-relaxed font-sans">
                            {activeHotspot.terroir}
                          </p>
                        </div>
                      </div>

                      {/* Sourcing Narrative */}
                      <div className="pt-3 border-t border-[#3C1518]/10">
                        <span className="text-[10px] font-sans uppercase tracking-wider text-[#3C1518]/55 block mb-1">
                          THE SOURCING STORY
                        </span>
                        <p className="text-xs text-[#3C1518]/85 leading-relaxed font-sans">
                          {activeHotspot.story}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Link Button */}
                  <button
                    type="button"
                    onClick={() => onSelectProduct(activeHotspot.productSlug)}
                    className="w-full py-3.5 px-4 bg-[#3C1518] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider rounded-2xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-[0.98]"
                  >
                    <span>View Product in Pantry ({activeHotspot.crop.split('(')[0].trim()})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 03: FROM FARM TO PANTRY (CONTINUOUS SCROLL SPREAD)               */}
        {/* ========================================================================= */}
        <section
          id="journey"
          className="w-full bg-[#3C1518] text-[#FDF6EC] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-b border-[#D4A843]/30"
          aria-labelledby="journey-heading"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="max-w-3xl mb-16 sm:mb-24">
              <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#D4A843] font-bold mb-3">
                <Layers className="w-4 h-4 text-[#D4A843]" />
                <span>CHAPTER 02 · THE LIVING CYCLE</span>
              </div>
              <h2
                id="journey-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#FDF6EC] tracking-tight leading-[1.08] mb-4"
              >
                FROM SEED TO SACK.
              </h2>
              <p className="text-sm sm:text-base text-[#FDF6EC]/75 leading-relaxed font-sans">
                Good spices cannot be hurried through industrial processing plants. Follow the five unhurried stages that take pure ingredients from Indian soil into daily home cooking.
              </p>
            </div>

            {/* Continuous Asymmetrical Editorial Spreads */}
            <div className="space-y-16 sm:space-y-24 lg:space-y-32">
              {/* SPREAD 01: THE SOIL & SEED */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <div className="relative rounded-2xl overflow-hidden border border-[#D4A843]/30 shadow-2xl group">
                    <img
                      src={MAGIC_ASSETS.soilRoots}
                      alt="Living Indian agricultural soil and root biomes"
                      className="w-full h-80 sm:h-96 lg:h-[440px] object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3C1518]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-6 text-xs font-sans text-[#D4A843] uppercase tracking-widest">
                      STAGE 01 · LIVING EARTH & NON-HYBRID SEEDS
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 order-1 lg:order-2">
                  <span className="text-4xl sm:text-6xl font-display font-black text-[#D4A843]/40 block mb-2">
                    01
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-display font-black text-[#FDF6EC] leading-tight mb-4">
                    THE LIVING SOIL.
                  </h3>
                  <p className="text-sm sm:text-base text-[#FDF6EC]/80 leading-relaxed font-sans mb-4">
                    India's black regur and red laterite soils are living ecosystems rich in organic carbon and micro-flora. We partner exclusively with farmers who protect native topsoil through legume rotation, allowing crops to absorb balanced mineral nutrition naturally.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-sans text-[#D4A843]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Zero chemical fumigation or soil sterilizers</span>
                  </div>
                </div>
              </div>

              {/* SPREAD 02: THE GROWING CROP */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                <div className="lg:col-span-5 order-1">
                  <span className="text-4xl sm:text-6xl font-display font-black text-[#D4A843]/40 block mb-2">
                    02
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-display font-black text-[#FDF6EC] leading-tight mb-4">
                    RAIN AND MONSOON SUN.
                  </h3>
                  <p className="text-sm sm:text-base text-[#FDF6EC]/80 leading-relaxed font-sans mb-4">
                    Our pulses and cumin are natural rainfed crops. They thrive on the rhythm of Indian monsoons and dry winter breezes without draining local groundwater tables. The natural stress of seasonal weather triggers dense essential oil production inside each seed head.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-sans text-[#D4A843]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>100% Rainfed & groundwater-conscious</span>
                  </div>
                </div>
                <div className="lg:col-span-7 order-2">
                  <div className="relative rounded-2xl overflow-hidden border border-[#D4A843]/30 shadow-2xl group">
                    <img
                      src={MAGIC_ASSETS.cropDetail}
                      alt="Flowering crop details in natural sunlight"
                      className="w-full h-80 sm:h-96 lg:h-[440px] object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3C1518]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-6 text-xs font-sans text-[#D4A843] uppercase tracking-widest">
                      STAGE 02 · NATURAL SEASONAL RIPENING
                    </div>
                  </div>
                </div>
              </div>

              {/* SPREAD 03: THE HARVEST */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <div className="relative rounded-2xl overflow-hidden border border-[#D4A843]/30 shadow-2xl group">
                    <img
                      src={MAGIC_ASSETS.harvest}
                      alt="Generational hand harvest at morning dew"
                      className="w-full h-80 sm:h-96 lg:h-[440px] object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3C1518]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-6 text-xs font-sans text-[#D4A843] uppercase tracking-widest">
                      STAGE 03 · MORNING HARVEST & GENTLE SUN CURING
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 order-1 lg:order-2">
                  <span className="text-4xl sm:text-6xl font-display font-black text-[#D4A843]/40 block mb-2">
                    03
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-display font-black text-[#FDF6EC] leading-tight mb-4">
                    THE GENTLE HARVEST.
                  </h3>
                  <p className="text-sm sm:text-base text-[#FDF6EC]/80 leading-relaxed font-sans mb-4">
                    Harvesting happens at peak maturity during crisp morning hours when delicate seed pods are least prone to shattering. Turmeric rhizomes are harvested with care, boiled in natural copper cauldrons, and laid out across stone courtyards for gentle sun-drying.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-sans text-[#D4A843]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Open-air courtyard sun drying</span>
                  </div>
                </div>
              </div>

              {/* SPREAD 04: GENTLE PROCESSING & LASER SORTING */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                <div className="lg:col-span-5 order-1">
                  <span className="text-4xl sm:text-6xl font-display font-black text-[#D4A843]/40 block mb-2">
                    04
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-display font-black text-[#FDF6EC] leading-tight mb-4">
                    OPTICAL PURITY.
                  </h3>
                  <p className="text-sm sm:text-base text-[#FDF6EC]/80 leading-relaxed font-sans mb-4">
                    High-speed optical laser cameras inspect every single seed and split lentil, removing stones, stalks, and chipped grains. Dals are left completely unpolished—we refuse water sprays, yellow mineral dyes, or petroleum oil glazes.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-sans text-[#D4A843]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Zero artificial glazes or water polishing</span>
                  </div>
                </div>
                <div className="lg:col-span-7 order-2">
                  <div className="relative rounded-2xl overflow-hidden border border-[#D4A843]/30 shadow-2xl group">
                    <img
                      src={MAGIC_ASSETS.spiceCourtyard}
                      alt="Traditional Indian spice sorting and milling courtyard"
                      className="w-full h-80 sm:h-96 lg:h-[440px] object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3C1518]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-6 text-xs font-sans text-[#D4A843] uppercase tracking-widest">
                      STAGE 04 · REGIONAL MILLING & OPTICAL CLEANING
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 04: THE PEOPLE BEHIND THE HARVEST (HUMAN EDITORIAL PORTRAITS)    */}
        {/* ========================================================================= */}
        <section
          id="farmers"
          className="w-full bg-[#FDF6EC] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/15"
          aria-labelledby="farmers-heading"
        >
          <div className="max-w-7xl mx-auto">
            {/* Large Statement Headline */}
            <div className="border-l-4 border-[#C8102E] pl-6 sm:pl-10 mb-16 sm:mb-24">
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-3">
                CHAPTER 03 · THE STEWARDS
              </span>
              <h2
                id="farmers-heading"
                className="text-3xl sm:text-5xl lg:text-7xl font-display font-black text-[#3C1518] tracking-tight leading-[1.05] mb-6"
              >
                GOOD SPICES START
                <br />
                WITH GOOD RELATIONSHIPS.
              </h2>
              <p className="text-base sm:text-xl text-[#3C1518]/80 font-display italic max-w-3xl leading-relaxed">
                "We don't buy from anonymous wholesale grain auctions. We work with farmers whose families have walked the same fields for generations."
              </p>
            </div>

            {/* Farmer Portraits & Fieldwork Documentation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              {/* Story 01: Unjha */}
              <div className="bg-white rounded-2xl border-2 border-[#3C1518]/15 p-6 sm:p-8 flex flex-col justify-between shadow-md">
                <div>
                  <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-6 bg-[#FAF5EE] flex items-center justify-center p-4 border border-[#3C1518]/10">
                    <img
                      src={MAGIC_ASSETS.farmerHeroLeft}
                      alt="Generational Cumin Harvester in North Gujarat"
                      className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                    />
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-widest text-[#C8102E] font-bold mb-2">
                    <MapPin className="w-3 h-3 text-[#C8102E]" />
                    <span>UNJHA, GUJARAT</span>
                  </div>
                  <h3 className="text-xl font-display font-black text-[#3C1518] mb-3">
                    The Cumin Harvesters of Mehsana
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3C1518]/75 leading-relaxed font-sans mb-6">
                    Multi-generational grower families who practice early morning harvest runs before dew evaporates, protecting volatile essential oils from afternoon heat degradation.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#3C1518]/10 flex items-center justify-between text-[11px] font-sans text-[#6B4226]">
                  <span className="font-semibold">+18% Direct Premium</span>
                  <span className="text-[#3C1518]/50">Rabi Season</span>
                </div>
              </div>

              {/* Story 02: Salem */}
              <div className="bg-white rounded-2xl border-2 border-[#3C1518]/15 p-6 sm:p-8 flex flex-col justify-between shadow-md">
                <div>
                  <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-6 bg-[#FAF5EE] flex items-center justify-center p-4 border border-[#3C1518]/10">
                    <img
                      src={MAGIC_ASSETS.farmerHeroRight}
                      alt="Turmeric Growers of Salem & Erode"
                      className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                    />
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-widest text-[#C8102E] font-bold mb-2">
                    <MapPin className="w-3 h-3 text-[#C8102E]" />
                    <span>SALEM, TAMIL NADU</span>
                  </div>
                  <h3 className="text-xl font-display font-black text-[#3C1518] mb-3">
                    The Curcumin Stewards of the River Basin
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3C1518]/75 leading-relaxed font-sans mb-6">
                    Preserving heirloom Curcuma rhizomes that mature for 9 months in red laterite soil, cured in wood-fired water baths and dried naturally on sunlit courtyards.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#3C1518]/10 flex items-center justify-between text-[11px] font-sans text-[#6B4226]">
                  <span className="font-semibold">+22% Direct Premium</span>
                  <span className="text-[#3C1518]/50">Cauvery Belt</span>
                </div>
              </div>

              {/* Story 03: Gulbarga */}
              <div className="bg-white rounded-2xl border-2 border-[#3C1518]/15 p-6 sm:p-8 flex flex-col justify-between shadow-md">
                <div>
                  <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-6 bg-[#FAF5EE] flex items-center justify-center p-4 border border-[#3C1518]/10">
                    <img
                      src={MAGIC_ASSETS.farmEditorial}
                      alt="Pigeon Pea Growers in Kalaburagi"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-widest text-[#C8102E] font-bold mb-2">
                    <MapPin className="w-3 h-3 text-[#C8102E]" />
                    <span>GULBARGA, KARNATAKA</span>
                  </div>
                  <h3 className="text-xl font-display font-black text-[#3C1518] mb-3">
                    The Black Soil Pigeon Pea Growers
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3C1518]/75 leading-relaxed font-sans mb-6">
                    Smallholders cultivating GI-protected Toor Dal on deep black cotton soil, rotating pulses with pearl millet to replenish nitrogen and keep regional biodiversity thriving.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#3C1518]/10 flex items-center justify-between text-[11px] font-sans text-[#6B4226]">
                  <span className="font-semibold">+20% Direct Premium</span>
                  <span className="text-[#3C1518]/50">GI District</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 05: OUR SOURCING PHILOSOPHY (4 DISTINCT EDITORIAL COMPOSITIONS)  */}
        {/* ========================================================================= */}
        <section
          id="philosophy"
          className="w-full bg-[#FAF5EE] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/15"
          aria-labelledby="philosophy-heading"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="max-w-3xl mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
                <ShieldCheck className="w-4 h-4 text-[#C8102E]" />
                <span>CHAPTER 04 · THE SOURCING CODE</span>
              </div>
              <h2
                id="philosophy-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#3C1518] tracking-tight leading-[1.08] mb-4"
              >
                FOUR UNCOMPROMISING PILLARS.
              </h2>
              <p className="text-sm sm:text-base text-[#3C1518]/80 leading-relaxed font-sans">
                Every principle represents a concrete operational decision that shapes how MAGIC staples are planted, harvested, sorted, and packed.
              </p>
            </div>

            {/* 4 Asymmetrical Editorial Layouts (NOT identical cards!) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Pillar 01: Direct Farm Partnerships (Span 6) */}
              <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-[#3C1518]/15 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#3C1518]/10">
                    <span className="text-3xl sm:text-5xl font-display font-black text-[#C8102E]">01</span>
                    <span className="text-xs font-sans uppercase tracking-widest text-[#3C1518]/50">DIRECT PARTNERSHIPS</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-[#3C1518] mb-4">
                    FAIR VALUE AT THE SOURCE.
                  </h3>
                  <p className="text-sm text-[#3C1518]/80 leading-relaxed font-sans mb-6">
                    We bypass multi-tiered speculative brokers and spot-market grain mandis. Paying 15–22% above government benchmark prices gives farming families the financial security to invest in heirloom crop varieties and unhurried cultivation.
                  </p>
                </div>
                <div className="bg-[#FAF5EE] p-4 rounded-xl border border-[#3C1518]/10 flex items-center gap-3">
                  <HeartHandshake className="w-5 h-5 text-[#C8102E] shrink-0" />
                  <span className="text-xs font-sans font-semibold text-[#3C1518]">
                    Multi-season forward commitments over seasonal speculation
                  </span>
                </div>
              </div>

              {/* Pillar 02: Traceable Origin (Span 6) */}
              <div className="lg:col-span-6 bg-[#3C1518] text-[#FDF6EC] rounded-2xl border-2 border-[#D4A843]/40 p-8 sm:p-10 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#D4A843]/30">
                    <span className="text-3xl sm:text-5xl font-display font-black text-[#D4A843]">02</span>
                    <span className="text-xs font-sans uppercase tracking-widest text-[#D4A843]/70">SINGLE ORIGIN</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-[#FDF6EC] mb-4">
                    ZERO ORIGIN BLENDING.
                  </h3>
                  <p className="text-sm text-[#FDF6EC]/80 leading-relaxed font-sans mb-6">
                    Commercial spice packers routinely mix premium crops with cheaper, aged imports to maximize margins. MAGIC never blends harvests. Every pouch represents one specific harvest season from one documented micro-region.
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl border border-[#D4A843]/30 flex items-center gap-3">
                  <Compass className="w-5 h-5 text-[#D4A843] shrink-0" />
                  <span className="text-xs font-sans font-semibold text-[#D4A843]">
                    100% Traceable batch numbers back to the regional farm gate
                  </span>
                </div>
              </div>

              {/* Pillar 03: Careful Processing (Span 7) */}
              <div className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl border-2 border-[#3C1518]/15 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#3C1518]/10">
                    <span className="text-3xl sm:text-5xl font-display font-black text-[#6B4226]">03</span>
                    <span className="text-xs font-sans uppercase tracking-widest text-[#3C1518]/50">UNPOLISHED INTEGRITY</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-[#3C1518] mb-4">
                    OPTICAL LASER SORTING, ZERO DYES.
                  </h3>
                  <p className="text-sm text-[#3C1518]/80 leading-relaxed font-sans mb-6">
                    Industrial dal processing often uses water spray, yellow dyes (tartrazine), or petroleum oil polishing to make dull grains look shiny. MAGIC dals are 100% unpolished. Optical laser sorters remove imperfect grains mechanically, preserving raw nutritional fiber.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#3C1518]/10 text-xs font-sans text-[#6B4226]">
                  <div>✓ No Water Polish</div>
                  <div>✓ No Oil Coatings</div>
                  <div>✓ No Synthetic Colors</div>
                </div>
              </div>

              {/* Pillar 04: Freshness Speed (Span 5) */}
              <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-[#3C1518]/15 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#3C1518]/10">
                    <span className="text-3xl sm:text-5xl font-display font-black text-[#C8102E]">04</span>
                    <span className="text-xs font-sans uppercase tracking-widest text-[#3C1518]/50">FRESH HARVEST SPEED</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-[#3C1518] mb-4">
                    TRIPLE-BARRIER PROTECTION.
                  </h3>
                  <p className="text-sm text-[#3C1518]/80 leading-relaxed font-sans mb-6">
                    Spices lose their volatile oils when sitting in hot warehouses for months. Our airtight, aroma-sealed barrier packaging locks in pungent fragrance and freshness from the harvest yard to your dining table.
                  </p>
                </div>
                <div className="bg-[#FAF5EE] p-4 rounded-xl border border-[#3C1518]/10 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#C8102E] shrink-0" />
                  <span className="text-xs font-sans font-semibold text-[#3C1518]">
                    Shipped within weeks of milling
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 06: WHAT MAKES MAGIC DIFFERENT (MAGAZINE SPREAD COMPARISON)       */}
        {/* ========================================================================= */}
        <section
          className="w-full bg-[#FDF6EC] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/15"
          aria-labelledby="different-heading"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="max-w-3xl mb-16 sm:mb-20 text-center mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
                <Scale className="w-4 h-4 text-[#C8102E]" />
                <span>CHAPTER 05 · THE ANATOMY OF PURITY</span>
              </div>
              <h2
                id="different-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#3C1518] tracking-tight leading-[1.08] mb-4"
              >
                WHAT MAKES MAGIC DIFFERENT.
              </h2>
              <p className="text-sm sm:text-base text-[#3C1518]/80 leading-relaxed font-sans">
                A side-by-side editorial comparison of the conventional industrial commodity spice model versus the MAGIC single-origin standard.
              </p>
            </div>

            {/* Double-Page Magazine Spread */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl border-2 border-[#3C1518]/15 p-8 sm:p-12 lg:p-16 shadow-xl">
              {/* Left Page: The Conventional Commodity Model */}
              <div className="lg:col-span-6 pr-0 lg:pr-8 border-b lg:border-b-0 lg:border-r border-[#3C1518]/15 pb-8 lg:pb-0">
                <div className="inline-block px-3 py-1 bg-[#3C1518]/10 rounded-2xs text-[10px] font-sans uppercase tracking-widest text-[#3C1518] font-bold mb-6">
                  CONVENTIONAL COMMODITY SUPPLY CHAIN
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#3C1518]/70 mb-6 line-through decoration-[#C8102E]/60">
                  Anonymous & Speculative
                </h3>

                <div className="space-y-6 text-xs sm:text-sm text-[#3C1518]/70 font-sans">
                  <div className="flex items-start gap-3.5">
                    <span className="w-5 h-5 rounded-full bg-[#3C1518]/10 text-[#3C1518] flex items-center justify-center text-xs shrink-0 font-bold">
                      ✕
                    </span>
                    <div>
                      <strong className="block text-[#3C1518] font-bold">Blended & Mixed Origins:</strong>
                      Grains from different countries and harvest years combined to cut costs.
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="w-5 h-5 rounded-full bg-[#3C1518]/10 text-[#3C1518] flex items-center justify-center text-xs shrink-0 font-bold">
                      ✕
                    </span>
                    <div>
                      <strong className="block text-[#3C1518] font-bold">Artificial Polishing & Glazes:</strong>
                      Dals coated in mineral oil, water sprays, or yellow dyes to mimic freshness.
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="w-5 h-5 rounded-full bg-[#3C1518]/10 text-[#3C1518] flex items-center justify-center text-xs shrink-0 font-bold">
                      ✕
                    </span>
                    <div>
                      <strong className="block text-[#3C1518] font-bold">Middleman Mandi Squeezing:</strong>
                      Multiple speculative layers taking profits while growers receive base commodities rates.
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="w-5 h-5 rounded-full bg-[#3C1518]/10 text-[#3C1518] flex items-center justify-center text-xs shrink-0 font-bold">
                      ✕
                    </span>
                    <div>
                      <strong className="block text-[#3C1518] font-bold">Stale Warehouse Sitting:</strong>
                      Spices stored unsealed for 12–24 months, losing vital aromatic oils.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Page: The MAGIC Direct Standard */}
              <div className="lg:col-span-6 pl-0 lg:pl-4">
                <div className="inline-block px-3 py-1 bg-[#C8102E] rounded-2xs text-[10px] font-sans uppercase tracking-widest text-white font-bold mb-6">
                  THE MAGIC SINGLE-ORIGIN STANDARD
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-[#3C1518] mb-6">
                  Documented & Pure
                </h3>

                <div className="space-y-6 text-xs sm:text-sm text-[#3C1518]/85 font-sans">
                  <div className="flex items-start gap-3.5">
                    <span className="w-5 h-5 rounded-full bg-[#C8102E] text-white flex items-center justify-center text-xs shrink-0 font-bold">
                      ✓
                    </span>
                    <div>
                      <strong className="block text-[#3C1518] font-bold">100% Documented Single Terroir:</strong>
                      Harvested from one verified geographical region per batch with zero blending.
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="w-5 h-5 rounded-full bg-[#C8102E] text-white flex items-center justify-center text-xs shrink-0 font-bold">
                      ✓
                    </span>
                    <div>
                      <strong className="block text-[#3C1518] font-bold">100% Unpolished & Laser-Sorted:</strong>
                      Raw grain integrity preserved with zero synthetic dyes or mineral oil coatings.
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="w-5 h-5 rounded-full bg-[#C8102E] text-white flex items-center justify-center text-xs shrink-0 font-bold">
                      ✓
                    </span>
                    <div>
                      <strong className="block text-[#3C1518] font-bold">+15% to +22% Direct Farmer Premium:</strong>
                      Transparent grower contracts honoring generational agricultural labor.
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="w-5 h-5 rounded-full bg-[#C8102E] text-white flex items-center justify-center text-xs shrink-0 font-bold">
                      ✓
                    </span>
                    <div>
                      <strong className="block text-[#3C1518] font-bold">Aroma-Sealed Freshness Protection:</strong>
                      Packed in triple-barrier moisture-proof pouches within weeks of milling.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 07: THE MAGIC STANDARD (UNADULTERATED QUALITY MANIFESTO)         */}
        {/* ========================================================================= */}
        <section
          className="w-full bg-[#3C1518] text-[#FDF6EC] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-b border-[#D4A843]/30 relative overflow-hidden"
          aria-labelledby="standard-heading"
        >
          {/* Subtle Brass Dabba & Mortar Editorial Accents */}
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Manifesto Headline & Quality Metrics */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#D4A843] font-bold mb-3">
                  <Award className="w-4 h-4 text-[#D4A843]" />
                  <span>CHAPTER 06 · QUALITY MANIFESTO</span>
                </div>
                <h2
                  id="standard-heading"
                  className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#FDF6EC] tracking-tight leading-[1.08] mb-6"
                >
                  REAL ORIGIN.
                  <br />
                  REAL FARMERS.
                  <br />
                  <span className="text-[#D4A843] italic font-normal">REAL INGREDIENTS.</span>
                </h2>

                <p className="text-sm sm:text-base text-[#FDF6EC]/80 leading-relaxed font-sans mb-8">
                  We measure quality by the volatile essential oils, naturally high curcumin content, and clean grain completeness in every batch. We reject the commodity trade shortcuts that compromise authentic culinary flavor.
                </p>

                {/* Quality Stat Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#D4A843]/30">
                  <div>
                    <span className="text-3xl sm:text-4xl font-display font-black text-[#D4A843] block mb-1">
                      &gt;4.8%
                    </span>
                    <span className="text-xs font-sans text-[#FDF6EC]/70 uppercase tracking-wider block">
                      Natural Curcumin in Haldi
                    </span>
                  </div>

                  <div>
                    <span className="text-3xl sm:text-4xl font-display font-black text-[#D4A843] block mb-1">
                      99.8%
                    </span>
                    <span className="text-xs font-sans text-[#FDF6EC]/70 uppercase tracking-wider block">
                      Optical Laser Purity
                    </span>
                  </div>

                  <div>
                    <span className="text-3xl sm:text-4xl font-display font-black text-[#D4A843] block mb-1">
                      0%
                    </span>
                    <span className="text-xs font-sans text-[#FDF6EC]/70 uppercase tracking-wider block">
                      Synthetic Water / Oil Glaze
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Masala Dabba & Mortar Visual Heritage */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full max-w-sm aspect-square bg-white/5 rounded-3xl border-2 border-[#D4A843]/40 p-6 flex flex-col items-center justify-center text-center shadow-2xl">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 mb-4 flex items-center justify-center">
                    <img
                      src={MAGIC_ASSETS.masalaDabbaEditorialPng}
                      alt="Traditional Indian Brass Masala Dabba"
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-sm font-display font-bold text-[#FDF6EC] mb-1">
                    The Sacred Masala Dabba
                  </span>
                  <span className="text-[11px] font-sans text-[#D4A843] uppercase tracking-widest">
                    HONORING ANCIENT KITCHEN RITUALS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 08: INDIA TO UAE KITCHENS (THE CONTINENTAL BRIDGE)               */}
        {/* ========================================================================= */}
        <section
          className="w-full bg-[#FAF5EE] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/15"
          aria-labelledby="continental-bridge-heading"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="max-w-3xl mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
                <Truck className="w-4 h-4 text-[#C8102E]" />
                <span>CHAPTER 07 · THE CONTINENTAL BRIDGE</span>
              </div>
              <h2
                id="continental-bridge-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#3C1518] tracking-tight leading-[1.08] mb-4"
              >
                FROM INDIAN SOIL
                <br />
                TO ARABIAN GULF KITCHENS.
              </h2>
              <p className="text-sm sm:text-base text-[#3C1518]/80 leading-relaxed font-sans">
                Connecting ancestral agricultural valleys in India with modern home kitchens in Dubai, Abu Dhabi, and across the UAE.
              </p>
            </div>

            {/* Visual Route Journey Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Step 01: Indian Fields */}
              <div className="bg-white rounded-2xl border-2 border-[#3C1518]/15 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-sans uppercase tracking-widest text-[#C8102E] font-bold block mb-2">
                    01 · THE FIELDS
                  </span>
                  <h3 className="text-xl font-display font-black text-[#3C1518] mb-2">
                    Indian Terroirs
                  </h3>
                  <p className="text-xs text-[#3C1518]/75 leading-relaxed font-sans mb-4">
                    Gujarat cumin, Tamil Nadu turmeric, and Karnataka pigeon peas harvested at peak maturity.
                  </p>
                </div>
                <div className="text-[11px] font-sans text-[#6B4226] pt-3 border-t border-[#3C1518]/10">
                  ✓ Field Gate Inspection
                </div>
              </div>

              {/* Step 02: Gentle Regional Milling */}
              <div className="bg-white rounded-2xl border-2 border-[#3C1518]/15 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-sans uppercase tracking-widest text-[#C8102E] font-bold block mb-2">
                    02 · THE MILL
                  </span>
                  <h3 className="text-xl font-display font-black text-[#3C1518] mb-2">
                    Optical Cleaning
                  </h3>
                  <p className="text-xs text-[#3C1518]/75 leading-relaxed font-sans mb-4">
                    Laser sorted and packed in airtight, triple-barrier nitrogen barrier pouches.
                  </p>
                </div>
                <div className="text-[11px] font-sans text-[#6B4226] pt-3 border-t border-[#3C1518]/10">
                  ✓ Aroma Sealed
                </div>
              </div>

              {/* Step 03: Direct Maritime Transit */}
              <div className="bg-white rounded-2xl border-2 border-[#3C1518]/15 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-sans uppercase tracking-widest text-[#C8102E] font-bold block mb-2">
                    03 · THE TRANSIT
                  </span>
                  <h3 className="text-xl font-display font-black text-[#3C1518] mb-2">
                    Arabian Sea Route
                  </h3>
                  <p className="text-xs text-[#3C1518]/75 leading-relaxed font-sans mb-4">
                    Direct climate-controlled shipping from Indian ports straight into UAE fulfillment centers.
                  </p>
                </div>
                <div className="text-[11px] font-sans text-[#6B4226] pt-3 border-t border-[#3C1518]/10">
                  ✓ Fast Turnaround
                </div>
              </div>

              {/* Step 04: Your Home Kitchen */}
              <div className="bg-[#C8102E] text-white rounded-2xl border-2 border-[#C8102E] p-6 shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-xs font-sans uppercase tracking-widest text-white/80 font-bold block mb-2">
                    04 · THE TADKA
                  </span>
                  <h3 className="text-xl font-display font-black text-white mb-2">
                    Your Home Pantry
                  </h3>
                  <p className="text-xs text-white/90 leading-relaxed font-sans mb-4">
                    Bloomed in hot ghee, filling your living room with genuine earthy aroma and comforting warmth.
                  </p>
                </div>
                <div className="text-[11px] font-sans text-white/80 pt-3 border-t border-white/20">
                  ✓ Uncompromised Flavor
                </div>
              </div>
            </div>

            {/* Bottom Sizzling Tadka Visual Spread */}
            <div className="mt-12 rounded-3xl overflow-hidden border-2 border-[#3C1518]/15 shadow-xl relative">
              <div className="relative w-full h-72 sm:h-96 lg:h-[400px]">
                <img
                  src={MAGIC_ASSETS.dalTadka}
                  alt="Sizzling golden Dal Tadka in everyday home cooking"
                  className="w-full h-full object-cover filter brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#3C1518]/90 via-[#3C1518]/40 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 left-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-center max-w-xl text-[#FDF6EC]">
                  <span className="text-xs font-sans uppercase tracking-widest text-[#D4A843] font-bold mb-2">
                    THE FINAL DESTINATION
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-display font-black mb-3 leading-tight">
                    THE EVENING TADKA.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FDF6EC]/85 leading-relaxed font-sans mb-6">
                    When high-curcumin turmeric and unpolished lentils hit sizzling hot ghee, the aroma fills your home with the living memory of the soil it was grown in.
                  </p>
                  <button
                    type="button"
                    onClick={onNavigateRecipes}
                    className="self-start px-6 py-3 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs font-bold uppercase tracking-wider rounded-2xs transition-colors cursor-pointer flex items-center gap-2 shadow-xs active:scale-[0.98]"
                  >
                    <span>COOK WITH MAGIC RECIPES</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 09: FINAL BRAND STATEMENT (CINEMATIC QUIET STATEMENT)            */}
        {/* ========================================================================= */}
        <section
          className="relative w-full bg-[#3C1518] text-[#FDF6EC] py-28 sm:py-36 lg:py-48 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-[#D4A843]/30"
          aria-label="Final Brand Manifesto"
        >
          {/* Environmental Background Image with Deep Maroon Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={MAGIC_ASSETS.kitchenSunset}
              alt="Indian kitchen at sunset"
              className="w-full h-full object-cover filter brightness-30 opacity-40"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#3C1518]/85 mix-blend-multiply" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 rounded-full border border-[#D4A843]/40 text-[11px] font-sans uppercase tracking-[0.25em] text-[#D4A843] mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" />
              <span>THE MAGIC MANIFESTO</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-[#FDF6EC] tracking-tight leading-[1.08] mb-8">
              PURE INGREDIENTS.
              <br />
              REAL ORIGINS.
              <br />
              <span className="text-[#D4A843] italic font-normal">MAGIC IN EVERY PINCH.</span>
            </h2>

            <p className="text-base sm:text-xl text-[#FDF6EC]/85 font-display italic max-w-2xl mx-auto leading-relaxed mb-10">
              "Because the meals we cook for our families every day deserve the honesty and respect of the soil they grew in."
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onNavigateShop()}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs font-bold uppercase tracking-widest rounded-2xs transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>EXPLORE THE MAGIC PANTRY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onNavigateBundles}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-transparent hover:bg-white/10 text-[#FDF6EC] text-xs font-bold uppercase tracking-widest rounded-2xs border border-[#D4A843]/60 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>CURATED PANTRY BUNDLES</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 10: COMMUNITY DISPATCH & NEWSLETTER CTA                           */}
        {/* ========================================================================= */}
        <section
          className="w-full bg-[#FAF5EE] py-20 sm:py-28 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/15"
          aria-labelledby="dispatch-heading"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border-2 border-[#3C1518]/15 p-8 sm:p-12 lg:p-16 text-center shadow-lg">
            <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#C8102E] font-bold mb-3">
              <BookOpen className="w-4 h-4 text-[#C8102E]" />
              <span>THE SOURCING DISPATCH</span>
            </div>
            <h2
              id="dispatch-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#3C1518] tracking-tight mb-4"
            >
              JOIN THE MAGIC TABLE.
            </h2>
            <p className="text-sm sm:text-base text-[#3C1518]/80 leading-relaxed font-sans max-w-xl mx-auto mb-8">
              Receive seasonal harvest dispatches, heirloom Indian recipes, and first access to single-origin spice batches directly in your inbox.
            </p>

            {isSubscribed ? (
              <div className="p-4 bg-[#2B6E2A]/10 border border-[#2B6E2A]/30 rounded-xl text-xs font-sans text-[#2B6E2A] font-bold">
                ✓ Welcome to the MAGIC family. Your first harvest dispatch is on its way.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3.5 rounded-2xs border border-[#3C1518]/20 bg-[#FAF7F2] text-xs text-[#3C1518] placeholder-[#3C1518]/40 focus:outline-none focus:border-[#C8102E]"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#3C1518] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider rounded-2xs transition-colors cursor-pointer shrink-0 active:scale-[0.98]"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* GLOBAL FOOTER */}
      <ShopFooter
        onNavigateHome={onNavigateHome}
        onSelectCategory={() => onNavigateShop()}
        onNavigateRecipes={onNavigateRecipes}
        onNavigateBundles={onNavigateBundles}
        onNavigateImpact={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateNewsletter={onNavigateNewsletter}
      />

      {/* CART DRAWER */}
      <ShopCartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </div>
  );
};
