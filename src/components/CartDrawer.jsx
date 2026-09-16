import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { useLockBodyScroll, useEscape } from '../hooks/useMotion';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Bike,
  Store,
} from 'lucide-react';

/**
 * Luxury commerce cart — drawer with a calm, information-rich layout.
 */
export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    deliveryFee,
    packagingFee,
    grandTotal,
    freeDeliveryThreshold,
    isFreeDelivery,
    orderType,
    setOrderType,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  useLockBodyScroll(isCartOpen);
  useEscape(() => setIsCartOpen(false), isCartOpen);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyCoupon(inputCode);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountLeftForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping cart">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-950/75 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md flex animate-slide-in-right">
        <div className="flex w-full flex-col bg-ink-900 border-l border-white/[0.08] shadow-glow-soft">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3.5">
              <span className="grid w-10 h-10 place-items-center rounded-xl border border-ember-500/25 bg-ember-500/10 text-ember-400">
                <ShoppingBag className="w-[18px] h-[18px]" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-cream-50">
                  Your Order
                </h3>
                <p className="text-[11px] text-cream-500 font-semibold">
                  {cartItems.length} {cartItems.length === 1 ? 'dish' : 'dishes'} in cart
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-cream-500 transition-colors hover:text-rose-300"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                autoFocus
                className="grid w-9 h-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-cream-400 transition-colors hover:text-cream-50 hover:bg-white/[0.08]"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Fulfillment toggle + free delivery progress */}
          <div className="border-b border-white/[0.07] px-5 py-4 sm:px-6">
            <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/[0.08] bg-ink-950/60 p-1">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                aria-pressed={orderType === 'delivery'}
                className={`inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all duration-200 ${
                  orderType === 'delivery'
                    ? 'bg-ember-500 text-ink-950 shadow-md shadow-ember-500/25'
                    : 'text-cream-400 hover:text-cream-100'
                }`}
              >
                <Bike className="w-4 h-4" />
                Delivery · 28m
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                aria-pressed={orderType === 'pickup'}
                className={`inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all duration-200 ${
                  orderType === 'pickup'
                    ? 'bg-ember-500 text-ink-950 shadow-md shadow-ember-500/25'
                    : 'text-cream-400 hover:text-cream-100'
                }`}
              >
                <Store className="w-4 h-4" />
                Pickup
              </button>
            </div>

            {orderType === 'delivery' && (
              <div className="mt-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
                <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold">
                  {isFreeDelivery ? (
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Sparkles className="w-3 h-3" />
                      You&rsquo;ve unlocked FREE delivery
                    </span>
                  ) : (
                    <span className="text-cream-400">
                      Add{' '}
                      <strong className="font-black text-gold-300">
                        {formatPrice(amountLeftForFreeDelivery)}
                      </strong>{' '}
                      more for free delivery
                    </span>
                  )}
                  <span className="text-cream-500 tabular-nums">{progressPercent}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-ink-950">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      isFreeDelivery
                        ? 'bg-gradient-to-r from-ember-500 to-emerald-400'
                        : 'bg-gradient-to-r from-ember-600 to-ember-400'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 space-y-3">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.uniqueId}
                  className="flex gap-3.5 rounded-2xl border border-white/[0.06] bg-ink-800/70 p-3.5 transition-colors duration-200 hover:border-white/[0.12]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 shrink-0 rounded-xl object-cover border border-white/[0.08]"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-[13px] font-bold leading-tight text-cream-50">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.uniqueId)}
                          className="p-1 text-cream-600 transition-colors hover:text-rose-400"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedExtras && item.selectedExtras.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {item.selectedExtras.map((e) => (
                            <span
                              key={e.id}
                              className="rounded-md border border-gold-500/20 bg-gold-500/[0.07] px-1.5 py-0.5 text-[9.5px] font-semibold text-gold-300"
                            >
                              +{e.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.specialInstructions && (
                        <p className="mt-1 truncate text-[11px] italic text-cream-600">
                          Note: &ldquo;{item.specialInstructions}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-ink-950/60 p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}
                          className="grid w-7 h-7 place-items-center rounded-full bg-white/[0.05] text-cream-100 transition-colors hover:bg-white/[0.14] active:scale-90"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus className="w-3 h-3" strokeWidth={2.6} />
                        </button>
                        <span
                          key={item.quantity}
                          className="w-6 text-center text-xs font-black text-cream-50 tabular-nums animate-pop"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}
                          className="grid w-7 h-7 place-items-center rounded-full bg-ember-500 text-ink-950 transition-colors hover:bg-ember-400 active:scale-90"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus className="w-3 h-3" strokeWidth={2.6} />
                        </button>
                      </div>
                      <span className="font-display text-sm font-extrabold text-gold-300 tabular-nums">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-4">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-white/[0.07] bg-white/[0.03] text-4xl shadow-inner">
                  🍔
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-cream-50">
                    Your cart is empty
                  </h4>
                  <p className="mx-auto mt-1.5 max-w-[240px] text-xs leading-relaxed text-cream-500">
                    The grill is hot — go pick your favorite burger or feast.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary !px-6 !py-3 text-xs"
                >
                  Explore menu
                </button>
              </div>
            )}
          </div>

          {/* Totals + checkout */}
          {cartItems.length > 0 && (
            <div className="space-y-4 border-t border-white/[0.07] bg-ink-900 px-5 py-4 sm:px-6 sm:py-5">
              {/* Coupon */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] px-3.5 py-2.5 text-xs">
                  <span className="flex items-center gap-2 font-bold text-emerald-300">
                    <Tag className="w-3.5 h-3.5" />
                    {appliedCoupon.code} · {appliedCoupon.description}
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="font-bold text-cream-500 transition-colors hover:text-cream-100"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="pointer-events-none absolute left-3 top-1/2 w-3.5 h-3.5 -translate-y-1/2 text-cream-600" />
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Discount code · BIGBURGER20"
                      aria-label="Discount code"
                      className="w-full rounded-xl border border-white/[0.08] bg-ink-950/60 py-2.5 pl-9 pr-3 text-xs font-semibold uppercase tracking-wider text-cream-50 placeholder-cream-600 transition-all duration-200 focus:outline-none focus:border-ember-500/70 focus:ring-2 focus:ring-ember-500/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 text-xs font-bold text-cream-100 transition-colors hover:bg-white/[0.12]"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-cream-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-cream-100 tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between font-bold text-emerald-400">
                    <span>Discount</span>
                    <span className="tabular-nums">−{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-cream-400">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? 'font-black text-emerald-400 text-[11px] uppercase' : 'font-bold text-cream-100 tabular-nums'}>
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-cream-400">
                  <span>Eco packaging</span>
                  <span className="font-bold text-cream-100 tabular-nums">{formatPrice(packagingFee)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.08] pt-2.5">
                  <span className="font-display text-sm font-bold text-cream-50">Total</span>
                  <span className="font-display text-[1.4rem] font-extrabold tracking-tight text-gold-300 tabular-nums">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="btn-primary w-full !py-4"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
