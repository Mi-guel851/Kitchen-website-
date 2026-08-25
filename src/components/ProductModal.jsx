import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { AVAILABLE_EXTRAS } from '../data/menuData';
import { formatPrice } from '../utils/format';
import {
  X,
  Plus,
  Minus,
  Star,
  Flame,
  Check,
  Heart,
  ShoppingBag,
  Sparkles,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function ProductModal({ product, onClose }) {
  const { addToCart, isFavorite, toggleFavorite } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!product) return null;

  const favorited = isFavorite(product.id);

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.id === extra.id);
      if (exists) {
        return prev.filter((e) => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const isExtraSelected = (extraId) => {
    return selectedExtras.some((e) => e.id === extraId);
  };

  // Calculate dynamic price
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = product.price + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedExtras, specialInstructions);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl my-8 rounded-3xl bg-[#121520] border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:text-[#FF5A1F] flex items-center justify-center transition-all hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Food Image Banner */}
          <div className="relative w-full h-64 sm:h-72 bg-black/60">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121520] via-black/30 to-transparent" />

            {/* Badges */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              {product.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/40 shadow-lg">
                  {product.badge}
                </span>
              )}
              {product.isSpicy && (
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                  <Flame className="w-3 h-3 fill-white" /> Hot & Spicy
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute bottom-4 right-6 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              aria-label="Favorite item"
            >
              <Heart
                className={`w-4 h-4 ${
                  favorited ? 'fill-rose-500 text-rose-500' : 'text-white'
                }`}
              />
            </button>
          </div>

          {/* Product Info Section */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Title, Rating & Base Price */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {product.name}
                </h2>
                <div className="text-xl sm:text-2xl font-black text-amber-400 shrink-0">
                  {formatPrice(product.price)}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
                {product.calories && (
                  <span className="text-slate-400">• {product.calories}</span>
                )}
                {product.prepTime && (
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    {product.prepTime}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Ingredients Tags */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Fresh Ingredients Included
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customizable Add-ons / Extras */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Customize Your Meal (Optional Extras)
                </h4>
                <span className="text-[11px] text-slate-400">Choose any</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {AVAILABLE_EXTRAS.map((extra) => {
                  const checked = isExtraSelected(extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                        checked
                          ? 'bg-[#FF5A1F]/15 border-[#FF5A1F] text-white'
                          : 'bg-[#181C28]/80 hover:bg-[#1E2333] border-white/10 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                            checked
                              ? 'bg-[#FF5A1F] border-[#FF5A1F] text-white'
                              : 'border-white/20 bg-black/30'
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold">{extra.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-400">
                        +{formatPrice(extra.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Extra napkins, sauce on the side, well-done bun..."
                className="w-full bg-[#181C28] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F] resize-none"
              />
            </div>

          </div>
        </div>

        {/* Sticky Bottom Modal Bar */}
        <div className="p-4 sm:p-6 bg-[#0E1017] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Controls */}
          <div className="flex items-center bg-[#1A1E2C] rounded-2xl border border-white/10 p-1.5 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center text-sm font-black text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </div>
            <span className="text-white bg-black/25 px-3 py-1 rounded-xl font-black">
              {formatPrice(totalPrice)}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}
