import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { Star, Heart, Plus, Minus, Flame, Check } from 'lucide-react';
import dishPlaceholder from '../assets/dish-placeholder.jpg';

/**
 * Premium food product card — a quiet white menu tile.
 * Imagery leads; information and commerce controls sit below.
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
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-caramel-400/60 hover:shadow-card-hover"
      aria-label={item.name}
    >
      {/* ===== Imagery dominates the card ===== */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-cream-200">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== dishPlaceholder) e.currentTarget.src = dishPlaceholder;
          }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {item.isBestSeller ? (
            <span className="rounded-full bg-cocoa-900 px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-wider text-cream-50">
              Best Seller
            </span>
          ) : (
            item.badge && (
              <span className="rounded-full bg-white/95 px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-wider text-cocoa-800 shadow-sm backdrop-blur-sm">
                {item.badge}
              </span>
            )
          )}
          {item.isSpicy && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-ember-500 shadow-sm backdrop-blur-sm">
              <Flame className="h-2.5 w-2.5 fill-ember-500" /> Spicy
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
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-cocoa-700 shadow-sm transition-all duration-200 hover:scale-110 active:scale-90"
          aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-300 ${
              favorited ? 'fill-caramel-500 text-caramel-500' : ''
            }`}
          />
        </button>
      </div>

      {/* ===== Details ===== */}
      <div className="flex flex-1 flex-col justify-between gap-3.5 p-4 sm:p-5">
        <div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 font-extrabold text-cocoa-900">
              <Star className="h-3 w-3 fill-caramel-400 text-caramel-400" />
              {item.rating.toFixed(1)}
              <span className="font-semibold text-cocoa-400">({item.reviewsCount})</span>
            </span>
            {item.prepTime && (
              <span className="font-semibold text-cocoa-400">{item.prepTime}</span>
            )}
          </div>

          <h3 className="mt-1.5 font-display text-base font-extrabold tracking-tight text-cocoa-900 line-clamp-1 sm:text-[17px]">
            {item.name}
          </h3>

          <p className="mt-1 text-xs leading-relaxed text-cocoa-500 line-clamp-2 sm:text-[12.5px]">
            {item.description}
          </p>
        </div>

        {/* Price + action */}
        <div className="flex items-end justify-between gap-3 border-t border-cream-300 pt-3.5">
          <div>
            <span className="block text-[9px] font-extrabold uppercase tracking-[0.18em] text-cocoa-400">
              From
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-cocoa-900 sm:text-xl">
              {formatPrice(item.price)}
            </span>
          </div>

          <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
            {cartCount > 0 ? (
              <div className="flex items-center gap-0.5 rounded-full border border-cream-300 bg-cream-100 p-1">
                <button
                  type="button"
                  onClick={handleDecrement}
                  aria-label={`Decrease ${item.name} quantity`}
                  className="grid h-7 w-7 place-items-center rounded-full bg-white text-cocoa-800 shadow-sm transition-colors hover:bg-cream-200 active:scale-90"
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={2.6} />
                </button>
                <span
                  key={cartCount}
                  className="w-7 animate-pop text-center text-xs font-extrabold text-cocoa-900"
                >
                  {cartCount}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  aria-label={`Increase ${item.name} quantity`}
                  className="grid h-7 w-7 place-items-center rounded-full bg-cocoa-900 text-cream-50 transition-colors hover:bg-cocoa-800 active:scale-90"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleQuickAdd}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-200 active:scale-90 ${
                  justAdded
                    ? 'bg-success-500 text-white'
                    : 'bg-cocoa-900 text-cream-50 hover:bg-caramel-500 hover:text-cocoa-950'
                }`}
                aria-label={`Add ${item.name} to cart`}
              >
                {justAdded ? (
                  <>
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    Added
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
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
