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

/**
 * Premium product detail — clear split between PRODUCT INFORMATION (left /
 * top) and ORDER CONFIGURATION (numbered steps, sticky action bar).
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 bg-ink-950/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="relative flex w-full sm:max-w-4xl flex-col sm:flex-row overflow-hidden bg-ink-850 border border-white/[0.09] sm:rounded-[1.75rem] rounded-t-[1.75rem] shadow-glow-soft animate-scale-in max-h-[94dvh] sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== Image ===== */}
        <div className="relative shrink-0 h-52 sm:h-auto sm:w-[44%]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-ink-850/90 via-ink-850/10 sm:via-transparent sm:to-ink-850/95"
            aria-hidden="true"
          />
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-auto sm:top-4 sm:left-4 sm:right-auto sm:flex sm:flex-col sm:items-start sm:gap-2 flex items-center gap-2">
            {product.badge && (
              <span className="rounded-full border border-gold-500/40 bg-ink-950/85 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider text-gold-300">
                {product.badge}
              </span>
            )}
            {product.isSpicy && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                <Flame className="w-3 h-3 fill-white" /> Spicy
              </span>
            )}
          </div>
        </div>

        {/* ===== Product info + order configuration ===== */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            {/* Title block */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-[1.55rem] sm:text-3xl font-extrabold tracking-tight leading-tight text-cream-50">
                  {product.name}
                </h2>
                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  className={`grid w-10 h-10 shrink-0 place-items-center rounded-full border transition-all duration-200 hover:scale-110 active:scale-90 ${
                    favorited
                      ? 'border-rose-400/40 bg-rose-500/10 text-rose-400'
                      : 'border-white/[0.1] bg-white/[0.04] text-cream-300'
                  }`}
                  aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-cream-400">
                <span className="flex items-center gap-1.5 font-black text-gold-300">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  {product.rating}
                  <span className="text-cream-500 font-semibold">
                    ({product.reviewsCount} reviews)
                  </span>
                </span>
                {product.calories && <span>{product.calories}</span>}
                {product.prepTime && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    {product.prepTime}
                  </span>
                )}
              </div>

              <p className="mt-3.5 text-[13px] sm:text-sm leading-relaxed text-cream-300/90">
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
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold text-cream-300"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 01 — Customize */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="flex items-center gap-2.5 text-xs font-black uppercase tracking-[0.18em] text-cream-100">
                  <span className="grid w-6 h-6 place-items-center rounded-full bg-ember-500/15 border border-ember-500/30 font-display text-[10px] font-bold text-ember-400">
                    01
                  </span>
                  Customize
                </h4>
                <span className="text-[11px] text-cream-600 font-semibold">
                  Optional · pick any
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="group" aria-label="Optional extras">
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
                          ? 'border-ember-500/70 bg-ember-500/[0.12] text-cream-50'
                          : 'border-white/[0.08] bg-ink-950/50 text-cream-300 hover:border-white/[0.16] hover:bg-ink-950/80'
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`grid w-5 h-5 shrink-0 place-items-center rounded-md border transition-colors ${
                            checked
                              ? 'border-ember-500 bg-ember-500 text-ink-950'
                              : 'border-white/25 bg-ink-950'
                          }`}
                          aria-hidden="true"
                        >
                          {checked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                        </span>
                        <span className="truncate text-xs font-semibold">{extra.name}</span>
                      </span>
                      <span className={`shrink-0 text-xs font-black ${checked ? 'text-ember-300' : 'text-gold-300'}`}>
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
                className="flex items-center gap-2.5 text-xs font-black uppercase tracking-[0.18em] text-cream-100"
              >
                <span className="grid w-6 h-6 place-items-center rounded-full bg-ember-500/15 border border-ember-500/30 font-display text-[10px] font-bold text-ember-400">
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
                className="mt-3 w-full resize-none rounded-xl border border-white/[0.08] bg-ink-950/50 px-4 py-3 text-[13px] text-cream-50 placeholder-cream-600 transition-all duration-200 focus:outline-none focus:border-ember-500/70 focus:ring-2 focus:ring-ember-500/20"
              />
            </div>
          </div>

          {/* Sticky order bar */}
          <div className="shrink-0 border-t border-white/[0.07] bg-ink-850/95 backdrop-blur-xl p-4 sm:p-5">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div
                className="flex items-center gap-1 rounded-full border border-white/[0.1] bg-ink-950/60 p-1"
                aria-label="Quantity"
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="grid w-9 h-9 place-items-center rounded-full bg-white/[0.05] text-cream-100 transition-colors hover:bg-white/[0.14] disabled:opacity-30 disabled:pointer-events-none active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" strokeWidth={2.6} />
                </button>
                <span
                  key={quantity}
                  className="w-8 text-center text-sm font-black text-cream-50 tabular-nums animate-pop"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="grid w-9 h-9 place-items-center rounded-full bg-white/[0.05] text-cream-100 transition-colors hover:bg-white/[0.14] active:scale-90"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" strokeWidth={2.6} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-primary flex-1 !py-3.5"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={2.4} />
                Add to Cart
                <span className="ml-1 rounded-lg bg-ink-950/25 px-2.5 py-1 font-display text-[13px] font-extrabold tabular-nums">
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
          className="absolute top-3.5 right-3.5 z-20 grid w-10 h-10 place-items-center rounded-full bg-ink-950/80 backdrop-blur-md border border-white/[0.15] text-cream-100 transition-all duration-200 hover:scale-105 hover:text-ember-400"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
