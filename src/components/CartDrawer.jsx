import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
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
  Check,
  Flame
} from 'lucide-react';

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
    couponCode,
    setCouponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyCoupon(inputCode);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Progress towards free delivery
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountLeftForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F121A] border-l border-white/15 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Top Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#141724]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#FF5A1F]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg">Your Order</h3>
                <p className="text-xs text-slate-400">
                  {cartItems.length} {cartItems.length === 1 ? 'dish' : 'dishes'} in cart
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-rose-400 transition-colors px-2 py-1"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery vs Pickup Toggle */}
          <div className="p-4 bg-[#171A26] border-b border-white/10">
            <div className="grid grid-cols-2 gap-2 bg-[#0E1017] p-1 rounded-2xl border border-white/10">
              <button
                onClick={() => setOrderType('delivery')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  orderType === 'delivery'
                    ? 'bg-[#FF5A1F] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Delivery (28m)</span>
              </button>

              <button
                onClick={() => setOrderType('pickup')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  orderType === 'pickup'
                    ? 'bg-[#FF5A1F] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Takeout / Pickup</span>
              </button>
            </div>

            {/* Free Delivery Bar (only if delivery is selected) */}
            {orderType === 'delivery' && (
              <div className="mt-3 bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
                  {isFreeDelivery ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> You qualified for FREE delivery!
                    </span>
                  ) : (
                    <span className="text-slate-300">
                      Add <strong className="text-amber-400 font-black">{formatPrice(amountLeftForFreeDelivery)}</strong> more for FREE delivery
                    </span>
                  )}
                  <span className="text-slate-400 font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF5A1F] to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.uniqueId}
                  className="p-3.5 rounded-2xl bg-[#151824] border border-white/10 hover:border-white/20 transition-all flex gap-3.5"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.uniqueId)}
                          className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected Extras */}
                      {item.selectedExtras && item.selectedExtras.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.selectedExtras.map((e) => (
                            <span
                              key={e.id}
                              className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-amber-300 font-medium"
                            >
                              +{e.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Special instructions */}
                      {item.specialInstructions && (
                        <p className="text-[11px] text-slate-400 italic mt-0.5 truncate">
                          Note: "{item.specialInstructions}"
                        </p>
                      )}
                    </div>

                    {/* Quantity & Unit Total */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center bg-[#0E1017] rounded-xl border border-white/10 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-[#FF5A1F] text-white flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-black text-white">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Empty Cart */
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-4xl shadow-inner">
                  🍔
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-white">Your cart is empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Looks like you haven't picked your favorite burger or feast yet.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#FF5A1F] text-white font-bold text-xs shadow-lg shadow-orange-500/25"
                >
                  Explore Menu
                </button>
              </div>
            )}
          </div>

          {/* Bottom Billing & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-[#141724] border-t border-white/10 space-y-4">
              
              {/* Voucher Code Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-emerald-300">
                        {appliedCoupon.code} ({appliedCoupon.description})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-white font-bold text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Discount code (e.g. BIGBURGER20)"
                        className="w-full bg-[#0E1017] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F] uppercase tracking-wider"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Subtotal & Totals Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-300">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-white">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold uppercase text-[11px]">FREE</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Eco Packaging</span>
                  <span className="font-semibold text-white">{formatPrice(packagingFee)}</span>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between text-sm sm:text-base font-black text-white">
                  <span>Total Amount</span>
                  <span className="text-amber-400 text-lg sm:text-xl">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
