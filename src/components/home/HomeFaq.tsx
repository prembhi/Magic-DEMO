import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MAGIC_ASSETS } from '../../constants/assets';
import { useLanguage } from '../../context/LanguageContext';

export const HomeFaq: React.FC = () => {
  const { isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = isRTL
    ? [
        {
          q: 'هل منتجات ماجيك غير مصقولة وخالية من الإضافات؟',
          a: 'نعم، بنسبة 100%. يتم فرز البقوليات بعدسات الليزر الدقيقة لضمان النقاء مع انعدام تام للألوان الصناعية أو زيوت الصقل. توابلنا أحادية المكون وخالية تماماً من الحشوات.',
        },
        {
          q: 'أين تُزرع محاصيل وتوابل ماجيك؟',
          a: 'تُجلب كافة المحاصيل مباشرة من مزارع أسرية موثوقة في أشهر الأقاليم الزراعية بالهند — بما في ذلك التور من غولبارغا، والكركم من سالم، والكمون من أونجا، والعدس الأحمر من مادهيا براديش.',
        },
        {
          q: 'كم تستغرق مدة التوصيل داخل دبي ودولة الإمارات؟',
          a: 'توصيل في اليوم التالي في دبي وأبوظبي والشارقة للطلبات قبل الساعة 4:00 مساءً (يومان لباقي الإمارات). التوصيل مجاني للطلبات فوق 50 درهم إماراتي.',
        },
        {
          q: 'كيف يُفضل حفظ توابل وبقوليات ماجيك؟',
          a: 'تحفظ أكياسنا متعددة الطبقات المزودة بسحاب محكم الزيوت العطرية والنقاء. احفظها في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة.',
        },
      ]
    : [
        {
          q: 'Are MAGIC products unpolished and free of additives?',
          a: 'Yes, 100%. Our whole pulses are laser-sorted with zero artificial food dyes, polishing oils, or water treatments. Spices contain pure single-ingredient harvest with zero fillers.',
        },
        {
          q: 'Where are MAGIC spices and pulses grown?',
          a: 'All crops are sourced directly from verified family farms in premier Indian belts: Toor Dal from Gulbarga, Haldi from Salem, Cumin from Unjha, and Masoor from Madhya Pradesh.',
        },
        {
          q: 'How fast is delivery across Dubai and the UAE?',
          a: 'Next-Day Delivery across Dubai, Abu Dhabi, and Sharjah for orders placed before 4:00 PM (2 business days for other Emirates). Free UAE shipping on orders above AED 50.',
        },
        {
          q: 'How should I store my MAGIC spices and pulses?',
          a: 'Our multi-layered foil pouches with airtight resealable zippers protect aroma and freshness. Store them in a cool, dry pantry away from direct sunlight.',
        },
      ];

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#FAF5EE] text-[#3C1518] py-12 sm:py-16 lg:py-20 px-5 sm:px-6 lg:px-12 border-b border-[#3C1518]/12 select-none relative"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-16 items-start">
          
          {/* LEFT: EDITORIAL INTRO & RESTRAINED BOTANICAL MOTIF */}
          <div className="lg:col-span-5 flex flex-col justify-between w-full">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E] mb-2">
                {isRTL ? 'الأسئلة الشائعة' : 'FREQUENTLY ASKED QUESTIONS'}
              </p>
              <h2
                id="faq-heading"
                className="font-display font-black text-[1.75rem] xs:text-3xl sm:text-5xl lg:text-7xl text-[#3C1518] tracking-tight leading-[1.04] sm:leading-[1.08] mb-4"
              >
                {isRTL ? 'معلومات تهمك.' : 'GOOD TO KNOW.'}
              </h2>
            </div>

            {/* Small Dedicated Pantry Spice Bowl Illustration */}
            <div className="flex items-center gap-3 pt-1 sm:pt-2 mb-4 lg:mb-0">
              <div className="w-10 sm:w-11 opacity-90 shrink-0">
                <img
                  src={MAGIC_ASSETS.illustrations.brassBowl}
                  alt="Hand-drawn brass spice bowl illustration"
                  style={{ mixBlendMode: 'multiply' }}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-sans font-medium text-[#6B4226]">
                {isRTL
                  ? 'أصل أحادي · مغلف بالنيتروجين الطازج · نقي 100%'
                  : 'Single-Origin · Nitrogen Flushed · Unadulterated'}
              </span>
            </div>
          </div>

          {/* RIGHT: REFINED EDITORIAL ACCORDION LIST */}
          <div className="lg:col-span-7">
            <div className="border-t border-b border-[#3C1518]/20 divide-y divide-[#3C1518]/15">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="transition-colors duration-200">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full py-5 sm:py-7 min-h-[60px] text-start flex items-center justify-between gap-4 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] rounded-xs"
                    >
                      <span
                        className={`font-display font-bold text-lg sm:text-xl lg:text-2xl transition-colors leading-snug ${
                          isOpen ? 'text-[#C8102E]' : 'text-[#3C1518] group-hover:text-[#C8102E]'
                        }`}
                      >
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? 'rotate-180 text-[#C8102E]'
                            : 'text-[#3C1518]/50 group-hover:text-[#C8102E]'
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="pb-5 sm:pb-6 pt-0.5 animate-in fade-in duration-200">
                        <p className="text-sm sm:text-base text-[#3C1518]/85 leading-relaxed font-sans">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
