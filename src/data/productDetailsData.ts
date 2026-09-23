import { MAGIC_ASSETS } from '../constants/assets';

export interface ProductCulinaryDish {
  name: string;
  arabicName: string;
  tagline: string;
  prepTime: string;
  description: string;
  pairings: string[];
}

export interface ProductSpecDetails {
  category: string;
  weight: string;
  origin: string;
  ingredients: string;
  storage: string;
  shelfLife: string;
  processing: string;
  certificationsVerified: string[];
  culinaryProfile: string;
  shortDescription: string;
  benefits: { title: string; subtitle: string }[];
  culinaryDishes: ProductCulinaryDish[];
}

export const PRODUCT_DETAILS_MAP: Record<string, ProductSpecDetails> = {
  'toor-dal': {
    category: 'Dals & Lentils',
    weight: '1 KG',
    origin: 'Gulbarga, Karnataka & Maharashtra',
    ingredients: '100% Split Yellow Pigeon Peas (Cajanus cajan)',
    storage: 'Store in a cool, dry pantry in an airtight container or seal pouch zipper after opening.',
    shelfLife: '12 Months from packing date',
    processing: 'Optically laser-sorted, unpolished, zero artificial food coloring or synthetic glazing oils.',
    certificationsVerified: ['Direct Origin Harvest', 'Optical Sort Grade 1', 'Nitrogen-Flushed Foil Seal'],
    culinaryProfile: 'Backbone of fragrant Sambar, golden tadka dal, rich nutty finish with gentle earthy sweetness.',
    shortDescription:
      'Harvested from premier black cotton soils of Gulbarga and Maharashtra, MAGIC Toor Dal consists of plump, split yellow pigeon peas laser-sorted for uniform cooking time and tender texture.',
    benefits: [
      {
        title: 'Single-Origin Belts',
        subtitle: 'Sourced directly from Gulbarga & Maharashtra renowned for superior pigeon pea terroir.',
      },
      {
        title: 'Optical Sort Grade 1',
        subtitle: 'Dual optical sorting eliminates discolored grains without chemical polishing oils.',
      },
      {
        title: 'High-Barrier Freshness Foil',
        subtitle: 'Nitrogen-flushed multi-barrier pouch preserves natural oils and kitchen freshness.',
      },
      {
        title: '100% Pure & Unadulterated',
        subtitle: 'Zero preservatives, no artificial yellow colorants, and naturally high in plant protein.',
      },
    ],
    culinaryDishes: [
      {
        name: 'Dal Tadka',
        arabicName: 'دال تادكا',
        tagline: 'Tempered with sizzling cumin, ghee & whole spices',
        prepTime: '30 MIN',
        description:
          'Tender simmered Toor Dal infused with turmeric, finished with a sputtering ghee tadka of whole cumin seeds, garlic, and dried red chilies.',
        pairings: ['MAGIC Jeera', 'MAGIC Haldi'],
      },
      {
        name: 'Heritage Sambar',
        arabicName: 'سامبار هندي',
        tagline: 'Lentil stew with shallots, tamarind & curry leaves',
        prepTime: '40 MIN',
        description:
          'Classic South Indian stew of pressure-cooked toor dal gently simmered with shallots, drumsticks, and freshly tempered mustard and curry leaves.',
        pairings: ['MAGIC Haldi', 'MAGIC Jeera'],
      },
      {
        name: 'Homestyle Khichdi',
        arabicName: 'خيتشدي مريح',
        tagline: 'Comforting one-pot rice & yellow dal porridge',
        prepTime: '25 MIN',
        description:
          'Soothing, easily digestible combination of equal parts basmati rice and split toor dal braised with golden haldi and a teaspoon of cow ghee.',
        pairings: ['MAGIC Haldi', 'MAGIC Jeera'],
      },
    ],
  },
  'masoor-dal': {
    category: 'Dals & Lentils',
    weight: '1 KG',
    origin: 'Madhya Pradesh & Punjab',
    ingredients: '100% Split Red Lentils (Lens culinaris)',
    storage: 'Store in a cool, dry place away from direct sunlight. Reseal pouch after opening.',
    shelfLife: '12 Months from packing date',
    processing: 'De-husked and split naturally, unpolished, zero synthetic dyes or talc.',
    certificationsVerified: ['Direct Origin Harvest', 'Optical Sort Grade 1', 'Nitrogen-Flushed Foil Seal'],
    culinaryProfile: 'Velvety sweetness, quick cooking with gentle earthy notes, melts into creamy puree.',
    shortDescription:
      'Grown in rich river alluvial soils of Central India, MAGIC Masoor Dal offers quick-cooking split red lentils that soften into a smooth, comforting base in under 20 minutes.',
    benefits: [
      {
        title: 'Fast-Cooking Lentil',
        subtitle: 'Cooks to velvety perfection in 18–20 minutes without prior soaking required.',
      },
      {
        title: 'Natural Red Terroir',
        subtitle: 'Naturally vibrant orange-coral color from rich iron soil, completely unpolished.',
      },
      {
        title: 'Multi-Barrier Protection',
        subtitle: 'Foil seal locks in natural moisture balance and guards against pantry moisture.',
      },
      {
        title: 'Nutritious & Wholesome',
        subtitle: 'Exceptional source of dietary fiber, folate, and clean plant-based protein.',
      },
    ],
    culinaryDishes: [
      {
        name: 'Dal Fry',
        arabicName: 'دال فراي',
        tagline: 'Velvety lentils tossed with caramelized onions & tomatoes',
        prepTime: '25 MIN',
        description:
          'Quick-stewed masoor lentils pan-finished with golden fried onions, crushed garlic, ripe tomatoes, and aromatic whole spices.',
        pairings: ['MAGIC Jeera', 'MAGIC Haldi'],
      },
      {
        name: 'Spiced Red Lentil Soup',
        arabicName: 'شوربة العدس الأحمر',
        tagline: 'Silky, warming soup with roasted cumin & lemon',
        prepTime: '20 MIN',
        description:
          'Comforting Mediterranean & Middle Eastern style soup pureed with roasted cumin seeds, turmeric, and a bright squeeze of fresh lemon.',
        pairings: ['MAGIC Jeera', 'MAGIC Haldi'],
      },
    ],
  },
  'moong-whole': {
    category: 'Dals & Lentils',
    weight: '1 KG',
    origin: 'Rajasthan & Gujarat',
    ingredients: '100% Whole Green Gram (Vigna radiata)',
    storage: 'Store in an airtight container in a dry pantry. Excellent for sprouting.',
    shelfLife: '12 Months from packing date',
    processing: 'Uniformly graded whole green seeds, intact husks, unpolished, non-GMO.',
    certificationsVerified: ['Direct Origin Harvest', 'High Germination Viability', 'Nitrogen-Flushed Foil Seal'],
    culinaryProfile: 'Nutty, cooling, protein-dense, retains firm bite when stewed or sprouted.',
    shortDescription:
      'Harvested from arid sunny plains of Western India, MAGIC Moong Whole features intact, vibrant green skin and high germination viability for crisp fresh sprouts.',
    benefits: [
      {
        title: 'High Sprouting Rate',
        subtitle: 'Whole live seed embryo yields crunchy, nutrient-packed sprouts within 24–36 hours.',
      },
      {
        title: 'Cooling Ayurvedic Pulse',
        subtitle: 'Light on the digestion, cooling according to traditional culinary wisdom.',
      },
      {
        title: 'Unpolished Whole Husks',
        subtitle: 'Fiber-rich outer coat intact with zero added mineral oils or gloss sprays.',
      },
      {
        title: 'Airtight Packaged',
        subtitle: 'Sealed multi-barrier pouch preserves grain vitality and germination vigor.',
      },
    ],
    culinaryDishes: [
      {
        name: 'Sabut Moong Curry',
        arabicName: 'إيدام المونج الأخضر',
        tagline: 'Slow-simmered whole green gram with ginger & tomato',
        prepTime: '35 MIN',
        description:
          'Wholesome rustic curry where tender green gram is cooked with grated ginger, turmeric, and tempered in fragrant ghee.',
        pairings: ['MAGIC Haldi', 'MAGIC Jeera'],
      },
      {
        name: 'Fresh Moong Sprout Chaat',
        arabicName: 'سلطة براعم الماش',
        tagline: 'Crisp live sprouts tossed with lime & roasted cumin',
        prepTime: '10 MIN',
        description:
          'Energizing raw salad of sprouted moong, diced cucumbers, tomatoes, chaat masala, and toasted whole cumin seeds.',
        pairings: ['MAGIC Jeera'],
      },
    ],
  },
  'urad-whole': {
    category: 'Dals & Lentils',
    weight: '1 KG',
    origin: 'Andhra Pradesh & Maharashtra',
    ingredients: '100% Whole Black Gram (Vigna mungo)',
    storage: 'Store in a cool, moisture-free pantry. Seal pouch tightly.',
    shelfLife: '12 Months from packing date',
    processing: 'Selected black matpe beans, unpolished, naturally sun-dried.',
    certificationsVerified: ['Direct Origin Harvest', 'Optical Sort Grade 1', 'Nitrogen-Flushed Foil Seal'],
    culinaryProfile: 'Creamy, rich and earthy; the quintessential heart of slow-cooked Dal Makhani.',
    shortDescription:
      'Grown in deep soils of the Deccan plateau, MAGIC Urad Whole is renowned for its thick, velvety gelatinous quality that makes slow-cooked North Indian dals rich and hearty.',
    benefits: [
      {
        title: 'Rich Gelatinous Body',
        subtitle: 'Releases natural starches during slow simmering for authentic Dal Makhani creaminess.',
      },
      {
        title: 'Unpolished Matpe Husk',
        subtitle: 'Deep charcoal-black color preserved without chemical dyes or heavy petroleum polishing.',
      },
      {
        title: 'Traditional Chakki Grade',
        subtitle: 'Ideal for fermenting into airy, crisp South Indian dosas and fluffy idlis.',
      },
      {
        title: 'Purity Sealed',
        subtitle: 'Multi-layer packaging guards against humidity and preserves clean earthy aroma.',
      },
    ],
    culinaryDishes: [
      {
        name: 'Authentic Dal Makhani',
        arabicName: 'دال مخاني الأصلي',
        tagline: 'Slow-cooked black lentils with butter & whole aromatics',
        prepTime: '60 MIN',
        description:
          'Legendary North Indian delicacy simmered over low flame with ginger-garlic paste, fresh cream, butter, and gentle warm spices.',
        pairings: ['MAGIC Haldi', 'MAGIC Jeera'],
      },
      {
        name: 'Crispy Dosa Batter',
        arabicName: 'عجينة الدوسا',
        tagline: 'Fermented black gram providing lift & crisp golden edges',
        prepTime: 'Overnight',
        description:
          'Soaked and stone-ground with rice to create naturally fermented batter for crisp paper dosas and soft steamed idlis.',
        pairings: ['MAGIC Jeera'],
      },
    ],
  },
  'haldi': {
    category: 'Ground Spices',
    weight: '100 G',
    origin: 'Salem, Tamil Nadu & Alleppey',
    ingredients: '100% Ground Turmeric (Curcuma longa)',
    storage: 'Store in a cool, dark cupboard away from moisture and direct light to protect curcumin.',
    shelfLife: '18 Months from packing date',
    processing: 'Single-estate rhizomes, sun-dried, cold-milled, zero added flour or lead chromate.',
    certificationsVerified: ['High Natural Curcumin', 'Cold-Milled Purity', 'Nitrogen-Flushed Foil Seal'],
    culinaryProfile: 'Warm, peppery golden aroma with high natural curcumin content and clean earthy finish.',
    shortDescription:
      'Milled exclusively from mature Salem turmeric rhizomes, MAGIC Haldi delivers an intense golden glow, high natural curcumin level, and pungent botanical fragrance.',
    benefits: [
      {
        title: 'High Curcumin Content',
        subtitle: 'Selected Salem rhizomes prized for superior natural curcumin concentration.',
      },
      {
        title: 'Slow Cold-Milled',
        subtitle: 'Stone-milled at regulated temperatures to protect volatile botanical essential oils.',
      },
      {
        title: 'Zero Adulteration',
        subtitle: 'Lab-tested free of synthetic colorants, starch fillers, or lead chromate dyes.',
      },
      {
        title: 'UV-Barrier Pouch',
        subtitle: 'Opaque foil packaging prevents light degradation of delicate curcumin pigments.',
      },
    ],
    culinaryDishes: [
      {
        name: 'Golden Turmeric Latte',
        arabicName: 'حليب الكركم الذهبي',
        tagline: 'Warming immunity elixir with black pepper & honey',
        prepTime: '5 MIN',
        description:
          'Steamed whole milk or almond milk whisked with a half-teaspoon of pure Salem haldi, cracked black pepper, and raw acacia honey.',
        pairings: ['MAGIC Haldi'],
      },
      {
        name: 'Aromatic Tadka Blooming',
        arabicName: 'تحمير الكركم في السمن',
        tagline: 'Quick 10-second bloom in warm ghee for vibrant curry bases',
        prepTime: '2 MIN',
        description:
          'Gently bloomed in warm ghee alongside whole cumin seeds to unlock fat-soluble curcumin and tint curries golden yellow.',
        pairings: ['MAGIC Jeera'],
      },
    ],
  },
  'jeera': {
    category: 'Whole Spices',
    weight: '100 G',
    origin: 'Unjha, Gujarat',
    ingredients: '100% Whole Cumin Seeds (Cuminum cyminum)',
    storage: 'Keep container tightly sealed in a cool pantry. Avoid humid air exposure.',
    shelfLife: '18 Months from packing date',
    processing: 'Machine-cleaned, machine-destoned, machine-sifted for whole ridged seeds.',
    certificationsVerified: ['Unjha Origin Terroir', 'High Volatile Essential Oils', 'Nitrogen-Flushed Foil Seal'],
    culinaryProfile: 'Intensely fragrant, warm citrus-wood notes when sputtered in hot ghee or dry-roasted.',
    shortDescription:
      'Grown in the world-famous cumin capital of Unjha, MAGIC Jeera consists of bold, unbroken whole cumin seeds packed with aromatic essential oils that crackle upon contact with hot fat.',
    benefits: [
      {
        title: 'Unjha Prime Terroir',
        subtitle: 'Direct from Unjha, Gujarat, world epicenter of potent aromatic cumin seeds.',
      },
      {
        title: 'High Essential Oils',
        subtitle: 'Intact seed ridges retain volatile cuminaldehyde until cracked in your cooking pan.',
      },
      {
        title: 'Triple Destoned',
        subtitle: 'Mechanical sorting removes field debris, dust, and stalks for clean whole seeds.',
      },
      {
        title: 'Moisture-Locked Foil',
        subtitle: 'Airtight packaging ensures seeds crackle and sputter instantly in hot oil.',
      },
    ],
    culinaryDishes: [
      {
        name: 'Royal Jeera Rice',
        arabicName: 'أرز بالكمون',
        tagline: 'Basmati grains tempered with sizzling whole cumin in ghee',
        prepTime: '20 MIN',
        description:
          'Fluffy long-grain basmati tossed with sizzling cumin seeds, green cardamom, and a spoonful of clarified butter.',
        pairings: ['MAGIC Toor Dal', 'MAGIC Masoor Dal'],
      },
      {
        name: 'Cooling Spiced Chaas',
        arabicName: 'لبن عيران بالكمون',
        tagline: 'Probiotic buttermilk with hand-roasted cumin & mint',
        prepTime: '5 MIN',
        description:
          'Chilled churned yogurt drink lightly salted, spiced with dry-roasted cumin seeds, grated ginger, and fresh mint leaves.',
        pairings: ['MAGIC Jeera'],
      },
    ],
  },
};

export function getProductSpecDetails(productIdOrSlug?: string | null): ProductSpecDetails {
  if (!productIdOrSlug) return PRODUCT_DETAILS_MAP['toor-dal'];
  const clean = productIdOrSlug.toLowerCase().replace(/^magic-/, '').replace(/^\/?(shop\/product\/|product\/)?/, '');
  return PRODUCT_DETAILS_MAP[clean] || PRODUCT_DETAILS_MAP['toor-dal'];
}
