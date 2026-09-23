import React from 'react';
import { ShoppingBag, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { HydratedBundle } from '../../data/bundles';
import { BundleComposition } from './BundleComposition';
import { useShopCart } from '../../context/ShopCartContext';

interface BundleCardProps {
  bundle: HydratedBundle;
  onSelectBundle: (slug: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const BundleCard: React.FC<BundleCardProps> = ({
  bundle,
  onSelectBundle,
  onSelectProduct,
}) => {
  const { addItem } = useShopCart();
  const [added, setAdded] = React.useState(false);

  const handleAddBundleToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add every included product with quantity 1
    bundle.products.forEach((prod) => {
      addItem(prod, 1);
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <article
      onClick={() => onSelectBundle(bundle.slug)}
      className="bg-white border border-[#E6DFC8] rounded-xs p-4 sm:p-5 flex flex-col justify-between hover:border-[#C8102E] transition-all group shadow-2xs cursor-pointer select-none"
    >
      <div>
        {/* Top bar: Category & Optional Editorial Badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/60 font-semibold">
            {bundle.category}
          </span>
          {bundle.badge && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#C8102E] bg-[#FAF2EB] px-2 py-0.5 rounded-2xs border border-[#C8102E]/20">
              <Sparkles className="w-2.5 h-2.5 text-[#D4A843]" />
              <span>{bundle.badge}</span>
            </span>
          )}
        </div>

        {/* Large Product Composition Visual */}
        <div className="mb-4">
          <BundleComposition products={bundle.products} size="md" />
        </div>

        {/* Bundle Title & Arabic Name */}
        <div className="mb-1.5">
          <h3 className="text-base sm:text-lg font-serif font-bold text-[#3C1518] group-hover:text-[#C8102E] transition-colors line-clamp-1">
            {bundle.name}
          </h3>
          <p className="font-arabic text-xs text-[#3C1518]/50 line-clamp-1">
            {bundle.arabicName}
          </p>
        </div>

        {/* Short description */}
        <p className="text-xs text-[#3C1518]/70 line-clamp-2 leading-relaxed mb-3 font-sans">
          {bundle.description}
        </p>

        {/* Micro includes bar */}
        <div className="py-2 border-y border-[#3C1518]/8 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#3C1518]/60 font-medium block mb-1">
            Includes {bundle.products.length} Products ({bundle.totalWeight})
          </span>
          <div className="flex flex-wrap gap-1 text-[11px] text-[#3C1518]/80 font-sans">
            {bundle.products.map((p, idx) => (
              <span key={p.id} className="inline-flex items-center">
                <span className="hover:text-[#C8102E] transition-colors">{p.name.replace('MAGIC ', '')}</span>
                {idx < bundle.products.length - 1 && <span className="text-[#3C1518]/30 mx-1">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Price Row: Accurate sum, no fake discounts */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#3C1518]/50 block">
              Bundle Total
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-mono font-bold text-[#C8102E]">
                AED {bundle.price.toFixed(2)}
              </span>
              <span className="text-[11px] font-mono text-[#3C1518]/50">
                (inc. VAT)
              </span>
            </div>
          </div>

          <span className="text-[11px] font-medium text-[#2B6E2A] flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2B6E2A]" />
            <span>{bundle.status}</span>
          </span>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="pt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={handleAddBundleToCart}
          className={`flex-1 min-h-[42px] px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-2xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
            added
              ? 'bg-[#2B6E2A] text-white'
              : 'bg-[#C8102E] hover:bg-[#9B0D23] text-white'
          }`}
          aria-label={`Add ${bundle.name} to cart`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectBundle(bundle.slug);
          }}
          className="min-h-[42px] px-3 py-2 bg-white hover:bg-[#FAF7F2] text-[#3C1518] text-xs font-bold rounded-2xs border border-[#D9CEBA] transition-colors cursor-pointer flex items-center justify-center gap-1"
          aria-label={`View details for ${bundle.name}`}
        >
          <span>View</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
