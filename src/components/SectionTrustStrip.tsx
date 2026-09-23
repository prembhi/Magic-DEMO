import React from 'react';

export const SectionTrustStrip: React.FC = () => {
  const benefits = [
    {
      title: '100% Premium Quality',
      subtitle: 'Packaging Grade Standard',
      icon: (
        <svg className="w-5 h-5 text-[#D4A843]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          <circle cx="12" cy="12" r="3" fill="#D4A843" fillOpacity="0.3" />
        </svg>
      ),
    },
    {
      title: 'Authentic Indian Spices',
      subtitle: 'Heritage Sourcing',
      icon: (
        <svg className="w-5 h-5 text-[#D4A843]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
          <path d="M12 7v6l4 2" />
        </svg>
      ),
    },
    {
      title: 'Carefully Selected',
      subtitle: 'Rigorous Sorting',
      icon: (
        <svg className="w-5 h-5 text-[#D4A843]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="5" strokeDasharray="2 2" />
        </svg>
      ),
    },
    {
      title: 'Made for Kitchens Everywhere',
      subtitle: 'Dubai & Global Exports',
      icon: (
        <svg className="w-5 h-5 text-[#D4A843]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="relative w-full bg-[#C8102E] text-white py-5 px-4 sm:px-6 lg:px-8 shadow-inner border-y border-[#9C0A20] z-20 select-none overflow-hidden"
      aria-label="Brand Benefits and Trust"
    >
      {/* Packaging-inspired subtle crimp/stitching accents */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A843]/60 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#3C1518]/30" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3.5 ${
                idx > 0 ? 'pt-3 md:pt-0 md:pl-6' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#3C1518]/35 border border-[#D4A843]/40 flex items-center justify-center shrink-0 shadow-xs">
                {b.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-wide text-[#FDF6EC] leading-tight">
                  {b.title}
                </span>
                <span className="text-[11px] font-medium text-[#FDF6EC]/70 tracking-wider uppercase mt-0.5">
                  {b.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
