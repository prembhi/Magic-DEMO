import React, { useState } from 'react';
import { MapPin, Sparkles, ArrowRight, CheckCircle2, Compass, Layers } from 'lucide-react';
import { VERIFIED_SOURCING_LOCATIONS, SourcingLocation } from '../../data/impactData';

interface ImpactMapProps {
  onSelectProduct?: (slug: string) => void;
}

export const ImpactMap: React.FC<ImpactMapProps> = ({ onSelectProduct }) => {
  const [activeLocationId, setActiveLocationId] = useState<string>(
    VERIFIED_SOURCING_LOCATIONS[0].id
  );

  const activeLocation =
    VERIFIED_SOURCING_LOCATIONS.find((loc) => loc.id === activeLocationId) ||
    VERIFIED_SOURCING_LOCATIONS[0];

  return (
    <div className="w-full bg-[#FAF5EE] border border-[#E6DFC8] rounded-xs overflow-hidden shadow-2xs">
      {/* Top Banner */}
      <div className="bg-[#3C1518] text-[#FDF6EC] px-6 py-4 border-b border-[#D4A843]/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#D4A843]" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A843] font-bold">
            VERIFIED REGIONAL SOURCING ATLAS
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-[#FDF6EC]/70">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
            <span>{VERIFIED_SOURCING_LOCATIONS.length} Documented Single-Origin Regions</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT COLUMN: INTERACTIVE SVG MAP */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col items-center justify-center bg-radial from-[#FAF1D6]/60 via-[#FAF5EE] to-[#FAF5EE] border-b lg:border-b-0 lg:border-r border-[#E6DFC8]/80 relative min-h-[440px] sm:min-h-[520px]">
          {/* Subtle Indian geographic compass watermark */}
          <div className="absolute top-4 right-4 pointer-events-none opacity-20">
            <div className="w-28 h-28 rounded-full border border-dashed border-[#3C1518]/40 flex items-center justify-center">
              <span className="text-[10px] font-mono font-bold text-[#3C1518]">N ↑</span>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full max-w-[460px] aspect-[600/700]">
            <svg
              viewBox="0 0 600 700"
              className="w-full h-full drop-shadow-sm select-none"
              role="img"
              aria-label="Map of India highlighting verified MAGIC sourcing regions"
            >
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5ECE0" />
                  <stop offset="100%" stopColor="#EADECB" />
                </linearGradient>
                <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FAF1D6" />
                  <stop offset="100%" stopColor="#F4DEC3" />
                </linearGradient>
                <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3C1518" floodOpacity="0.3" />
                </filter>
              </defs>

              {/* Simplified Geometric & Harmonious Outline of the Indian Subcontinent */}
              <g id="india-subcontinent" fill="url(#mapGradient)" stroke="#D4C4A8" strokeWidth="1.5">
                {/* Main geographic landmass contour path */}
                <path
                  d="M 230 40 
                     C 270 45, 290 70, 310 95 
                     C 320 110, 305 130, 325 145 
                     C 350 155, 385 160, 420 170 
                     C 460 175, 520 160, 540 180 
                     C 555 195, 530 220, 505 230 
                     C 470 240, 435 240, 410 255 
                     C 395 265, 380 280, 385 305 
                     C 390 330, 410 365, 395 405 
                     C 380 440, 345 490, 315 545 
                     C 290 590, 275 640, 260 670 
                     C 245 645, 225 585, 215 530 
                     C 205 480, 195 435, 175 390 
                     C 155 350, 130 320, 140 300 
                     C 150 280, 190 285, 195 260 
                     C 200 240, 170 230, 155 210 
                     C 140 185, 160 145, 185 120 
                     C 200 100, 210 60, 230 40 Z"
                  className="transition-colors duration-500"
                />

                {/* Regional subtle interior state grid lines */}
                <path
                  d="M 195 260 Q 250 280 320 270 M 270 310 Q 320 340 395 330 M 175 390 Q 230 410 290 410 M 250 440 Q 290 480 340 490 M 215 530 Q 250 560 285 580"
                  fill="none"
                  stroke="#3C1518"
                  strokeOpacity="0.08"
                  strokeDasharray="4 4"
                />

                {/* Neighboring maritime indications */}
                <text x="75" y="470" className="text-[11px] font-mono tracking-widest fill-[#3C1518]/25 select-none" transform="rotate(-45 75 470)">
                  ARABIAN SEA
                </text>
                <text x="390" y="470" className="text-[11px] font-mono tracking-widest fill-[#3C1518]/25 select-none" transform="rotate(45 390 470)">
                  BAY OF BENGAL
                </text>
                <text x="210" y="685" className="text-[10px] font-mono tracking-widest fill-[#3C1518]/25 select-none">
                  INDIAN OCEAN
                </text>
              </g>

              {/* Verified Sourcing Regions Pins */}
              {VERIFIED_SOURCING_LOCATIONS.map((loc) => {
                const isSelected = loc.id === activeLocationId;
                const { x, y } = loc.mapCoords;

                return (
                  <g
                    key={loc.id}
                    onClick={() => setActiveLocationId(loc.id)}
                    className="cursor-pointer group focus:outline-none"
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${loc.state} for ${loc.spice}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveLocationId(loc.id);
                      }
                    }}
                  >
                    {/* Animated Pulsing Ring for Selected Pin */}
                    {isSelected && (
                      <>
                        <circle
                          cx={x}
                          cy={y}
                          r="22"
                          fill="none"
                          stroke="#C8102E"
                          strokeWidth="1.5"
                          opacity="0.4"
                          className="animate-ping"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="16"
                          fill="#C8102E"
                          opacity="0.15"
                        />
                      </>
                    )}

                    {/* Outer Pin Body */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? '11' : '8'}
                      fill={isSelected ? '#C8102E' : '#3C1518'}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      filter="url(#pinShadow)"
                      className="transition-all duration-300 group-hover:scale-125"
                    />

                    {/* Inner Core Accent */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? '4' : '2.5'}
                      fill={isSelected ? '#FAF1D6' : '#D4A843'}
                      className="transition-all"
                    />

                    {/* Label Callout */}
                    <text
                      x={x + 14}
                      y={y + 4}
                      className={`text-[11px] font-sans font-bold transition-all pointer-events-none select-none ${
                        isSelected
                          ? 'fill-[#C8102E] font-black'
                          : 'fill-[#3C1518]/70 group-hover:fill-[#C8102E]'
                      }`}
                    >
                      {loc.state.split('&')[0].trim()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend & Micro Guidance */}
          <div className="mt-4 pt-3 border-t border-[#3C1518]/10 w-full flex flex-wrap items-center justify-between text-xs text-[#3C1518]/70 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E] inline-block" />
              <span>Active Sourcing Node</span>
            </span>
            <span className="text-[11px] text-[#3C1518]/50 italic">
              Click pin or state name to inspect details
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: RICH EDITORIAL SOURCING PROFILE */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
          <div>
            {/* Quick State Pills Selector */}
            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/60 font-semibold block mb-2">
                SELECT SOURCING REGION
              </span>
              <div className="flex flex-wrap gap-1.5">
                {VERIFIED_SOURCING_LOCATIONS.map((loc) => {
                  const isSelected = loc.id === activeLocationId;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setActiveLocationId(loc.id)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-2xs border transition-colors cursor-pointer text-left ${
                        isSelected
                          ? 'bg-[#C8102E] text-white border-[#C8102E]'
                          : 'bg-[#FAF7F2] text-[#3C1518]/80 border-[#E6DFC8] hover:border-[#C8102E]'
                      }`}
                    >
                      {loc.state.split('&')[0].trim()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Location Card Content */}
            <div className="border border-[#E6DFC8] bg-[#FAF7F2] rounded-xs p-5 mb-6 transition-all animate-in fade-in duration-300">
              {/* Product Thumbnail & Category Header */}
              <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-[#3C1518]/10">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#C8102E] font-bold mb-1">
                    <Sparkles className="w-3 h-3 text-[#D4A843]" />
                    <span>{activeLocation.category}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-[#3C1518] leading-tight">
                    {activeLocation.spice}
                  </h3>
                  <span className="font-hindi text-xs text-[#3C1518]/60">
                    {activeLocation.hindiName}
                  </span>
                </div>

                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xs border border-[#E6DFC8] p-1 flex items-center justify-center shrink-0">
                  <img
                    src={activeLocation.assetImage}
                    alt={activeLocation.spice}
                    className="max-h-full max-w-full object-contain drop-shadow-xs"
                  />
                </div>
              </div>

              {/* Data Grid: State, Partner, Harvest */}
              <div className="space-y-3 text-xs mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#3C1518]/55 block">
                    STATE & REGION
                  </span>
                  <p className="font-semibold text-[#3C1518]">
                    {activeLocation.state}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#3C1518]/55 block">
                    FARM / PARTNER
                  </span>
                  <p className="font-medium text-[#3C1518]">
                    {activeLocation.farmPartner}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#3C1518]/55 block">
                    HARVEST CYCLE
                  </span>
                  <p className="font-medium text-[#C8102E]">
                    {activeLocation.harvest}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#3C1518]/55 block">
                    TERROIR & CLIMATE
                  </span>
                  <p className="text-[#3C1518]/80 leading-relaxed font-sans">
                    {activeLocation.climateAndTerroir}
                  </p>
                </div>
              </div>

              {/* Story Narrative */}
              <div className="pt-3 border-t border-[#3C1518]/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#3C1518]/55 block mb-1">
                  OUR SOURCING STORY
                </span>
                <p className="text-xs text-[#3C1518]/85 leading-relaxed font-sans">
                  {activeLocation.story}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {onSelectProduct && (
            <button
              type="button"
              onClick={() => onSelectProduct(activeLocation.productSlug)}
              className="w-full py-3 px-4 bg-[#3C1518] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider rounded-2xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View Product in Pantry ({activeLocation.spice.split('(')[0].trim()})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
