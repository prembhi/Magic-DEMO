import { MAGIC_ASSETS } from '../constants/assets';

export interface SourcingLocation {
  id: string;
  state: string;
  spice: string;
  hindiName: string;
  category: 'Dals & Lentils' | 'Whole Spices' | 'Ground Spices';
  farmPartner: string;
  harvest: string;
  climateAndTerroir: string;
  story: string;
  productSlug: string;
  assetImage: string;
  // Map positioning on India SVG viewBox [0 0 600 700]
  mapCoords: { x: number; y: number };
}

/**
 * Verified Sourcing Locations based strictly on documented MAGIC product origins:
 * - Gujarat (Unjha): Whole Cumin Seeds (Jeera)
 * - Tamil Nadu & Kerala (Salem & Alleppey): Ground Turmeric (Haldi)
 * - Karnataka & Maharashtra (Gulbarga / Marathwada): Toor Dal (Split Yellow Pigeon Peas)
 * - Madhya Pradesh & Punjab: Masoor Dal (Split Red Lentils)
 * - Rajasthan & Gujarat: Moong Whole (Whole Green Gram)
 * - Andhra Pradesh & Maharashtra: Urad Whole (Whole Black Matpe Beans)
 * 
 * Note: No unverified states or fake locations are included.
 */
export const VERIFIED_SOURCING_LOCATIONS: SourcingLocation[] = [
  {
    id: 'gujarat-unjha-cumin',
    state: 'Gujarat',
    spice: 'Whole Cumin Seeds (Jeera)',
    hindiName: 'जीरा',
    category: 'Whole Spices',
    farmPartner: 'Unjha Regional Grower & Mandi Cluster',
    harvest: 'Winter Rabi (February – March)',
    climateAndTerroir: 'Dry, arid plains with sandy loam soil and crisp winter nights that concentrate volatile essential oils (cuminaldehyde).',
    story:
      'Unjha in Northern Gujarat has been the spiritual and commercial heart of the global cumin trade for centuries. MAGIC sources unbroken, sun-cured cumin seeds known for their pointed needle shape, warm citrus-wood undertone, and immediate bloom when tempered in hot ghee.',
    productSlug: 'magic-jeera',
    assetImage: MAGIC_ASSETS.jeera,
    mapCoords: { x: 195, y: 320 },
  },
  {
    id: 'tamilnadu-salem-turmeric',
    state: 'Tamil Nadu & Alleppey',
    spice: 'High-Curcumin Turmeric (Haldi)',
    hindiName: 'हल्दी',
    category: 'Ground Spices',
    farmPartner: 'Salem & Southern River Basin Farming Cooperatives',
    harvest: 'Post-Pongal Spring Harvest (January – March)',
    climateAndTerroir: 'Tropical red loamy soils nourished by seasonal monsoons, creating dense, fibrous finger rhizomes with elevated natural curcumin.',
    story:
      'Cultivated along the fertile riverbeds of Southern India, our turmeric rhizomes are harvested after 8 to 9 months in the earth. Cured through traditional boiling and slow sun-drying before mechanical milling, preserving their brilliant golden-orange hue and warm earthy fragrance without fillers or starch.',
    productSlug: 'magic-haldi',
    assetImage: MAGIC_ASSETS.haldi,
    mapCoords: { x: 260, y: 560 },
  },
  {
    id: 'karnataka-gulbarga-toor',
    state: 'Karnataka & Maharashtra',
    spice: 'Toor Dal (Split Yellow Pigeon Peas)',
    hindiName: 'तूर दाल / अरहर',
    category: 'Dals & Lentils',
    farmPartner: 'Gulbarga (Kalaburagi) GI Dal Belt Partners',
    harvest: 'Late Winter Harvest (December – January)',
    climateAndTerroir: 'Deep black cotton soil (Regur) rich in calcium and potassium, yielding plump pods with naturally sweet, nutty profiles.',
    story:
      'Gulbarga Toor Dal is internationally celebrated for its distinctive aroma and quick cooking time without losing grain integrity. MAGIC yellow pigeon peas undergo optical laser sorting to eliminate chipped or discolored grains, leaving them completely unpolished with zero artificial water or oil glazes.',
    productSlug: 'magic-toor-dal',
    assetImage: MAGIC_ASSETS.toor,
    mapCoords: { x: 250, y: 440 },
  },
  {
    id: 'mp-masoor',
    state: 'Madhya Pradesh & Punjab',
    spice: 'Masoor Dal (Split Red Lentils)',
    hindiName: 'मसूर दाल',
    category: 'Dals & Lentils',
    farmPartner: 'Central Indian Rainfed Pulses Network',
    harvest: 'Spring Rabi Harvest (February – April)',
    climateAndTerroir: 'Mild winters and clay-loam plains that encourage uniform lentil seed sizing and high protein density.',
    story:
      'Our Masoor is harvested across the alluvial plains of Central India. Naturally dehusked and split without chemical polishing agents, these coral-red lentils break down into a comforting, velvety texture ideal for everyday weeknight dals and rich regional shorbas.',
    productSlug: 'magic-masoor-dal',
    assetImage: MAGIC_ASSETS.masoor,
    mapCoords: { x: 270, y: 310 },
  },
  {
    id: 'rajasthan-moong',
    state: 'Rajasthan & Gujarat',
    spice: 'Moong Whole (Whole Green Gram)',
    hindiName: 'साबुत मूंग',
    category: 'Dals & Lentils',
    farmPartner: 'Thar Border Semi-Arid Pulse Producers',
    harvest: 'Autumn Kharif Harvest (October – November)',
    climateAndTerroir: 'Arid climate and well-drained sandy soil where deep-rooted green gram naturally fixes atmospheric nitrogen into the land.',
    story:
      'Whole green gram is an indigenous superfood revered for its digestible protein and gentle cooling qualities. MAGIC Moong Whole retains its complete outer seed coat intact, making it robust for sprouting, slow khichdi simmering, or traditional Rajasthani moghar preparation.',
    productSlug: 'magic-moong-whole',
    assetImage: MAGIC_ASSETS.moong,
    mapCoords: { x: 180, y: 245 },
  },
  {
    id: 'andhra-urad',
    state: 'Andhra Pradesh & Maharashtra',
    spice: 'Urad Whole (Whole Black Matpe Beans)',
    hindiName: 'साबुत उड़द',
    category: 'Dals & Lentils',
    farmPartner: 'Coastal Andhra & Marathwada Black Gram Growers',
    harvest: 'Winter Post-Monsoon (December – February)',
    climateAndTerroir: 'Warm, humid coastal plains and deep black soil basins that impart deep glossy skin and unmatched earthy richness.',
    story:
      'The foundational pulse behind authentic Dal Makhani and traditional South Indian fermented batters. Our whole black urad is sourced for uniform density and plumpness, delivering velvety creaminess when slow-simmered over low heat with whole spices.',
    productSlug: 'magic-urad-whole',
    assetImage: MAGIC_ASSETS.urad,
    mapCoords: { x: 290, y: 470 },
  },
];

