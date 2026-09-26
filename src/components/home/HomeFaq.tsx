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
          q: 'أين تُزرع محاصيل وتوابل ماجيك؟',
          a: 'تُجلب كافة محاصيل ماجيك مباشرة من مزارع أسرية موثوقة في أشهر الأقاليم الزراعية بالهند — بما في ذلك عدس التور من غولبارغا، والكركم من سالم، والكمون من أونجا، والعدس الأحمر من مادهيا براديش.',
        },
        {
          q: 'كم تستغرق مدة التوصيل داخل دبي ودولة الإمارات؟',
          a: 'نوفر خدمة التوصيل في اليوم التالي في دبي وأبوظبي والشارقة للطلبات المسجلة قبل الساعة 4:00 مساءً. وتستغرق باقي الإمارات (عجمان، رأس الخيمة، أم القيوين، الفجيرة) يومي عمل. التوصيل مجاني لكافة الطلبات فوق 50 درهم إماراتي.',
        },
        {
          q: 'هل منتجات ماجيك غير مصقولة وخالية من الإضافات؟',
          a: 'نعم، بنسبة 100%. يتم فرز البقوليات بعدسات الليزر الدقيقة لضمان النقاء مع انعدام تام للألوان الصناعية أو زيوت الصقل أو المعالجات المائية. توابلنا المطحونة أحادية المكون وخالية تماماً من الحشوات.',
        },
        {
          q: 'كيف يعمل نظام الاشتراك والتوفير الدوري؟',
          a: 'يمكنك تحديد دورة التوصيل المفضلة (كل 30 أو 14 أو 7 أيام) لأي منتج، وتوفير 10% على كل شحنة. يمكنك إيقاف الاشتراك أو تخطي شحنة أو إلغاء التكرار في أي وقت بسهولة وبدون أي التزام من حسابك.',
        },
        {
          q: 'كيف يُفضل حفظ توابل وبقوليات ماجيك؟',
          a: 'صُممت أكياسنا بطبقات رقائق حاجبة وسحاب إغلاق محكم لحبس الزيوت العطرية ومنع الرطوبة. احفظها في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة، ولا حاجة لنقلها لبرطمانات زجاجية.',
        },
      ]
    : [
        {
          q: 'Where are MAGIC spices and pulses grown?',
          a: 'All MAGIC crops are sourced from verified generational farming communities in premier Indian agricultural belts — including Toor Dal from Gulbarga, Haldi from Salem, Cumin from Unjha, and Masoor from Madhya Pradesh.',
        },
        {
          q: 'How fast is delivery across Dubai and the UAE?',
          a: 'We offer Next-Day Delivery across Dubai, Abu Dhabi, and Sharjah for orders placed before 4:00 PM. Deliveries to Ajman, RAK, UAQ, and Fujairah take 2 business days. Free UAE shipping applies on all orders above AED 50.',
        },
        {
          q: 'Are MAGIC products unpolished and free of additives?',
          a: 'Yes, 100%. Our whole pulses are optically laser-sorted for purity with zero artificial food dyes, polishing oils, or water treatments. Our ground spices contain 100% single-ingredient harvest with no fillers.',
        },
        {
          q: 'How does the Subscribe & Save delivery work?',
          a: 'You can choose your preferred delivery cadence (every 30, 14, or 7 days) on any staple. You save 10% on every shipment, and you can pause, skip, reschedule, or cancel anytime with zero commitments directly from your account.',
        },
        {
          q: 'How should I store my MAGIC spices and dals?',
          a: 'Our pouches are multi-layered foil barriers with airtight resealable zippers. Store them in a cool, dry pantry away from direct sunlight. There is no need to transfer them into separate jars unless you prefer.',
        },
      ];

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#FAF5EE] text-[#3C1518] py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#3C1518]/12 select-none relative"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-16 items-start">
          
          {/* LEFT: EDITORIAL INTRO & RESTRAINED BOTANICAL BEE MOTIF */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E] mb-2.5">
                {isRTL ? 'الأسئلة الشائعة' : 'FREQUENTLY ASKED QUESTIONS'}
              </p>
              <h2
                id="faq-heading"
                className="font-display font-black text-2xl sm:text-4xl lg:text-[2.6rem] text-[#3C1518] tracking-tight leading-[1.1] mb-3"
              >
                {isRTL ? (
                  <>
                    كل ما تود
                    <br />
                    معرفته عن ماجيك.
                  </>
                ) : (
                  <>
                    EVERYTHING YOU
                    <br />
                    NEED TO KNOW.
                  </>
                )}
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-[#3C1518]/85 leading-relaxed font-sans max-w-md mb-5 sm:mb-6">
                {isRTL
                  ? 'هل ترغب بمعرفة المزيد عن شراكاتنا مع المزارعين، أو سرعة التوصيل في الإمارات، أو كيفية الحفظ؟ إليك إجابات وافية عن استفساراتكم.'
                  : 'Curious about our farm partnerships, UAE delivery speeds, or pantry storage? Here are answers to common questions about MAGIC products.'}
              </p>
            </div>

            {/* Small Dedicated Pantry Spice Bowl Illustration */}
            <div className="flex items-center gap-3 pt-1">
              <div className="w-9 sm:w-10 opacity-90 shrink-0">
                <img
                  src={MAGIC_ASSETS.illustrations.brassBowl}
                  alt="Hand-drawn brass spice bowl illustration"
                  style={{ mixBlendMode: 'multiply' }}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-mono font-medium text-[#6B4226]">
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
                      className="w-full py-3.5 sm:py-4 text-start flex items-center justify-between gap-4 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] rounded-xs"
                    >
                      <span
                        className={`font-display font-bold text-base sm:text-lg transition-colors leading-snug ${
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
                      <div className="pb-4 sm:pb-5 pt-0.5 animate-in fade-in duration-200">
                        <p className="text-xs sm:text-sm text-[#3C1518]/85 leading-relaxed font-sans">
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
