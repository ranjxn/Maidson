import React, { useState, useEffect, useRef } from 'react';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart, isWishlisted, toggleWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const modalRef = useRef(null);
  const triggerElementRef = useRef(document.activeElement);

  // Keyboard Escape & Focus Trap
  useEffect(() => {
    // Remember previously focused element to return focus on close
    const prevElement = triggerElementRef.current;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.from(focusableElements).filter(
          el => !el.hasAttribute('disabled')
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Auto-focus the close button or first focusable element
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll('button, [href], input');
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    }, 50);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      // Return focus to the trigger element
      if (prevElement && typeof prevElement.focus === 'function') {
        prevElement.focus();
      }
    };
  }, [onClose]);

  if (!product) return null;

  const favorited = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div 
        ref={modalRef}
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-neutral-100 text-neutral-600 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-neutral-900"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-neutral-100 aspect-square md:aspect-auto relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {product.category}
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 p-1"
                aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                {favorited ? 'Saved' : 'Wishlist'}
              </button>
            </div>

            <h2 id="modal-product-title" className="text-2xl font-bold text-neutral-900 mt-2 font-serif">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-sm font-semibold text-neutral-900">{product.rating}</span>
              </div>
              <span className="text-xs text-neutral-400">•</span>
              <span className="text-xs text-neutral-500">{product.reviews} customer reviews</span>
            </div>

            <div className="text-2xl font-bold text-neutral-900 mt-4">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-sm text-neutral-600 mt-4 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs font-semibold uppercase text-neutral-500">Quantity</span>
              <div className="flex items-center border border-neutral-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-semibold text-neutral-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-neutral-100 space-y-4">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-6 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Cart — ${(product.price * quantity).toFixed(2)}
                </>
              )}
            </button>

            <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-neutral-500 text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-neutral-700" />
                <span>Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-neutral-700" />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-neutral-700" />
                <span>30 Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
