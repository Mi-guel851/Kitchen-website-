import React from 'react';
import { WHY_US_ITEMS, STATS } from '../data/menuData';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function WhyBigBurger() {
  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#0F1118] to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#FF5A1F] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            The Artisan Difference
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Why Food Lovers Choose <span className="text-gradient-orange">Big Burger</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            We don't do frozen patties or shortcuts. Every order is a masterclass in sear, cheese melt, and artisan flavor balance.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {WHY_US_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl p-6 sm:p-7 bg-[#141724]/70 hover:bg-[#1A1F30]/90 border border-white/10 hover:border-orange-500/30 backdrop-blur-xl shadow-xl transition-all duration-300 group hover:-translate-y-1.5"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl sm:text-3xl mb-5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>

              {/* Subtle bottom check */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Big Burger standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Big Numbers / Stats Bar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#171A26] via-[#1F2435] to-[#171A26] border border-white/15 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <div key={i} className={`flex flex-col items-center justify-center ${i > 0 ? 'pt-6 sm:pt-0' : ''}`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  <span className="text-gradient-orange">{stat.value}</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