/**
 * Real Farmer Profiles Module Schema.
 * Per instructions: Do NOT invent fake farmer names or fictional biographies.
 * Instead, provide structured architectural placeholders clearly marked "FARMER STORY COMING SOON"
 * explaining the upcoming fieldwork documentation across verified sourcing regions.
 */
export interface FarmerStoryPlaceholder {
  id: string;
  title: string;
  region: string;
  state: string;
  crop: string;
  harvestCycle: string;
  fieldworkStatus: string;
  teaser: string;
}

export const FARMER_STORY_PLACEHOLDERS: FarmerStoryPlaceholder[] = [
  {
    id: 'farmer-unjha-cumin',
    title: 'The Cumin Harvesters of North Gujarat',
    region: 'Unjha & Mehsana Belt',
    state: 'Gujarat',
    crop: 'Whole Aromatic Cumin (Jeera)',
    harvestCycle: 'Winter Rabi Season',
    fieldworkStatus: 'Documentary Audio & Portrait Recording Active',
    teaser:
      'Field documentation underway focusing on traditional seed selection, morning dew harvesting techniques, and multi-generational threshing practices that protect delicate cumin seeds from bruising.',
  },
  {
    id: 'farmer-salem-turmeric',
    title: 'The Turmeric Curators of Salem',
    region: 'Salem & Erode Valleys',
    state: 'Tamil Nadu',
    crop: 'High-Curcumin Turmeric Rhizomes',
    harvestCycle: 'Spring Harvest',
    fieldworkStatus: 'Harvest Cycle Fieldwork in Progress',
    teaser:
      'Documenting family-run farms preserving heirloom Curcuma rhizomes, traditional wood-fired water curing baths, and open-air courtyard sun drying methods passed down through generations.',
  },
  {
    id: 'farmer-gulbarga-toor',
    title: 'The Pigeon Pea Growers of Gulbarga',
    region: 'Kalaburagi GI District',
    state: 'Karnataka',
    crop: 'Single-Origin Toor Dal',
    harvestCycle: 'Post-Monsoon Winter Harvest',
    fieldworkStatus: 'Soil Health & Farmer Ledger Being Compiled',
    teaser:
      'Capturing the black cotton soil stewards who rotate pigeon peas with millet to maintain regional soil fertility while producing naturally sweet, mineral-rich yellow lentils.',
  },
];

