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
import dishPlaceholder from '../assets/dish-placeholder.jpg';

/**
 * Premium commerce cart — a calm white drawer.
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
        className="absolute inset-0 bg-cocoa-950/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Panel */}
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slide-in-right">
        <div className="flex w-full flex-col border-l border-cream-300 bg-cream-50 shadow-overlay">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cream-300 bg-white px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-cocoa-900 text-caramel-400">
                <ShoppingBag className="h-[18px] w-[18px]" />
              </span>
              <div>
                <h3 className="font-display text-lg font-extrabold tracking-tight text-cocoa-900">
                  Your Order
                </h3>
                <p className="text-[11px] font-semibold text-cocoa-500">
                  {cartItems.length} {cartItems.length === 1 ? 'dish' : 'dishes'} in cart
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-cocoa-400 transition-colors hover:text-ember-500"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                autoFocus
                className="btn-icon"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Fulfillment toggle + free delivery progress */}
          <div className="border-b border-cream-300 bg-white px-5 py-4 sm:px-6">
            <div className="grid grid-cols-2 gap-1 rounded-full border border-cream-300 bg-cream-100 p-1">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                aria-pressed={orderType === 'delivery'}
                className={`inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-bold transition-all duration-200 ${
                  orderType === 'delivery'
                    ? 'bg-cocoa-900 text-cream-50 shadow-btn'
                    : 'text-cocoa-500 hover:text-cocoa-900'
                }`}
              >
                <Bike className="h-4 w-4" />
                Delivery · 28m
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                aria-pressed={orderType === 'pickup'}
                className={`inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-bold transition-all duration-200 ${
                  orderType === 'pickup'
                    ? 'bg-cocoa-900 text-cream-50 shadow-btn'
                    : 'text-cocoa-500 hover:text-cocoa-900'
                }`}
              >
                <Store className="h-4 w-4" />
                Pickup
              </button>
            </div>

            {orderType === 'delivery' && (
              <div className="mt-3 rounded-xl border border-cream-300 bg-cream-100 px-3 py-2.5">
                <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold">
                  {isFreeDelivery ? (
                    <span className="flex items-center gap-1.5 font-bold text-success-500">
                      <Sparkles className="h-3 w-3" />
                      You&rsquo;ve unlocked FREE delivery
                    </span>
                  ) : (
                    <span className="text-cocoa-500">
                      Add{' '}
                      <strong className="font-extrabold text-caramel-600">
                        {formatPrice(amountLeftForFreeDelivery)}
                      </strong>{' '}
                      more for free delivery
                    </span>
                  )}
                  <span className="tabular-nums text-cocoa-400">{progressPercent}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-cream-300">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      isFreeDelivery ? 'bg-success-500' : 'bg-caramel-500'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4 sm:px-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.uniqueId}
                  className="flex gap-3.5 rounded-2xl border border-cream-300 bg-white p-3.5 transition-colors duration-200 hover:border-caramel-400/60"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      if (e.currentTarget.src !== dishPlaceholder) e.currentTarget.src = dishPlaceholder;
                    }}
                    className="h-16 w-16 shrink-0 rounded-xl border border-cream-300 object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2.5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-[13px] font-bold leading-tight text-cocoa-900">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.uniqueId)}
                          className="p-1 text-cocoa-400 transition-colors hover:text-ember-500"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {item.selectedExtras && item.selectedExtras.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {item.selectedExtras.map((e) => (
                            <span
                              key={e.id}
                              className="rounded-md border border-caramel-500/30 bg-caramel-50 px-1.5 py-0.5 text-[9.5px] font-semibold text-caramel-600"
                            >
                              +{e.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.specialInstructions && (
                        <p className="mt-1 truncate text-[11px] italic text-cocoa-400">
                          Note: &ldquo;{item.specialInstructions}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 rounded-full border border-cream-300 bg-cream-100 p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}
                          className="grid h-7 w-7 place-items-center rounded-full bg-white text-cocoa-800 shadow-sm transition-colors hover:bg-cream-200 active:scale-90"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus className="h-3 w-3" strokeWidth={2.6} />
                        </button>
                        <span
                          key={item.quantity}
                          className="w-6 animate-pop text-center text-xs font-extrabold text-cocoa-900 tabular-nums"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}
                          className="grid h-7 w-7 place-items-center rounded-full bg-cocoa-900 text-cream-50 transition-colors hover:bg-cocoa-800 active:scale-90"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus className="h-3 w-3" strokeWidth={2.6} />
                        </button>
                      </div>
                      <span className="font-display text-sm font-extrabold text-cocoa-900 tabular-nums">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-4 py-16 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-cream-300 bg-cream-100 text-4xl">
                  🍔
                </div>
                <div>
                  <h4 className="font-display text-base font-extrabold text-cocoa-900">
                    Your cart is empty
                  </h4>
                  <p className="mx-auto mt-1.5 max-w-[240px] text-xs leading-relaxed text-cocoa-500">
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
            <div className="space-y-4 border-t border-cream-300 bg-white px-5 py-4 sm:px-6 sm:py-5">
              {/* Coupon */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-xl border border-success-500/25 bg-success-500/[0.08] px-3.5 py-2.5 text-xs">
                  <span className="flex items-center gap-2 font-bold text-success-500">
                    <Tag className="h-3.5 w-3.5" />
                    {appliedCoupon.code} · {appliedCoupon.description}
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="font-bold text-cocoa-400 transition-colors hover:text-cocoa-900"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-cocoa-400" />
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Discount code · BIGBURGER20"
                      aria-label="Discount code"
                      className="w-full rounded-xl border border-cream-300 bg-cream-100 py-2.5 pl-9 pr-3 text-xs font-semibold uppercase tracking-wider text-cocoa-900 placeholder-cocoa-400 transition-all duration-200 focus:outline-none focus:border-caramel-500 focus:ring-2 focus:ring-caramel-500/25"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl border border-cocoa-900/15 bg-white px-4 text-xs font-bold text-cocoa-900 transition-colors hover:border-cocoa-900/40"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-cocoa-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-cocoa-900 tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between font-bold text-success-500">
                    <span>Discount</span>
                    <span className="tabular-nums">−{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-cocoa-500">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-[11px] font-extrabold uppercase text-success-500' : 'font-bold text-cocoa-900 tabular-nums'}>
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-cocoa-500">
                  <span>Eco packaging</span>
                  <span className="font-bold text-cocoa-900 tabular-nums">{formatPrice(packagingFee)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-cream-300 pt-2.5">
                  <span className="font-display text-sm font-bold text-cocoa-900">Total</span>
                  <span className="font-display text-[1.4rem] font-extrabold tracking-tight text-cocoa-900 tabular-nums">
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
                <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
