import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { useLockBodyScroll, useEscape } from '../hooks/useMotion';
import Logo from './Logo';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu as MenuIcon,
  X,
  Bike,
  PhoneCall,
  Clock,
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Favorites', href: '#favorites' },
  { name: 'Menu', href: '#menu' },
  { name: 'Offers', href: '#offers' },
  { name: 'Why Us', href: '#about' },
  { name: 'Reviews', href: '#reviews' },
];

export default function Navbar({ onSearchOpen }) {
  const {
    totalItemsCount,
    subtotal,
    favorites,
    setIsCartOpen,
    setIsFavoritesOpen,
    activeOrder,
    setIsTrackerOpen,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useLockBodyScroll(mobileMenuOpen);
  useEscape(() => setMobileMenuOpen(false), mobileMenuOpen);

  // Header transformation on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy for active nav state
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-38% 0px -55% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 84;
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-ink-950/85 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.7)]'
          : 'bg-ink-950/40 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px] gap-3">
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            aria-label="Big Burger — back to top"
            className="shrink-0"
          >
            <Logo />
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-0.5"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3.5 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-cream-50' : 'text-cream-400 hover:text-cream-100'
                  }`}
                >
                  {link.name}
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 -bottom-0.5 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-ember-500 transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search */}
            <button
              type="button"
              onClick={onSearchOpen}
              className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-cream-300 hover:text-cream-50 hover:bg-white/[0.08] transition-all duration-200"
              title="Search menu"
              aria-label="Search menu items"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Favorites */}
            <button
              type="button"
              onClick={() => setIsFavoritesOpen(true)}
              className="relative p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-cream-300 hover:text-rose-300 hover:bg-white/[0.08] transition-all duration-200"
              title="View favorites"
              aria-label={`Favorites (${favorites.length})`}
            >
              <Heart
                className={`w-4 h-4 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`}
              />
              {favorites.length > 0 && (
                <span
                  key={favorites.length}
                  className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-black grid place-items-center ring-2 ring-ink-950 animate-pop"
                >
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Active order */}
            {activeOrder && (
              <button
                type="button"
                onClick={() => setIsTrackerOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 h-10 rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-xs font-bold hover:bg-emerald-400/20 transition-colors"
                title="Track active order"
              >
                <Bike className="w-4 h-4" />
                Track Order
              </button>
            )}

            {/* Cart */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-2 h-10 sm:h-11 rounded-full pl-3 pr-3.5 sm:pr-4 text-sm font-bold text-white bg-gradient-to-b from-ember-400 via-ember-500 to-ember-600 ring-1 ring-inset ring-white/25 shadow-glow-ember transition-all duration-200 hover:brightness-110 hover:-translate-y-px active:scale-95"
              aria-label={`Open cart — ${totalItemsCount} items`}
            >
              <span className="relative">
                <ShoppingBag className="w-4 h-4" strokeWidth={2.4} />
                {totalItemsCount > 0 && (
                  <span
                    key={totalItemsCount}
                    className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-ink-950 text-gold-300 text-[10px] font-black grid place-items-center ring-1 ring-gold-400/60 animate-pop"
                  >
                    {totalItemsCount}
                  </span>
                )}
              </span>
              <span className="hidden sm:block text-[13px] tracking-tight">
                {totalItemsCount > 0 ? formatPrice(subtotal) : 'Cart'}
              </span>
            </button>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-cream-300 hover:text-cream-50 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-ink-900/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-glow-soft animate-fade-in">
          <nav aria-label="Mobile" className="px-4 pt-3 pb-6 space-y-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="flex items-center justify-between px-3.5 py-3.5 rounded-xl text-[15px] font-semibold text-cream-100 hover:bg-white/[0.05] transition-colors"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span>{link.name}</span>
                <span className="text-cream-600 text-xs" aria-hidden="true">
                  →
                </span>
              </a>
            ))}

            {activeOrder && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTrackerOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 font-bold text-sm"
              >
                <Bike className="w-4 h-4" />
                Track Active Order ({activeOrder.orderId})
              </button>
            )}

            <div className="pt-4 mt-4 border-t border-white/[0.07] flex items-center justify-between text-xs text-cream-500 px-1">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-ember-500" />
                +234 800 BIG BURGER
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                Open till 11 PM
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
