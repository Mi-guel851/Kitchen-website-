import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import CategoryTabs from './CategoryTabs';
import FoodCard from './FoodCard';
import Reveal from './ui/Reveal';
import {
  Search,
  X,
  Flame,
  Sparkles,
  Leaf,
  List,
} from 'lucide-react';

const FILTERS = [
  { id: 'all', label: 'All Items', icon: List },
  { id: 'bestseller', label: 'Popular', icon: Sparkles },
  { id: 'spicy', label: 'Spicy', icon: Flame },
  { id: 'veg', label: 'Vegetarian', icon: Leaf },
];

export default function MenuSection({ onOpenModal, searchInputRef }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const categoryCounts = useMemo(() => {
    const counts = { all: MENU_ITEMS.length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = MENU_ITEMS.filter((item) => item.category === cat.id)
          .length;
      }
    });
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory =
        activeCategory === 'all' || item.category === activeCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.ingredients?.some((ing) => ing.toLowerCase().includes(query));

      let matchFilter = true;
      if (activeFilter === 'spicy') matchFilter = item.isSpicy;
      else if (activeFilter === 'bestseller')
        matchFilter = item.isBestSeller || item.isPopular;
      else if (activeFilter === 'veg')
        matchFilter = item.dietary?.some((d) =>
          d.toLowerCase().includes('veg')
        );

      return matchCategory && matchSearch && matchFilter;
    });
  }, [activeCategory, searchQuery, activeFilter]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);
  const isFiltered =
    searchQuery !== '' || activeFilter !== 'all' || activeCategory !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setActiveCategory('all');
  };

  return (
    <section id="menu" className="py-16 sm:py-24">
      <div className="shell">
        {/* Header */}
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden="true" />
              Fresh From The Kitchen
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,5.6vw,2.9rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-cocoa-900">
              The burgers
              <br />
              you&rsquo;ve been craving.
            </h2>
            <p className="mt-4 text-sm text-cocoa-500 sm:text-base">
              Every dish is built to order — premium Angus beef, daily-baked
              brioche, and ingredients you can taste.
            </p>
          </div>
        </Reveal>

        {/* Search + filters */}
        <Reveal delay={80}>
          <div className="mt-8 space-y-3.5 sm:mt-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {/* Search */}
              <div className="relative w-full md:max-w-sm">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search burgers, wings, fries…"
                  aria-label="Search the menu"
                  className="input-light !rounded-full !py-3 pl-11 pr-10"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-cocoa-400 transition-colors hover:text-cocoa-900"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Feature filters */}
              <div
                className="flex items-center gap-2 w-full overflow-x-auto no-scrollbar md:w-auto md:flex-wrap"
                role="group"
                aria-label="Quick filters"
              >
                {FILTERS.map((f) => {
                  const isActive = activeFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActiveFilter(f.id)}
                      aria-pressed={isActive}
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                        isActive
                          ? 'bg-cocoa-900 text-cream-50 shadow-btn'
                          : 'border border-cream-300 bg-white text-cocoa-500 hover:border-cocoa-900/30 hover:text-cocoa-900'
                      }`}
                    >
                      <f.icon
                        className={`h-3.5 w-3.5 ${isActive ? 'text-caramel-400' : 'text-cocoa-400'}`}
                      />
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sticky category rail */}
            <div className="sticky top-16 z-30 -mx-4 border-y border-cream-300 bg-cream-100/95 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:px-3">
              <CategoryTabs
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                counts={categoryCounts}
              />
            </div>
          </div>
        </Reveal>

        {/* Results meta */}
        <div className="mb-6 mt-6 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <h3 className="truncate font-display text-lg font-extrabold text-cocoa-900">
              {activeCategoryObj?.name || 'All Menu'}
            </h3>
            <span className="shrink-0 rounded-full bg-cream-200 px-2.5 py-0.5 text-[11px] font-bold text-cocoa-500">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-caramel-600 transition-colors hover:text-caramel-500"
            >
              <X className="h-3.5 w-3.5" />
              Reset filters
            </button>
          )}
        </div>

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} onOpenModal={onOpenModal} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="mx-auto max-w-md rounded-3xl border border-cream-300 bg-white px-8 py-16 text-center">
            <div className="mx-auto mb-5 grid h-16 h-16 place-items-center rounded-full bg-cream-200">
              <Search className="h-6 w-6 text-cocoa-400" />
            </div>
            <h3 className="font-display text-lg font-extrabold text-cocoa-900">
              Nothing matches that craving
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-cocoa-500">
              We couldn&rsquo;t find anything for &ldquo;{searchQuery}&rdquo;.
              Try burgers, wings, fries — or reset your filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-primary mt-6 !px-6 !py-3 text-xs"
            >
              Show full menu
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
