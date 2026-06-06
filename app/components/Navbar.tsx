"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileHomeOpen, setIsMobileHomeOpen] = useState(false);
  const [isMobileOfficeOpen, setIsMobileOfficeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Monitor scroll for solid background styling and smart hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Enable scroll shadow styling
      setScrolled(currentScrollY > 20);

      // Only show the navbar when scroll is within the hero section (<= 450px)
      if (currentScrollY <= 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 transform ${
          visible ? "translate-y-0" : "-translate-y-full"
        } bg-white border-b border-slate-100 dark:bg-charcoal-900 dark:border-zinc-800`}
      >
        {/* Announcement Bar */}
        <div className="w-full bg-brand-red text-white text-sm sm:text-base font-bold py-3 overflow-hidden relative z-50">
          <div className="flex w-max animate-marquee-ltr">
            {/* Group 1 */}
            <div className="flex shrink-0 items-center gap-24 px-12">
              {Array.from({ length: 10 }).map((_, itemIdx) => (
                <React.Fragment key={itemIdx}>
                  <span>Wedding Sale is Live!</span>
                  <span>Up to 40% OFF</span>
                </React.Fragment>
              ))}
            </div>
            {/* Group 2 (Identical duplicate for seamless loop) */}
            <div className="flex shrink-0 items-center gap-24 px-12">
              {Array.from({ length: 10 }).map((_, itemIdx) => (
                <React.Fragment key={itemIdx}>
                  <span>Wedding Sale is Live!</span>
                  <span>Up to 40% OFF</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? "py-2.5" : "py-3.5"}`}>
          <div className="relative flex h-14 items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex-shrink-0 md:static absolute left-1/2 -translate-x-1/2 md:translate-x-0 top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo-v2.svg"
                  alt="Möbel Furniture"
                  width={172}
                  height={48}
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation (Centered) */}
            <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 flex-1">
              <Link
                href="/"
                className="text-sm font-medium text-slate-600 hover:text-brand-red dark:text-zinc-300 dark:hover:text-white transition-colors py-2"
              >
                Home
              </Link>
              
              {/* Home Furniture Dropdown */}
              <div className="relative group py-2">
                <Link
                  href="/#home-furniture"
                  className="text-sm font-medium text-slate-600 hover:text-brand-red dark:text-zinc-300 dark:hover:text-white transition-colors flex items-center gap-1"
                >
                  Home Furniture
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] rounded-xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-charcoal-800 p-3 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 grid grid-cols-2 gap-1 before:absolute before:-top-2 before:inset-x-0 before:h-2 before:content-['']">
                  <Link
                    href="/?category=Sofa#catalog"
                    className="block rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors"
                  >
                    Luxury Sofas
                  </Link>
                  <Link
                    href="/?category=Bed#catalog"
                    className="block rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors"
                  >
                    Beds & Mattresses
                  </Link>
                  <Link
                    href="/?category=Wardrobe#catalog"
                    className="block rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors"
                  >
                    Wardrobes & Dressers
                  </Link>
                  <Link
                    href="/?category=Showcase#catalog"
                    className="block rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors"
                  >
                    Showcases & Cabinets
                  </Link>
                  <Link
                    href="/?category=Dining Table#catalog"
                    className="block rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors"
                  >
                    Dining Tables & Chairs
                  </Link>
                  <Link
                    href="/?category=Center Table#catalog"
                    className="block rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors"
                  >
                    Center Tables
                  </Link>
                </div>
              </div>

              {/* Office Furniture Dropdown */}
              <div className="relative group py-2">
                <Link
                  href="/#office-furniture"
                  className="text-sm font-medium text-slate-600 hover:text-brand-red dark:text-zinc-300 dark:hover:text-white transition-colors flex items-center gap-1"
                >
                  Office Furniture
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[510px] rounded-xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-charcoal-800 p-3 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 grid grid-cols-3 gap-1 before:absolute before:-top-2 before:inset-x-0 before:h-2 before:content-['']">
                  <Link
                    href="/?category=Office Chair#catalog"
                    className="block rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors"
                  >
                    Ergonomic Chairs
                  </Link>
                  <Link
                    href="/?category=Table#catalog"
                    className="block rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors"
                  >
                    Executive Desks
                  </Link>
                  <Link
                    href="/?category=Drawer#catalog"
                    className="block rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors"
                  >
                    Mobile Drawers
                  </Link>
                </div>
              </div>

              <Link
                href="/#contact"
                className="text-sm font-medium text-slate-600 hover:text-brand-red dark:text-zinc-300 dark:hover:text-white transition-colors py-2"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto md:ml-0">

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white ring-2 ring-white dark:ring-charcoal-900">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white md:hidden transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white dark:border-zinc-800 dark:bg-charcoal-800 px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-800 dark:text-zinc-150 hover:bg-slate-50 hover:text-brand-red dark:hover:bg-zinc-700 transition-colors"
            >
              Home
            </Link>

            {/* Mobile Home Furniture Section */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setIsMobileHomeOpen(!isMobileHomeOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-semibold text-slate-800 dark:text-zinc-150 hover:bg-slate-50 dark:hover:bg-zinc-700 rounded-lg transition-colors text-left cursor-pointer"
              >
                <span>Home Furniture</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200" style={{ transform: isMobileHomeOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {isMobileHomeOpen && (
                <div className="pl-4 space-y-0.5 animate-fade-in border-l border-slate-100 dark:border-zinc-800 ml-3">
                  <Link
                    href="/?category=Sofa#catalog"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileHomeOpen(false); }}
                    className="block rounded-lg px-3 py-1.5 text-sm font-medium text-slate-650 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-350 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Luxury Sofas
                  </Link>
                  <Link
                    href="/?category=Bed#catalog"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileHomeOpen(false); }}
                    className="block rounded-lg px-3 py-1.5 text-sm font-medium text-slate-650 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-350 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Beds & Mattresses
                  </Link>
                  <Link
                    href="/?category=Wardrobe#catalog"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileHomeOpen(false); }}
                    className="block rounded-lg px-3 py-1.5 text-sm font-medium text-slate-650 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-350 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Wardrobes & Dressers
                  </Link>
                  <Link
                    href="/?category=Showcase#catalog"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileHomeOpen(false); }}
                    className="block rounded-lg px-3 py-1.5 text-sm font-medium text-slate-650 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-350 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Showcases & Cabinets
                  </Link>
                  <Link
                    href="/?category=Dining Table#catalog"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileHomeOpen(false); }}
                    className="block rounded-lg px-3 py-1.5 text-sm font-medium text-slate-650 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-350 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Dining Tables & Chairs
                  </Link>
                  <Link
                    href="/?category=Center Table#catalog"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileHomeOpen(false); }}
                    className="block rounded-lg px-3 py-1.5 text-sm font-medium text-slate-650 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-350 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Center Tables
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Office Furniture Section */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setIsMobileOfficeOpen(!isMobileOfficeOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-semibold text-slate-800 dark:text-zinc-150 hover:bg-slate-50 dark:hover:bg-zinc-700 rounded-lg transition-colors text-left cursor-pointer"
              >
                <span>Office Furniture</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200" style={{ transform: isMobileOfficeOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {isMobileOfficeOpen && (
                <div className="pl-4 space-y-0.5 animate-fade-in border-l border-slate-100 dark:border-zinc-800 ml-3">
                  <Link
                    href="/?category=Office Chair#catalog"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileOfficeOpen(false); }}
                    className="block rounded-lg px-3 py-1.5 text-sm font-medium text-slate-650 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-350 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Ergonomic Chairs
                  </Link>
                  <Link
                    href="/?category=Table#catalog"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileOfficeOpen(false); }}
                    className="block rounded-lg px-3 py-1.5 text-sm font-medium text-slate-650 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-350 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Executive Desks
                  </Link>
                  <Link
                    href="/?category=Drawer#catalog"
                    onClick={() => { setIsMobileMenuOpen(false); setIsMobileOfficeOpen(false); }}
                    className="block rounded-lg px-3 py-1.5 text-sm font-medium text-slate-650 hover:bg-slate-50 hover:text-brand-red dark:text-zinc-350 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Mobile Drawers
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-800 dark:text-zinc-150 hover:bg-slate-50 hover:text-brand-red dark:hover:bg-zinc-700 transition-colors"
            >
              Contact
            </Link>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
