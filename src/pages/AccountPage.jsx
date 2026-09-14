import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Package, 
  LogOut, 
  Calendar, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ShoppingBag, 
  Lock, 
  Sparkles, 
  Pencil, 
  Check, 
  X, 
  Camera
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import SEO from '../components/SEO';

const PRESET_AVATARS = [
  { id: 1, name: 'Editorial Portrait', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Classic Gentleman', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Minimalist Professional', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Modern Studio', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
  { id: 5, name: 'Executive Style', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
];

export default function AccountPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isOrdersRoute = location.pathname === '/account/orders';
  const isSignupRoute = location.pathname === '/signup';

  const { isLoggedIn, user, login, logout, updateUserProfile, orders } = useStore();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');

  // Editable profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || PRESET_AVATARS[0].url);

  // Hidden File Input Ref for Camera / File Upload
  const fileInputRef = useRef(null);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginEmail || 'eleanor.vance@maidson.com', loginPassword);
    navigate('/account');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    login(loginEmail || 'new.member@maidson.com', loginPassword);
    if (signupName) {
      updateUserProfile({ name: signupName });
    }
    navigate('/account');
  };

  const handleDemoLogin = () => {
    login('eleanor.vance@maidson.com', 'password123');
    navigate('/account');
  };

  const handleStartEdit = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditAvatar(user.avatar || PRESET_AVATARS[0].url);
    setIsEditing(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result);
        if (!isEditing) {
          handleStartEdit();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (editName.trim()) {
      updateUserProfile({
        name: editName.trim(),
        email: editEmail.trim() || user.email,
        avatar: editAvatar,
      });
      setIsEditing(false);
    }
  };

  // LOGGED OUT OR EXPLICIT LOGIN/SIGNUP ROUTE
  if (!isLoggedIn || location.pathname === '/login' || location.pathname === '/signup') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-fade-in">
        <SEO 
          title={isSignupRoute ? 'Create an Account' : 'Sign In'} 
          description="Access your Maidson & Co. profile, saved favorites, and order history." 
        />
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-xl text-center">
          
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-800 mb-4">
            <Lock className="w-8 h-8 stroke-1" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">
            {isSignupRoute ? 'Join the House' : 'Account Access'}
          </span>
          <h1 className="text-2xl font-serif font-bold text-neutral-900 mt-1">
            {isSignupRoute ? 'Create Your Account' : 'Sign In to Maidson & Co.'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {isSignupRoute 
              ? 'Enjoy private showroom invites, order tracking, and member exclusives.'
              : 'Access your profile, saved wishlist, and recent orders.'}
          </p>

          <form onSubmit={isSignupRoute ? handleSignupSubmit : handleLoginSubmit} className="mt-6 space-y-4 text-left">
            {isSignupRoute && (
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Full Name</label>
                <input 
                  type="text"
                  required
                  placeholder="Eleanor Vance"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-neutral-900"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Email Address</label>
              <input 
                type="email"
                required
                placeholder="you@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Password</label>
              <input 
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-neutral-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 text-white font-semibold py-3.5 rounded-xl hover:bg-neutral-800 transition-colors text-sm shadow-md"
            >
              {isSignupRoute ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle between login and signup */}
          <div className="mt-4 text-xs text-neutral-500">
            {isSignupRoute ? (
              <p>
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-neutral-900 underline">
                  Sign In
                </Link>
              </p>
            ) : (
              <p>
                New to Maidson &amp; Co.?{' '}
                <Link to="/signup" className="font-semibold text-neutral-900 underline">
                  Create an Account
                </Link>
              </p>
            )}
          </div>

          {/* Quick Demo Login Shortcut */}
          <div className="mt-6 pt-6 border-t border-neutral-100">
            <p className="text-xs text-neutral-400 mb-3">Or sign in with 1-click demo user:</p>
            <button
              onClick={handleDemoLogin}
              className="w-full bg-neutral-100 border border-neutral-200 text-neutral-800 font-semibold py-2.5 rounded-xl hover:bg-neutral-200 transition-colors text-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Log In as Eleanor Vance (Demo)
            </button>
          </div>

        </div>
      </div>
    );
  }

  // LOGGED IN STATE
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      <SEO 
        title={isOrdersRoute ? 'My Orders' : 'My Account & Profile'} 
        description="View your order status and manage your personal account settings." 
      />
      
      {/* Hidden File Input for Device Camera & File Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        onChange={handleFileUpload} 
        className="hidden" 
      />

      {/* Page Header */}
      <div className="mb-8 border-b border-neutral-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-neutral-900">User Profile &amp; Dashboard</h1>
          <p className="text-xs text-neutral-500 mt-1">Manage account settings and review order history</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/account"
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition-colors ${
              !isOrdersRoute ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Profile
          </Link>
          <Link
            to="/account/orders"
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition-colors ${
              isOrdersRoute ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Order History ({orders.length})
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-4 py-2 rounded-xl flex items-center gap-1.5 border border-rose-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* PROFILE CARD (Left Col 4) */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="text-center relative">
            
            {/* Display Picture Avatar with Camera Overlay Button */}
            <div className="relative inline-block group mb-4">
              <img 
                src={isEditing ? editAvatar : user.avatar} 
                alt={user.name} 
                className="w-28 h-28 rounded-full object-cover border-2 border-neutral-900 shadow-md transition-opacity group-hover:opacity-90"
              />
              
              <button 
                type="button"
                onClick={triggerFileInput}
                title="Upload Photo or Take Camera Selfie"
                className="absolute bottom-0 right-0 p-2.5 bg-neutral-900 text-white rounded-full shadow-lg hover:bg-neutral-800 hover:scale-105 transition-all focus:outline-none border-2 border-white"
                aria-label="Change Profile Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {!isEditing ? (
              <div>
                <h3 className="text-lg font-bold text-neutral-900 flex items-center justify-center gap-2">
                  {user.name}
                  <button 
                    onClick={handleStartEdit} 
                    className="text-neutral-400 hover:text-black p-1"
                    title="Edit profile info"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">{user.email}</p>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-3 mt-2 text-left">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-1.5 text-xs text-neutral-900 focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-1.5 text-xs text-neutral-900 focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-neutral-900 text-white font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-neutral-800"
                  >
                    <Check className="w-3.5 h-3.5" /> Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="p-2 border border-neutral-300 rounded-xl text-neutral-600 hover:bg-neutral-200/60"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-100 space-y-3 text-xs text-neutral-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-neutral-500">
                <Calendar className="w-4 h-4" /> Member Since
              </span>
              <span className="font-semibold text-neutral-900">{user.memberSince}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-neutral-500">
                <Package className="w-4 h-4" /> Total Orders
              </span>
              <span className="font-semibold text-neutral-900">{orders.length} Orders</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-neutral-500">
                <Mail className="w-4 h-4" /> Email Status
              </span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100">
            <Link
              to="/products"
              className="w-full bg-neutral-900 text-white font-semibold py-3 rounded-xl text-xs hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 block text-center"
            >
              <ShoppingBag className="w-4 h-4 inline" />
              Shop Catalog
            </Link>
          </div>
        </div>

        {/* ORDER HISTORY LIST (Right Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-neutral-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-neutral-700" />
              Recent Order History ({orders.length})
            </h2>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map(order => (
                <div 
                  key={order.id}
                  className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs hover:border-neutral-300 transition-all space-y-4"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between pb-4 border-b border-neutral-100 gap-2">
                    <div>
                      <span className="text-xs text-neutral-400 uppercase font-bold">Order ID</span>
                      <h4 className="text-base font-bold text-neutral-900">{order.id}</h4>
                    </div>

                    <div>
                      <span className="text-xs text-neutral-400 uppercase font-bold">Date Placed</span>
                      <p className="text-xs text-neutral-800 font-medium">{order.date}</p>
                    </div>

                    <div>
                      <span className="text-xs text-neutral-400 uppercase font-bold">Total Amount</span>
                      <p className="text-sm font-bold text-neutral-900">${order.total.toFixed(2)}</p>
                    </div>

                    <div>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        <Clock className="w-3 h-3" />
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Purchased Items */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-neutral-400">Purchased Items</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-neutral-50 rounded-xl border border-neutral-100">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="text-xs">
                            <p className="font-semibold text-neutral-900 line-clamp-1">{item.name}</p>
                            <p className="text-neutral-500 mt-0.5">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center text-neutral-500">
              <p>No orders placed yet.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
