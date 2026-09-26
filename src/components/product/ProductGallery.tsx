import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Maximize2,
  X,
  Sparkles,
  MapPin,
  Flame,
} from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
  type: 'packaging' | 'harvest' | 'dish' | 'botanical' | 'terroir';
}

export function getProductImages(product: ShopProduct): GalleryImage[] {
  const images: GalleryImage[] = [
    {
      src: product.image,
      alt: `${product.name} Authentic Pouch Packaging`,
      label: 'Packaging',
      type: 'packaging',
    },
  ];

  if (product.id === 'toor-dal') {
    images.push(
      {
        src: MAGIC_ASSETS.dalTadka,
        alt: 'Dal Tadka Homestyle Dish with Toor Dal',
        label: 'Cooked Dish',
        type: 'dish',
      },
      {
        src: MAGIC_ASSETS.harvest,
        alt: 'Indian Farm Harvest of Pigeon Peas',
        label: 'Farm Harvest',
        type: 'harvest',
      },
      {
        src: MAGIC_ASSETS.cropDetail,
        alt: 'Close-up Grain Terroir and Pods',
        label: 'Grain Detail',
        type: 'terroir',
      },
      {
        src: MAGIC_ASSETS.illustrations.lentils,
        alt: 'Hand-Drawn Botanical Lentils Artwork',
        label: 'Botanical Art',
        type: 'botanical',
      }
    );
  } else if (product.id === 'masoor-dal') {
    images.push(
      {
        src: MAGIC_ASSETS.kitchen,
        alt: 'Masoor Dal Kitchen Preparation',
        label: 'Kitchen Scene',
        type: 'dish',
      },
      {
        src: MAGIC_ASSETS.soilRoots,
        alt: 'Farm Soil & Root Ecology',
        label: 'Soil & Terroir',
        type: 'terroir',
      },
      {
        src: MAGIC_ASSETS.harvest,
        alt: 'Lentil Harvest Belt',
        label: 'Farm Harvest',
        type: 'harvest',
      },
      {
        src: MAGIC_ASSETS.illustrations.lentils,
        alt: 'Masoor Botanical Grain Illustration',
        label: 'Botanical Art',
        type: 'botanical',
      }
    );
  } else if (product.id === 'moong-whole') {
    images.push(
      {
        src: MAGIC_ASSETS.cropDetail,
        alt: 'Green Moong Grain Detail',
        label: 'Grain Detail',
        type: 'terroir',
      },
      {
        src: MAGIC_ASSETS.farmHero,
        alt: 'Generational Moong Farm Fields',
        label: 'Farm Origins',
        type: 'harvest',
      },
      {
        src: MAGIC_ASSETS.kitchenSunset,
        alt: 'Traditional Cooking with Moong',
        label: 'Kitchen Table',
        type: 'dish',
      },
      {
        src: MAGIC_ASSETS.illustrations.farmerHarvesting,
        alt: 'Hand-Harvesting Botanical Illustration',
        label: 'Harvest Art',
        type: 'botanical',
      }
    );
  } else if (product.id === 'urad-whole') {
    images.push(
      {
        src: MAGIC_ASSETS.dalTadka,
        alt: 'Dal Makhani Slow-Simmered Dish with Urad',
        label: 'Cooked Dish',
        type: 'dish',
      },
      {
        src: MAGIC_ASSETS.soilRoots,
        alt: 'Mineral Rich Soil of Andhra Belts',
        label: 'Soil Health',
        type: 'terroir',
      },
      {
        src: MAGIC_ASSETS.harvest,
        alt: 'Black Matpe Harvest Field',
        label: 'Farm Harvest',
        type: 'harvest',
      },
      {
        src: MAGIC_ASSETS.illustrations.harvestBasket,
        alt: 'Hand-Drawn Harvest Basket Illustration',
        label: 'Harvest Art',
        type: 'botanical',
      }
    );
  } else if (product.id === 'haldi') {
    images.push(
      {
        src: MAGIC_ASSETS.spiceCourtyard,
        alt: 'Sun-Drying Turmeric Rhizomes in Courtyard',
        label: 'Sun Drying',
        type: 'terroir',
      },
      {
        src: MAGIC_ASSETS.masalaDabbaEditorial,
        alt: 'Masala Dabba with Pure Salem Haldi',
        label: 'Spice Box',
        type: 'dish',
      },
      {
        src: MAGIC_ASSETS.illustrations.turmeric,
        alt: 'Hand-Drawn Turmeric Botanical Illustration',
        label: 'Botanical Art',
        type: 'botanical',
      },
      {
        src: MAGIC_ASSETS.kitchen,
        alt: 'Heritage Kitchen Warmth with Haldi',
        label: 'Kitchen Table',
        type: 'dish',
      }
    );
  } else if (product.id === 'jeera') {
    images.push(
      {
        src: MAGIC_ASSETS.spiceCourtyard,
        alt: 'Unjha Cumin Sun-Drying Courtyard',
        label: 'Sun Drying',
        type: 'terroir',
      },
      {
        src: MAGIC_ASSETS.mortarPestleEditorial,
        alt: 'Freshly Crushed Whole Cumin in Mortar & Pestle',
        label: 'Fresh Milling',
        type: 'dish',
      },
      {
        src: MAGIC_ASSETS.illustrations.cumin,
        alt: 'Hand-Drawn Cumin Botanical Illustration',
        label: 'Botanical Art',
        type: 'botanical',
      },
      {
        src: MAGIC_ASSETS.illustrations.brassBowl,
        alt: 'Hand-Drawn Brass Spice Bowl Illustration',
        label: 'Brass Bowl',
        type: 'botanical',
      }
    );
  } else {
    images.push(
      {
        src: MAGIC_ASSETS.cropDetail,
        alt: 'Crop Harvest Detail',
        label: 'Harvest Detail',
        type: 'harvest',
      },
      {
        src: MAGIC_ASSETS.kitchen,
        alt: 'Kitchen Story',
        label: 'Kitchen Scene',
        type: 'dish',
      },
      {
        src: MAGIC_ASSETS.illustrations.harvestBasket,
        alt: 'Harvest Botanical Art',
        label: 'Botanical Art',
        type: 'botanical',
      }
    );
  }

  return images;
}

