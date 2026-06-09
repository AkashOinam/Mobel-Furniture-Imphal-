"use client";

import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white dark:border-zinc-800 dark:bg-charcoal-800 p-0 shadow-xs animate-pulse">
      {/* Aspect ratio square image skeleton */}
      <div className="aspect-square w-full bg-slate-100 dark:bg-zinc-800/60" />

      {/* Info skeleton */}
      <div className="flex flex-1 flex-col p-4.5 space-y-3">
        {/* Category pill skeleton */}
        <div className="h-3 w-16 rounded bg-slate-150 dark:bg-zinc-800/80" />

        {/* Title skeleton - 2 lines */}
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-zinc-700/60" />
          <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-zinc-700/60" />
        </div>

        {/* Bottom actions skeleton */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          {/* Price/Quote text skeleton */}
          <div className="h-4.5 w-24 rounded bg-slate-200 dark:bg-zinc-700/60" />
          
          {/* Button skeleton */}
          <div className="h-9.5 w-9.5 rounded-full bg-slate-200 dark:bg-zinc-700/60" />
        </div>
      </div>
    </div>
  );
}
