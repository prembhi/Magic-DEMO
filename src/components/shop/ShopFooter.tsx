import React from 'react';
import { MAGIC_ASSETS } from '../../constants/assets';

interface ShopFooterProps {
  onNavigateHome: () => void;
  onSelectCategory?: (catId: string) => void;
}

export const ShopFooter: React.FC<ShopFooterProps> = ({
  onNavigateHome,
  onSelectCategory,
}) => {
  return (
    <footer className="w-full bg-[#2A0E10] text-[#FDF6EC] border-t border-[#3C1518] mt-12">
      {/* Main Multi-Column Content Area */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          {/* COL 1: SHOP */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              SHOP
            </h4>
            <ul className="space-y-2 text-[#FDF6EC]/70">
              <li>
                <button
                  onClick={onNavigateHome}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('all')}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-left text-white font-medium"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('dals-lentils')}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-left"
                >
                  Dals & Lentils
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('whole-spices')}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-left"
                >
                  Whole Spices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('ground-spices')}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-left"
                >
                  Ground Spices
                </button>
              </li>
            </ul>
          </div>

          {/* COL 2: SUPPORT */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              SUPPORT
            </h4>
            <ul className="space-y-2 text-[#FDF6EC]/70">
              <li>
                <a href="#contact" className="hover:text-[#D4A843] transition-colors">
                  Contact Kitchen Desk
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-[#D4A843] transition-colors">
                  Shipping & Dispatch
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-[#D4A843] transition-colors">
                  Returns & Guarantee
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#D4A843] transition-colors">
                  FAQ & Packaging
                </a>
              </li>
            </ul>
          </div>

          {/* COL 3: MAGIC */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              MAGIC
            </h4>
            <ul className="space-y-2 text-[#FDF6EC]/70">
              <li>
                <button
                  onClick={onNavigateHome}
                  className="hover:text-[#D4A843] transition-colors cursor-pointer text-left"
                >
                  Our Heritage Story
                </button>
              </li>
              <li>
                <a href="#quality" className="hover:text-[#D4A843] transition-colors">
                  Optical Sorting Standards
                </a>
              </li>
              <li>
                <a href="#kitchen" className="hover:text-[#D4A843] transition-colors">
                  Cook With Magic
                </a>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-[#D4A843] transition-colors">
                  Trade Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* COL 4: REGION */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              REGION
            </h4>
            <ul className="space-y-2 text-[#FDF6EC]/70">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2B6E2A]" />
                <span className="font-medium text-white">United Arab Emirates (AED)</span>
              </li>
              <li className="text-[#FDF6EC]/60 pl-3">
                Dubai, Abu Dhabi, Sharjah
              </li>
              <li className="flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
                <span>United States (USD)</span>
              </li>
              <li className="text-[#FDF6EC]/60 pl-3">
                Export Distribution
              </li>
            </ul>
          </div>

          {/* COL 5: BRAND & SOCIAL */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <img
                src={MAGIC_ASSETS.logo}
                alt="MAGIC"
                className="h-8 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-[11px] text-[#FDF6EC]/60 leading-relaxed mb-3">
              Authentic Indian staples and spices, sealed in airtight multi-barrier pouches.
            </p>
            <h5 className="font-bold text-white text-[11px] uppercase tracking-wider mb-2">
              SOCIAL
            </h5>
            <div className="flex items-center gap-3 text-[#FDF6EC]/70 text-xs">
              <span className="hover:text-[#D4A843] cursor-pointer">Instagram</span>
              <span>•</span>
              <span className="hover:text-[#D4A843] cursor-pointer">Facebook</span>
              <span>•</span>
              <span className="hover:text-[#D4A843] cursor-pointer">Pinterest</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="border-t border-white/10 bg-[#1F0B0D] py-4 text-[11px] text-[#FDF6EC]/50">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>© 2026 MAGIC Indian Spices & FMCG. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[#FDF6EC]/60">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Express Delivery UAE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
