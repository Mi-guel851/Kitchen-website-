import React from 'react';
import { CATEGORIES } from '../data/menuData';

export default function CategoryTabs({ activeCategory, onSelectCategory, counts }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max px-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = counts ? counts[cat.id] : null;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 select-none whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] text-white shadow-lg shadow-orange-500/25 border border-orange-400/40'
                  : 'bg-[#141722]/80 hover:bg-[#1C2130] text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <span className="text-base sm:text-lg transition-transform group-hover:scale-110">
                {cat.icon}
              </span>
              <span>{cat.name}</span>
              {typeof count === 'number' && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isActive
                      ? 'bg-black/30 text-white'
                      : 'bg-white/10 text-slate-400 group-hover:text-white'
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
