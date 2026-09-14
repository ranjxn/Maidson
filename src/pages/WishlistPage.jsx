import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

export default function WishlistPage({ onQuickView }) {
  const { wishlist } = useStore();

  const wishlistedProducts = PRODUCTS.filter(product => wishlist.includes(product.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      <SEO title="Saved Wishlist" description="View your curated saved luxury favorites at Maidson & Co." />
      
      {/* Title */}
      <div className="mb-8 border-b border-neutral-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-neutral-900 flex items-center gap-3">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            Saved Wishlist ({wishlistedProducts.length})
          </h1>
          <p className="text-xs text-neutral-500 mt-1">Your curated favorite items saved during this session</p>
        </div>

        <Link
          to="/products"
          className="text-xs font-semibold text-neutral-700 hover:text-black flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-3xl p-12 text-center max-w-md mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-serif font-bold text-neutral-900">Your Wishlist is Empty</h2>
          <p className="text-xs text-neutral-500 mt-2">
            Click the heart icon on any product to save items to your personal collection.
          </p>
          <Link
            to="/products"
            className="mt-6 bg-neutral-900 text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Explore Products
          </Link>
        </div>
      )}

    </div>
  );
}
