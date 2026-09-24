// Authentic MAGIC brand assets stored in public/assets/magic/
// Dynamically resolves with Vite's import.meta.env.BASE_URL for both local preview ('/') and GitHub Pages ('/Magic-DEMO/')
const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const MAGIC_ASSETS = {
  // Authentic Packaging (Never altered or generated)
  logo: `${baseUrl}assets/magic/magic_logo_transparent.png`,
  toor: `${baseUrl}assets/magic/toor_clean.png`,
  masoor: `${baseUrl}assets/magic/masoordal_clean.png`,
  moong: `${baseUrl}assets/magic/moong_clean.png`,
  urad: `${baseUrl}assets/magic/urad_clean.png`,
  haldi: `${baseUrl}assets/magic/haldi_clean.png`,
  jeera: `${baseUrl}assets/magic/jeera_clean.png`,

  // Approved Environmental Storytelling Assets
  farmHero: `${baseUrl}assets/magic/magic-farm-hero.png`,
  cropDetail: `${baseUrl}assets/magic/magic-crop-detail.png`,
  harvest: `${baseUrl}assets/magic/magic-harvest.png`,
  soilRoots: `${baseUrl}assets/magic/magic-soil-roots.png`,
  spiceCourtyard: `${baseUrl}assets/magic/magic-spice-courtyard.png`,
  kitchen: `${baseUrl}assets/magic/magic-kitchen.png`,
  dalTadka: `${baseUrl}assets/magic/magic-dal-tadka.png`,
  kitchenSunset: `${baseUrl}assets/magic/magic-kitchen-sunset.png`,

  // Approved Botanical / Decorative Motifs
  illustrationTurmeric: `${baseUrl}assets/magic/illustration-turmeric.png`,
  illustrationCumin: `${baseUrl}assets/magic/illustration-cumin.png`,
  illustrationLentils: `${baseUrl}assets/magic/illustration-lentils.png`,
  illustrationChili: `${baseUrl}assets/magic/illustration-chili.png`,
  illustrationCoriander: `${baseUrl}assets/magic/illustration-coriander.png`,
  illustrationPantryTools: `${baseUrl}assets/magic/illustration-pantry-tools.png`,

  // Approved Footer Agricultural Illustration Assets (v3 isolated farmer subjects)
  footerLandscape: `${baseUrl}assets/magic/magic-footer-landscape.webp?v=3`,
  footerFarmerLeft: `${baseUrl}assets/magic/magic-footer-farmer-left.webp?v=3`,
  footerFarmerRight: `${baseUrl}assets/magic/magic-footer-farmer-right.webp?v=3`,
} as const;
