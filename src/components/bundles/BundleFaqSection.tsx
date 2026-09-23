import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What are MAGIC bundles?',
    answer:
      'MAGIC bundles are thoughtfully curated collections of authentic Indian pantry staples—including single-origin dals, whole cumin, and pure ground turmeric—grouped together based on culinary routines like everyday dal preparation, fragrant tadka tempering, or whole pantry stocking.',
  },
  {
    id: 'faq-2',
    question: 'Can I buy the products separately?',
    answer:
      'Yes. Every product featured in our bundles is available as an individual item in our online Shop. You can purchase any pulse or spice individually according to your exact kitchen needs.',
  },
  {
    id: 'faq-3',
    question: 'Can I add individual products from a bundle to my cart?',
    answer:
      'Yes. Inside each bundle detail view, every included staple has an individual link to its dedicated Product Page where you can inspect its details and add individual units directly to your sample bag.',
  },
  {
    id: 'faq-4',
    question: 'How are bundle prices calculated?',
    answer:
      'Bundle prices are calculated as the straightforward sum of the verified individual retail prices of each included product in the bundle. There are no hidden fees or extra charges.',
  },
  {
    id: 'faq-5',
    question: 'Which bundle should I start with?',
    answer:
      'If you are starting out or refreshing your pantry, the MAGIC Indian Kitchen Starter (Toor Dal, Jeera, and Haldi) or the comprehensive MAGIC Everyday Pantry kit provides the fundamental pulses and spices needed to make authentic homestyle dal tadka.',
  },
];

export const BundleFaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      className="w-full bg-[#FAF1D6] border-y border-[#E6DFC8] py-16 sm:py-20 my-10"
      aria-labelledby="bundle-faq-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/70 rounded-full border border-[#D4A843]/40 text-[10px] font-mono uppercase tracking-[0.25em] text-[#C8102E] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4A843]" />
            <span>KITCHEN DESK & ASSISTANCE</span>
          </div>

          <h2
            id="bundle-faq-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#3C1518] tracking-tight leading-tight mb-3"
          >
            FREQUENTLY ASKED
            <br />
            QUESTIONS
          </h2>

          <p className="text-xs sm:text-sm text-[#3C1518]/75 font-sans leading-relaxed">
            Everything you need to know about our curated pantry sets and individual products.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {FAQ_ITEMS.map((item) => {
            const isOpen = !!openIds[item.id];

            return (
              <div
                key={item.id}
                className="bg-white border border-[#E6DFC8] rounded-xs transition-all overflow-hidden shadow-2xs hover:border-[#D4A843]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-answer`}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C8102E]"
                >
                  <span className="text-sm sm:text-base font-serif font-bold text-[#3C1518] pr-2">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FAF5EE] border border-[#D4A843]/30 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#C8102E] text-white border-transparent' : 'text-[#3C1518]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`${item.id}-answer`}
                    role="region"
                    className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed font-sans border-t border-[#3C1518]/6"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
