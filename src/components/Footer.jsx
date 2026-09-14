import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import PolicyModal from './PolicyModal';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Grid */}
        <div className="pb-12 mb-12 border-b border-neutral-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">Stay Connected</span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">Join the Maidson Inner Circle</h3>
            <p className="text-sm text-neutral-400 mt-2 font-light max-w-md">
              Subscribe to receive private previews, seasonal edit releases, and 10% off your initial purchase.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div className="bg-neutral-800/80 border border-emerald-500/40 rounded-xl p-4 flex items-center gap-3 text-emerald-400 text-sm animate-fade-in">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Thank you for subscribing! Check your inbox for your welcome discount code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white text-neutral-900 font-semibold px-6 py-3 rounded-xl hover:bg-neutral-200 transition-colors flex items-center gap-2 text-sm"
                >
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">
          
          {/* Col 1: Shop Collections */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop Collections</h4>
            <ul className="space-y-2.5 text-sm font-light text-neutral-400">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/category/electronics" className="hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/clothing" className="hover:text-white transition-colors">
                  Clothing &amp; Apparel
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="hover:text-white transition-colors">
                  Minimalist Accessories
                </Link>
              </li>
              <li>
                <Link to="/category/bags" className="hover:text-white transition-colors">
                  Leather Bags &amp; Packs
                </Link>
              </li>
              <li>
                <Link to="/category/footwear" className="hover:text-white transition-colors">
                  Footwear
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Customer Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Customer Support</h4>
            <ul className="space-y-2.5 text-sm font-light text-neutral-400">
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('help')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Help Center &amp; FAQ
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('shipping')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Shipping &amp; Delivery
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('returns')} 
                  className="hover:text-white transition-colors text-left"
                >
                  30-Day Returns
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('track')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('contact')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm font-light text-neutral-400">
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('about')} 
                  className="hover:text-white transition-colors text-left"
                >
                  About Maidson &amp; Co.
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('sustainability')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Sustainability &amp; Craft
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('careers')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('press')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Press &amp; Media
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('stores')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Flagship Stores
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Ethics */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal &amp; Ethics</h4>
            <ul className="space-y-2.5 text-sm font-light text-neutral-400">
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('privacy')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('terms')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('cookies')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Cookie Settings
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => setActivePolicy('accessibility')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Accessibility Statement
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-white tracking-widest">MAIDSON &amp; CO.</span>
            <span>&copy; {new Date().getFullYear()} Maidson &amp; Co. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Designed for Minimalist Elegance</span>
            <div className="flex gap-2 text-neutral-400">
              <span>Visa</span>
              <span>•</span>
              <span>Mastercard</span>
              <span>•</span>
              <span>PayPal</span>
              <span>•</span>
              <span>Apple Pay</span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Policy Modal */}
      {activePolicy && (
        <PolicyModal 
          policyKey={activePolicy} 
          onClose={() => setActivePolicy(null)} 
        />
      )}
    </footer>
  );
}