interface ProductGalleryProps {
  product: ShopProduct;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const { isRTL } = useLanguage();
  const images = getProductImages(product);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Reset active index when product changes
  useEffect(() => {
    setActiveIndex(0);
  }, [product.id]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // Keyboard navigation on active stage
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      if (isRTL) handleNext();
      else handlePrev();
    } else if (e.key === 'ArrowRight') {
      if (isRTL) handlePrev();
      else handleNext();
    }
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      if (isRTL) handlePrev();
      else handleNext();
    } else if (isRightSwipe) {
      if (isRTL) handleNext();
      else handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentImage = images[activeIndex] || images[0];

  return (
    <div className="w-full flex flex-col gap-3 select-none">
      {/* ========================================================================= */}
      {/* 1. LARGE PRIMARY PRODUCT STAGE (55–58% Desktop Width Footprint)            */}
      {/* ========================================================================= */}
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full bg-[#FAF7F2] border border-[#E6E0D6] rounded-2xl p-4 sm:p-8 lg:p-10 flex flex-col items-center justify-between min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] overflow-hidden shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C8102E] group"
        aria-label={`${product.name} Image Gallery. Slide ${activeIndex + 1} of ${images.length}`}
        role="region"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D4A843]/15 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#C8102E]/10 blur-3xl" />
        </div>

        {/* Top Assurance & Tag Row */}
        <div className="w-full flex items-center justify-between text-xs text-[#3C1518]/70 z-10 border-b border-[#E6E0D6]/70 pb-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E6E0D6] shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2B6E2A]" />
            <span className="font-mono font-bold text-[10px] tracking-wider uppercase text-[#2B6E2A]">
              {isRTL ? 'محصول هندي أصيل' : '100% Authentic Indian Harvest'}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-[#6B4226]">
            <span>{currentImage.label}</span>
            <span className="opacity-40">•</span>
            <span>
              {activeIndex + 1}/{images.length}
            </span>
          </div>
        </div>

        {/* Main Stage Image Container (Preserves Aspect Ratio, No Cropping) */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="relative w-full flex-1 flex items-center justify-center my-3 sm:my-5 z-10 cursor-zoom-in"
          title={isRTL ? 'انقر لتكبير الصورة' : 'Click to expand image'}
        >
          {currentImage.type === 'botanical' ? (
            <div className="w-full max-w-[320px] sm:max-w-[380px] p-4 flex flex-col items-center justify-center text-center">
              <img
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt}
                style={{ mixBlendMode: 'multiply' }}
                className="max-h-[280px] sm:max-h-[340px] w-auto max-w-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-103"
                loading="eager"
              />
              <span className="text-xs font-mono font-semibold text-[#6B4226] uppercase tracking-wider mt-3">
                {product.origin || 'Generational Heritage Belts'}
              </span>
            </div>
          ) : (
            <img
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt}
              className={`w-auto max-w-full object-contain filter select-none transition-all duration-300 group-hover:scale-102 ${
                currentImage.type === 'packaging'
                  ? 'max-h-[340px] sm:max-h-[400px] lg:max-h-[440px] drop-shadow-lg'
                  : 'max-h-[320px] sm:max-h-[380px] lg:max-h-[420px] rounded-xl shadow-md border border-[#E6E0D6]'
              }`}
              loading="eager"
            />
          )}

          {/* Zoom Indicator Icon */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="absolute bottom-2 end-2 p-2 rounded-full bg-white/80 hover:bg-white text-[#3C1518] hover:text-[#C8102E] border border-[#E6E0D6] shadow-2xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            aria-label={isRTL ? 'تكبير الصورة' : 'Zoom image'}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Previous & Next Floating Stage Controls */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute start-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#3C1518] hover:text-[#C8102E] border border-[#E6E0D6] shadow-sm flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer z-20"
              aria-label={isRTL ? 'الصورة التالية' : 'Previous image'}
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute end-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#3C1518] hover:text-[#C8102E] border border-[#E6E0D6] shadow-sm flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer z-20"
              aria-label={isRTL ? 'الصورة السابقة' : 'Next image'}
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </>
        )}

        {/* Bottom Stage Spec Footer */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#3C1518]/65 z-10 border-t border-[#E6E0D6]/70 pt-2.5">
          <span>{product.weight} • Multi-Barrier Foil</span>
          <span className="font-arabic text-xs text-[#3C1518]/80 font-medium">
            {product.arabicName}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ACCESSIBLE THUMBNAIL STRIP (Underneath Main Stage)                     */}
      {/* ========================================================================= */}
      {images.length > 1 && (
        <div
          className="grid grid-cols-5 gap-2 sm:gap-3 px-1"
          role="tablist"
          aria-label="Product image thumbnails"
        >
          {images.map((img, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={img.src + idx}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={`View ${img.label}`}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-square rounded-xl p-1.5 flex items-center justify-center transition-all cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'bg-white border-2 border-[#C8102E] shadow-sm scale-102 ring-2 ring-[#C8102E]/20'
                    : 'bg-[#FAF7F2] border border-[#E6E0D6] hover:bg-white hover:border-[#D4A843]/60 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  style={img.type === 'botanical' ? { mixBlendMode: 'multiply' } : undefined}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                {isSelected && (
                  <span className="absolute bottom-0 inset-x-0 h-1 bg-[#C8102E]" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MOBILE PAGINATION DOTS                                                 */}
      {/* ========================================================================= */}
      {images.length > 1 && (
        <div className="flex sm:hidden items-center justify-center gap-1.5 py-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'w-6 bg-[#C8102E]'
                  : 'w-1.5 bg-[#3C1518]/25 hover:bg-[#3C1518]/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ACCESSIBLE LIGHTBOX MODAL                                              */}
      {/* ========================================================================= */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentImage.alt}
          className="fixed inset-0 z-50 bg-[#3C1518]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full bg-[#FAF7F2] rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center shadow-2xl border border-[#E6E0D6]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white border border-[#E6E0D6] text-[#3C1518] hover:text-[#C8102E] flex items-center justify-center shadow-xs cursor-pointer"
              aria-label={isRTL ? 'إغلاق' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Main Image */}
            <div className="max-h-[65vh] w-full flex items-center justify-center my-4">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                style={currentImage.type === 'botanical' ? { mixBlendMode: 'multiply' } : undefined}
                className="max-h-[65vh] max-w-full object-contain"
              />
            </div>

            {/* Caption */}
            <div className="text-center">
              <span className="font-display font-bold text-lg text-[#3C1518] block">
                {product.name}
              </span>
              <span className="text-xs font-mono text-[#6B4226] mt-0.5 block">
                {currentImage.label} • {product.weight}
              </span>
            </div>

            {/* Lightbox Controls */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-md bg-white border border-[#E6E0D6] text-xs font-mono font-bold text-[#3C1518] hover:text-[#C8102E] cursor-pointer"
                >
                  {isRTL ? 'التالي →' : '← Previous'}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 rounded-md bg-white border border-[#E6E0D6] text-xs font-mono font-bold text-[#3C1518] hover:text-[#C8102E] cursor-pointer"
                >
                  {isRTL ? '← السابق' : 'Next →'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
