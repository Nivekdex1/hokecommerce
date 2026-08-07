"use client";

import React, { useState, useEffect } from "react";
import { ProductType } from "@/components/ui/ProductCard";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatPrice } from "@/utils/formatPrice";
import { X, Minus, Plus, Heart, ShoppingBag, Star, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface QuickViewModalProps {
  product: ProductType | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem } = useCartStore();
  const { items: wishlistItems, toggleItem } = useWishlistStore();
  const [quantity, setQuantity] = useState(1);

  const inWishlist = product ? wishlistItems.some((i) => i.id === product.id) : false;

  // Reset quantity when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: product.id,
      title: product.title,
      handle: product.handle,
      price: product.price,
      image: product.image,
      quantity,
      currencyCode: product.currencyCode,
    });
    toast.success(`${quantity} × ${product.title} added to cart`);
    onClose();
  };

  const handleWishlistToggle = () => {
    toggleItem(product);
    if (!inWishlist) {
      toast.success(`${product.title} added to wishlist`);
    } else {
      toast.info(`${product.title} removed from wishlist`);
    }
  };

  const isSoldOut = product.availableForSale === false;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8 pointer-events-none`}
      >
        <div
          className={`bg-white w-full max-w-[800px] max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto transform transition-all duration-200 ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-hok-stone hover:text-hok-espresso hover:bg-white transition-all duration-150 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="w-full md:w-1/2 aspect-square bg-[#F8F6F4] relative overflow-hidden">
              <Image
                src={product.image || "/placeholder.jpg"}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              {isSoldOut && (
                <div className="absolute top-4 left-4 z-10 text-[9px] font-outfit font-semibold px-3 py-1.5 tracking-[0.2em] uppercase bg-hok-error text-white">
                  SOLD OUT
                </div>
              )}
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col">
              {product.vendor && (
                <span className="text-[10px] text-hok-stone uppercase tracking-[0.25em] font-outfit font-semibold mb-2">
                  {product.vendor}
                </span>
              )}

              <h2 className="font-playfair text-2xl sm:text-3xl text-hok-espresso font-semibold leading-tight mb-3">
                {product.title}
              </h2>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-outfit text-xl font-bold text-hok-walnut">
                  {formatPrice(product.price, { currencyCode: product.currencyCode })}
                </span>
                <div className="flex items-center text-hok-champagne">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs text-hok-stone ml-1 font-outfit">4.9</span>
                </div>
              </div>

              <div className="border-t border-hok-mist/60 my-4" />

              {/* Quantity + Actions */}
              <div className="space-y-4 mt-auto">
                {/* Quantity Selector */}
                <div className="flex items-center gap-3">
                  <span className="font-outfit text-sm text-hok-stone uppercase tracking-wider">
                    Qty:
                  </span>
                  <div className="flex items-center border border-hok-mist/60 bg-white h-11">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-full flex items-center justify-center text-hok-stone hover:text-hok-espresso transition-colors duration-100"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 h-full text-center text-sm font-outfit font-medium border-none focus:ring-0 p-0 text-hok-espresso bg-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-11 h-full flex items-center justify-center text-hok-stone hover:text-hok-espresso transition-colors duration-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart + Wishlist */}
                <div className="flex gap-3">
                  <button
                    onClick={isSoldOut ? undefined : handleAddToCart}
                    disabled={isSoldOut}
                    className={`flex-1 h-12 font-outfit font-medium text-sm tracking-[0.12em] uppercase flex items-center justify-center gap-2 transition-colors duration-150 ${
                      isSoldOut
                        ? "bg-hok-mist/50 text-hok-stone cursor-not-allowed"
                        : "bg-hok-espresso text-white hover:bg-hok-walnut active:scale-[0.97]"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {isSoldOut ? "Out of Stock" : "Add to Bag"}
                  </button>
                  <button
                    onClick={handleWishlistToggle}
                    className="w-12 h-12 shrink-0 flex items-center justify-center border border-hok-mist bg-white hover:bg-hok-linen transition-colors duration-150 group"
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors duration-200 ${
                        inWishlist
                          ? "fill-hok-error text-hok-error"
                          : "text-hok-espresso group-hover:text-hok-error"
                      }`}
                    />
                  </button>
                </div>

                {/* View Full Details */}
                <Link
                  href={`/shop/${product.handle}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 text-sm text-hok-stone hover:text-hok-espresso font-outfit transition-colors duration-150 pt-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View full details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
