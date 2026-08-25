import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Copy, Check, Timer, ArrowRight, Tag } from 'lucide-react';

export default function PromoBanner() {
  const { applyCoupon, appliedCoupon } = useCart();
  const [copied, setCopied] = useState(false);

  // Simulated countdown timer for flash deal urgency
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 27,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaimOffer = () => {
    applyCoupon('BIGBURGER20');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const isApplied = appliedCoupon?.code === 'BIGBURGER20';

  return (
    <section id="offers" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Card with Glassmorphism & High-Contrast Visuals */}
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#1E2333] via-[#141724] to-[#0D0F16] border border-orange-500/20 shadow-2xl p-6 sm:p-10 lg:p-14">
          
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#FF5A1F]/25 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Special Limited-Time Welcome Offer
              </div>

              {/* Title */}
              <div className="space-y-2">
                <p className="text-xl sm:text-2xl font-bold text-amber-400">
                  Hungry? We've Got You Covered.
                </p>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  Get <span className="text-gradient-orange">20% OFF</span> Your First Order
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto lg:mx-0">
                Order any of our signature gourmet burgers, loaded cheesy fries, or feast combos today and enjoy an instant 20% discount applied at checkout.
              </p>

              {/* Countdown Timer */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <Timer className="w-4 h-4 text-[#FF5A1F]" />
                  <span>Offer resets in:</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-white">
                  <span className="bg-black/50 px-2 py-1 rounded-lg border border-white/10">
                    {String(timeLeft.hours).padStart(2, '0')}h
                  </span>
                  <span>:</span>
                  <span className="bg-black/50 px-2 py-1 rounded-lg border border-white/10">
                    {String(timeLeft.minutes).padStart(2, '0')}m
                  </span>
                  <span>:</span>
                  <span className="bg-black/50 px-2 py-1 rounded-lg border border-white/10 text-amber-400">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>

              {/* Promo Code Box & Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                
                {/* Code Pill */}
                <div className="flex items-center gap-3 bg-black/50 border border-white/15 px-4 py-3 rounded-2xl w-full sm:w-auto justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-slate-400">Coupon:</span>
                    <span className="font-mono font-black text-white tracking-wider text-sm">
                      BIGBURGER20
                    </span>
                  </div>
                </div>

                {/* Claim CTA Button */}
                <button
                  onClick={handleClaimOffer}
                  className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl transition-all duration-200 active:scale-95 ${
                    isApplied || copied
                      ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] text-white shadow-orange-500/30 hover:scale-105'
                  }`}
                >
                  {isApplied || copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Offer Applied to Cart!</span>
                    </>
                  ) : (
                    <>
                      <span>Claim 20% Offer</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Right Food Photo Display */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                
                {/* Visual Card */}
                <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/40 group">
                  <img
                    src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
                    alt="Delicious burger promo"
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating Discount Stamp */}
                <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-gradient-to-tr from-[#FF5A1F] to-amber-400 text-black p-4 rounded-3xl shadow-2xl font-black text-center border-2 border-black rotate-6 animate-pulse-subtle">
                  <div className="text-2xl sm:text-3xl leading-none">20%</div>
                  <div className="text-[10px] uppercase tracking-wider font-extrabold">DISCOUNT</div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
