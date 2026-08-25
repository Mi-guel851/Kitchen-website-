import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load persisted cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bigburger_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load persisted favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('bigburger_favorites');
      return saved ? JSON.parse(saved) : ['burger-1', 'burger-2', 'sides-1'];
    } catch {
      return ['burger-1', 'burger-2', 'sides-1'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // Delivery configuration
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'pickup'
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code: 'BIGBURGER20', percent: 20 }
  
  // Active live order for order tracking
  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('bigburger_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('bigburger_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('bigburger_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('bigburger_active_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('bigburger_active_order');
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeOrder]);

  const showToast = (message, type = 'success', title = '') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add to cart with customizable extras & notes
  const addToCart = (product, quantity = 1, selectedExtras = [], specialInstructions = '') => {
    const sortedExtrasKey = selectedExtras
      .map((e) => e.id)
      .sort()
      .join('-');
    const uniqueId = `${product.id}__${sortedExtrasKey}__${specialInstructions.trim()}`;

    const extrasTotal = selectedExtras.reduce((sum, e) => sum + (e.price || 0), 0);
    const unitPrice = product.price + extrasTotal;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.uniqueId === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            uniqueId,
            id: product.id,
            name: product.name,
            image: product.image,
            basePrice: product.price,
            unitPrice,
            selectedExtras,
            specialInstructions,
            quantity,
            category: product.category,
          },
        ];
      }
    });

    showToast(
      `Added ${quantity}x ${product.name} to cart!`,
      'success',
      'Item Added 🍔'
    );
  };

  const updateQuantity = (uniqueId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(uniqueId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueId === uniqueId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (uniqueId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.uniqueId === uniqueId);
      if (itemToRemove) {
        showToast(`Removed ${itemToRemove.name} from cart`, 'info', 'Cart Updated');
      }
      return prevItems.filter((item) => item.uniqueId !== uniqueId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Favorites toggle
  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your favorites', 'info', 'Favorites');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your favorites ❤️', 'success', 'Favorites');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId) => favorites.includes(productId);

  // Coupon handling
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return { success: false, message: 'Please enter a voucher code' };

    if (cleanCode === 'BIGBURGER20' || cleanCode === 'BURGER20') {
      setAppliedCoupon({ code: cleanCode, percent: 20, description: '20% OFF First Order' });
      showToast('Promo code applied: 20% discount!', 'promo', 'Discount Active 🎉');
      return { success: true, message: '20% discount applied!' };
    } else if (cleanCode === 'FEAST10') {
      setAppliedCoupon({ code: cleanCode, percent: 10, description: '10% OFF Special' });
      showToast('Promo code applied: 10% discount!', 'promo', 'Discount Active 🎉');
      return { success: true, message: '10% discount applied!' };
    } else if (cleanCode === 'FREEFRIES') {
      setAppliedCoupon({ code: cleanCode, fixed: 1500, description: 'Free Fries Credit (₦1,500)' });
      showToast('Promo code applied: ₦1,500 off for fries!', 'promo', 'Discount Active 🎉');
      return { success: true, message: '₦1,500 discount applied!' };
    } else {
      showToast('Invalid coupon code. Try BIGBURGER20', 'error', 'Invalid Voucher');
      return { success: false, message: 'Invalid or expired coupon code' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  // Calculations
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.percent) {
      discountAmount = Math.round((subtotal * appliedCoupon.percent) / 100);
    } else if (appliedCoupon.fixed) {
      discountAmount = Math.min(subtotal, appliedCoupon.fixed);
    }
  }

  // Delivery fee: ₦1,200 standard, FREE over ₦15,000 or if pickup
  const freeDeliveryThreshold = 15000;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const deliveryFee = orderType === 'delivery' ? (isFreeDelivery || subtotal === 0 ? 0 : 1200) : 0;
  
  const packagingFee = subtotal > 0 ? 300 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + packagingFee);

  // Quick helper to check if a product has items in cart
  const getItemCountInCart = (productId) => {
    return cartItems
      .filter((item) => item.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        subtotal,
        discountAmount,
        deliveryFee,
        packagingFee,
        grandTotal,
        freeDeliveryThreshold,
        isFreeDelivery,
        orderType,
        setOrderType,
        couponCode,
        setCouponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemCountInCart,
        favorites,
        toggleFavorite,
        isFavorite,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isFavoritesOpen,
        setIsFavoritesOpen,
        isTrackerOpen,
        setIsTrackerOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        activeOrder,
        setActiveOrder,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
