import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AccountPage from './pages/AccountPage';
import WishlistPage from './pages/WishlistPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainContent() {
  const { toast } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <ScrollToTop />

      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-neutral-700 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          {toast.message}
        </div>
      )}

      {/* Header Navbar */}
      <Navbar />

      {/* Main Page Routes */}
      <main className="flex-1" id="main-content">
        <Routes>
          <Route path="/" element={<HomePage onQuickView={(product) => setQuickViewProduct(product)} />} />
          <Route path="/products" element={<ProductsPage onQuickView={(product) => setQuickViewProduct(product)} />} />
          <Route path="/category/:slug" element={<ProductsPage onQuickView={(product) => setQuickViewProduct(product)} />} />
          <Route path="/products/:id" element={<ProductDetailPage onQuickView={(product) => setQuickViewProduct(product)} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/login" element={<AccountPage />} />
          <Route path="/signup" element={<AccountPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/orders" element={<AccountPage />} />
          <Route path="/wishlist" element={<WishlistPage onQuickView={(product) => setQuickViewProduct(product)} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <MainContent />
      </StoreProvider>
    </BrowserRouter>
  );
}
