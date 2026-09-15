import React from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import FoodCard from './FoodCard';
import Reveal from './ui/Reveal';
import { Star, Flame, Plus, Heart, ArrowRight } from 'lucide-react';

/**
 * Customer favorites — one hero "plate" card + four premium grid cards.
 */
export default function BestSellers({ onOpenModal, onExploreAll }) {
  const { addToCart, isFavorite, toggleFavorite } = useCart();

  const bestSellers = MENU_ITEMS.filter((item) => item.isBestSeller).slice(0, 5);
  const featured = bestSellers[0];

  return (
    <section id="favorites" className="relative py-16 sm:py-24 overflow-hidden">
      <div
        className="absolute top-1/3 -left-32 w-96 h-96 bg-ember-500/[0.06] blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
            <div>
              <p className="eyebrow">
                <span className="w-6 h-px bg-gold-500/60" aria-hidden="true" />
                Customer Favorites
              </p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.9rem] font-extrabold tracking-[-0.02em] leading-[1.02] text-cream-50">
                Most craved in the city
              </h2>
              <p className="mt-3 text-sm sm:text-base text-cream-400 max-w-lg">
                The plates that built our reputation — hand-crafted daily,
                ordered thousands of times.
              </p>
            </div>
            <button
              type="button"
              onClick={onExploreAll}
              className="group self-start md:self-auto inline-flex items-center gap-2 text-sm font-bold text-gold-300 hover:text-gold-200 transition-colors"
            >
              View full menu
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* ===== Hero plate card ===== */}
          {featured && (
            <Reveal className="lg:col-span-6 h-full">
              <article
                onClick={() => onOpenModal(featured)}
                className="group relative h-full flex flex-col rounded-[1.5rem] overflow-hidden bg-ink-800 border border-white/[0.07] cursor-pointer transition-all duration-500 hover:border-white/[0.14] hover:shadow-card-hover"
              >
                <div className="grid md:grid-cols-2 flex-1">
                  {/* Image */}
                  <div className="relative h-60 sm:h-72 md:h-full min-h-0">
                    <img
                      src={featured.image}
                      alt={featured.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ink-800/90 via-ink-800/10 md:via-transparent md:to-ink-800/90"
                      aria-hidden="true"
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ember-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-ink-950 shadow-glow-ember">
                      <Flame className="w-3 h-3 fill-ink-950" strokeWidth={2.5} />
                      #1 Best Seller
                    </span>
                  </div>

                  {/* Info */}
                  <div className="relative flex flex-col justify-center gap-4 p-6 sm:p-8">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 font-black text-gold-300">
                        <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                        {featured.rating}
                        <span className="text-cream-500 font-semibold">
                          ({featured.reviewsCount} reviews)
                        </span>
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                        28-min delivery
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-[1.7rem] font-extrabold tracking-tight leading-tight text-cream-50">
                      {featured.name}
                    </h3>

                    <p className="text-[13px] sm:text-sm text-cream-400 leading-relaxed line-clamp-3">
                      {featured.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {featured.ingredients.slice(0, 3).map((ing) => (
                        <span
                          key={ing}
                          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold text-cream-300"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <div>
                        <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-cream-600">
                          Starting at
                        </span>
                        <span className="font-display text-2xl sm:text-[1.7rem] font-extrabold text-gold-300">
                          {formatPrice(featured.price)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(featured, 1);
                        }}
                        className="btn-primary !px-5 !py-3 text-xs sm:text-sm"
                        aria-label={`Add ${featured.name} to cart`}
                      >
                        <Plus className="w-4 h-4" strokeWidth={2.6} />
                        Add to Order
                      </button>
                    </div>
                  </div>
                </div>

                {/* Favorite */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(featured.id);
                  }}
                  className="absolute top-4 right-4 z-10 grid w-10 h-10 place-items-center rounded-full bg-ink-950/70 backdrop-blur-md border border-white/[0.12] transition-all duration-200 hover:scale-110 active:scale-90"
                  aria-label={
                    isFavorite(featured.id)
                      ? 'Remove from favorites'
                      : 'Save to favorites'
                  }
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite(featured.id)
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-cream-200'
                    }`}
                  />
                </button>
              </article>
            </Reveal>
          )}

          {/* ===== Four supporting plates ===== */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {bestSellers.slice(1, 5).map((item, i) => (
              <Reveal key={item.id} delay={80 + i * 70} className="h-full">
                <FoodCard item={item} onOpenModal={onOpenModal} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
