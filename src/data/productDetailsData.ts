import { MAGIC_ASSETS } from '../constants/assets';

export interface ProductCulinaryDish {
  name: string;
  arabicName: string;
  tagline: string;
  prepTime: string;
  description: string;
  pairings: string[];
}

export interface ProductFaqItem {
  question: string;
  answer: string;
}

export interface ProductStory {
  headline: string;
  subheadline: string;
  terroirNotes: string;
  harvestStory: string;
  flavorNotes: string;
  quote: string;
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
  story: ProductStory;
  faqs: ProductFaqItem[];
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
    story: {
      headline: 'The Terroir & Soul of Gulbarga Pigeon Peas',
      subheadline: 'Sun-drenched Deccan black soils that yield India’s most revered yellow dal.',
      terroirNotes:
        'The deep black cotton soils of Northern Karnataka and Maharashtra are naturally rich in calcium and magnesium. These dense mineral profiles, combined with intense tropical sunshine and dry post-monsoon breezes, produce pigeon peas with thick, tender seed coats that melt into a naturally creamy, nutty puree when cooked.',
      harvestStory:
        'Harvested strictly at seasonal peak maturity, our pigeon peas are naturally sun-dried in the field before mechanical de-husking. Unlike commercial market pulses that undergo heavy water washing and mineral oil polishing to mimic freshness, MAGIC Toor Dal is left completely unpolished and unadulterated.',
      flavorNotes:
        'When simmered with a pinch of turmeric, the split peas break down into a comforting golden liquor with deep roasted-grain sweetness and a subtle earthy fragrance that forms the backbone of timeless Indian home cooking.',
      quote: '“Unpolished dal cooks evenly, absorbs the full warmth of blooming cumin, and tastes like honest food should.”',
    },
    faqs: [
      {
        question: 'Is MAGIC Toor Dal polished with oil or water?',
        answer:
          'No. MAGIC Toor Dal is 100% unpolished. Commercial pulses are often coated with mineral oil, water, or talc to create an artificial gloss and increase shelf weight. Our grains are optically cleaned and graded dry, preserving their natural matte finish, native enzymes, and authentic nutritional profile.',
      },
      {
        question: 'Why does single-origin terroir from Gulbarga matter?',
        answer:
          'Gulbarga (Kalaburagi) holds Geographical Indication (GI) heritage for pigeon peas due to its unique clay-rich soil composition and dry climate. Dal harvested from this belt exhibits superior protein density, uniform grain size, and a distinct nutty flavor that cooks down smoothly without turning gritty.',
      },
      {
        question: 'How long does this dal take to cook?',
        answer:
          'In a standard stovetop pressure cooker or Instant Pot, unsoaked MAGIC Toor Dal cooks completely in 3 to 4 whistles (approximately 12 to 15 minutes on medium heat) with 3 cups of water per 1 cup of dal. If cooking in an open pot, we recommend soaking for 30 minutes prior to cooking.',
      },
      {
        question: 'What is the retail packaging technology?',
        answer:
          'Our pouches are engineered with a nitrogen-flushed multi-barrier aluminum foil layer. This hermetically seals out ambient moisture, oxygen, and UAE humidity, keeping the lentils as fresh as the day they were sorted in the packaging facility.',
      },
      {
        question: 'What are the delivery options and thresholds in the UAE?',
        answer:
          'We offer free delivery on all orders over AED 50 throughout the UAE. For Dubai addresses, orders are dispatched express within 30 to 45 minutes from our temperature-controlled central hub.',
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
    story: {
      headline: 'The Gentle Warmth of Alluvial Split Red Lentils',
      subheadline: 'River-fed soils of Central India providing rapid tenderness and sweet earthy notes.',
      terroirNotes:
        'Planted in the fertile alluvial floodplains of the Narmada and Indus tributaries, these split red lentils benefit from seasonal silt replenishment and cool winter ripening.',
      harvestStory:
        'De-husked through traditional dry milling techniques, MAGIC Masoor Dal displays its authentic salmon-coral hue naturally, without the synthetic pink tinting sometimes added in industrial food processing.',
      flavorNotes:
        'Masoor cooks into a rich, velvety texture in just 18 minutes, carrying warm spices with ease and lending silky richness to soups, curries, and comforting stews.',
      quote: '“The quickest route to deep comfort: tender red lentils infused with sizzling cumin and browned garlic.”',
    },
    faqs: [
      {
        question: 'Do I need to soak MAGIC Masoor Dal before cooking?',
        answer:
          'No soaking is required. Split red lentils have had their outer seed husks removed, allowing water to penetrate quickly. They cook to tender perfection in 15 to 20 minutes in an open pot or 2 whistles in a pressure cooker.',
      },
      {
        question: 'Does the red color remain after cooking?',
        answer:
          'Natural split red lentils turn a warm golden-yellow upon cooking. This is the hallmark of genuine, uncolored lentils; lentils that retain unnatural pink color after cooking often contain synthetic artificial food dyes.',
      },
      {
        question: 'How does nitrogen packaging benefit split lentils?',
        answer:
          'Split lentils have exposed inner surfaces susceptible to rancidity when exposed to oxygen. Nitrogen flushing replaces ambient air with inert food-grade nitrogen, preventing oxidation and preserving fresh harvest flavor for up to 12 months.',
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
    story: {
      headline: 'Sun-Hardened Whole Green Gram with Living Vitality',
      subheadline: 'Cultivated in arid Western plains where intense sunshine concentrates seed protein.',
      terroirNotes:
        'The sandy loam of Rajasthan and Gujarat endures extreme diurnal temperature shifts, producing small, firm green seeds packed with living vitality and robust seed coats.',
      harvestStory:
        'Carefully machine-destoned and vacuum-sifted, our whole moong preserves intact germ embryos, ensuring exceptional sprouting performance for home salad prep.',
      flavorNotes:
        'Nutty, herbaceous, and clean, whole moong maintains its shape during braising while offering a pleasant tender chew and light, digestive ease.',
      quote: '“Live whole seeds with natural germ intact, bridging ancient Ayurvedic diets and modern nutritious tables.”',
    },
    faqs: [
      {
        question: 'Can I sprout MAGIC Moong Whole at home?',
        answer:
          'Yes, our whole moong is untreated with irradiation or chemical heat treatments. Soak in room-temperature water for 8 hours, drain, and keep in a damp cheesecloth or sprouting jar. Vigorous crisp sprouts emerge within 24 to 36 hours.',
      },
      {
        question: 'What is the cooking time for whole moong?',
        answer:
          'Soaked whole moong takes approximately 15 minutes in a pressure cooker (4 to 5 whistles) or 35 minutes in a simmering covered pot with water.',
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
    story: {
      headline: 'The Charcoal-Black Matpe Pulse of Legendary Dals',
      subheadline: 'The rich, gelatinous foundation of slow-braised Dal Makhani and airy dosa batter.',
      terroirNotes:
        'Cultivated in the heavy clay soils of the Krishna and Godavari river basins, whole black gram develops dense starch matrices that yield velvety sauce bodies during slow stewing.',
      harvestStory:
        'Graded by optical cameras for uniform grain diameter, our urad whole beans have unpolished matte black husks that soften evenly over gentle heat without shedding prematurely.',
      flavorNotes:
        'Deeply earthy, savory, and satisfying, with rich mucilaginous body that emulsifies with butter, ghee, and cream into restaurant-grade velvet.',
      quote: '“Patience over embers: nothing rivals whole black gram simmered slow with butter and roasted spices.”',
    },
    faqs: [
      {
        question: 'How long should whole black urad be soaked?',
        answer:
          'Because whole black urad has a robust outer seed husk, we recommend soaking in abundant room-temperature water for at least 6 to 8 hours (or overnight) before cooking.',
      },
      {
        question: 'Is this suitable for South Indian idli and dosa batter?',
        answer:
          'Yes, whole black gram produces exceptionally airy fermentation when stone-ground with parboiled rice, resulting in crisp golden dosas and pillowy steamed idlis.',
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
    story: {
      headline: 'Salem Sun & The Pure Golden Rhizome',
      subheadline: 'Cold-milled botanical turmeric with high natural curcumin density and vibrant golden aroma.',
      terroirNotes:
        'Cultivated in the red ferruginous soils surrounding Salem and the Western Ghats foothills, these turmeric rhizomes mature over nine full months under humid tropical heat.',
      harvestStory:
        'Hand-dug, boiled in traditional copper vessels, and slowly sun-cured for three weeks before slow cold-milling. We never blend low-grade wild starch into our powders.',
      flavorNotes:
        'Warm, pungent, gently peppery, with an intense saffron-gold brilliance that perfumes curries and golden drinks without bitter harshness.',
      quote: '“Real turmeric is not just color—it is warmth, botanical aroma, and centuries of kitchen wisdom.”',
    },
    faqs: [
      {
        question: 'How is this turmeric milled?',
        answer:
          'Our Salem rhizomes are cold-milled at controlled low speeds. High-speed industrial grinding produces friction heat exceeding 60°C, which strips volatile oils and degrades curcumin. Our gentle milling keeps essential oils intact.',
      },
      {
        question: 'Why does Salem turmeric have a deeper golden hue?',
        answer:
          'Salem turmeric rhizomes naturally contain higher natural curcumin concentrations than commercial blends. Curcumin is the primary active golden polyphenol responsible for turmeric’s characteristic shade and aroma.',
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
    story: {
      headline: 'The Volatile Aromatic Seeds of Unjha Terroir',
      subheadline: 'Whole ridged cumin seeds harvested from the arid heart of Gujarat spice trade.',
      terroirNotes:
        'The dry saline winds and cool winter nights of Northern Gujarat produce cumin seeds with high volatile cuminaldehyde content, marked by prominent seed ridges and pale golden-brown hulls.',
      harvestStory:
        'Sifted through triple gravity cleaners to remove sand, twigs, and split shells, leaving whole, unbroken seeds that burst with fragrance when heated in ghee or dry-roasted in a cast iron skillet.',
      flavorNotes:
        'Warm, earthy, slightly bitter with pleasant citrus undertones that transform into sweet nutty aroma upon hot-fat tempering.',
      quote: '“The sound of cumin crackling in hot ghee is the opening note of every great Indian meal.”',
    },
    faqs: [
      {
        question: 'Why are Unjha cumin seeds considered superior?',
        answer:
          'Unjha in Gujarat is the world epicenter of cumin cultivation. The unique climate produces seeds with exceptionally high cuminaldehyde concentration, giving MAGIC Jeera its instant crackle and deep aroma.',
      },
      {
        question: 'Should I roast these seeds before grinding?',
        answer:
          'Yes, lightly toasting whole cumin seeds in a dry pan for 60 to 90 seconds until fragrant unlocks fat-soluble aromatics before grinding into fresh cumin powder.',
      },
    ],
  },
};

export function getProductSpecDetails(productIdOrSlug?: string | null): ProductSpecDetails {
  if (!productIdOrSlug) return PRODUCT_DETAILS_MAP['toor-dal'];
  const clean = productIdOrSlug.toLowerCase().replace(/^magic-/, '').replace(/^\/?(shop\/product\/|product\/)?/, '');
  return PRODUCT_DETAILS_MAP[clean] || PRODUCT_DETAILS_MAP['toor-dal'];
}
