import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-zinc-400 border-t border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Möbel Furniture Logo"
                width={128}
                height={36}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Premium home and office furniture in Imphal, Manipur. Retail partner for Möbel Furniture Kolkata, bringing luxury, high-quality, factory-crafted furniture direct to Imphal.
            </p>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4.5 w-4.5 text-brand-red mt-0.5 flex-shrink-0" />
                <span>Showroom: Kwakeithel Ningthemkol Near Maruti Suzuki Arena, Imphal West, Manipur - 795001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-brand-red flex-shrink-0" />
                <a href="tel:+916009905233" className="hover:text-white transition-colors">+91 6009905233</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-brand-red flex-shrink-0" />
                <a href="mailto:info@mobelimphal.com" className="hover:text-white transition-colors">info@mobelimphal.com</a>
              </div>
            </div>
          </div>

          {/* Column 2: Home Furniture Categories */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-6">Home Furniture</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/#home-furniture" className="hover:text-white transition-colors">Luxury Sofas</Link>
              </li>
              <li>
                <Link href="/#home-furniture" className="hover:text-white transition-colors">Beds & Mattresses</Link>
              </li>
              <li>
                <Link href="/#home-furniture" className="hover:text-white transition-colors">Wardrobes & Dressers</Link>
              </li>
              <li>
                <Link href="/#home-furniture" className="hover:text-white transition-colors">Showcases & Cabinets</Link>
              </li>
              <li>
                <Link href="/#home-furniture" className="hover:text-white transition-colors">Dining Tables & Chairs</Link>
              </li>
              <li>
                <Link href="/#home-furniture" className="hover:text-white transition-colors">Center Tables</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Office & Service Info */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-6">Office & Services</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/#office-furniture" className="hover:text-white transition-colors">Ergonomic Chairs</Link>
              </li>
              <li>
                <Link href="/#office-furniture" className="hover:text-white transition-colors">Executive Desks</Link>
              </li>
              <li>
                <Link href="/#office-furniture" className="hover:text-white transition-colors">Mobile Drawers</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Opening Hours & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-red" />
                Store Hours
              </h3>
              <p className="text-sm text-zinc-400">Monday - Sunday: 9:00 AM - 6:00 PM</p>

            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Stay Updated</h3>
              <p className="text-xs text-zinc-500">Subscribe for catalogs and new stock arrivals.</p>
              <form className="flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="w-full min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-xs ring-1 ring-inset ring-white/10 placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-brand-red text-sm"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-brand-red px-3.5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-brand-red-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red transition-colors"
                >
                  Join
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/MobelFurnitureImphal" className="text-zinc-500 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://www.instagram.com/mobelfurnitureimphal/" className="text-zinc-500 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="https://www.linkedin.com" className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-16 border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Möbel Furniture Imphal. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Delivering across Manipur
            </span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
