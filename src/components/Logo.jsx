import React from 'react';
import { Flame } from 'lucide-react';

/**
 * Big Burger brand mark: chocolate emblem + wordmark.
 */
export default function Logo({ compact = false, dark = false }) {
  return (
    <span className="flex select-none items-center gap-2.5">
      <span
        className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-xl sm:h-10 sm:w-10 ${
          dark ? 'bg-cream-50' : 'bg-cocoa-900'
        }`}
      >
        <Flame
          className={`h-[18px] w-[18px] sm:h-5 sm:w-5 ${
            dark ? 'text-caramel-500 fill-caramel-500' : 'text-caramel-400 fill-caramel-400'
          }`}
          strokeWidth={2.2}
        />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-lg font-extrabold tracking-tight sm:text-xl ${
              dark ? 'text-cream-50' : 'text-cocoa-900'
            }`}
          >
            BIG<span className="text-caramel-500">BURGER</span>
          </span>
          <span
            className={`mt-1 text-[8.5px] font-bold uppercase tracking-[0.3em] ${
              dark ? 'text-cream-50/50' : 'text-cocoa-400'
            }`}
          >
            Gourmet &amp; Grill
          </span>
        </span>
      )}
    </span>
  );
}
