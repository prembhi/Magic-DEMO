import React, { useState } from 'react';
import {
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Compass,
  Package,
  Layers,
  Heart,
  ChevronRight,
  ShieldCheck,
  Award,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { ShopHeader } from '../shop/ShopHeader';
import { ShopFooter } from '../shop/ShopFooter';
import { ShopCartDrawer } from '../shop/ShopCartDrawer';
import { useShopCart } from '../../context/ShopCartContext';

interface NewsletterPageProps {
  onNavigateHome: () => void;
  onNavigateShop: (catId?: string) => void;
  onNavigateRecipes: (recipeSlug?: string) => void;
  onNavigateBundles: (bundleSlug?: string) => void;
  onNavigateImpact?: () => void;
  onNavigateNewsletter?: () => void;
  onSelectProduct?: (slug: string) => void;
}

// Authentic Approved Assets
const MAGIC_ASSETS = {
  haldi: '/assets/magic/haldi_clean.png',
  jeera: '/assets/magic/jeera_clean.png',
  toor: '/assets/magic/toor_clean.png',
  masoor: '/assets/magic/masoordal_clean.png',
  logo: '/assets/magic/magic_logo_transparent.png',
};

// Subtle Spice & Botanical Motif Icons for Why Join Blocks
const CuminSeedIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C8102E]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="12" rx="4" ry="9" transform="rotate(35 12 12)" />
    <path d="M9.5 8.5C11 11 13 13 14.5 15.5" strokeDasharray="1 2" />
    <path d="M12 5V3M12 21v-2" opacity="0.6" />
  </svg>
);

const MortarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#D4A843]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 11C4 16.5228 8.47715 21 14 21C18.2 21 21.8 18.2 23 14.5" />
    <path d="M3 10H21" />
    <path d="M17 3L11 12" />
  </svg>
);

const StarAniseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C8102E]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
    <circle cx="12" cy="12" r="3" fill="#C8102E" fillOpacity="0.2" />
  </svg>
);

const SproutTerroirIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#5A7247]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 20h10" />
    <path d="M12 20v-8" />
    <path d="M12 12C12 7 6 6 6 6c0 5 4 6 6 6Z" />
    <path d="M12 9c0-4 5-5 5-5c0 4-3 5-5 5Z" />
  </svg>
);

