import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { HydratedBundle, HYDRATED_BUNDLES } from '../../data/bundles';
import { BundleComposition } from './BundleComposition';
import { useShopCart } from '../../context/ShopCartContext';
import { BundlePromoSection } from './BundlePromoSection';
import { BundleFaqSection } from './BundleFaqSection';
import { ProductNewsletter } from '../product/ProductNewsletter';

interface BundleDetailPageProps {
  bundle: HydratedBundle;
  onNavigateHome: () => void;
  onNavigateShop?: () => void;
  onNavigateRecipes?: () => void;
  onNavigateBundles: (bundleSlug?: string) => void;
  onSelectBundle: (slug: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const BundleDetailPage: React.FC<BundleDetailPageProps> = ({
  bundle,
  onNavigateHome,
  onNavigateShop,
  onNavigateRecipes,
  onNavigateBundles,
  onSelectBundle,
  onSelectProduct,
}) => {
  const { addItem } = useShopCart();
  const [quantity, setQuantity] = useState(1);
  const [cartToast, setCartToast] = useState<string | null>(null);

  const handleAddBundleToCart = () => {
    bundle.products.forEach((prod) => {
      addItem(prod, quantity);
    });
    setCartToast(`Added ${quantity}x "${bundle.name}" (${bundle.products.length * quantity} items) to your bag`);
    setTimeout(() => setCartToast(null), 3000);
  };

  const handleAddSingleProduct = (product: (typeof bundle.products)[0]) => {
    addItem(product, 1);
    setCartToast(`Added "${product.name}" to your bag`);
    setTimeout(() => setCartToast(null), 2500);
  };

  const otherBundles = HYDRATED_BUNDLES.filter((b) => b.slug !== bundle.slug).slice(0, 3);

  return (
    <article className="w-full bg-[#FDF6EC] text-[#3C1518] selection:bg-[#C8102E] selection:text-white">
      {/* Toast Feedback */}
      {cartToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-6 z-50 bg-[#3C1518] text-[#FDF6EC] px-4 py-2.5 rounded-lg shadow-xl border border-[#D4A843]/40 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
          <span>{cartToast}</span>
        </div>
      )}

      {/* Top Breadcrumb & Return Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#3C1518]/10 pb-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[#3C1518]/65 font-medium">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li aria-hidden="true" className="text-[#3C1518]/30">
                /
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateBundles()}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Bundles
                </button>
              </li>
              <li aria-hidden="true" className="text-[#3C1518]/30">
                /
              </li>
              <li aria-current="page" className="font-semibold text-[#3C1518] truncate max-w-[200px] sm:max-w-none">
                {bundle.name}
              </li>
            </ol>
          </nav>

          <button
            type="button"
            onClick={() => onNavigateBundles()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8102E] hover:text-[#9B0D23] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Bundles</span>
          </button>
        </div>
      </div>

      {/* Hero Section: Bundle Composition & Purchasing Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Authentic Packaging Ensemble */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-4">
            <div className="bg-white border border-[#E6DFC8] p-6 sm:p-8 rounded-xs shadow-2xs">
              <BundleComposition products={bundle.products} size="lg" />

              <div className="mt-4 pt-4 border-t border-[#3C1518]/10 flex flex-wrap items-center justify-between text-xs text-[#3C1518]/65 font-mono">
                <span>Includes {bundle.products.length} Authentic Products</span>
                <span>{bundle.totalWeight}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Metadata, Price & Add To Cart */}
          <div className="lg:col-span-6 xl:col-span-5 bg-white border border-[#E6DFC8] p-6 sm:p-8 rounded-xs shadow-2xs">
            {/* Kicker */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold">
                {bundle.category}
              </span>
              <span className="text-[#3C1518]/25 text-xs">·</span>
              <span className="text-[11px] font-mono uppercase text-[#3C1518]/60 font-semibold">
                {bundle.mainUse}
              </span>
            </div>

            {/* Titles */}
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#3C1518] tracking-tight leading-[1.1] mb-1">
              {bundle.name}
            </h1>
            <p className="font-arabic text-lg text-[#3C1518]/60 mb-4 font-normal">
              {bundle.arabicName}
            </p>

            {/* Tagline */}
            <p className="text-sm font-serif italic text-[#D4A843] mb-4">
              {bundle.tagline}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed font-sans mb-6">
              {bundle.description}
            </p>

            {/* Pricing Section (Accurate sum, strictly zero discount claims) */}
            <div className="p-4 bg-[#FAF7F2] border border-[#E6DFC8] rounded-2xs mb-6">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#3C1518]/60">
                  Combined Price
                </span>
                <span className="text-2xl font-mono font-black text-[#C8102E]">
                  AED {(bundle.price * quantity).toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-[#3C1518]/65 font-sans">
                Sum of {bundle.products.length} individual items. Tax included.
              </p>
            </div>

            {/* Quantity Selector + Add To Cart */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#3C1518]/70 font-semibold">
                  Quantity:
                </span>
                <div className="inline-flex items-center border border-[#D9CEBA] bg-white rounded-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-[#3C1518] hover:text-[#C8102E] disabled:opacity-30 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 py-1 text-xs font-mono font-bold text-[#3C1518]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-[#3C1518] hover:text-[#C8102E] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddBundleToCart}
                className="w-full min-h-[50px] px-6 py-3.5 bg-[#C8102E] hover:bg-[#9B0D23] text-white text-xs font-bold uppercase tracking-widest rounded-2xs transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD BUNDLE TO CART · AED {(bundle.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Assurance Strip */}
            <div className="pt-4 border-t border-[#3C1518]/10 space-y-2 text-xs text-[#3C1518]/70 font-sans">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#2B6E2A]" />
                <span>100% Optical Laser Sorted & Unadulterated</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#2B6E2A]" />
                <span>Individually sealed authentic MAGIC pantry packs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS INCLUDED IN THIS BUNDLE */}
      <section
        className="w-full bg-white border-t border-[#E6DFC8] py-14 sm:py-18"
        aria-labelledby="included-products-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-1">
              INDIVIDUAL ITEMS
            </span>
            <h2
              id="included-products-heading"
              className="text-2xl sm:text-3xl font-serif font-black text-[#3C1518] tracking-tight"
            >
              PRODUCTS INCLUDED IN THIS BUNDLE
            </h2>
            <p className="text-xs sm:text-sm text-[#3C1518]/70 mt-1 font-sans">
              Each bundle contains the following verified MAGIC staples. You can inspect or purchase each item individually.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bundle.products.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#FAF7F2] border border-[#E6DFC8] rounded-xs p-5 flex flex-col justify-between hover:border-[#C8102E] transition-all group"
              >
                <div>
                  <div className="w-full h-44 bg-white rounded-2xs p-3 flex items-center justify-center mb-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                    />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/50 block mb-0.5">
                    {prod.weight} · {prod.category}
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#3C1518] group-hover:text-[#C8102E] transition-colors mb-1">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#3C1518]/70 line-clamp-2 mb-3">
                    {prod.culinaryProfile}
                  </p>
                  <span className="text-sm font-mono font-bold text-[#C8102E] block mb-3">
                    AED {prod.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[#3C1518]/10">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(prod.slug)}
                    className="flex-1 py-2 px-3 bg-white hover:bg-[#F0ECE1] text-[#3C1518] text-xs font-bold rounded-2xs border border-[#D9CEBA] transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddSingleProduct(prod)}
                    className="py-2 px-3 bg-[#3C1518] hover:bg-[#C8102E] text-white text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center justify-center gap-1 shrink-0"
                    title={`Add individual ${prod.name} to bag`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER CURATED BUNDLES */}
      {otherBundles.length > 0 && (
        <section
          className="w-full bg-[#FAF7F2] border-t border-[#E6DFC8] py-14 sm:py-18"
          aria-labelledby="other-bundles-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-[#3C1518]/10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8102E] font-bold block mb-1">
                  MORE SETS
                </span>
                <h2
                  id="other-bundles-heading"
                  className="text-2xl sm:text-3xl font-serif font-black text-[#3C1518] tracking-tight"
                >
                  EXPLORE OTHER BUNDLES
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigateBundles()}
                className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All 6 Bundles</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherBundles.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    onSelectBundle(b.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-[#E6DFC8] rounded-xs p-5 flex flex-col justify-between cursor-pointer hover:border-[#C8102E] transition-all group shadow-2xs"
                >
                  <div>
                    <div className="mb-3">
                      <BundleComposition products={b.products} size="sm" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8102E] font-bold block mb-1">
                      {b.category}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#3C1518] group-hover:text-[#C8102E] transition-colors mb-1 line-clamp-1">
                      {b.name}
                    </h3>
                    <p className="text-xs text-[#3C1518]/70 line-clamp-2 mb-3">
                      {b.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#3C1518]/10 flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-[#C8102E]">
                      AED {b.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-[#3C1518] group-hover:text-[#C8102E] flex items-center gap-1">
                      <span>View Bundle</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Promotional Campaign */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BundlePromoSection
          onShopClick={() => onNavigateShop && onNavigateShop()}
          onRecipesClick={() => onNavigateRecipes && onNavigateRecipes()}
        />
      </div>

      {/* FAQ Section */}
      <BundleFaqSection />

      {/* Approved Newsletter */}
      <ProductNewsletter />
    </article>
  );
};
