import React from 'react';
import { Flame, Sparkles, Truck, HeartHandshake } from 'lucide-react';
import Reveal from './ui/Reveal';

const FEATURES = [
  {
    icon: Flame,
    title: 'Smashed at 450°F',
    subtitle: 'Crispy caramelized crusts, every time',
  },
  {
    icon: Sparkles,
    title: 'Buttery Brioche Buns',
    subtitle: 'Baked fresh every single morning',
  },
  {
    icon: Truck,
    title: '28-Min Heat-Lock Delivery',
    subtitle: 'Arrives sizzling hot at your door',
  },
  {
    icon: HeartHandshake,
    title: 'Secret House Sauces',
    subtitle: 'Crafted in-house, daily',
  },
];

/**
 * Quiet spec-sheet strip under the hero — one line of craft promises.
 */
export default function QuickStats() {
  return (
    <div className="relative z-10 border-b border-white/[0.05] bg-ink-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`group flex items-center gap-3.5 py-5 lg:py-6 px-4 sm:px-6 border-white/[0.05] border-b lg:border-b-0 even:border-l lg:border-l lg:first:border-l-0 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 ${
                  i === 0 ? 'pl-0' : ''
                }`}
              >
                <span className="grid w-10 h-10 shrink-0 place-items-center rounded-xl bg-white/[0.04] border border-white/[0.07] text-ember-400 transition-transform duration-300 group-hover:scale-105">
                  <f.icon className="w-[18px] h-[18px]" />
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-wide text-cream-100 uppercase">
                    {f.title}
                  </span>
                  <span className="block text-[11px] text-cream-500 mt-1 leading-snug">
                    {f.subtitle}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
