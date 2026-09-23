import React from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';

export interface RecipeFilterState {
  meal?: string | null;
  product?: string | null;
  difficulty?: string | null;
  cookingTimeRange?: string | null;
  diet?: string | null;
}

interface RecipeFilterSidebarProps {
  filters: RecipeFilterState;
  onFilterChange: (filters: RecipeFilterState) => void;
  onClearFilters: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalFilteredCount: number;
}

export const RecipeFilterSidebar: React.FC<RecipeFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  isOpenMobile,
  onCloseMobile,
  totalFilteredCount,
}) => {
  const hasActiveFilters = Boolean(
    filters.meal ||
      filters.product ||
      filters.difficulty ||
      filters.cookingTimeRange ||
      filters.diet
  );

  const mealOptions = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snacks & Sides',
    'Drinks',
  ];

  const productOptions = [
    { label: 'Toor Dal', slug: 'magic-toor-dal' },
    { label: 'Masoor Dal', slug: 'magic-masoor-dal' },
    { label: 'Moong Whole', slug: 'magic-moong-whole' },
    { label: 'Urad Whole', slug: 'magic-urad-whole' },
    { label: 'Haldi', slug: 'magic-haldi' },
    { label: 'Jeera', slug: 'magic-jeera' },
  ];

  const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'];

  const timeOptions = [
    { label: 'Under 30 min', value: 'under-30' },
    { label: '30–60 min', value: '30-60' },
    { label: '60+ min', value: '60-plus' },
  ];

  const dietOptions = ['Vegetarian', 'Vegan', 'Dairy Free'];

  const sidebarContent = (
    <div className="flex flex-col gap-6 text-[#3C1518]">
      {/* Sidebar Header & Clear All */}
      <div className="flex items-center justify-between pb-3 border-b border-[#3C1518]/15">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#C8102E]" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#3C1518]">
            Filter Recipes
          </h2>
          <span className="text-[11px] font-mono text-[#3C1518]/50">
            ({totalFilteredCount})
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-[11px] font-bold text-[#C8102E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* FILTER 1: MEAL TYPE */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#3C1518]/70 block">
          Meal Type
        </span>
        <div className="flex flex-col gap-1 text-xs">
          {mealOptions.map((meal) => {
            const isSelected = filters.meal === meal;
            return (
              <label
                key={meal}
                className="flex items-center gap-2 py-1 px-1.5 rounded hover:bg-black/5 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="filter_meal"
                  checked={isSelected}
                  onChange={() =>
                    onFilterChange({
                      ...filters,
                      meal: isSelected ? null : meal,
                    })
                  }
                  className="w-3.5 h-3.5 accent-[#C8102E] cursor-pointer"
                />
                <span
                  className={
                    isSelected ? 'font-bold text-[#C8102E]' : 'text-[#3C1518]/80'
                  }
                >
                  {meal}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* FILTER 2: MAGIC PRODUCT */}
      <div className="space-y-2 pt-2 border-t border-[#3C1518]/10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#3C1518]/70 block">
          MAGIC Product
        </span>
        <div className="flex flex-col gap-1 text-xs">
          {productOptions.map((prod) => {
            const isSelected = filters.product === prod.slug;
            return (
              <label
                key={prod.slug}
                className="flex items-center gap-2 py-1 px-1.5 rounded hover:bg-black/5 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="filter_product"
                  checked={isSelected}
                  onChange={() =>
                    onFilterChange({
                      ...filters,
                      product: isSelected ? null : prod.slug,
                    })
                  }
                  className="w-3.5 h-3.5 accent-[#C8102E] cursor-pointer"
                />
                <span
                  className={
                    isSelected ? 'font-bold text-[#C8102E]' : 'text-[#3C1518]/80'
                  }
                >
                  {prod.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* FILTER 3: DIFFICULTY */}
      <div className="space-y-2 pt-2 border-t border-[#3C1518]/10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#3C1518]/70 block">
          Difficulty
        </span>
        <div className="flex flex-col gap-1 text-xs">
          {difficultyOptions.map((diff) => {
            const isSelected = filters.difficulty === diff;
            return (
              <label
                key={diff}
                className="flex items-center gap-2 py-1 px-1.5 rounded hover:bg-black/5 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="filter_difficulty"
                  checked={isSelected}
                  onChange={() =>
                    onFilterChange({
                      ...filters,
                      difficulty: isSelected ? null : diff,
                    })
                  }
                  className="w-3.5 h-3.5 accent-[#C8102E] cursor-pointer"
                />
                <span
                  className={
                    isSelected ? 'font-bold text-[#C8102E]' : 'text-[#3C1518]/80'
                  }
                >
                  {diff}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* FILTER 4: COOKING TIME */}
      <div className="space-y-2 pt-2 border-t border-[#3C1518]/10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#3C1518]/70 block">
          Cooking Time
        </span>
        <div className="flex flex-col gap-1 text-xs">
          {timeOptions.map((time) => {
            const isSelected = filters.cookingTimeRange === time.value;
            return (
              <label
                key={time.value}
                className="flex items-center gap-2 py-1 px-1.5 rounded hover:bg-black/5 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="filter_time"
                  checked={isSelected}
                  onChange={() =>
                    onFilterChange({
                      ...filters,
                      cookingTimeRange: isSelected ? null : time.value,
                    })
                  }
                  className="w-3.5 h-3.5 accent-[#C8102E] cursor-pointer"
                />
                <span
                  className={
                    isSelected ? 'font-bold text-[#C8102E]' : 'text-[#3C1518]/80'
                  }
                >
                  {time.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* FILTER 5: DIET */}
      <div className="space-y-2 pt-2 border-t border-[#3C1518]/10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#3C1518]/70 block">
          Diet
        </span>
        <div className="flex flex-col gap-1 text-xs">
          {dietOptions.map((diet) => {
            const isSelected = filters.diet === diet;
            return (
              <label
                key={diet}
                className="flex items-center gap-2 py-1 px-1.5 rounded hover:bg-black/5 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="filter_diet"
                  checked={isSelected}
                  onChange={() =>
                    onFilterChange({
                      ...filters,
                      diet: isSelected ? null : diet,
                    })
                  }
                  className="w-3.5 h-3.5 accent-[#C8102E] cursor-pointer"
                />
                <span
                  className={
                    isSelected ? 'font-bold text-[#C8102E]' : 'text-[#3C1518]/80'
                  }
                >
                  {diet}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* CLEAR ALL BUTTON */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="w-full py-2.5 px-4 bg-white border border-[#D9D2C7] hover:border-[#C8102E] text-[#C8102E] text-xs font-bold rounded-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-2xs mt-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR COLUMN */}
      <aside className="hidden lg:block w-64 shrink-0 bg-[#FAF7F2] border border-[#E6E0D6] rounded-xs p-5 self-start sticky top-20 shadow-2xs">
        {sidebarContent}
      </aside>

      {/* MOBILE DRAWER / OVERLAY */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="relative ml-auto w-full max-w-xs bg-[#FDF6EC] h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10 animate-in slide-in-from-right duration-250">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#3C1518]/15">
                <span className="font-serif font-bold text-lg text-[#3C1518]">
                  Filter Recipes
                </span>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="p-1 rounded text-[#3C1518] hover:bg-black/10 cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {sidebarContent}
            </div>

            <div className="pt-6 border-t border-[#3C1518]/15 mt-6">
              <button
                type="button"
                onClick={onCloseMobile}
                className="w-full py-3 bg-[#C8102E] hover:bg-[#A60D26] text-white font-bold text-xs rounded-xs shadow-xs cursor-pointer"
              >
                Apply & View ({totalFilteredCount}) Recipes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
