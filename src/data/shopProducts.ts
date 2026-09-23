import { MAGIC_ASSETS } from '../constants/assets';

export interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  category: 'Dals & Lentils' | 'Whole Spices' | 'Ground Spices' | 'Masalas' | 'Ready Mixes' | 'Bundles & Sets';
  subCategory?: string;
  arabicName: string;
  englishSub?: string;
  weight: string;
  price: number;
  image: string;
  altText: string;
  origin?: string;
  culinaryProfile?: string;
  ingredients?: string;
  searchKeywords: string[];
  featuredRank: number;
}

export interface ShopCategory {
  id: string;
  name: string;
  count: number;
  subItems?: string[];
  isAvailable: boolean;
}

// Exactly the six authentic products currently supported by authentic PNG assets
export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'toor-dal',
    slug: 'magic-toor-dal',
    name: 'MAGIC Toor Dal',
    category: 'Dals & Lentils',
    subCategory: 'Toor Dal',
    arabicName: 'توار دال هندي ممتاز',
    englishSub: 'Split Yellow Pigeon Peas',
    weight: '1 KG',
    price: 14.5,
    image: MAGIC_ASSETS.toor,
    altText: 'MAGIC Toor Dal 1KG Authentic Packaging Pouch',
    origin: 'Gulbarga, Karnataka & Maharashtra',
    culinaryProfile: 'Backbone of fragrant Sambar, golden tadka dal, rich nutty finish',
    ingredients: '100% Split Yellow Pigeon Peas (Toor / Arhar)',
    searchKeywords: ['toor', 'dal', 'lentil', 'yellow', 'pulse', 'arhar', 'tuvar', 'dals & lentils'],
    featuredRank: 1,
  },
  {
    id: 'masoor-dal',
    slug: 'magic-masoor-dal',
    name: 'MAGIC Masoor Dal',
    category: 'Dals & Lentils',
    subCategory: 'Masoor Dal',
    arabicName: 'عدس أحمر هندي ممتاز',
    englishSub: 'Split Red Lentils',
    weight: '1 KG',
    price: 13.0,
    image: MAGIC_ASSETS.masoor,
    altText: 'MAGIC Masoor Dal 1KG Authentic Packaging Pouch',
    origin: 'Madhya Pradesh & Punjab',
    culinaryProfile: 'Velvety sweetness, quick cooking with gentle earthy notes',
    ingredients: '100% Split Red Lentils (Masoor)',
    searchKeywords: ['masoor', 'dal', 'lentil', 'red', 'pulse', 'split', 'dals & lentils'],
    featuredRank: 2,
  },
  {
    id: 'moong-whole',
    slug: 'magic-moong-whole',
    name: 'MAGIC Moong Whole',
    category: 'Dals & Lentils',
    subCategory: 'Moong Whole',
    arabicName: 'ماش أخضر كامل ممتاز',
    englishSub: 'Whole Green Gram',
    weight: '1 KG',
    price: 15.25,
    image: MAGIC_ASSETS.moong,
    altText: 'MAGIC Moong Whole 1KG Authentic Packaging Pouch',
    origin: 'Rajasthan & Gujarat',
    culinaryProfile: 'Nutty, cooling, protein-dense sprouted or slow-stewed',
    ingredients: '100% Whole Green Gram (Sabut Moong)',
    searchKeywords: ['moong', 'mung', 'whole', 'green', 'gram', 'pulse', 'dals & lentils'],
    featuredRank: 3,
  },
  {
    id: 'urad-whole',
    slug: 'magic-urad-whole',
    name: 'MAGIC Urad Whole',
    category: 'Dals & Lentils',
    subCategory: 'Urad Whole',
    arabicName: 'عدس أسود كامل ممتاز',
    englishSub: 'Whole Black Matpe Beans',
    weight: '1 KG',
    price: 16.0,
    image: MAGIC_ASSETS.urad,
    altText: 'MAGIC Urad Whole 1KG Authentic Packaging Pouch',
    origin: 'Andhra Pradesh & Maharashtra',
    culinaryProfile: 'Creamy, rich and earthy; the quintessential heart of Dal Makhani',
    ingredients: '100% Whole Black Gram (Sabut Urad)',
    searchKeywords: ['urad', 'black', 'gram', 'whole', 'dal', 'pulse', 'dals & lentils'],
    featuredRank: 4,
  },
  {
    id: 'haldi',
    slug: 'magic-haldi',
    name: 'MAGIC Haldi',
    category: 'Ground Spices',
    subCategory: 'Haldi',
    arabicName: 'كركم مطحون نقي',
    englishSub: 'Pure High-Curcumin Turmeric',
    weight: '100 G',
    price: 7.5,
    image: MAGIC_ASSETS.haldi,
    altText: 'MAGIC Haldi Powder 100G Authentic Packaging Pouch',
    origin: 'Salem, Tamil Nadu & Alleppey',
    culinaryProfile: 'Warm, peppery golden aroma with high natural curcumin content',
    ingredients: '100% Ground Turmeric (Curcuma longa)',
    searchKeywords: ['haldi', 'turmeric', 'powder', 'ground', 'spice', 'yellow', 'ground spices'],
    featuredRank: 5,
  },
  {
    id: 'jeera',
    slug: 'magic-jeera',
    name: 'MAGIC Jeera',
    category: 'Whole Spices',
    subCategory: 'Jeera',
    arabicName: 'كمون حب بلدي نقي',
    englishSub: 'Whole Aromatic Cumin Seeds',
    weight: '100 G',
    price: 9.0,
    image: MAGIC_ASSETS.jeera,
    altText: 'MAGIC Jeera Cumin Seeds 100G Authentic Packaging Pouch',
    origin: 'Unjha, Gujarat',
    culinaryProfile: 'Intensely fragrant, warm citrus-wood notes when tempered in ghee',
    ingredients: '100% Whole Cumin Seeds (Cuminum cyminum)',
    searchKeywords: ['jeera', 'cumin', 'seeds', 'whole', 'spice', 'whole spices'],
    featuredRank: 6,
  },
];

