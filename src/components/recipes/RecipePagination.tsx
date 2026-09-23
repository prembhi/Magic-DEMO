import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RecipePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

export const RecipePagination: React.FC<RecipePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      aria-label="Recipe pagination"
      className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-8 mt-6 border-t border-[#3C1518]/15"
    >
      <div className="text-xs text-[#3C1518]/70 font-mono">
        Showing <span className="font-bold text-[#3C1518]">{startItem}–{endItem}</span> of{' '}
        <span className="font-bold text-[#3C1518]">{totalItems}</span> recipes
      </div>

      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-2 rounded-xs border border-[#E6E0D6] bg-white text-[#3C1518] hover:border-[#C8102E] disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Number Buttons */}
        {pageNumbers.map((pageNum) => {
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-9 h-9 rounded-xs text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                isActive
                  ? 'bg-[#C8102E] text-white shadow-2xs border border-[#C8102E]'
                  : 'bg-white text-[#3C1518] border border-[#E6E0D6] hover:border-[#C8102E]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-xs border border-[#E6E0D6] bg-white text-[#3C1518] hover:border-[#C8102E] disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};
