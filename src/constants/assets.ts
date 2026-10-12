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

  // Hero Cinematic Brand Film Assets (Farm-to-Spice Indian Sourcing Video)
  heroVideoMp4: `${baseUrl}assets/magic/magic-hero-brand-film.mp4`,
  heroVideoWebm: `${baseUrl}assets/magic/magic-hero-brand-film.webm`,
  heroPoster: `${baseUrl}assets/magic/magic-hero-poster.jpg`,

  // Hand-Drawn Editorial Illustration System (Diaspora-inspired, original to MAGIC)
  farmerHeroLeft: `${baseUrl}assets/magic/magic-farmer-hero-left.png`,
  farmerHeroRight: `${baseUrl}assets/magic/magic-farmer-hero-right.png`,
  farmEditorial: `${baseUrl}assets/magic/magic-farm-editorial.jpg`,
  beeEditorial: `${baseUrl}assets/magic/magic-bee-editorial.png`,
  beeEditorialPng: `${baseUrl}assets/magic/magic-bee-editorial.png`,
  beeEditorialJpg: `${baseUrl}assets/magic/magic-bee-editorial.jpg`,
  spiceEditorial: `${baseUrl}assets/magic/magic-spice-editorial.png`,
  masalaDabbaEditorial: `${baseUrl}assets/magic/magic-masala-dabba-editorial.jpg`,
  masalaDabbaEditorialPng: `${baseUrl}assets/magic/magic-masala-dabba-editorial.png`,
  mortarPestleEditorial: `${baseUrl}assets/magic/magic-mortar-pestle-editorial.jpg`,
  mortarPestleEditorialPng: `${baseUrl}assets/magic/magic-mortar-pestle-editorial.png`,
  harvestEditorial: `${baseUrl}assets/magic/magic-harvest-editorial.jpg`,
  pantryToolsIllustration: `${baseUrl}assets/magic/illustration-pantry-tools.png`,

  // Compatibility aliases for legacy component references
  illustrationTurmeric: `${baseUrl}assets/magic/magic-spice-editorial.png`,
  illustrationCumin: `${baseUrl}assets/magic/magic-spice-editorial.png`,
  illustrationLentils: `${baseUrl}assets/magic/magic-spice-editorial.png`,
  illustrationChili: `${baseUrl}assets/magic/magic-spice-editorial.png`,
  illustrationCoriander: `${baseUrl}assets/magic/magic-spice-editorial.png`,
  illustrationPantryTools: `${baseUrl}assets/magic/magic-mortar-pestle-editorial.jpg`,
  masalaDabba: `${baseUrl}assets/magic/magic-masala-dabba-editorial.jpg`,
  mortarPestle: `${baseUrl}assets/magic/magic-mortar-pestle-editorial.jpg`,
  beeBotanical: `${baseUrl}assets/magic/magic-bee-editorial.jpg`,
  farmStoryIllustration: `${baseUrl}assets/magic/magic-farm-editorial.jpg`,
  tadkaCooking: `${baseUrl}assets/magic/magic-masala-dabba-editorial.jpg`,

  // Approved Footer Agricultural Illustration Assets (v3 isolated farmer subjects)
  footerLandscape: `${baseUrl}assets/magic/magic-footer-landscape.webp?v=3`,
  footerFarmerLeft: `${baseUrl}assets/magic/magic-footer-farmer-left.webp?v=3`,
  footerFarmerRight: `${baseUrl}assets/magic/magic-footer-farmer-right.webp?v=3`,

  // Dedicated Editorial Hand-Drawn Illustration System
  illustrations: {
    farmerField: `${baseUrl}assets/magic/illustrations/illustration-farmer-field.png`,
    farmerHarvesting: `${baseUrl}assets/magic/illustrations/illustration-farmer-harvesting.png`,
    harvestBasket: `${baseUrl}assets/magic/illustrations/illustration-harvest-basket.png`,
    turmeric: `${baseUrl}assets/magic/illustrations/illustration-turmeric-simple.png`,
    cumin: `${baseUrl}assets/magic/illustrations/illustration-cumin-simple.png`,
    chilli: `${baseUrl}assets/magic/illustrations/illustration-chilli-simple.png`,
    lentils: `${baseUrl}assets/magic/illustrations/illustration-lentils-simple.png`,
    coriander: `${baseUrl}assets/magic/illustrations/illustration-coriander-simple.png`,
    brassBowl: `${baseUrl}assets/magic/illustrations/illustration-brass-spice-bowl.png`,
    woodenSpoon: `${baseUrl}assets/magic/illustrations/illustration-wooden-spoon-spices.png`,
    masalaDabba: `${baseUrl}assets/magic/illustrations/illustration-masala-dabba.png`,
    pantryDesk: `${baseUrl}assets/magic/illustrations/illustration-pantry-desk.png`,
    kitchenCooking: `${baseUrl}assets/magic/illustrations/illustration-kitchen-cooking.png`,
    farmToKitchen: `${baseUrl}assets/magic/illustrations/illustration-farm-to-kitchen.png`,
    farmJournal: `${baseUrl}assets/magic/illustrations/illustration-farm-journal.png`,
    indiaSourcing: `${baseUrl}assets/magic/illustrations/illustration-india-sourcing.png`,
    qualitySelection: `${baseUrl}assets/magic/illustrations/illustration-quality-selection.png`,
    freshness: `${baseUrl}assets/magic/illustrations/illustration-freshness.png`,
    heritageKitchen: `${baseUrl}assets/magic/illustrations/illustration-heritage-kitchen.png`,
    farmSourcing: `${baseUrl}assets/magic/illustrations/illustration-farm-sourcing.png`,
  },

  // Authentic Indian Farm & Spice Editorial Photography Collection
  editorial: {
    twoFarmersJungle: `${baseUrl}assets/magic/editorial/two-farmers-jungle.png`,
    twoLadyFarmersBasket: `${baseUrl}assets/magic/editorial/2 Lasdy Farmer with basket close shot.png`,
    fiveFarmersGinger: `${baseUrl}assets/magic/editorial/5 Farmers Holding Giger baskets.png`,
    chilliField: `${baseUrl}assets/magic/editorial/chilli-field.png`,
    chilliPickingBox: `${baseUrl}assets/magic/editorial/chilling picking from box close  up shot.png`,
    dryChilliesInHand: `${baseUrl}assets/magic/editorial/dry-chillies-hand.png`,
    farmerHoldingSpice: `${baseUrl}assets/magic/editorial/farmer-holding-spice.png`,
    farmerHoldingGinger: `${baseUrl}assets/magic/editorial/Farmer Holding Ginder in Farmer.png`,
    femaleFarmersField: `${baseUrl}assets/magic/editorial/Females Farmer in field.png`,
    gingerFieldFarmers: `${baseUrl}assets/magic/editorial/Ginder field with mulipel farmer.png`,
    auntyPickingChillies: `${baseUrl}assets/magic/editorial/Indian Aunty Picking Chills under blue sky in farm.png`,
    ladyPickingChilliesClose: `${baseUrl}assets/magic/editorial/Lady Close up shot in field picking chills.png`,
    manPickingChillies: `${baseUrl}assets/magic/editorial/man-picking-chillies.png`,
    multipleSpices: `${baseUrl}assets/magic/editorial/multiple-spices.png`,
    oldLadyInFarm: `${baseUrl}assets/magic/editorial/old-lady-farm.png`,
    rawSpicesBasket: `${baseUrl}assets/magic/editorial/raw-spices-basket.png`,
  },

  // 6 Curated Cut-Paper Indian Spice Illustrations for Full-Screen Loader
  loader: {
    chilli: `${baseUrl}assets/magic/loader/spice-chilli.png`,
    turmeric: `${baseUrl}assets/magic/loader/spice-turmeric.png`,
    cinnamon: `${baseUrl}assets/magic/loader/spice-cinnamon.png`,
    cardamom: `${baseUrl}assets/magic/loader/spice-cardamom.png`,
    starAnise: `${baseUrl}assets/magic/loader/spice-star-anise.png`,
    seedCluster: `${baseUrl}assets/magic/loader/spice-seed-cluster.png`,
  },
} as const;
