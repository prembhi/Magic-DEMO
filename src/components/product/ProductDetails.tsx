import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, ShieldCheck, Truck, Package, Clock } from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { getProductSpecDetails } from '../../data/productDetailsData';
import { useLanguage } from '../../context/LanguageContext';

interface ProductDetailsProps {
  product: ShopProduct;
}

type SectionKey = 'ingredients' | 'specifications' | 'storage' | 'shipping';

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { isRTL } = useLanguage();
  const details = getProductSpecDetails(product.id);
  const [openSection, setOpenSection] = useState<SectionKey | null>('ingredients');

  const toggleSection = (section: SectionKey) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section
      className="w-full py-10 sm:py-14 border-t border-[#3C1518]/15 select-none"
      aria-labelledby="product-details-heading"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#C8102E] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 fill-[#C8102E]" />
            <span>{isRTL ? 'البيانات والمواصفات الكاملة' : 'TRANSPARENCY & DATA'}</span>
          </div>
          <h2
            id="product-details-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-[#3C1518] tracking-tight"
          >
            {isRTL ? 'تفاصيل المنتج والشفافية الكاملة.' : 'Product Details & Transparency.'}
          </h2>
        </div>

        {/* Clean Accordion List */}
        <div className="border border-[#3C1518]/15 rounded-2xl bg-white divide-y divide-[#3C1518]/10 shadow-2xs overflow-hidden">
          {/* SECTION 1: INGREDIENTS */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('ingredients')}
              className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-start cursor-pointer hover:bg-[#FAF7F2]/50 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C8102E]"
              aria-expanded={openSection === 'ingredients'}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                <span className="text-sm sm:text-base font-display font-bold text-[#3C1518]">
                  {isRTL ? 'المكونات وضمان النقاء' : 'Ingredients & Purity Assurance'}
                </span>
              </div>
              {openSection === 'ingredients' ? (
                <ChevronUp className="w-4 h-4 text-[#3C1518]/60" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#3C1518]/60" />
              )}
            </button>

            {openSection === 'ingredients' && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed border-t border-[#3C1518]/10 bg-[#FAF7F2]/30 space-y-3 animate-in fade-in duration-200">
                <p className="font-semibold text-[#3C1518]">
                  {details.ingredients}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-[#3C1518]/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#2B6E2A] font-bold">✓</span>
                    <span>{isRTL ? 'محصول أحادي المنشأ 100% طبيعي' : '100% Single-origin natural agricultural staple'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#2B6E2A] font-bold">✓</span>
                    <span>{isRTL ? 'خالٍ من الملونات أو الزيوت الكيميائية للتلميع' : 'No artificial food coloring or synthetic polishing oils'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#2B6E2A] font-bold">✓</span>
                    <span>{isRTL ? 'نقاء فرز بصري ليزري الدرجة الأولى' : 'Optical sorting level Grade 1 purity'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#2B6E2A] font-bold">✓</span>
                    <span>{isRTL ? 'خالٍ من الغلوتين والكوليسترول طبيعياً' : 'Naturally high in plant protein and dietary fiber'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: SPECIFICATIONS */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('specifications')}
              className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-start cursor-pointer hover:bg-[#FAF7F2]/50 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C8102E]"
              aria-expanded={openSection === 'specifications'}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#D4A843]" />
                <span className="text-sm sm:text-base font-display font-bold text-[#3C1518]">
                  {isRTL ? 'مواصفات المحصول والمنشأ الجغرافي' : 'Product Specifications & Origin Terroir'}
                </span>
              </div>
              {openSection === 'specifications' ? (
                <ChevronUp className="w-4 h-4 text-[#3C1518]/60" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#3C1518]/60" />
              )}
            </button>

            {openSection === 'specifications' && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed border-t border-[#3C1518]/10 bg-[#FAF7F2]/30 space-y-3 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-[#3C1518]/10">
                    <span className="text-[11px] font-sans text-[#6B4226] uppercase font-bold block mb-0.5">
                      {isRTL ? 'الإقليم الزراعي:' : 'Agricultural Origin:'}
                    </span>
                    <span className="font-semibold text-[#3C1518] text-xs sm:text-sm">
                      {details.origin}
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#3C1518]/10">
                    <span className="text-[11px] font-sans text-[#6B4226] uppercase font-bold block mb-0.5">
                      {isRTL ? 'طريقة المعالجة:' : 'Processing Method:'}
                    </span>
                    <span className="font-semibold text-[#3C1518] text-xs sm:text-sm">
                      {details.processing}
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#3C1518]/10">
                    <span className="text-[11px] font-sans text-[#6B4226] uppercase font-bold block mb-0.5">
                      {isRTL ? 'نوع التغليف:' : 'Packaging Type:'}
                    </span>
                    <span className="font-semibold text-[#3C1518] text-xs sm:text-sm">
                      {isRTL ? 'كيس محكم متعدد الطبقات معبأ بالنيتروجين' : 'Nitrogen-Flushed High-Barrier Foil Pouch'}
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#3C1518]/10">
                    <span className="text-[11px] font-sans text-[#6B4226] uppercase font-bold block mb-0.5">
                      {isRTL ? 'الوزن الصافي:' : 'Net Weight:'}
                    </span>
                    <span className="font-semibold text-[#3C1518] text-xs sm:text-sm">
                      {product.weight}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: STORAGE */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('storage')}
              className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-start cursor-pointer hover:bg-[#FAF7F2]/50 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C8102E]"
              aria-expanded={openSection === 'storage'}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#5A7247]" />
                <span className="text-sm sm:text-base font-display font-bold text-[#3C1518]">
                  {isRTL ? 'إرشادات الحفظ ومدة الصلاحية' : 'Storage & Freshness Shelf Life'}
                </span>
              </div>
              {openSection === 'storage' ? (
                <ChevronUp className="w-4 h-4 text-[#3C1518]/60" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#3C1518]/60" />
              )}
            </button>

            {openSection === 'storage' && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed border-t border-[#3C1518]/10 bg-[#FAF7F2]/30 space-y-3 animate-in fade-in duration-200">
                <p className="font-semibold text-[#3C1518]">
                  {details.storage}
                </p>
                <div className="p-3 bg-white rounded-lg border border-[#3C1518]/10 flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#6B4226] shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-[#3C1518]">
                      {isRTL ? 'مدة الصلاحية: ' : 'Shelf Life: '}
                    </span>
                    <span>{details.shelfLife}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 4: SHIPPING & DELIVERY */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('shipping')}
              className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-start cursor-pointer hover:bg-[#FAF7F2]/50 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C8102E]"
              aria-expanded={openSection === 'shipping'}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#2B6E2A]" />
                <span className="text-sm sm:text-base font-display font-bold text-[#3C1518]">
                  {isRTL ? 'الشحن والتوصيل في دولة الإمارات' : 'UAE Shipping & Express Dispatch'}
                </span>
              </div>
              {openSection === 'shipping' ? (
                <ChevronUp className="w-4 h-4 text-[#3C1518]/60" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#3C1518]/60" />
              )}
            </button>

            {openSection === 'shipping' && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed border-t border-[#3C1518]/10 bg-[#FAF7F2]/30 space-y-3 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-[#3C1518]/10 flex items-start gap-2.5">
                    <Truck className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#3C1518] block">
                        {isRTL ? 'توصيل مجاني للطلبات فوق 50 درهم' : 'Free UAE Delivery on Orders > AED 50'}
                      </span>
                      <span className="text-[11px] text-[#3C1518]/65">
                        {isRTL ? 'رسوم ثابتة 10 دراهم للطلبات الأقل' : 'AED 10 flat rate for smaller pantry orders'}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#3C1518]/10 flex items-start gap-2.5">
                    <Package className="w-4 h-4 text-[#2B6E2A] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#3C1518] block">
                        {isRTL ? 'توصيل سريع خلال 30–45 دقيقة' : 'Express Delivery in 30–45 Min'}
                      </span>
                      <span className="text-[11px] text-[#3C1518]/65">
                        {isRTL ? 'متاح في دبي وأبوظبي والشارقة' : 'Available across Dubai, Abu Dhabi & Sharjah'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
