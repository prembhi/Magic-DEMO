import { SHOP_PRODUCTS, ShopProduct } from './shopProducts';

export type BundleCategory =
  | 'Dal Essentials'
  | 'Spice Pairings'
  | 'Starter Kits'
  | 'Family Bundles';

export type BundleMainUse =
  | 'Everyday Cooking'
  | 'Tadka & Tempering'
  | 'Dal & Curry'
  | 'Rice & Meals';

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  arabicName: string;
  tagline: string;
  description: string;
  category: BundleCategory;
  mainUse: BundleMainUse;
  productSlugs: string[];
  status: 'In Stock' | 'Out of Stock';
  badge?: string;
  tags: string[];
  inStock: boolean;
  featuredOrder: number;
}

export interface HydratedBundle extends Bundle {
  products: ShopProduct[];
  price: number;
  originalPrice: number;
  savings: number; // strictly 0 for this prototype
  totalWeight: string;
}

export const RAW_BUNDLES: Bundle[] = [
  {
    id: 'magic-everyday-dal-kit',
    slug: 'everyday-dal-kit',
    name: 'MAGIC Everyday Dal Kit',
    arabicName: 'مجموعة العدس اليومية',
    tagline: 'Four Essential Single-Origin Pulses for Daily Homestyle Cooking',
    description:
      'A comprehensive collection of four essential Indian pulses—Toor Dal, Masoor Dal, Moong Whole, and Urad Whole. Optical-laser sorted and unpolished for comforting weeknight dals, restorative soups, and celebratory regional curries.',
    category: 'Dal Essentials',
    mainUse: 'Everyday Cooking',
    productSlugs: [
      'magic-toor-dal',
      'magic-masoor-dal',
      'magic-moong-whole',
      'magic-urad-whole',
    ],
    status: 'In Stock',
    badge: 'Curated 4-Pack',
    tags: ['Dal Essentials', 'Everyday Cooking', 'High Protein', 'Unpolished'],
    inStock: true,
    featuredOrder: 1,
  },
  {
    id: 'magic-tadka-essentials',
    slug: 'tadka-essentials',
    name: 'MAGIC Tadka Essentials',
    arabicName: 'أساسيات القدحة والتوابل',
    tagline: 'Aromatic Whole Cumin & Golden Ground Turmeric',
    description:
      'The foundational aromatic pair of Indian tempering. Whole fragrant cumin seeds that bloom in hot ghee, paired with sun-dried golden turmeric ground from single-source whole rhizomes for unmatched aroma and warm golden color.',
    category: 'Spice Pairings',
    mainUse: 'Tadka & Tempering',
    productSlugs: ['magic-jeera', 'magic-haldi'],
    status: 'In Stock',
    badge: 'Spice Duo',
    tags: ['Spice Pairings', 'Tadka & Tempering', 'Single Origin', 'Essential'],
    inStock: true,
    featuredOrder: 2,
  },
  {
    id: 'magic-indian-kitchen-starter',
    slug: 'indian-kitchen-starter',
    name: 'MAGIC Indian Kitchen Starter',
    arabicName: 'مجموعة المطبخ الهندي للمبتدئين',
    tagline: 'The Quintessential Trio: Pulse, Cumin & Turmeric',
    description:
      'The ideal foundation for anyone beginning their homestyle Indian culinary journey. Unadulterated Toor Dal paired with single-origin whole cumin seeds and pure ground haldi—everything needed to prepare authentic yellow dal tadka.',
    category: 'Starter Kits',
    mainUse: 'Everyday Cooking',
    productSlugs: ['magic-toor-dal', 'magic-jeera', 'magic-haldi'],
    status: 'In Stock',
    badge: 'Kitchen Starter',
    tags: ['Starter Kits', 'Everyday Cooking', 'Homestyle', 'Dal Tadka'],
    inStock: true,
    featuredOrder: 3,
  },
  {
    id: 'magic-dal-lovers-kit',
    slug: 'dal-lovers-kit',
    name: "MAGIC Dal Lover's Kit",
    arabicName: 'مجموعة عشاق العدس',
    tagline: 'Three Prized Pulses for Variety in Texture and Depth',
    description:
      'Curated for pulse connoisseurs who appreciate nuanced culinary textures. Features sweet and nutty Toor Dal, quick-cooking split red Masoor Dal, and earthy whole black Urad for slow-braised homestyle curries.',
    category: 'Dal Essentials',
    mainUse: 'Dal & Curry',
    productSlugs: [
      'magic-toor-dal',
      'magic-masoor-dal',
      'magic-urad-whole',
    ],
    status: 'In Stock',
    badge: 'Lentil Trio',
    tags: ['Dal Essentials', 'Dal & Curry', 'Variety Pack'],
    inStock: true,
    featuredOrder: 4,
  },
  {
    id: 'magic-everyday-pantry',
    slug: 'everyday-pantry',
    name: 'MAGIC Everyday Pantry',
    arabicName: 'مؤونة المطبخ المتكاملة',
    tagline: 'Comprehensive Pantry Kit with Three Pulses & Essential Spices',
    description:
      'A complete pantry foundation for family dining. Combines three beloved Indian lentils (Toor, Masoor, and Moong Whole) with our signature single-origin whole cumin and ground turmeric for daily wholesome meals.',
    category: 'Family Bundles',
    mainUse: 'Everyday Cooking',
    productSlugs: [
      'magic-toor-dal',
      'magic-masoor-dal',
      'magic-moong-whole',
      'magic-jeera',
      'magic-haldi',
    ],
    status: 'In Stock',
    badge: 'Family Complete',
    tags: ['Family Bundles', 'Everyday Cooking', 'Pantry Staple', 'Complete Kit'],
    inStock: true,
    featuredOrder: 5,
  },
  {
    id: 'magic-classic-indian-staples',
    slug: 'classic-indian-staples',
    name: 'MAGIC Classic Indian Staples',
    arabicName: 'كلاسيكيات المطبخ التراثي',
    tagline: 'Timeless Staples: Two Landmark Dals & Two Grounding Spices',
    description:
      'Time-honored culinary essentials brought together. Features classic Toor Dal, nutrient-dense whole black Urad, fragrant cumin seeds, and high-curcumin ground turmeric for rich North and South Indian home recipes.',
    category: 'Starter Kits',
    mainUse: 'Dal & Curry',
    productSlugs: [
      'magic-toor-dal',
      'magic-urad-whole',
      'magic-jeera',
      'magic-haldi',
    ],
    status: 'In Stock',
    badge: 'Classic Staples',
    tags: ['Starter Kits', 'Dal & Curry', 'Heritage Staples'],
    inStock: true,
    featuredOrder: 6,
  },
];

