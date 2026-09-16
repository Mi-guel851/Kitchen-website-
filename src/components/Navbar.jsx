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
      const navOffset = 92;
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-cream-300 bg-cream-50/90 shadow-[0_10px_32px_-20px_rgba(36,19,13,0.25)] backdrop-blur-xl'
          : 'border-b border-transparent bg-cream-100/70 backdrop-blur-md'
      }`}
    >
      <div className="shell">
        <div className="flex h-16 items-center justify-between gap-2 sm:h-[72px] sm:gap-4">
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
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[13px] font-bold tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'bg-cocoa-900/[0.06] text-cocoa-900'
                      : 'text-cocoa-500 hover:text-cocoa-900'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Search */}
            <button
              type="button"
              onClick={onSearchOpen}
              className="btn-icon hidden sm:grid"
              title="Search menu"
              aria-label="Search menu items"
            >
              <Search className="h-[17px] w-[17px]" />
            </button>

            {/* Favorites */}
            <button
              type="button"
              onClick={() => setIsFavoritesOpen(true)}
              className="btn-icon hidden sm:grid"
              title="View favorites"
              aria-label={`Favorites (${favorites.length})`}
            >
              <Heart
                className={`h-[17px] w-[17px] ${
                  favorites.length > 0 ? 'fill-caramel-500 text-caramel-500' : ''
                }`}
              />
              {favorites.length > 0 && (
                <span
                  key={favorites.length}
                  className="absolute -right-1 -top-1 grid h-[17px] min-w-[17px] animate-pop place-items-center rounded-full bg-caramel-500 px-1 text-[9px] font-black text-cocoa-950 ring-2 ring-cream-50"
                >
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Active order — desktop only chip */}
            {activeOrder && (
              <button
                type="button"
                onClick={() => setIsTrackerOpen(true)}
                className="hidden h-10 items-center gap-2 rounded-full border border-success-500/30 bg-success-500/10 px-3.5 text-xs font-bold text-success-500 transition-colors hover:bg-success-500/15 md:inline-flex"
                title="Track active order"
              >
                <Bike className="h-4 w-4" />
                Track Order
              </button>
            )}

            {/* Cart */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex h-10 items-center gap-2 rounded-full bg-cocoa-900 pl-3 pr-3.5 text-sm font-bold text-cream-50 shadow-btn transition-all duration-200 hover:bg-cocoa-800 hover:shadow-btn-hover active:scale-95 sm:h-11 sm:pr-4"
              aria-label={`Open cart — ${totalItemsCount} items`}
            >
              <span className="relative">
                <ShoppingBag className="h-4 w-4" strokeWidth={2.4} />
                {totalItemsCount > 0 && (
                  <span
                    key={totalItemsCount}
                    className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] animate-pop place-items-center rounded-full bg-caramel-400 px-1 text-[10px] font-black text-cocoa-950 ring-2 ring-cocoa-900"
                  >
                    {totalItemsCount}
                  </span>
                )}
              </span>
              <span className="hidden text-[13px] tracking-tight sm:block">
                {totalItemsCount > 0 ? formatPrice(subtotal) : 'Cart'}
              </span>
            </button>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="btn-icon lg:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-full animate-fade-in border-b border-cream-300 bg-cream-50 shadow-float lg:hidden">
          <nav aria-label="Mobile" className="shell space-y-1 px-0 pb-6 pt-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="flex items-center justify-between rounded-xl px-3.5 py-3.5 text-[15px] font-bold text-cocoa-900 transition-colors hover:bg-cocoa-900/[0.04]"
              >
                <span>{link.name}</span>
                <span className="text-cocoa-400 text-xs" aria-hidden="true">
                  →
                </span>
              </a>
            ))}

            {/* Mobile-only search + favorites */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSearchOpen();
                }}
                className="btn-secondary flex-1 !py-3 text-xs"
              >
                <Search className="h-4 w-4" />
                Search menu
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsFavoritesOpen(true);
                }}
                className="btn-secondary flex-1 !py-3 text-xs"
              >
                <Heart className="h-4 w-4" />
                Favorites ({favorites.length})
              </button>
            </div>

            {activeOrder && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTrackerOpen(true);
                }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-success-500/30 bg-success-500/10 py-3.5 text-sm font-bold text-success-500"
              >
                <Bike className="h-4 w-4" />
                Track Active Order ({activeOrder.orderId})
              </button>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-cream-300 px-1 pt-4 text-xs text-cocoa-500">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="h-3.5 w-3.5 text-caramel-500" />
                +234 800 BIG BURGER
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-caramel-500" />
                Open till 11 PM
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
