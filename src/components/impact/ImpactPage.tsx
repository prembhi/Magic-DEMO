import React from 'react';
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
  BookOpen,
  ShoppingBag,
  Clock,
  ShieldCheck,
  Scale,
  RefreshCw,
  Sun,
  Eye,
  HeartHandshake,
  UserCheck,
} from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import {
  VERIFIED_SOURCING_LOCATIONS,
  FARMER_STORY_PLACEHOLDERS,
  VALUE_AT_SOURCE_PILLARS,
  SOURCING_PRINCIPLES,
  QUALITY_PROCESS_STEPS,
  LAND_TOPICS,
  THE_MAGIC_JOURNEY_STAGES,
} from '../../data/impactData';
import { ImpactMap } from './ImpactMap';
import { ShopHeader } from '../shop/ShopHeader';
import { ShopFooter } from '../shop/ShopFooter';
import { ProductNewsletter } from '../product/ProductNewsletter';
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] text-[#3C1518] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white">
      {/* GLOBAL HEADER */}
      <ShopHeader
        onNavigateHome={onNavigateHome}
        onNavigateShop={() => onNavigateShop()}
        onNavigateRecipes={onNavigateRecipes}
        onNavigateBundles={onNavigateBundles}
        onNavigateImpact={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateNewsletter={onNavigateNewsletter}
      />

      <main className="flex-1 w-full flex flex-col focus:outline-none" id="main-content" tabIndex={-1}>
        {/* ==================================================
            SECTION 01: HERO (Cinematic Agricultural / Editorial Cover)
            ================================================== */}
        <section
          className="relative w-full bg-[#3C1518] text-[#FDF6EC] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#D4A843]/30"
          aria-label="Impact Hero"
        >
          {/* Subtle Indian agricultural terroir backdrop & celestial radial accents */}
          <div className="absolute inset-0 bg-[radial-gradient(#D4A843_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-radial from-[#D4A843]/20 via-[#E8922F]/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-radial from-[#C8102E]/25 via-transparent to-transparent pointer-events-none" />

          {/* Golden hairline agricultural horizon lines */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Editorial Headline & Purpose Copy */}
              <div className="lg:col-span-7 text-center lg:text-left">
                {/* Micro Kicker */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-[#D4A843]/40 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#D4A843] mb-6">
                  <Sparkles className="w-3 h-3 text-[#D4A843]" />
                  <span>OUR IMPACT · 2026/2027 SOURCING REPORT</span>
                </div>

                {/* Primary Fraunces Headline */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-[#FDF6EC] tracking-tight leading-[1.05] mb-5">
                  FROM FARM
                  <br />
                  <span className="text-[#D4A843] italic font-normal">TO MAGIC</span>
                </h1>

                {/* Editorial Subtitle */}
                <p className="text-lg sm:text-2xl font-serif italic text-[#FDF6EC]/90 mb-4 font-normal">
                  "The people, places and purpose behind every pack."
                </p>

                {/* Supporting Sourcing Declaration */}
                <p className="text-xs sm:text-sm text-[#FDF6EC]/75 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10">
                  Every MAGIC ingredient begins somewhere real. A field. A harvest. A farmer. A season.
                  We exist to bridge the gap between Indian soil and modern global pantries through transparent relationships, responsible harvesting, and unadulterated purity.
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('journey')}
                    className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs font-bold uppercase tracking-widest rounded-2xs transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>EXPLORE OUR JOURNEY</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('farmers')}
                    className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-transparent hover:bg-white/10 text-[#FDF6EC] text-xs font-bold uppercase tracking-widest rounded-2xs border border-[#D4A843]/60 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>MEET THE FARMERS</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4A843]" />
                  </button>
                </div>
              </div>

              {/* Right Column: Editorial Graphic Composition with Authentic Assets */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full max-w-md h-80 sm:h-96 flex items-center justify-center">
                  {/* Decorative celestial agricultural disc */}
                  <div className="absolute inset-4 rounded-full border border-[#D4A843]/30 bg-white/5 shadow-inner" />
                  <div className="absolute inset-10 rounded-full border border-dashed border-[#D4A843]/40" />

                  {/* Concentric rings denoting farm to pantry cycles */}
                  <div className="absolute top-2 right-4 bg-white/10 border border-[#D4A843]/30 backdrop-blur-xs px-3 py-1.5 rounded-2xs text-[10px] font-mono uppercase tracking-wider text-[#D4A843] z-30">
                    SINGLE-ORIGIN INDIA
                  </div>

                  {/* Arranged authentic MAGIC staples showcasing crop purity */}
                  <div className="relative z-10 flex items-end justify-center -space-x-8 sm:-space-x-10 w-full h-full pb-6">
                    <img
                      src={MAGIC_ASSETS.toor}
                      alt="MAGIC Toor Dal (Karnataka)"
                      className="max-h-48 sm:max-h-56 w-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transform -rotate-8 hover:scale-105 transition-transform"
                    />
                    <img
                      src={MAGIC_ASSETS.haldi}
                      alt="MAGIC Haldi (Tamil Nadu)"
                      className="max-h-44 sm:max-h-52 w-auto object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)] z-20 hover:scale-105 transition-transform"
                    />
                    <img
                      src={MAGIC_ASSETS.jeera}
                      alt="MAGIC Jeera (Gujarat)"
                      className="max-h-48 sm:max-h-56 w-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transform rotate-8 hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="absolute bottom-1 bg-[#3C1518]/90 border border-[#D4A843]/40 px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#FDF6EC]/80 z-30 shadow-md">
                    UNPOLISHED · UNADULTERATED · TRACEABLE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 02: THE BIG IDEA (Warm Ivory Editorial Statement)
            ================================================== */}
        <section
          className="w-full bg-[#FDF6EC] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E6DFC8]"
          aria-labelledby="big-idea-heading"
        >
          <div className="max-w-4xl mx-auto">
            <div className="border-l-2 border-[#C8102E] pl-6 sm:pl-10">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-4">
                THE CENTRAL PURPOSE
              </span>

              <h2
                id="big-idea-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-[#3C1518] tracking-tight leading-[1.15] mb-8"
              >
                WE WENT LOOKING
                <br />
                FOR THE PEOPLE BEHIND THE SPICE.
              </h2>

              <div className="space-y-6 text-sm sm:text-base text-[#3C1518]/85 leading-relaxed font-sans">
                <p>
                  India has never had a shortage of spices. What has often been missing is the connection between the people who grow them and the people who cook with them.
                </p>
                <p>
                  MAGIC was built around a simple idea: the journey from farm to kitchen should create value for everyone along the way.
                </p>
                <p className="font-serif italic text-lg sm:text-xl text-[#3C1518] pt-2">
                  So we started looking closer.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-[#3C1518]/10 text-xs font-mono font-bold uppercase tracking-wider text-[#C8102E]">
                  <div>At the fields.</div>
                  <div>At the harvest.</div>
                  <div>At the farmers.</div>
                  <div>At crop quality.</div>
                  <div>At your pantry.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 03: INDIA SOURCING MAP
            ================================================== */}
        <section
          id="map"
          className="w-full bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E6DFC8]"
          aria-labelledby="india-map-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-2">
                GEOGRAPHIC TERROIR
              </span>
              <h2
                id="india-map-heading"
                className="text-3xl sm:text-5xl font-serif font-black text-[#3C1518] tracking-tight leading-tight mb-4"
              >
                A COUNTRY FULL OF FLAVOUR
              </h2>
              <p className="text-sm sm:text-base text-[#3C1518]/75 leading-relaxed font-sans">
                India's spice story is spread across climates, soils, farming communities and generations of knowledge.
                Explore our documented single-origin regions below.
              </p>
            </div>

            {/* Interactive India Sourcing Map Component */}
            <ImpactMap onSelectProduct={onSelectProduct} />
          </div>
        </section>

        {/* ==================================================
            SECTION 04: THE SEARCH (Deep Editorial Section)
            ================================================== */}
        <section
          className="w-full bg-[#FAF5EE] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E6DFC8]"
          aria-labelledby="the-search-heading"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-3">
                THE SOURCING QUEST
              </span>
              <h2
                id="the-search-heading"
                className="text-3xl sm:text-5xl font-serif font-black text-[#3C1518] tracking-tight leading-tight mb-2"
              >
                WE DIDN'T WANT THE EASIEST SUPPLY CHAIN.
              </h2>
              <p className="text-2xl sm:text-3xl font-serif italic text-[#D4A843]">
                WE WANTED THE RIGHT ONE.
              </p>
            </div>

            <div className="bg-white border border-[#E6DFC8] p-8 sm:p-12 rounded-xs shadow-2xs space-y-6 text-sm sm:text-base text-[#3C1518]/85 leading-relaxed font-sans">
              <p className="text-base sm:text-lg font-medium text-[#3C1518]">
                Finding the right ingredient isn't as simple as finding the biggest supplier.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#3C1518]/10 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#3C1518]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                  <span>It means asking where it grows.</span>
                </div>
                <div className="flex items-center gap-2 text-[#3C1518]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                  <span>Who grows it.</span>
                </div>
                <div className="flex items-center gap-2 text-[#3C1518]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                  <span>How it is harvested.</span>
                </div>
                <div className="flex items-center gap-2 text-[#3C1518]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                  <span>How it is handled.</span>
                </div>
                <div className="flex items-center gap-2 text-[#3C1518]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                  <span>What happens after harvest.</span>
                </div>
                <div className="flex items-center gap-2 text-[#3C1518]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                  <span>Whether relationships create value beyond transactions.</span>
                </div>
              </div>

              <p className="pt-2 font-serif italic text-base sm:text-lg text-[#3C1518]">
                That's why sourcing for MAGIC begins with research, conversations and time in the field.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 05: FARMERS (Documentary Fieldwork Architecture)
            ================================================== */}
        <section
          id="farmers"
          className="w-full bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E6DFC8]"
          aria-labelledby="farmers-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-2">
                  THE GROWERS
                </span>
                <h2
                  id="farmers-heading"
                  className="text-3xl sm:text-5xl font-serif font-black text-[#3C1518] tracking-tight leading-tight"
                >
                  BEHIND EVERY HARVEST IS A PERSON.
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#3C1518]/70 max-w-md font-sans">
                We believe in honoring the generational stewards of Indian agriculture.
                Our ongoing documentary fieldwork captures their stories directly from the ground.
              </p>
            </div>

            {/* Farmer Story Architecture Grid (No fake people, elegant coming-soon states) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {FARMER_STORY_PLACEHOLDERS.map((farmer) => (
                <div
                  key={farmer.id}
                  className="bg-[#FAF7F2] border border-[#E6DFC8] rounded-xs p-6 sm:p-7 flex flex-col justify-between hover:border-[#D4A843] transition-colors relative overflow-hidden"
                >
                  {/* Subtle decorative Indian grain motif in background */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-[#D4A843]/15 to-transparent pointer-events-none" />

                  <div>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D9CEBA] rounded-2xs text-[10px] font-mono font-bold text-[#C8102E] mb-4">
                      <Clock className="w-3 h-3 text-[#D4A843]" />
                      <span>FARMER STORY COMING SOON</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#3C1518] mb-2">
                      {farmer.title}
                    </h3>

                    {/* Metadata */}
                    <div className="space-y-1.5 text-xs text-[#3C1518]/70 font-mono mb-4 pb-4 border-b border-[#3C1518]/10">
                      <div>
                        <span className="text-[#3C1518]/45">REGION:</span> {farmer.region}, {farmer.state}
                      </div>
                      <div>
                        <span className="text-[#3C1518]/45">CROP:</span> {farmer.crop}
                      </div>
                      <div>
                        <span className="text-[#3C1518]/45">HARVEST:</span> {farmer.harvestCycle}
                      </div>
                    </div>

                    <p className="text-xs text-[#3C1518]/80 leading-relaxed font-sans mb-4">
                      {farmer.teaser}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#3C1518]/10 flex items-center justify-between text-[11px] text-[#3C1518]/60 font-mono">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
                      <span>{farmer.fieldworkStatus}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Ethical Storytelling Note */}
            <div className="mt-8 p-4 bg-[#FAF5EE] border border-[#E6DFC8] rounded-2xs text-xs text-[#3C1518]/70 font-sans max-w-3xl">
              <span className="font-bold text-[#3C1518]">Editorial Integrity Commitment:</span>{' '}
              MAGIC publishes only verified farmer portraits, audio oral histories, and verified cooperative names gathered during field visits. We do not use stock photography or create composite identities.
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 06: VALUE BACK TO THE FARM (Value Flow & Metrics)
            ================================================== */}
        <section
          className="w-full bg-[#FAF5EE] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E6DFC8]"
          aria-labelledby="value-back-heading"
        >
          <div className="max-w-5xl mx-auto text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-3">
              EQUITY & LIVELIHOODS
            </span>
            <h2
              id="value-back-heading"
              className="text-3xl sm:text-5xl font-serif font-black text-[#3C1518] tracking-tight leading-tight mb-4"
            >
              WHEN MAGIC GROWS,
              <br />
              OUR FARM PARTNERS SHOULD GROW WITH US.
            </h2>
            <div className="max-w-2xl mx-auto space-y-4 text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed font-sans">
              <p>
                We don't want the value of an ingredient to disappear as it moves through the supply chain.
                Our goal is to build sourcing relationships where farmers can capture more value from what they grow.
              </p>
              <p className="font-serif italic text-base sm:text-lg text-[#3C1518]">
                That means looking beyond the price paid for a crop and asking a bigger question:
                How can a stronger relationship create a stronger livelihood?
              </p>
            </div>
          </div>

          {/* Visual Value-Flow Diagram */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-white border border-[#E6DFC8] p-6 sm:p-8 rounded-xs shadow-2xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/60 font-semibold block text-center mb-6">
                THE MAGIC VALUE-FLOW ARCHITECTURE
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 sm:gap-2 items-center">
                {[
                  { step: '01', title: 'FARM', desc: 'Soil stewardship & seed selection' },
                  { step: '02', title: 'HARVEST', desc: 'Gentle harvest at peak maturity' },
                  { step: '03', title: 'QUALITY', desc: 'Laser grading & moisture check' },
                  { step: '04', title: 'PROCESSING', desc: 'Unpolished & slow-milled' },
                  { step: '05', title: 'MAGIC', desc: 'Aroma-sealed packaging' },
                  { step: '06', title: 'CUSTOMER', desc: 'Nutritious homestyle cooking' },
                ].map((item, idx) => (
                  <div
                    key={item.step}
                    className="flex flex-col items-center text-center p-3 rounded-2xs bg-[#FAF7F2] border border-[#E6DFC8]/60 relative"
                  >
                    <span className="text-[10px] font-mono font-bold text-[#C8102E] mb-1">
                      {item.step}
                    </span>
                    <h3 className="text-sm font-serif font-black text-[#3C1518] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-[#3C1518]/65 font-sans leading-tight">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transparent Metrics Framework (Only verified qualitative data, zero fake numbers) */}
          <div className="max-w-5xl mx-auto">
            <div className="border border-[#E6DFC8] bg-white p-6 sm:p-8 rounded-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-[#3C1518]/10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8102E] font-bold block">
                    TRANSPARENCY LEDGER
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#3C1518]">
                    Verified Sourcing Metrics Framework
                  </h3>
                </div>
                <div className="text-[11px] font-mono text-[#3C1518]/60 bg-[#FAF7F2] px-3 py-1 rounded-2xs border border-[#E6DFC8]">
                  Baseline Study Underway
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-left">
                <div className="p-3 bg-[#FAF7F2] rounded-2xs border border-[#E6DFC8]/60">
                  <span className="text-[10px] font-mono uppercase text-[#3C1518]/60 block mb-1">
                    VALUE TO PARTNERS
                  </span>
                  <span className="text-xs font-mono font-bold text-[#3C1518] block">
                    Fair Market Benchmark
                  </span>
                  <span className="text-[10px] text-[#3C1518]/50">Direct Mandi & Cluster</span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-2xs border border-[#E6DFC8]/60">
                  <span className="text-[10px] font-mono uppercase text-[#3C1518]/60 block mb-1">
                    FARM PARTNERS
                  </span>
                  <span className="text-xs font-mono font-bold text-[#3C1518] block">
                    Regional Clusters
                  </span>
                  <span className="text-[10px] text-[#3C1518]/50">Unjha, Salem, Gulbarga</span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-2xs border border-[#E6DFC8]/60">
                  <span className="text-[10px] font-mono uppercase text-[#3C1518]/60 block mb-1">
                    STATES
                  </span>
                  <span className="text-xs font-mono font-bold text-[#C8102E] block">
                    6 Active States
                  </span>
                  <span className="text-[10px] text-[#3C1518]/50">GJ, TN, KA, MP, RJ, AP</span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-2xs border border-[#E6DFC8]/60">
                  <span className="text-[10px] font-mono uppercase text-[#3C1518]/60 block mb-1">
                    SOURCING REGIONS
                  </span>
                  <span className="text-xs font-mono font-bold text-[#C8102E] block">
                    Single-Origin Belts
                  </span>
                  <span className="text-[10px] text-[#3C1518]/50">Geographic Terroirs</span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-2xs border border-[#E6DFC8]/60">
                  <span className="text-[10px] font-mono uppercase text-[#3C1518]/60 block mb-1">
                    PARTNERSHIP
                  </span>
                  <span className="text-xs font-mono font-bold text-[#3C1518] block">
                    Multi-Harvest
                  </span>
                  <span className="text-[10px] text-[#3C1518]/50">Multi-Season Focus</span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-2xs border border-[#E6DFC8]/60">
                  <span className="text-[10px] font-mono uppercase text-[#3C1518]/60 block mb-1">
                    INCOME IMPACT
                  </span>
                  <span className="text-xs font-mono font-bold text-[#3C1518] block">
                    Quality Premiums
                  </span>
                  <span className="text-[10px] text-[#3C1518]/50">Audit in Progress</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 07: ADDING VALUE AT SOURCE (Four Visual Pillars)
            ================================================== */}
        <section
          className="w-full bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E6DFC8]"
          aria-labelledby="value-at-source-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-2">
                ORIGIN VALUE RETENTION
              </span>
              <h2
                id="value-at-source-heading"
                className="text-3xl sm:text-5xl font-serif font-black text-[#3C1518] tracking-tight leading-tight mb-4"
              >
                WE WANT MORE VALUE TO STAY CLOSE TO WHERE THE INGREDIENT BEGINS.
              </h2>
              <p className="text-sm sm:text-base text-[#3C1518]/75 leading-relaxed font-sans">
                By investing in primary sorting, dehusking, and protective handling directly in Indian agricultural belts, we ensure farming regions retain technical capacity and economic vitality.
              </p>
            </div>

            {/* Four Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUE_AT_SOURCE_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="bg-[#FAF7F2] border border-[#E6DFC8] rounded-xs p-6 sm:p-7 flex flex-col justify-between hover:border-[#C8102E] transition-all group"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-[#C8102E] block mb-3">
                      PILLAR {pillar.number}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#3C1518] mb-2 group-hover:text-[#C8102E] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-medium text-[#D4A843] mb-3">
                      {pillar.shortSummary}
                    </p>
                    <p className="text-xs text-[#3C1518]/75 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 08: QUALITY (Visual Process: Source -> Deliver)
            ================================================== */}
        <section
          className="w-full bg-[#FAF5EE] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E6DFC8]"
          aria-labelledby="quality-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-3">
                QUALITY RIGOR
              </span>
              <h2
                id="quality-heading"
                className="text-3xl sm:text-5xl font-serif font-black text-[#3C1518] tracking-tight leading-tight mb-2"
              >
                WE DON'T START WITH THE PACK.
              </h2>
              <p className="text-2xl sm:text-3xl font-serif italic text-[#D4A843]">
                WE START WITH THE HARVEST.
              </p>
            </div>

            {/* 6 Quality Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {QUALITY_PROCESS_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="bg-white border border-[#E6DFC8] p-6 sm:p-7 rounded-xs shadow-2xs hover:border-[#D4A843] transition-colors"
                >
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#3C1518]/10">
                    <span className="text-sm font-mono font-black text-[#C8102E]">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#3C1518]/50">
                      QUALITY CHECK
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#3C1518] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono font-medium text-[#D4A843] mb-3">
                    {step.focus}
                  </p>
                  <p className="text-xs text-[#3C1518]/75 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 09: LAND (Soil, Water, Biodiversity, Seeds)
            ================================================== */}
        <section
          className="w-full bg-[#3C1518] text-[#FDF6EC] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#D4A843]/30"
          aria-labelledby="land-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4A843] font-bold block mb-3">
                AGRICULTURAL ECOLOGY
              </span>
              <h2
                id="land-heading"
                className="text-3xl sm:text-5xl font-serif font-black text-[#FDF6EC] tracking-tight leading-tight mb-4"
              >
                THE LAND IS PART OF THE RECIPE.
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-[#FDF6EC]/80 leading-relaxed font-sans">
                <p>
                  A farm isn't a factory.
                  Soil, water, weather, biodiversity and seasons all shape what eventually reaches your kitchen.
                </p>
                <p>
                  We believe responsible sourcing has to consider the long-term health of the land as well as the quality of the harvest.
                </p>
              </div>
            </div>

            {/* Land Topics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {LAND_TOPICS.map((topic) => (
                <div
                  key={topic.title}
                  className="bg-white/5 border border-[#D4A843]/30 p-6 rounded-xs hover:border-[#D4A843] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#D4A843]/20 flex items-center justify-center text-[#D4A843] mb-4">
                    {topic.iconType === 'soil' && <Layers className="w-5 h-5" />}
                    {topic.iconType === 'water' && <Droplets className="w-5 h-5" />}
                    {topic.iconType === 'biodiversity' && <Sprout className="w-5 h-5" />}
                    {topic.iconType === 'seeds' && <Wheat className="w-5 h-5" />}
                    {topic.iconType === 'knowledge' && <BookOpen className="w-5 h-5" />}
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#FDF6EC] mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-[11px] font-mono text-[#D4A843] mb-2">
                    {topic.subtitle}
                  </p>
                  <p className="text-xs text-[#FDF6EC]/70 leading-relaxed font-sans">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 10: OUR SOURCING PRINCIPLES (What We Believe)
            ================================================== */}
        <section
          className="w-full bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E6DFC8]"
          aria-labelledby="principles-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-2">
                CORE ETHOS
              </span>
              <h2
                id="principles-heading"
                className="text-3xl sm:text-5xl font-serif font-black text-[#3C1518] tracking-tight leading-tight mb-3"
              >
                WHAT WE BELIEVE
              </h2>
              <p className="text-sm sm:text-base text-[#3C1518]/75 leading-relaxed font-sans">
                Six commitments guiding how we select, purchase, and safeguard Indian agricultural treasures.
              </p>
            </div>

            {/* Sourcing Principles 6-Card Editorial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {SOURCING_PRINCIPLES.map((principle) => (
                <div
                  key={principle.number}
                  className="bg-[#FAF7F2] border border-[#E6DFC8] p-7 rounded-xs flex flex-col justify-between hover:border-[#C8102E] transition-all"
                >
                  <div>
                    <span className="text-xs font-mono font-black text-[#C8102E] block mb-2">
                      {principle.number}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#3C1518] mb-1">
                      {principle.title}
                    </h3>
                    <p className="text-xs font-medium text-[#D4A843] mb-3">
                      {principle.tagline}
                    </p>
                    <p className="text-xs text-[#3C1518]/80 leading-relaxed font-sans">
                      {principle.explanation}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#3C1518]/10 flex items-center justify-between text-[10px] font-mono text-[#3C1518]/50">
                    <span>MAGIC SOURCING CODE</span>
                    <span>§ {principle.number}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 11: THE MAGIC JOURNEY (Horizontal on Desktop, Stack on Mobile)
            ================================================== */}
        <section
          id="journey"
          className="w-full bg-[#FAF5EE] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E6DFC8]"
          aria-labelledby="journey-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-3">
                CHRONICLE OF INGREDIENTS
              </span>
              <h2
                id="journey-heading"
                className="text-3xl sm:text-5xl font-serif font-black text-[#3C1518] tracking-tight leading-tight mb-3"
              >
                THE MAGIC JOURNEY
              </h2>
              <p className="text-xs sm:text-sm text-[#3C1518]/75 leading-relaxed font-sans">
                From indigenous seeds deep in the soil to fragrant bowls on family tables.
              </p>
            </div>

            {/* Responsive Progression */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {THE_MAGIC_JOURNEY_STAGES.map((milestone, idx) => (
                <div
                  key={milestone.stage}
                  className="bg-white border border-[#E6DFC8] p-5 rounded-xs flex flex-col justify-between shadow-2xs relative group hover:border-[#C8102E] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#3C1518]/10">
                      <span className="text-xs font-mono font-bold text-[#C8102E]">
                        STAGE {milestone.stage}
                      </span>
                      {idx < THE_MAGIC_JOURNEY_STAGES.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-[#3C1518]/30 hidden lg:block" />
                      )}
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#3C1518] mb-1">
                      {milestone.title}
                    </h3>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4A843] font-semibold block mb-2">
                      {milestone.location}
                    </span>

                    <p className="text-xs text-[#3C1518]/75 leading-relaxed font-sans mb-3">
                      {milestone.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#3C1518]/10">
                    <span className="text-[10px] font-mono text-[#3C1518]/60 italic block">
                      {milestone.highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 12: THE IMPACT LOOP (Deep Maroon Section)
            ================================================== */}
        <section
          className="w-full bg-[#3C1518] text-[#FDF6EC] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#D4A843]/30"
          aria-labelledby="loop-heading"
        >
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full border border-[#D4A843]/40 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4A843] mb-4">
              <RefreshCw className="w-3.5 h-3.5 text-[#D4A843]" />
              <span>THE SUSTAINABLE CYCLE</span>
            </div>

            <h2
              id="loop-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-[#FDF6EC] tracking-tight leading-tight mb-12"
            >
              THE JOURNEY DOESN'T END
              <br />
              IN THE KITCHEN.
            </h2>

            {/* Impact Loop Flow */}
            <div className="relative max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    num: '01',
                    title: 'YOU BUY MAGIC',
                    desc: 'Choosing unadulterated, unpolished staples for daily homestyle cooking.',
                  },
                  {
                    num: '02',
                    title: 'MAGIC SOURCES RESPONSIBLY',
                    desc: 'Prioritizing single-origin regional terroirs and optical quality over bulk shortcuts.',
                  },
                  {
                    num: '03',
                    title: 'FARM PARTNERS GAIN ACCESS',
                    desc: 'Predictable demand that values pure crop distinction directly at origin.',
                  },
                  {
                    num: '04',
                    title: 'WE BUILD LONGER RELATIONSHIPS',
                    desc: 'Multi-season commitments allowing growers to plan soil health and crop rotations.',
                  },
                  {
                    num: '05',
                    title: 'BETTER INGREDIENTS REACH YOU',
                    desc: 'Higher essential oils, vibrant natural colors, and velvety dal textures.',
                  },
                  {
                    num: '06',
                    title: 'THE CYCLE CONTINUES',
                    desc: 'Every meal cooked reinforces a healthier, more transparent food system.',
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="p-6 bg-white/5 border border-[#D4A843]/30 rounded-xs text-left hover:border-[#D4A843] transition-colors"
                  >
                    <span className="text-xs font-mono font-bold text-[#D4A843] block mb-2">
                      CYCLE · {item.num}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#FDF6EC] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#FDF6EC]/70 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 13: FINAL CTA (Good Food Should Do More Good)
            ================================================== */}
        <section
          className="w-full bg-[#FAF1D6] py-18 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E6DFC8]"
          aria-labelledby="cta-heading"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2
              id="cta-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-[#3C1518] tracking-tight leading-tight mb-4"
            >
              GOOD FOOD SHOULD DO MORE GOOD.
            </h2>

            <p className="text-sm sm:text-base text-[#3C1518]/80 leading-relaxed font-sans max-w-xl mx-auto mb-8 sm:mb-10">
              Every time you cook with MAGIC, you're part of a longer story. One that begins with the people and places that grow our food.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onNavigateShop()}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-[#C8102E] hover:bg-[#9B0D23] text-white text-xs font-bold uppercase tracking-widest rounded-2xs transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>SHOP MAGIC STAPLES</span>
              </button>

              <button
                type="button"
                onClick={onNavigateRecipes}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-white hover:bg-[#FAF7F2] text-[#3C1518] text-xs font-bold uppercase tracking-widest rounded-2xs border border-[#D9CEBA] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#D4A843]" />
                <span>EXPLORE RECIPES</span>
              </button>
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 14: APPROVED NEWSLETTER (Reused unmodified)
            ================================================== */}
        <ProductNewsletter />
      </main>

      {/* ==================================================
          SECTION 15: APPROVED FOOTER (Reused with navigation links)
          ================================================== */}
      <ShopFooter
        onNavigateHome={onNavigateHome}
        onSelectCategory={(id) => onNavigateShop(id)}
        onNavigateRecipes={onNavigateRecipes}
        onNavigateBundles={onNavigateBundles}
        onNavigateImpact={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateNewsletter={onNavigateNewsletter}
      />

      {/* Slide-over Cart Drawer */}
      <ShopCartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
};
