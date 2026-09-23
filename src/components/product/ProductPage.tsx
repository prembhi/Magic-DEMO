import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { ShopProduct, findShopProduct } from '../../data/shopProducts';
import { ShopHeader } from '../shop/ShopHeader';
import { ShopFooter } from '../shop/ShopFooter';
import { ShopCartDrawer } from '../shop/ShopCartDrawer';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductAbout } from './ProductAbout';
import { ProductWhyMagic } from './ProductWhyMagic';
import { ProductCookWithMagic } from './ProductCookWithMagic';
import { ProductDetails } from './ProductDetails';
import { RelatedProducts } from './RelatedProducts';
import { useShopCart } from '../../context/ShopCartContext';

interface ProductPageProps {
  productSlug?: string | null;
  onNavigateHome: () => void;
  onNavigateShop: (category?: string) => void;
  onSelectProduct: (productSlug: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  productSlug,
  onNavigateHome,
  onNavigateShop,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isCartOpen, closeCart, toastMessage } = useShopCart();

  // Find product dynamically using the slug or identifier
  const product: ShopProduct | undefined = findShopProduct(productSlug);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 1) {
      onNavigateShop();
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === 'Dals & Lentils') {
      onNavigateShop('dals-lentils');
    } else if (categoryName === 'Whole Spices') {
      onNavigateShop('whole-spices');
    } else if (categoryName === 'Ground Spices') {
      onNavigateShop('ground-spices');
    } else {
      onNavigateShop('all');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] text-[#3C1518] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white relative">
      {/* Interactive feedback toast notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-14 right-4 sm:right-6 z-50 bg-[#3C1518] text-[#FDF6EC] px-4 py-2.5 rounded-lg shadow-xl border border-[#D4A843]/40 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. EXISTING APPROVED MARKETPLACE HEADER */}
      <ShopHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onNavigateHome={onNavigateHome}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-[1180px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {product ? (
          <>
            {/* 2. COMPACT BREADCRUMB */}
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
              <ol className="flex items-center flex-wrap gap-1 sm:gap-1.5 text-xs text-[#3C1518]/60">
                <li>
                  <button
                    onClick={onNavigateHome}
                    className="hover:text-[#C8102E] transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <ChevronRight className="w-3 h-3 text-[#3C1518]/30 inline" />
                </li>
                <li>
                  <button
                    onClick={() => onNavigateShop()}
                    className="hover:text-[#C8102E] transition-colors cursor-pointer"
                  >
                    Shop
                  </button>
                </li>
                <li>
                  <ChevronRight className="w-3 h-3 text-[#3C1518]/30 inline" />
                </li>
                <li>
                  <button
                    onClick={() => handleCategoryClick(product.category)}
                    className="hover:text-[#C8102E] transition-colors cursor-pointer"
                  >
                    {product.category}
                  </button>
                </li>
                <li>
                  <ChevronRight className="w-3 h-3 text-[#3C1518]/30 inline" />
                </li>
                <li aria-current="page">
                  <span className="font-semibold text-[#3C1518] truncate max-w-[180px] sm:max-w-none inline-block">
                    {product.name}
                  </span>
                </li>
              </ol>
            </nav>

            {/* 3. MAIN PRODUCT HERO: Desktop Left ~55%, Right ~45% */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* LEFT: Large authentic MAGIC product presentation (approx 55% desktop width) */}
              <div className="lg:col-span-7">
                <ProductGallery product={product} />
              </div>

              {/* RIGHT: Product purchase panel (approx 45% desktop width) */}
              <div className="lg:col-span-5">
                <ProductInfo
                  product={product}
                  onNavigateCategory={handleCategoryClick}
                />
              </div>
            </div>

            {/* 4. ABOUT THIS PRODUCT & STRUCTURED INFORMATION GRID */}
            <ProductAbout product={product} />

            {/* 5. WHY MAGIC / PRODUCT BENEFITS */}
            <ProductWhyMagic product={product} />

            {/* 6. HOW TO USE / COOK WITH MAGIC */}
            <ProductCookWithMagic
              product={product}
              onSelectProduct={onSelectProduct}
            />

            {/* 7. EXPANDABLE PRODUCT DETAILS & TRANSPARENCY ACCORDION */}
            <ProductDetails product={product} />

            {/* 8. RELATED PRODUCTS ("EXPLORE MORE FROM MAGIC") */}
            <RelatedProducts
              currentProduct={product}
              onSelectProduct={onSelectProduct}
            />
          </>
        ) : (
          /* 16. ERROR / UNKNOWN PRODUCT FALLBACK */
          <div className="py-20 sm:py-28 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#C8102E]/10 text-[#C8102E] flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#3C1518] mb-2">
              Product Not Found
            </h1>
            <p className="text-xs sm:text-sm text-[#3C1518]/70 mb-6 leading-relaxed">
              We couldn't locate &ldquo;{productSlug || 'the requested item'}&rdquo;. It may have moved or been updated.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => onNavigateShop()}
                className="py-2.5 px-5 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs font-bold rounded-xs cursor-pointer transition-colors shadow-xs inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Shop Catalog
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 9. EXISTING APPROVED FOOTER */}
      <ShopFooter
        onNavigateHome={onNavigateHome}
        onSelectCategory={(id) => onNavigateShop(id)}
      />

      {/* Cart Drawer */}
      <ShopCartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </div>
  );
};
