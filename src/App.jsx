import React, { useState, useRef } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { formatPrice } from './utils/format';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickStats from './components/QuickStats';
import BestSellers from './components/BestSellers';
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
    cartItems,
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
    <div className="min-h-screen bg-[#08090C] text-white flex flex-col selection:bg-[#FF5A1F] selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Top Glass Navbar */}
      <Navbar onSearchOpen={handleSearchTrigger} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreMenu={handleScrollToMenu}
          onQuickOrder={handleScrollToMenu}
        />
        <QuickStats />
        <BestSellers
          onOpenModal={handleOpenProductModal}
          onExploreAll={handleScrollToMenu}
        />
        <MenuSection
          onOpenModal={handleOpenProductModal}
          searchInputRef={searchInputRef}
        />
        <PromoBanner />
        <WhyBigBurger />
        <CustomerReviews
          onOpenReviewModal={() => setIsReviewModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-out Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={handleCloseProductModal}
      />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <FavoritesDrawer onOpenModal={handleOpenProductModal} />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

      {/* Floating Bottom Cart Pill (when items in cart) */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md animate-bounce-subtle">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#FF5A1F] via-[#FF7A00] to-[#E63946] text-white font-extrabold shadow-2xl shadow-orange-500/40 border border-white/20 flex items-center justify-between backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-black/25 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider font-bold opacity-90">
                  {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} In Bag
                </div>
                <div className="text-base font-black leading-none mt-0.5">
                  {formatPrice(subtotal)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-xl text-xs font-bold">
              <span>View Cart</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Floating Active Order Tracker pill if there's an active order and cart is empty */}
      {activeOrder && totalItemsCount === 0 && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={() => setIsTrackerOpen(true)}
            className="p-3 sm:px-4 sm:py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl shadow-emerald-500/40 border border-emerald-400/30 flex items-center gap-2.5 backdrop-blur-xl hover:scale-105 transition-all animate-pulse"
          >
            <Bike className="w-5 h-5" />
            <div className="text-left hidden sm:block">
              <span className="block text-[10px] text-emerald-100 uppercase tracking-wider">
                Order #{activeOrder.orderId}
              </span>
              <span className="block font-black text-xs">
                Tracking Delivery
              </span>
            </div>
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