export const NewsletterPage: React.FC<NewsletterPageProps> = ({
  onNavigateHome,
  onNavigateShop,
  onNavigateRecipes,
  onNavigateBundles,
  onNavigateImpact,
  onNavigateNewsletter,
}) => {
  const { isCartOpen, closeCart } = useShopCart();

  // Hero Email Form State
  const [heroEmail, setHeroEmail] = useState('');
  const [heroStatus, setHeroStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [heroErrorMessage, setHeroErrorMessage] = useState('');

  // Secondary CTA Email Form State
  const [ctaEmail, setCtaEmail] = useState('');
  const [ctaStatus, setCtaStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [ctaErrorMessage, setCtaErrorMessage] = useState('');

  // Interactive Community Preferences State
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([
    'recipes',
    'spice-knowledge',
  ]);

  const togglePreference = (prefId: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(prefId) ? prev.filter((id) => id !== prefId) : [...prev, prefId]
    );
  };

  // Email Validation Utility
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  };

  // Handle Hero Submit
  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroEmail.trim()) {
      setHeroStatus('error');
      setHeroErrorMessage('Please enter your email address.');
      return;
    }
    if (!validateEmail(heroEmail)) {
      setHeroStatus('error');
      setHeroErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    setHeroStatus('loading');
    setHeroErrorMessage('');

    // Simulate clean local submission state without fake network requests
    setTimeout(() => {
      setHeroStatus('success');
    }, 450);
  };

  // Handle CTA Submit
  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctaEmail.trim()) {
      setCtaStatus('error');
      setCtaErrorMessage('Please enter your email address.');
      return;
    }
    if (!validateEmail(ctaEmail)) {
      setCtaStatus('error');
      setCtaErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    setCtaStatus('loading');
    setCtaErrorMessage('');

    setTimeout(() => {
      setCtaStatus('success');
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] text-[#3C1518] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white">
      {/* 1. TOP HEADER WITH REAL LINKS */}
      <ShopHeader
        onNavigateHome={onNavigateHome}
        onNavigateShop={() => onNavigateShop()}
        onNavigateRecipes={() => onNavigateRecipes()}
        onNavigateBundles={() => onNavigateBundles()}
        onNavigateImpact={onNavigateImpact}
        onNavigateNewsletter={onNavigateNewsletter || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
      />

      <main className="flex-1 w-full flex flex-col focus:outline-none" id="main-content" tabIndex={-1}>
        {/* ================================================================ */}
        {/* SECTION 01: NEWSLETTER HERO (50/50 Desktop Split, Stacked Mobile) */}
        {/* ================================================================ */}
        <section
          aria-labelledby="newsletter-hero-heading"
          className="relative w-full border-b border-[#3C1518]/10 bg-gradient-to-b from-[#FDF6EC] via-[#FAF4EA] to-[#FDF6EC] overflow-hidden py-12 sm:py-16 lg:py-24"
        >
          {/* Subtle culinary background texture accent */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#3C1518 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* LEFT: Editorial Copy & Signup Form (approx 50%) */}
              <div className="lg:col-span-6 flex flex-col">
                {/* Small Kicker */}
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                  <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#C8102E]">
                    THE MAGIC KITCHEN LETTER
                  </span>
                </div>

                {/* Large Headline */}
                <h1
                  id="newsletter-hero-heading"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#3C1518] leading-[1.08] mb-4"
                >
                  GET THE MAGIC
                  <br />
                  <span className="text-[#C8102E] italic">IN YOUR INBOX.</span>
                </h1>

                {/* Supporting Headline */}
                <p className="font-display italic text-lg sm:text-xl text-[#3C1518]/90 font-medium mb-4">
                  Recipes. New launches. Kitchen inspiration.
                </p>

                {/* Body Copy */}
                <p className="text-sm sm:text-base text-[#3C1518]/80 leading-relaxed max-w-xl mb-8">
                  A little MAGIC, delivered regularly. Get new recipes, pantry inspiration, product launches and stories from the people and places behind our ingredients.
                </p>

                {/* Functional Email Form */}
                <div className="w-full max-w-md">
                  {heroStatus === 'success' ? (
                    <div
                      role="status"
                      className="bg-white border-2 border-[#5A7247]/30 rounded-xl p-6 shadow-sm flex flex-col gap-2 animate-in fade-in"
                    >
                      <div className="flex items-center gap-2.5 text-[#5A7247] font-bold text-base">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <span>You&apos;re on the list.</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3C1518]/80 leading-normal">
                        Welcome to MAGIC. We&apos;ll see you in your inbox.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setHeroStatus('idle');
                          setHeroEmail('');
                        }}
                        className="self-start text-[11px] font-semibold text-[#C8102E] hover:underline mt-2 cursor-pointer"
                      >
                        Subscribe another address
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleHeroSubmit}
                      noValidate
                      aria-label="Magic Newsletter Hero Signup Form"
                      className="flex flex-col gap-3"
                    >
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <div className="relative flex-1">
                          <label htmlFor="hero-email-input" className="sr-only">
                            Your email address
                          </label>
                          <input
                            id="hero-email-input"
                            type="email"
                            value={heroEmail}
                            onChange={(e) => {
                              setHeroEmail(e.target.value);
                              if (heroStatus === 'error') setHeroStatus('idle');
                            }}
                            placeholder="Your email address"
                            disabled={heroStatus === 'loading'}
                            aria-invalid={heroStatus === 'error'}
                            aria-describedby={heroStatus === 'error' ? 'hero-email-error' : undefined}
                            className={`w-full px-4 py-3.5 text-sm bg-white border ${
                              heroStatus === 'error'
                                ? 'border-[#C8102E] ring-2 ring-[#C8102E]/20'
                                : 'border-[#3C1518]/25 hover:border-[#3C1518]/50 focus:border-[#C8102E]'
                            } text-[#3C1518] placeholder-[#3C1518]/45 rounded-lg focus:outline-hidden transition-all shadow-2xs`}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={heroStatus === 'loading'}
                          className="min-h-[46px] px-6 py-3.5 bg-[#C8102E] hover:bg-[#a60d26] active:bg-[#850a1e] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8102E]"
                        >
                          {heroStatus === 'loading' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>JOINING...</span>
                            </>
                          ) : (
                            <>
                              <span>JOIN THE MAGIC</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Error Message */}
                      {heroStatus === 'error' && (
                        <p
                          id="hero-email-error"
                          role="alert"
                          className="text-xs font-semibold text-[#C8102E] flex items-center gap-1.5 animate-in fade-in"
                        >
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{heroErrorMessage}</span>
                        </p>
                      )}

                      {/* Small Reassurance */}
                      <p className="text-xs text-[#3C1518]/60 mt-1 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D4A843] flex-shrink-0" />
                        <span>No spam. Just good food, useful ideas and a little spice.</span>
                      </p>
                    </form>
                  )}
                </div>
              </div>

              {/* RIGHT: Large Editorial Culinary Composition (approx 50%) */}
              <div className="lg:col-span-6 relative">
                <div className="relative mx-auto max-w-lg lg:max-w-none">
                  {/* Decorative warm aura glow */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[#F5C342]/20 via-[#D4A843]/15 to-[#C8102E]/10 rounded-3xl blur-2xl -z-10" />

                  {/* Editorial Parchment Frame */}
                  <div className="relative bg-[#FAF5EB] border border-[#3C1518]/15 rounded-2xl p-6 sm:p-8 shadow-xl overflow-hidden">
                    {/* Top Editorial Ribbon */}
                    <div className="flex items-center justify-between border-b border-[#3C1518]/10 pb-4 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-xs uppercase tracking-wider text-[#3C1518]">
                          KITCHEN DISPATCH
                        </span>
                        <span className="text-[#3C1518]/30">•</span>
                        <span className="text-[11px] font-semibold text-[#D4A843] uppercase tracking-wider">
                          HARVEST EDITION
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#3C1518]/5 border border-[#3C1518]/10 text-[10px] font-bold tracking-wider uppercase text-[#3C1518]/80">
                        VOL. 01
                      </div>
                    </div>

                    {/* Central Culinary Still Life Layout */}
                    <div className="relative grid grid-cols-2 gap-4 items-center">
                      {/* Left Side: Pure Turmeric Pack & Spice Details */}
                      <div className="relative group bg-white/70 backdrop-blur-xs rounded-xl p-4 border border-[#3C1518]/10 hover:border-[#D4A843]/50 transition-all flex flex-col items-center text-center">
                        <div className="w-full h-44 flex items-center justify-center relative">
                          <img
                            src={MAGIC_ASSETS.haldi}
                            alt="MAGIC Pure Salem Turmeric"
                            className="max-h-40 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                            loading="eager"
                          />
                        </div>
                        <div className="mt-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8102E] bg-[#C8102E]/10 px-2 py-0.5 rounded">
                            Salem, Tamil Nadu
                          </span>
                          <h4 className="font-display font-bold text-sm text-[#3C1518] mt-1.5">
                            Pure Haldi Powder
                          </h4>
                          <p className="text-[11px] text-[#3C1518]/70 mt-0.5">
                            3.8%+ Curcumin • High essential oil
                          </p>
                        </div>
                      </div>

                      {/* Right Side: Whole Cumin & Unpolished Pulses */}
                      <div className="flex flex-col gap-4">
                        <div className="relative group bg-white/70 backdrop-blur-xs rounded-xl p-3 border border-[#3C1518]/10 hover:border-[#C8102E]/40 transition-all flex items-center gap-3">
                          <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                            <img
                              src={MAGIC_ASSETS.jeera}
                              alt="MAGIC Whole Jeera Seeds"
                              className="max-h-14 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                              loading="eager"
                            />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#D4A843]">
                              Rajasthan Terroir
                            </span>
                            <h5 className="font-display font-bold text-xs text-[#3C1518]">
                              Sirohi Whole Cumin
                            </h5>
                            <p className="text-[10px] text-[#3C1518]/70">
                              Sun-dried whole seeds
                            </p>
                          </div>
                        </div>

                        <div className="relative group bg-white/70 backdrop-blur-xs rounded-xl p-3 border border-[#3C1518]/10 hover:border-[#5A7247]/40 transition-all flex items-center gap-3">
                          <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                            <img
                              src={MAGIC_ASSETS.toor}
                              alt="MAGIC Unpolished Toor Dal"
                              className="max-h-14 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                              loading="eager"
                            />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#5A7247]">
                              Saurashtra Origin
                            </span>
                            <h5 className="font-display font-bold text-xs text-[#3C1518]">
                              Unpolished Toor Dal
                            </h5>
                            <p className="text-[10px] text-[#3C1518]/70">
                              Natural protein, zero oil polish
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Editorial Culinary Notes Card */}
                    <div className="mt-5 pt-4 border-t border-[#3C1518]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#3C1518]/80">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D4A843] flex-shrink-0" />
                        <span className="font-medium italic">
                          &ldquo;Every dispatch contains 1 tested recipe &amp; 1 pantry technique.&rdquo;
                        </span>
                      </div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#3C1518]/50 self-end sm:self-auto">
                        EST. 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 02: WHY JOIN (Editorial Benefits)                       */}
        {/* ================================================================ */}
        <section
          aria-labelledby="why-join-heading"
          className="w-full bg-[#FAF5EB] py-16 sm:py-20 lg:py-24 border-b border-[#3C1518]/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#C8102E] block mb-2">
                INSIDE THE LETTER
              </span>
              <h2
                id="why-join-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3C1518] leading-tight mb-4"
              >
                MORE THAN ANOTHER
                <br />
                MARKETING EMAIL.
              </h2>
              <p className="text-base sm:text-lg text-[#3C1518]/80 leading-relaxed font-medium">
                &ldquo;We&apos;re here to make your kitchen more interesting, one recipe, ingredient and story at a time.&rdquo;
              </p>
            </div>

            {/* Four Editorial Feature Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* BLOCK 01: NEW RECIPES */}
              <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#3C1518]/10 shadow-xs hover:border-[#C8102E]/40 hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display italic text-2xl font-bold text-[#D4A843]">
                      01
                    </span>
                    <div className="p-2 rounded-lg bg-[#FAF5EB] group-hover:bg-[#C8102E]/10 transition-colors">
                      <CuminSeedIcon />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#3C1518] mb-2 tracking-tight group-hover:text-[#C8102E] transition-colors">
                    NEW RECIPES
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3C1518]/75 leading-relaxed">
                    Discover practical Indian recipes built around MAGIC staples. Tested for weeknight speed and Sunday indulgence.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#3C1518]/10 text-[11px] font-semibold text-[#C8102E] flex items-center gap-1">
                  <span>Tested step-by-step</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* BLOCK 02: KITCHEN KNOW-HOW */}
              <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#3C1518]/10 shadow-xs hover:border-[#D4A843]/60 hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display italic text-2xl font-bold text-[#D4A843]">
                      02
                    </span>
                    <div className="p-2 rounded-lg bg-[#FAF5EB] group-hover:bg-[#D4A843]/15 transition-colors">
                      <MortarIcon />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#3C1518] mb-2 tracking-tight group-hover:text-[#3C1518] transition-colors">
                    KITCHEN KNOW-HOW
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3C1518]/75 leading-relaxed">
                    Simple techniques, ingredient ideas and ways to get more from your pantry. From blooming temperatures to custom dry rubs.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#3C1518]/10 text-[11px] font-semibold text-[#D4A843] flex items-center gap-1">
                  <span>Culinary technique</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* BLOCK 03: NEW MAGIC */}
              <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#3C1518]/10 shadow-xs hover:border-[#C8102E]/40 hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display italic text-2xl font-bold text-[#D4A843]">
                      03
                    </span>
                    <div className="p-2 rounded-lg bg-[#FAF5EB] group-hover:bg-[#C8102E]/10 transition-colors">
                      <StarAniseIcon />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#3C1518] mb-2 tracking-tight group-hover:text-[#C8102E] transition-colors">
                    NEW MAGIC
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3C1518]/75 leading-relaxed">
                    Be first to hear about new products, bundles and launches. Subscribers enjoy reserved allocations on limited seasonal batches.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#3C1518]/10 text-[11px] font-semibold text-[#C8102E] flex items-center gap-1">
                  <span>Subscriber priority</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* BLOCK 04: FROM FARM TO MAGIC */}
              <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#3C1518]/10 shadow-xs hover:border-[#5A7247]/60 hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display italic text-2xl font-bold text-[#D4A843]">
                      04
                    </span>
                    <div className="p-2 rounded-lg bg-[#FAF5EB] group-hover:bg-[#5A7247]/15 transition-colors">
                      <SproutTerroirIcon />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#3C1518] mb-2 tracking-tight group-hover:text-[#5A7247] transition-colors">
                    FROM FARM TO MAGIC
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3C1518]/75 leading-relaxed">
                    Stories about ingredients, sourcing and the people behind them. Direct grower relationships and laser optical sorting transparently shared.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#3C1518]/10 text-[11px] font-semibold text-[#5A7247] flex items-center gap-1">
                  <span>Transparent origin</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 03: THE MAGIC COMMUNITY (Interactive Preference Section) */}
        {/* ================================================================ */}
        <section
          aria-labelledby="community-heading"
          className="w-full bg-[#FDF6EC] py-16 sm:py-20 lg:py-24 border-b border-[#3C1518]/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#C8102E] block mb-2">
                YOUR KITCHEN DESK
              </span>
              <h2
                id="community-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3C1518] mb-4"
              >
                THE MAGIC COMMUNITY
              </h2>
              <p className="text-base sm:text-lg text-[#3C1518]/80 font-medium">
                What would you love to see in your inbox?
              </p>
              <p className="text-xs text-[#3C1518]/60 mt-1">
                Select your favorite themes to personalize your dispatch:
              </p>
            </div>

            {/* Four Large Interactive Preference Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* CARD 01: RECIPES */}
              <button
                type="button"
                onClick={() => togglePreference('recipes')}
                aria-pressed={selectedPreferences.includes('recipes')}
                className={`text-left p-6 sm:p-7 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[220px] ${
                  selectedPreferences.includes('recipes')
                    ? 'bg-white border-[#C8102E] shadow-md ring-2 ring-[#C8102E]/20'
                    : 'bg-white/80 border-[#3C1518]/10 hover:border-[#3C1518]/30 hover:bg-white shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#C8102E]/10 text-[#C8102E]">
                      WEEKLY COOKING
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        selectedPreferences.includes('recipes')
                          ? 'bg-[#C8102E] text-white'
                          : 'border border-[#3C1518]/20 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#3C1518] mb-2">
                    RECIPES
                  </h3>
                  <p className="text-sm text-[#3C1518]/75 leading-relaxed">
                    &ldquo;Show me more everyday Indian recipes.&rdquo;
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-[#C8102E] mt-4 flex items-center gap-1">
                  <span>{selectedPreferences.includes('recipes') ? 'Selected' : 'Tap to prioritize'}</span>
                </div>
              </button>

              {/* CARD 02: SPICE KNOWLEDGE */}
              <button
                type="button"
                onClick={() => togglePreference('spice-knowledge')}
                aria-pressed={selectedPreferences.includes('spice-knowledge')}
                className={`text-left p-6 sm:p-7 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[220px] ${
                  selectedPreferences.includes('spice-knowledge')
                    ? 'bg-white border-[#D4A843] shadow-md ring-2 ring-[#D4A843]/30'
                    : 'bg-white/80 border-[#3C1518]/10 hover:border-[#3C1518]/30 hover:bg-white shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#D4A843]/15 text-[#6B4226]">
                      PANTRY SCIENCE
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        selectedPreferences.includes('spice-knowledge')
                          ? 'bg-[#D4A843] text-white'
                          : 'border border-[#3C1518]/20 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#3C1518] mb-2">
                    SPICE KNOWLEDGE
                  </h3>
                  <p className="text-sm text-[#3C1518]/75 leading-relaxed">
                    &ldquo;Teach me how to use spices better.&rdquo;
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-[#D4A843] mt-4 flex items-center gap-1">
                  <span>{selectedPreferences.includes('spice-knowledge') ? 'Selected' : 'Tap to prioritize'}</span>
                </div>
              </button>

              {/* CARD 03: BEHIND THE PACK */}
              <button
                type="button"
                onClick={() => togglePreference('behind-the-pack')}
                aria-pressed={selectedPreferences.includes('behind-the-pack')}
                className={`text-left p-6 sm:p-7 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[220px] ${
                  selectedPreferences.includes('behind-the-pack')
                    ? 'bg-white border-[#5A7247] shadow-md ring-2 ring-[#5A7247]/20'
                    : 'bg-white/80 border-[#3C1518]/10 hover:border-[#3C1518]/30 hover:bg-white shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#5A7247]/15 text-[#5A7247]">
                      ORIGIN STORIES
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        selectedPreferences.includes('behind-the-pack')
                          ? 'bg-[#5A7247] text-white'
                          : 'border border-[#3C1518]/20 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#3C1518] mb-2">
                    BEHIND THE PACK
                  </h3>
                  <p className="text-sm text-[#3C1518]/75 leading-relaxed">
                    &ldquo;Tell me where my ingredients come from.&rdquo;
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-[#5A7247] mt-4 flex items-center gap-1">
                  <span>{selectedPreferences.includes('behind-the-pack') ? 'Selected' : 'Tap to prioritize'}</span>
                </div>
              </button>

              {/* CARD 04: NEW MAGIC */}
              <button
                type="button"
                onClick={() => togglePreference('new-magic')}
                aria-pressed={selectedPreferences.includes('new-magic')}
                className={`text-left p-6 sm:p-7 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[220px] ${
                  selectedPreferences.includes('new-magic')
                    ? 'bg-white border-[#C8102E] shadow-md ring-2 ring-[#C8102E]/20'
                    : 'bg-white/80 border-[#3C1518]/10 hover:border-[#3C1518]/30 hover:bg-white shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#C8102E]/10 text-[#C8102E]">
                      FIRST ACCESS
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        selectedPreferences.includes('new-magic')
                          ? 'bg-[#C8102E] text-white'
                          : 'border border-[#3C1518]/20 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#3C1518] mb-2">
                    NEW MAGIC
                  </h3>
                  <p className="text-sm text-[#3C1518]/75 leading-relaxed">
                    &ldquo;Tell me when something new arrives.&rdquo;
                  </p>
                </div>
                <div className="text-[11px] font-semibold text-[#C8102E] mt-4 flex items-center gap-1">
                  <span>{selectedPreferences.includes('new-magic') ? 'Selected' : 'Tap to prioritize'}</span>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 04: NEWSLETTER PREVIEW (Editorial Cards)                 */}
        {/* ================================================================ */}
        <section
          aria-labelledby="preview-heading"
          className="w-full bg-[#FAF5EB] py-16 sm:py-20 lg:py-24 border-b border-[#3C1518]/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 sm:mb-16">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#C8102E] block mb-2">
                EDITORIAL SAMPLE
              </span>
              <h2
                id="preview-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3C1518] mb-3"
              >
                A LITTLE TASTE OF WHAT&apos;S INSIDE
              </h2>
              <p className="text-base sm:text-lg text-[#3C1518]/80 font-medium">
                &ldquo;Every edition brings something useful, delicious or worth knowing.&rdquo;
              </p>
              <p className="text-xs text-[#3C1518]/60 mt-1">
                Visual preview concepts showcasing the editorial architecture of upcoming dispatches.
              </p>
            </div>

            {/* Four Large Editorial Newsletter Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* PREVIEW CARD 01: THE RECIPE */}
              <article className="bg-white rounded-2xl border border-[#3C1518]/12 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group">
                <div className="p-6">
                  {/* Category Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#C8102E]/10 text-[#C8102E]">
                      Recipe
                    </span>
                    <span className="text-[11px] font-medium text-[#3C1518]/50">
                      4 min read
                    </span>
                  </div>

                  {/* Visual Header / Thumbnail Accent */}
                  <div className="h-36 rounded-xl bg-[#FDF6EC] border border-[#3C1518]/8 mb-5 flex items-center justify-center p-3 relative overflow-hidden group-hover:bg-[#FAF4EA] transition-colors">
                    <img
                      src={MAGIC_ASSETS.toor}
                      alt="Unpolished Toor Dal for Dal Tadka"
                      className="max-h-28 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 text-[10px] font-bold text-[#3C1518]">
                      THE TADKA DISPATCH
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#3C1518] mb-2 group-hover:text-[#C8102E] transition-colors leading-snug">
                    Dal Tadka, made the MAGIC way.
                  </h3>
                  <p className="text-xs text-[#3C1518]/75 leading-relaxed">
                    Crisp cumin seeds blooming in pure ghee, slow-simmered unpolished Toor dal, and aromatic whole spices. The quintessential comfort dish made extraordinary.
                  </p>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onNavigateRecipes('dal-tadka')}
                    className="w-full py-2.5 px-4 bg-[#FAF5EB] hover:bg-[#C8102E] text-[#3C1518] hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>READ THE STORY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>

              {/* PREVIEW CARD 02: THE PANTRY */}
              <article className="bg-white rounded-2xl border border-[#3C1518]/12 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D4A843]/20 text-[#6B4226]">
                      Kitchen Know-How
                    </span>
                    <span className="text-[11px] font-medium text-[#3C1518]/50">
                      3 min read
                    </span>
                  </div>

                  <div className="h-36 rounded-xl bg-[#FDF6EC] border border-[#3C1518]/8 mb-5 flex items-center justify-center p-3 relative overflow-hidden group-hover:bg-[#FAF4EA] transition-colors">
                    <img
                      src={MAGIC_ASSETS.jeera}
                      alt="Whole Cumin Seeds"
                      className="max-h-28 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 text-[10px] font-bold text-[#3C1518]">
                      TECHNIQUE NOTE
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#3C1518] mb-2 group-hover:text-[#6B4226] transition-colors leading-snug">
                    5 ways to use Jeera beyond Jeera Rice.
                  </h3>
                  <p className="text-xs text-[#3C1518]/75 leading-relaxed">
                    From dry-toasting for fresh raitas to blooming in hot ghee for winter roasted squash. Unlock the earthy depths of whole single-origin cumin.
                  </p>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onNavigateRecipes()}
                    className="w-full py-2.5 px-4 bg-[#FAF5EB] hover:bg-[#6B4226] text-[#3C1518] hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>DISCOVER MORE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>

              {/* PREVIEW CARD 03: FROM THE FARM */}
              <article className="bg-white rounded-2xl border border-[#3C1518]/12 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#5A7247]/15 text-[#5A7247]">
                      Our Impact
                    </span>
                    <span className="text-[11px] font-medium text-[#3C1518]/50">
                      5 min read
                    </span>
                  </div>

                  <div className="h-36 rounded-xl bg-[#FDF6EC] border border-[#3C1518]/8 mb-5 flex items-center justify-center p-3 relative overflow-hidden group-hover:bg-[#FAF4EA] transition-colors">
                    <img
                      src={MAGIC_ASSETS.haldi}
                      alt="Salem Turmeric Harvest"
                      className="max-h-28 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 text-[10px] font-bold text-[#3C1518]">
                      TERROIR CHRONICLE
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#3C1518] mb-2 group-hover:text-[#5A7247] transition-colors leading-snug">
                    Meet the people behind the ingredients.
                  </h3>
                  <p className="text-xs text-[#3C1518]/75 leading-relaxed">
                    Journey through Saurashtra and Erode. Direct ethical trade, optical sorting at origin, and farm-fresh harvests without intermediate adulteration.
                  </p>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      if (onNavigateImpact) {
                        onNavigateImpact();
                      } else {
                        window.location.hash = '#impact';
                      }
                    }}
                    className="w-full py-2.5 px-4 bg-[#FAF5EB] hover:bg-[#5A7247] text-[#3C1518] hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>EXPLORE THE JOURNEY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>

              {/* PREVIEW CARD 04: THE MAGIC DROP */}
              <article className="bg-white rounded-2xl border border-[#3C1518]/12 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#C8102E]/10 text-[#C8102E]">
                      MAGIC NEWS
                    </span>
                    <span className="text-[11px] font-medium text-[#3C1518]/50">
                      2 min read
                    </span>
                  </div>

                  <div className="h-36 rounded-xl bg-[#FDF6EC] border border-[#3C1518]/8 mb-5 flex items-center justify-center p-3 relative overflow-hidden group-hover:bg-[#FAF4EA] transition-colors">
                    <img
                      src={MAGIC_ASSETS.masoor}
                      alt="MAGIC Bundles & Launches"
                      className="max-h-28 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 text-[10px] font-bold text-[#3C1518]">
                      COLLECTION DROP
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#3C1518] mb-2 group-hover:text-[#C8102E] transition-colors leading-snug">
                    New products, bundles and kitchen discoveries.
                  </h3>
                  <p className="text-xs text-[#3C1518]/75 leading-relaxed">
                    Curated gift boxes, pantry starter sets, and seasonal harvest drops before they sell out. Exclusive bundle savings for letter subscribers.
                  </p>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onNavigateBundles()}
                    className="w-full py-2.5 px-4 bg-[#FAF5EB] hover:bg-[#C8102E] text-[#3C1518] hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>SEE WHAT&apos;S NEW</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 05: EDITORIAL CTA (Bold Turmeric / Magic Yellow Section) */}
        {/* ================================================================ */}
        <section
          aria-labelledby="cta-heading"
          className="w-full bg-[#F5C342] text-[#3C1518] py-16 sm:py-24 relative overflow-hidden"
        >
          {/* Subtle geometric spice motif background */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#3C1518 1.5px, transparent 1.5px)`,
              backgroundSize: '28px 28px',
            }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3C1518]/10 text-[#3C1518] text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE MAGIC KITCHEN LETTER</span>
            </div>

            {/* Large Bold Headline */}
            <h2
              id="cta-heading"
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#3C1518] leading-[1.08] mb-4"
            >
              READY TO ADD SOME MAGIC
              <br />
              TO YOUR INBOX?
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-xl font-medium text-[#3C1518]/90 max-w-xl mx-auto mb-8">
              &ldquo;Good food. Useful ideas. No inbox clutter.&rdquo;
            </p>

            {/* Functional Secondary Email Form */}
            <div className="max-w-md mx-auto">
              {ctaStatus === 'success' ? (
                <div
                  role="status"
                  className="bg-white border-2 border-[#3C1518] rounded-xl p-6 shadow-md flex flex-col items-center gap-2 animate-in fade-in"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#2B6E2A]" />
                  <span className="font-bold text-base text-[#3C1518]">You&apos;re on the list.</span>
                  <p className="text-xs sm:text-sm text-[#3C1518]/80 text-center">
                    Welcome to MAGIC. We&apos;ll see you in your inbox.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCtaStatus('idle');
                      setCtaEmail('');
                    }}
                    className="text-xs font-semibold text-[#C8102E] hover:underline mt-2 cursor-pointer"
                  >
                    Subscribe another address
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleCtaSubmit}
                  noValidate
                  aria-label="Magic Newsletter Secondary CTA Form"
                  className="flex flex-col gap-3"
                >
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <label htmlFor="cta-email-input" className="sr-only">
                        Your email address
                      </label>
                      <input
                        id="cta-email-input"
                        type="email"
                        value={ctaEmail}
                        onChange={(e) => {
                          setCtaEmail(e.target.value);
                          if (ctaStatus === 'error') setCtaStatus('idle');
                        }}
                        placeholder="Your email address"
                        disabled={ctaStatus === 'loading'}
                        aria-invalid={ctaStatus === 'error'}
                        aria-describedby={ctaStatus === 'error' ? 'cta-email-error' : undefined}
                        className={`w-full px-4 py-3.5 text-sm bg-white border ${
                          ctaStatus === 'error'
                            ? 'border-[#C8102E] ring-2 ring-[#C8102E]/20'
                            : 'border-[#3C1518]/30 focus:border-[#3C1518]'
                        } text-[#3C1518] placeholder-[#3C1518]/50 rounded-lg focus:outline-hidden transition-all shadow-xs`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={ctaStatus === 'loading'}
                      className="min-h-[46px] px-6 py-3.5 bg-[#3C1518] hover:bg-[#2A0E10] active:bg-[#1A0607] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C1518]"
                    >
                      {ctaStatus === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#F5C342]" />
                          <span>JOINING...</span>
                        </>
                      ) : (
                        <>
                          <span>JOIN THE MAGIC</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#F5C342]" />
                        </>
                      )}
                    </button>
                  </div>

                  {ctaStatus === 'error' && (
                    <p
                      id="cta-email-error"
                      role="alert"
                      className="text-xs font-semibold text-[#8B1A4A] flex items-center justify-center gap-1.5 animate-in fade-in"
                    >
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{ctaErrorMessage}</span>
                    </p>
                  )}

                  <p className="text-xs text-[#3C1518]/80 mt-1 font-medium">
                    &ldquo;Recipes, kitchen inspiration, new MAGIC and stories from the source.&rdquo;
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 06: NEWSLETTER ECOSYSTEM (Connecting Links)              */}
        {/* ================================================================ */}
        <section
          aria-labelledby="ecosystem-heading"
          className="w-full bg-[#FAF5EB] py-14 sm:py-16 border-b border-[#3C1518]/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#C8102E] block mb-1">
                DISCOVER THE UNIVERSE
              </span>
              <h2
                id="ecosystem-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#3C1518]"
              >
                KEEP EXPLORING MAGIC
              </h2>
            </div>

            {/* Three Editorial Destinations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* DESTINATION 01: RECIPES */}
              <button
                type="button"
                onClick={() => onNavigateRecipes()}
                className="bg-white p-6 sm:p-7 rounded-xl border border-[#3C1518]/10 hover:border-[#C8102E]/50 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] flex items-center justify-center text-[#C8102E] mb-4 group-hover:bg-[#C8102E]/10 transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#3C1518] mb-1 group-hover:text-[#C8102E] transition-colors">
                    RECIPES
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3C1518]/70">
                    Cook something magical. Practical, flavorful dishes built on authentic ingredients.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#3C1518]/10 text-xs font-bold text-[#C8102E] flex items-center gap-1">
                  <span>Explore recipes</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* DESTINATION 02: BUNDLES */}
              <button
                type="button"
                onClick={() => onNavigateBundles()}
                className="bg-white p-6 sm:p-7 rounded-xl border border-[#3C1518]/10 hover:border-[#D4A843]/60 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] flex items-center justify-center text-[#D4A843] mb-4 group-hover:bg-[#D4A843]/15 transition-colors">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#3C1518] mb-1 group-hover:text-[#6B4226] transition-colors">
                    BUNDLES
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3C1518]/70">
                    Build your MAGIC pantry. Curated combinations with complimentary kitchen pairings.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#3C1518]/10 text-xs font-bold text-[#6B4226] flex items-center gap-1">
                  <span>Browse pantry sets</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* DESTINATION 03: OUR IMPACT */}
              <button
                type="button"
                onClick={() => {
                  if (onNavigateImpact) {
                    onNavigateImpact();
                  } else {
                    window.location.hash = '#impact';
                  }
                }}
                className="bg-white p-6 sm:p-7 rounded-xl border border-[#3C1518]/10 hover:border-[#5A7247]/60 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#FAF5EB] flex items-center justify-center text-[#5A7247] mb-4 group-hover:bg-[#5A7247]/15 transition-colors">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#3C1518] mb-1 group-hover:text-[#5A7247] transition-colors">
                    OUR IMPACT
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3C1518]/70">
                    Meet the people and places behind the ingredients. From Saurashtra to Salem.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#3C1518]/10 text-xs font-bold text-[#5A7247] flex items-center gap-1">
                  <span>Discover the source</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ================================================================ */}
      {/* SECTION 07: FOOTER (Reusing Approved MAGIC Footer)               */}
      {/* ================================================================ */}
      <ShopFooter
        onNavigateHome={onNavigateHome}
        onSelectCategory={(id) => onNavigateShop(id)}
        onNavigateRecipes={onNavigateRecipes}
        onNavigateBundles={onNavigateBundles}
        onNavigateImpact={onNavigateImpact}
        onNavigateNewsletter={onNavigateNewsletter || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
      />

      {/* Cart Drawer */}
      <ShopCartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </div>
  );
};
