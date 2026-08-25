import React from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { Star, Flame, Plus, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function BestSellers({ onOpenModal, onExploreAll }) {
  const { addToCart, isFavorite, toggleFavorite } = useCart();

  // Pick top 5 iconic best sellers
  const bestSellers = MENU_ITEMS.filter((item) => item.isBestSeller).slice(0, 5);

  return (
    <section id="favorites" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF5A1F]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Customer Favorites
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Most Craved <span className="text-gradient-orange">Best Sellers</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              The dishes that built our reputation. Hand-crafted daily, loved by thousands of burger enthusiasts across town.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="self-start md:self-auto inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-white group transition-colors"
          >
            <span>View All 25+ Items</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Best Sellers Grid - Featured Hero Item + 4 Grid Items */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Hero Card (e.g. Big Classic) */}
          {bestSellers[0] && (
            <div
              onClick={() => onOpenModal(bestSellers[0])}
              className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1B1F2D] to-[#12141C] border border-white/15 p-6 sm:p-8 flex flex-col justify-between group cursor-pointer shadow-2xl hover:border-orange-500/40 transition-all duration-300"
            >
              {/* Badge & Favorite */}
              <div className="flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-[#FF5A1F] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-orange-500/30 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-white" /> #1 Best Seller
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(bestSellers[0].id);
                  }}
                  className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                  aria-label="Save to favorites"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite(bestSellers[0].id)
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-white'
                    }`}
                  />
                </button>
              </div>

              {/* Large Image */}
              <div className="my-6 relative flex items-center justify-center overflow-hidden rounded-2xl">
                <img
                  src={bestSellers[0].image}
                  alt={bestSellers[0].name}
                  className="w-full h-64 sm:h-72 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-transparent opacity-60" />
              </div>

              {/* Info & Price */}
              <div className="space-y-4 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-400 text-sm font-black">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{bestSellers[0].rating}</span>
                    <span className="text-slate-400 font-medium text-xs">
                      ({bestSellers[0].reviewsCount} customer reviews)
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    28-min Fresh Delivery
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
                    {bestSellers[0].name}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {bestSellers[0].description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">
                      Starting at
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {formatPrice(bestSellers[0].price)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(bestSellers[0], 1);
                    }}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Sub-Grid: 4 other top favorites */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bestSellers.slice(1, 5).map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenModal(item)}
                className="relative rounded-3xl bg-[#141722]/80 hover:bg-[#1A1E2B] border border-white/10 hover:border-orange-500/30 p-5 flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 bg-black/40">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-black/75 backdrop-blur-md text-amber-300 border border-amber-500/30">
                      {item.badge}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:scale-110 active:scale-90 transition-all"
                    aria-label="Save to favorites"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFavorite(item.id)
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-white'
                      }`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {item.rating} ({item.reviewsCount})
                    </span>
                    <span className="text-slate-400 font-normal text-[11px]">
                      {item.prepTime}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Bar */}
                <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-base font-black text-white">
                    {formatPrice(item.price)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, 1);
                    }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-[#FF5A1F] text-white transition-all active:scale-95"
                    title="Add to cart"
                    aria-label="Add to cart"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
