import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Check, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, isWishlisted, toggleWishlist } = useStore();
  const [added, setAdded] = useState(false);

  const favorited = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div className="group relative bg-white border border-neutral-200/80 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Product Image Link */}
      <Link to={`/products/${product.id}`} className="block relative aspect-4/3 sm:aspect-square bg-neutral-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-neutral-900 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full shadow-xs">
              New
            </span>
          )}
          {product.featured && !product.isNew && (
            <span className="bg-amber-600 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full shadow-xs">
              Featured
            </span>
          )}
        </div>

        {/* Quick View Button overlay on hover */}
        {onQuickView && (
          <button
            type="button"
            onClick={handleQuickView}
            className="absolute bottom-3 inset-x-3 bg-white/95 text-neutral-900 text-xs font-semibold py-2 px-3 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 hover:bg-neutral-900 hover:text-white"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        )}
      </Link>

      {/* Wishlist Heart Toggle */}
      <button
        type="button"
        onClick={handleToggleFavorite}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-neutral-700 hover:text-neutral-900 shadow-sm transition-all hover:scale-110 focus:outline-none z-10"
        aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart 
          className={`w-4 h-4 transition-colors ${
            favorited ? 'fill-rose-500 text-rose-500' : 'text-neutral-600'
          }`} 
        />
      </button>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
            {product.category}
          </span>
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="text-base font-semibold text-neutral-900 mt-0.5 line-clamp-1 group-hover:text-neutral-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-neutral-500">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 font-semibold text-neutral-900">{product.rating}</span>
            </div>
            <span>•</span>
            <span>({product.reviews} reviews)</span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
          <div>
            <span className="text-xs text-neutral-400 block font-normal">Price</span>
            <span className="text-lg font-bold text-neutral-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-all duration-200 focus:outline-none ${
              added 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm hover:shadow'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
