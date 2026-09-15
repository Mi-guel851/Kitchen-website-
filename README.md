# Big Burger — Premium Restaurant Ordering Experience

A cinematic, high-end food ordering platform for **Big Burger** — built to feel like a
premium food brand's flagship digital presence: dark, warm, and conversion-focused.

> “Cinematic burger commercial + premium e-commerce + modern luxury interface.”

## 🎨 Design System

### Color — warm fire on near-black
| Token | Hex | Role |
| --- | --- | --- |
| `ink-950 … 600` | `#0A0807 → #2F261D` | Warm near-black backgrounds & charcoal surfaces |
| `ember-200 … 700` | `#FF5A1F` core | Brand flame — CTAs, active states, highlights (used strategically) |
| `gold-200 … 600` | `#FFC14D` core | Warm amber/gold — price emphasis, eyebrows, accents |
| `cream-50 … 700` | `#FAF6EF → #5F594F` | Warm off-white typography scale |
| `emerald` | `#4ADE80` | Restrained — status only (verified, free delivery, live orders) |

### Typography
- **Sora** — display face. Tight tracking (`-0.02 / -0.03em`), leading ≈ 0.95. Editorial headlines.
- **Plus Jakarta Sans** — body/UI. High readability on dark surfaces.

### Motion
Real, purposeful motion (defined in `tailwind.config.js` + `src/hooks/useMotion.js`):
- Scroll reveals (`Reveal` component, IntersectionObserver)
- Eased count-up stats, marquee brand ticker, hero pointer-parallax
- Card elevation on hover (lift + deeper shadow + image breathe)
- Add-to-cart feedback (button state, cart-count pop, toasts)
- Modal scale-in / drawer slide-in / toast slide-in
- **`prefers-reduced-motion` fully respected** (global CSS kill-switch + JS hook checks)

### Depth (“3D” language)
Layered surfaces, 1px borders, inner highlights, warm radial spotlights behind food,
floating badges with parallax, film-grain overlays — depth without gimmicks.

## ✨ Features (all ordering functionality preserved)

- **Cinematic hero** — editorial headline, generated commercial-grade burger visual,
  floating proof badges (Angus guarantee, 4.9★ social proof, heat chip), trust metrics
- **Brand ticker + craft spec strip** under the hero
- **Customer Favorites** — hero “plate” card + 4 premium cards
- **Artisan menu** — 8 categories (typographic pill rail, **sticky** while scrolling),
  search by name/description/ingredient, feature filters (Popular / Spicy / Vegetarian),
  live counts, refined empty state
- **Product cards** — image-dominant, badges, favorite heart, quick “Customize” affordance,
  price hierarchy, Add ↔ in-cart quantity stepper
- **Product detail modal** — clear split: product info (ingredients) vs numbered order
  configuration (01 Customize extras → 02 Instructions → sticky qty + Add-to-Cart bar)
- **Cart drawer** — delivery/pickup toggle, free-delivery progress (₦15,000), coupon
  engine (`BIGBURGER20`, `FEAST10`, `FREEFRIES`), full breakdown, bold total + checkout CTA
- **Checkout** — numbered sections (method → details → delivery → payment), persistent
  order summary, Pay-on-Delivery or online card UI, confetti confirmation
- **Live order tracking** — 4-stage stepper, countdown ETA, courier card + call, receipt
- **Reviews** — featured card spans two columns, snap horizontal scroll on mobile,
  verified badges, aggregate 4.9 rating block, leave-a-review modal
- **“The Standard”** — luxury brand-campaign section: numbered quality pillars,
  cinematic grill imagery with pull-quote, craft cards, animated stat counters
- **First-order campaign** — full-bleed promo with copy-to-clipboard coupon ticket,
  live countdown, one-tap claim (applies the 20% coupon)
- **Floating cart pill + active-order pill**
- **Favorites drawer**, toasts (top-right), newsletter → 20% off
- **Persistence** — cart, favorites and active order survive refresh (localStorage)

## ♿ Accessibility
Semantic landmarks, labeled buttons/inputs, `aria-pressed`/`aria-modal`/`aria-live`,
visible `:focus-visible` rings, keyboard `Escape` closes overlays, skip-to-menu link,
body scroll-lock on overlays, reduced-motion support, alt text on imagery.

## 🛠 Tech Stack
React 18 · Vite 5 · Tailwind CSS 3 · Lucide React · Canvas Confetti
No router needed — single-page scroll architecture preserved; `CartContext` remains the
single source of truth for cart/favorites/orders.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle (~200 KB gzipped total)
```
