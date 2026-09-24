import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { ShopProduct, findShopProduct } from '../../data/shopProducts';
import { ShopHeader } from '../shop/ShopHeader';
import { ShopFooter } from '../shop/ShopFooter';
import { ShopCartDrawer } from '../shop/ShopCartDrawer';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductEditorialBenefitStrip } from './ProductEditorialBenefitStrip';
import { ProductStorytelling } from './ProductStorytelling';
import { ProductRecipeCards } from './ProductRecipeCards';
import { ProductFaqSection } from './ProductFaqSection';
import { RelatedProducts } from './RelatedProducts';
import { ProductNewsletter } from './ProductNewsletter';
import { useShopCart } from '../../context/ShopCartContext';
import { useLanguage } from '../../context/LanguageContext';

interface ProductPageProps {
  productSlug?: string | null;
  onNavigateHome: () => void;
  onNavigateShop: (category?: string) => void;
  onNavigateRecipes?: () => void;
  onNavigateBundles?: () => void;
  onNavigateImpact?: () => void;
  onNavigateNewsletter?: () => void;
  onSelectProduct: (productSlug: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  productSlug,
  onNavigateHome,
  onNavigateShop,
  onNavigateRecipes,
  onNavigateBundles,
  onNavigateImpact,
  onNavigateNewsletter,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isCartOpen, closeCart, toastMessage } = useShopCart();
  const { isRTL, t } = useLanguage();
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;
  const BackArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  // Find product dynamically using the slug or identifier
  const product: ShopProduct | undefined = findShopProduct(productSlug);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 1) {
      onNavigateShop();
    }
  };

  const getCategoryLabel = (cat: string) => {
    if (!isRTL) return cat;
    switch (cat) {
      case 'Dals & Lentils': return 'البقوليات والعدس';
      case 'Whole Spices': return 'التوابل الكاملة';
      case 'Ground Spices': return 'التوابل المطحونة';
      case 'Bundles & Sets': return 'الباقات والمجموعات';
      case 'Masalas': return 'خلطات التوابل';
      case 'Ready Mixes': return 'الخلطات الجاهزة';
      default: return cat;
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
          className="fixed top-14 right-4 sm:right-6 rtl:right-auto rtl:left-4 rtl:sm:left-6 z-50 bg-[#3C1518] text-[#FDF6EC] px-4 py-2.5 rounded-lg shadow-xl border border-[#D4A843]/40 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP MARKETPLACE HEADER */}
      <ShopHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onNavigateHome={onNavigateHome}
        onNavigateShop={() => onNavigateShop()}
        onNavigateRecipes={onNavigateRecipes}
        onNavigateBundles={onNavigateBundles}
        onNavigateImpact={onNavigateImpact}
        onNavigateNewsletter={onNavigateNewsletter}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full flex flex-col">
        {product ? (
          <>
            {/* HERO SECTION: Breadcrumb + 55/45 Immersion */}
            <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
              {/* BREADCRUMB */}
              <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
                <ol className="flex items-center flex-wrap gap-1 sm:gap-1.5 text-xs text-[#3C1518]/60">
                  <li>
                    <button
                      onClick={onNavigateHome}
                      className="hover:text-[#C8102E] transition-colors cursor-pointer"
                    >
                      {t('nav.home', 'Home')}
                    </button>
                  </li>
                  <li>
                    <ChevronIcon className="w-3 h-3 text-[#3C1518]/30 inline" />
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigateShop()}
                      className="hover:text-[#C8102E] transition-colors cursor-pointer"
                    >
                      {t('nav.shop', 'Shop')}
                    </button>
                  </li>
                  <li>
                    <ChevronIcon className="w-3 h-3 text-[#3C1518]/30 inline" />
                  </li>
                  <li>
                    <button
                      onClick={() => handleCategoryClick(product.category)}
                      className="hover:text-[#C8102E] transition-colors cursor-pointer"
                    >
                      {getCategoryLabel(product.category)}
                    </button>
                  </li>
                  <li>
                    <ChevronIcon className="w-3 h-3 text-[#3C1518]/30 inline" />
                  </li>
                  <li aria-current="page">
                    <span className="font-semibold text-[#3C1518] truncate max-w-[200px] sm:max-w-none inline-block">
                      {isRTL && product.arabicName ? product.arabicName : product.name}
                    </span>
                  </li>
                </ol>
              </nav>

              {/* 1 & 2: IMMERSIVE HERO GALLERY + STRONG PURCHASE PANEL */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                {/* 1. Large immersive product hero / gallery (approx 55% desktop width) */}
                <div className="lg:col-span-7">
                  <ProductGallery product={product} />
                </div>

                {/* 2. Strong purchase information panel beside it (approx 45% desktop width) */}
                <div className="lg:col-span-5">
                  <ProductInfo
                    product={product}
                    onNavigateCategory={handleCategoryClick}
                  />
                </div>
              </div>
            </div>

            {/* 3. EDITORIAL VISUAL BENEFIT STRIP */}
            <ProductEditorialBenefitStrip product={product} />

            {/* 4. CULINARY / CONTENT STORYTELLING SECTION */}
            <ProductStorytelling product={product} />

            {/* 5. RECIPE / CONTENT CARDS ("Cook With MAGIC") */}
            <ProductRecipeCards
              product={product}
              onSelectProduct={onSelectProduct}
            />

            {/* 6. LARGE FAQ ACCORDION SECTION */}
            <ProductFaqSection product={product} />

            {/* 7. RELATED / FEATURED PRODUCTS SECTION */}
            <RelatedProducts
              currentProduct={product}
              onSelectProduct={onSelectProduct}
            />

            {/* 8. NEWSLETTER ("Join The MAGIC Kitchen") */}
            <ProductNewsletter />
          </>
        ) : (
          /* UNKNOWN PRODUCT FALLBACK */
          <div className="py-20 sm:py-28 text-center max-w-md mx-auto px-4">
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

      {/* 9. FULL MAGIC FOOTER */}
      <ShopFooter
        onNavigateHome={onNavigateHome}
        onSelectCategory={(id) => onNavigateShop(id)}
        onNavigateRecipes={onNavigateRecipes}
        onNavigateBundles={onNavigateBundles}
        onNavigateImpact={onNavigateImpact}
        onNavigateNewsletter={onNavigateNewsletter}
      />

      {/* Cart Drawer */}
      <ShopCartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </div>
  );
};
