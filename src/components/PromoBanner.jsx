import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Reveal from './ui/Reveal';
import { ArrowRight, Check, Copy } from 'lucide-react';
import promoFeast from '../assets/promo-feast.jpg';

/**
 * First-order campaign — a full-bleed chocolate panel.
 * One message, one code, one action.
 */
export default function PromoBanner() {
  const { applyCoupon, appliedCoupon } = useCart();
  const [copied, setCopied] = useState(false);

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

  return (
    <section id="offers" className="relative overflow-hidden bg-cocoa-900 text-cream-50">
      {/* Subtle paper grain + caramel edge light */}
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-caramel-500/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="shell relative grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
        {/* ===== Campaign copy ===== */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-caramel-400">
              First Order · Welcome Offer
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,8vw,4.25rem)] font-extrabold leading-[0.98] tracking-[-0.025em] text-cream-50">
              FIRST ORDER
              <span className="block text-caramel-400">20% OFF</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream-50/70 sm:text-base">
              Any signature burger, loaded fries or feast combo — the code
              applies instantly at checkout, no app required.
            </p>
          </Reveal>

          {/* Coupon ticket + action */}
          <Reveal delay={120}>
            <div className="mt-8 flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={copyCode}
                className="group inline-flex items-center justify-between gap-4 rounded-2xl border border-dashed border-caramel-400/50 bg-cocoa-950/40 px-5 py-3.5 transition-all duration-200 hover:border-caramel-400 hover:bg-cocoa-950/70"
                aria-label="Copy coupon code BIGBURGER20"
              >
                <span className="text-left">
                  <span className="block text-[9px] font-extrabold uppercase tracking-[0.24em] text-cream-50/50">
                    Use code
                  </span>
                  <span className="block font-mono text-lg font-bold tracking-[0.14em] text-cream-50 sm:text-xl">
                    BIGBURGER20
                  </span>
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-caramel-500/15 text-caramel-400 transition-transform duration-200 group-hover:scale-105">
                  {copied ? (
                    <Check className="h-4 w-4 text-caramel-300" strokeWidth={3} />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </span>
              </button>

              <button
                type="button"
                onClick={handleClaimOffer}
                disabled={isApplied}
                className={
                  isApplied
                    ? 'inline-flex items-center justify-center gap-2.5 rounded-full border border-caramel-400/40 bg-caramel-500/10 px-7 py-3.5 text-sm font-bold text-caramel-300'
                    : 'btn-caramel'
                }
              >
                {isApplied ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.6} />
                    Applied to your order
                  </>
                ) : (
                  <>
                    Claim 20% off
                    <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                  </>
                )}
              </button>
            </div>
          </Reveal>
        </div>

        {/* ===== Campaign imagery ===== */}
        <div className="lg:col-span-5">
          <Reveal delay={150} y={28}>
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              <div className="relative overflow-hidden rounded-4xl shadow-overlay">
                <img
                  src={promoFeast}
                  alt="Big Burger feast — signature burger with golden fries"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              {/* Discount medallion */}
              <div className="absolute -top-5 right-4 rotate-3 rounded-2xl bg-caramel-400 px-5 py-3 text-center shadow-float sm:-right-4">
                <span className="block font-display text-2xl font-extrabold leading-none text-cocoa-950 sm:text-[1.7rem]">
                  20%
                </span>
                <span className="mt-1 block text-[8.5px] font-extrabold uppercase tracking-[0.22em] text-cocoa-900">
                  First Order
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
