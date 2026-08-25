import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  Flame,
  Clock,
  Phone,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  Heart,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';

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

  return (
    <footer className="bg-[#0A0B10] border-t border-white/10 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#FF5A1F]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5A1F] to-[#E63946] flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Flame className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                BIG <span className="text-[#FF5A1F]">BURGER</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Lagos' premier artisan burger and grill platform. Hand-smashed 100% prime Angus beef, daily baked potato brioche, stone-baked pizzas, and crispy chicken delivered piping hot to your door.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#favorites" className="hover:text-white transition-colors">
                  Customer Favorites
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Explore Menu
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-white transition-colors">
                  Special 20% Offer
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Why Big Burger
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kitchen & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Hours & Location
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Open Daily</span>
                  <span>10:00 AM — 11:00 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Main Kitchen HQ</span>
                  <span>14 Victoria Island Boulevard, Lagos</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Hotline & Delivery</span>
                  <span>+234 800 BIG BURGER</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter & Club (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Get VIP Food Deals
            </h4>
            <p className="text-xs text-slate-400">
              Subscribe to get secret weekly burger drops, promo vouchers, and free fries coupon codes.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#151924] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-[#E84A12] text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Join & Get 20% OFF</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Big Burger Brand Ltd. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span className="text-slate-400 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> for food lovers
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
