"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-charcoal-900">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-serif text-4xl font-bold text-slate-900 dark:text-zinc-50">
          Privacy Policy
        </h1>
        <p className="text-slate-500 dark:text-zinc-400 text-sm">
          Our Privacy Policy is currently under construction. Please check back later.
        </p>
      </main>
      <Footer />
    </div>
  );
}
