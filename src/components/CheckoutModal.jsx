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
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-caramel-100 font-display text-[11px] font-bold text-caramel-600">
        {step}
      </span>
      <h4 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cocoa-900">
        {icon}
        {title}
      </h4>
    </div>
  );
}

/**
 * Checkout — calm, numbered sections (details → delivery → payment) with a
 * persistent chocolate order summary. All validation & order logic unchanged.
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

  const inputClass = 'input-light !py-2.5 text-[13px]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-cocoa-950/55 p-3 backdrop-blur-sm animate-fade-in sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      <div
        className="relative my-4 flex max-h-[94dvh] w-full max-w-4xl flex-col overflow-hidden rounded-4xl border border-cream-300 bg-cream-50 shadow-overlay animate-scale-in sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-cream-300 bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cocoa-900 text-caramel-400">
              <Lock className="h-[18px] w-[18px]" />
            </span>
            <div>
              <h2 className="font-display text-lg font-extrabold tracking-tight text-cocoa-900 sm:text-xl">
                Secure Checkout
              </h2>
              <p className="text-[11px] text-cocoa-500">
                Complete your order in under a minute
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            autoFocus
            className="btn-icon"
            aria-label="Close checkout"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-8 p-5 sm:p-7 lg:grid-cols-12">
            {/* ===== Left: steps ===== */}
            <div className="space-y-7 lg:col-span-7">
              {/* 01 — Order method */}
              <section className="space-y-3">
                <SectionHeading
                  step="01"
                  title="Order Method"
                  icon={<Bike className="h-3.5 w-3.5 text-caramel-500" />}
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="group" aria-label="Order method">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    aria-pressed={orderType === 'delivery'}
                    className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                      orderType === 'delivery'
                        ? 'border-caramel-500 bg-caramel-50'
                        : 'border-cream-300 bg-white hover:border-cocoa-900/30'
                    }`}
                  >
                    <Bike className={`h-5 w-5 shrink-0 ${orderType === 'delivery' ? 'text-caramel-600' : 'text-cocoa-400'}`} />
                    <span>
                      <span className="block text-xs font-bold text-cocoa-900">Doorstep Delivery</span>
                      <span className="block text-[10.5px] text-cocoa-500">25–35 min ETA</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    aria-pressed={orderType === 'pickup'}
                    className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                      orderType === 'pickup'
                        ? 'border-caramel-500 bg-caramel-50'
                        : 'border-cream-300 bg-white hover:border-cocoa-900/30'
                    }`}
                  >
                    <Store className={`h-5 w-5 shrink-0 ${orderType === 'pickup' ? 'text-caramel-600' : 'text-cocoa-400'}`} />
                    <span>
                      <span className="block text-xs font-bold text-cocoa-900">Store Pickup</span>
                      <span className="block text-[10.5px] text-cocoa-500">Ready in 15 min · Free</span>
                    </span>
                  </button>
                </div>
              </section>

              {/* 02 — Customer details */}
              <section className="space-y-3">
                <SectionHeading
                  step="02"
                  title="Your Details"
                  icon={<User className="h-3.5 w-3.5 text-caramel-500" />}
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                  icon={<MapPin className="h-3.5 w-3.5 text-caramel-500" />}
                />
                {orderType === 'delivery' ? (
                  <>
                    <div>
                      <label htmlFor="co-address" className="field-label">Street Address / House No. *</label>
                      <input id="co-address" type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Flat 4B, 18 Adeola Odeku St, Victoria Island" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                  <div className="flex items-start gap-3 rounded-2xl border border-cream-300 bg-white p-4">
                    <Store className="mt-0.5 h-5 w-5 shrink-0 text-caramel-500" />
                    <div className="text-xs leading-relaxed">
                      <span className="font-bold text-cocoa-900">Pickup at:</span>{' '}
                      <span className="text-cocoa-500">
                        Big Burger Main Kitchen, 14 Victoria Island Boulevard, Lagos.
                      </span>
                      <p className="mt-1 font-bold text-caramel-600">
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
                  icon={<CreditCard className="h-3.5 w-3.5 text-caramel-500" />}
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="group" aria-label="Payment method">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pod')}
                    aria-pressed={paymentMethod === 'pod'}
                    className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                      paymentMethod === 'pod'
                        ? 'border-caramel-500 bg-caramel-50'
                        : 'border-cream-300 bg-white hover:border-cocoa-900/30'
                    }`}
                  >
                    <Banknote className={`h-5 w-5 ${paymentMethod === 'pod' ? 'text-caramel-600' : 'text-cocoa-400'}`} />
                    <span className="mt-2 block text-xs font-bold text-cocoa-900">Pay on Delivery</span>
                    <span className="mt-0.5 block text-[10.5px] leading-snug text-cocoa-500">
                      Cash or POS when your rider arrives
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    aria-pressed={paymentMethod === 'online'}
                    className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                      paymentMethod === 'online'
                        ? 'border-caramel-500 bg-caramel-50'
                        : 'border-cream-300 bg-white hover:border-cocoa-900/30'
                    }`}
                  >
                    <CreditCard className={`h-5 w-5 ${paymentMethod === 'online' ? 'text-caramel-600' : 'text-cocoa-400'}`} />
                    <span className="mt-2 block text-xs font-bold text-cocoa-900">Pay Online</span>
                    <span className="mt-0.5 block text-[10.5px] leading-snug text-cocoa-500">
                      Debit card, Apple Pay or transfer
                    </span>
                  </button>
                </div>

                {paymentMethod === 'online' && (
                  <div className="animate-fade-up space-y-3 rounded-2xl border border-cream-300 bg-white p-4">
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
                    <p className="flex items-center gap-2 text-[10.5px] text-cocoa-500">
                      <ShieldCheck className="h-3.5 w-3.5 text-success-500" />
                      256-bit SSL encrypted · PCI-DSS certified
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* ===== Right: summary ===== */}
            <div className="lg:col-span-5">
              <div className="space-y-4 rounded-3xl bg-cocoa-900 p-5 text-cream-50 shadow-overlay sm:p-6 lg:sticky lg:top-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-cream-50">
                    Order Summary
                  </h3>
                  <span className="text-[11px] font-bold text-caramel-400">
                    {cartItems.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                </div>

                <div className="max-h-44 space-y-2.5 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.uniqueId} className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="grid h-5 min-w-[20px] shrink-0 place-items-center rounded-md bg-caramel-500/20 px-1 text-[10px] font-extrabold text-caramel-300">
                          {item.quantity}x
                        </span>
                        <div className="min-w-0">
                          <span className="block truncate font-semibold text-cream-50">{item.name}</span>
                          {item.selectedExtras?.length > 0 && (
                            <span className="block truncate text-[10px] text-caramel-300/80">
                              +{item.selectedExtras.map((e) => e.name).join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 font-bold text-cream-50 tabular-nums">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 border-t border-cream-50/10 pt-3.5 text-xs">
                  <div className="flex justify-between text-cream-50/60">
                    <span>Subtotal</span>
                    <span className="font-bold text-cream-50 tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between font-bold text-caramel-300">
                      <span>Discount · {appliedCoupon.code}</span>
                      <span className="tabular-nums">−{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-cream-50/60">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? 'text-[10px] font-extrabold uppercase text-caramel-300' : 'font-bold text-cream-50 tabular-nums'}>
                      {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-cream-50/60">
                    <span>Eco packaging</span>
                    <span className="font-bold text-cream-50 tabular-nums">{formatPrice(packagingFee)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-cream-50/10 pt-2.5">
                    <span className="font-display text-base font-bold text-cream-50">Grand Total</span>
                    <span className="font-display text-[1.5rem] font-extrabold tracking-tight text-caramel-400 tabular-nums">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                <p className="flex items-center gap-2 text-[10.5px] text-cream-50/55">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-caramel-400" />
                  Sizzling-hot guarantee — fresh within 28 minutes.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="btn-caramel w-full !py-4"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse-soft">Preparing your order ticket…</span>
                  ) : (
                    <>
                      Place Order
                      <span className="rounded-lg bg-cocoa-950/15 px-2.5 py-1 font-display text-[13px] font-extrabold tabular-nums">
                        {formatPrice(grandTotal)}
                      </span>
                      <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
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
