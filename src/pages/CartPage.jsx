import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import SEO from '../components/SEO';

export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    cartTax, 
    cartTotal
  } = useStore();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fade-in">
        <SEO title="Shopping Cart (Empty)" description="Your shopping cart is currently empty." />
        <div className="bg-white border border-neutral-200 rounded-3xl p-12 shadow-sm max-w-md mx-auto">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400 mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-neutral-900">Your Shopping Cart is Empty</h2>
          <p className="text-sm text-neutral-500 mt-2 font-light">
            Looks like you haven't added any luxury items to your cart yet.
          </p>
          <Link
            to="/products"
            className="mt-8 bg-neutral-900 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 text-sm shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      <SEO title={`Shopping Cart (${cart.length} Items)`} description="Review your selected luxury items and proceed to checkout." />
      
      {/* Title */}
      <div className="mb-8 border-b border-neutral-200 pb-4">
        <h1 className="text-3xl font-serif font-bold text-neutral-900">
          Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)} Items)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* CART ITEMS LIST (Left Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(item => (
            <div 
              key={item.id}
              className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-xs hover:border-neutral-300 transition-colors"
            >
              {/* Product Thumbnail */}
              <Link to={`/products/${item.id}`} className="w-24 h-24 sm:w-28 sm:h-28 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0 block">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </Link>

              {/* Info & Details */}
              <div className="flex-1 w-full text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  {item.category}
                </span>
                <Link to={`/products/${item.id}`} className="block">
                  <h3 className="text-base font-semibold text-neutral-900 hover:text-neutral-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sm font-bold text-neutral-900 mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls & Delete */}
              <div className="flex items-center gap-4">
                
                {/* Quantity Pill */}
                <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 text-neutral-600 hover:bg-neutral-200 transition-colors focus:outline-none"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-semibold text-neutral-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-neutral-600 hover:bg-neutral-200 transition-colors focus:outline-none"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal for Item */}
                <div className="w-20 text-right font-bold text-sm text-neutral-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Remove Trash Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-neutral-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            </div>
          ))}

          {/* Continue Shopping Link */}
          <div className="pt-4 flex justify-between items-center text-sm">
            <Link
              to="/products"
              className="text-neutral-600 hover:text-black font-semibold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* ORDER SUMMARY SIDEBAR (Right Col 4) */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-6 sticky top-28">
          <h2 className="text-lg font-serif font-bold text-neutral-900 pb-4 border-b border-neutral-100">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900">${cartSubtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span className="flex items-center gap-1">
                Shipping <Truck className="w-3.5 h-3.5 text-emerald-600" />
              </span>
              <span className="font-semibold text-emerald-600 uppercase text-xs">Free</span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>Estimated Tax (10%)</span>
              <span className="font-semibold text-neutral-900">${cartTax.toFixed(2)}</span>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex justify-between text-base font-bold text-neutral-900">
              <span>Total</span>
              <span className="text-xl">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="w-full bg-neutral-900 text-white font-semibold py-4 rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            Proceed to Checkout
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
              <span>Encrypted 256-Bit SSL Checkout</span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Tax calculated automatically during checkout. Free 30-day returns on all orders.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
