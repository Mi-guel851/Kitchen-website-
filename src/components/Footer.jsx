import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Logo from './Logo';
import Reveal from './ui/Reveal';
import {
  Clock,
  Phone,
  MapPin,
  Send,
  Heart,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight,
} from 'lucide-react';

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Customer Favorites', href: '#favorites' },
  { label: 'Explore Menu', href: '#menu' },
  { label: 'Special 20% Offer', href: '#offers' },
  { label: 'Why Big Burger', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
];

export default function Footer({ onCategoryClick }) {
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
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 84;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-900">
      <div
        className="absolute bottom-[-6rem] left-1/2 -translate-x-1/2 w-[42rem] h-48 rounded-full bg-ember-500/[0.07] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-10">
        {/* Final conversion band */}
        <Reveal>
          <div className="mb-14 sm:mb-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-[1.5rem] border border-white/[0.07] bg-gradient-to-r from-ink-800 to-ink-850 px-6 sm:px-10 py-8 sm:py-9">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-cream-50">
                Hungry yet?
              </h2>
              <p className="mt-1.5 text-sm text-cream-400">
                Your first order is 20% off. The grill is hot.
              </p>
            </div>
            <a href="#menu" onClick={(e) => handleNavClick(e, '#menu')} className="btn-primary shrink-0">
              Start Your Order
              <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
            </a>
          </div>
        </Reveal>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <Logo />
            <p className="text-[13px] leading-relaxed text-cream-500 max-w-xs">
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
                  className="grid w-9 h-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-cream-400 transition-all duration-200 hover:text-cream-50 hover:bg-white/[0.09] hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <h3 className="text-[11px] font-black uppercase tracking-[0.22em] text-cream-400">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[13px] text-cream-500 hover:text-cream-100 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-black uppercase tracking-[0.22em] text-cream-400">
              Visit &amp; Contact
            </h3>
            <div className="mt-4 space-y-3.5 text-[13px]">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 w-4 h-4 shrink-0 text-gold-400" />
                <span>
                  <span className="block font-bold text-cream-100">Open Daily</span>
                  <span className="text-cream-500">10:00 AM — 11:00 PM</span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 w-4 h-4 shrink-0 text-ember-500" />
                <span>
                  <span className="block font-bold text-cream-100">Main Kitchen HQ</span>
                  <span className="text-cream-500">14 Victoria Island Boulevard, Lagos</span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  <span className="block font-bold text-cream-100">Hotline &amp; Delivery</span>
                  <span className="text-cream-500">+234 800 BIG BURGER</span>
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-black uppercase tracking-[0.22em] text-cream-400">
              VIP Food Deals
            </h3>
            <p className="mt-4 text-[13px] leading-relaxed text-cream-500">
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
                className="w-full bg-ink-950/70 border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-cream-50 placeholder-cream-600 transition-all duration-200 focus:outline-none focus:border-ember-500/70 focus:ring-2 focus:ring-ember-500/20"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ember-500 hover:bg-ember-400 px-4 py-3 text-[13px] font-bold text-ink-950 transition-all duration-200 hover:shadow-glow-ember active:scale-[0.98]"
              >
                Join &amp; Get 20% Off
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream-600">
          <span>
            © {new Date().getFullYear()} Big Burger Brand Ltd. All rights reserved.
          </span>
          <span className="flex items-center gap-3">
            <a href="#" className="hover:text-cream-300 transition-colors">Privacy</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-cream-300 transition-colors">Terms</a>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              Made with
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              in Lagos
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
