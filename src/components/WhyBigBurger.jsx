import React from 'react';
import { WHY_US_ITEMS, STATS } from '../data/menuData';
import Reveal from './ui/Reveal';
import { useInView, useCountUp, usePrefersReducedMotion } from '../hooks/useMotion';
import grillSmash from '../assets/grill-smash.jpg';

function StatBlock({ stat, index, started }) {
  const value = useCountUp(stat.target, { start: started, duration: 1900 + index * 150 });
  const display =
    stat.decimals != null
      ? value.toFixed(stat.decimals)
      : Math.round(value).toLocaleString('en-US');

  return (
    <div className="flex flex-col items-center text-center gap-1 sm:items-start sm:text-left">
      <span className="font-display text-3xl font-extrabold tracking-tight text-cocoa-900 tabular-nums sm:text-4xl">
        {display}
        <span className="text-caramel-500">{stat.suffix || ''}</span>
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-cocoa-500">
        {stat.label}
      </span>
    </div>
  );
}

/**
 * "The Standard" — an editorial craft block. One image, one message,
 * four numbered pillars. Contrast through composition, not effects.
 */
export default function WhyBigBurger() {
  const [statsRef, statsInView] = useInView(0.3);
  const reduced = usePrefersReducedMotion();

  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ===== Copy ===== */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-rule" aria-hidden="true" />
                Why Big Burger
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,5.6vw,2.9rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-cocoa-900">
                Crafted to a standard,
                <br />
                not to a budget.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-cocoa-500 sm:text-base">
                Every patty is smashed on 450°F seasoned cast iron only when
                you order. Nothing pre-cooked, nothing under a heat lamp —
                your timer starts when you order.
              </p>
            </Reveal>

            {/* ===== Numbers ===== */}
            <Reveal delay={100}>
              <div
                ref={statsRef}
                className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8 border-t border-cream-300 pt-8"
              >
                {STATS.slice(0, 3).map((stat, i) => (
                  <StatBlock
                    key={stat.label}
                    stat={stat}
                    index={i}
                    started={statsInView || reduced}
                  />
                ))}
              </div>
            </Reveal>
          </div>

          {/* ===== Image ===== */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal delay={80} y={28}>
              <div className="relative">
                <div className="overflow-hidden rounded-4xl shadow-card-hover">
                  <img
                    src={grillSmash}
                    alt="A beef patty being smashed on a 450°F cast iron grill"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover sm:aspect-[16/11]"
                  />
                </div>
                <span className="absolute bottom-4 left-4 rounded-full bg-cocoa-950/70 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-cream-50 backdrop-blur-md">
                  Smashed at 450°F
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ===== Pillars — numbered editorial columns ===== */}
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:mt-16 lg:grid-cols-4">
          {WHY_US_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="border-t-2 border-cocoa-900 pt-5">
                <span className="font-mono text-xs font-bold text-caramel-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-display text-base font-extrabold tracking-tight text-cocoa-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-cocoa-500">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
