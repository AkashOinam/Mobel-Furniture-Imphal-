"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to detail page when clicking cart button
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white dark:border-zinc-800 dark:bg-charcoal-800 transition-all duration-300 hover:shadow-lg hover:border-slate-200 dark:hover:border-zinc-700">
      
      {/* Product Image & Badges */}
      <Link href={`/product/${product.id}`} className="relative block aspect-square w-full overflow-hidden bg-slate-50 dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800/80">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
          {product.category}
        </span>
        
        <h3 className="mt-1 text-sm font-semibold leading-5 text-slate-900 dark:text-zinc-100 group-hover:text-brand-red transition-colors line-clamp-2">
          <Link href={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-brand-red">
              Request Quote
            </span>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className={`flex h-9.5 w-9.5 items-center justify-center rounded-full transition-all duration-300 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-slate-50 hover:bg-brand-red text-slate-700 hover:text-white dark:bg-zinc-700/50 dark:text-zinc-300 dark:hover:bg-brand-red dark:hover:text-white"
            } shadow-xs`}
            aria-label="Add to cart"
          >
            {added ? (
              <Check className="h-4.5 w-4.5 animate-scale-in" />
            ) : (
              <ShoppingCart className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