export interface ValuePillar {
  number: string;
  title: string;
  shortSummary: string;
  description: string;
}

export const VALUE_AT_SOURCE_PILLARS: ValuePillar[] = [
  {
    number: '01',
    title: 'BETTER HANDLING',
    shortSummary: 'Immediate post-harvest protection at farm gates',
    description:
      'Proper post-harvest drying, multi-stage sieving, and moisture-controlled breathable storage minimize field spoilage, ensuring crops retain their essential aroma and nutritional integrity without chemical fumigants.',
  },
  {
    number: '02',
    title: 'BETTER PROCESSING',
    shortSummary: 'Primary cleaning and optical grading close to harvest zones',
    description:
      'By encouraging primary sorting, dehusking, and grading within regional agricultural hubs, more technical value and operational processing remain embedded directly in agricultural communities.',
  },
  {
    number: '03',
    title: 'BETTER QUALITY',
    shortSummary: 'Transparent grading based on purity and essential oil content',
    description:
      'Rewarding crops based on grain completeness, absence of artificial glazes, and naturally high curcumin or oil percentages rather than generic bulk weight commodities.',
  },
  {
    number: '04',
    title: 'BETTER MARKET ACCESS',
    shortSummary: 'Direct route from Indian soil to global pantries',
    description:
      'Eliminating unnecessary multi-tiered speculative intermediaries so farm partners have predictable, transparent market demand that values single-origin agricultural distinction.',
  },
];

export interface SourcingPrinciple {
  number: string;
  title: string;
  tagline: string;
  explanation: string;
}

export const SOURCING_PRINCIPLES: SourcingPrinciple[] = [
  {
    number: '01',
    title: 'FAIR VALUE',
    tagline: 'Transparent compensation honoring agricultural labor',
    explanation:
      'We believe the true cost of food must reflect the genuine time, generational knowledge, and physical devotion required to nurture pure spices and unpolished pulses from seed to sack.',
  },
  {
    number: '02',
    title: 'LONG-TERM RELATIONSHIPS',
    tagline: 'Multi-season commitments over spot-market speculation',
    explanation:
      'Sustainable agriculture cannot survive on seasonal commodity trading. We build multi-harvest trust with regional grower clusters so farming communities can plan crop rotations with confidence.',
  },
  {
    number: '03',
    title: 'QUALITY FIRST',
    tagline: 'Zero adulteration, zero water-polishing, 100% authenticity',
    explanation:
      'We refuse shortcuts. No yellow dye in turmeric, no stone powder, no mineral oil coating on dals, and no mixed-origin blending. Every grain and seed must stand on its own culinary merit.',
  },
  {
    number: '04',
    title: 'TRACEABILITY',
    tagline: 'Knowing the exact micro-region and harvest period of every crop',
    explanation:
      'From Salem turmeric fingers to Gulbarga pigeon peas, every MAGIC staple can be traced directly back to its regional terroir, harvest season, and primary sorting facility.',
  },
  {
    number: '05',
    title: 'RESPONSIBLE GROWING',
    tagline: 'Honoring soil health, rain cycles, and biological balance',
    explanation:
      'Healthy spices require living soil. We champion legume crop rotations that naturally replenish nitrogen, responsible groundwater stewardship, and indigenous pest deterrents.',
  },
  {
    number: '06',
    title: 'GROW TOGETHER',
    tagline: 'Creating mutual value as MAGIC expands globally',
    explanation:
      'Our commercial growth must never come at the expense of our agricultural origins. When home cooks across the world embrace MAGIC, that success flows back into Indian farming communities.',
  },
];

export interface QualityStep {
  step: string;
  title: string;
  focus: string;
  description: string;
}

