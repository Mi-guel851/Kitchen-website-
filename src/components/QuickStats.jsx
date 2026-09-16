import React from 'react';
import { Star, Clock, Beef } from 'lucide-react';
import Reveal from './ui/Reveal';

const METRICS = [
  {
    icon: Beef,
    value: '100% Prime Angus',
    label: 'Certified Halal · Never Frozen',
  },
  {
    icon: Star,
    value: '4.9 / 5',
    label: '2,500+ Happy Foodies',
  },
  {
    icon: Clock,
    value: '28 Min',
    label: 'Average Delivery Time',
  },
];

/**
 * Structured trust strip — three quality metrics in one calm editorial band.
 * Horizontal on desktop, stacked on mobile.
 */
export default function QuickStats() {
  return (
    <section aria-label="Quality and service metrics" className="border-y border-cream-300 bg-white">
      <div className="shell">
        <Reveal>
          <dl className="grid grid-cols-1 sm:grid-cols-3">
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                className={`flex items-center gap-4 px-2 py-5 sm:px-8 sm:py-7 ${
                  i > 0 ? 'border-t border-cream-300 sm:border-t-0 sm:border-l' : ''
                } ${i === 0 ? 'sm:pl-0' : ''} ${i === 2 ? 'sm:pr-0' : ''}`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-caramel-100 text-caramel-600">
                  <m.icon className="h-5 w-5" strokeWidth={2.1} />
                </span>
                <span>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="font-display text-base font-extrabold tracking-tight text-cocoa-900 sm:text-lg">
                    {m.value}
                  </dd>
                  <dd className="mt-0.5 text-[11.5px] font-semibold text-cocoa-500">
                    {m.label}
                  </dd>
                </span>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
