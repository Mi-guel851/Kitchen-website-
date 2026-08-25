import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import CategoryTabs from './CategoryTabs';
import FoodCard from './FoodCard';
import { Search, X, SlidersHorizontal, Flame, Sparkles, Leaf } from 'lucide-react';

export default function MenuSection({ onOpenModal, searchInputRef }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'spicy', 'bestseller', 'veg'

  // Calculate counts for each category
  const categoryCounts = useMemo(() => {
    const counts = { all: MENU_ITEMS.length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = MENU_ITEMS.filter((item) => item.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Category match
      const matchCategory =
        activeCategory === 'all' || item.category === activeCategory;

      // 2. Search match
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.ingredients?.some((ing) => ing.toLowerCase().includes(query));

      // 3. Dietary / feature filter
      let matchFilter = true;
      if (activeFilter === 'spicy') {
        matchFilter = item.isSpicy;
      } else if (activeFilter === 'bestseller') {
        matchFilter = item.isBestSeller || item.isPopular;
      } else if (activeFilter === 'veg') {
        matchFilter = item.dietary?.some((d) => d.toLowerCase().includes('veg'));
      }

      return matchCategory && matchSearch && matchFilter;
    });
  }, [activeCategory, searchQuery, activeFilter]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <section id="menu" className="py-16 sm:py-24 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Menu Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#FF5A1F] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Fresh From The Kitchen
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Explore Our <span className="text-gradient-orange">Artisan Menu</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Every dish is prepared upon order using premium Angus beef, daily baked potato brioche, and fresh artisanal ingredients.
          </p>
        </div>

        {/* Search & Dietary Bar */}
        <div className="bg-[#12151F]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5 mb-8 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search burgers, wings, loaded fries, shakes, ingredients..."
                className="w-full bg-[#181C28] border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#FF5A1F] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Dietary Filters */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilter === 'all'
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setActiveFilter('bestseller')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeFilter === 'bestseller'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Popular
              </button>
              <button
                onClick={() => setActiveFilter('spicy')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeFilter === 'spicy'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                Spicy 🔥
              </button>
              <button
                onClick={() => setActiveFilter('veg')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeFilter === 'veg'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                Vegetarian 🌿
              </button>
            </div>

          </div>

          {/* Sticky Category Tabs */}
          <div className="pt-2 border-t border-white/5">
            <CategoryTabs
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              counts={categoryCounts}
            />
          </div>
        </div>

        {/* Results Info Bar */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{activeCategoryObj?.icon}</span>
            <h3 className="text-lg font-bold text-white">
              {activeCategoryObj?.name || 'All Menu'}
            </h3>
            <span className="text-xs text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {(searchQuery || activeFilter !== 'all' || activeCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
                setActiveCategory('all');
              }}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Menu Food Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-[#12151F]/50 rounded-3xl border border-white/5 p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-3xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-white">No items found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              We couldn't find anything matching "{searchQuery}". Try searching for burgers, wings, fries, or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
                setActiveCategory('all');
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#FF5A1F] text-white font-bold text-xs shadow-lg shadow-orange-500/20"
            >
              Show All Menu
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
