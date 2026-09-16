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
    <section id="menu" className="relative py-16 sm:py-24">
      <div
        className="absolute top-1/4 -right-32 w-96 h-96 bg-gold-500/[0.05] blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <p className="eyebrow justify-center">
              <span className="w-6 h-px bg-gold-500/60" aria-hidden="true" />
              Fresh From The Kitchen
              <span className="w-6 h-px bg-gold-500/60" aria-hidden="true" />
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.9rem] font-extrabold tracking-[-0.02em] leading-[1.02] text-cream-50">
              Explore the artisan menu
            </h2>
            <p className="mt-3 text-sm sm:text-base text-cream-400">
              Every dish is built to order — premium Angus beef, daily-baked
              brioche, and ingredients you can taste.
            </p>
          </div>
        </Reveal>

        {/* Search + filters */}
        <Reveal delay={80}>
          <div className="rounded-[1.5rem] bg-ink-850/90 border border-white/[0.06] p-3.5 sm:p-5 shadow-card space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3.5">
              {/* Search */}
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-500 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search burgers, wings, fries, shakes…"
                  aria-label="Search the menu"
                  className="w-full bg-ink-950/80 border border-white/[0.08] rounded-xl pl-11 pr-10 py-3 text-sm text-cream-50 placeholder-cream-600 transition-all duration-200 focus:outline-none focus:border-ember-500/70 focus:ring-2 focus:ring-ember-500/20"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-cream-500 hover:text-cream-100 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Feature filters */}
              <div
                className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar"
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
                      className={`inline-flex items-center gap-1.5 rounded-full h-10 px-3.5 text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                        isActive
                          ? 'bg-cream-50 text-ink-950 shadow-md'
                          : 'text-cream-400 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:text-cream-100'
                      }`}
                    >
                      <f.icon
                        className={`w-3.5 h-3.5 ${isActive ? 'text-ember-600' : 'text-cream-500'}`}
                      />
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Sticky category rail */}
        <div className="sticky top-16 sm:top-[72px] z-30 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 bg-ink-950/85 backdrop-blur-xl sm:rounded-2xl sm:border sm:border-white/[0.05] sm:bg-ink-900/70 sm:my-4">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            counts={categoryCounts}
          />
        </div>

        {/* Results meta */}
        <div className="flex items-center justify-between mb-6 px-0.5">
          <div className="flex items-center gap-2.5">
            <span className="font-display text-lg font-bold text-cream-50">
              {activeCategoryObj?.name || 'All Menu'}
            </span>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-bold text-cream-500">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-300 hover:text-gold-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Reset filters
            </button>
          )}
        </div>

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredItems.map((item, i) => (
              <FoodCard key={item.id} item={item} onOpenModal={onOpenModal} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20 px-8 max-w-md mx-auto rounded-[1.5rem] border border-white/[0.05] bg-ink-850/50">
            <div className="mx-auto mb-5 grid w-16 h-16 place-items-center rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <Search className="w-6 h-6 text-cream-500" />
            </div>
            <h3 className="font-display text-lg font-bold text-cream-50">
              Nothing matches that craving
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-cream-500">
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
