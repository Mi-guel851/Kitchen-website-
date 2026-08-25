import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { Star, Heart, Plus, Minus, Flame, Eye } from 'lucide-react';

export default function FoodCard({ item, onOpenModal }) {
  const {
    addToCart,
    updateQuantity,
    getItemCountInCart,
    cartItems,
    isFavorite,
    toggleFavorite,
  } = useCart();

  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const favorited = isFavorite(item.id);
  const cartCount = getItemCountInCart(item.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(item, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 600);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    // Find first cart item with this id to increment
    const target = cartItems.find((i) => i.id === item.id);
    if (target) {
      updateQuantity(target.uniqueId, target.quantity + 1);
    } else {
      addToCart(item, 1);
    }
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    const target = cartItems.find((i) => i.id === item.id);
    if (target) {
      updateQuantity(target.uniqueId, target.quantity - 1);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <div
      onClick={() => onOpenModal(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-3xl bg-[#141722]/80 hover:bg-[#1A1E2B]/90 border border-white/10 hover:border-[#FF5A1F]/40 backdrop-blur-xl shadow-lg hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1.5"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-black/40">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Gradient Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141722] via-black/20 to-transparent opacity-80" />

        {/* Badges: Popular / Best Seller / Chef Special */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {item.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow-md">
              {item.badge}
            </span>
          )}
          {item.isSpicy && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-500/90 text-white backdrop-blur-md flex items-center gap-1 w-max shadow-sm">
              <Flame className="w-2.5 h-2.5 fill-white" /> Spicy
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label="Save to favorites"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              favorited
                ? 'fill-rose-500 text-rose-500 scale-110'
                : 'text-white/80 hover:text-white'
            }`}
          />
        </button>

        {/* Quick View / Details pill on hover */}
        <div
          className={`absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-slate-200 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Eye className="w-3 h-3 text-[#FF5A1F]" />
          <span>Customize</span>
        </div>

        {/* Prep Time & Calorie tag */}
        {item.prepTime && (
          <div className="absolute bottom-3 right-3 z-10 text-[10px] text-slate-300 font-medium px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/5">
            {item.prepTime}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 justify-between gap-4">
        
        {/* Title, Rating & Description */}
        <div className="space-y-2">
          
          {/* Rating */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-400 font-black">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{item.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-medium text-[11px]">
                ({item.reviewsCount})
              </span>
            </div>
            {item.calories && (
              <span className="text-[11px] text-slate-400 font-medium">
                {item.calories}
              </span>
            )}
          </div>

          {/* Item Name */}
          <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#FF7A00] transition-colors line-clamp-1">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
            {item.description}
          </p>
        </div>

        {/* Price & Action Section */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
          
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Price
            </span>
            <span className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
              {formatPrice(item.price)}
            </span>
          </div>

          {/* Action: Quick Add or In-Cart Counter */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {cartCount > 0 ? (
              <div className="flex items-center bg-[#212635] rounded-xl border border-white/15 p-1 shadow-inner">
                <button
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-95"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-black text-white">
                  {cartCount}
                </span>
                <button
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                  className="w-7 h-7 rounded-lg bg-[#FF5A1F] hover:bg-[#E84A12] text-white flex items-center justify-center transition-colors active:scale-95 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleQuickAdd}
                className={`relative px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all duration-200 active:scale-95 ${
                  justAdded
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30 scale-105'
                    : 'bg-white/10 hover:bg-[#FF5A1F] text-white hover:shadow-orange-500/25 border border-white/10 hover:border-orange-500'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{justAdded ? 'Added!' : 'Add'}</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
