import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { Star, Heart, Plus, Minus, Flame, Eye, Check } from 'lucide-react';

/**
 * Premium food product card. Flat and refined at rest; rises with deeper
 * shadow, warmer border and a breathing image on hover.
 */
export default function FoodCard({ item, onOpenModal }) {
  const {
    addToCart,
    updateQuantity,
    getItemCountInCart,
    cartItems,
    isFavorite,
    toggleFavorite,
  } = useCart();

  const [justAdded, setJustAdded] = useState(false);

  const favorited = isFavorite(item.id);
  const cartCount = getItemCountInCart(item.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(item, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1100);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    const target = cartItems.find((i) => i.id === item.id);
    if (target) updateQuantity(target.uniqueId, target.quantity + 1);
    else addToCart(item, 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    const target = cartItems.find((i) => i.id === item.id);
    if (target) updateQuantity(target.uniqueId, target.quantity - 1);
  };

  return (
    <article
      onClick={() => onOpenModal(item)}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-ink-800 border border-white/[0.06] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-ember-500/25 hover:shadow-card-hover"
      aria-label={item.name}
    >
      {/* ===== Imagery dominates the card ===== */}
      <div className="relative w-full h-48 sm:h-52 shrink-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/15 to-transparent"
          aria-hidden="true"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 z-10">
          {item.isBestSeller ? (
            <span className="rounded-full bg-ember-500 px-2.5 py-1 text-[9.5px] font-black uppercase tracking-wider text-ink-950 shadow-md">
              Best Seller
            </span>
          ) : (
            item.badge && (
              <span className="rounded-full border border-gold-500/35 bg-ink-950/85 backdrop-blur-md px-2.5 py-1 text-[9.5px] font-black uppercase tracking-wider text-gold-300">
                {item.badge}
              </span>
            )
          )}
          {item.isSpicy && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-600/95 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
              <Flame className="w-2.5 h-2.5 fill-white" /> Spicy
            </span>
          )}
        </div>

        {/* Favorite */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          className="absolute top-3 right-3 z-10 grid w-9 h-9 place-items-center rounded-full bg-ink-950/60 backdrop-blur-md border border-white/[0.12] text-cream-200 transition-all duration-200 hover:scale-110 active:scale-90 hover:border-rose-400/40"
          aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              favorited ? 'fill-rose-500 text-rose-500 scale-110' : ''
            }`}
          />
        </button>

        {/* Quick view affordance (pointer devices only) */}
        <span
          className="pointer-events-none absolute bottom-3 left-3 z-10 hidden md:inline-flex items-center gap-1.5 rounded-full bg-ink-950/80 backdrop-blur-md border border-white/[0.1] px-2.5 py-1 text-[10.5px] font-bold text-cream-200 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
          aria-hidden="true"
        >
          <Eye className="w-3 h-3 text-ember-400" />
          Customize
        </span>

        {/* Prep time */}
        {item.prepTime && (
          <span className="absolute bottom-3 right-3 z-10 rounded-md bg-ink-950/75 backdrop-blur-md border border-white/[0.07] px-2 py-0.5 text-[10px] font-semibold text-cream-400">
            {item.prepTime}
          </span>
        )}
      </div>

      {/* ===== Details ===== */}
      <div className="flex flex-1 flex-col justify-between gap-3.5 p-4 sm:p-5">
        <div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 font-black text-gold-300">
              <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
              {item.rating.toFixed(1)}
              <span className="text-cream-600 font-semibold">
                ({item.reviewsCount})
              </span>
            </span>
            {item.calories && (
              <span className="text-cream-600 font-medium">{item.calories}</span>
            )}
          </div>

          <h3 className="mt-1.5 font-display text-[15px] sm:text-base font-bold tracking-tight text-cream-50 line-clamp-1 transition-colors duration-300 group-hover:text-gold-200">
            {item.name}
          </h3>

          <p className="mt-1 text-xs sm:text-[12.5px] text-cream-500 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Price + action */}
        <div className="flex items-end justify-between gap-3 border-t border-white/[0.06] pt-3.5">
          <div>
            <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-cream-600">
              From
            </span>
            <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-gold-300">
              {formatPrice(item.price)}
            </span>
          </div>

          <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
            {cartCount > 0 ? (
              <div className="flex items-center gap-0.5 rounded-full bg-ink-750 border border-white/[0.1] p-1">
                <button
                  type="button"
                  onClick={handleDecrement}
                  aria-label={`Decrease ${item.name} quantity`}
                  className="grid w-7 h-7 place-items-center rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-cream-100 transition-colors active:scale-90"
                >
                  <Minus className="w-3.5 h-3.5" strokeWidth={2.6} />
                </button>
                <span
                  key={cartCount}
                  className="w-7 text-center text-xs font-black text-cream-50 animate-pop"
                >
                  {cartCount}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  aria-label={`Increase ${item.name} quantity`}
                  className="grid w-7 h-7 place-items-center rounded-full bg-ember-500 hover:bg-ember-400 text-ink-950 transition-colors active:scale-90 shadow-md shadow-ember-500/30"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={2.6} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleQuickAdd}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-200 active:scale-90 ${
                  justAdded
                    ? 'bg-emerald-500 text-ink-950 shadow-lg shadow-emerald-500/30'
                    : 'bg-white/[0.06] border border-white/[0.1] text-cream-50 hover:bg-ember-500 hover:border-ember-500 hover:shadow-glow-ember'
                }`}
                aria-label={`Add ${item.name} to cart`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    Added
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" strokeWidth={2.6} />
                    Add
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
