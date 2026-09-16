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
    { title: 'Confirmed', short: 'Confirmed', desc: 'Ticket sent to grill', icon: CheckCircle2 },
    { title: 'In The Kitchen', short: 'Cooking', desc: 'Smashed on 450°F iron', icon: ChefHat },
    { title: 'Out For Delivery', short: 'On the way', desc: 'Heat-lock bag sealed', icon: Bike },
    { title: 'Delivered', short: 'Delivered', desc: 'Enjoy your Big Burger', icon: Flame },
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
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center overflow-y-auto bg-cocoa-950/55 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Order tracking"
    >
      <div
        className="relative my-4 flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-4xl border border-cream-300 bg-cream-50 shadow-overlay animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-cream-300 bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3.5">
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-success-500/10 text-success-500">
              <Bike className="h-[18px] w-[18px]" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse-soft rounded-full bg-success-500 ring-2 ring-white" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-extrabold tracking-tight text-cocoa-900">
                  Live Order Tracking
                </h3>
                <span className="rounded-full bg-cream-200 px-2 py-0.5 font-mono text-[10px] font-bold text-cocoa-500">
                  {activeOrder.orderId}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-cocoa-500">
                ETA{' '}
                <strong className="font-extrabold text-caramel-600 tabular-nums">
                  {minutesLeft}m {secondsLeft}s
                </strong>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsTrackerOpen(false)}
            autoFocus
            className="btn-icon"
            aria-label="Close tracker"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
          {/* Stepper */}
          <div className="rounded-3xl border border-cream-300 bg-white p-5">
            <div className="relative grid grid-cols-4 gap-2">
              <div className="absolute left-[12.5%] right-[12.5%] top-5 h-0.5 bg-cream-300" aria-hidden="true">
                <div
                  className="h-full bg-caramel-500 transition-all duration-700 ease-out"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
              {steps.map((step, idx) => {
                const isPassed = idx < currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-500 ${
                        isCurrent
                          ? 'scale-110 border-caramel-500 bg-caramel-500 text-cocoa-950'
                          : isPassed
                          ? 'border-caramel-300 bg-caramel-100 text-caramel-600'
                          : 'border-cream-300 bg-cream-100 text-cocoa-400'
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span
                      className={`mt-2.5 text-[11px] font-bold ${
                        isCurrent
                          ? 'text-cocoa-900'
                          : isPassed
                          ? 'text-cocoa-700'
                          : 'text-cocoa-400'
                      }`}
                    >
                      <span className="sm:hidden">{step.short}</span>
                      <span className="hidden sm:inline">{step.title}</span>
                    </span>
                    <span className="mt-0.5 hidden text-[9.5px] text-cocoa-400 sm:block">
                      {step.desc}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-cream-300 pt-4 text-xs">
              <span className="text-cocoa-400">Live status simulation</span>
              <button
                type="button"
                onClick={handleSimulateNextStep}
                disabled={currentStep >= 3}
                className="rounded-lg border border-cocoa-900/15 bg-white px-3 py-1.5 font-bold text-cocoa-900 transition-colors hover:border-cocoa-900/40 disabled:opacity-30"
              >
                {currentStep >= 3 ? 'Delivered ✓' : 'Simulate next step →'}
              </button>
            </div>
          </div>

          {/* Courier */}
          {activeOrder.driver && (
            <div className="flex items-center justify-between gap-4 rounded-3xl border border-cream-300 bg-white p-4 sm:p-5">
              <div className="flex items-center gap-3.5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-caramel-100 text-xl">
                  🏍️
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-cocoa-900">{activeOrder.driver.name}</h4>
                    <span className="rounded-full bg-success-500/10 px-2 py-0.5 text-[9.5px] font-bold text-success-500">
                      Your courier
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-cocoa-500">
                    {activeOrder.driver.vehicle}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${activeOrder.driver.phone}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-cocoa-900/15 bg-white px-4 py-2.5 text-xs font-bold text-cocoa-900 transition-colors hover:border-cocoa-900/40"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                Call
              </a>
            </div>
          )}

          {/* Destination + payment */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-cream-300 bg-white p-4">
              <span className="flex items-center gap-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-cocoa-400">
                <MapPin className="h-3 w-3" /> Deliver To
              </span>
              <p className="mt-2 text-[13px] font-bold text-cocoa-900">
                {activeOrder.customerName} · {activeOrder.phone}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-cocoa-500">{activeOrder.address}</p>
            </div>
            <div className="rounded-3xl border border-cream-300 bg-white p-4">
              <span className="flex items-center gap-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-cocoa-400">
                <ShoppingBag className="h-3 w-3" /> Payment
              </span>
              <p className="mt-2 text-[13px] font-bold text-cocoa-900">{activeOrder.paymentMethod}</p>
              <p className="mt-1 font-display text-sm font-extrabold text-cocoa-900 tabular-nums">
                Total: {formatPrice(activeOrder.grandTotal)}
              </p>
            </div>
          </div>

          {/* Receipt */}
          <div className="rounded-3xl border border-cream-300 bg-white p-4 sm:p-5">
            <span className="text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-cocoa-400">
              Items in this order
            </span>
            <div className="mt-3 divide-y divide-cream-300">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 text-xs">
                  <span className="text-cocoa-700">
                    <span className="font-extrabold text-caramel-600">{item.quantity}×</span>{' '}
                    {item.name}
                  </span>
                  <span className="font-bold text-cocoa-900 tabular-nums">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-cream-300 bg-white px-5 py-4">
          <button
            type="button"
            onClick={() => setIsTrackerOpen(false)}
            className="text-xs font-bold text-cocoa-400 transition-colors hover:text-cocoa-900"
          >
            Minimize
          </button>
          <button
            type="button"
            onClick={handleFinishOrder}
            className="inline-flex items-center gap-2 rounded-xl border border-cocoa-900/15 bg-white px-4 py-2.5 text-xs font-bold text-cocoa-900 transition-colors hover:border-cocoa-900/40"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Order again
          </button>
        </div>
      </div>
    </div>
  );
}
