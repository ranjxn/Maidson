import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  Package
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const { 
    cartItemCount, 
    wishlist, 
    isLoggedIn, 
    user, 
    logout, 
    searchQuery, 
    setSearchQuery,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/products');
    setMobileSearchOpen(false);
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      navigate('/products');
    } else {
      navigate(`/category/${catId}`);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Left: Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-neutral-700 hover:text-black focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link 
              to="/"
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-neutral-900 group-hover:text-neutral-700 transition-colors">
                MAIDSON <span className="font-sans text-xs uppercase tracking-widest font-normal text-neutral-500 block sm:inline sm:ml-1">&amp; CO.</span>
              </span>
            </Link>
          </div>

          {/* Center: Search Bar (Desktop) */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex flex-1 max-w-md mx-8 relative"
          >
            <input 
              type="text" 
              placeholder="Search catalog by product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-100 border border-neutral-200 rounded-full py-2 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-black"
              >
                Clear
              </button>
            )}
          </form>

          {/* Right: Actions (Wishlist, Cart, User) */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 text-neutral-700 hover:text-black focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className={`p-2 relative rounded-full hover:bg-neutral-100 transition-colors ${
                currentPath === '/wishlist' ? 'text-black bg-neutral-100' : 'text-neutral-700'
              }`}
              title="Saved Favorites"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-neutral-900 text-neutral-900' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <Link
              to="/cart"
              className={`p-2 relative rounded-full hover:bg-neutral-100 transition-colors flex items-center gap-2 ${
                currentPath === '/cart' ? 'text-black bg-neutral-100' : 'text-neutral-700'
              }`}
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-neutral-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Account Menu Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-700 focus:outline-none"
                aria-label="User Menu"
              >
                {isLoggedIn ? (
                  <img 
                    src={user?.avatar} 
                    alt={user?.name} 
                    className="w-7 h-7 rounded-full object-cover border border-neutral-300"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 hidden sm:block" />
              </button>

              {/* Account Dropdown Card */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-2 border-b border-neutral-100">
                        <p className="text-sm font-semibold text-neutral-900 truncate">{user?.name}</p>
                        <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-neutral-500" />
                        My Account &amp; Profile
                      </Link>
                      <Link
                        to="/account/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                      >
                        <Package className="w-4 h-4 text-neutral-500" />
                        Order History
                      </Link>
                      <div className="border-t border-neutral-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 text-center">
                      <p className="text-xs text-neutral-500 mb-2">Welcome to Maidson &amp; Co.</p>
                      <Link
                        to="/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block w-full bg-neutral-900 text-white text-xs font-semibold py-2 px-3 rounded-lg hover:bg-neutral-800 transition-colors text-center"
                      >
                        Sign In / Register
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Search Bar Expandable */}
        {mobileSearchOpen && (
          <form onSubmit={handleSearchSubmit} className="md:hidden py-3 border-t border-neutral-100">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-100 border border-neutral-200 rounded-lg py-2 pl-10 pr-4 text-sm text-neutral-900 focus:outline-none focus:bg-white"
                autoFocus
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            </div>
          </form>
        )}

        {/* Categories Bar (Desktop Navigation) */}
        <nav className="hidden lg:flex items-center space-x-8 py-3 border-t border-neutral-100 text-sm font-medium text-neutral-600">
          <Link
            to="/"
            className={`hover:text-black transition-colors ${currentPath === '/' ? 'text-black font-semibold border-b-2 border-black pb-1 -mb-[13px]' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setSelectedCategory('all')}
            className={`hover:text-black transition-colors ${currentPath === '/products' ? 'text-black font-semibold border-b-2 border-black pb-1 -mb-[13px]' : ''}`}
          >
            Shop All Catalog
          </Link>
          {CATEGORIES.filter(c => c.id !== 'all').map(category => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              onClick={() => setSelectedCategory(category.id)}
              className={`hover:text-black transition-colors ${currentPath === `/category/${category.id}` ? 'text-black font-semibold border-b-2 border-black pb-1 -mb-[13px]' : ''}`}
            >
              {category.name}
            </Link>
          ))}
        </nav>

      </div>

      {/* Mobile Navigation Hamburger Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-fade-in shadow-xl">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${
                currentPath === '/' ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => {
                setSelectedCategory('all');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${
                currentPath === '/products' ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Shop All Products
            </Link>
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <p className="px-3 text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-2">Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`text-left px-3 py-2 text-sm font-medium rounded-md ${
                    currentPath === `/category/${cat.id}` ? 'bg-neutral-900 text-white' : 'text-neutral-700 bg-neutral-50 hover:bg-neutral-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between px-3">
            <Link
              to="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-neutral-900 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-neutral-500" />
              {isLoggedIn ? user?.name : 'Sign In'}
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-neutral-900 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-neutral-500" />
              Saved ({wishlist.length})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
