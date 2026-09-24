import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, Truck, RotateCcw, Eye } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export type LegalDocType = 'privacy' | 'terms' | 'shipping' | 'returns' | 'accessibility';

interface LegalModalProps {
  isOpen: boolean;
  docType: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, docType, onClose }) => {
  const { isRTL } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const docs = {
    privacy: {
      title: 'Privacy Policy',
      icon: ShieldCheck,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#3C1518]/85 leading-relaxed">
          <div className="p-3.5 bg-[#FAF5EE] rounded-lg border border-[#D4A843]/30 text-xs font-mono text-[#3C1518]">
            <strong>STATUS:</strong> [LEGAL CONTENT REQUIRED]
          </div>
          <p>
            MAGIC Foods UAE respects your privacy and is committed to protecting your personal data in accordance with applicable UAE Data Protection regulations.
          </p>
          <h4 className="font-display font-bold text-base text-[#3C1518] pt-2">1. Data Controller & Entity</h4>
          <p>
            [LEGAL CONTENT REQUIRED: Registered corporate entity name, registered address in Dubai/UAE, trade license number, and designated Data Protection Officer contact details].
          </p>
          <h4 className="font-display font-bold text-base text-[#3C1518] pt-2">2. Information We Collect</h4>
          <p>
            [LEGAL CONTENT REQUIRED: Specific categories of personal information collected through inquiries, orders, and newsletter signups, such as name, email, shipping address, and phone number].
          </p>
          <h4 className="font-display font-bold text-base text-[#3C1518] pt-2">3. Purpose of Processing & Retention</h4>
          <p>
            [LEGAL CONTENT REQUIRED: Itemized processing purposes, legal bases, third-party payment/courier processors, and defined retention periods].
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Service',
      icon: FileText,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#3C1518]/85 leading-relaxed">
          <div className="p-3.5 bg-[#FAF5EE] rounded-lg border border-[#D4A843]/30 text-xs font-mono text-[#3C1518]">
            <strong>STATUS:</strong> [LEGAL CONTENT REQUIRED]
          </div>
          <p>
            These terms govern the use of the MAGIC Foods UAE digital catalogue, order reservations, and services within the United Arab Emirates.
          </p>
          <h4 className="font-display font-bold text-base text-[#3C1518] pt-2">1. Governing Law & Jurisdiction</h4>
          <p>
            [LEGAL CONTENT REQUIRED: Explicit jurisdiction clause stating laws of the United Arab Emirates and dispute resolution through Dubai Courts].
          </p>
          <h4 className="font-display font-bold text-base text-[#3C1518] pt-2">2. Pricing, Orders & Stock</h4>
          <p>
            Prices are displayed in United Arab Emirates Dirham (AED) inclusive of applicable taxes. Order fulfillment is subject to harvest availability.
          </p>
        </div>
      ),
    },
    shipping: {
      title: 'UAE Shipping & Delivery Policy',
      icon: Truck,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#3C1518]/85 leading-relaxed">
          <div className="p-3.5 bg-[#FAF5EE] rounded-lg border border-[#D4A843]/30 text-xs font-mono text-[#3C1518]">
            <strong>STATUS:</strong> [LEGAL CONTENT REQUIRED]
          </div>
          <h4 className="font-display font-bold text-base text-[#3C1518]">1. Coverage</h4>
          <p>
            Direct delivery service across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain.
          </p>
          <h4 className="font-display font-bold text-base text-[#3C1518] pt-2">2. Delivery Timelines & Partners</h4>
          <p>
            [LEGAL CONTENT REQUIRED: Specific contracted logistics partners, cut-off times for next-day Dubai delivery, and regional delivery schedules].
          </p>
        </div>
      ),
    },
    returns: {
      title: 'Return & Refund Policy',
      icon: RotateCcw,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#3C1518]/85 leading-relaxed">
          <div className="p-3.5 bg-[#FAF5EE] rounded-lg border border-[#D4A843]/30 text-xs font-mono text-[#3C1518]">
            <strong>STATUS:</strong> [LEGAL CONTENT REQUIRED]
          </div>
          <p>
            As our products are food staples and unadulterated spices, hygiene and food safety guidelines apply to all dispatch operations.
          </p>
          <h4 className="font-display font-bold text-base text-[#3C1518] pt-2">1. Damaged or Incorrect Items</h4>
          <p>
            [LEGAL CONTENT REQUIRED: Claims window for damaged or broken pouch seals upon delivery, photo inspection protocol, and replacement/refund method].
          </p>
        </div>
      ),
    },
    accessibility: {
      title: 'Accessibility Statement',
      icon: Eye,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#3C1518]/85 leading-relaxed">
          <p>
            MAGIC Foods UAE is committed to ensuring digital accessibility for people of all abilities. We apply the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA conformance standards across our user experience.
          </p>
          <h4 className="font-display font-bold text-base text-[#3C1518] pt-2">Measures Undertaken</h4>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#3C1518]/80">
            <li>Bypass blocks (Skip to main content) on all pages</li>
            <li>High-contrast visible focus indicators across all interactive elements</li>
            <li>Semantic HTML with ARIA roles and labels</li>
            <li>Full keyboard operability without traps</li>
            <li>Universal prefers-reduced-motion animation suppression</li>
            <li>Bilingual English and Arabic RTL accessibility</li>
          </ul>
          <h4 className="font-display font-bold text-base text-[#3C1518] pt-2">Feedback & Contact</h4>
          <p>
            If you encounter accessibility barriers, please contact our team at{' '}
            <a href="mailto:accessibility@magicspices.com" className="text-[#C8102E] underline">
              accessibility@magicspices.com
            </a>.
          </p>
        </div>
      ),
    },
  };

  const currentDoc = docs[docType] || docs.privacy;
  const Icon = currentDoc.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#FDF6EC] border border-[#3C1518]/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-start"
      >
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 border-b border-[#3C1518]/10 flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] border border-[#D4A843]/30 text-[#C8102E] flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 id="legal-modal-title" className="font-display font-bold text-lg sm:text-xl text-[#3C1518]">
                {currentDoc.title}
              </h3>
              <span className="font-mono text-[10px] text-[#3C1518]/60 uppercase tracking-wider">
                MAGIC Foods UAE Documentation
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal document dialog"
            className="w-10 h-10 rounded-full border border-[#3C1518]/20 hover:bg-[#3C1518] hover:text-white text-[#3C1518] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {currentDoc.content}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 sm:p-5 border-t border-[#3C1518]/10 bg-white/70 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#3C1518] hover:bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer min-h-[44px]"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
