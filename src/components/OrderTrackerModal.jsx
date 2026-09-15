import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { useLockBodyScroll, useEscape } from '../hooks/useMotion';
import {
  X,
  Bike,
  CheckCircle2,
  MapPin,
  PhoneCall,
  Flame,
  ChefHat,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react';

/**
 * Live order tracking — 4-stage stepper, courier card and receipt.
 */
export default function OrderTrackerModal() {
  const { isTrackerOpen, setIsTrackerOpen, activeOrder, setActiveOrder, showToast } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(28 * 60);

  useLockBodyScroll(isTrackerOpen && !!activeOrder);
  useEscape(() => setIsTrackerOpen(false), isTrackerOpen && !!activeOrder);

  useEffect(() => {
    if (!isTrackerOpen || !activeOrder) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTrackerOpen, activeOrder]);

  if (!isTrackerOpen || !activeOrder) return null;

  const minutesLeft = Math.floor(timerSeconds / 60);
  const secondsLeft = timerSeconds % 60;

  const steps = [
    { title: 'Confirmed', desc: 'Ticket sent to grill', icon: CheckCircle2 },
    { title: 'In The Kitchen', desc: 'Smashed on 450°F iron', icon: ChefHat },
    { title: 'Out For Delivery', desc: 'Heat-lock bag sealed', icon: Bike },
    { title: 'Delivered', desc: 'Enjoy your Big Burger', icon: Flame },
  ];

  const handleSimulateNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((s) => s + 1);
      showToast(`Order status updated to: ${steps[currentStep + 1].title}`, 'info');
    } else {
      showToast('Your order has arrived! Enjoy!', 'success');
    }
  };

  const handleFinishOrder = () => {
    setActiveOrder(null);
    setIsTrackerOpen(false);
    showToast('Thank you for ordering with Big Burger!', 'success');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink-950/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Order tracking"
    >
      <div
        className="relative flex my-4 max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-ink-850 shadow-glow-soft animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3.5">
            <span className="relative grid w-10 h-10 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
              <Bike className="w-[18px] h-[18px]" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse-soft ring-2 ring-ink-850" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-extrabold tracking-tight text-cream-50">
                  Live Order Tracking
                </h3>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                  {activeOrder.orderId}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-cream-500">
                ETA{' '}
                <strong className="font-black text-gold-300 tabular-nums">
                  {minutesLeft}m {secondsLeft}s
                </strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsTrackerOpen(false)}
            autoFocus
            className="grid w-9 h-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-cream-400 transition-colors hover:text-cream-50 hover:bg-white/[0.08]"
            aria-label="Close tracker"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
          {/* Stepper */}
          <div className="rounded-2xl border border-white/[0.07] bg-ink-900/60 p-5">
            <div className="relative grid grid-cols-4 gap-2">
              <div className="absolute left-[12.5%] right-[12.5%] top-5 h-0.5 bg-white/[0.07]" aria-hidden="true">
                <div
                  className="h-full bg-gradient-to-r from-ember-500 to-emerald-400 transition-all duration-700 ease-out"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
              {steps.map((step, idx) => {
                const isPassed = idx < currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-2xl border transition-all duration-500 ${
                        isCurrent
                          ? 'border-ember-400 bg-ember-500 text-ink-950 shadow-glow-ember scale-110'
                          : isPassed
                          ? 'border-emerald-400/50 bg-emerald-500 text-ink-950'
                          : 'border-white/[0.1] bg-ink-800 text-cream-600'
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </span>
                    <span
                      className={`mt-2.5 text-[11px] font-bold ${
                        isCurrent
                          ? 'text-gold-300'
                          : isPassed
                          ? 'text-cream-100'
                          : 'text-cream-600'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="mt-0.5 hidden text-[9.5px] text-cream-600 sm:block">
                      {step.desc}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs">
              <span className="text-cream-500">Live status simulation</span>
              <button
                type="button"
                onClick={handleSimulateNextStep}
                disabled={currentStep >= 3}
                className="rounded-lg border border-white/[0.1] bg-white/[0.05] px-3 py-1.5 font-bold text-cream-100 transition-colors hover:bg-white/[0.12] disabled:opacity-30"
              >
                {currentStep >= 3 ? 'Delivered ✓' : 'Simulate next step →'}
              </button>
            </div>
          </div>

          {/* Courier */}
          {activeOrder.driver && (
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-ink-900/60 p-4 sm:p-5">
              <div className="flex items-center gap-3.5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-ember-500 to-gold-500 text-xl shadow-md">
                  🏍️
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-cream-50">{activeOrder.driver.name}</h4>
                    <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[9.5px] font-bold text-emerald-300">
                      Your courier
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-cream-500">
                    {activeOrder.driver.vehicle}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${activeOrder.driver.phone}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-xs font-bold text-emerald-300 transition-colors hover:bg-emerald-400/20"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Call
              </a>
            </div>
          )}

          {/* Destination + payment */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.07] bg-ink-900/60 p-4">
              <span className="flex items-center gap-1.5 text-[9.5px] font-black uppercase tracking-[0.2em] text-cream-600">
                <MapPin className="w-3 h-3" /> Deliver To
              </span>
              <p className="mt-2 text-[13px] font-bold text-cream-50">
                {activeOrder.customerName} · {activeOrder.phone}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-cream-400">{activeOrder.address}</p>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-ink-900/60 p-4">
              <span className="flex items-center gap-1.5 text-[9.5px] font-black uppercase tracking-[0.2em] text-cream-600">
                <ShoppingBag className="w-3 h-3" /> Payment
              </span>
              <p className="mt-2 text-[13px] font-bold text-cream-50">{activeOrder.paymentMethod}</p>
              <p className="mt-1 font-display text-sm font-extrabold text-gold-300 tabular-nums">
                Total: {formatPrice(activeOrder.grandTotal)}
              </p>
            </div>
          </div>

          {/* Receipt */}
          <div className="rounded-2xl border border-white/[0.07] bg-ink-900/60 p-4 sm:p-5">
            <span className="text-[9.5px] font-black uppercase tracking-[0.2em] text-cream-600">
              Items in this order
            </span>
            <div className="mt-3 divide-y divide-white/[0.05]">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 text-xs">
                  <span className="text-cream-200">
                    <span className="font-black text-gold-300">{item.quantity}×</span>{' '}
                    {item.name}
                  </span>
                  <span className="font-bold text-cream-100 tabular-nums">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-white/[0.07] bg-ink-900 px-5 py-4">
          <button
            type="button"
            onClick={() => setIsTrackerOpen(false)}
            className="text-xs font-bold text-cream-500 transition-colors hover:text-cream-100"
          >
            Minimize
          </button>
          <button
            type="button"
            onClick={handleFinishOrder}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-2.5 text-xs font-bold text-cream-100 transition-colors hover:bg-white/[0.12]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Order again
          </button>
        </div>
      </div>
    </div>
  );
}
