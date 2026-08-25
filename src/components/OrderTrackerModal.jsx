import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import {
  X,
  Bike,
  CheckCircle2,
  Clock,
  MapPin,
  PhoneCall,
  Flame,
  ChefHat,
  ShoppingBag,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export default function OrderTrackerModal() {
  const { isTrackerOpen, setIsTrackerOpen, activeOrder, setActiveOrder, showToast } = useCart();

  // Progress steps
  // 0: Confirmed, 1: Kitchen, 2: Delivery, 3: Delivered
  const [currentStep, setCurrentStep] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(28 * 60);

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
    { title: 'Order Confirmed', desc: 'Ticket sent to grill', icon: <CheckCircle2 className="w-5 h-5" /> },
    { title: 'In The Kitchen', desc: 'Smashed on 450°F iron', icon: <ChefHat className="w-5 h-5" /> },
    { title: 'Out For Delivery', desc: 'Thermal heat bag sealed', icon: <Bike className="w-5 h-5" /> },
    { title: 'Delivered', desc: 'Enjoy your Big Burger!', icon: <Flame className="w-5 h-5" /> },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative w-full max-w-2xl my-8 rounded-3xl bg-[#121522] border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#171B2B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-pulse">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-lg">
                  Live Order Tracking
                </h3>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-mono font-bold border border-emerald-500/30">
                  {activeOrder.orderId}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Estimated delivery in{' '}
                <strong className="text-amber-400 font-bold">
                  {minutesLeft}m {secondsLeft}s
                </strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTrackerOpen(false)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* Status Stepper */}
          <div className="p-5 rounded-3xl bg-[#171B2A] border border-white/10 shadow-inner">
            <div className="grid grid-cols-4 gap-2 relative">
              {/* Connecting line */}
              <div className="absolute top-5 left-8 right-8 h-1 bg-white/10 -z-0">
                <div
                  className="h-full bg-gradient-to-r from-[#FF5A1F] to-emerald-400 transition-all duration-500"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>

              {steps.map((step, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-[#FF5A1F] text-white shadow-lg shadow-orange-500/40 ring-4 ring-orange-500/20 scale-110'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-[#1D2132] text-slate-500 border border-white/10'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span
                      className={`text-[11px] font-bold mt-2.5 ${
                        isCurrent ? 'text-amber-400' : isPassed ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">
                      {step.desc}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Test Simulation Controls */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400">Live Status Simulation:</span>
              <button
                onClick={handleSimulateNextStep}
                disabled={currentStep >= 3}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold disabled:opacity-30 transition-colors"
              >
                {currentStep >= 3 ? 'Delivered' : 'Simulate Next Step →'}
              </button>
            </div>
          </div>

          {/* Delivery Courier Card */}
          {activeOrder.driver && (
            <div className="p-4 sm:p-5 rounded-3xl bg-[#171B2A] border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF5A1F] to-amber-500 flex items-center justify-center text-xl shadow-md">
                  🏍️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-white">
                      {activeOrder.driver.name}
                    </h4>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                      Designated Courier
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Vehicle: {activeOrder.driver.vehicle}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${activeOrder.driver.phone}`}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-white text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Courier</span>
              </a>
            </div>
          )}

          {/* Destination & Order Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#151926] border border-white/10 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                Deliver To
              </span>
              <p className="font-bold text-white text-sm">
                {activeOrder.customerName} ({activeOrder.phone})
              </p>
              <p className="text-slate-300 leading-relaxed">
                {activeOrder.address}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#151926] border border-white/10 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                Payment Method
              </span>
              <p className="font-bold text-white text-sm">
                {activeOrder.paymentMethod}
              </p>
              <p className="text-amber-400 font-black text-sm mt-1">
                Total: {formatPrice(activeOrder.grandTotal)}
              </p>
            </div>
          </div>

          {/* Items Receipt */}
          <div className="p-4 rounded-2xl bg-[#151926] border border-white/10 space-y-2">
            <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
              Items in this Order
            </span>
            <div className="divide-y divide-white/5 space-y-2">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-white">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-slate-300 font-bold">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#0F121A] border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => setIsTrackerOpen(false)}
            className="text-xs text-slate-400 hover:text-white font-bold"
          >
            Keep Window Minimized
          </button>

          <button
            onClick={handleFinishOrder}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Place Another Order</span>
          </button>
        </div>

      </div>
    </div>
  );
}
