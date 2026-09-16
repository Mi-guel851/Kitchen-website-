import React from 'react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/menuData';
import { formatPrice } from '../utils/format';
import { useLockBodyScroll, useEscape } from '../hooks/useMotion';
import { X, Heart, Plus, Trash2 } from 'lucide-react';
import dishPlaceholder from '../assets/dish-placeholder.jpg';

/**
 * Saved favorites — quick order list in a slide-in drawer.
 */
export default function FavoritesDrawer({ onOpenModal }) {
  const {
    isFavoritesOpen,
    setIsFavoritesOpen,
    favorites,
    toggleFavorite,
    addToCart,
  } = useCart();

  useLockBodyScroll(isFavoritesOpen);
  useEscape(() => setIsFavoritesOpen(false), isFavoritesOpen);

  if (!isFavoritesOpen) return null;

  const favoriteProducts = MENU_ITEMS.filter((item) => favorites.includes(item.id));

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Favorites"
    >
      <div
        className="absolute inset-0 bg-cocoa-950/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsFavoritesOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slide-in-right">
        <div className="flex w-full flex-col border-l border-cream-300 bg-cream-50 shadow-overlay">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cream-300 bg-white px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-caramel-100 text-caramel-600">
                <Heart className="h-[18px] w-[18px] fill-caramel-500" />
              </span>
              <div>
                <h3 className="font-display text-lg font-extrabold tracking-tight text-cocoa-900">
                  My Favorites
                </h3>
                <p className="text-[11px] font-semibold text-cocoa-500">
                  {favoriteProducts.length} saved {favoriteProducts.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsFavoritesOpen(false)}
              autoFocus
              className="btn-icon"
              aria-label="Close favorites"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4 sm:px-6">
            {favoriteProducts.length > 0 ? (
              favoriteProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setIsFavoritesOpen(false);
                    onOpenModal(item);
                  }}
                  className="group flex cursor-pointer gap-3.5 rounded-2xl border border-cream-300 bg-white p-3.5 transition-colors duration-200 hover:border-caramel-400/60"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      if (e.currentTarget.src !== dishPlaceholder) e.currentTarget.src = dishPlaceholder;
                    }}
                    className="h-16 w-16 shrink-0 rounded-xl border border-cream-300 object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                    <div>
                      <div className="flex items-start justify-between gap-1.5">
                        <h4 className="truncate text-[13px] font-bold text-cocoa-900">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id);
                          }}
                          className="p-1 text-cocoa-400 transition-colors hover:text-ember-500"
                          aria-label={`Remove ${item.name} from favorites`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-[11.5px] text-cocoa-500">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-extrabold text-cocoa-900 tabular-nums">
                        {formatPrice(item.price)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item, 1);
                        }}
                        className="inline-flex items-center gap-1 rounded-full bg-cocoa-900 px-3.5 py-1.5 text-xs font-bold text-cream-50 transition-all duration-200 hover:bg-caramel-500 hover:text-cocoa-950 active:scale-95"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-3 py-16 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-cream-300 bg-cream-100 text-3xl">
                  ❤️
                </div>
                <h4 className="font-display text-base font-extrabold text-cocoa-900">
                  No favorites saved yet
                </h4>
                <p className="mx-auto max-w-[240px] text-xs leading-relaxed text-cocoa-500">
                  Tap the heart on any burger or dish to save it here for
                  one-tap reordering.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
