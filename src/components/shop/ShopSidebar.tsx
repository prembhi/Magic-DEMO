import React, { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { SHOP_CATEGORIES } from '../../data/shopProducts';

interface ShopSidebarProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  selectedSubItem?: string | null;
  onSelectSubItem?: (subItem: string | null) => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const ShopSidebar: React.FC<ShopSidebarProps> = ({
  selectedCategoryId,
  onSelectCategory,
  selectedSubItem = null,
  onSelectSubItem,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'dals-lentils': true,
    'whole-spices': true,
    'ground-spices': true,
    'masalas': false,
    'ready-mixes': false,
    'bundles-sets': false,
  });

  const toggleExpand = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    if (onSelectSubItem) {
      onSelectSubItem(null);
    }
    if (isMobileDrawer && onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  const handleSubItemClick = (catId: string, subItem: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectCategory(catId);
    if (onSelectSubItem) {
      onSelectSubItem(subItem);
    }
    if (isMobileDrawer && onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  return (
    <div
      className={`bg-white rounded border border-[#E6E0D6] ${
        isMobileDrawer ? 'h-full p-4 overflow-y-auto' : 'p-3'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#EAE4D9]">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#C8102E] block">
            SHOP MAGIC
          </span>
          <h2 className="text-sm font-bold text-[#3C1518] leading-tight">
            Categories
          </h2>
        </div>
        {isMobileDrawer && (
          <button
            onClick={onCloseMobileDrawer}
            className="p-1 text-[#3C1518]/60 hover:text-[#C8102E] cursor-pointer"
            aria-label="Close categories"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Dense Vertical Rows */}
      <nav className="flex flex-col space-y-0.5" aria-label="Grocery Categories">
        {SHOP_CATEGORIES.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          const isExpanded = !!expandedCategories[cat.id];
          const hasSubItems = cat.subItems && cat.subItems.length > 0;

          return (
            <div key={cat.id} className="flex flex-col">
              <div
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center justify-between py-1.5 px-2 rounded-xs cursor-pointer text-xs transition-colors ${
                  isSelected
                    ? 'bg-[#FDF2F4] text-[#C8102E] font-bold border-l-2 border-[#C8102E]'
                    : 'text-[#3C1518]/85 hover:bg-[#FAF7F2] hover:text-[#C8102E] font-medium'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="truncate">{cat.name}</span>
                  {!cat.isAvailable && (
                    <span className="text-[9px] font-bold text-[#3C1518]/40 uppercase bg-[#3C1518]/5 px-1 py-0.2 rounded-2xs">
                      Soon
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span
                    className={`text-[11px] ${
                      isSelected ? 'text-[#C8102E] font-bold' : 'text-[#3C1518]/45'
                    }`}
                  >
                    ({cat.count})
                  </span>

                  {hasSubItems && (
                    <button
                      onClick={(e) => toggleExpand(cat.id, e)}
                      className="p-0.5 text-[#3C1518]/40 hover:text-[#C8102E] cursor-pointer"
                      aria-label="Toggle subcategories"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Sub-items (Dense Indented Grocery List) */}
              {hasSubItems && isExpanded && (
                <div className="pl-4 pr-1 py-0.5 flex flex-col space-y-0.5 border-l border-[#EAE4D9] ml-2.5 my-0.5">
                  {cat.subItems!.map((sub) => {
                    const isSubActive = isSelected && selectedSubItem === sub;
                    return (
                      <button
                        key={sub}
                        onClick={(e) => handleSubItemClick(cat.id, sub, e)}
                        className={`text-left text-[11px] py-1 px-1.5 rounded-2xs transition-colors cursor-pointer flex items-center justify-between ${
                          isSubActive
                            ? 'text-[#C8102E] font-bold bg-[#FDF2F4]'
                            : 'text-[#3C1518]/70 hover:text-[#C8102E] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <span className="truncate">{sub}</span>
                        {isSubActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Trust Mini-Badge */}
      <div className="mt-4 pt-3 border-t border-[#EAE4D9] text-[11px] text-[#3C1518]/65 leading-tight">
        <p className="font-bold text-[#3C1518] text-[11px]">100% Optical Sorted</p>
        <p className="text-[10px] text-[#3C1518]/60 mt-0.5">Direct export seal on all pouches.</p>
      </div>
    </div>
  );
};
