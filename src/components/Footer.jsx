import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Logo from './Logo';
import {
  Clock,
  Phone,
  MapPin,
  Send,
  Heart,
  Instagram,
  Twitter,
  Facebook,
} from 'lucide-react';

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Special 20% Offer', href: '#offers' },
  { label: 'Why Big Burger', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
];

export default function Footer() {
  const { showToast, applyCoupon } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    showToast('Subscribed! Here is 20% off: BIGBURGER20', 'promo', 'Welcome to the Burger Club!');
    applyCoupon('BIGBURGER20');
    setNewsletterEmail('');
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 92;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-cocoa-950 text-cream-50">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />

      <div className="shell relative pb-10 pt-14 sm:pt-16">
        {/* Final call */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-cream-50/10 pb-12 sm:mb-16 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-[clamp(1.7rem,5vw,2.4rem)] font-extrabold tracking-tight text-cream-50">
              Hungry yet?
            </h2>
            <p className="mt-1.5 text-sm text-cream-50/60">
              Your first order is 20% off. The grill is hot.
            </p>
          </div>
          <a href="#menu" onClick={(e) => handleNavClick(e, '#menu')} className="btn-caramel shrink-0">
            Start Your Order
          </a>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-4">
            <Logo dark />
            <p className="max-w-xs text-[13px] leading-relaxed text-cream-50/55">
              Lagos&rsquo; premier artisan burger &amp; grill. Hand-smashed 100%
              prime Angus, daily-baked brioche, stone-baked pizza and crispy
              chicken — delivered piping hot.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Facebook, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-cream-50/15 text-cream-50/60 transition-all duration-200 hover:border-caramel-400/60 hover:text-caramel-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-caramel-400">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[13px] text-cream-50/60 transition-colors hover:text-cream-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-caramel-400">
              Visit &amp; Contact
            </h3>
            <div className="mt-4 space-y-3.5 text-[13px]">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-caramel-400" />
                <span>
                  <span className="block font-bold text-cream-50">Open Daily</span>
                  <span className="text-cream-50/55">10:00 AM — 11:00 PM</span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-caramel-400" />
                <span>
                  <span className="block font-bold text-cream-50">Main Kitchen HQ</span>
                  <span className="text-cream-50/55">14 Victoria Island Boulevard, Lagos</span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-caramel-400" />
                <span>
                  <span className="block font-bold text-cream-50">Hotline &amp; Delivery</span>
                  <span className="text-cream-50/55">+234 800 BIG BURGER</span>
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-caramel-400">
              VIP Food Deals
            </h3>
            <p className="mt-4 text-[13px] leading-relaxed text-cream-50/55">
              Secret weekly drops, promo vouchers and free-fries codes. No
              spam, just flavor.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 space-y-2.5">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-cream-50/15 bg-cream-50/[0.06] px-4 py-3 text-[13px] text-cream-50 placeholder-cream-50/40 transition-all duration-200 focus:outline-none focus:border-caramel-400/70 focus:ring-2 focus:ring-caramel-400/20"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-caramel-500 px-4 py-3 text-[13px] font-bold text-cocoa-950 transition-all duration-200 hover:bg-caramel-400 active:scale-[0.98]"
              >
                Join &amp; Get 20% Off
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream-50/10 pt-8 text-[11px] text-cream-50/45 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Big Burger Brand Ltd. All rights reserved.
          </span>
          <span className="flex items-center gap-3">
            <a href="#" className="transition-colors hover:text-cream-50/80">Privacy</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="transition-colors hover:text-cream-50/80">Terms</a>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              Made with
              <Heart className="h-3 w-3 fill-caramel-500 text-caramel-500" />
              in Lagos
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
