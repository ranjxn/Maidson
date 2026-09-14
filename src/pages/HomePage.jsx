import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw, Clock } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

export default function HomePage({ onQuickView }) {
  // Featured products (first 6 items or items marked featured)
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <SEO 
        title="Maidson & Co. | Minimalist Luxury E-Commerce" 
        description="Explore timeless luxury clothing, footwear, Italian leather bags, and minimal electronics crafted for modern living."
      />
      
      {/* 1. Luxury Minimalist Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900 text-white py-20 lg:py-32 rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-neutral-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              The 2026 Minimalist Edition
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-serif font-normal leading-tight tracking-tight text-white">
              Elegance in Simplicity, <br className="hidden sm:inline" />
              <span className="italic font-light text-neutral-300">Crafted for Modern Living.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-light max-w-2xl leading-relaxed">
              Discover timeless essentials engineered with premium materials, refined silhouettes, and uncompromising attention to detail.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="bg-white text-neutral-900 font-semibold px-8 py-4 rounded-xl hover:bg-neutral-100 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 text-sm group"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/category/electronics"
                className="bg-transparent text-white font-medium border border-white/30 px-6 py-4 rounded-xl hover:bg-white/10 transition-colors text-sm"
              >
                View Electronics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust & Value Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 bg-white border border-neutral-200/80 rounded-2xl shadow-xs">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">Complimentary Shipping</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Free global shipping on orders over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">30-Day Hassle Returns</h4>
              <p className="text-xs text-neutral-500 mt-0.5">No questions asked return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">Authentic Guarantee</h4>
              <p className="text-xs text-neutral-500 mt-0.5">100% verified premium craftsmanship</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">24/7 Concierge Care</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Dedicated customer support</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">Handpicked Selection</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 mt-1">Featured Products</h2>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition-colors group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* View All Button below grid */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-neutral-900 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors text-sm shadow-md"
          >
            Explore Complete Catalog ({PRODUCTS.length} Items)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Category Spotlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">Curated Categories</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 mt-1">Shop by Aesthetic</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Link 
            to="/category/electronics"
            className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-neutral-200 block"
          >
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" 
              alt="Electronics" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Modern Living</span>
              <h3 className="text-xl font-serif font-bold">Electronics</h3>
              <p className="text-xs text-neutral-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Explore wireless audio &amp; wearables &rarr;</p>
            </div>
          </Link>

          <Link 
            to="/category/clothing"
            className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-neutral-200 block"
          >
            <img 
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80" 
              alt="Clothing" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Sustainable Weaves</span>
              <h3 className="text-xl font-serif font-bold">Clothing &amp; Apparel</h3>
              <p className="text-xs text-neutral-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Organic cotton &amp; merino wool &rarr;</p>
            </div>
          </Link>

          <Link 
            to="/category/bags"
            className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-neutral-200 block"
          >
            <img 
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80" 
              alt="Bags" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Italian Leather</span>
              <h3 className="text-xl font-serif font-bold">Bags &amp; Totes</h3>
              <p className="text-xs text-neutral-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Spacious daily carries &rarr;</p>
            </div>
          </Link>

        </div>
      </section>

    </div>
  );
}
