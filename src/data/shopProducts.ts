import { MAGIC_ASSETS } from '../constants/assets';

export interface ShopProduct {
  id: string;
  name: string;
  category: 'Dals & Lentils' | 'Whole Spices' | 'Ground Spices' | 'Masalas' | 'Ready Mixes' | 'Bundles & Sets';
  subCategory?: string;
  arabicName: string;
  weight: string;
  price: number;
  compareAtPrice?: number;
  isDemoPrice: boolean;
  image: string;
  altText: string;
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
    name: 'MAGIC Toor Dal',
    category: 'Dals & Lentils',
    subCategory: 'Toor Dal',
    arabicName: 'توار دال هندي ممتاز',
    weight: '1 KG',
    price: 14.5,
    compareAtPrice: 16.0,
    isDemoPrice: true,
    image: MAGIC_ASSETS.toor,
    altText: 'MAGIC Toor Dal 1KG Authentic Packaging Pouch',
    searchKeywords: ['toor', 'dal', 'lentil', 'yellow', 'pulse', 'arhar', 'tuvar', 'dals & lentils'],
    featuredRank: 1,
  },
  {
    id: 'masoor-dal',
    name: 'MAGIC Masoor Dal',
    category: 'Dals & Lentils',
    subCategory: 'Masoor Dal',
    arabicName: 'عدس أحمر هندي ممتاز',
    weight: '1 KG',
    price: 13.0,
    compareAtPrice: 14.5,
    isDemoPrice: true,
    image: MAGIC_ASSETS.masoor,
    altText: 'MAGIC Masoor Dal 1KG Authentic Packaging Pouch',
    searchKeywords: ['masoor', 'dal', 'lentil', 'red', 'pulse', 'split', 'dals & lentils'],
    featuredRank: 2,
  },
  {
    id: 'moong-whole',
    name: 'MAGIC Moong Whole',
    category: 'Dals & Lentils',
    subCategory: 'Moong Whole',
    arabicName: 'ماش أخضر كامل ممتاز',
    weight: '1 KG',
    price: 15.25,
    compareAtPrice: 17.0,
    isDemoPrice: true,
    image: MAGIC_ASSETS.moong,
    altText: 'MAGIC Moong Whole 1KG Authentic Packaging Pouch',
    searchKeywords: ['moong', 'mung', 'whole', 'green', 'gram', 'pulse', 'dals & lentils'],
    featuredRank: 3,
  },
  {
    id: 'urad-whole',
    name: 'MAGIC Urad Whole',
    category: 'Dals & Lentils',
    subCategory: 'Urad Whole',
    arabicName: 'عدس أسود كامل ممتاز',
    weight: '1 KG',
    price: 16.0,
    compareAtPrice: 18.0,
    isDemoPrice: true,
    image: MAGIC_ASSETS.urad,
    altText: 'MAGIC Urad Whole 1KG Authentic Packaging Pouch',
    searchKeywords: ['urad', 'black', 'gram', 'whole', 'dal', 'pulse', 'dals & lentils'],
    featuredRank: 4,
  },
  {
    id: 'haldi',
    name: 'MAGIC Haldi',
    category: 'Ground Spices',
    subCategory: 'Haldi',
    arabicName: 'كركم مطحون نقي',
    weight: '100 G',
    price: 7.5,
    compareAtPrice: 8.5,
    isDemoPrice: true,
    image: MAGIC_ASSETS.haldi,
    altText: 'MAGIC Haldi Powder 100G Authentic Packaging Pouch',
    searchKeywords: ['haldi', 'turmeric', 'powder', 'ground', 'spice', 'yellow', 'ground spices'],
    featuredRank: 5,
  },
  {
    id: 'jeera',
    name: 'MAGIC Jeera',
    category: 'Whole Spices',
    subCategory: 'Jeera',
    arabicName: 'كمون حب بلدي نقي',
    weight: '100 G',
    price: 9.0,
    compareAtPrice: 10.5,
    isDemoPrice: true,
    image: MAGIC_ASSETS.jeera,
    altText: 'MAGIC Jeera Cumin Seeds 100G Authentic Packaging Pouch',
    searchKeywords: ['jeera', 'cumin', 'seeds', 'whole', 'spice', 'whole spices'],
    featuredRank: 6,
  },
];

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
