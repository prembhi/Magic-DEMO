import React from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { BundleCategory, BundleMainUse } from '../../data/bundles';

export interface BundleFilterState {
  bundleTypes: BundleCategory[];
  mainUses: BundleMainUse[];
  includes: string[]; // e.g. ['Toor Dal', 'Masoor Dal', 'Moong Whole', 'Urad Whole', 'Haldi', 'Jeera']
  availability: ('In Stock' | 'Out of Stock')[];
}

interface BundleFilterSidebarProps {
  filters: BundleFilterState;
  onFilterChange: (newFilters: BundleFilterState) => void;
  onClearFilters: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalFilteredCount: number;
}

const BUNDLE_TYPES: BundleCategory[] = [
  'Dal Essentials',
  'Spice Pairings',
  'Starter Kits',
  'Family Bundles',
];

const MAIN_USES: BundleMainUse[] = [
  'Everyday Cooking',
  'Tadka & Tempering',
  'Dal & Curry',
  'Rice & Meals',
];

const INCLUDES_OPTIONS = [
  'Toor Dal',
  'Masoor Dal',
  'Moong Whole',
  'Urad Whole',
  'Haldi',
  'Jeera',
];

const AVAILABILITY_OPTIONS: ('In Stock' | 'Out of Stock')[] = [
  'In Stock',
  'Out of Stock',
];

export const BundleFilterSidebar: React.FC<BundleFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  isOpenMobile,
  onCloseMobile,
  totalFilteredCount,
}) => {
  const toggleBundleType = (type: BundleCategory) => {
    const exists = filters.bundleTypes.includes(type);
    onFilterChange({
      ...filters,
      bundleTypes: exists
        ? filters.bundleTypes.filter((t) => t !== type)
        : [...filters.bundleTypes, type],
    });
  };

  const toggleMainUse = (use: BundleMainUse) => {
    const exists = filters.mainUses.includes(use);
    onFilterChange({
      ...filters,
      mainUses: exists
        ? filters.mainUses.filter((u) => u !== use)
        : [...filters.mainUses, use],
    });
  };

  const toggleInclude = (item: string) => {
    const exists = filters.includes.includes(item);
    onFilterChange({
      ...filters,
      includes: exists
        ? filters.includes.filter((i) => i !== item)
        : [...filters.includes, item],
    });
  };

  const toggleAvailability = (status: 'In Stock' | 'Out of Stock') => {
    const exists = filters.availability.includes(status);
    onFilterChange({
      ...filters,
      availability: exists
        ? filters.availability.filter((a) => a !== status)
        : [...filters.availability, status],
    });
  };

  const activeFiltersCount =
    filters.bundleTypes.length +
    filters.mainUses.length +
    filters.includes.length +
    filters.availability.length;

  const content = (
    <div className="space-y-6">
      {/* Top Header & Clear All */}
      <div className="flex items-center justify-between pb-3 border-b border-[#3C1518]/12">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#3C1518]">
            FILTER BY
          </span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#C8102E] text-white text-[10px] font-bold flex items-center justify-center font-mono">
              {activeFiltersCount}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-[11px] font-bold text-[#C8102E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Group 1: Bundle Type */}
      <div>
        <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#3C1518]/70 font-semibold mb-2.5">
          BUNDLE TYPE
        </h4>
        <div className="space-y-2">
          {BUNDLE_TYPES.map((type) => {
            const checked = filters.bundleTypes.includes(type);
            return (
              <label
                key={type}
                className="flex items-center gap-2.5 text-xs text-[#3C1518]/85 cursor-pointer select-none group"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleBundleType(type)}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 rounded-2xs border flex items-center justify-center transition-colors ${
                    checked
                      ? 'bg-[#C8102E] border-[#C8102E] text-white'
                      : 'border-[#3C1518]/30 group-hover:border-[#C8102E]'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
                <span className="group-hover:text-[#C8102E] transition-colors">{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Group 2: Main Use */}
      <div className="pt-4 border-t border-[#3C1518]/10">
        <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#3C1518]/70 font-semibold mb-2.5">
          MAIN USE
        </h4>
        <div className="space-y-2">
          {MAIN_USES.map((use) => {
            const checked = filters.mainUses.includes(use);
            return (
              <label
                key={use}
                className="flex items-center gap-2.5 text-xs text-[#3C1518]/85 cursor-pointer select-none group"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMainUse(use)}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 rounded-2xs border flex items-center justify-center transition-colors ${
                    checked
                      ? 'bg-[#C8102E] border-[#C8102E] text-white'
                      : 'border-[#3C1518]/30 group-hover:border-[#C8102E]'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
                <span className="group-hover:text-[#C8102E] transition-colors">{use}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Group 3: Includes Products */}
      <div className="pt-4 border-t border-[#3C1518]/10">
        <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#3C1518]/70 font-semibold mb-2.5">
          INCLUDES
        </h4>
        <div className="space-y-2">
          {INCLUDES_OPTIONS.map((item) => {
            const checked = filters.includes.includes(item);
            return (
              <label
                key={item}
                className="flex items-center gap-2.5 text-xs text-[#3C1518]/85 cursor-pointer select-none group"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleInclude(item)}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 rounded-2xs border flex items-center justify-center transition-colors ${
                    checked
                      ? 'bg-[#C8102E] border-[#C8102E] text-white'
                      : 'border-[#3C1518]/30 group-hover:border-[#C8102E]'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
                <span className="group-hover:text-[#C8102E] transition-colors">{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Group 4: Availability */}
      <div className="pt-4 border-t border-[#3C1518]/10">
        <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#3C1518]/70 font-semibold mb-2.5">
          AVAILABILITY
        </h4>
        <div className="space-y-2">
          {AVAILABILITY_OPTIONS.map((status) => {
            const checked = filters.availability.includes(status);
            return (
              <label
                key={status}
                className="flex items-center gap-2.5 text-xs text-[#3C1518]/85 cursor-pointer select-none group"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAvailability(status)}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 rounded-2xs border flex items-center justify-center transition-colors ${
                    checked
                      ? 'bg-[#C8102E] border-[#C8102E] text-white'
                      : 'border-[#3C1518]/30 group-hover:border-[#C8102E]'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
                <span className="group-hover:text-[#C8102E] transition-colors">{status}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className="hidden lg:block w-60 shrink-0 bg-white border border-[#E6DFC8] rounded-xs p-5 shadow-2xs self-start sticky top-20"
        aria-label="Bundle Filters"
      >
        {content}
      </aside>

      {/* MOBILE SLIDE-OVER DRAWER */}
      {isOpenMobile && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          className="fixed inset-0 z-50 lg:hidden flex"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#3C1518]/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer Panel */}
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-6 z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#3C1518]/10 mb-4">
              <span className="text-sm font-serif font-black text-[#3C1518]">
                Filters ({totalFilteredCount})
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 text-[#3C1518]/70 hover:text-[#C8102E] rounded cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1">{content}</div>

            <div className="pt-4 border-t border-[#3C1518]/10 mt-6 flex gap-2">
              <button
                type="button"
                onClick={onClearFilters}
                className="flex-1 py-2.5 px-3 bg-white border border-[#D9CEBA] text-xs font-bold text-[#3C1518] rounded-2xs cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={onCloseMobile}
                className="flex-1 py-2.5 px-3 bg-[#C8102E] text-white text-xs font-bold uppercase rounded-2xs cursor-pointer"
              >
                Apply ({totalFilteredCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
