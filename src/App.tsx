import React, { useState, useMemo } from "react";
import { CartProvider, useCart } from "./CartContext";
import { products, categories, Product } from "./data";

// ─── Header Component ────────────────────────────────────────────────
function Header({
  searchQuery,
  setSearchQuery,
  onCartClick,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onCartClick: () => void;
}) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-sm border-b border-brown-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">☕</span>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-brown-800 leading-tight">
                Ember & Brew
              </h1>
              <p className="text-[10px] sm:text-xs text-brown-400 tracking-widest uppercase hidden sm:block">
                Specialty Coffee Roasters
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4 sm:mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search coffees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-full border border-brown-200 bg-white text-sm text-brown-800 placeholder:text-brown-300 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-2 sm:p-3 rounded-full hover:bg-brown-100 transition-colors group"
          >
            <svg
              className="w-6 h-6 text-brown-700 group-hover:text-brown-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-amber-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-fadeIn">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Category Filter ─────────────────────────────────────────────────
function CategoryFilter({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (cat: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selected === cat
              ? "bg-brown-800 text-cream-100 shadow-md"
              : "bg-white text-brown-600 border border-brown-200 hover:border-brown-300 hover:bg-brown-50"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ─── Product Card ────────────────────────────────────────────────────
function ProductCard({
  product,
  onSelect,
  onAddToCart,
}: {
  product: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}) {
  return (
    <div className="group bg-white rounded-2xl border border-brown-100 overflow-hidden hover:shadow-lg hover:shadow-brown-200/50 transition-all duration-300 animate-fadeIn">
      {/* Image Area */}
      <div
        className="relative h-48 bg-gradient-to-br from-cream-100 to-brown-100 flex items-center justify-center cursor-pointer"
        onClick={() => onSelect(product)}
      >
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </span>
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-brown-600">
            {product.roast} Roast
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 bg-amber-600/90 backdrop-blur-sm rounded-full text-xs font-medium text-white">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3
              className="font-serif text-lg font-semibold text-brown-800 cursor-pointer hover:text-amber-700 transition-colors"
              onClick={() => onSelect(product)}
            >
              {product.name}
            </h3>
            <p className="text-xs text-brown-400 mt-0.5">{product.origin}</p>
          </div>
          <p className="text-lg font-bold text-brown-800 whitespace-nowrap">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Flavor Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.flavor.map((f) => (
            <span
              key={f}
              className="px-2 py-0.5 bg-cream-200 rounded-full text-xs text-brown-600"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Rating & Add to Cart */}
        <div className="flex items-center justify-between pt-2 border-t border-brown-100">
          <div className="flex items-center gap-1">
            <span className="text-amber-500 text-sm">★</span>
            <span className="text-sm font-medium text-brown-700">
              {product.rating}
            </span>
            <span className="text-xs text-brown-400">
              ({product.reviews})
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="px-3 py-1.5 bg-brown-800 text-cream-100 text-sm font-medium rounded-full hover:bg-brown-700 active:scale-95 transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Product Detail Modal ────────────────────────────────────────────
function ProductDetail({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-brown-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideInUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <svg className="w-5 h-5 text-brown-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="h-56 sm:h-64 bg-gradient-to-br from-cream-100 to-brown-100 flex items-center justify-center rounded-t-3xl">
          <span className="text-8xl">{product.image}</span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown-800">
                {product.name}
              </h2>
              <p className="text-brown-400 mt-1">{product.origin} • {product.weight}</p>
            </div>
            <p className="text-2xl font-bold text-brown-800">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-amber-600/10 text-amber-700 rounded-full text-sm font-medium">
              {product.roast} Roast
            </span>
            <span className="px-3 py-1 bg-brown-100 text-brown-600 rounded-full text-sm font-medium">
              {product.category}
            </span>
            {product.flavor.map((f) => (
              <span
                key={f}
                className="px-3 py-1 bg-cream-200 text-brown-600 rounded-full text-sm"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-lg ${
                    star <= Math.round(product.rating)
                      ? "text-amber-500"
                      : "text-brown-200"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-brown-500">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-brown-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 pt-4 border-t border-brown-100">
            <div className="flex items-center border border-brown-200 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-brown-50 rounded-l-full transition-colors"
              >
                <svg className="w-4 h-4 text-brown-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-4 text-sm font-medium text-brown-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-brown-50 rounded-r-full transition-colors"
              >
                <svg className="w-4 h-4 text-brown-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) onAddToCart(product);
                onClose();
              }}
              className="flex-1 py-3 bg-brown-800 text-cream-100 font-medium rounded-full hover:bg-brown-700 active:scale-[0.98] transition-all"
            >
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Cart Sidebar ────────────────────────────────────────────────────
function CartSidebar({
  isOpen,
  onClose,
  onCheckout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-brown-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-cream-50 shadow-2xl animate-slideInRight flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brown-200">
          <div>
            <h2 className="font-serif text-xl font-bold text-brown-800">
              Your Cart
            </h2>
            <p className="text-sm text-brown-400">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-brown-100 transition-colors"
          >
            <svg className="w-5 h-5 text-brown-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-5xl mb-4 block">🛒</span>
              <p className="text-brown-400 font-medium">Your cart is empty</p>
              <p className="text-sm text-brown-300 mt-1">
                Add some delicious coffee to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-white rounded-xl border border-brown-100"
                >
                  <div className="w-14 h-14 bg-cream-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{item.product.image}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-brown-800 text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-brown-400">
                      {item.product.weight}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-brown-200 rounded-full">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="p-1 hover:bg-brown-50 rounded-l-full"
                        >
                          <svg className="w-3 h-3 text-brown-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="px-2 text-xs font-medium text-brown-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="p-1 hover:bg-brown-50 rounded-r-full"
                        >
                          <svg className="w-3 h-3 text-brown-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-brown-800">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-brown-300 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-brown-200 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-brown-600">Subtotal</span>
              <span className="text-xl font-bold text-brown-800">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 active:scale-[0.98] transition-all shadow-lg shadow-amber-600/20"
            >
              Proceed to Checkout
            </button>
            <p className="text-xs text-center text-brown-400 mt-3">
              Free shipping on orders over $50
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Checkout Modal ──────────────────────────────────────────────────
function CheckoutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  if (step === "success") {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-brown-900/60 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl animate-slideInUp">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-bold text-brown-800 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-brown-500 mb-6">
            Thank you for your order. Your freshly roasted coffee will be on its
            way soon.
          </p>
          <p className="text-sm text-brown-400 mb-6">
            Order #EB-{Math.random().toString(36).substring(2, 8).toUpperCase()}
          </p>
          <button
            onClick={() => {
              setStep("form");
              setFormData({ name: "", email: "", address: "", city: "", zip: "", card: "" });
              onClose();
            }}
            className="px-8 py-3 bg-brown-800 text-cream-100 font-medium rounded-full hover:bg-brown-700 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-brown-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideInUp">
        {/* Header */}
        <div className="p-6 border-b border-brown-100">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-brown-800">
              Checkout
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-brown-50 transition-colors"
            >
              <svg className="w-5 h-5 text-brown-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 border-b border-brown-100 bg-cream-50">
          <h3 className="text-sm font-semibold text-brown-600 uppercase tracking-wider mb-3">
            Order Summary
          </h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-brown-600">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-medium text-brown-800">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-brown-200">
            <span className="font-semibold text-brown-800">Total</span>
            <span className="font-bold text-lg text-brown-800">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          {totalPrice < 50 && (
            <p className="text-xs text-amber-700 mt-2">
              Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Shipping Address
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600"
              placeholder="123 Coffee Lane"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brown-700 mb-1">
                City
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600"
                placeholder="Portland"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brown-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                required
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600"
                placeholder="97201"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              required
              value={formData.card}
              onChange={(e) =>
                setFormData({ ...formData, card: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600"
              placeholder="4242 4242 4242 4242"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 active:scale-[0.98] transition-all shadow-lg shadow-amber-600/20 mt-2"
          >
            Place Order — ${totalPrice.toFixed(2)}
          </button>
          <p className="text-xs text-center text-brown-400">
            🔒 This is a simulated checkout. No real payment will be processed.
          </p>
        </form>
      </div>
    </div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────
function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brown-800 via-brown-700 to-brown-900 rounded-3xl p-8 sm:p-12 mb-8">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">☕</div>
        <div className="absolute bottom-10 right-10 text-6xl">🫘</div>
        <div className="absolute top-1/2 left-1/3 text-4xl">✨</div>
      </div>
      <div className="relative z-10 max-w-2xl">
        <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-2">
          Freshly Roasted Weekly
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-100 leading-tight mb-4">
          Exceptional Coffee,{" "}
          <span className="text-amber-400">Exceptional Moments</span>
        </h2>
        <p className="text-cream-300 text-sm sm:text-base leading-relaxed max-w-lg">
          From the world's finest growing regions to your cup. Each bean is
          carefully sourced, roasted, and delivered at peak freshness.
        </p>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────
function AppContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.flavor.some((f) =>
          f.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-cream-50">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Hero />

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl font-bold text-brown-800">
              Our Coffees
            </h2>
            <span className="text-sm text-brown-400">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "coffee" : "coffees"}
            </span>
          </div>
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-brown-500 font-medium text-lg">
              No coffees found
            </p>
            <p className="text-brown-400 text-sm mt-1">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-brown-200 mt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">☕</span>
                <span className="font-serif text-lg font-bold text-brown-800">
                  Ember & Brew
                </span>
              </div>
              <p className="text-sm text-brown-400 leading-relaxed">
                Roasting exceptional coffee since 2018. Sourced ethically,
                roasted with care, delivered fresh.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-brown-700 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-brown-400">
                <li className="hover:text-brown-600 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-brown-600 cursor-pointer transition-colors">Our Story</li>
                <li className="hover:text-brown-600 cursor-pointer transition-colors">Brewing Guides</li>
                <li className="hover:text-brown-600 cursor-pointer transition-colors">Subscription</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-brown-700 mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-brown-400">
                <li>hello@emberandbrew.com</li>
                <li>(503) 555-BREW</li>
                <li>Portland, Oregon</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-brown-100 mt-8 pt-6 text-center text-xs text-brown-300">
            © 2026 Ember & Brew. All rights reserved. Crafted with love and caffeine.
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
