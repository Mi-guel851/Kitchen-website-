import React, { useEffect, useState } from 'react';
import {
  Flame,
  Star,
  ShieldCheck,
  Clock,
  ArrowRight,
  Beef,
  CheckCircle2,
} from 'lucide-react';
import Reveal from './ui/Reveal';
import { usePrefersReducedMotion } from '../hooks/useMotion';
import heroBurger from '../assets/hero-burger.jpg';

const TRUST_METRICS = [
  {
    icon: Clock,
    value: '28 Min',
    label: 'Avg Delivery',
    tone: 'text-ember-400 bg-ember-500/10 border-ember-500/20',
  },
  {
    icon: Star,
    value: '4.9 / 5',
    label: '2,500+ Reviews',
    tone: 'text-gold-400 bg-gold-500/10 border-gold-500/20',
  },
  {
    icon: ShieldCheck,
    value: '100% Halal',
    label: 'Prime Angus',
    tone: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
];

export default function Hero({ onExploreMenu, onQuickOrder }) {
  const reduced = usePrefersReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Subtle pointer parallax — desktop, fine-pointer only
  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e) => {
      setTilt({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced]);

  const layer = (factor) => ({
    transform: reduced
      ? undefined
      : `translate3d(${tilt.x * factor}px, ${tilt.y * factor}px, 0)`,
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform',
  });

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Ambient background — warm firelight, never loud */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-48 right-[-12%] w-[34rem] h-[34rem] sm:w-[44rem] sm:h-[44rem] rounded-full bg-ember-500/[0.12] blur-[140px]" />
        <div className="absolute top-1/3 left-[-12%] w-[30rem] h-[30rem] rounded-full bg-gold-500/[0.05] blur-[120px]" />
        <div className="absolute inset-0 grain opacity-[0.05]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-14 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ===== LEFT — Editorial headline ===== */}
          <div className="lg:col-span-7 xl:col-span-6 order-2 lg:order-1">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/25 bg-gold-500/[0.07] py-1.5 pl-2 pr-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-ember-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ember-500" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-gold-300">
                  Voted Lagos&rsquo; #1 Gourmet Burger Brand
                </span>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-7 font-display font-extrabold tracking-[-0.03em] leading-[0.96] text-cream-50 text-[2rem] sm:text-[2.6rem] md:text-6xl lg:text-[5.1vw] xl:text-6xl 2xl:text-7xl">
                BIG FLAVOR.
                <span className="block mt-1.5 text-gradient-flame">
                  BIGGER CRAVINGS.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-6 max-w-lg text-[15px] sm:text-base lg:text-lg text-cream-300/90 leading-relaxed font-normal">
                Hand-smashed 100% prime Angus patties seared at 450°F, aged
                cheddar pulled to order, and secret-recipe sauces — built in
                seconds, delivered sizzling hot in under 30 minutes.
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button type="button" onClick={onQuickOrder} className="btn-primary">
                  Order Now
                  <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
                </button>
                <button type="button" onClick={onExploreMenu} className="btn-ghost">
                  Explore Menu
                  <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-gold-300">
                    25+ dishes
                  </span>
                </button>
              </div>
            </Reveal>

            <Reveal delay={330}>
              <dl className="mt-10 max-w-md grid grid-cols-3 gap-3 sm:gap-4 border-t border-white/[0.08] pt-6">
                {TRUST_METRICS.map((m) => (
                  <div key={m.label} className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
                    <dt className="sr-only">{m.label}</dt>
                    <div className={m.tone + ' flex w-10 h-10 shrink-0 items-center justify-center rounded-xl border'}>
                      <m.icon className="w-[18px] h-[18px]" />
                    </div>
                    <dd>
                      <div className="font-display text-sm sm:text-base font-bold text-cream-50 leading-tight">
                        {m.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-cream-500 font-semibold mt-0.5">
                        {m.label}
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* ===== RIGHT — Cinematic product presentation ===== */}
          <div className="lg:col-span-5 xl:col-span-6 order-1 lg:order-2">
            <Reveal delay={140} y={36}>
              <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[520px] xl:max-w-[560px]">
                {/* Fire glow behind the plate */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 -top-14 -bottom-20 spotlight blur-2xl"
                />

                {/* Slow rotating orbit ring */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-5 sm:-inset-9 hidden sm:block rounded-full border border-dashed border-white/[0.08] animate-spin-slow"
                />

                {/* The burger plate */}
                <div style={layer(8)} className="relative z-10">
                  <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] border border-white/[0.09] bg-ink-850 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
                    <img
                      src={heroBurger}
                      alt="The Big Classic — double smashed Angus patty with melted aged cheddar, seared on a toasted brioche bun"
                      className="w-full h-auto block"
                    />
                    {/* Inner highlight + bottom vignette */}
                    <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.07]" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/70 to-transparent" />

                    {/* Product caption — floats like a price tag */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-ink-950/80 backdrop-blur-xl border border-white/[0.1] px-4 py-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-[13px] font-bold text-cream-50 truncate">
                            The Big Classic
                          </span>
                          <span className="hidden sm:inline-block rounded bg-ember-500 px-1.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-ink-950">
                            Signature
                          </span>
                        </div>
                        <p className="text-[11px] text-cream-400 mt-0.5 truncate">
                          Smashed Angus · Aged Cheddar · Secret Sauce
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block text-[10px] text-cream-600 line-through">
                          ₦5,500
                        </span>
                        <span className="font-display text-base font-extrabold text-gold-300">
                          ₦4,800
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge — quality guarantee */}
                <div
                  style={layer(-14)}
                  className="absolute -top-4 -right-2 sm:-top-7 sm:-right-7 z-20"
                >
                  <div className="flex items-center gap-3 rounded-2xl bg-ink-900/90 backdrop-blur-xl border border-white/[0.12] p-3 sm:p-3.5 shadow-glow-soft animate-float">
                    <span className="grid w-10 h-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-ember-500 text-ink-950">
                      <Beef className="w-5 h-5" strokeWidth={2.2} />
                    </span>
                    <span>
                      <span className="block text-xs font-extrabold text-cream-50">
                        100% Prime Angus
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-[10px] font-bold text-gold-300">
                        <CheckCircle2 className="w-3 h-3" /> Never Frozen
                      </span>
                    </span>
                  </div>
                </div>

                {/* Floating badge — social proof */}
                <div
                  style={layer(-10)}
                  className="absolute -bottom-6 -left-2 sm:-bottom-8 sm:-left-8 z-20"
                >
                  <div className="flex items-center gap-3 rounded-2xl bg-ink-900/90 backdrop-blur-xl border border-white/[0.12] p-3 sm:p-3.5 shadow-glow-soft animate-float-reverse">
                    <span className="flex -space-x-2.5">
                      {[
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
                      ].map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="h-8 w-8 rounded-full object-cover ring-2 ring-ink-900"
                        />
                      ))}
                    </span>
                    <span>
                      <span className="flex items-center gap-1 text-xs font-extrabold text-gold-300">
                        <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                        4.9 / 5.0
                      </span>
                      <span className="block text-[10px] text-cream-400 font-semibold mt-0.5">
                        2,500+ happy foodies
                      </span>
                    </span>
                  </div>
                </div>

                {/* Floating chip — heat */}
                <div
                  style={layer(-18)}
                  className="hidden sm:block absolute top-1/2 -left-10 -translate-y-1/2 z-20"
                >
                  <div className="flex items-center gap-2 rounded-xl bg-ink-900/90 backdrop-blur-xl border border-white/[0.12] px-3.5 py-2.5 shadow-glow-soft animate-float-slow">
                    <Flame className="w-4 h-4 text-ember-500 fill-ember-500/60" />
                    <span className="text-[11px] font-bold text-cream-200 whitespace-nowrap">
                      Fresh off the grill · 450°F
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="hidden lg:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-cream-600"
        aria-hidden="true"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.34em]">Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-cream-600/70 to-transparent animate-pulse-soft" />
      </div>
    </section>
  );
}
