import React from 'react';
import { WHY_US_ITEMS, STATS, QUALITY_PILLARS } from '../data/menuData';
import Reveal from './ui/Reveal';
import { useInView, useCountUp, usePrefersReducedMotion } from '../hooks/useMotion';
import { Flame, Beef, Bike, HeartHandshake, Quote } from 'lucide-react';
import grillSmash from '../assets/grill-smash.jpg';

const CRAFT_ICONS = [
  <Flame key="flame" className="w-5 h-5" strokeWidth={2} />,
  <Beef key="beef" className="w-5 h-5" strokeWidth={2} />,
  <Bike key="bike" className="w-5 h-5" strokeWidth={2} />,
  <HeartHandshake key="love" className="w-5 h-5" strokeWidth={2} />,
];

function StatBlock({ stat, index, started }) {
  const value = useCountUp(stat.target, { start: started, duration: 1900 + index * 150 });
  const display =
    stat.decimals != null
      ? value.toFixed(stat.decimals)
      : Math.round(value).toLocaleString('en-US');

  return (
    <div className="flex flex-col items-center text-center gap-1.5">
      <span className="font-display text-3xl sm:text-4xl lg:text-[2.9rem] font-extrabold tracking-tight text-cream-50 tabular-nums">
        {display}
        <span className="text-gradient-flame">{stat.suffix || ''}</span>
      </span>
      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-cream-500">
        {stat.label}
      </span>
      {stat.sub && (
        <span className="text-[10px] text-cream-600 -mt-0.5">{stat.sub}</span>
      )}
    </div>
  );
}

/**
 * "The Standard" — a luxury brand-campaign section communicating craft.
 */
export default function WhyBigBurger() {
  const [statsRef, statsInView] = useInView(0.3);
  const reduced = usePrefersReducedMotion();

  return (
    <section id="about" className="relative py-16 sm:py-24 overflow-hidden">
      <div
        className="absolute bottom-0 -left-40 w-[30rem] h-[30rem] rounded-full bg-ember-500/[0.05] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* ===== Manifesto ===== */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">
                <span className="w-6 h-px bg-gold-500/60" aria-hidden="true" />
                The Big Burger Standard
              </p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.2rem] xl:text-[2.5rem] font-extrabold tracking-[-0.025em] leading-[1.02] text-cream-50">
                Crafted like a brand.
                <br />
                <span className="text-gradient-flame">Served like a promise.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm sm:text-[15px] text-cream-400 leading-relaxed">
                No frozen patties. No shortcuts. No heat lamps. Every order is a
                masterclass in sear, cheese melt and flavor balance — the same
                standard, every single day.
              </p>
            </Reveal>

            <div className="mt-10">
              {QUALITY_PILLARS.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 90}>
                  <div className="group flex gap-5 border-t border-white/[0.07] py-5 last:border-b">
                    <span className="pt-1 font-display text-xs font-bold text-ember-500/90 tabular-nums">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-cream-50 transition-colors duration-300 group-hover:text-gold-200">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] sm:text-sm text-cream-500 leading-relaxed">
                        {pillar.sub}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ===== Craft imagery + cards ===== */}
          <div className="lg:col-span-7 space-y-5">
            <Reveal y={32}>
              <figure className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] shadow-glow-soft h-60 sm:h-80">
                <img
                  src={grillSmash}
                  alt="A beef patty smashed on a 450°F grill with live flame"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute top-4 right-4 chip !py-1.5">
                  <Flame className="w-3 h-3 text-ember-400 fill-ember-400/60" />
                  450°F cast iron
                </span>
                <figcaption className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-10">
                  <Quote className="w-5 h-5 text-gold-400/70 mb-2" aria-hidden="true" />
                  <p className="font-display text-lg sm:text-2xl font-bold tracking-tight text-cream-50 leading-snug">
                    &ldquo;If it doesn&rsquo;t sizzle, it doesn&rsquo;t leave
                    the kitchen.&rdquo;
                  </p>
                </figcaption>
              </figure>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {WHY_US_ITEMS.map((item, i) => (
                <Reveal key={item.title} delay={i * 80} className="h-full">
                  <div className="group h-full rounded-[1.25rem] bg-ink-800 border border-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ember-500/25 hover:shadow-card-hover">
                    <span className="grid w-11 h-11 place-items-center rounded-xl border border-ember-500/20 bg-ember-500/10 text-ember-400 transition-transform duration-300 group-hover:scale-105">
                      {CRAFT_ICONS[i]}
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold tracking-tight text-cream-50">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-cream-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Numbers ===== */}
        <Reveal delay={100}>
          <div
            ref={statsRef}
            className="relative mt-16 sm:mt-20 overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-gradient-to-r from-ink-850 via-ink-800 to-ink-850 px-6 sm:px-10 py-9 sm:py-12"
          >
            <div className="absolute inset-0 grain opacity-[0.05] pointer-events-none" aria-hidden="true" />
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-[26rem] h-48 rounded-full bg-ember-500/[0.08] blur-[90px] pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {STATS.map((stat, i) => (
                <StatBlock
                  key={stat.label}
                  stat={stat}
                  index={i}
                  started={statsInView || reduced}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
