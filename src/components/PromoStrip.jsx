import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * Slim campaign strip above the navbar — a quiet line on warm paper.
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
    <div className="relative z-40 border-b border-cream-300 bg-cream-200">
      <div className="shell flex h-10 items-center justify-center gap-2.5 text-[11px] sm:gap-3.5 sm:text-xs">
        <span className="truncate text-cocoa-500">
          <span className="font-bold text-cocoa-900">First order:</span>{' '}
          <span className="font-extrabold text-caramel-600">20% off</span>
          <span className="hidden sm:inline"> your first Big Burger with code</span>
        </span>
        <button
          type="button"
          onClick={copyCode}
          aria-label="Copy promo code BIGBURGER20"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-caramel-500/40 bg-caramel-50 py-[3px] pl-2.5 pr-2 font-mono text-[11px] font-bold tracking-[0.14em] text-caramel-600 transition-all duration-200 hover:border-caramel-500 hover:bg-caramel-100"
        >
          {copied ? 'COPIED' : 'BIGBURGER20'}
          {copied ? (
            <Check className="h-3 w-3 text-success-500" strokeWidth={3} />
          ) : (
            <Copy className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
          )}
        </button>
        <span className="hidden shrink-0 text-cocoa-400 lg:inline">
          · Free delivery over ₦15,000
        </span>
      </div>
    </div>
  );
}
