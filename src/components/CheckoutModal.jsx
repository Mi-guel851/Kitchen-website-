import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import confetti from 'canvas-confetti';
import {
  X,
  Bike,
  Store,
  CreditCard,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  MapPin,
  Phone,
  User,
  FileText
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    orderType,
    setOrderType,
    subtotal,
    discountAmount,
    deliveryFee,
    packagingFee,
    grandTotal,
    appliedCoupon,
    clearCart,
    setActiveOrder,
    setIsTrackerOpen,
    showToast
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pod'); // 'pod' (Pay on Delivery) or 'online'
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      showToast('Please provide your name and phone number', 'error', 'Missing Information');
      return;
    }

    if (orderType === 'delivery' && !address.trim()) {
      showToast('Please provide a delivery address', 'error', 'Missing Address');
      return;
    }

    setIsSubmitting(true);

    // Simulate payment / network order processing
    setTimeout(() => {
      // Trigger confetti celebration!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback
      }

      const randomOrderId = 'BB-' + Math.floor(10000 + Math.random() * 90000);
      const newOrder = {
        orderId: randomOrderId,
        status: 'confirmed', // 'confirmed' | 'kitchen' | 'delivery' | 'delivered'
        createdAt: new Date().toISOString(),
        orderType,
        customerName: fullName,
        phone,
        email,
        address: orderType === 'delivery' ? `${address}${landmark ? ` (Near ${landmark})` : ''}` : 'Big Burger HQ Pickup (14 Victoria Island Blvd)',
        deliveryNotes,
        paymentMethod: paymentMethod === 'pod' ? 'Pay on Delivery' : 'Instant Online Card Payment',
        items: [...cartItems],
        subtotal,
        discountAmount,
        deliveryFee,
        packagingFee,
        grandTotal,
        etaMinutes: orderType === 'delivery' ? 28 : 15,
        driver: {
          name: 'Adekunle M.',
          vehicle: 'Honda PCX (Black/Orange)',
          phone: '+234 812 345 6789'
        }
      };

      setActiveOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setIsTrackerOpen(true);
      showToast(`Order #${randomOrderId} placed successfully!`, 'success', 'Order Confirmed 🎉');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative w-full max-w-4xl my-8 rounded-3xl bg-[#10131D] border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#151926]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF5A1F]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Secure Checkout
              </h2>
              <p className="text-xs text-slate-400">
                Complete your order in 60 seconds
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Content Form */}
        <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 Columns: Delivery & Payment Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Order Type Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Order Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                      orderType === 'delivery'
                        ? 'bg-[#FF5A1F]/15 border-[#FF5A1F] text-white shadow-md'
                        : 'bg-[#151824] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bike className="w-5 h-5 text-[#FF5A1F]" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-white">Doorstep Delivery</div>
                      <div className="text-[10px] text-slate-400">25–35 mins ETA</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                      orderType === 'pickup'
                        ? 'bg-[#FF5A1F]/15 border-[#FF5A1F] text-white shadow-md'
                        : 'bg-[#151824] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Store className="w-5 h-5 text-amber-400" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-white">Store Pickup</div>
                      <div className="text-[10px] text-slate-400">Ready in 15 mins (Free)</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-amber-400" /> Customer Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. David Adeleke"
                      className="w-full bg-[#161A26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +234 812 345 6789"
                      className="w-full bg-[#161A26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Email Address (For receipt & live tracking link)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. david@gmail.com"
                    className="w-full bg-[#161A26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F]"
                  />
                </div>
              </div>

              {/* Delivery Address (if Delivery) */}
              {orderType === 'delivery' ? (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5A1F]" /> Delivery Address
                  </h4>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Street Address / House No. *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Flat 4B, 18 Adeola Odeku St, Victoria Island"
                      className="w-full bg-[#161A26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Nearest Landmark / Estate Gate
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="e.g. Beside Mega Plaza"
                        className="w-full bg-[#161A26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Driver Instructions
                      </label>
                      <input
                        type="text"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        placeholder="e.g. Call when at gate, ring buzzer"
                        className="w-full bg-[#161A26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Pickup Address notice */
                <div className="p-4 rounded-2xl bg-[#161A26] border border-white/10 flex items-start gap-3">
                  <Store className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="font-bold text-white">Pickup Location:</div>
                    <p className="text-slate-300 mt-0.5">
                      Big Burger Main Kitchen, 14 Victoria Island Boulevard, Lagos.
                    </p>
                    <p className="text-amber-400 mt-1 font-semibold">
                      Your order will be ready hot in approximately 15 minutes.
                    </p>
                  </div>
                </div>
              )}

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Payment Method
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pod')}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      paymentMethod === 'pod'
                        ? 'bg-emerald-500/15 border-emerald-500 text-white'
                        : 'bg-[#151824] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">Pay on Delivery</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Cash or POS card swipe on driver arrival
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      paymentMethod === 'online'
                        ? 'bg-[#FF5A1F]/15 border-[#FF5A1F] text-white'
                        : 'bg-[#151824] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#FF5A1F] shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">Online Payment</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Debit Card, Apple Pay, Bank Transfer
                      </div>
                    </div>
                  </button>
                </div>

                {/* Simulated Online Card Fields */}
                {paymentMethod === 'online' && (
                  <div className="p-4 rounded-2xl bg-[#161A26] border border-white/10 space-y-3 animate-in fade-in">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• 8842"
                        className="w-full bg-[#0F121A] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#FF5A1F]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-[#0F121A] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#FF5A1F]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-[#0F121A] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#FF5A1F]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>256-bit SSL encrypted & PCI-DSS certified</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right 5 Columns: Order Summary & Review */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              <div className="bg-[#151926] rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs text-amber-400 font-bold">
                    {cartItems.length} items
                  </span>
                </h3>

                {/* Items List */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.uniqueId} className="flex items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 rounded-md bg-white/10 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                          {item.quantity}x
                        </span>
                        <div className="truncate">
                          <span className="text-white font-medium truncate block">
                            {item.name}
                          </span>
                          {item.selectedExtras?.length > 0 && (
                            <span className="text-[10px] text-amber-400 truncate block">
                              +{item.selectedExtras.map((e) => e.name).join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-white shrink-0">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-300">
                    <span>Delivery</span>
                    <span className="font-semibold text-white">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-400 font-bold uppercase text-[10px]">FREE</span>
                      ) : (
                        formatPrice(deliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Eco Packaging</span>
                    <span className="font-semibold text-white">{formatPrice(packagingFee)}</span>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="font-black text-white text-base">Grand Total</span>
                    <span className="font-black text-amber-400 text-2xl">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Trust badge */}
                <div className="pt-3 text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sizzling hot guarantee: fresh in 28 mins</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] text-white font-black text-base shadow-xl shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Preparing Order Ticket...</span>
                ) : (
                  <>
                    <span>Place Order</span>
                    <span>•</span>
                    <span>{formatPrice(grandTotal)}</span>
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </>
                )}
              </button>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
