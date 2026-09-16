import React, { useState, useRef } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { formatPrice } from './utils/format';
import PromoStrip from './components/PromoStrip';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickStats from './components/QuickStats';
import MenuSection from './components/MenuSection';
import PromoBanner from './components/PromoBanner';
import WhyBigBurger from './components/WhyBigBurger';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import ReviewModal from './components/ReviewModal';
import ToastContainer from './components/Toast';
import { ShoppingBag, ArrowRight, Bike } from 'lucide-react';

function MainApp() {
  const {
    totalItemsCount,
    subtotal,
    setIsCartOpen,
    activeOrder,
    setIsTrackerOpen,
  } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const searchInputRef = useRef(null);

  const handleOpenProductModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
  };

  const handleSearchTrigger = () => {
    const menuEl = document.querySelector('#menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 500);
  };

  const handleScrollToMenu = () => {
    const menuEl = document.querySelector('#menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream-100 text-cocoa-900">
      {/* Skip link (a11y) */}
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[110] focus:rounded-full focus:bg-cocoa-900 focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-cream-50"
      >
        Skip to menu
      </a>

      <ToastContainer />

      {/* Campaign strip + sticky navbar */}
      <PromoStrip />
      <Navbar onSearchOpen={handleSearchTrigger} />

      <main className="flex-1">
        <Hero onExploreMenu={handleScrollToMenu} onQuickOrder={handleScrollToMenu} />
        <QuickStats />
        <MenuSection onOpenModal={handleOpenProductModal} searchInputRef={searchInputRef} />
        <PromoBanner />
        <WhyBigBurger />
        <CustomerReviews onOpenReviewModal={() => setIsReviewModalOpen(true)} />
      </main>

      <Footer />

      {/* Overlays */}
      <ProductModal product={selectedProduct} onClose={handleCloseProductModal} />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <FavoritesDrawer onOpenModal={handleOpenProductModal} />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      {/* Floating cart pill — bottom center */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 sm:bottom-6">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="group flex w-full items-center justify-between gap-3 rounded-2xl bg-cocoa-900 px-5 py-3.5 text-left shadow-btn-hover transition-all duration-200 hover:-translate-y-0.5 hover:bg-cocoa-800 active:scale-[0.98] animate-toast-in"
            aria-label={`View cart — ${totalItemsCount} items, total ${formatPrice(subtotal)}`}
          >
            <span className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cream-50/10">
                <ShoppingBag className="h-5 w-5 text-caramel-400" strokeWidth={2.4} />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold uppercase tracking-[0.18em] text-cream-50/55">
                  {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} in bag
                </span>
                <span
                  key={subtotal}
                  className="block font-display text-base font-extrabold leading-tight text-cream-50 tabular-nums animate-pop"
                >
                  {formatPrice(subtotal)}
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 rounded-xl bg-caramel-500 px-3 py-2 text-xs font-extrabold text-cocoa-950">
              View Cart
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.6} />
            </span>
          </button>
        </div>
      )}

      {/* Floating active-order pill — bottom right */}
      {activeOrder && totalItemsCount === 0 && (
        <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
          <button
            type="button"
            onClick={() => setIsTrackerOpen(true)}
            className="flex animate-toast-in items-center gap-2.5 rounded-2xl border border-cream-300 bg-white p-3 shadow-float transition-all duration-200 hover:-translate-y-0.5 active:scale-95 sm:px-4 sm:py-3"
            aria-label={`Track order ${activeOrder.orderId}`}
          >
            <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-success-500 text-white">
              <Bike className="h-4 w-4" strokeWidth={2.4} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-caramel-400 animate-pulse-soft" />
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-[9.5px] font-bold uppercase tracking-[0.16em] text-cocoa-400">
                Order #{activeOrder.orderId}
              </span>
              <span className="block text-xs font-extrabold text-cocoa-900">Tracking delivery</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
