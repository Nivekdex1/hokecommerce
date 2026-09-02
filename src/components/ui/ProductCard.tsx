"use client";

import { formatPrice } from "@/utils/formatPrice";
import { Star, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { toast } from "sonner";

export interface ProductType {
  id: string;
  title: string;
  handle: string;
  price: string;
  currencyCode: string;
  image: string;
  vendor?: string;
  availableForSale?: boolean;
}

interface ProductCardProps {
  product: ProductType;
  variant?: "default" | "compact" | "featured";
  showQuickAdd?: boolean;
  badge?: "NEW" | "BEST SELLER" | "LOW STOCK" | null;
  onQuickView?: (product: ProductType) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = "default",
  showQuickAdd = true,
  badge = null,
  onQuickView,
}) => {
  const { addItem } = useCartStore();
  const { items: wishlistItems, toggleItem } = useWishlistStore();
  const [isMounted, setIsMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    useWishlistStore.persist?.rehydrate?.();
  }, []);

  const inWishlist = isMounted && wishlistItems.some((item) => item.id === product.id);

  const getValidImageUrl = (url?: string) => {
    if (!url) return "/placeholder.jpg";
    if (url.startsWith("//")) return `https:${url}`;
    return url;
  };

  const imgSrc = getValidImageUrl(product.image);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      productId: product.id,
      variantId: product.id,
      title: product.title,
      handle: product.handle,
      price: product.price,
      image: imgSrc,
      quantity: 1,
      currencyCode: product.currencyCode,
    });
    toast.success(`${product.title} added to cart`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    if (!inWishlist) {
      toast.success(`${product.title} added to wishlist`);
    } else {
      toast.info(`${product.title} removed from wishlist`);
    }
  };

  const displayBadge = product.availableForSale === false ? "SOLD OUT" : badge;

  return (
    <Link
      href={`/shop/${product.handle}`}
      className={`group flex flex-col relative bg-white border-[0.5px] border-hok-mist/50 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.08)] ${
        variant === "compact" ? "min-w-[200px]" : "w-full"
      }`}
    >
      {/* Image — edge-to-edge square container */}
      <div className={`relative w-full ${variant === "compact" ? "aspect-square" : "aspect-square"} bg-[#F7F5F3] overflow-hidden`}>
        <Image
          src={imgError ? "/placeholder.jpg" : imgSrc}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        
        {/* Wishlist heart — top right */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-300 ${
              inWishlist
                ? "fill-hok-champagne text-hok-champagne"
                : "fill-none text-hok-stone"
            }`}
            strokeWidth={1.5}
          />
        </button>
        
        {/* Quick Add — slides up on hover */}
        {showQuickAdd && (
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out z-10">
            <button
              onClick={product.availableForSale === false ? undefined : handleQuickAdd}
              disabled={product.availableForSale === false}
              className={`w-full bg-white/90 backdrop-blur-md font-outfit font-medium text-[11px] tracking-[0.15em] uppercase py-3 transition-all duration-300 ${
                product.availableForSale === false 
                  ? "text-hok-stone cursor-not-allowed" 
                  : "text-hok-espresso hover:bg-hok-espresso hover:text-white active:scale-[0.98]"
              }`}
            >
              {product.availableForSale === false ? "Out of Stock" : "Add to Bag"}
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="px-3 pt-4 pb-3 flex flex-col flex-grow">
        {/* Badge replaces the old vendor/K-Beauty text label */}
        {displayBadge && (
          <span className={`text-[9px] font-outfit font-semibold tracking-[0.2em] uppercase mb-1.5 inline-block w-fit ${
            displayBadge === "SOLD OUT"
              ? "text-hok-error"
              : displayBadge === "NEW"
              ? "text-hok-champagne"
              : "text-hok-espresso"
          }`}>
            {displayBadge}
          </span>
        )}
        
        <h3 className="font-fondamento text-lg text-hok-espresso font-normal leading-snug mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-hok-champagne">
          {product.title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-outfit font-medium text-sm text-hok-charcoal">
            {formatPrice(product.price, { currencyCode: product.currencyCode })}
          </span>
          
          <div className="flex items-center gap-0.5 text-hok-champagne">
            <Star className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="text-xs text-hok-stone font-outfit">4.9</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
