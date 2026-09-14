import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CreditCard, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Lock,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import SEO from '../components/SEO';

export default function CheckoutPage() {
  const routerNavigate = useNavigate();
  const { 
    cart, 
    cartSubtotal, 
    cartTax, 
    cartTotal, 
    user, 
    placeOrder 
  } = useStore();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Shipping Form State
  const [shippingDetails, setShippingDetails] = useState({
    firstName: user ? user.name.split(' ')[0] : 'Eleanor',
    lastName: user ? user.name.split(' ')[1] || 'Vance' : 'Vance',
    email: user ? user.email : 'eleanor.vance@maidson.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    postalCode: '94107',
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('credit'); // 'credit' | 'debit' | 'paypal'

  // Card details (for credit/debit mock)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 4242 4242 4242',
    expDate: '12/28',
    cvv: '123',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors = {};
    if (!shippingDetails.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }
    if (!shippingDetails.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!shippingDetails.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(shippingDetails.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }
    if (!shippingDetails.phone.trim()) {
      newErrors.phone = 'Phone number is required for delivery notifications.';
    } else if (shippingDetails.phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }
    if (!shippingDetails.address.trim()) {
      newErrors.address = 'Street delivery address is required.';
    }
    if (!shippingDetails.city.trim()) {
      newErrors.city = 'City is required.';
    }
    if (!shippingDetails.postalCode.trim()) {
      newErrors.postalCode = 'Postal / Zip code is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const newErrors = {};
    if (paymentMethod === 'credit' || paymentMethod === 'debit') {
      const cleanCard = cardDetails.cardNumber.replace(/\s+/g, '');
      if (!cleanCard) {
        newErrors.cardNumber = 'Card number is required.';
      } else if (cleanCard.length < 13) {
        newErrors.cardNumber = 'Card number must be at least 13 digits.';
      }

      if (!cardDetails.expDate.trim()) {
        newErrors.expDate = 'Expiry date is required (MM/YY).';
      } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardDetails.expDate.trim())) {
        newErrors.expDate = 'Format must be MM/YY (e.g. 12/28).';
      }

      if (!cardDetails.cvv.trim()) {
        newErrors.cvv = 'CVV security code is required.';
      } else if (!/^[0-9]{3,4}$/.test(cardDetails.cvv.trim())) {
        newErrors.cvv = 'CVV must be 3 or 4 digits.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  // Double-submission protected handler
  const handleCompleteOrder = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Simulate payment gateway authentication delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const order = placeOrder(shippingDetails, paymentMethod);
      if (order) {
        routerNavigate(`/order-confirmation/${order.id}`);
      } else {
        setIsSubmitting(false);
      }
    } catch {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center animate-fade-in">
        <div className="bg-white border border-neutral-200 rounded-3xl p-10 shadow-xs">
          <h2 className="text-xl font-bold font-serif text-neutral-900">Your Cart is Empty</h2>
          <p className="text-xs text-neutral-500 mt-2">Add items to your cart before proceeding to checkout.</p>
          <Link 
            to="/products"
            className="mt-6 inline-block bg-neutral-900 text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-neutral-800 transition-colors"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <SEO title="Secure Checkout" description="Complete your luxury order with secure encrypted payment." />
      
      {/* Checkout Step Progress Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400">
          <span className={`flex items-center gap-2 ${step >= 1 ? 'text-neutral-900' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-sans ${
              step >= 1 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-600'
            }`}>1</span>
            Shipping
          </span>

          <ChevronRight className="w-4 h-4 text-neutral-300" />

          <span className={`flex items-center gap-2 ${step >= 2 ? 'text-neutral-900' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-sans ${
              step >= 2 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-600'
            }`}>2</span>
            Payment
          </span>

          <ChevronRight className="w-4 h-4 text-neutral-300" />

          <span className={`flex items-center gap-2 ${step >= 3 ? 'text-neutral-900' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-sans ${
              step === 3 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-600'
            }`}>3</span>
            Review Order
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* WIZARD FORM (Left Col 7) */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 1 && (
            <form onSubmit={handleNextStep} noValidate className="space-y-6 animate-fade-in">
              <div className="border-b border-neutral-100 pb-4">
                <h2 className="text-xl font-serif font-bold text-neutral-900">Step 1: Shipping Address</h2>
                <p className="text-xs text-neutral-500">Please enter your delivery destination details</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    autoComplete="given-name"
                    value={shippingDetails.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-neutral-50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white ${
                      errors.firstName ? 'border-rose-500 bg-rose-50/30 focus:border-rose-500' : 'border-neutral-300 focus:border-neutral-900'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    autoComplete="family-name"
                    value={shippingDetails.lastName}
                    onChange={handleInputChange}
                    className={`w-full bg-neutral-50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white ${
                      errors.lastName ? 'border-rose-500 bg-rose-50/30 focus:border-rose-500' : 'border-neutral-300 focus:border-neutral-900'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    inputMode="email"
                    autoComplete="email"
                    value={shippingDetails.email}
                    onChange={handleInputChange}
                    className={`w-full bg-neutral-50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white ${
                      errors.email ? 'border-rose-500 bg-rose-50/30 focus:border-rose-500' : 'border-neutral-300 focus:border-neutral-900'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+1 (555) 000-0000"
                    value={shippingDetails.phone}
                    onChange={handleInputChange}
                    className={`w-full bg-neutral-50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white ${
                      errors.phone ? 'border-rose-500 bg-rose-50/30 focus:border-rose-500' : 'border-neutral-300 focus:border-neutral-900'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Street Address</label>
                <input 
                  type="text" 
                  name="address"
                  autoComplete="shipping address-line1"
                  value={shippingDetails.address}
                  onChange={handleInputChange}
                  className={`w-full bg-neutral-50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white ${
                    errors.address ? 'border-rose-500 bg-rose-50/30 focus:border-rose-500' : 'border-neutral-300 focus:border-neutral-900'
                  }`}
                />
                {errors.address && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">City</label>
                  <input 
                    type="text" 
                    name="city"
                    autoComplete="shipping address-level2"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    className={`w-full bg-neutral-50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white ${
                      errors.city ? 'border-rose-500 bg-rose-50/30 focus:border-rose-500' : 'border-neutral-300 focus:border-neutral-900'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Postal Code</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    value={shippingDetails.postalCode}
                    onChange={handleInputChange}
                    className={`w-full bg-neutral-50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white ${
                      errors.postalCode ? 'border-rose-500 bg-rose-50/30 focus:border-rose-500' : 'border-neutral-300 focus:border-neutral-900'
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <Link
                  to="/cart"
                  className="text-xs font-semibold text-neutral-600 hover:text-black flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Cart
                </Link>

                <button
                  type="submit"
                  className="bg-neutral-900 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors text-sm flex items-center gap-2"
                >
                  Continue to Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 2 && (
            <form onSubmit={handleNextStep} noValidate className="space-y-6 animate-fade-in">
              <div className="border-b border-neutral-100 pb-4">
                <h2 className="text-xl font-serif font-bold text-neutral-900">Step 2: Payment Method</h2>
                <p className="text-xs text-neutral-500">Select your preferred payment gateway option</p>
              </div>

              <div className="space-y-3">
                
                {/* Credit Card Option */}
                <label className={`block p-4 border rounded-2xl cursor-pointer transition-all ${
                  paymentMethod === 'credit' 
                    ? 'border-neutral-900 bg-neutral-900/5 ring-1 ring-neutral-900' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="credit"
                        checked={paymentMethod === 'credit'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-neutral-900"
                      />
                      <CreditCard className="w-5 h-5 text-neutral-800" />
                      <span className="font-semibold text-sm text-neutral-900">Credit Card</span>
                    </div>
                    <span className="text-xs text-neutral-500">Visa, MasterCard, Amex</span>
                  </div>
                </label>

                {/* Debit Card Option */}
                <label className={`block p-4 border rounded-2xl cursor-pointer transition-all ${
                  paymentMethod === 'debit' 
                    ? 'border-neutral-900 bg-neutral-900/5 ring-1 ring-neutral-900' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="debit"
                        checked={paymentMethod === 'debit'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-neutral-900"
                      />
                      <CreditCard className="w-5 h-5 text-neutral-800" />
                      <span className="font-semibold text-sm text-neutral-900">Debit Card</span>
                    </div>
                    <span className="text-xs text-neutral-500">Direct Bank Transfer</span>
                  </div>
                </label>

                {/* PayPal Option */}
                <label className={`block p-4 border rounded-2xl cursor-pointer transition-all ${
                  paymentMethod === 'paypal' 
                    ? 'border-neutral-900 bg-neutral-900/5 ring-1 ring-neutral-900' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-neutral-900"
                      />
                      <span className="font-bold font-serif text-sm text-blue-600">PayPal</span>
                    </div>
                    <span className="text-xs text-neutral-500">Express Checkout</span>
                  </div>
                </label>

              </div>

              {/* Card Inputs Mock with Numeric Keypads */}
              {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                <div className="p-4 bg-neutral-50 rounded-2xl space-y-4 border border-neutral-200">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-neutral-500 mb-1">Card Number</label>
                    <input 
                      type="text"
                      name="cardNumber"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="4242 4242 4242 4242"
                      value={cardDetails.cardNumber}
                      onChange={handleCardChange}
                      className={`w-full bg-white border rounded-xl px-3 py-2 text-sm font-mono focus:outline-none ${
                        errors.cardNumber ? 'border-rose-500' : 'border-neutral-300 focus:border-neutral-900'
                      }`}
                    />
                    {errors.cardNumber && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-neutral-500 mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        name="expDate"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardDetails.expDate}
                        onChange={handleCardChange}
                        className={`w-full bg-white border rounded-xl px-3 py-2 text-sm font-mono focus:outline-none ${
                          errors.expDate ? 'border-rose-500' : 'border-neutral-300 focus:border-neutral-900'
                        }`}
                      />
                      {errors.expDate && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.expDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-neutral-500 mb-1">CVV / CVC</label>
                      <input 
                        type="text" 
                        name="cvv"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        maxLength={4}
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        className={`w-full bg-white border rounded-xl px-3 py-2 text-sm font-mono focus:outline-none ${
                          errors.cvv ? 'border-rose-500' : 'border-neutral-300 focus:border-neutral-900'
                        }`}
                      />
                      {errors.cvv && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-neutral-600 hover:text-black flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Shipping
                </button>

                <button
                  type="submit"
                  className="bg-neutral-900 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors text-sm flex items-center gap-2"
                >
                  Review Order <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER REVIEW */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-neutral-100 pb-4">
                <h2 className="text-xl font-serif font-bold text-neutral-900">Step 3: Review Your Order</h2>
                <p className="text-xs text-neutral-500">Confirm address, payment, and items before finalizing</p>
              </div>

              {/* Shipping & Payment Brief */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold uppercase text-neutral-500">Shipping To</span>
                    <button onClick={() => setStep(1)} className="text-neutral-900 underline font-semibold">Edit</button>
                  </div>
                  <p className="font-semibold text-neutral-900">{shippingDetails.firstName} {shippingDetails.lastName}</p>
                  <p className="text-neutral-600 mt-0.5">{shippingDetails.address}</p>
                  <p className="text-neutral-600">{shippingDetails.city}, {shippingDetails.postalCode}</p>
                  <p className="text-neutral-500 mt-1">{shippingDetails.email} • {shippingDetails.phone}</p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold uppercase text-neutral-500">Payment Option</span>
                    <button onClick={() => setStep(2)} className="text-neutral-900 underline font-semibold">Edit</button>
                  </div>
                  <p className="font-semibold text-neutral-900 uppercase">{paymentMethod} Payment</p>
                  <p className="text-neutral-600 mt-0.5">Card ending in 4242</p>
                  <p className="text-emerald-600 font-semibold mt-2">Verified &amp; Authorized</p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase text-neutral-400">Order Items ({cart.length})</h3>
                <div className="divide-y divide-neutral-100 max-h-60 overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-semibold text-neutral-900">{item.name}</p>
                          <p className="text-neutral-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <span className="font-bold text-neutral-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Order Trigger with Double-Submission Protection */}
              <div className="pt-6 border-t border-neutral-200 flex justify-between items-center">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setStep(2)}
                  className="text-xs font-semibold text-neutral-600 hover:text-black flex items-center gap-1 disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Payment
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleCompleteOrder}
                  className={`bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-700 transition-all text-sm flex items-center gap-2 shadow-lg hover:shadow-xl ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing Authorization...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Complete Order — ${cartTotal.toFixed(2)}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* SUMMARY BREAKDOWN (Right Col 5) */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs sticky top-28 space-y-6">
          <h3 className="text-lg font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-3">
            Summary Breakdown
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900">${cartSubtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-600 uppercase text-xs">Free</span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>Tax (10%)</span>
              <span className="font-semibold text-neutral-900">${cartTax.toFixed(2)}</span>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex justify-between text-base font-bold text-neutral-900">
              <span>Total Amount</span>
              <span className="text-xl">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2 text-xs text-neutral-500">
            <div className="flex items-center gap-2 text-neutral-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Maidson Guarantee</span>
            </div>
            <p>Every purchase includes complimentary shipping, tracking, and full insurance protection.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