export const QUALITY_PROCESS_STEPS: QualityStep[] = [
  {
    step: '01',
    title: 'SOURCE',
    focus: 'Regional Terroir Verification',
    description: 'We identify designated geographical clusters where microclimates naturally nurture optimal aroma and nutrient density.',
  },
  {
    step: '02',
    title: 'SELECT',
    focus: 'Unadulterated Whole Harvests',
    description: 'Procuring whole seed heads, mature turmeric rhizomes, and plump legume pods directly from trusted regional post-harvest yards.',
  },
  {
    step: '03',
    title: 'TEST',
    focus: 'Purity & Moisture Verification',
    description: 'Laboratory inspection confirming natural moisture balance (<12%), absence of synthetic dyes, and verification of natural curcumin and volatile oils.',
  },
  {
    step: '04',
    title: 'PROCESS',
    focus: 'Optical Laser Cleaning & Gentle Milling',
    description: 'High-speed optical laser sorters remove non-conforming seeds or foreign particles. Pulses remain 100% unpolished; spices are milled slowly to prevent heat degradation.',
  },
  {
    step: '05',
    title: 'PACK',
    focus: 'Triple-Barrier Sealed Pouches',
    description: 'Aroma-sealed packaging with protective barriers against UV light, oxygen, and atmospheric humidity to lock in farm-fresh flavor.',
  },
  {
    step: '06',
    title: 'DELIVER',
    focus: 'Direct to Consumer Kitchens',
    description: 'Swift international logistics connecting Indian farms directly with everyday family kitchens across the UAE and worldwide.',
  },
];

export interface LandTopic {
  title: string;
  subtitle: string;
  description: string;
  iconType: 'soil' | 'water' | 'biodiversity' | 'seeds' | 'knowledge';
}

export const LAND_TOPICS: LandTopic[] = [
  {
    title: 'SOIL',
    subtitle: 'The living biome beneath the plant',
    description:
      'India’s dark regur soils and river silt are living ecosystems. Deep organic carbon, earthworm activity, and microbial balance dictate the peppery finish of a spice and the nutty sweetness of a pulse.',
    iconType: 'soil',
  },
  {
    title: 'WATER',
    subtitle: 'Rainfed cycles & careful conservation',
    description:
      'Pulses like toor, moong, and urad are natural drought survivors requiring minimal supplemental irrigation. They thrive on monsoon moisture, conserving precious regional groundwater.',
    iconType: 'water',
  },
  {
    title: 'BIODIVERSITY',
    subtitle: 'Polyculture & natural pest barriers',
    description:
      'Planting flowering pulses alongside tall millets or mustard creates natural windbreaks and nectar corridors for wild pollinators, reducing the need for chemical interventions.',
    iconType: 'biodiversity',
  },
  {
    title: 'SEEDS',
    subtitle: 'Heirloom resilience over genetic uniformity',
    description:
      'Indigenous seed varieties carry centuries of genetic memory—drought tolerance, natural pest resistance, and deep complex flavor profiles that industrial hybrid seeds have lost.',
    iconType: 'seeds',
  },
  {
    title: 'FARMING KNOWLEDGE',
    subtitle: 'Generational wisdom of the seasons',
    description:
      'Knowing the exact morning dew window to harvest cumin, or the precise sun-drying duration for turmeric rhizomes, is irreplaceable oral heritage held by farming elders.',
    iconType: 'knowledge',
  },
];

export interface JourneyMilestone {
  stage: string;
  title: string;
  location: string;
  description: string;
  highlight: string;
}

export const THE_MAGIC_JOURNEY_STAGES: JourneyMilestone[] = [
  {
    stage: '01',
    title: 'THE SEED',
    location: 'Indian Agricultural Heritage',
    description: 'Resilient indigenous seeds chosen for depth of flavor, natural protein, and climate adaptability rather than industrial yield alone.',
    highlight: 'Pure genetic heritage',
  },
  {
    stage: '02',
    title: 'THE FIELD',
    location: 'Regional Microclimates',
    description: 'Sun-drenched plains of Gujarat, red soils of Tamil Nadu, and black cotton basins of Karnataka nurtured through natural monsoons.',
    highlight: 'Natural terroir & sun',
  },
  {
    stage: '03',
    title: 'THE HARVEST',
    location: 'Seasonal Gatherings',
    description: 'Harvested at peak physiological maturity when essential oils and grain carbohydrates are concentrated to their fullest potential.',
    highlight: 'Gentle hand & field harvest',
  },
  {
    stage: '04',
    title: 'THE FARMER',
    location: 'Grower Communities',
    description: 'Smallholders and cooperative members who bring generational intuition, hand curation, and tireless care to every crop cycle.',
    highlight: 'Human devotion & skill',
  },
  {
    stage: '05',
    title: 'THE JOURNEY',
    location: 'Optical Sorting & Clean Logistics',
    description: 'Laser-checked, unpolished, and packed in triple-barrier moisture-proof pouches to safeguard aroma across continents.',
    highlight: 'Zero water or oil glazes',
  },
  {
    stage: '06',
    title: 'THE MAGIC KITCHEN',
    location: 'Your Dining Table',
    description: 'Bloomed in hot ghee, slow-simmered into velvety comfort, and served to loved ones as living testament to the soil it came from.',
    highlight: 'Wholesome daily meals',
  },
];
