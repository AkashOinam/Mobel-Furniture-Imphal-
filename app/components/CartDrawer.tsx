"use client";

import React, { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop with fade-in and blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel sliding from right */}
      <div
        ref={drawerRef}
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-charcoal-800 border-l border-slate-100 dark:border-zinc-800 transition-transform duration-300 transform translate-x-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-red" />
            <h2 className="text-lg font-semibold tracking-tight">Your Shopping Cart</h2>
            <span className="rounded-full bg-slate-100 dark:bg-zinc-700 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:text-zinc-200">
              {totalItems}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-200 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-brand-red/5 p-6 text-brand-red">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <div>
                <p className="text-base font-semibold">Your cart is empty</p>
                <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
                  Add premium items from our furniture collection to start.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 rounded-full bg-brand-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-hover transition-colors shadow-xs"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-zinc-800/60 last:border-0 last:pb-0"
              >
                {/* Product Image */}
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100 dark:border-zinc-800 bg-slate-50">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Info & Adjustments */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-medium leading-5 text-slate-900 dark:text-zinc-100 line-clamp-2">
                      <Link
                        href={`/product/${item.product.id}`}
                        onClick={onClose}
                        className="hover:text-brand-red transition-colors"
                      >
                        {item.product.name}
                      </Link>
                    </h3>
                    <p className="text-xs font-semibold whitespace-nowrap text-brand-red">
                      Quote Request
                    </p>
                  </div>


                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-zinc-800">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 px-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-700 dark:text-zinc-400 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-semibold px-2 min-w-6 text-center text-slate-800 dark:text-zinc-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 px-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-700 dark:text-zinc-400 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="border-t border-slate-100 dark:border-zinc-800 p-6 space-y-4 bg-slate-50/50 dark:bg-charcoal-900/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                Items for Quotation
              </span>
              <span className="text-sm font-bold text-brand-red">
                {totalItems} items
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Free delivery and assembly options will be calculated for your custom quote.
            </p>
            <div className="grid grid-cols-1 gap-2 pt-2">
              <Link
                href="/checkout"
                onClick={onClose}
                className="flex items-center justify-center rounded-full bg-brand-red py-3 text-sm font-semibold text-white shadow-xs hover:bg-brand-red-hover transition-colors"
              >
                Request Quotation
              </Link>
              <button
                onClick={onClose}
                className="flex items-center justify-center rounded-full border border-slate-200 dark:border-zinc-700 bg-transparent py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
