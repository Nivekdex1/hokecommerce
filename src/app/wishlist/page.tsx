"use client";

import React, { useEffect, useState } from "react";
import { useWishlistStore } from "@/store/useWishlistStore";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const wishlistItems = useWishlistStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
    useWishlistStore.persist.rehydrate();
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-20 bg-hok-linen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-hok-mist border-t-hok-champagne rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-20 bg-hok-linen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="font-playfair text-4xl md:text-5xl text-hok-espresso font-medium mb-4">
              My Wishlist
            </h1>
            <p className="font-outfit text-hok-stone">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
            </p>
          </div>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/40 border border-hok-mist/60 rounded-xl">
            <div className="w-20 h-20 bg-hok-mist/30 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-hok-stone" />
            </div>
            <h2 className="font-playfair text-2xl text-hok-espresso mb-3">Your wishlist is empty</h2>
            <p className="font-outfit text-hok-stone mb-8 max-w-md text-center">
              Save your favorite Korean skincare products here and easily add them to your bag when you're ready to checkout.
            </p>
            <Link 
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-hok-espresso text-white px-8 py-4 font-outfit font-medium text-sm tracking-[0.15em] uppercase hover:bg-hok-walnut transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
