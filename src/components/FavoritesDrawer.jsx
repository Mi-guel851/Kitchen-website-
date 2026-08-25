import React from 'react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/menuData';
import { formatPrice } from '../utils/format';
import { X, Heart, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function FavoritesDrawer({ onOpenModal }) {
  const {
    isFavoritesOpen,
    setIsFavoritesOpen,
    favorites,
    toggleFavorite,
    addToCart
  } = useCart();

  if (!isFavoritesOpen) return null;

  const favoriteProducts = MENU_ITEMS.filter((item) => favorites.includes(item.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsFavoritesOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F121A] border-l border-white/15 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#141724]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg">My Favorites</h3>
                <p className="text-xs text-slate-400">
                  {favoriteProducts.length} saved items
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsFavoritesOpen(false)}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {favoriteProducts.length > 0 ? (
              favoriteProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setIsFavoritesOpen(false);
                    onOpenModal(item);
                  }}
                  className="p-3.5 rounded-2xl bg-[#151824] border border-white/10 hover:border-white/20 transition-all flex gap-3.5 cursor-pointer group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id);
                          }}
                          className="text-slate-400 hover:text-rose-400 p-1"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-black text-amber-400">
                        {formatPrice(item.price)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item, 1);
                        }}
                        className="px-3 py-1 rounded-xl bg-white/10 hover:bg-[#FF5A1F] text-white text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-3xl">
                  ❤️
                </div>
                <h4 className="text-base font-bold text-white">No favorites saved yet</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click the heart icon on any burger or dish to save it here for quick ordering.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
