"use client";

import React from "react";

interface SkeletonProductCardProps {
  variant?: "default" | "compact";
}

export default function SkeletonProductCard({ variant = "default" }: SkeletonProductCardProps) {
  return (
    <div
      className={`flex flex-col bg-white/40 border-[0.5px] border-hok-mist/60 p-2 overflow-hidden animate-pulse ${
        variant === "compact" ? "min-w-[200px]" : "w-full"
      }`}
    >
      {/* Image Skeleton */}
      <div
        className={`w-full ${
          variant === "compact" ? "aspect-square" : "aspect-[4/5]"
        } bg-hok-mist/40 rounded-sm`}
      />

      {/* Content Skeleton */}
      <div className="pt-5 flex flex-col flex-grow">
        {/* Vendor */}
        <div className="h-2.5 w-16 bg-hok-mist/50 rounded-full mb-3" />

        {/* Title */}
        <div className="h-5 w-full bg-hok-mist/40 rounded-full mb-2" />
        <div className="h-5 w-3/4 bg-hok-mist/30 rounded-full mb-4" />

        {/* Price + Rating */}
        <div className="mt-auto flex items-center justify-between">
          <div className="h-4 w-20 bg-hok-mist/50 rounded-full" />
          <div className="h-4 w-10 bg-hok-mist/30 rounded-full" />
        </div>

        {/* Add to Bag area */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="h-[38px] w-full bg-hok-mist/30 rounded-sm" />
          <div className="h-[38px] w-full bg-hok-mist/40 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonProductGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}
