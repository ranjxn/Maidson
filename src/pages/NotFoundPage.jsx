import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, ShoppingBag } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32 text-center animate-fade-in">
      <SEO title="Page Not Found (404)" description="The page you are searching for does not exist." />
      <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-16 shadow-xl max-w-lg mx-auto">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-900 mb-6">
          <Compass className="w-10 h-10 stroke-1" />
        </div>
        
        <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">404 Error</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mt-2">
          Page Not Found
        </h1>
        
        <p className="text-sm text-neutral-500 mt-3 leading-relaxed font-light">
          The sanctuary or collection you are looking for has been moved, archived, or does not exist in our catalog.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white font-semibold text-xs px-6 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors shadow-md"
          >
            <ShoppingBag className="w-4 h-4" /> Explore Catalog
          </Link>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-white border border-neutral-300 text-neutral-800 font-semibold text-xs px-6 py-3.5 rounded-xl hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