/**
 * Hydrates bundle with real SHOP_PRODUCTS items, calculating accurate price dynamically.
 * Note: savings is strictly 0 for this prototype to prevent false discount claims.
 */
export function hydrateBundle(bundle: Bundle): HydratedBundle {
  const products: ShopProduct[] = [];
  let calculatedPrice = 0;

  for (const slug of bundle.productSlugs) {
    const item = SHOP_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
    if (item) {
      products.push(item);
      calculatedPrice += item.price;
    }
  }

  // Calculate approximate total weight
  const dalCount = products.filter((p) => p.weight === '1 KG').length;
  const spiceCount = products.filter((p) => p.weight === '100 G').length;
  const weightParts: string[] = [];
  if (dalCount > 0) weightParts.push(`${dalCount} KG Pulses`);
  if (spiceCount > 0) weightParts.push(`${spiceCount * 100} G Spices`);
  const totalWeight = weightParts.join(' + ') || `${products.length} Products`;

  return {
    ...bundle,
    products,
    price: Number(calculatedPrice.toFixed(2)),
    originalPrice: Number(calculatedPrice.toFixed(2)),
    savings: 0,
    totalWeight,
  };
}

export const HYDRATED_BUNDLES: HydratedBundle[] = RAW_BUNDLES.map(hydrateBundle);

export function findBundle(slugOrId?: string | null): HydratedBundle | undefined {
  if (!slugOrId) return undefined;
  const clean = slugOrId.toLowerCase().trim();
  const found = RAW_BUNDLES.find(
    (b) =>
      b.slug.toLowerCase() === clean ||
      b.id.toLowerCase() === clean ||
      clean.endsWith(b.slug.toLowerCase())
  );
  return found ? hydrateBundle(found) : undefined;
}
