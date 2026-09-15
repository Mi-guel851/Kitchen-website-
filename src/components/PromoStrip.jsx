import React, { useState } from 'react';
import { Copy, Check, Zap } from 'lucide-react';

/**
 * Slim campaign strip above the navbar — the offer reads instantly,
 * the code behaves like a premium coupon chip (click to copy).
 */
export default function PromoStrip() {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText('BIGBURGER20');
    } catch (e) {
      /* clipboard unavailable — state still confirms visually */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative z-40 bg-ink-900 border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 sm:h-10 flex items-center justify-center gap-2.5 sm:gap-3.5 text-[11px] sm:text-xs">
        <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-luxe text-cream-600">
          <Zap className="w-3 h-3 text-ember-500 fill-ember-500" />
          First Order
        </span>
        <span className="hidden md:inline-block w-px h-3.5 bg-white/10" aria-hidden="true" />
        <span className="text-cream-300 truncate">
          <span className="hidden sm:inline">Take </span>
          <span className="font-black text-gold-400">20% off</span>
          <span className="hidden sm:inline"> your first Big Burger with code</span>
        </span>
        <button
          type="button"
          onClick={copyCode}
          aria-label="Copy promo code BIGBURGER20"
          className="group inline-flex items-center gap-1.5 rounded-md border border-ember-500/40 bg-ember-500/10 pl-2.5 pr-2 py-[3px] font-mono text-[11px] font-bold tracking-[0.14em] text-ember-300 transition-all duration-200 hover:bg-ember-500/20 hover:border-ember-500/70"
        >
          {copied ? 'COPIED' : 'BIGBURGER20'}
          {copied ? (
            <Check className="w-3 h-3 text-emerald-400" strokeWidth={3} />
          ) : (
            <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
        <span className="hidden lg:inline text-cream-600">· Free delivery over ₦15,000</span>
      </div>
    </div>
  );
}
