import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu as MenuIcon,
  X,
  Flame,
  Clock,
  Bike,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function Navbar({ onSearchOpen }) {
  const {
    cartItems,
    totalItemsCount,
    subtotal,
    favorites,
    setIsCartOpen,
    setIsFavoritesOpen,
    activeOrder,
    setIsTrackerOpen
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Customer Favorites', href: '#favorites' },
    { name: 'Menu', href: '#menu' },
    { name: 'Special Offers', href: '#offers' },
    { name: 'Why Us', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-[#FF5A1F] via-[#F59E0B] to-[#FF5A1F] text-black font-semibold text-xs py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 overflow-hidden shadow-inner">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 fill-black" />
          <span>FIRST ORDER DEAL: Use code <strong className="bg-black/15 px-1.5 py-0.5 rounded font-black tracking-wider">BIGBURGER20</strong> for 20% OFF</span>
        </span>
        <span className="hidden sm:inline-block">• Free delivery on orders over ₦15,000</span>
        <span className="hidden md:inline-flex items-center gap-1 ml-3 bg-black text-amber-300 px-2 py-0.5 rounded-full text-[11px]">
          <Clock className="w-3 h-3" /> Open Daily: 10AM - 11PM
        </span>
      </div>

      {/* Main Glass Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08090C]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
            : 'bg-[#08090C]/60 backdrop-blur-md border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            className="flex items-center gap-3 group cursor-pointer select-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF5A1F] to-[#E63946] shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-white fill-white animate-pulse" />
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-black text-[9px] font-black px-1 rounded-full border border-black">
                PRO
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
                BIG <span className="text-[#FF5A1F] ml-1">BURGER</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1 flex items-center gap-1">
                Gourmet & Grill <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onSearchOpen}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              title="Search menu items"
              aria-label="Search menu"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Favorites Button */}
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-rose-400 hover:bg-white/10 transition-all"
              title="View favorites"
              aria-label="Favorites"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Active Order Tracker Button (shown if user has active order) */}
            {activeOrder && (
              <button
                onClick={() => setIsTrackerOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all animate-pulse"
                title="Track Active Order"
              >
                <Bike className="w-4 h-4" />
                <span>Track Order</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 hover:opacity-95 active:scale-95 transition-all group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-amber-400 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-amber-400/50">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden xs:inline-block font-extrabold">
                {totalItemsCount > 0 ? (
                  <span className="flex items-center gap-1.5">
                    <span>{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}</span>
                    <span className="opacity-60">•</span>
                    <span>{formatPrice(subtotal)}</span>
                  </span>
                ) : (
                  'Cart'
                )}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0F1219]/95 backdrop-blur-2xl border-b border-white/10 px-4 py-6 mt-3 space-y-3 animate-in fade-in duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="px-4 py-3 rounded-xl text-slate-200 font-medium hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-slate-500 text-xs">→</span>
                </a>
              ))}
            </div>

            {activeOrder && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsTrackerOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-sm"
                >
                  <Bike className="w-4 h-4" />
                  <span>Track Active Order ({activeOrder.orderId})</span>
                </button>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#FF5A1F]" />
                +234 800 BIG BURGER
              </span>
              <span className="text-amber-400 font-medium">Open till 11:00 PM</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
