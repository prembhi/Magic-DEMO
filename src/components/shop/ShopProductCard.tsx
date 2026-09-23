import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { useShopCart } from '../../context/ShopCartContext';

interface ShopProductCardProps {
  product: ShopProduct;
  onSelectProduct?: (productId: string) => void;
}

export const ShopProductCard: React.FC<ShopProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  const { addItem, updateQuantity, getItemQuantity } = useShopCart();
  const quantity = getItemQuantity(product.id);

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product.slug || product.id);
    } else if (typeof window !== 'undefined') {
      window.location.hash = `#shop/product/${product.slug || product.id}`;
    }
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group bg-white rounded border border-[#E6E0D6] hover:border-[#C8102E]/40 hover:shadow-xs p-2 sm:p-2.5 flex flex-col justify-between transition-all relative cursor-pointer"
      aria-label={`${product.name}, ${product.weight}, price AED ${product.price.toFixed(2)}`}
    >
      <div>
        {/* COMPACT PRODUCT IMAGE STAGE (Matches Talabat Grocery image box footprint) */}
        <div className="relative w-full h-36 sm:h-40 bg-[#FAF7F2] rounded-xs p-2 flex items-center justify-center overflow-hidden mb-2">
          {/* Authentic Packaging Pouch with object-fit: contain */}
          <img
            src={product.image}
            alt={product.altText}
            loading="lazy"
            className="max-h-full max-w-full object-contain filter drop-shadow-xs transition-transform duration-200 group-hover:scale-103 select-none"
          />

          {/* Small Circular / Compact Stepper ADD Button on Image Edge (Talabat Grocery Style) */}
          <div className="absolute bottom-1.5 right-1.5 z-10">
            {quantity === 0 ? (
              <button
                onClick={handleAdd}
                className="w-7 h-7 rounded-full bg-white border border-[#E6E0D6] text-[#C8102E] hover:bg-[#C8102E] hover:text-white hover:border-[#C8102E] shadow-xs flex items-center justify-center transition-colors cursor-pointer"
                title={`Add ${product.name} to cart`}
                aria-label={`Add ${product.name} to cart`}
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              <div
                className="h-7 bg-white border border-[#C8102E] rounded-full flex items-center px-1 shadow-xs overflow-hidden"
                role="group"
                aria-label={`Quantity selector for ${product.name}`}
              >
                <button
                  onClick={handleDecrement}
                  className="w-5 h-5 flex items-center justify-center text-[#C8102E] hover:bg-[#C8102E]/10 rounded-full cursor-pointer transition-colors"
                  aria-label="Decrease"
                >
                  <Minus className="w-3 h-3 stroke-[2.5]" />
                </button>
                <span className="w-5 text-center text-xs font-bold text-[#3C1518] font-mono select-none">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-5 h-5 flex items-center justify-center text-[#C8102E] hover:bg-[#C8102E]/10 rounded-full cursor-pointer transition-colors"
                  aria-label="Increase"
                >
                  <Plus className="w-3 h-3 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PRICE INFORMATION */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs sm:text-sm font-bold text-[#3C1518] font-mono leading-none">
            AED {product.price.toFixed(2)}
          </span>
        </div>

        {/* PRODUCT NAME & DETAILS */}
        <h3 className="text-xs font-semibold text-[#3C1518] group-hover:text-[#C8102E] transition-colors line-clamp-2 mt-1 leading-snug">
          {product.name}
        </h3>

        {/* WEIGHT & CATEGORY DESCRIPTOR */}
        <div className="flex items-center justify-between mt-1 text-[11px] text-[#3C1518]/60">
          <span>{product.weight}</span>
          <span className="font-arabic text-[11px] text-[#3C1518]/45">
            {product.arabicName.split(' ')[0]}
          </span>
        </div>
      </div>
    </article>
  );
};
