import React from 'react';
import { Sprout, Award, Flame, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HomeBenefitStrip: React.FC = () => {
  const { isRTL } = useLanguage();

  const benefits = [
    {
      id: 'single-origin',
      title: isRTL ? 'أحادي المنشأ' : 'SINGLE ORIGIN',
      subtitle: isRTL ? 'أقاليم زراعية هندية معتمدة ومزارع متوارثة' : 'Verified Indian micro-regions & generational farming belts',
      icon: Sprout,
      color: '#5A7247', // Coriander Green
    },
    {
      id: 'farm-sourced',
      title: isRTL ? 'مباشرة من المزارع' : 'FARM SOURCED',
      subtitle: isRTL ? 'شراكات مباشرة 100% مع المزارعين بدون وسطاء' : '100% direct partnerships with growers; middlemen bypassed',
      icon: Award,
      color: '#D4A843', // Spice Gold
    },
    {
      id: 'fresh-harvest',
      title: isRTL ? 'حصاد طازج' : 'FRESH HARVEST',
      subtitle: isRTL ? 'محصول الموسم الحالي، مطحون على البارد للحفاظ على الأريج' : 'Current crop cycle, cold-milled & nitrogen-flushed for aroma',
      icon: Flame,
      color: '#E8922F', // Saffron
    },
    {
      id: 'unadulterated',
      title: isRTL ? 'نقي وغير مغشوش' : 'UNADULTERATED',
      subtitle: isRTL ? 'بدون أي إضافات أو ملونات صناعية، حبوب نقية 100%' : 'Zero fillers, zero artificial dyes, 100% pure staples',
      icon: ShieldCheck,
      color: '#F5C342', // Turmeric
    },
  ];

  return (
    <section
      className="w-full bg-[#3C1518] text-[#FDF6EC] border-y-2 border-[#D4A843]/30 py-8 sm:py-9 px-4 sm:px-6 lg:px-12 select-none relative overflow-hidden"
      aria-label="MAGIC Standards Strip"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Continuous editorial layout without boxed containers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:divide-x lg:divide-[#D4A843]/20 lg:rtl:divide-x-reverse">
          {benefits.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-start gap-3.5 ${
                  idx !== 0 ? 'lg:ps-6' : ''
                }`}
              >
                <IconComponent className="w-5 h-5 text-[#D4A843] shrink-0 stroke-[2] mt-0.5" />
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-[#FDF6EC] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#FDF6EC]/80 leading-relaxed font-sans mt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