/**
 * Universal product locator matching slug, id, or any route pattern variation.
 * (e.g. 'magic-toor-dal', 'toor-dal', 'magic_toor_dal')
 */
export function findShopProduct(identifier?: string | null): ShopProduct | undefined {
  if (!identifier) return undefined;
  const clean = identifier.trim().toLowerCase().replace(/^\/?(shop\/product\/|product\/)?/, '').replace(/^#\/?/, '');
  return SHOP_PRODUCTS.find(
    (p) =>
      p.id.toLowerCase() === clean ||
      p.slug.toLowerCase() === clean ||
      clean === `magic-${p.id.toLowerCase()}` ||
      clean.replace(/^magic-/, '') === p.id.toLowerCase() ||
      clean.replace(/-/g, '') === p.slug.replace(/-/g, '')
  );
}

// Clean category hierarchy per Section 4 specifications
export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    id: 'all',
    name: 'All Products',
    count: 6,
    isAvailable: true,
  },
  {
    id: 'dals-lentils',
    name: 'Dals & Lentils',
    count: 4,
    subItems: ['Toor Dal', 'Masoor Dal', 'Moong Whole', 'Urad Whole'],
    isAvailable: true,
  },
  {
    id: 'whole-spices',
    name: 'Whole Spices',
    count: 1,
    subItems: ['Jeera'],
    isAvailable: true,
  },
  {
    id: 'ground-spices',
    name: 'Ground Spices',
    count: 1,
    subItems: ['Haldi'],
    isAvailable: true,
  },
  {
    id: 'masalas',
    name: 'Masalas',
    count: 0,
    isAvailable: false,
  },
  {
    id: 'ready-mixes',
    name: 'Ready Mixes',
    count: 0,
    isAvailable: false,
  },
  {
    id: 'bundles-sets',
    name: 'Bundles & Sets',
    count: 0,
    isAvailable: false,
  },
];
