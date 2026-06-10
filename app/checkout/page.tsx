"use client";

import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { 
  ChevronLeft, 
  Truck, 
  MapPin, 
  ClipboardCheck, 
  BadgeAlert,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from "lucide-react";

interface ShippingForm {
  name: string;
  phone: string;
  email: string;
  district: string;
  address: string;
  landmark: string;
  notes: string;
}

const districts = [
  "Imphal West",
  "Imphal East",
  "Thoubal",
  "Bishnupur",
  "Kakching",
  "Senapati",
  "Churachandpur",
  "Ukhrul",
  "Tamenglong",
  "Other Districts"
];

export default function CheckoutPage() {
  const { cart, totalItems, clearCart } = useCart();
  
  const [form, setForm] = useState<ShippingForm>({
    name: "",
    phone: "",
    email: "",
    district: "Imphal West",
    address: "",
    landmark: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setForm((prev) => ({ ...prev, [name]: numericValue }));
      }
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (form.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);
    setShowLoading(true);
    const generatedOrderId = "REQ-" + Math.floor(100000 + Math.random() * 900000);

    try {
      const payload = {
        orderId: generatedOrderId,
        name: form.name,
        phone: form.phone,
        email: form.email,
        district: form.district,
        address: form.address,
        landmark: form.landmark,
        notes: form.notes,
        items: cart.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          category: item.product.category,
        })),
      };

      // Force a minimum loading time of 2.5 seconds to display the premium loading animation
      const [res] = await Promise.all([
        fetch("/api/quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }),
        new Promise((resolve) => setTimeout(resolve, 2500))
      ]);

      if (!res.ok) {
        throw new Error("Failed to submit request to server.");
      }

      setOrderId(generatedOrderId);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error(error);
      alert("There was an issue submitting your request. Please try again.");
      setShowLoading(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the premium loader while generating quotation
  if (showLoading && !orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-charcoal-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-16 px-4">
          <div className="max-w-md w-full bg-white dark:bg-charcoal-800 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 p-12 text-center space-y-8 flex flex-col items-center">
            
            {/* Modern Circular Loading Spinner */}
            <div className="relative h-20 w-20">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border-4 border-brand-red/10 animate-pulse" />
              {/* Spinning circular track */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-red border-r-brand-red animate-spin" />
              {/* Inner detail */}
              <div className="absolute inset-2 rounded-full bg-slate-50 dark:bg-zinc-900/50 flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-brand-red animate-ping" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">
                Generating Quotation
              </h2>
              <p className="text-xs text-slate-400 dark:text-zinc-500 max-w-[250px] mx-auto leading-relaxed">
                Analyzing select furniture items and compiling customized request details...
              </p>
            </div>
            
            {/* Bounce indicators */}
            <div className="flex gap-1.5 justify-center pt-2">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-red/30 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="h-1.5 w-1.5 rounded-full bg-brand-red/60 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="h-1.5 w-1.5 rounded-full bg-brand-red animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>

          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If request is placed successfully, render the Success screen
  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-charcoal-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-16 px-4">
          <div className="max-w-xl w-full bg-white dark:bg-charcoal-800 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 p-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center p-2">
              <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-zinc-50">
                Request Submitted!
              </h1>
              <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
                Thank you for your quotation request with Stupendous Interior. Our team will review your selected items and compile a custom quote.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-900/50 rounded-xl p-5 border border-slate-100 dark:border-zinc-850 text-left space-y-3.5 max-w-md mx-auto">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Request ID</span>
                <span className="font-bold text-slate-800 dark:text-zinc-200 tracking-wider">{orderId}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Shipping & Delivery</span>
                <span className="font-semibold text-slate-800 dark:text-zinc-200 text-right max-w-[200px] truncate">
                  {form.address}, {form.district}
                </span>
              </div>
              <div className="flex justify-between text-xs border-t border-slate-100 dark:border-zinc-800 pt-3">
                <span className="text-slate-400 font-medium">Estimated Review Time</span>
                <span className="font-semibold text-brand-red flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> 
                  Within 6 Hours
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-brand-red/10 bg-brand-red/5 p-4 text-xs text-left max-w-md mx-auto flex items-start gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                <strong>Next Step:</strong> Our sales executive team will contact you shortly within 6 hrs.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex rounded-full bg-slate-900 dark:bg-zinc-700 px-8 py-3 text-sm font-semibold text-white hover:bg-brand-red transition-colors shadow-xs"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-charcoal-900">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-brand-red dark:hover:text-white mb-2 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" /> Return to Store
              </Link>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
                Request for Quotation
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-zinc-500 font-medium">
              <span>Cart</span>
              <span>&gt;</span>
              <span className="font-bold text-slate-800 dark:text-zinc-300">Quotation</span>
              <span>&gt;</span>
              <span>Confirmation</span>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white dark:bg-charcoal-800 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 p-12 text-center max-w-lg mx-auto space-y-6">
              <div className="rounded-full bg-brand-red/5 p-6 inline-block text-brand-red">
                <Truck className="h-10 w-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">Your Quotation Cart is Empty</h3>
                <p className="text-sm text-slate-400">Please add furniture items to your cart to request a quotation.</p>
              </div>
              <Link
                href="/"
                className="inline-flex rounded-full bg-brand-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-hover transition-colors"
              >
                Go to Catalog
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
              
              {/* Left Column: Forms (8 Cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Section 1: Customer Details */}
                <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-6 shadow-xs border border-slate-100 dark:border-zinc-800/80 space-y-5">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-50 flex items-center gap-2.5">
                    <ClipboardCheck className="h-5 w-5 text-brand-red" />
                    1. Contact Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 px-3.5 py-2 text-sm focus:border-brand-red focus:outline-hidden dark:text-white transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Phone Number *</label>
                      <div className="flex rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 overflow-hidden focus-within:border-brand-red focus-within:ring-1 focus-within:ring-brand-red transition-all">
                        <span className="flex items-center justify-center bg-slate-100 dark:bg-zinc-700 text-slate-600 dark:text-zinc-350 px-3 text-sm font-semibold border-r border-slate-200 dark:border-zinc-700 select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={form.phone}
                          onChange={handleInputChange}
                          placeholder=""
                          maxLength={10}
                          className="w-full bg-transparent px-3.5 py-2 text-sm focus:outline-none dark:text-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 px-3.5 py-2 text-sm focus:border-brand-red focus:outline-hidden dark:text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Delivery Details */}
                <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-6 shadow-xs border border-slate-100 dark:border-zinc-800/80 space-y-5">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-50 flex items-center gap-2.5">
                    <MapPin className="h-5 w-5 text-brand-red" />
                    2. Delivery Location (Manipur)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400">District *</label>
                      <select
                        name="district"
                        value={form.district}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 px-3.5 py-2 text-sm focus:border-brand-red focus:outline-hidden dark:text-white transition-colors"
                      >
                        {districts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Landmark (Optional)</label>
                      <input
                        type="text"
                        name="landmark"
                        value={form.landmark}
                        onChange={handleInputChange}
                        placeholder="e.g. Near Kangla Fort Gate"
                        className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 px-3.5 py-2 text-sm focus:border-brand-red focus:outline-hidden dark:text-white transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={form.address}
                        onChange={handleInputChange}
                        placeholder="House Number, Street Name, Colony"
                        className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 px-3.5 py-2 text-sm focus:border-brand-red focus:outline-hidden dark:text-white transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Customization / Delivery Notes (Optional)</label>
                      <textarea
                        name="notes"
                        rows={3}
                        value={form.notes}
                        onChange={handleInputChange}
                        placeholder="e.g. Need customization in wood polish, specify layout constraints, or details for bulk order."
                        className="w-full rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 px-3.5 py-2 text-sm focus:border-brand-red focus:outline-hidden dark:text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Request Summary (4 Cols) */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
                
                {/* Summary panel */}
                <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-6 shadow-xs border border-slate-100 dark:border-zinc-800 space-y-6">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-50 border-b border-slate-100 dark:border-zinc-800 pb-3">
                    Items Selected
                  </h3>

                  {/* List items */}
                  <div className="space-y-4 max-h-72 overflow-y-auto pr-2 scrollbar-thin">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-3 justify-between items-start text-xs border-b border-slate-50 dark:border-zinc-800/40 pb-3 last:border-0 last:pb-0">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-950 dark:text-zinc-100 truncate">{item.product.name}</p>
                          <p className="text-slate-400 mt-1">Quantity: {item.quantity}</p>
                          <p className="text-[10px] text-brand-red font-medium mt-0.5">{item.product.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations placeholder */}
                  <div className="border-t border-slate-100 dark:border-zinc-800 pt-4 space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium font-semibold text-slate-800 dark:text-zinc-200">Total Items</span>
                      <span className="font-bold text-brand-red">{totalItems} units</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Custom pricing calculations, bulk discounts, and delivery quotes will be supplied after manual check by the showroom.
                    </p>
                  </div>

                  {/* Place Order CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-brand-red py-3.5 text-sm font-semibold text-white shadow-xs hover:bg-brand-red-hover transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        Submit Quotation Request
                      </>
                    )}
                  </button>
                </div>

                {/* Additional Trust Indicators */}
                <div className="rounded-xl border border-slate-200 dark:border-zinc-800 p-4 bg-slate-50/50 dark:bg-zinc-800/20 text-[10px] text-slate-400 space-y-2">
                  <div className="flex gap-2">
                    <BadgeAlert className="h-4 w-4 text-brand-red flex-shrink-0" />
                    <p>
                      <strong>Local Support:</strong> For queries regarding bulk orders or design customization inside Imphal, contact our store directly at <strong>+91 6009905233</strong>.
                    </p>
                  </div>
                </div>

              </div>

            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
