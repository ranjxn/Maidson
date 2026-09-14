import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, Search, RefreshCw, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

export default function ProductsPage({ onQuickView }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { 
    selectedCategory, 
    setSelectedCategory, 
    priceRange, 
    setPriceRange, 
    searchQuery, 
    setSearchQuery,
    sortBy,
    setSortBy
  } = useStore();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync category from URL param if available
  useEffect(() => {
    if (slug) {
      const matched = CATEGORIES.find(c => c.id === slug);
      if (matched) {
        setSelectedCategory(slug);
      }
    } else if (window.location.pathname === '/products') {
      // If directly at /products without param, default to all unless user had specific selection
    }
  }, [slug, setSelectedCategory]);

  const activeCategory = slug || selectedCategory;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      
      // Price filter
      const matchesPrice = product.price <= priceRange;

      // Search filter (case-insensitive)
      const matchesSearch = !searchQuery.trim() || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase().trim());

      return matchesCategory && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id; // Default featured order
    });
  }, [activeCategory, priceRange, searchQuery, sortBy]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      navigate('/products');
    } else {
      navigate(`/category/${catId}`);
    }
    setMobileFiltersOpen(false);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange(1000);
    setSearchQuery('');
    setSortBy('featured');
    navigate('/products');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      <SEO 
        title={activeCategory === 'all' ? 'All Catalog & Collections' : `${CATEGORIES.find(c => c.id === activeCategory)?.name || 'Category'} Collection`}
        description={`Browse our refined ${activeCategory === 'all' ? 'catalog of luxury essentials' : activeCategory + ' selection'} at Maidson & Co.`}
      />
      
      {/* Header Banner */}
      <div className="mb-8 border-b border-neutral-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900">
            {activeCategory === 'all' 
              ? 'Catalog & Collections' 
              : `${CATEGORIES.find(c => c.id === activeCategory)?.name || 'Collection'}`}
          </h1>
          <p className="text-sm text-neutral-500 font-light mt-1">
            Showing {filteredProducts.length} of {PRODUCTS.length} curated luxury items
          </p>
        </div>

        {/* Mobile Filter & Sort Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex-1 bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-700 flex items-center justify-center gap-2 shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
            Filters {(activeCategory !== 'all' || priceRange < 1000 || searchQuery) && '• Active'}
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-neutral-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-700 focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden md:block w-64 flex-shrink-0 bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs sticky top-28 space-y-8">
          
          {/* Header & Reset */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h3 className="font-semibold text-neutral-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-neutral-700" />
              Filter Products
            </h3>
            {(activeCategory !== 'all' || priceRange < 1000 || searchQuery) && (
              <button 
                onClick={resetFilters} 
                className="text-xs text-neutral-500 hover:text-black underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Real-time Search */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Search</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 pl-9 pr-3 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-neutral-900"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Categories</label>
            <div className="space-y-1">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    activeCategory === category.id 
                      ? 'bg-neutral-900 text-white font-semibold' 
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeCategory === category.id ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    {category.id === 'all' 
                      ? PRODUCTS.length 
                      : PRODUCTS.filter(p => p.category === category.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400">
              <span>Max Price</span>
              <span className="text-neutral-900 font-bold">${priceRange}</span>
            </div>

            <input 
              type="range" 
              min="0" 
              max="1000" 
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-neutral-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
              <span>$0</span>
              <span>$500</span>
              <span>$1000</span>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="space-y-2 pt-4 border-t border-neutral-100">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-3 text-xs font-medium text-neutral-900 focus:outline-none focus:bg-white focus:border-neutral-900"
            >
              <option value="featured">Featured / Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

        </aside>

        {/* MAIN PRODUCT GRID VIEW */}
        <main className="flex-1 w-full">
          
          {/* Active Filter Pills Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs bg-neutral-900 text-white font-medium px-3 py-1 rounded-full">
                Category: {CATEGORIES.find(c => c.id === activeCategory)?.name}
                <button onClick={() => handleCategorySelect('all')} className="hover:text-neutral-300">
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}

            {priceRange < 1000 && (
              <span className="inline-flex items-center gap-1 text-xs bg-neutral-900 text-white font-medium px-3 py-1 rounded-full">
                Max ${priceRange}
                <button onClick={() => setPriceRange(1000)} className="hover:text-neutral-300">
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 text-xs bg-neutral-900 text-white font-medium px-3 py-1 rounded-full">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-neutral-300">
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}

            {(activeCategory !== 'all' || priceRange < 1000 || searchQuery) && (
              <button 
                onClick={resetFilters}
                className="text-xs text-neutral-500 hover:text-black underline ml-2"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Product Cards Grid: 1 col on mobile, 2 on tablet, 3-4 on desktop */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center max-w-md mx-auto my-12 shadow-xs">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400 mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif text-neutral-900">No products match your criteria</h3>
              <p className="text-xs text-neutral-500 mt-2">
                Try adjusting your category filter, price range slider, or search term.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 bg-neutral-900 text-white text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            </div>
          )}

        </main>

      </div>

      {/* MOBILE FILTERS SLIDE-OVER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in md:hidden">
          <div className="bg-white w-full max-h-[85vh] rounded-t-3xl sm:rounded-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-semibold text-base">Filter Catalog</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1">
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Category</p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-medium border ${
                      activeCategory === category.id 
                        ? 'bg-neutral-900 text-white border-neutral-900' 
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase text-neutral-400 mb-2">
                <span>Max Price</span>
                <span className="text-neutral-900 font-bold">${priceRange}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-neutral-900"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 bg-neutral-100 text-neutral-800 font-semibold py-3 rounded-xl text-xs"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 bg-neutral-900 text-white font-semibold py-3 rounded-xl text-xs"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
