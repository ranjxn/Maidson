import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, Truck, RotateCcw, HelpCircle, Mail, Building, FileText, Lock, Globe } from 'lucide-react';

const POLICY_CONTENT = {
  help: {
    title: 'Help Center & FAQ',
    icon: HelpCircle,
    subtitle: 'Frequently Asked Questions & Customer Support Guide',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <div>
          <h4 className="font-semibold text-neutral-900 mb-1">How do I track my delivery?</h4>
          <p>Once your order ships, an automated confirmation email with courier tracking is sent to your inbox. You can also view active tracking numbers in your Account Order History.</p>
        </div>
        <div>
          <h4 className="font-semibold text-neutral-900 mb-1">What payment methods do you accept?</h4>
          <p>We accept Visa, MasterCard, American Express, PayPal, and Apple Pay with 256-bit SSL encrypted checkout.</p>
        </div>
        <div>
          <h4 className="font-semibold text-neutral-900 mb-1">Can I modify or cancel my order?</h4>
          <p>Orders are dispatched rapidly from our central warehouse. If you need to make modifications, contact our Concierge team within 2 hours of placement.</p>
        </div>
      </div>
    )
  },
  shipping: {
    title: 'Shipping & Delivery',
    icon: Truck,
    subtitle: 'Complimentary Worldwide Shipping on All Orders Over $150',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <p>At Maidson & Co., every order is carefully wrapped in sustainable, recycled archival tissue and dispatched via expedited courier service.</p>
        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-neutral-200">
            <span className="font-semibold text-neutral-900">Domestic Express (USA &amp; Canada)</span>
            <span>2–3 Business Days • Complimentary</span>
          </div>
          <div className="flex justify-between py-1 border-b border-neutral-200">
            <span className="font-semibold text-neutral-900">European Union &amp; UK</span>
            <span>3–5 Business Days • Complimentary over $150</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-semibold text-neutral-900">International Expedited</span>
            <span>4–7 Business Days • Fully Insured</span>
          </div>
        </div>
        <p className="text-xs text-neutral-500">Customs duties and import taxes are pre-calculated and cleared before arrival for all eligible destinations.</p>
      </div>
    )
  },
  returns: {
    title: '30-Day Hassle-Free Returns',
    icon: RotateCcw,
    subtitle: 'Complete Satisfaction Guarantee on Every Purchase',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <p>If you are not completely delighted with your purchase, you may return any unworn, unwashed item in its original packaging with all tags attached within 30 days of receipt.</p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
          <li>Pre-paid digital return labels are generated instantly in your user dashboard.</li>
          <li>Refunds are credited to your original payment method within 3–5 business days of inspection.</li>
          <li>Exchanges for different sizing or colors are processed with complimentary expedited shipping.</li>
        </ul>
      </div>
    )
  },
  track: {
    title: 'Track Your Order',
    icon: Truck,
    subtitle: 'Real-Time Courier Tracking & Dispatch Updates',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <p>To inspect your shipment's journey, review your order ID in the Account Order History section or check the confirmation email dispatched upon checkout.</p>
        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
          <span className="text-xs font-bold uppercase text-neutral-400">Carrier Partners</span>
          <p className="text-xs text-neutral-700">FedEx Priority, DHL Express, and UPS Air with direct signature confirmation on fine leather and electronics deliveries.</p>
        </div>
      </div>
    )
  },
  contact: {
    title: 'Contact Concierge',
    icon: Mail,
    subtitle: 'Our Private Client Advisors Are At Your Service',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <p>Whether you require styling advice, bespoke inquiries, or assistance with an existing order, our client care specialists are available 24 hours a day, 7 days a week.</p>
        <div className="space-y-2 text-xs font-medium text-neutral-800">
          <p>📧 Email Concierge: <a href="mailto:concierge@maidson.com" className="text-neutral-900 underline font-semibold">concierge@maidson.com</a></p>
          <p>📞 Client Services: <span className="font-semibold">+1 (800) 555-0199 (Toll Free)</span></p>
          <p>📍 Studio Atelier: 742 Evergreen Terrace, Suite 400, San Francisco, CA</p>
        </div>
      </div>
    )
  },
  about: {
    title: 'About Maidson & Co.',
    icon: Building,
    subtitle: 'Elegance in Simplicity, Crafted for Modern Living',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <p>Founded on the principle that true luxury lies in restraint and enduring materials, Maidson &amp; Co. designs architectural essentials that transcend fleeting seasons.</p>
        <p>Every garment, timepiece, and leather piece in our catalog is engineered in limited batches in partnership with historic European and Japanese ateliers.</p>
      </div>
    )
  },
  sustainability: {
    title: 'Sustainability & Craftsmanship',
    icon: Globe,
    subtitle: 'Certified Organic Materials & Ethical Manufacturing',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <p>We believe elegance without environmental responsibility is hollow. Our manufacturing standards adhere to rigorous ethical guidelines:</p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
          <li>100% GOTS-certified organic cotton and regenerative merino wool.</li>
          <li>Gold-rated Italian vegetable-tanned leather utilizing zero heavy metals.</li>
          <li>Zero-plastic circular packaging made from post-consumer recycled pulp.</li>
        </ul>
      </div>
    )
  },
  careers: {
    title: 'Careers at Maidson & Co.',
    icon: Building,
    subtitle: 'Join Our Team of Designers, Engineers, and Curators',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <p>We are always seeking passionate artisans, frontend engineers, product designers, and client stylists who share our devotion to minimalist craftsmanship.</p>
        <p className="text-xs text-neutral-500">Send your portfolio or CV to <a href="mailto:careers@maidson.com" className="text-neutral-900 underline font-semibold">careers@maidson.com</a>.</p>
      </div>
    )
  },
  press: {
    title: 'Press & Editorial Media',
    icon: FileText,
    subtitle: 'Lookbooks, Editorial Inquiries, and Press Kits',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <p>For high-resolution photography, sample pulls for editorial shoots, and press interviews, please direct inquiries to our communication team at <a href="mailto:press@maidson.com" className="text-neutral-900 underline font-semibold">press@maidson.com</a>.</p>
      </div>
    )
  },
  stores: {
    title: 'Flagship Boutiques',
    icon: Building,
    subtitle: 'Experience Our Collections in Person',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <h5 className="font-bold text-neutral-900">San Francisco Flagship</h5>
            <p className="text-neutral-500 mt-1">450 Post Street, Union Square</p>
            <p className="text-neutral-400 mt-0.5">Mon–Sat: 10am – 7pm</p>
          </div>
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <h5 className="font-bold text-neutral-900">New York Showroom</h5>
            <p className="text-neutral-500 mt-1">82 Mercer Street, SoHo</p>
            <p className="text-neutral-400 mt-0.5">Mon–Sat: 11am – 8pm</p>
          </div>
        </div>
      </div>
    )
  },
  privacy: {
    title: 'Privacy Policy',
    icon: Lock,
    subtitle: 'Your Data Protection & Confidentiality',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <p>Maidson &amp; Co. values your discretion. We never sell, lease, or monetize your personal details to third-party advertisers. All transaction data is processed using PCI-DSS compliant payment gateways.</p>
        <p className="text-xs text-neutral-500">You may request complete erasure of your browsing cookies and profile data at any time by contacting our Privacy Officer.</p>
      </div>
    )
  },
  terms: {
    title: 'Terms of Service',
    icon: ShieldCheck,
    subtitle: 'Client Agreement & Conditions of Sale',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <p>By browsing or purchasing from Maidson &amp; Co., you agree to our standard terms of sale. All goods remain covered by our authentic manufacturer warranty against defects in materials and craftsmanship for 24 months from receipt.</p>
      </div>
    )
  },
  cookies: {
    title: 'Cookie Preferences',
    icon: Globe,
    subtitle: 'Manage Your Browsing Privacy',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <p>We use essential cookies solely to preserve your active shopping bag, wishlist favorites, and session authentication across visits.</p>
        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
          <p className="font-semibold text-neutral-900">Strictly Necessary Cookies: Active</p>
          <p className="text-neutral-500 mt-0.5">Cart persistence, currency preferences, and session security tokens.</p>
        </div>
      </div>
    )
  },
  accessibility: {
    title: 'Accessibility Statement',
    icon: Globe,
    subtitle: 'Commitment to Digital Inclusivity & WCAG 2.1 Standards',
    content: (
      <div className="space-y-4 text-sm text-neutral-600 leading-relaxed font-light">
        <p>Maidson &amp; Co. is committed to ensuring our digital storefront is accessible to all individuals, including those using assistive screen readers and keyboard navigation.</p>
        <p className="text-xs text-neutral-500">If you encounter any barrier while navigating our store, please notify our accessibility coordinator at <a href="mailto:accessibility@maidson.com" className="text-neutral-900 underline font-semibold">accessibility@maidson.com</a>.</p>
      </div>
    )
  }
};

