import React, { useState, useEffect, useRef } from 'react';
import { MagicLogo } from './MagicLogo';
import { Heart, Instagram, MessageCircle, Youtube, Mail, ArrowUp, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LegalModal, LegalDocType } from './common/LegalModal';
import { MAGIC_ASSETS } from '../constants/assets';
import { EditorialBrassBowl } from './illustrations/MagicEditorialIllustrations';

/* ========================================================================== */
/* MAIN SECTION FOOTER COMPONENT                                               */
/* ========================================================================== */

export const SectionFooter: React.FC = () => {
  const { language, setLanguage, isRTL, t } = useLanguage();
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType | null>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Newsletter Form State
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#FDF6EC] text-[#3C1518] pt-12 sm:pt-14 lg:pt-16 pb-8 px-4 sm:px-6 lg:px-10 border-t border-[#3C1518]/15 select-none overflow-hidden"
      aria-label="Site Footer"
    >
      {/* ============================================================ */}
      {/* 1. DECORATIVE AGRICULTURAL STORY (Subtle Horizon at Bottom)  */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[320px] sm:h-[380px] pointer-events-none overflow-hidden z-0 select-none"
      >
        {/* Continuous Illustrated Agricultural Landscape with Left & Right Farmers */}
        <img
          src={MAGIC_ASSETS.footerLandscape}
          alt=""
          style={{
            opacity: isVisible || isReducedMotion ? 0.22 : 0.12,
            transform: isVisible || isReducedMotion ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 900ms ease-out, transform 900ms ease-out',
          }}
          className="absolute inset-0 w-full h-full object-cover object-bottom filter contrast-[1.08] saturate-[0.80]"
          loading="lazy"
        />

        {/* Softening Vignette: Keeps center quiet for readable brand text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 50% 40%, #FDF6EC 0%, #FDF6EC 40%, rgba(253, 246, 236, 0.85) 75%, transparent 100%)',
          }}
        />

        {/* Top Fade to Seamless Warm Ivory */}
        <div
          className="absolute top-0 inset-x-0 h-32 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, #FDF6EC 0%, rgba(253, 246, 236, 0.95) 45%, transparent 100%)',
          }}
        />

        {/* Bottom Grounding Fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, #FDF6EC 0%, rgba(253, 246, 236, 0.94) 30%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto z-10 pt-2 sm:pt-4">

        {/* ============================================================ */}
        {/* 3. MAIN FOOTER EDITORIAL GRID                                */}
        {/* ============================================================ */}
        <div
          style={{
            transform: isVisible || isReducedMotion ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible || isReducedMotion ? 1 : 0,
            transition: 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, opacity 800ms ease-out 100ms',
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 sm:pb-12 border-b border-[#3C1518]/12"
        >
          {/* LEFT LARGE BRAND BLOCK (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Logo + Brand Heading */}
              <div className="flex items-center gap-3 mb-4">
                <MagicLogo size="lg" variant="default" />
              </div>

              <div className="mb-4">
                <h4 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-[#3C1518]">
                  {isRTL ? 'أغذية وتوابل هندية أصيلة' : 'AUTHENTIC INDIAN SPICES & HERITAGE FOODS'}
                </h4>
                <p className="font-arabic text-xs text-[#6B4226] mt-0.5">
                  {isRTL
                    ? 'توابل هندية أصيلة ومواد غذائية تراثية • United Arab Emirates'
                    : 'توابل هندية أصيلة ومواد غذائية تراثية • United Arab Emirates'}
                </p>
              </div>

              {/* Brand Narrative */}
              <p className="text-xs sm:text-sm text-[#3C1518]/80 leading-relaxed font-normal mb-6 max-w-sm">
                {isRTL
                  ? 'توابل هندية أصيلة وبقوليات تراثية كاملة، ننتقيها بعناية من المزارع الهندية وأقاليم الزراعة الأصيلة التي تمنح كل مكون نكهته وطابعه الفريد.'
                  : 'Authentic Indian spices and wholesome pulses, sourced with care from the farms and growing regions that give every ingredient its character.'}
              </p>

              {/* Small Brass Spice Bowl Illustration Motif */}
              <div aria-hidden="true" className="w-24 sm:w-28 mb-6 opacity-85">
                <EditorialBrassBowl className="w-full h-auto drop-shadow-2xs" />
              </div>
            </div>

            {/* Social Channels (Simple Line-Style Icons) */}
            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs uppercase tracking-widest text-[#3C1518]/70 font-bold">
                {isRTL ? 'تواصل معنا' : 'CONNECT WITH MAGIC'}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/80 hover:bg-white text-[#3C1518] hover:text-[#C8102E] border border-[#3C1518]/15 hover:border-[#C8102E]/50 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/971500000000"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp Support"
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/80 hover:bg-white text-[#3C1518] hover:text-[#5A7247] border border-[#3C1518]/15 hover:border-[#5A7247]/50 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/80 hover:bg-white text-[#3C1518] hover:text-[#C8102E] border border-[#3C1518]/15 hover:border-[#C8102E]/50 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="mailto:hello@magicspices.com"
                  aria-label="Email Us"
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/80 hover:bg-white text-[#3C1518] hover:text-[#D4A843] border border-[#3C1518]/15 hover:border-[#D4A843]/60 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT NAVIGATION COLUMNS (8 cols: Shop, Discover, Care, Language/Region) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-8">
            {/* COL 1: SHOP */}
            <div className="flex flex-col">
              <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#3C1518] mb-4">
                {t('footer.shop')}
              </span>
              <ul className="flex flex-col gap-2.5 text-xs text-[#3C1518]/80 font-medium">
                <li>
                  <a href="#shop" className="hover:text-[#C8102E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded">
                    {t('shop.allProducts')}
                  </a>
                </li>
                <li>
                  <a href="#shop" className="hover:text-[#C8102E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded">
                    {t('shop.pureSpices')}
                  </a>
                </li>
                <li>
                  <a href="#shop" className="hover:text-[#C8102E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded">
                    {t('shop.dals')}
                  </a>
                </li>
                <li>
                  <a href="#bundles" className="hover:text-[#C8102E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded">
                    {t('nav.bundles')}
                  </a>
                </li>
                <li>
                  <a href="#subscribe" className="hover:text-[#C8102E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded">
                    {isRTL ? 'الاشتراك والتوفير' : 'Subscribe & Save'}
                  </a>
                </li>
              </ul>
            </div>

            {/* COL 2: DISCOVER */}
            <div className="flex flex-col">
              <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#3C1518] mb-4">
                {t('footer.discover')}
              </span>
              <ul className="flex flex-col gap-2.5 text-xs text-[#3C1518]/80 font-medium">
                <li>
                  <a href="#recipes" className="hover:text-[#C8102E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded">
                    {t('nav.recipes')}
                  </a>
                </li>
                <li>
                  <a href="#why-magic" className="hover:text-[#C8102E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded">
                    {isRTL ? 'لماذا ماجيك؟' : 'What Makes Us Different'}
                  </a>
                </li>
                <li>
                  <a href="#impact" className="hover:text-[#C8102E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded">
                    {t('nav.ourImpact')}
                  </a>
                </li>
                <li>
                  <a href="#farm-story" className="hover:text-[#C8102E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded">
                    {isRTL ? 'أصل المزارع والمنشأ' : 'Farm Provenance'}
                  </a>
                </li>
                <li>
                  <a href="#favourites" className="hover:text-[#C8102E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded">
                    {isRTL ? 'مفضلات المطبخ' : 'Kitchen Favourites'}
                  </a>
                </li>
              </ul>
            </div>

            {/* COL 3: CARE & CONTACT */}
            <div className="flex flex-col">
              <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#3C1518] mb-4">
                {t('footer.support')}
              </span>
              <ul className="flex flex-col gap-2.5 text-xs text-[#3C1518]/80 font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalDoc('shipping')}
                    className="hover:text-[#C8102E] transition-colors cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded"
                  >
                    {t('footer.uaeDelivery')}
                  </button>
                </li>
                <li>
                  <a href="mailto:hello@magicspices.com" className="hover:text-[#C8102E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded">
                    hello@magicspices.com
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalDoc('shipping')}
                    className="hover:text-[#C8102E] transition-colors cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded"
                  >
                    {t('footer.shippingPolicy')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalDoc('privacy')}
                    className="hover:text-[#C8102E] transition-colors cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded"
                  >
                    {t('footer.privacy')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalDoc('terms')}
                    className="hover:text-[#C8102E] transition-colors cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded"
                  >
                    {t('footer.terms')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalDoc('accessibility')}
                    className="hover:text-[#C8102E] transition-colors cursor-pointer text-start focus-visible:outline-2 focus-visible:outline-[#C8102E] rounded"
                  >
                    {isRTL ? 'إمكانية الوصول (WCAG)' : 'Accessibility'}
                  </button>
                </li>
              </ul>
            </div>

            {/* COL 4: LANGUAGE & REGION CONTROLS */}
            <div className="flex flex-col">
              <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#3C1518] mb-4">
                {t('footer.language')}
              </span>

              {/* Language Switcher Buttons */}
              <div className="flex flex-col gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer min-h-[40px] ${
                    language === 'en'
                      ? 'bg-white text-[#C8102E] border-[#C8102E]/60 shadow-xs font-bold'
                      : 'bg-white/50 text-[#3C1518]/75 border-[#3C1518]/15 hover:bg-white hover:text-[#3C1518]'
                  }`}
                >
                  <span>English</span>
                  <span className="font-sans text-xs font-bold text-[#3C1518]/50">EN</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('ar')}
                  className={`inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer font-arabic min-h-[40px] ${
                    language === 'ar'
                      ? 'bg-white text-[#C8102E] border-[#C8102E]/60 shadow-xs font-bold'
                      : 'bg-white/50 text-[#3C1518]/75 border-[#3C1518]/15 hover:bg-white hover:text-[#3C1518]'
                  }`}
                >
                  <span>العربية</span>
                  <span className="font-sans text-xs font-bold text-[#3C1518]/50">AR</span>
                </button>
              </div>

              {/* UAE Market Note */}
              <div className="p-2.5 rounded-lg bg-white/60 border border-[#3C1518]/15 text-xs text-[#3C1518]/80 flex items-center gap-2 shadow-2xs mb-4">
                <span className="w-2 h-2 rounded-full bg-[#2B6E2A] shrink-0" />
                <span className="font-medium">United Arab Emirates (AED)</span>
              </div>

              {/* Back to Top button in column */}
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/60 hover:bg-white text-xs font-semibold text-[#3C1518] hover:text-[#C8102E] border border-[#3C1518]/25 hover:border-[#C8102E]/50 shadow-2xs transition-all cursor-pointer min-h-[38px] active:scale-95"
                aria-label="Back to top of page"
              >
                <span>{isRTL ? 'العودة للأعلى' : 'Back to top'}</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. CREATIVE FOOTER BOTTOM EDGE & METADATA                     */}
        {/* ============================================================ */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#3C1518]/75">
          {/* UAE Store & Copyright */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            <span className="font-sans font-bold text-xs text-[#3C1518]/70 bg-[#3C1518]/5 px-2.5 py-0.5 rounded border border-[#3C1518]/10">
              UAE STORE
            </span>
            <span>•</span>
            <span>
              {isRTL
                ? `© ${new Date().getFullYear()} أغذية ماجيك الإمارات. جميع الحقوق محفوظة.`
                : `© ${new Date().getFullYear()} MAGIC Foods UAE. All rights reserved.`}
            </span>
          </div>

          {/* Crafted with love & Made by */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 text-[#3C1518]/70">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C8102E] fill-current" />
            <span>for UAE Culinary Kitchens</span>
            <span>•</span>
            <a
              href="https://encesmarketing.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#3C1518] hover:text-[#C8102E] hover:underline transition-colors font-semibold"
            >
              Made by ENCES Marketing
            </a>
          </div>
        </div>
      </div>

      {/* ACCESSIBLE LEGAL POLICY MODAL */}
      <LegalModal
        isOpen={Boolean(activeLegalDoc)}
        docType={activeLegalDoc || 'privacy'}
        onClose={() => setActiveLegalDoc(null)}
      />
    </footer>
  );
};
