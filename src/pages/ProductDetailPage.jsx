import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Plus, 
  Minus
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

export default function ProductDetailPage({ onQuickView }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isWishlisted, toggleWishlist } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find(p => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <SEO title="Product Not Found" description="The requested product does not exist." />
        <div className="bg-white border border-neutral-200 rounded-3xl p-12 max-w-md mx-auto shadow-xs">
          <h2 className="text-2xl font-serif font-bold text-neutral-900">Product Not Found</h2>
          <p className="text-xs text-neutral-500 mt-2">
            The luxury product you are searching for does not exist or has been archived.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 bg-neutral-900 text-white font-semibold text-xs px-6 py-3 rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const favorited = isWishlisted(product.id);
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      <SEO 
        title={product.name}
        description={product.description}
        ogImage={product.image}
        productData={product}
      />
      {/* Breadcrumb Bar */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-8">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-black transition-colors">Catalog</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-black transition-colors capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Product Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm group">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.badge && (
              <span className="absolute top-5 left-5 bg-neutral-900 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Details & Purchasing Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">
                {product.category}
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-rose-600 transition-colors p-1"
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{favorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mt-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-sm font-bold text-neutral-900">{product.rating}</span>
              </div>
              <span className="text-xs text-neutral-400">•</span>
              <span className="text-xs text-neutral-500">{product.reviewsCount} verified reviews</span>
              <span className="text-xs text-neutral-400">•</span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                <Check className="w-3.5 h-3.5 mr-0.5" /> In Stock &amp; Ready to Ship
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="py-4 border-y border-neutral-100 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-neutral-900">${product.price.toFixed(2)}</span>
            <span className="text-xs text-neutral-400 font-light">Tax included • Complimentary Global Shipping</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-2">Description</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector & Add to Cart Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase font-bold text-neutral-500">Quantity</span>
              <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-neutral-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-200 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-2 text-sm font-semibold text-neutral-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-200 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-neutral-900 text-white font-semibold py-4 rounded-xl hover:bg-neutral-800 transition-colors text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Added to Shopping Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart — ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  addToCart(product, quantity);
                  navigate('/checkout');
                }}
                className="bg-neutral-100 border border-neutral-300 text-neutral-900 font-semibold px-6 py-4 rounded-xl hover:bg-neutral-200 transition-colors text-sm"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Value Badges */}
          <div className="pt-6 border-t border-neutral-100 grid grid-cols-3 gap-4 text-center text-xs text-neutral-500">
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col items-center">
              <Truck className="w-5 h-5 text-neutral-800 mb-1" />
              <span className="font-semibold text-neutral-900">Complimentary</span>
              <span className="text-[10px]">Worldwide Shipping</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col items-center">
              <RotateCcw className="w-5 h-5 text-neutral-800 mb-1" />
              <span className="font-semibold text-neutral-900">30-Day Policy</span>
              <span className="text-[10px]">Hassle-Free Returns</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-neutral-800 mb-1" />
              <span className="font-semibold text-neutral-900">Guaranteed</span>
              <span className="text-[10px]">Authentic Craft</span>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">Complete the Look</span>
              <h2 className="text-2xl font-serif font-bold text-neutral-900 mt-1">Related Essentials</h2>
            </div>
            <Link
              to={`/category/${product.category}`}
              className="text-xs font-semibold text-neutral-900 hover:text-neutral-600 underline"
            >
              View More {product.category}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard 
                key={rel.id} 
                product={rel} 
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
