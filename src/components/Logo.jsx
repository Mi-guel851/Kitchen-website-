import React from 'react';
import { Flame } from 'lucide-react';

/**
 * Big Burger brand mark: flame emblem + wordmark.
 */
export default function Logo({ compact = false }) {
  return (
    <span className="flex items-center gap-2.5 select-none">
      <span className="relative grid shrink-0 place-items-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-ember-300 via-ember-500 to-ember-700 shadow-glow-ember ring-1 ring-inset ring-white/25">
        <Flame className="w-4 h-4 sm:w-[22px] sm:h-[22px] text-ink-950 fill-ink-950" strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-cream-50">
            BIG<span className="text-ember-500">BURGER</span>
          </span>
          <span className="mt-1 flex items-center gap-1.5 text-[8.5px] font-bold uppercase tracking-[0.3em] text-cream-600">
            Gourmet &amp; Grill
            <span className="w-1 h-1 rounded-full bg-emerald-400" aria-hidden="true" />
          </span>
        </span>
      )}
    </span>
  );
}
