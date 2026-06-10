"use client";

import React, { useState } from "react";
import { Product } from "../../data/products";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ShoppingCart,
  Star,
  Check,
  Truck,
  Shield,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

type TabType = "description" | "specifications" | "delivery";

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const quantity = 1;
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [isAdded, setIsAdded] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset active image index when product ID changes
  React.useEffect(() => {
    setActiveIndex(0);
  }, [product.id]);

  // Dynamically compile a list of images.
  // 1. Start with the explicitly defined list in product.images (if present)
  // 2. Otherwise, start with product.image, then search for other products in the same category
  // 3. Keep unique images and limit to a premium gallery size of 4 images.
  const images = React.useMemo(() => {
    const list = [product.image];
    if (product.images && product.images.length > 0) {
      // Filter out the main image if it exists in the gallery array to avoid duplicates
      const uniqueGallery = product.images.filter(img => img !== product.image);
      return [...list, ...uniqueGallery].slice(0, 4);
    }

    // Find related products in the same category to use their images
    const fallbackList = relatedProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .map(p => p.image);

    // Merge and deduplicate
    const combined = Array.from(new Set([...list, ...fallbackList]));

    // If still less than 4, we can add some other general beautiful Unsplash furniture URLs
    if (combined.length < 4) {
      const fallbacks = [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
      ];
      for (const url of fallbacks) {
        if (!combined.includes(url)) {
          combined.push(url);
        }
        if (combined.length >= 4) break;
      }
    }

    return combined.slice(0, 4);
  }, [product, relatedProducts]);

  const activeImage = images[activeIndex] || product.image;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setHoverPosition({ x, y });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-white dark:bg-charcoal-900 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs / Back button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-red dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4.5 w-4.5" /> Back to Catalog
            </Link>
          </div>

          {/* Main Product Panel */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start mb-20">

            {/* Left Column: Image Gallery + Magnifier Hover */}
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none md:w-20 flex-shrink-0">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 bg-slate-50 dark:bg-zinc-900 transition-all flex-shrink-0 ${activeIndex === index
                      ? "border-brand-red ring-2 ring-brand-red/25 scale-[1.03]"
                      : "border-slate-100 dark:border-zinc-850 hover:border-slate-300 dark:hover:border-zinc-700"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image Container */}
              <div className="flex-1 space-y-4">
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 cursor-zoom-in"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onMouseMove={handleMouseMove}
                >
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-100 ${isHovered ? "scale-150" : "scale-100"
                      }`}
                    style={
                      isHovered
                        ? { transformOrigin: `${hoverPosition.x}% ${hoverPosition.y}%` }
                        : undefined
                    }
                  />
                </div>
                <p className="text-center text-xs text-slate-400 dark:text-zinc-500">
                  Hover over image to zoom and inspect material details
                </p>
              </div>
            </div>

            {/* Right Column: Title, pricing & actions */}
            <div className="space-y-6 lg:pl-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
                  {product.category}
                </span>
                <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-4xl">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200 dark:text-zinc-700"
                          }`}
                      />
                    ))}
                    <span className="text-sm font-semibold text-slate-700 dark:text-zinc-300 ml-1.5">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">|</span>
                  <span className="text-xs text-slate-400 font-medium">
                    {product.reviewsCount} customer reviews
                  </span>
                </div>
              </div>

              {/* Price block replaced with Request for quotation */}
              <div className="border-y border-slate-100 dark:border-zinc-800 py-4.5">
                <span className="text-xl font-bold text-brand-red block">
                  Request for a Quotation
                </span>
                <span className="text-xs text-slate-400 dark:text-zinc-500 mt-1 block">
                  Add to cart and proceed to request bulk/custom design pricing.
                </span>
              </div>

              {/* Short description */}
              <p className="text-sm leading-6 text-slate-500 dark:text-zinc-400">
                {product.description}
              </p>

              {/* Add to Cart Actions */}
              <div className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center">

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 w-full flex items-center justify-center rounded-full py-3.5 px-8 text-sm font-semibold text-white shadow-xs transition-all duration-300 ${isAdded
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-brand-red hover:bg-brand-red-hover"
                      }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4.5 w-4.5 mr-2 animate-scale-in" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4.5 w-4.5 mr-2" />
                        Add to Shopping Cart
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Information Tabs */}
              <div className="pt-8 border-t border-slate-100 dark:border-zinc-800">
                {/* Tab Header pills */}
                <div className="flex border-b border-slate-100 dark:border-zinc-800 gap-6">
                  {(["description", "specifications", "delivery"] as TabType[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-sm font-semibold tracking-wide capitalize border-b-2 transition-all ${activeTab === tab
                        ? "border-brand-red text-brand-red"
                        : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content Panels */}
                <div className="py-5 text-sm leading-6 text-slate-500 dark:text-zinc-400">
                  {activeTab === "description" && (
                    <div className="space-y-4">
                      <p>{product.description}</p>
                      <h4 className="font-semibold text-slate-900 dark:text-zinc-150 flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-brand-red" />
                        Key Features
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-brand-red font-bold">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "specifications" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="border-b border-slate-50 dark:border-zinc-850 pb-2">
                        <span className="font-semibold text-slate-900 dark:text-zinc-200 block">Material Composition</span>
                        <span className="text-slate-500 mt-1 block">{product.specifications.material}</span>
                      </div>
                      <div className="border-b border-slate-50 dark:border-zinc-850 pb-2">
                        <span className="font-semibold text-slate-900 dark:text-zinc-200 block">Product Dimensions</span>
                        <span className="text-slate-500 mt-1 block">{product.specifications.dimensions}</span>
                      </div>
                      <div className="border-b border-slate-50 dark:border-zinc-850 pb-2">
                        <span className="font-semibold text-slate-900 dark:text-zinc-200 block">Warranty Period</span>
                        <span className="text-slate-500 mt-1 block">{product.specifications.warranty}</span>
                      </div>
                      <div className="border-b border-slate-50 dark:border-zinc-850 pb-2">
                        <span className="font-semibold text-slate-900 dark:text-zinc-200 block">Assembly Requirement</span>
                        <span className="text-slate-500 mt-1 block">{product.specifications.assembly}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === "delivery" && (
                    <div className="space-y-4 text-xs">
                      <div className="flex gap-3">
                        <Truck className="h-5 w-5 text-brand-red flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-zinc-150">Manipur Local Delivery</h4>
                          <p className="mt-1 leading-relaxed">
                            Delivery price differs according to the distance.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Shield className="h-5 w-5 text-brand-red flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-zinc-150">Damaged during transit?</h4>
                          <p className="mt-1 leading-relaxed">
                            All our deliveries are insured and handled by our own Mobel cargo trucks. Any damages incurred during shipping will be replaced immediately by our team.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-slate-100 dark:border-zinc-800 pt-16 mb-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
                  Related Collections You May Like
                </h3>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:text-brand-red-hover transition-colors"
                >
                  View full catalog <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
