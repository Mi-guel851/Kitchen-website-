import React from 'react';
import { Flame, Star, Sparkles, ArrowRight, ShieldCheck, Clock, Award, CheckCircle2 } from 'lucide-react';

export default function Hero({ onExploreMenu, onQuickOrder }) {
  return (
    <section id="home" className="relative overflow-hidden pt-6 sm:pt-12 pb-16 lg:pb-24">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#FF5A1F]/20 to-[#F59E0B]/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF5A1F]/10 blur-[90px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-500/30 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-[#FF5A1F] animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                Voted Lagos' #1 Gourmet Burger Brand
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] text-white">
              Big Flavor.{' '}
              <span className="block mt-1 text-gradient-orange">
                Bigger Cravings.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Hand-smashed 100% prime Angus patties seared at 450°F, melted aged cheddar, secret recipe sauces, and golden crispy sides crafted fresh to order. Delivered sizzling hot in under 30 minutes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onQuickOrder}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] text-white font-extrabold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group"
              >
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 text-white font-bold text-base backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Full Menu</span>
                <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  25+ Items
                </span>
              </button>
            </div>

            {/* Live Trust Badges & Metrics */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-black text-sm sm:text-base">28 Min</div>
                  <div className="text-[11px] text-slate-400 font-medium">Avg Delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <div className="text-white font-black text-sm sm:text-base">4.9 / 5.0</div>
                  <div className="text-[11px] text-slate-400 font-medium">2,500+ Reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-black text-sm sm:text-base">100% Halal</div>
                  <div className="text-[11px] text-slate-400 font-medium">Prime Angus</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Interactive Floating Food Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[480px] lg:max-w-none">
              
              {/* Radial glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FF5A1F]/30 via-transparent to-black/60 rounded-full blur-2xl -z-10" />

              {/* Main Burger Image with subtle hover/interactive 3D lift */}
              <div className="relative z-10 group cursor-pointer transition-transform duration-500 hover:scale-105">
                <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-gradient-to-b from-[#1E222D]/80 to-[#12141A]/90 backdrop-blur-md p-3 sm:p-4">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85"
                    alt="The Big Classic Double Burger"
                    className="w-full h-[320px] sm:h-[400px] object-cover rounded-2xl shadow-inner transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle caption banner on the card */}
                  <div className="absolute bottom-6 left-6 right-6 p-3.5 rounded-xl bg-black/75 backdrop-blur-xl border border-white/15 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-white">The Big Classic</span>
                        <span className="bg-[#FF5A1F] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded">Signature</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">Smashed Angus • Cheddar • Secret Sauce</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 line-through">₦5,500</span>
                      <div className="text-base font-black text-amber-400">₦4,800</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Fresh Angus Guarantee (Top Right) */}
              <div className="absolute -top-4 -right-2 sm:-right-6 z-20 animate-float bg-[#171A24]/90 backdrop-blur-xl border border-white/20 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-[#FF5A1F] flex items-center justify-center text-black font-black text-lg shadow-md">
                  🥩
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white">100% Prime Angus</div>
                  <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Never Frozen
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Live Rating (Bottom Left) */}
              <div className="absolute -bottom-6 -left-2 sm:-left-6 z-20 animate-float-reverse bg-[#171A24]/90 backdrop-blur-xl border border-white/20 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-black">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.9 / 5.0</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-medium">Over 2,500 Happy Foodies</div>
                </div>
              </div>

              {/* Floating Badge 3: Fast Sizzle (Middle Left) */}
              <div className="hidden sm:flex absolute top-1/2 -left-8 -translate-y-1/2 z-20 bg-[#171A24]/90 backdrop-blur-xl border border-white/20 px-3 py-2 rounded-xl shadow-xl items-center gap-2">
                <span className="text-base">⚡</span>
                <span className="text-xs font-bold text-slate-200">Fresh off the grill</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
