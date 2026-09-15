import React from 'react';
import { CATEGORIES } from '../data/menuData';

/**
 * Typographic category pills — active state is an off-white "cream" pill,
 * the luxury-e-commerce way. Horizontal scroll on narrow screens.
 */
export default function CategoryTabs({ activeCategory, onSelectCategory, counts }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max pb-0.5">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = counts ? counts[cat.id] : null;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={isActive}
              className={`relative inline-flex items-center gap-2 rounded-full h-10 sm:h-11 px-4 sm:px-5 text-xs sm:text-[13px] font-bold tracking-wide whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-cream-50 text-ink-950 shadow-[0_8px_24px_-8px_rgba(250,246,239,0.35)]'
                  : 'text-cream-400 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:text-cream-100'
              }`}
            >
              {cat.name}
              {typeof count === 'number' && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-black leading-none ${
                    isActive
                      ? 'bg-ink-950/10 text-ink-950/60'
                      : 'bg-white/[0.06] text-cream-600'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
