import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';

export const ProductNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3500);
  };

  return (
    <section className="w-full py-16 sm:py-20 border-t border-[#3C1518]/15 bg-[#FAF7F2] select-none" aria-labelledby="newsletter-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[#E6E0D6] text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8102E] mb-3">
          <Sparkles className="w-3 h-3 text-[#D4A843]" />
          <span>Kitchen Dispatch</span>
        </div>

        <h2
          id="newsletter-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#3C1518] mb-2"
        >
          Join The MAGIC Kitchen
        </h2>

        <p className="text-xs sm:text-sm text-[#3C1518]/70 max-w-md mx-auto mb-6 leading-relaxed font-sans">
          Receive seasonal harvest notes, heirloom pulse cooking guides, and regional spice pairing dispatches.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-xs border border-[#2B6E2A] text-[#2B6E2A] text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Welcome to the table. Your dispatch subscription is active.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full sm:flex-1 h-11 px-4 bg-white border border-[#D9D2C7] focus:border-[#C8102E] focus:outline-none rounded-xs text-xs text-[#3C1518] placeholder:text-[#3C1518]/40 shadow-2xs"
            />
            <button
              type="submit"
              className="w-full sm:w-auto h-11 px-6 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs font-bold rounded-xs cursor-pointer transition-colors shadow-2xs flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[10px] text-[#3C1518]/50 mt-3 font-sans">
          No marketing spam. Only thoughtful culinary stories and genuine harvest updates. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};
