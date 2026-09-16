import React from 'react';
import { Flame } from 'lucide-react';

const ITEMS = [
  'Hand-Smashed Angus',
  'Seared at 450°F',
  'Never Frozen',
  'Buttery Brioche, Baked Daily',
  'Stone-Baked Pizza',
  '28-Min Heat-Lock Delivery',
  '100% Halal Certified',
  'Secret House Sauces',
];

/**
 * Cinematic brand ticker — a quiet marquee of craft promises.
 */
export default function Ticker() {
  const row = (hidden) => (
    <div className="flex items-center shrink-0" aria-hidden={hidden || undefined}>
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-7 pr-7 sm:gap-9 sm:pr-9">
          <span className="font-display text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-cream-500 whitespace-nowrap">
            {item}
          </span>
          <Flame className="w-3 h-3 text-ember-500/60 fill-ember-500/60 shrink-0" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-white/[0.05] bg-ink-900/70 py-3.5 sm:py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee will-change-transform">
        {row(false)}
        {row(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 sm:w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-24 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  );
}
