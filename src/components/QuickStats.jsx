import React from 'react';
import { Flame, Sparkles, Truck, HeartHandshake } from 'lucide-react';

export default function QuickStats() {
  const features = [
    {
      icon: <Flame className="w-5 h-5 text-[#FF5A1F]" />,
      title: 'Smashed At 450°F',
      subtitle: 'Crispy caramelized crusts every time'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: 'Potato Brioche Buns',
      subtitle: 'Freshly baked every single morning'
    },
    {
      icon: <Truck className="w-5 h-5 text-emerald-400" />,
      title: '28-Min Heat-Lock Delivery',
      subtitle: 'Arrives sizzling hot at your door'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-rose-400" />,
      title: 'Secret House Sauces',
      subtitle: 'Crafted in-house daily with love'
    }
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-3xl bg-[#13161F]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-all duration-300 group"
          >
            <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold text-white tracking-wide uppercase">
                {f.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                {f.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
