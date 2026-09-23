// Authentic MAGIC brand assets stored in public/assets/magic/
// Dynamically resolves with Vite's import.meta.env.BASE_URL for both local preview ('/') and GitHub Pages ('/Magic-DEMO/')
const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const MAGIC_ASSETS = {
  logo: `${baseUrl}assets/magic/magic_logo_transparent.png`,
  toor: `${baseUrl}assets/magic/toor_clean.png`,
  masoor: `${baseUrl}assets/magic/masoordal_clean.png`,
  moong: `${baseUrl}assets/magic/moong_clean.png`,
  urad: `${baseUrl}assets/magic/urad_clean.png`,
  haldi: `${baseUrl}assets/magic/haldi_clean.png`,
  jeera: `${baseUrl}assets/magic/jeera_clean.png`,
} as const;
