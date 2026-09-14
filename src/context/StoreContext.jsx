import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Navigation State
  const [currentRoute, setCurrentRoute] = useState('home'); // 'home' | 'products' | 'cart' | 'checkout' | 'account' | 'wishlist'
  
  // Cart State (Persisted in localStorage if available)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('maidson_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('maidson_wishlist');
      return saved ? JSON.parse(saved) : [1, 4]; // Default 2 items favorited for demonstration
    } catch (e) {
      return [1, 4];
    }
  });

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const saved = localStorage.getItem('maidson_is_logged_in');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('maidson_user');
      return saved ? JSON.parse(saved) : {
        name: 'Eleanor Vance',
        email: 'eleanor.vance@maidson.com',
        memberSince: 'March 2024',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      };
    } catch {
      return {
        name: 'Eleanor Vance',
        email: 'eleanor.vance@maidson.com',
        memberSince: 'March 2024',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      };
    }
  });

  // Order History State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('maidson_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'ORD-98241',
          date: '2026-08-10',
          total: 354.00,
          status: 'Delivered',
          items: [
            { id: 1, name: 'Minimalist Wireless Headphones', price: 199.00, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
            { id: 5, name: 'Minimalist Leather Sneakers', price: 155.00, quantity: 1, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80' },
          ],
        },
        {
          id: 'ORD-84192',
          date: '2026-07-22',
          total: 89.00,
          status: 'Delivered',
          items: [
            { id: 2, name: 'Organic Cotton Oxford Shirt', price: 89.00, quantity: 1, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80' },
          ],
        }
      ];
    } catch {
      return [];
    }
  });

  // Catalog Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('featured');

  // Notification Toast State
  const [toast, setToast] = useState(null);

  // Sync states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maidson_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('maidson_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('maidson_is_logged_in', JSON.stringify(isLoggedIn));
    } catch {}
  }, [isLoggedIn]);

  useEffect(() => {
    try {
      localStorage.setItem('maidson_user', JSON.stringify(user));
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('maidson_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Router Navigator
  const navigate = (route, category = null) => {
    setCurrentRoute(route);
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Functions
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (productId) => {
    const item = cart.find(i => i.id === productId);
    setCart(prev => prev.filter(i => i.id !== productId));
    if (item) {
      showToast(`Removed "${item.name}" from cart`, 'info');
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Functions
  const toggleWishlist = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    setWishlist(prev => {
      const isFavorited = prev.includes(productId);
      if (isFavorited) {
        showToast(`Removed "${product?.name || 'item'}" from favorites`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Saved "${product?.name || 'item'}" to favorites`);
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTax = cartSubtotal * 0.10; // 10% tax
  const cartTotal = cartSubtotal + cartTax;
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Auth Functions
  const login = (email, password) => {
    setIsLoggedIn(true);
    setUser({
      name: email.split('@')[0].replace('.', ' ') || 'Demo User',
      email: email,
      memberSince: 'August 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    });
    showToast('Logged in successfully!');
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('Logged out', 'info');
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({
      ...prev,
      ...updatedFields
    }));
    showToast('Profile updated successfully!');
  };

  // Place Order
  const placeOrder = (shippingDetails, paymentMethod) => {
    if (cart.length === 0) return false;
    
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      total: cartTotal,
      status: 'Processing',
      items: [...cart],
      address: shippingDetails,
      paymentMethod: paymentMethod,
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        currentRoute,
        navigate,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartTax,
        cartTotal,
        cartItemCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isLoggedIn,
        user,
        login,
        logout,
        updateUserProfile,
        orders,
        placeOrder,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
