import React, { useEffect, useState } from 'react';
import { Flame, Star, Beef, ArrowRight, CheckCircle2 } from 'lucide-react';
import Reveal from './ui/Reveal';
import { usePrefersReducedMotion } from '../hooks/useMotion';
import heroBurger from '../assets/hero-burger-cream.jpg';

/**
 * Editorial hero.
 * Mobile: image → one quality badge → headline → copy → CTAs.
 * Desktop: two columns — copy left, burger right with a single floating badge.
 * Built on grid + clamp(); the burger is the hero.
 */
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
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform',
  });

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="shell grid grid-cols-1 items-center gap-10 pb-14 pt-8 sm:gap-12 sm:pt-12 lg:grid-cols-12 lg:gap-6 lg:pb-24 lg:pt-16">
        {/* ===== Visual — first on mobile, right column on desktop ===== */}
        <div className="order-1 lg:order-2 lg:col-span-6">
          <Reveal y={24}>
            <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[540px]">
              {/* Warm caramel halo behind the burger */}
              <div
                aria-hidden="true"
                className="halo-caramel pointer-events-none absolute -inset-x-6 -inset-y-8 sm:-inset-x-10"
              />

              {/* Ground shadow — the burger sits just above the page */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[3%] left-1/2 h-10 w-[72%] -translate-x-1/2 rounded-[100%] bg-cocoa-900/25 blur-2xl"
              />

              {/* The burger — blends seamlessly into the cream paper */}
              <div style={layer(10)} className="relative">
                <img
                  src={heroBurger}
                  alt="The Big Classic — double smashed Angus patty with melted aged cheddar on a toasted brioche bun"
                  className="block aspect-square w-full object-contain"
                  width="1024"
                  height="1024"
                  fetchpriority="high"
                />
              </div>

              {/* Single floating quality badge — the only overlapping element */}
              <div style={layer(-14)} className="absolute -bottom-3 left-0 z-10 sm:-bottom-5 sm:left-2 lg:-left-2">
                <div className="flex animate-float items-center gap-3 rounded-2xl border border-cream-300 bg-white/95 p-3 shadow-float backdrop-blur-sm sm:p-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-caramel-100 text-caramel-600">
                    <Beef className="h-5 w-5" strokeWidth={2.1} />
                  </span>
                  <span>
                    <span className="block font-display text-[13px] font-extrabold leading-tight text-cocoa-900">
                      100% Prime Angus
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 text-[10.5px] font-bold text-cocoa-500">
                      <CheckCircle2 className="h-3 w-3 text-success-500" />
                      Never frozen
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ===== Copy — left column on desktop ===== */}
        <div className="order-2 text-center lg:order-1 lg:col-span-6 lg:text-left">
          <Reveal>
            <p className="eyebrow justify-center lg:justify-start">
              <Flame className="h-3.5 w-3.5 fill-caramel-400 text-caramel-400" aria-hidden="true" />
              Lagos&rsquo; #1 gourmet burger bar
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-[clamp(2.85rem,11.5vw,4.25rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-cocoa-900 sm:text-[clamp(3.4rem,8vw,4.75rem)] lg:text-[clamp(3rem,4.6vw,4.6rem)]">
              BIG FLAVOR.
              <span className="block">BIGGER</span>
              <span className="block text-caramel-500">CRAVINGS.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-[34rem] text-[15px] leading-relaxed text-cocoa-500 sm:text-base lg:mx-0 lg:text-lg">
              Hand-smashed 100% prime Angus patties seared at 450°F, aged
              cheddar pulled to order, and secret-recipe sauces — delivered
              sizzling hot in under 30 minutes.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <button type="button" onClick={onQuickOrder} className="btn-primary">
                Order Now
                <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
              </button>
              <button type="button" onClick={onExploreMenu} className="btn-secondary">
                Explore Menu
              </button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] font-semibold text-cocoa-500 lg:justify-start">
              <span className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-caramel-400 text-caramel-400"
                    aria-hidden="true"
                  />
                ))}
              </span>
              <span className="font-extrabold text-cocoa-900">4.9</span>
              <span aria-hidden="true">·</span>
              <span>2,500+ happy foodies</span>
              <span className="hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="hidden sm:inline">28-min average delivery</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
