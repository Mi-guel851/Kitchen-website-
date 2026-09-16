import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { useLockBodyScroll, useEscape } from '../hooks/useMotion';
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
  MapPin,
  User,
} from 'lucide-react';

function SectionHeading({ step, icon, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ember-500/30 bg-ember-500/10 font-display text-[11px] font-bold text-ember-400">
        {step}
      </span>
      <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cream-100">
        {icon}
        {title}
      </h4>
    </div>
  );
}

/**
 * Checkout — calm, numbered sections (details → delivery → payment) with a
 * persistent order summary. All validation & order logic unchanged.
 */
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
    showToast,
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pod');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useLockBodyScroll(isCheckoutOpen);
  useEscape(() => setIsCheckoutOpen(false), isCheckoutOpen && !isSubmitting);

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

    setTimeout(() => {
      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } catch (err) {
        /* confetti is decorative */
      }

      const randomOrderId = 'BB-' + Math.floor(10000 + Math.random() * 90000);
      const newOrder = {
        orderId: randomOrderId,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        orderType,
        customerName: fullName,
        phone,
        email,
        address:
          orderType === 'delivery'
            ? `${address}${landmark ? ` (Near ${landmark})` : ''}`
            : 'Big Burger HQ Pickup (14 Victoria Island Blvd)',
        deliveryNotes,
        paymentMethod:
          paymentMethod === 'pod' ? 'Pay on Delivery' : 'Instant Online Card Payment',
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
          phone: '+234 812 345 6789',
        },
      };

      setActiveOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setIsTrackerOpen(true);
      showToast(`Order #${randomOrderId} placed successfully!`, 'success', 'Order Confirmed 🎉');
    }, 1200);
  };

  const inputClass =
    'w-full rounded-xl border border-white/[0.08] bg-ink-950/60 px-3.5 py-2.5 text-[13px] text-cream-50 placeholder-cream-600 transition-all duration-200 focus:outline-none focus:border-ember-500/70 focus:ring-2 focus:ring-ember-500/20';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink-950/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      <div
        className="relative flex my-4 flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-ink-850 shadow-glow-soft animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3.5">
            <span className="grid w-10 h-10 place-items-center rounded-xl border border-ember-500/25 bg-ember-500/10 text-ember-400">
              <Lock className="w-[18px] h-[18px]" />
            </span>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-cream-50">
                Secure Checkout
              </h2>
              <p className="text-[11px] text-cream-500">
                Complete your order in under a minute
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            autoFocus
            className="grid w-9 h-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-cream-400 transition-colors hover:text-cream-50 hover:bg-white/[0.08]"
            aria-label="Close checkout"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5 sm:p-7">
            {/* ===== Left: steps ===== */}
            <div className="lg:col-span-7 space-y-7">
              {/* 01 — Order method */}
              <section className="space-y-3">
                <SectionHeading
                  step="01"
                  title="Order Method"
                  icon={<Bike className="w-3.5 h-3.5 text-ember-400" />}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Order method">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    aria-pressed={orderType === 'delivery'}
                    className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                      orderType === 'delivery'
                        ? 'border-ember-500/70 bg-ember-500/[0.1]'
                        : 'border-white/[0.08] bg-ink-950/40 hover:border-white/[0.16]'
                    }`}
                  >
                    <Bike className={`w-5 h-5 shrink-0 ${orderType === 'delivery' ? 'text-ember-400' : 'text-cream-500'}`} />
                    <span>
                      <span className="block text-xs font-bold text-cream-50">Doorstep Delivery</span>
                      <span className="block text-[10.5px] text-cream-500">25–35 min ETA</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    aria-pressed={orderType === 'pickup'}
                    className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                      orderType === 'pickup'
                        ? 'border-ember-500/70 bg-ember-500/[0.1]'
                        : 'border-white/[0.08] bg-ink-950/40 hover:border-white/[0.16]'
                    }`}
                  >
                    <Store className={`w-5 h-5 shrink-0 ${orderType === 'pickup' ? 'text-ember-400' : 'text-cream-500'}`} />
                    <span>
                      <span className="block text-xs font-bold text-cream-50">Store Pickup</span>
                      <span className="block text-[10.5px] text-cream-500">Ready in 15 min · Free</span>
                    </span>
                  </button>
                </div>
              </section>

              {/* 02 — Customer details */}
              <section className="space-y-3">
                <SectionHeading
                  step="02"
                  title="Your Details"
                  icon={<User className="w-3.5 h-3.5 text-gold-400" />}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="co-name" className="field-label">Full Name *</label>
                    <input id="co-name" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. David Adeleke" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="co-phone" className="field-label">Phone Number *</label>
                    <input id="co-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 812 345 6789" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="co-email" className="field-label">Email (receipt & tracking link)</label>
                  <input id="co-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="david@gmail.com" className={inputClass} />
                </div>
              </section>

              {/* 03 — Delivery */}
              <section className="space-y-3">
                <SectionHeading
                  step="03"
                  title={orderType === 'delivery' ? 'Delivery Address' : 'Pickup Location'}
                  icon={<MapPin className="w-3.5 h-3.5 text-ember-400" />}
                />
                {orderType === 'delivery' ? (
                  <>
                    <div>
                      <label htmlFor="co-address" className="field-label">Street Address / House No. *</label>
                      <input id="co-address" type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Flat 4B, 18 Adeola Odeku St, Victoria Island" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="co-landmark" className="field-label">Nearest Landmark / Gate</label>
                        <input id="co-landmark" type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="Beside Mega Plaza" className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="co-notes" className="field-label">Driver Instructions</label>
                        <input id="co-notes" type="text" value={deliveryNotes} onChange={(e) => setDeliveryNotes(e.target.value)} placeholder="Call when at the gate" className={inputClass} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-ink-950/40 p-4">
                    <Store className="mt-0.5 w-5 h-5 shrink-0 text-gold-400" />
                    <div className="text-xs leading-relaxed">
                      <span className="font-bold text-cream-50">Pickup at:</span>{' '}
                      <span className="text-cream-300">
                        Big Burger Main Kitchen, 14 Victoria Island Boulevard, Lagos.
                      </span>
                      <p className="mt-1 font-semibold text-gold-300">
                        Ready hot in ~15 minutes.
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* 04 — Payment */}
              <section className="space-y-3">
                <SectionHeading
                  step="04"
                  title="Payment"
                  icon={<CreditCard className="w-3.5 h-3.5 text-emerald-400" />}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Payment method">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pod')}
                    aria-pressed={paymentMethod === 'pod'}
                    className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                      paymentMethod === 'pod'
                        ? 'border-emerald-400/60 bg-emerald-400/[0.08]'
                        : 'border-white/[0.08] bg-ink-950/40 hover:border-white/[0.16]'
                    }`}
                  >
                    <Banknote className={`w-5 h-5 ${paymentMethod === 'pod' ? 'text-emerald-400' : 'text-cream-500'}`} />
                    <span className="mt-2 block text-xs font-bold text-cream-50">Pay on Delivery</span>
                    <span className="mt-0.5 block text-[10.5px] leading-snug text-cream-500">
                      Cash or POS when your rider arrives
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    aria-pressed={paymentMethod === 'online'}
                    className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                      paymentMethod === 'online'
                        ? 'border-ember-500/70 bg-ember-500/[0.1]'
                        : 'border-white/[0.08] bg-ink-950/40 hover:border-white/[0.16]'
                    }`}
                  >
                    <CreditCard className={`w-5 h-5 ${paymentMethod === 'online' ? 'text-ember-400' : 'text-cream-500'}`} />
                    <span className="mt-2 block text-xs font-bold text-cream-50">Pay Online</span>
                    <span className="mt-0.5 block text-[10.5px] leading-snug text-cream-500">
                      Debit card, Apple Pay or transfer
                    </span>
                  </button>
                </div>

                {paymentMethod === 'online' && (
                  <div className="space-y-3 rounded-xl border border-white/[0.08] bg-ink-950/40 p-4 animate-fade-up">
                    <div>
                      <label htmlFor="co-card" className="field-label">Card Number</label>
                      <input id="co-card" type="text" maxLength={19} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4532 •••• •••• 8842" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="co-expiry" className="field-label">Expiry</label>
                        <input id="co-expiry" type="text" maxLength={5} value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/YY" className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="co-cvv" className="field-label">CVV</label>
                        <input id="co-cvv" type="password" maxLength={4} value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} placeholder="•••" className={inputClass} />
                      </div>
                    </div>
                    <p className="flex items-center gap-2 text-[10.5px] text-cream-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      256-bit SSL encrypted · PCI-DSS certified
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* ===== Right: summary ===== */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-6 space-y-4 rounded-2xl border border-white/[0.08] bg-ink-900/70 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cream-50">
                    Order Summary
                  </h3>
                  <span className="text-[11px] font-bold text-gold-300">
                    {cartItems.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                </div>

                <div className="max-h-44 space-y-2.5 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.uniqueId} className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="grid h-5 min-w-[20px] shrink-0 place-items-center rounded-md bg-ember-500/15 px-1 text-[10px] font-black text-ember-300">
                          {item.quantity}x
                        </span>
                        <div className="min-w-0">
                          <span className="block truncate font-semibold text-cream-100">{item.name}</span>
                          {item.selectedExtras?.length > 0 && (
                            <span className="block truncate text-[10px] text-gold-300/80">
                              +{item.selectedExtras.map((e) => e.name).join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 font-bold text-cream-100 tabular-nums">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 border-t border-white/[0.08] pt-3.5 text-xs">
                  <div className="flex justify-between text-cream-400">
                    <span>Subtotal</span>
                    <span className="font-bold text-cream-100 tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between font-bold text-emerald-400">
                      <span>Discount · {appliedCoupon.code}</span>
                      <span className="tabular-nums">−{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-cream-400">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? 'font-black text-[10px] uppercase text-emerald-400' : 'font-bold text-cream-100 tabular-nums'}>
                      {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-cream-400">
                    <span>Eco packaging</span>
                    <span className="font-bold text-cream-100 tabular-nums">{formatPrice(packagingFee)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/[0.08] pt-2.5">
                    <span className="font-display text-base font-bold text-cream-50">Grand Total</span>
                    <span className="font-display text-[1.5rem] font-extrabold tracking-tight text-gold-300 tabular-nums">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                <p className="flex items-center gap-2 text-[10.5px] text-cream-500">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                  Sizzling-hot guarantee — fresh within 28 minutes.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="btn-primary w-full !py-4"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse-soft">Preparing your order ticket…</span>
                  ) : (
                    <>
                      Place Order
                      <span className="rounded-lg bg-ink-950/25 px-2.5 py-1 font-display text-[13px] font-extrabold tabular-nums">
                        {formatPrice(grandTotal)}
                      </span>
                      <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
