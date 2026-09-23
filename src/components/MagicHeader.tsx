import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  User,
  ChevronDown,
  X,
  ArrowRight,
  ArrowLeft,
  Globe,
  Menu,
  ExternalLink,
} from 'lucide-react';
import { MagicLogo } from './MagicLogo';
import { MAGIC_ASSETS } from '../constants/assets';
import { useShopCart } from '../context/ShopCartContext';
import { useLanguage } from '../context/LanguageContext';
import {
  ChilliIcon,
  BundleBoxIcon,
  RecipePotIcon,
  ImpactSproutIcon,
  NewsletterLetterIcon,
  GrainIcon,
} from './navigation/NavIcons';

export interface MagicHeaderProps {
  cartCount?: number;
  onNavigateHome?: () => void;
  onNavigateShop?: (categoryId?: string) => void;
  onNavigateRecipes?: (recipeSlug?: string) => void;
  onNavigateBundles?: (bundleSlug?: string) => void;
  onNavigateImpact?: () => void;
  onNavigateNewsletter?: () => void;
  onSelectProduct?: (productSlug: string) => void;
  onOpenCart?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

type DropdownType = 'shopAll' | 'spices' | 'discover' | 'account' | null;

export const MagicHeader: React.FC<MagicHeaderProps> = ({
  cartCount,
  onNavigateHome,
  onNavigateShop,
  onNavigateRecipes,
  onNavigateBundles,
  onNavigateImpact,
  onNavigateNewsletter,
  onSelectProduct,
  onOpenCart,
  searchQuery = '',
  onSearchChange,
}) => {
  // Localization context
  const { language, setLanguage, isRTL, t } = useLanguage();

  // Access cart context
  const shopCart = useShopCart();
  const totalCartItems = cartCount !== undefined ? cartCount : shopCart.totalItems;
  const handleOpenCart = onOpenCart || shopCart.openCart;

  // Active Dropdown state (desktop)
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSpicesOpen, setMobileSpicesOpen] = useState(false);
  const [mobileDiscoverOpen, setMobileDiscoverOpen] = useState(false);

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [internalSearchQuery, setInternalSearchQuery] = useState(searchQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Active route tracking
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    const updatePath = () => {
      const hash = window.location.hash || '';
      const path = window.location.pathname || '';
      setCurrentPath(`${path}${hash}`);
    };
    updatePath();
    window.addEventListener('hashchange', updatePath);
    window.addEventListener('popstate', updatePath);
    return () => {
      window.removeEventListener('hashchange', updatePath);
      window.removeEventListener('popstate', updatePath);
    };
  }, []);

  // Sync internal search query if prop changes
  useEffect(() => {
    setInternalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Escape key closes menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close dropdowns
  const headerContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        headerContainerRef.current &&
        !headerContainerRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dropdown hover timing
  const handleMouseEnter = (menu: DropdownType) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleDropdownToggle = (menu: DropdownType) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  // Safe Navigation Dispatchers
  const navigateToHome = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.hash = '#home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = (categoryId?: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onNavigateShop) {
      onNavigateShop(categoryId);
    } else {
      window.location.hash = categoryId ? `#shop/${categoryId}` : '#shop';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToRecipes = (recipeSlug?: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onNavigateRecipes) {
      onNavigateRecipes(recipeSlug);
    } else {
      window.location.hash = recipeSlug ? `#recipes/${recipeSlug}` : '#recipes';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBundles = (bundleSlug?: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onNavigateBundles) {
      onNavigateBundles(bundleSlug);
    } else {
      window.location.hash = bundleSlug ? `#bundles/${bundleSlug}` : '#bundles';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToImpact = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onNavigateImpact) {
      onNavigateImpact();
    } else {
      window.location.hash = '#impact';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToNewsletter = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onNavigateNewsletter) {
      onNavigateNewsletter();
    } else {
      window.location.hash = '#newsletter';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (productSlug: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    const targetSlug = productSlug.startsWith('magic-') ? productSlug : `magic-${productSlug}`;
    if (onSelectProduct) {
      onSelectProduct(targetSlug);
    } else {
      window.location.hash = `#shop/product/${targetSlug}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = internalSearchQuery.trim();
    if (onSearchChange) {
      onSearchChange(query);
    }
    setIsSearchOpen(false);
    setMobileMenuOpen(false);
    navigateToShop();
  };

  // Active section helper
  const isShopActive = currentPath.includes('#shop') || currentPath.includes('/shop');
  const isBundlesActive = currentPath.includes('#bundles') || currentPath.includes('/bundles');
  const isRecipesActive = currentPath.includes('#recipes') || currentPath.includes('/recipes');
  const isDiscoverActive =
    currentPath.includes('#impact') ||
    currentPath.includes('/impact') ||
    currentPath.includes('#newsletter') ||
    currentPath.includes('/newsletter');
  const isSpicesActive =
    currentPath.includes('product/') || currentPath.includes('spices') || currentPath.includes('pulses');

  // Featured Product Cards data for Spices Mega Menu
  const FEATURED_PRODUCTS = [
    {
      name: isRTL ? 'تور دال (عدس الحمام)' : 'MAGIC Toor Dal',
      category: isRTL ? 'البقوليات والعدس' : 'Dals & Lentils',
      image: MAGIC_ASSETS.toor,
      slug: 'magic-toor-dal',
      terroir: isRTL ? 'لاتور، ماهاراشترا' : 'Latur, Maharashtra',
    },
    {
      name: isRTL ? 'مسور دال (عدس أحمر)' : 'MAGIC Masoor Dal',
      category: isRTL ? 'البقوليات والعدس' : 'Dals & Lentils',
      image: MAGIC_ASSETS.masoor,
      slug: 'magic-masoor-dal',
      terroir: isRTL ? 'ماديا براديش' : 'Madhya Pradesh',
    },
    {
      name: isRTL ? 'كركم هالدي' : 'MAGIC Haldi',
      category: isRTL ? 'توابل نقية' : 'Single Origin Spice',
      image: MAGIC_ASSETS.haldi,
      slug: 'magic-haldi',
      terroir: isRTL ? 'إيرود، تاميل نادو' : 'Erode, Tamil Nadu',
    },
    {
      name: isRTL ? 'كمون جيرا' : 'MAGIC Jeera',
      category: isRTL ? 'توابل نقية' : 'Single Origin Spice',
      image: MAGIC_ASSETS.jeera,
      slug: 'magic-jeera',
      terroir: isRTL ? 'ناغور، راجستان' : 'Nagaur, Rajasthan',
    },
  ];

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div ref={headerContainerRef} className="relative w-full z-50 select-none">
      {/* ==================================================
          LAYER 1: ORANGE ANNOUNCEMENT STRIP
          Warm orange/saffron tone consistent with MAGIC
          UAE ONLY - No USA references
          ================================================== */}
      <div
        className="w-full bg-[#E8922F] text-[#3C1518] text-[11px] sm:text-xs font-bold tracking-wider uppercase h-7 sm:h-7.5 px-3 flex items-center justify-center border-b border-[#D4A843]/40 transition-colors"
        role="region"
        aria-label="Announcement"
      >
        <div className="flex items-center gap-2 overflow-hidden text-center whitespace-nowrap">
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
          <span>{t('announcement.text')}</span>
          <span className="opacity-40">•</span>
          <span className="font-semibold text-[#3C1518]/90">
            {t('announcement.source')}
          </span>
          <span className="hidden md:inline-block opacity-40">•</span>
          <span className="hidden md:inline-block font-semibold text-[#3C1518]/90">
            {t('announcement.shipping')}
          </span>
        </div>
      </div>

      {/* ==================================================
          LAYER 2: MAGIC RED NAVIGATION BAR
          Background: MAGIC RED (#C8102E)
          Main text: #FDF6EC / white
          Height: compact, ~64px
          ================================================== */}
      <header className="relative w-full bg-[#C8102E] text-[#FDF6EC] shadow-md border-b border-[#A60D26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-17 flex items-center justify-between gap-4">
          
          {/* LOGO & PRIMARY NAV */}
          <div className="flex items-center gap-5 sm:gap-7 lg:gap-8">
            {/* MAGIC LOGO */}
            <a
              href="#home"
              onClick={navigateToHome}
              className="flex items-center focus-visible:outline-2 focus-visible:outline-[#D4A843] rounded py-1 transition-transform hover:opacity-95"
              aria-label="MAGIC Spices & Foods Home"
            >
              <MagicLogo size="sm" variant="white" withRegistered={true} />
            </a>

            {/* DESKTOP NAVIGATION ITEMS */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-semibold tracking-wide text-[#FDF6EC]"
              aria-label="Main Navigation"
            >
              {/* 1. SHOP ALL DROPDOWN TRIGGER */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('shopAll')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => handleDropdownToggle('shopAll')}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'shopAll'}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A843] ${
                    activeDropdown === 'shopAll' || isShopActive
                      ? 'text-[#FDF6EC] font-bold bg-[#A60D26]/70 underline decoration-[#D4A843] decoration-2 underline-offset-8'
                      : 'hover:text-[#FDF6EC] hover:bg-[#A60D26]/40'
                  }`}
                >
                  <span>{t('nav.shopAll')}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'shopAll' ? 'rotate-180 text-[#D4A843]' : 'opacity-80'
                    }`}
                  />
                </button>

                {/* COMPACT CREAM DROPDOWN: SHOP ALL */}
                {activeDropdown === 'shopAll' && (
                  <div
                    className={`absolute top-full mt-1 w-72 sm:w-80 bg-[#FDF6EC] text-[#3C1518] shadow-2xl rounded-xs border border-[#D4A843]/30 p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                      isRTL ? 'right-0 text-right' : 'left-0 text-left'
                    }`}
                    onMouseEnter={() => handleMouseEnter('shopAll')}
                    onMouseLeave={handleMouseLeave}
                    role="menu"
                    aria-label="Shop All menu"
                  >
                    <div className="space-y-1">
                      {/* Spices item */}
                      <button
                        onClick={(e) => navigateToShop('spices', e)}
                        className="w-full flex items-center gap-3.5 p-2.5 rounded hover:bg-[#FAF1E0] transition-all group cursor-pointer"
                        role="menuitem"
                      >
                        <div className="w-9 h-9 rounded bg-white/90 border border-[#D4A843]/20 flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#C8102E]/30 transition-colors">
                          <ChilliIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1">
                          <span className="font-display font-bold text-sm tracking-wide text-[#C8102E] block group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                            {t('dropdown.spices.title')}
                          </span>
                          <span className="text-[11px] text-[#3C1518]/70 block leading-tight">
                            {t('dropdown.spices.desc')}
                          </span>
                        </div>
                      </button>

                      {/* Bundles item */}
                      <button
                        onClick={(e) => navigateToBundles(undefined, e)}
                        className="w-full flex items-center gap-3.5 p-2.5 rounded hover:bg-[#FAF1E0] transition-all group cursor-pointer"
                        role="menuitem"
                      >
                        <div className="w-9 h-9 rounded bg-white/90 border border-[#D4A843]/20 flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#C8102E]/30 transition-colors">
                          <BundleBoxIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1">
                          <span className="font-display font-bold text-sm tracking-wide text-[#C8102E] block group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                            {t('dropdown.bundles.title')}
                          </span>
                          <span className="text-[11px] text-[#3C1518]/70 block leading-tight">
                            {t('dropdown.bundles.desc')}
                          </span>
                        </div>
                      </button>

                      {/* Recipes item */}
                      <button
                        onClick={(e) => navigateToRecipes(undefined, e)}
                        className="w-full flex items-center gap-3.5 p-2.5 rounded hover:bg-[#FAF1E0] transition-all group cursor-pointer"
                        role="menuitem"
                      >
                        <div className="w-9 h-9 rounded bg-white/90 border border-[#D4A843]/20 flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#C8102E]/30 transition-colors">
                          <RecipePotIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1">
                          <span className="font-display font-bold text-sm tracking-wide text-[#C8102E] block group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                            {t('dropdown.recipes.title')}
                          </span>
                          <span className="text-[11px] text-[#3C1518]/70 block leading-tight">
                            {t('dropdown.recipes.desc')}
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-3 mt-2 border-t border-[#3C1518]/10">
                      <button
                        onClick={(e) => navigateToShop(undefined, e)}
                        className="w-full flex items-center justify-between text-xs font-bold text-[#C8102E] hover:text-[#3C1518] p-1.5 transition-colors group cursor-pointer"
                        role="menuitem"
                      >
                        <span className="tracking-wider">{t('nav.shopAllMagic')}</span>
                        <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. SPICES MEGA MENU TRIGGER */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('spices')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => handleDropdownToggle('spices')}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'spices'}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A843] ${
                    activeDropdown === 'spices' || isSpicesActive
                      ? 'text-[#FDF6EC] font-bold bg-[#A60D26]/70 underline decoration-[#D4A843] decoration-2 underline-offset-8'
                      : 'hover:text-[#FDF6EC] hover:bg-[#A60D26]/40'
                  }`}
                >
                  <span>{t('nav.spices')}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'spices' ? 'rotate-180 text-[#D4A843]' : 'opacity-80'
                    }`}
                  />
                </button>
              </div>

              {/* 3. BUNDLES DIRECT LINK */}
              <a
                href="#bundles"
                onClick={(e) => navigateToBundles(undefined, e)}
                className={`px-3 py-2 rounded-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A843] ${
                  isBundlesActive
                    ? 'text-[#FDF6EC] font-bold bg-[#A60D26]/70 underline decoration-[#D4A843] decoration-2 underline-offset-8'
                    : 'hover:text-[#FDF6EC] hover:bg-[#A60D26]/40'
                }`}
              >
                {t('nav.bundles')}
              </a>

              {/* 4. RECIPES DIRECT LINK */}
              <a
                href="#recipes"
                onClick={(e) => navigateToRecipes(undefined, e)}
                className={`px-3 py-2 rounded-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A843] ${
                  isRecipesActive
                    ? 'text-[#FDF6EC] font-bold bg-[#A60D26]/70 underline decoration-[#D4A843] decoration-2 underline-offset-8'
                    : 'hover:text-[#FDF6EC] hover:bg-[#A60D26]/40'
                }`}
              >
                {t('nav.recipes')}
              </a>

              {/* 5. DISCOVER DROPDOWN TRIGGER */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('discover')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => handleDropdownToggle('discover')}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'discover'}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A843] ${
                    activeDropdown === 'discover' || isDiscoverActive
                      ? 'text-[#FDF6EC] font-bold bg-[#A60D26]/70 underline decoration-[#D4A843] decoration-2 underline-offset-8'
                      : 'hover:text-[#FDF6EC] hover:bg-[#A60D26]/40'
                  }`}
                >
                  <span>{t('nav.discover')}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'discover' ? 'rotate-180 text-[#D4A843]' : 'opacity-80'
                    }`}
                  />
                </button>

                {/* COMPACT CREAM DROPDOWN: DISCOVER */}
                {activeDropdown === 'discover' && (
                  <div
                    className={`absolute top-full mt-1 w-72 sm:w-80 bg-[#FDF6EC] text-[#3C1518] shadow-2xl rounded-xs border border-[#D4A843]/30 p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                      isRTL ? 'right-0 text-right' : 'left-0 text-left'
                    }`}
                    onMouseEnter={() => handleMouseEnter('discover')}
                    onMouseLeave={handleMouseLeave}
                    role="menu"
                    aria-label="Discover menu"
                  >
                    <div className="pb-2 mb-2 border-b border-[#3C1518]/10 flex items-center justify-between">
                      <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-[#3C1518]/60">
                        {t('discover.title')}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8922F]" />
                    </div>

                    <div className="space-y-1">
                      {/* Impact item */}
                      <button
                        onClick={navigateToImpact}
                        className="w-full flex items-center gap-3.5 p-2 rounded hover:bg-[#FAF1E0] transition-all group cursor-pointer"
                        role="menuitem"
                      >
                        <div className="w-8 h-8 rounded bg-white/90 border border-[#D4A843]/20 flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#C8102E]/30 transition-colors">
                          <ImpactSproutIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1">
                          <span className="font-display font-bold text-xs tracking-wide text-[#C8102E] block group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                            {t('discover.impact.title')}
                          </span>
                          <span className="text-[11px] text-[#3C1518]/70 block leading-tight">
                            {t('discover.impact.desc')}
                          </span>
                        </div>
                      </button>

                      {/* Newsletter item */}
                      <button
                        onClick={navigateToNewsletter}
                        className="w-full flex items-center gap-3.5 p-2 rounded hover:bg-[#FAF1E0] transition-all group cursor-pointer"
                        role="menuitem"
                      >
                        <div className="w-8 h-8 rounded bg-white/90 border border-[#D4A843]/20 flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#C8102E]/30 transition-colors">
                          <NewsletterLetterIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1">
                          <span className="font-display font-bold text-xs tracking-wide text-[#C8102E] block group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                            {t('discover.newsletter.title')}
                          </span>
                          <span className="text-[11px] text-[#3C1518]/70 block leading-tight">
                            {t('discover.newsletter.desc')}
                          </span>
                        </div>
                      </button>

                      {/* Recipes item */}
                      <button
                        onClick={(e) => navigateToRecipes(undefined, e)}
                        className="w-full flex items-center gap-3.5 p-2 rounded hover:bg-[#FAF1E0] transition-all group cursor-pointer"
                        role="menuitem"
                      >
                        <div className="w-8 h-8 rounded bg-white/90 border border-[#D4A843]/20 flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#C8102E]/30 transition-colors">
                          <RecipePotIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1">
                          <span className="font-display font-bold text-xs tracking-wide text-[#C8102E] block group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                            {t('discover.recipes.title')}
                          </span>
                          <span className="text-[11px] text-[#3C1518]/70 block leading-tight">
                            {t('discover.recipes.desc')}
                          </span>
                        </div>
                      </button>

                      {/* Bundles item */}
                      <button
                        onClick={(e) => navigateToBundles(undefined, e)}
                        className="w-full flex items-center gap-3.5 p-2 rounded hover:bg-[#FAF1E0] transition-all group cursor-pointer"
                        role="menuitem"
                      >
                        <div className="w-8 h-8 rounded bg-white/90 border border-[#D4A843]/20 flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#C8102E]/30 transition-colors">
                          <BundleBoxIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1">
                          <span className="font-display font-bold text-xs tracking-wide text-[#C8102E] block group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                            {t('discover.bundles.title')}
                          </span>
                          <span className="text-[11px] text-[#3C1518]/70 block leading-tight">
                            {t('discover.bundles.desc')}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* RIGHT SIDE: LANGUAGE SWITCHER, SEARCH, ACCOUNT, CART & MOBILE TOGGLE */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* ==================================================
                LANGUAGE SWITCHER (EN | العربية)
                Replaces old region switching completely
                ================================================== */}
            <div className="flex items-center bg-[#A60D26] p-0.5 rounded-full border border-[#D4A843]/40 shadow-inner">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#FDF6EC] text-[#C8102E] shadow-xs'
                    : 'text-[#FDF6EC]/80 hover:text-white'
                }`}
                aria-label="Switch to English"
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer font-arabic ${
                  language === 'ar'
                    ? 'bg-[#FDF6EC] text-[#C8102E] shadow-xs'
                    : 'text-[#FDF6EC]/80 hover:text-white'
                }`}
                aria-label="التبديل إلى العربية"
                title="العربية"
              >
                العربية
              </button>
            </div>

            {/* SEARCH BUTTON */}
            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className={`p-2 rounded-full transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A843] ${
                isSearchOpen ? 'bg-[#A60D26] text-[#D4A843]' : 'text-[#FDF6EC] hover:bg-[#A60D26]'
              }`}
              title={t('nav.search')}
              aria-label={t('nav.search')}
              aria-expanded={isSearchOpen}
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* ACCOUNT BUTTON & POPOVER (UAE Only) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('account')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => handleDropdownToggle('account')}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'account'}
                className="p-2 rounded-full text-[#FDF6EC] hover:bg-[#A60D26] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A843]"
                title={t('nav.account')}
                aria-label={t('nav.account')}
              >
                <User className="w-4.5 h-4.5" />
              </button>

              {/* ACCOUNT POPOVER */}
              {activeDropdown === 'account' && (
                <div
                  className={`absolute top-full mt-1 w-68 bg-[#FDF6EC] text-[#3C1518] shadow-2xl rounded-xs border border-[#D4A843]/30 p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                    isRTL ? 'left-0 text-right' : 'right-0 text-left'
                  }`}
                  onMouseEnter={() => handleMouseEnter('account')}
                  onMouseLeave={handleMouseLeave}
                  role="menu"
                >
                  <div className="pb-2.5 mb-2.5 border-b border-[#3C1518]/10">
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-[#C8102E] block">
                      {t('account.title')}
                    </span>
                    <span className="text-[11px] text-[#3C1518]/70 block mt-0.5">
                      {t('account.subtitle')}
                    </span>
                  </div>

                  {/* UAE Only Country indicator (No switcher) */}
                  <div className="mb-3 p-2 rounded bg-white/70 border border-[#D4A843]/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#2B6E2A]" />
                      <span className="text-xs font-semibold text-[#3C1518]">
                        {t('account.region')} (AED)
                      </span>
                    </div>
                    <span className="text-[10px] text-[#3C1518]/50 uppercase tracking-wider font-bold">
                      UAE
                    </span>
                  </div>

                  {/* Language switch inside account */}
                  <div className="mb-3">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#3C1518]/60 block mb-1.5">
                      {t('account.language')}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setLanguage('en')}
                        className={`text-xs py-1.5 px-2 rounded border font-semibold transition-all cursor-pointer ${
                          language === 'en'
                            ? 'bg-[#C8102E] text-white border-[#C8102E]'
                            : 'bg-white/80 text-[#3C1518] border-[#3C1518]/20 hover:border-[#C8102E]/40'
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setLanguage('ar')}
                        className={`text-xs py-1.5 px-2 rounded border font-semibold transition-all cursor-pointer font-arabic ${
                          language === 'ar'
                            ? 'bg-[#C8102E] text-white border-[#C8102E]'
                            : 'bg-white/80 text-[#3C1518] border-[#3C1518]/20 hover:border-[#C8102E]/40'
                        }`}
                      >
                        العربية
                      </button>
                    </div>
                  </div>

                  {/* Quick links */}
                  <div className="space-y-1 text-xs text-[#3C1518]/80 font-medium">
                    <button
                      onClick={navigateToNewsletter}
                      className="w-full p-1.5 rounded hover:bg-[#FAF1E0] hover:text-[#C8102E] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{t('account.newsletter')}</span>
                      <ArrowIcon className="w-3 h-3" />
                    </button>
                    <button
                      onClick={navigateToImpact}
                      className="w-full p-1.5 rounded hover:bg-[#FAF1E0] hover:text-[#C8102E] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{t('account.impact')}</span>
                      <ArrowIcon className="w-3 h-3" />
                    </button>
                    <a
                      href="mailto:hello@magicspices.com"
                      className="w-full p-1.5 rounded hover:bg-[#FAF1E0] hover:text-[#C8102E] transition-colors cursor-pointer flex items-center justify-between block"
                    >
                      <span>{t('account.wholesale')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* CART BUTTON */}
            <button
              onClick={handleOpenCart}
              className="relative p-2 rounded-full text-[#FDF6EC] hover:bg-[#A60D26] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A843] flex items-center justify-center"
              title={t('cart.title')}
              aria-label={`${t('cart.title')}, ${totalCartItems}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 rtl:right-auto rtl:-left-0.5 min-w-[19px] h-[19px] px-1 bg-[#D4A843] text-[#3C1518] text-[10px] font-extrabold rounded-full flex items-center justify-center border border-[#C8102E] shadow-sm animate-in zoom-in-75">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* MOBILE MENU TOGGLE BUTTON */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-full text-[#FDF6EC] hover:bg-[#A60D26] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A843] min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ==================================================
            DESKTOP SEARCH EXPANDABLE BAR
            Overlays directly under red bar when toggled
            ================================================== */}
        {isSearchOpen && (
          <div className="w-full bg-[#FAF7F2] text-[#3C1518] border-t border-[#A60D26] border-b border-[#D4A843]/40 shadow-xl py-3 px-4 sm:px-8 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
                <Search className={`w-4 h-4 text-[#3C1518]/50 absolute pointer-events-none ${isRTL ? 'right-3' : 'left-3'}`} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={internalSearchQuery}
                  onChange={(e) => {
                    setInternalSearchQuery(e.target.value);
                    if (onSearchChange) onSearchChange(e.target.value);
                  }}
                  placeholder={t('search.placeholder')}
                  className={`w-full py-2.5 bg-white text-xs sm:text-sm text-[#3C1518] placeholder-[#3C1518]/50 border border-[#D9D2C7] focus:border-[#C8102E] focus:outline-hidden rounded-xs shadow-inner ${
                    isRTL ? 'pr-9 pl-10 text-right' : 'pl-9 pr-10 text-left'
                  }`}
                />
                {internalSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setInternalSearchQuery('');
                      if (onSearchChange) onSearchChange('');
                    }}
                    className={`absolute text-[#3C1518]/40 hover:text-[#C8102E] p-1 ${isRTL ? 'left-20' : 'right-20'}`}
                    title={t('search.clear')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="py-2.5 px-4 bg-[#C8102E] hover:bg-[#A60D26] text-white text-xs font-bold rounded-xs transition-colors shrink-0 shadow-xs cursor-pointer"
                >
                  {t('search.button')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-[#3C1518]/60 hover:text-[#3C1518] transition-colors shrink-0 cursor-pointer"
                  title="Close search bar"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>

              {/* Quick Suggestion Chips */}
              <div className="mt-2.5 flex items-center flex-wrap gap-1.5 text-xs text-[#3C1518]/70">
                <span className="font-semibold text-[11px] uppercase tracking-wider text-[#3C1518]/50 mr-1 rtl:mr-0 rtl:ml-1">
                  {t('search.popular')}
                </span>
                {(isRTL
                  ? ['تور دال', 'مسور دال', 'كركم هالدي', 'كمون جيرا', 'دال تادكا', 'الباقات']
                  : ['Toor Dal', 'Masoor Dal', 'Haldi', 'Jeera', 'Dal Tadka', 'Bundles']
                ).map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setInternalSearchQuery(term);
                      if (onSearchChange) onSearchChange(term);
                      setIsSearchOpen(false);
                      navigateToShop();
                    }}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-white hover:bg-[#C8102E] hover:text-white border border-[#D9D2C7] transition-all cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================
            FULL-WIDTH MEGA MENU: SPICES
            Overlaying page beneath pink/red bar
            Approx 3 columns + Featured Products Area
            ================================================== */}
        {activeDropdown === 'spices' && (
          <div
            className="absolute top-full left-0 right-0 w-full bg-[#FDF6EC] text-[#3C1518] shadow-2xl border-b-2 border-[#C8102E]/30 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={() => handleMouseEnter('spices')}
            onMouseLeave={handleMouseLeave}
            role="menu"
            aria-label="Spices and Staples Mega Menu"
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-8">
              <div className="grid grid-cols-12 gap-8 lg:gap-10 items-start">
                
                {/* 3 CONTENT COLUMNS (7 Cols) */}
                <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  
                  {/* COLUMN 1: DALS & LENTILS */}
                  <div>
                    <h3 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-[#3C1518] border-b border-[#3C1518]/15 pb-2 mb-3">
                      {t('megamenu.dals.title')}
                    </h3>
                    <ul className="space-y-2 text-xs">
                      <li>
                        <button
                          onClick={(e) => navigateToProduct('magic-toor-dal', e)}
                          className="w-full text-start font-semibold text-[#3C1518] hover:text-[#C8102E] transition-colors py-1 group flex flex-col cursor-pointer"
                          role="menuitem"
                        >
                          <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform font-bold">
                            {t('megamenu.toor.name')}
                          </span>
                          <span className="text-[10px] text-[#3C1518]/60 font-normal">
                            {t('megamenu.toor.origin')}
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => navigateToProduct('magic-masoor-dal', e)}
                          className="w-full text-start font-semibold text-[#3C1518] hover:text-[#C8102E] transition-colors py-1 group flex flex-col cursor-pointer"
                          role="menuitem"
                        >
                          <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform font-bold">
                            {t('megamenu.masoor.name')}
                          </span>
                          <span className="text-[10px] text-[#3C1518]/60 font-normal">
                            {t('megamenu.masoor.origin')}
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => navigateToProduct('magic-moong-whole', e)}
                          className="w-full text-start font-semibold text-[#3C1518] hover:text-[#C8102E] transition-colors py-1 group flex flex-col cursor-pointer"
                          role="menuitem"
                        >
                          <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform font-bold">
                            {t('megamenu.moong.name')}
                          </span>
                          <span className="text-[10px] text-[#3C1518]/60 font-normal">
                            {t('megamenu.moong.origin')}
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => navigateToProduct('magic-urad-whole', e)}
                          className="w-full text-start font-semibold text-[#3C1518] hover:text-[#C8102E] transition-colors py-1 group flex flex-col cursor-pointer"
                          role="menuitem"
                        >
                          <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform font-bold">
                            {t('megamenu.urad.name')}
                          </span>
                          <span className="text-[10px] text-[#3C1518]/60 font-normal">
                            {t('megamenu.urad.origin')}
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* COLUMN 2: SPICES */}
                  <div>
                    <h3 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-[#3C1518] border-b border-[#3C1518]/15 pb-2 mb-3">
                      {t('megamenu.spices.title')}
                    </h3>
                    <ul className="space-y-2 text-xs">
                      <li>
                        <button
                          onClick={(e) => navigateToProduct('magic-haldi', e)}
                          className="w-full text-start font-semibold text-[#3C1518] hover:text-[#C8102E] transition-colors py-1 group flex flex-col cursor-pointer"
                          role="menuitem"
                        >
                          <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform font-bold">
                            {t('megamenu.haldi.name')}
                          </span>
                          <span className="text-[10px] text-[#3C1518]/60 font-normal">
                            {t('megamenu.haldi.origin')}
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => navigateToProduct('magic-jeera', e)}
                          className="w-full text-start font-semibold text-[#3C1518] hover:text-[#C8102E] transition-colors py-1 group flex flex-col cursor-pointer"
                          role="menuitem"
                        >
                          <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform font-bold">
                            {t('megamenu.jeera.name')}
                          </span>
                          <span className="text-[10px] text-[#3C1518]/60 font-normal">
                            {t('megamenu.jeera.origin')}
                          </span>
                        </button>
                      </li>
                      <li className="pt-2">
                        <button
                          onClick={(e) => navigateToShop('spices', e)}
                          className="text-[11px] font-bold text-[#C8102E] hover:underline transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>{t('nav.exploreAllSpices')}</span>
                          <ArrowIcon className="w-3 h-3" />
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* COLUMN 3: EXPLORE */}
                  <div>
                    <h3 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-[#3C1518] border-b border-[#3C1518]/15 pb-2 mb-3">
                      {t('megamenu.explore.title')}
                    </h3>
                    <ul className="space-y-2 text-xs">
                      <li>
                        <button
                          onClick={(e) => navigateToShop(undefined, e)}
                          className="w-full text-start font-semibold text-[#3C1518] hover:text-[#C8102E] transition-colors py-1 group flex items-center justify-between cursor-pointer"
                          role="menuitem"
                        >
                          <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                            {t('megamenu.explore.shopAll')}
                          </span>
                          <ArrowIcon className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => navigateToRecipes(undefined, e)}
                          className="w-full text-start font-semibold text-[#3C1518] hover:text-[#C8102E] transition-colors py-1 group flex items-center justify-between cursor-pointer"
                          role="menuitem"
                        >
                          <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                            {t('megamenu.explore.recipes')}
                          </span>
                          <ArrowIcon className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => navigateToBundles(undefined, e)}
                          className="w-full text-start font-semibold text-[#3C1518] hover:text-[#C8102E] transition-colors py-1 group flex items-center justify-between cursor-pointer"
                          role="menuitem"
                        >
                          <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                            {t('megamenu.explore.bundles')}
                          </span>
                          <ArrowIcon className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={navigateToImpact}
                          className="w-full text-start font-semibold text-[#3C1518] hover:text-[#C8102E] transition-colors py-1 group flex items-center justify-between cursor-pointer"
                          role="menuitem"
                        >
                          <span className="group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                            {t('megamenu.explore.impact')}
                          </span>
                          <ArrowIcon className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* FEATURED MAGIC PRODUCTS AREA (5 Cols) */}
                <div className={`col-span-12 lg:col-span-5 border-t lg:border-t-0 pt-6 lg:pt-0 ${isRTL ? 'lg:border-r border-[#3C1518]/10 lg:pr-8' : 'lg:border-l border-[#3C1518]/10 lg:pl-8'}`}>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#3C1518]/15">
                    <h3 className="font-display font-bold text-xs uppercase tracking-[0.18em] text-[#3C1518]">
                      {t('megamenu.favourites.title')}
                    </h3>
                    <span className="text-[10px] text-[#D4A843] font-bold uppercase tracking-wider">
                      {t('megamenu.favourites.tag')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
                    {FEATURED_PRODUCTS.map((prod) => (
                      <button
                        key={prod.slug}
                        onClick={(e) => navigateToProduct(prod.slug, e)}
                        className="bg-white/80 hover:bg-white rounded-xs p-2.5 border border-[#3C1518]/10 hover:border-[#C8102E]/40 shadow-xs hover:shadow-md transition-all text-start group cursor-pointer flex flex-col justify-between"
                        role="menuitem"
                      >
                        <div className="w-full h-20 sm:h-22 bg-[#FAF7F2] rounded-xs mb-2 flex items-center justify-center overflow-hidden p-1 border border-[#3C1518]/5">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="max-h-full max-w-full object-contain transform group-hover:scale-108 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#D4A843] block">
                            {prod.category}
                          </span>
                          <span className="font-bold text-xs text-[#3C1518] group-hover:text-[#C8102E] transition-colors line-clamp-1 block">
                            {prod.name}
                          </span>
                          <span className="text-[10px] text-[#3C1518]/60 line-clamp-1 block">
                            {prod.terroir}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* BOTTOM STRIP OF MEGA MENU */}
              <div className="pt-6 mt-6 border-t border-[#3C1518]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <button
                  onClick={(e) => navigateToShop(undefined, e)}
                  className="font-bold text-sm text-[#C8102E] hover:text-[#3C1518] flex items-center gap-2 group transition-colors cursor-pointer"
                >
                  <span className="tracking-wide">{t('nav.shopAllMagic')}</span>
                  <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2 text-[#3C1518]/60 text-[11px]">
                  <GrainIcon className="w-3.5 h-3.5" />
                  <span>{t('megamenu.guarantee')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ==================================================
          MOBILE SLIDE-OVER NAVIGATION DRAWER
          Warm Ivory overlay, accessible & minimum 44px targets
          Full RTL reversal when Arabic is active
          ================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#3C1518]/60 backdrop-blur-xs flex">
          {/* Drawer Panel */}
          <div
            className={`w-full max-w-sm bg-[#FDF6EC] text-[#3C1518] h-full shadow-2xl flex flex-col overflow-y-auto animate-in duration-200 ${
              isRTL ? 'slide-in-from-right mr-auto' : 'slide-in-from-left ml-0'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Drawer Header */}
            <div className="p-4 bg-[#C8102E] text-[#FDF6EC] flex items-center justify-between border-b border-[#A60D26]">
              <a href="#home" onClick={navigateToHome} aria-label="MAGIC Home">
                <MagicLogo size="sm" variant="white" withRegistered={true} />
              </a>

              {/* Language Switcher inside Mobile Header */}
              <div className="flex items-center bg-[#A60D26] p-0.5 rounded-full border border-[#D4A843]/40">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                    language === 'en' ? 'bg-[#FDF6EC] text-[#C8102E]' : 'text-white/80'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`px-2 py-0.5 text-xs font-bold rounded-full font-arabic ${
                    language === 'ar' ? 'bg-[#FDF6EC] text-[#C8102E]' : 'text-white/80'
                  }`}
                >
                  العربية
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-[#FDF6EC] hover:bg-[#A60D26] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Search Input */}
            <div className="p-4 border-b border-[#3C1518]/10 bg-[#FAF7F2]">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className={`w-4 h-4 text-[#3C1518]/40 absolute top-3 pointer-events-none ${isRTL ? 'right-3' : 'left-3'}`} />
                <input
                  type="text"
                  value={internalSearchQuery}
                  onChange={(e) => {
                    setInternalSearchQuery(e.target.value);
                    if (onSearchChange) onSearchChange(e.target.value);
                  }}
                  placeholder={t('search.placeholder')}
                  className={`w-full py-2.5 bg-white text-xs text-[#3C1518] placeholder-[#3C1518]/50 border border-[#D9D2C7] focus:border-[#C8102E] rounded-xs ${
                    isRTL ? 'pr-9 pl-9 text-right' : 'pl-9 pr-9 text-left'
                  }`}
                />
                {internalSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setInternalSearchQuery('');
                      if (onSearchChange) onSearchChange('');
                    }}
                    className={`absolute top-2.5 text-[#3C1518]/40 p-0.5 ${isRTL ? 'left-2.5' : 'right-2.5'}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>
            </div>

            {/* Nav Links Stack */}
            <nav className="flex-1 p-4 space-y-1 text-sm font-semibold">
              
              {/* SHOP ALL */}
              <div className="border-b border-[#3C1518]/10 pb-1">
                <button
                  onClick={(e) => navigateToShop(undefined, e)}
                  className="w-full py-3 px-2 flex items-center justify-between text-start font-bold text-base hover:text-[#C8102E] min-h-[44px] cursor-pointer"
                >
                  <span>{t('nav.shopAll')}</span>
                  <ArrowIcon className="w-4 h-4 text-[#C8102E]" />
                </button>
              </div>

              {/* SPICES ACCORDION */}
              <div className="border-b border-[#3C1518]/10 pb-1">
                <button
                  onClick={() => setMobileSpicesOpen((prev) => !prev)}
                  className="w-full py-3 px-2 flex items-center justify-between text-start font-bold text-base hover:text-[#C8102E] min-h-[44px] cursor-pointer"
                  aria-expanded={mobileSpicesOpen}
                >
                  <span>{t('nav.spices')}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileSpicesOpen ? 'rotate-180 text-[#C8102E]' : 'opacity-60'
                    }`}
                  />
                </button>

                {mobileSpicesOpen && (
                  <div className="px-4 pb-3 space-y-2 text-xs">
                    <div className="pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A843] block mb-1">
                        {t('megamenu.dals.title')}
                      </span>
                      <div className="space-y-1">
                        <button
                          onClick={(e) => navigateToProduct('magic-toor-dal', e)}
                          className="w-full text-start py-1.5 hover:text-[#C8102E] min-h-[36px] flex items-center cursor-pointer"
                        >
                          {t('megamenu.toor.name')}
                        </button>
                        <button
                          onClick={(e) => navigateToProduct('magic-masoor-dal', e)}
                          className="w-full text-start py-1.5 hover:text-[#C8102E] min-h-[36px] flex items-center cursor-pointer"
                        >
                          {t('megamenu.masoor.name')}
                        </button>
                        <button
                          onClick={(e) => navigateToProduct('magic-moong-whole', e)}
                          className="w-full text-start py-1.5 hover:text-[#C8102E] min-h-[36px] flex items-center cursor-pointer"
                        >
                          {t('megamenu.moong.name')}
                        </button>
                        <button
                          onClick={(e) => navigateToProduct('magic-urad-whole', e)}
                          className="w-full text-start py-1.5 hover:text-[#C8102E] min-h-[36px] flex items-center cursor-pointer"
                        >
                          {t('megamenu.urad.name')}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A843] block mb-1">
                        {t('megamenu.spices.title')}
                      </span>
                      <div className="space-y-1">
                        <button
                          onClick={(e) => navigateToProduct('magic-haldi', e)}
                          className="w-full text-start py-1.5 hover:text-[#C8102E] min-h-[36px] flex items-center cursor-pointer"
                        >
                          {t('megamenu.haldi.name')}
                        </button>
                        <button
                          onClick={(e) => navigateToProduct('magic-jeera', e)}
                          className="w-full text-start py-1.5 hover:text-[#C8102E] min-h-[36px] flex items-center cursor-pointer"
                        >
                          {t('megamenu.jeera.name')}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={(e) => navigateToShop(undefined, e)}
                      className="w-full text-start pt-2 font-bold text-[#C8102E] flex items-center gap-1 min-h-[36px] cursor-pointer"
                    >
                      <span>{t('nav.exploreAllSpices')}</span>
                      <ArrowIcon className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* BUNDLES */}
              <div className="border-b border-[#3C1518]/10 pb-1">
                <button
                  onClick={(e) => navigateToBundles(undefined, e)}
                  className="w-full py-3 px-2 flex items-center justify-between text-start font-bold text-base hover:text-[#C8102E] min-h-[44px] cursor-pointer"
                >
                  <span>{t('nav.bundles')}</span>
                  <span className="text-[10px] font-bold text-[#E8922F] uppercase bg-[#E8922F]/10 px-2 py-0.5 rounded">
                    Sets
                  </span>
                </button>
              </div>

              {/* RECIPES */}
              <div className="border-b border-[#3C1518]/10 pb-1">
                <button
                  onClick={(e) => navigateToRecipes(undefined, e)}
                  className="w-full py-3 px-2 flex items-center justify-between text-start font-bold text-base hover:text-[#C8102E] min-h-[44px] cursor-pointer"
                >
                  <span>{t('nav.recipes')}</span>
                  <span className="text-[10px] font-bold text-[#C8102E] uppercase bg-[#C8102E]/10 px-2 py-0.5 rounded">
                    Cook
                  </span>
                </button>
              </div>

              {/* DISCOVER ACCORDION */}
              <div className="border-b border-[#3C1518]/10 pb-1">
                <button
                  onClick={() => setMobileDiscoverOpen((prev) => !prev)}
                  className="w-full py-3 px-2 flex items-center justify-between text-start font-bold text-base hover:text-[#C8102E] min-h-[44px] cursor-pointer"
                  aria-expanded={mobileDiscoverOpen}
                >
                  <span>{t('nav.discover')}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileDiscoverOpen ? 'rotate-180 text-[#C8102E]' : 'opacity-60'
                    }`}
                  />
                </button>

                {mobileDiscoverOpen && (
                  <div className="px-4 pb-3 space-y-1.5 text-xs">
                    <button
                      onClick={navigateToImpact}
                      className="w-full text-start py-2 hover:text-[#C8102E] flex items-center gap-2 min-h-[40px] cursor-pointer"
                    >
                      <ImpactSproutIcon className="w-4 h-4 shrink-0" />
                      <span>{t('discover.impact.title')}</span>
                    </button>
                    <button
                      onClick={navigateToNewsletter}
                      className="w-full text-start py-2 hover:text-[#C8102E] flex items-center gap-2 min-h-[40px] cursor-pointer"
                    >
                      <NewsletterLetterIcon className="w-4 h-4 shrink-0" />
                      <span>{t('discover.newsletter.title')}</span>
                    </button>
                    <button
                      onClick={(e) => navigateToRecipes(undefined, e)}
                      className="w-full text-start py-2 hover:text-[#C8102E] flex items-center gap-2 min-h-[40px] cursor-pointer"
                    >
                      <RecipePotIcon className="w-4 h-4 shrink-0" />
                      <span>{t('discover.recipes.title')}</span>
                    </button>
                    <button
                      onClick={(e) => navigateToBundles(undefined, e)}
                      className="w-full text-start py-2 hover:text-[#C8102E] flex items-center gap-2 min-h-[40px] cursor-pointer"
                    >
                      <BundleBoxIcon className="w-4 h-4 shrink-0" />
                      <span>{t('discover.bundles.title')}</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Drawer Footer (UAE Only) */}
            <div className="p-4 bg-[#FAF7F2] border-t border-[#3C1518]/10 space-y-3">
              {/* Country indicator */}
              <div className="flex items-center justify-between text-xs text-[#3C1518]/70">
                <span className="font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>{t('account.region')} (AED)</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-[#2B6E2A]" />
              </div>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenCart();
                }}
                className="w-full py-2.5 px-4 bg-[#C8102E] hover:bg-[#A60D26] text-white font-bold text-xs rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[44px]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('cart.title')} ({totalCartItems})</span>
              </button>
            </div>
          </div>

          {/* Backdrop click to close */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </div>
  );
};
