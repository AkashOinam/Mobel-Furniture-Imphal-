"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import { products as fallbackProducts, Product } from "./data/products";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  Search,
  MapPin,
  Phone,
  Truck,
  Wrench,
  ShieldCheck,
  Briefcase,
  Home as HomeIcon,
  ChevronRight,
  X,
  Sparkles
} from "lucide-react";

function HomePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPopup, setShowPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch updated products from database/API on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to load products from API:", err);
      }
    }
    loadProducts();
  }, []);

  // Reset scroll to top on page reload/mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  // Sync state with URL search parameters
  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);

    const cat = searchParams.get("category") || "All";
    setSelectedCategory(cat);
  }, [searchParams]);

  // Trigger loading skeleton simulation when category or search query changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  // Handle showing the social promo popup or notification
  useEffect(() => {
    const timer = setTimeout(() => {
      const isClosed = localStorage.getItem("mobel_promo_popup_closed") === "true";
      const isNotifDismissed = localStorage.getItem("mobel_promo_notification_dismissed") === "true";

      if (isClosed) {
        if (!isNotifDismissed) {
          setShowNotification(true);
        }
      } else {
        setShowPopup(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = (followed = false) => {
    setShowPopup(false);
    localStorage.setItem("mobel_promo_popup_closed", "true");

    if (followed) {
      localStorage.setItem("mobel_promo_notification_dismissed", "true");
      setShowNotification(false);
    } else {
      const isNotifDismissed = localStorage.getItem("mobel_promo_notification_dismissed") === "true";
      if (!isNotifDismissed) {
        setShowNotification(true);
      }
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    router.replace(`/?${params.toString()}#catalog`, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat && cat !== "All") {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    // Clear search term when selection changes to avoid confusing combinations
    params.delete("search");
    router.replace(`/?${params.toString()}#catalog`, { scroll: false });
  };

  // Get unique categories for home and office
  const categories = useMemo(() => {
    const allCats = products.map((p) => p.category);
    return ["All", ...Array.from(new Set(allCats))];
  }, [products]);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  // Separate office and home featured products
  const officeProducts = useMemo(() => {
    return products.filter((p) => p.section === "office").slice(0, 4);
  }, [products]);

  const homeProducts = useMemo(() => {
    return products.filter((p) => p.section === "home").slice(0, 4);
  }, [products]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-charcoal-900 border-b border-slate-100 dark:border-zinc-800">
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-red/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-slate-200/40 dark:bg-zinc-800/10 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left text column */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 text-xs font-semibold text-brand-red">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse"></span>
                Delivered Across Manipur
              </div>

              <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-5xl md:text-6xl leading-[1.1]">
                Crafting Elegance for <br className="hidden sm:inline" />
                <span className="text-brand-red italic">Manipur</span> Homes & Offices
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-slate-500 dark:text-zinc-400 leading-relaxed mx-auto lg:mx-0">
                Transform your home and workspace with thoughtfully crafted furniture that blends timeless design, exceptional durability, and everyday comfort.
              </p>

              <div className="flex flex-col items-center sm:flex-row justify-center lg:justify-start gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById("catalog");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-brand-red w-52 sm:w-auto px-6 py-3 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-brand-red-hover transition-colors gap-2 cursor-pointer"
                >
                  Explore Catalog <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 w-52 sm:w-auto px-6 py-3 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  Visit Showroom
                </button>
              </div>

              {/* Mini Brand Highlights */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/60 dark:border-zinc-800 text-left max-w-md mx-auto lg:mx-0">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-zinc-50">100%</h4>
                  <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium mt-1">Premium Quality</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-zinc-50">10+</h4>
                  <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium mt-1">Categories Available</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-zinc-50">Delivery</h4>
                  <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium mt-1">All Across Districts</p>
                </div>
              </div>
            </div>

            {/* Right visual column */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 bg-white">
                <Image
                  src="/sofa-hero.jpg"
                  alt="Möbel Lebanon Comfort Sofa Set"
                  fill
                  priority
                  className="object-contain bg-white p-4"
                />

                {/* Floating overlay card */}
                <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/95 dark:bg-charcoal-900/95 p-4.5 shadow-lg border border-slate-100 dark:border-zinc-800 backdrop-blur-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-widest text-brand-red uppercase">Featured Collection</span>
                    <h3 className="text-sm font-semibold text-slate-950 dark:text-white">Lebanon comfort 3+2+1</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Partnership & Trust Banner */}
      <section className="bg-white dark:bg-charcoal-950 py-10 border-b border-slate-100 dark:border-zinc-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-charcoal-800 transition-colors">
              <div className="rounded-lg bg-brand-red/5 p-3 text-brand-red">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-zinc-100">Factory Standards</h4>
                <p className="text-xs text-slate-400 dark:text-zinc-500">Quality-checked production specs</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-charcoal-800 transition-colors">
              <div className="rounded-lg bg-brand-red/5 p-3 text-brand-red">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-zinc-100">Free Assembly</h4>
                <p className="text-xs text-slate-400 dark:text-zinc-500">Delivery & setup inside Imphal</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-charcoal-800 transition-colors">
              <div className="rounded-lg bg-brand-red/5 p-3 text-brand-red">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-zinc-100">Durable Warranty</h4>
                <p className="text-xs text-slate-400 dark:text-zinc-500">Up to 10 years peace of mind</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DEDICATED SECTION: HOME FURNITURE */}
      <section id="home-furniture" className="py-20 bg-sand-100 dark:bg-charcoal-900 border-b border-slate-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-brand-red uppercase">
                <HomeIcon className="h-3.5 w-3.5" />
                Home Living
              </div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-4xl">
                The Sanctuary Home Collection
              </h2>
              <p className="text-slate-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                Transform your home. Featuring master-suite beds, wardrobes, dining sets, showcases, dressers, and plush sofas curated from the premium Möbel Kolkata catalog.
              </p>
            </div>
            <a
              href="#catalog"
              onClick={() => setSelectedCategory("All")}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-brand-red-hover transition-colors"
            >
              View all home products <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* DEDICATED SECTION: OFFICE FURNITURE */}
      <section id="office-furniture" className="py-20 bg-white dark:bg-charcoal-900 border-b border-slate-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-brand-red uppercase">
                <Briefcase className="h-3.5 w-3.5" />
                Office Spaces
              </div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-4xl">
                The Office Ergonomics Collection
              </h2>
              <p className="text-slate-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                Calibrated for peak productivity. Discover ergonomic seating with advanced lumbar settings, robust executive writing desks, and mobile drawer units curated from Möbel Kolkata.
              </p>
            </div>
            <a
              href="#catalog"
              onClick={() => setSelectedCategory("Office Chair")}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:text-brand-red-hover transition-colors"
            >
              View all office furniture <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {officeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>


      {/* FILTERABLE CATALOG SECTION */}
      <section id="catalog" className="py-20 bg-white dark:bg-charcoal-900 border-b border-slate-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold tracking-widest text-brand-red uppercase">Our Catalog</span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-4xl">
              Explore Our Complete Collection
            </h2>
            <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed">
              Filter by specific types of home and office furniture, and add products directly to your shopping cart.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex justify-center border-b border-slate-100 dark:border-zinc-800 pb-8 mb-8">
            {/* Category Pills (Horizontal Scroll on Mobile) */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-full px-4.5 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${selectedCategory === category
                    ? "bg-brand-red text-white"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-base font-semibold text-slate-700 dark:text-zinc-300">No products found matching your search</p>
              <p className="text-sm text-slate-400">Try searching for other keywords, or reset the filters.</p>
              <button
                onClick={() => {
                  handleSearchChange("");
                  handleCategoryChange("All");
                }}
                className="mt-2 rounded-full bg-brand-red px-5 py-2 text-xs font-semibold text-white hover:bg-brand-red-hover transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-sand-50 dark:bg-charcoal-900 border-b border-slate-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold tracking-widest text-brand-red uppercase">Reviews</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-zinc-50">Trusted by Locals in Manipur</h2>
            <p className="text-slate-500 text-sm">Hear from our clients who updated their homes and office chambers.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

            <div className="bg-white dark:bg-charcoal-800 p-8 rounded-xl shadow-xs border border-slate-100 dark:border-zinc-850 space-y-4">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-zinc-350 leading-relaxed italic">
                &ldquo;Ordered a customized 6-seater Kanglei dining table. The seasoning of the local teak is top-notch. It fits our Imphal dining room perfectly. Local installation team was very polite.&rdquo;
              </p>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">L. Sanatomba Singh</h4>
                <p className="text-xs text-slate-400 mt-0.5">Sagolband, Imphal West</p>
              </div>
            </div>

            <div className="bg-white dark:bg-charcoal-800 p-8 rounded-xl shadow-xs border border-slate-100 dark:border-zinc-850 space-y-4">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-zinc-350 leading-relaxed italic">
                &ldquo;We renovated our law office chamber and purchased 6 Summit Ergonomic chairs. Lumbar support is incredible for long reading sessions. Highly recommend their local Imphal-made office chairs.&rdquo;
              </p>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">RK. Monalisa Devi</h4>
                <p className="text-xs text-slate-400 mt-0.5">High Court Compound area, Imphal East</p>
              </div>
            </div>

            <div className="bg-white dark:bg-charcoal-800 p-8 rounded-xl shadow-xs border border-slate-100 dark:border-zinc-850 space-y-4">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-zinc-350 leading-relaxed italic">
                &ldquo;Visited the showroom opposite Classic Hotel. Excellent collection of wardrobes and showcases direct from Mobel Kolkata. The staff helped us pick the matching set, delivered to Thoubal next day.&rdquo;
              </p>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Dr. K. Arunkumar</h4>
                <p className="text-xs text-slate-400 mt-0.5">Thoubal Bazaar</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Showroom & Contact Location Section */}
      <section id="contact" className="py-20 bg-white dark:bg-charcoal-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left Info Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-brand-red uppercase">Location</span>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-4xl">
                  Visit Our Imphal Showroom
                </h2>
                <p className="text-slate-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Experience furniture beyond the catalog. Visit our showroom to explore inspiring office environments, test the comfort of our ergonomic seating, and appreciate the rich textures, premium materials, and exceptional craftsmanship of our sofas. See, touch, and feel the quality that makes every piece uniquely exceptional.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-brand-red flex-shrink-0 flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Showroom Address</h4>
                    <p className="text-sm text-slate-500 dark:text-zinc-455 mt-1 leading-relaxed">
                      Kwakeithel Ningthemkol Near Maruti Suzuki Arena  <br />
                      Imphal West, Manipur - 795001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-brand-red flex-shrink-0 flex items-center justify-center">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-zinc-100">Contact Details</h4>
                    <p className="text-sm text-slate-500 dark:text-zinc-455 mt-1 leading-relaxed">
                      Mobile: <a href="tel:+916009905233" className="hover:text-brand-red transition-colors">+91 6009905233</a> <br />
                      Email: <a href="mailto:info@stupendousinteriors.com" className="hover:text-brand-red transition-colors">info@stupendousinteriors.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-brand-red/5 p-5 border border-brand-red/10 text-sm max-w-md">
                <h5 className="font-semibold text-brand-red">Delivery Coverage</h5>
                <p className="text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed text-xs">
                  We deliver across all districts of Manipur, including Imphal East, Imphal West, Thoubal, Bishnupur, Kakching, Churachandpur, Senapati, and more. Delivery charges vary based on the distance from our store and will be confirmed at the time of purchase.
                </p>
              </div>
            </div>

            {/* Right Map Visual Column */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-md bg-slate-50 dark:bg-zinc-800 flex items-center justify-center">
              {/* Satellite Map Iframe */}
              <iframe
                title="Möbel Furniture Imphal Location Satellite View"
                src="https://maps.google.com/maps?q=Möbel%20Furniture%20Imphal,%20Kwakeithel%20Ningthemkol,%20Imphal&t=k&z=18&output=embed"
                className="absolute -top-[150px] -left-[120px] w-[calc(100%+240px)] h-[calc(100%+300px)] border-0 filter brightness-95 contrast-105"
                allowFullScreen
                loading="lazy"
              />

              {/* Floating Card overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-charcoal-900/95 p-4 rounded-xl border border-slate-150 dark:border-zinc-850 shadow-lg backdrop-blur-xs text-center space-y-3 z-10 max-w-sm mx-auto">
                <div>
                  <h4 className="text-sm font-bold text-slate-950 dark:text-zinc-50 flex items-center justify-center gap-1.5">
                    <MapPin className="h-4.5 w-4.5 text-brand-red animate-pulse" />
                    Möbel Furniture Imphal
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5">Kwakeithel Ningthemkol, Near Maruti Suzuki Arena</p>
                </div>
                <a
                  href="https://maps.app.goo.gl/aY8oofudbYw1Vzyu8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-slate-900 dark:bg-zinc-700 px-5 py-2 text-xs font-semibold text-white hover:bg-brand-red transition-colors gap-2 items-center mx-auto"
                >
                  Open in Google Maps <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-charcoal-900 border border-slate-150 dark:border-zinc-800 p-8 shadow-2xl text-center space-y-6 transform scale-100 transition-transform duration-300">
            {/* Close Button */}
            <button
              onClick={() => closePopup(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-650 transition-colors"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Visual Icon/Badge */}
            <div className="mx-auto h-16 w-16 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red animate-bounce">
              <Sparkles className="h-8 w-8" />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-zinc-50">
                Special Offer!
              </h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium">
                Follow our socials and get <span className="text-brand-red font-bold text-lg">₹1000 OFF</span>
              </p>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500">
                *T&C apply
              </p>
            </div>

            {/* Redirect Button */}
            <a
              href="https://linktr.ee/mobelfurnitureimphal"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => closePopup(true)}
              className="w-full flex items-center justify-center rounded-full bg-brand-red py-3.5 text-sm font-semibold text-white hover:bg-brand-red-hover transition-colors shadow-lg shadow-brand-red/20 uppercase tracking-wider"
            >
              FOLLOW
            </a>
          </div>
        </div>
      )}

      {/* Bottom Right Toast/Notification Popup */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-40 max-w-sm rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-150 dark:border-zinc-800 p-4.5 shadow-xl flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-300">
          <div className="h-10 w-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red flex-shrink-0">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-zinc-50">
              Special Offer Active!
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
              Get <span className="text-brand-red font-bold">₹1000 OFF</span> today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://linktr.ee/mobelfurnitureimphal"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setShowNotification(false);
                localStorage.setItem("mobel_promo_notification_dismissed", "true");
              }}
              className="rounded-full bg-brand-red px-3 py-1.5 text-[10px] font-bold text-white hover:bg-brand-red-hover transition-colors uppercase tracking-wider whitespace-nowrap"
            >
              FOLLOW
            </a>
            <button
              onClick={() => {
                setShowNotification(false);
                localStorage.setItem("mobel_promo_notification_dismissed", "true");
              }}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-650 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function HomePageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-charcoal-900 animate-pulse">
      {/* Skeleton Navbar */}
      <div className="h-16 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between px-6 bg-white dark:bg-charcoal-900">
        <div className="h-8 w-32 bg-slate-150 dark:bg-zinc-800 rounded" />
        <div className="hidden md:flex gap-6">
          <div className="h-4 w-16 bg-slate-150 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-16 bg-slate-150 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-16 bg-slate-150 dark:bg-zinc-800 rounded" />
        </div>
        <div className="h-8 w-20 bg-slate-150 dark:bg-zinc-800 rounded-full" />
      </div>

      {/* Skeleton Hero */}
      <div className="py-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-1">
        <div className="space-y-6">
          <div className="h-4 w-48 bg-slate-150 dark:bg-zinc-800 rounded" />
          <div className="h-12 w-full bg-slate-150 dark:bg-zinc-800 rounded" />
          <div className="h-6 w-5/6 bg-slate-150 dark:bg-zinc-800 rounded" />
          <div className="flex gap-4 pt-4">
            <div className="h-10 w-32 bg-slate-150 dark:bg-zinc-800 rounded-full" />
            <div className="h-10 w-32 bg-slate-150 dark:bg-zinc-800 rounded-full" />
          </div>
        </div>
        <div className="aspect-[4/3] bg-slate-150 dark:bg-zinc-800 rounded-2xl w-full" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePageContent />
    </Suspense>
  );
}
