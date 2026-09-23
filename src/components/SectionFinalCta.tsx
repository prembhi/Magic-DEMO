import React, { useState } from 'react';
import { ShoppingBag, Send, CheckCircle2, Sparkles, ChefHat } from 'lucide-react';

interface SectionFinalCtaProps {
  onShopClick?: () => void;
}

export const SectionFinalCta: React.FC<SectionFinalCtaProps> = ({
  onShopClick,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <section
      className="relative w-full bg-[#C8102E] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 select-none overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      {/* Top Sweeping Transition Organic Curve */}
      <div className="absolute top-0 inset-x-0 h-12 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="w-full h-full text-[#FDF6EC] fill-current"
        >
          <path d="M0,0 L1440,0 L1440,16 C1080,48 360,48 0,16 Z" />
        </svg>
      </div>

      {/* Atmospheric culinary depth & subtle spice particle glow */}
      <div className="absolute -top-20 left-10 w-96 h-96 rounded-full bg-[#9C0A20] blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 rounded-full bg-[#D4A843]/20 blur-[100px] pointer-events-none" />

      {/* Subtle Background Spice Mandala Orbit */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-10" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#FDF6EC" strokeWidth="0.8" strokeDasharray="2 3" fill="none" />
        <circle cx="50" cy="50" r="35" stroke="#D4A843" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="25" stroke="#FDF6EC" strokeWidth="0.5" strokeDasharray="4 2" fill="none" />
      </svg>

      <div className="relative max-w-5xl mx-auto z-10 text-center">
        {/* Supporting Chef Mascot Badge (A tribute to the iconic chef illustration on the packaging) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3C1518]/40 border border-[#D4A843]/40 text-[#D4A843] text-xs uppercase tracking-[0.25em] font-semibold mb-6">
          <ChefHat className="w-4 h-4 text-[#D4A843]" />
          <span>The Chef's Choice</span>
          <span className="text-white/40">·</span>
          <span className="font-arabic font-normal text-sm text-[#FDF6EC]/90">اختيار الطهاة</span>
        </div>

        {/* Major Headline */}
        <h2
          id="final-cta-heading"
          className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#FDF6EC] tracking-tight leading-tight mb-4"
        >
          BRING MAGIC TO YOUR KITCHEN
        </h2>

        {/* Arabic Supporting Subtitle */}
        <p className="font-arabic font-bold text-xl sm:text-2xl text-[#D4A843] mb-4">
          اجلب السحر إلى مطبخك مع أنقى التوابل الهندية
        </p>

        {/* Supporting Text */}
        <p className="text-sm sm:text-lg text-[#FDF6EC]/85 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
          Discover authentic Indian spices made for kitchens everywhere. Hand-selected pulses, whole aromatics, and stone-milled powders ready for everyday home feasts and professional culinary counters.
        </p>

        {/* Primary Shop Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={onShopClick}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#FDF6EC] hover:bg-white text-[#C8102E] font-display font-black text-sm uppercase tracking-widest rounded-xl shadow-xl hover:shadow-2xl transition-all active:scale-95 border-2 border-[#D4A843] cursor-pointer min-h-[44px]"
            aria-label="Shop all MAGIC spices and dals"
          >
            <ShoppingBag className="w-4 h-4 text-[#C8102E]" />
            <span>SHOP ALL SPICES</span>
            <span className="font-arabic text-sm text-[#3C1518] ml-1">تسوق الآن</span>
          </button>
        </div>

        {/* NEWSLETTER: JOIN THE MAGIC KITCHEN */}
        <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#3C1518]/40 border border-white/20 backdrop-blur-xs text-left">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-bold text-xl text-[#FDF6EC] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4A843]" />
              <span>JOIN THE MAGIC KITCHEN</span>
            </h3>
            <span className="font-arabic text-xs text-[#D4A843]">
              انضم لمطبخ ماجيك
            </span>
          </div>

          <p className="text-xs text-[#FDF6EC]/70 mb-5 leading-relaxed font-normal">
            Subscribe for seasonal harvest updates, authentic regional tadka recipes, and wholesale export announcements.
          </p>

          {isSubscribed ? (
            <div
              role="status"
              className="p-4 rounded-xl bg-white/10 border border-[#D4A843]/60 flex items-center gap-3 text-sm text-[#FDF6EC] font-semibold"
            >
              <CheckCircle2 className="w-5 h-5 text-[#D4A843]" />
              <span>Welcome to the MAGIC culinary circle. Fresh inspiration is on its way.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/95 text-[#3C1518] placeholder-[#3C1518]/50 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#D4A843] min-h-[44px]"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#3C1518] hover:bg-[#200B0D] text-[#FDF6EC] font-bold text-xs uppercase tracking-wider rounded-lg border border-[#D4A843]/50 transition-colors shadow-sm cursor-pointer min-h-[44px]"
              >
                <span>SUBSCRIBE</span>
                <Send className="w-3.5 h-3.5 text-[#D4A843]" />
              </button>
            </form>
          )}

          <div className="mt-3 flex items-center justify-between text-[11px] text-[#FDF6EC]/50">
            <span>No spam. Only pure spice culture.</span>
            <span>Unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};
