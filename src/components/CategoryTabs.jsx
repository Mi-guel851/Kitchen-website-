import React from 'react';
import { CATEGORIES } from '../data/menuData';

/**
 * Typographic category pills — active state is a chocolate pill.
 * Horizontal scroll on narrow screens.
 */
export default function CategoryTabs({ activeCategory, onSelectCategory, counts }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex min-w-max items-center gap-2 sm:gap-2.5">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = counts ? counts[cat.id] : null;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={isActive}
              className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-200 active:scale-95 sm:px-5 sm:text-[13px] ${
                isActive
                  ? 'bg-cocoa-900 text-cream-50 shadow-btn'
                  : 'border border-cream-300 bg-white text-cocoa-500 hover:border-cocoa-900/30 hover:text-cocoa-900'
              }`}
            >
              {cat.name}
              {typeof count === 'number' && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold leading-none ${
                    isActive
                      ? 'bg-white/15 text-cream-50'
                      : 'bg-cream-200 text-cocoa-400'
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
