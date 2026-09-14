# 🛍️ Maidson & Co. — Modern E-Commerce Platform

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**Maidson & Co.** is a premium, full-featured modern web application for luxury minimalist lifestyle products, fashion, electronics, and artisan accessories. Built with **React 19**, **Vite**, **Tailwind CSS v4**, and **React Router v7**, it delivers an intuitive shopping experience with persistent state, real-time filtering, interactive checkout, wishlist management, and user account tracking.

---

## ✨ Key Features

### 🛒 Core Shopping & E-Commerce
- **Interactive Product Catalog**: Browse curated items across Electronics, Clothing, Accessories, Bags, and Footwear categories.
- **Instant Search & Filter**: Real-time keyword search, category navigation, multi-tier price range slider ($0 – $1,000), and custom sorting (Featured, Price Low to High, Price High to Low, Highest Rated).
- **Quick View Modal**: Inspect product details, select sizes/colors, adjust quantities, and instantly add items to cart without leaving the page.
- **Detailed Product Pages**: Dedicated `/products/:id` views featuring high-resolution image galleries, stock status, ratings, full descriptions, and related products.

### 💳 Cart, Checkout & Orders
- **Persistent Shopping Cart**: Real-time item count, dynamic quantity management, automatic 10% sales tax calculation, and order subtotaling persisted across browser sessions via `localStorage`.
- **Streamlined Checkout Flow**: Multi-step checkout form collecting shipping addresses and payment methods (Credit Card, PayPal, Apple Pay).
- **Order Confirmation & Tracking**: Generates unique tracking IDs (`ORD-XXXXX`), records order status (*Processing*, *Delivered*), and displays itemized digital receipts.

### 👤 User Account & Wishlist
- **Wishlist Management**: One-click favorite toggling with persistent saved items view (`/wishlist`).
- **Account Dashboard**: Editable user profile (`/account`), avatar display, member tenure tracking, and complete historical order records.
- **Mock Authentication**: Quick login and registration system with instant persistent state toggles.

### 🎨 Design & User Experience
- **Responsive Architecture**: Fully mobile-ready layout with slide-out drawer navigation, sticky glassmorphic header, and responsive grids.
- **Toast Notifications**: Non-intrusive micro-feedback banners confirming item additions, removals, profile updates, and order placements.
- **Dynamic SEO Component**: Automatic title tag, meta description, and page context updates powered by `SEO.jsx`.
- **Policy Modals**: Integrated modal dialogues for Shipping & Delivery, Returns & Refunds, Privacy Policy, and Terms of Service.

---

## 🛠️ Tech Stack

| Domain | Technology / Library | Description |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Core UI rendering engine |
| **Build Tool** | [Vite 8](https://vitejs.dev/) | High-performance dev server & production bundler |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS engine with modern engine features |
| **Routing** | [React Router v7](https://reactrouter.com/) | Client-side page navigation & dynamic URL parameter resolution |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent SVG icon set |
| **State Management** | React Context API + LocalStorage | Centralized store provider with local persistence |
| **Linting** | [Oxlint](https://oxc.rs/) | High-speed JavaScript/JSX code linter |

---

## 📁 Directory Structure

```text
Maidson & Co/
├── public/                  # Static public assets, favicon, robots.txt, sitemap
├── src/
│   ├── assets/              # Graphic assets and hero imagery
│   ├── components/          # Modular UI components
│   │   ├── Footer.jsx       # Global footer with navigation links & newsletter
│   │   ├── Navbar.jsx       # Header bar with search input, badges, & navigation
│   │   ├── PolicyModal.jsx  # Modal for store policies (Terms, Privacy, Returns)
│   │   ├── ProductCard.jsx  # Reusable product grid item with badges & quick actions
│   │   ├── QuickViewModal.jsx # Pop-up product inspection dialog
│   │   └── SEO.jsx          # Dynamic document title & meta tag management
│   ├── context/
│   │   └── StoreContext.jsx # Central state management for cart, wishlist, orders & user auth
│   ├── data/
│   │   └── products.js      # Product catalog database & category definitions
│   ├── pages/               # Application route views
│   │   ├── AccountPage.jsx  # User account dashboard & order history
│   │   ├── CartPage.jsx     # Detailed shopping cart review
│   │   ├── CheckoutPage.jsx # Shipping & payment processing view
│   │   ├── HomePage.jsx     # Landing hero, featured collections & promo banners
│   │   ├── NotFoundPage.jsx # Custom 404 page
│   │   ├── OrderConfirmationPage.jsx # Post-purchase receipt & summary
│   │   ├── ProductDetailPage.jsx     # In-depth product view with reviews
│   │   ├── ProductsPage.jsx # Catalog page with full search & filter sidebar
│   │   └── WishlistPage.jsx # Saved favorite products grid
│   ├── App.css              # Custom utility styles & animations
│   ├── App.jsx              # Main router & layout root
│   ├── index.css            # Tailwind CSS directives & global styling
│   └── main.jsx             # React DOM entry point
├── index.html               # Main HTML template
├── package.json             # Dependencies and npm scripts
├── vite.config.js           # Vite build configuration
└── README.md                # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/ranjxn/Maidson.git
cd Maidson
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the URL shown in terminal).

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

### 5. Code Linting
Run Oxlint to check code quality:
```bash
npm run lint
```

---

## ⚡ Available Scripts

In the project directory, you can run:

- `npm run dev` — Starts local development server using Vite.
- `npm run build` — Bundles application assets into `dist/` for deployment.
- `npm run preview` — Serves local production build for testing.
- `npm run lint` — Runs `oxlint` for high-speed static code analysis.

---

## 🛡️ License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Crafted with ❤️ for <b>Maidson & Co.</b>
</p>
