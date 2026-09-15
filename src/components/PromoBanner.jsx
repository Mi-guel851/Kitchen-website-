import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Reveal from './ui/Reveal';
import { Sparkles, Timer, ArrowRight, Check, Copy } from 'lucide-react';

/**
 * First-order campaign — a full-bleed brand moment, not a notification.
 */
export default function PromoBanner() {
  const { applyCoupon, appliedCoupon } = useCart();
  const [copied, setCopied] = useState(false);

  // Simulated flash-deal countdown
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 27, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
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

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText('BIGBURGER20');
    } catch (e) {
      /* noop */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const isApplied = appliedCoupon?.code === 'BIGBURGER20';
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section id="offers" className="relative overflow-hidden">
      <div className="relative border-y border-white/[0.05] bg-gradient-to-b from-ink-900 via-ink-900 to-ink-950">
        <div className="absolute inset-0 grain opacity-[0.05] pointer-events-none" aria-hidden="true" />
        <div
          className="absolute -top-32 right-[-8%] w-[28rem] h-[28rem] rounded-full bg-ember-500/[0.1] blur-[130px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* ===== Campaign copy ===== */}
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  First Order · Limited Welcome Offer
                </p>
                <h2 className="mt-5 font-display font-extrabold tracking-[-0.025em] leading-[0.98] text-cream-50 text-4xl sm:text-5xl md:text-[3.4rem] lg:text-[2.9rem] xl:text-[3.4rem] 2xl:text-[4rem]">
                  Take <span className="text-gradient-flame">20% off</span>
                  <br />
                  your first Big Burger.
                </h2>
                <p className="mt-5 max-w-md text-sm sm:text-base text-cream-400 leading-relaxed">
                  Any signature burger, loaded fries or feast combo — the code
                  applies instantly at checkout, no app required.
                </p>
              </Reveal>

              {/* Coupon ticket + action */}
              <Reveal delay={120}>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={copyCode}
                    className="group relative inline-flex items-center gap-4 rounded-2xl border border-dashed border-gold-500/50 bg-ink-950/80 px-5 py-3.5 transition-all duration-200 hover:border-gold-400/80 hover:bg-ink-950"
                    aria-label="Copy coupon code BIGBURGER20"
                  >
                    <span className="text-left">
                      <span className="block text-[9px] font-black uppercase tracking-[0.24em] text-cream-600">
                        Use code
                      </span>
                      <span className="block font-display text-lg sm:text-xl font-extrabold tracking-[0.14em] text-cream-50">
                        BIGBURGER20
                      </span>
                    </span>
                    <span className="grid w-8 h-8 place-items-center rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-300 transition-transform duration-200 group-hover:scale-105">
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClaimOffer}
                    className={
                      isApplied
                        ? 'inline-flex items-center justify-center gap-2.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-7 py-3.5 text-sm font-bold text-emerald-300 transition-all duration-200'
                        : 'btn-primary'
                    }
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-4 h-4" strokeWidth={2.6} />
                        Applied to your order
                      </>
                    ) : (
                      <>
                        Claim 20% off
                        <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                      </>
                    )}
                  </button>
                </div>
              </Reveal>

              {/* Countdown */}
              <Reveal delay={200}>
                <div className="mt-6 flex items-center gap-3 text-xs text-cream-500">
                  <span className="inline-flex items-center gap-1.5 font-bold">
                    <Timer className="w-3.5 h-3.5 text-ember-400" />
                    Offer resets in
                  </span>
                  <span
                    className="rounded-md bg-ink-950/80 border border-white/[0.08] px-2.5 py-1 font-mono text-[13px] font-bold text-cream-100 tabular-nums tracking-[0.14em]"
                    aria-live="off"
                  >
                    {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:
                    <span className="text-gold-300">{pad(timeLeft.seconds)}</span>
                  </span>
                </div>
              </Reveal>
            </div>

            {/* ===== Campaign imagery ===== */}
            <div className="lg:col-span-5">
              <Reveal delay={150} y={34}>
                <div className="relative mx-auto max-w-sm sm:max-w-md">
                  <div
                    className="absolute -inset-6 spotlight blur-xl pointer-events-none"
                    aria-hidden="true"
                  />
                  <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.09] shadow-glow-soft">
                    <img
                      src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80"
                      alt="Big Burger feast — signature burger with golden fries"
                      loading="lazy"
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit]" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/60 to-transparent" />
                  </div>

                  {/* Discount stamp */}
                  <div
                    className="absolute -top-5 -right-3 sm:-right-6 rotate-6 rounded-2xl border border-ink-950/40 bg-gradient-to-br from-gold-300 to-ember-500 px-5 py-3 text-center shadow-glow-ember"
                  >
                    <span className="block font-display text-2xl sm:text-[1.7rem] font-extrabold leading-none text-ink-950">
                      20%
                    </span>
                    <span className="mt-1 block text-[8.5px] font-black uppercase tracking-[0.22em] text-ink-950/80">
                      First Order
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
