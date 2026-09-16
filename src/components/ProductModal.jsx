import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { AVAILABLE_EXTRAS } from '../data/menuData';
import { formatPrice } from '../utils/format';
import { useLockBodyScroll, useEscape } from '../hooks/useMotion';
import {
  X,
  Plus,
  Minus,
  Star,
  Flame,
  Check,
  Heart,
  ShoppingBag,
  Clock,
} from 'lucide-react';
import dishPlaceholder from '../assets/dish-placeholder.jpg';

/**
 * Product detail — clear split between product information and order
 * configuration, with a sticky action bar.
 */
export default function ProductModal({ product, onClose }) {
  const { addToCart, isFavorite, toggleFavorite } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  useLockBodyScroll(!!product);
  useEscape(onClose, !!product);

  if (!product) return null;

  const favorited = isFavorite(product.id);

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const isExtraSelected = (id) => selectedExtras.some((e) => e.id === id);

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = product.price + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedExtras, specialInstructions);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-cocoa-950/55 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-4xl border border-cream-300 bg-cream-50 shadow-overlay animate-scale-in sm:max-w-4xl sm:flex-row sm:rounded-4xl sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== Image ===== */}
        <div className="relative h-52 shrink-0 overflow-hidden bg-cream-200 sm:h-auto sm:w-[44%]">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              if (e.currentTarget.src !== dishPlaceholder) e.currentTarget.src = dishPlaceholder;
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 sm:bottom-auto sm:left-4 sm:right-auto sm:top-4 sm:flex sm:flex-col sm:items-start sm:gap-2">
            {product.badge && (
              <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cocoa-800 shadow-sm backdrop-blur-sm">
                {product.badge}
              </span>
            )}
            {product.isSpicy && (
              <span className="inline-flex items-center gap-1 rounded-full bg-cocoa-900 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cream-50">
                <Flame className="h-3 w-3 fill-caramel-400 text-caramel-400" /> Spicy
              </span>
            )}
          </div>
        </div>

        {/* ===== Product info + order configuration ===== */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">
            {/* Title block */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-[1.55rem] font-extrabold leading-tight tracking-tight text-cocoa-900 sm:text-3xl">
                  {product.name}
                </h2>
                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-200 hover:scale-110 active:scale-90 ${
                    favorited
                      ? 'border-caramel-500/50 bg-caramel-50 text-caramel-500'
                      : 'border-cream-300 bg-white text-cocoa-500'
                  }`}
                  aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
                >
                  <Heart className={`h-4 w-4 ${favorited ? 'fill-caramel-500 text-caramel-500' : ''}`} />
                </button>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-cocoa-500">
                <span className="flex items-center gap-1.5 font-extrabold text-cocoa-900">
                  <Star className="h-3.5 w-3.5 fill-caramel-400 text-caramel-400" />
                  {product.rating}
                  <span className="font-semibold text-cocoa-400">
                    ({product.reviewsCount} reviews)
                  </span>
                </span>
                {product.calories && <span>{product.calories}</span>}
                {product.prepTime && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-caramel-500" />
                    {product.prepTime}
                  </span>
                )}
              </div>

              <p className="mt-3.5 text-[13px] leading-relaxed text-cocoa-500 sm:text-sm">
                {product.description}
              </p>
            </div>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h4 className="field-label">What&rsquo;s inside</h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-cream-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-cocoa-700"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 01 — Customize */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h4 className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.18em] text-cocoa-900">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-caramel-100 font-display text-[10px] font-bold text-caramel-600">
                    01
                  </span>
                  Customize
                </h4>
                <span className="text-[11px] font-semibold text-cocoa-400">
                  Optional · pick any
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2" role="group" aria-label="Optional extras">
                {AVAILABLE_EXTRAS.map((extra) => {
                  const checked = isExtraSelected(extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      aria-pressed={checked}
                      className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${
                        checked
                          ? 'border-caramel-500 bg-caramel-50 text-cocoa-900'
                          : 'border-cream-300 bg-white text-cocoa-700 hover:border-cocoa-900/30'
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                            checked
                              ? 'border-caramel-500 bg-caramel-500 text-cocoa-950'
                              : 'border-cream-400 bg-cream-100'
                          }`}
                          aria-hidden="true"
                        >
                          {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                        </span>
                        <span className="truncate text-xs font-semibold">{extra.name}</span>
                      </span>
                      <span className={`shrink-0 text-xs font-extrabold ${checked ? 'text-caramel-600' : 'text-cocoa-500'}`}>
                        +{formatPrice(extra.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 02 — Instructions */}
            <div>
              <label
                htmlFor="special-instructions"
                className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.18em] text-cocoa-900"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-caramel-100 font-display text-[10px] font-bold text-caramel-600">
                  02
                </span>
                Special instructions
              </label>
              <textarea
                id="special-instructions"
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. sauce on the side, extra crispy bun…"
                className="input-light mt-3 resize-none"
              />
            </div>
          </div>

          {/* Sticky order bar */}
          <div className="shrink-0 border-t border-cream-300 bg-white/95 p-4 backdrop-blur-xl sm:p-5">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div
                className="flex items-center gap-1 rounded-full border border-cream-300 bg-cream-100 p-1"
                aria-label="Quantity"
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-cocoa-800 shadow-sm transition-colors hover:bg-cream-200 disabled:pointer-events-none disabled:opacity-30 active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" strokeWidth={2.6} />
                </button>
                <span
                  key={quantity}
                  className="w-8 animate-pop text-center text-sm font-extrabold text-cocoa-900 tabular-nums"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-cocoa-800 shadow-sm transition-colors hover:bg-cream-200 active:scale-90"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" strokeWidth={2.6} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-primary flex-1 !py-3.5 whitespace-nowrap"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={2.4} />
                <span className="sm:hidden">Add</span>
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="rounded-lg bg-cream-50/15 px-2.5 py-1 font-display text-[13px] font-extrabold tabular-nums">
                  {formatPrice(totalPrice)}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="absolute right-3.5 top-3.5 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-cocoa-800 shadow-float backdrop-blur-md transition-all duration-200 hover:scale-105 hover:text-cocoa-900"
          aria-label="Close product details"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
