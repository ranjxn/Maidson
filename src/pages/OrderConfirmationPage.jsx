import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, Package } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { orders } = useStore();

  const order = orders.find(o => o.id === orderId) || orders[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-fade-in">
      <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <span className="text-xs uppercase font-bold tracking-widest text-emerald-600">Order Confirmed</span>
        <h1 className="text-3xl font-serif font-bold text-neutral-900 mt-2">Thank You for Your Order!</h1>
        <p className="text-sm text-neutral-500 mt-2">
          Order Confirmation ID: <strong className="text-neutral-900 font-mono">{order ? order.id : orderId}</strong>
        </p>

        {order && (
          <div className="my-8 p-6 bg-neutral-50 rounded-2xl border border-neutral-200/80 text-left space-y-4">
            <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Order Summary</h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {order.status || 'Processing'}
              </span>
            </div>
            
            <div className="divide-y divide-neutral-200">
              {order.items && order.items.map(item => (
                <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-neutral-900">{item.name}</p>
                      <p className="text-xs text-neutral-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {order.address && (
              <div className="pt-3 border-t border-neutral-200 text-xs text-neutral-600">
                <span className="font-bold uppercase text-neutral-400 block mb-1">Delivering To</span>
                <p className="font-semibold text-neutral-900">{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.address}, {order.address.city} {order.address.postalCode}</p>
              </div>
            )}

            <div className="pt-4 border-t border-neutral-200 flex justify-between items-center font-bold text-neutral-900 text-base">
              <span>Total Paid</span>
              <span className="text-xl">${order.total ? order.total.toFixed(2) : '0.00'}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/account/orders"
            className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors text-sm shadow-md"
          >
            <Package className="w-4 h-4" /> View Order History
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-white border border-neutral-300 text-neutral-800 font-semibold px-8 py-3.5 rounded-xl hover:bg-neutral-100 transition-colors text-sm"
          >
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