export default function PolicyModal({ policyKey, onClose }) {
  const modalRef = useRef(null);
  const triggerElementRef = useRef(document.activeElement);

  useEffect(() => {
    const prevElement = triggerElementRef.current;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')
        ).filter(el => !el.hasAttribute('disabled'));

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const timer = setTimeout(() => {
      if (modalRef.current) {
        const btn = modalRef.current.querySelector('button');
        if (btn) btn.focus();
      }
    }, 50);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      if (prevElement && typeof prevElement.focus === 'function') {
        prevElement.focus();
      }
    };
  }, [onClose]);

  if (!policyKey || !POLICY_CONTENT[policyKey]) return null;

  const policy = POLICY_CONTENT[policyKey];
  const IconComponent = policy.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 border border-neutral-200 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close policy dialog"
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-900 flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-6 h-6 stroke-1.5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Maidson Information</span>
            <h3 id="policy-modal-title" className="text-xl font-serif font-bold text-neutral-900 mt-0.5">
              {policy.title}
            </h3>
            <p className="text-xs text-neutral-500 mt-1 font-light">
              {policy.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="border-t border-neutral-100 pt-6">
          {policy.content}
        </div>

        {/* Modal Footer CTA */}
        <div className="mt-8 pt-4 border-t border-neutral-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-neutral-900 text-white font-semibold text-xs px-6 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors shadow-sm"
          >
            Understood &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}
