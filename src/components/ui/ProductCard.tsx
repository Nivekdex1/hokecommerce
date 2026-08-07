"use client";

import { formatPrice } from "@/utils/formatPrice";
import { Star, Heart, Minus, Plus, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
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
  const [quantity, setQuantity] = useState(1);
  const [isMounted, setIsMounted] = React.useState(false);
  const [imgError, setImgError] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(true);

  // Normalize image URL (handle //cdn.shopify.com protocol-relative URLs)
  const getValidImageUrl = (url?: string) => {
    if (!url) return "/placeholder.jpg";
    if (url.startsWith("//")) return `https:${url}`;
    return url;
  };

  const [imgSrc, setImgSrc] = useState<string>(() => getValidImageUrl(product.image));

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    setImgSrc(getValidImageUrl(product.image));
    setImgError(false);
    setIsImgLoading(true);
  }, [product.image]);

  const inWishlist = wishlistItems.some((i) => i.id === product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      productId: product.id,
      variantId: product.id, // Fallback if no variant is used
      title: product.title,
      handle: product.handle,
      price: product.price,
      image: product.image,
      quantity: quantity,
      currencyCode: product.currencyCode,
    });
    toast.success(`${quantity} x ${product.title} added to cart`);
    setQuantity(1); // Reset quantity after adding
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

  return (
    <Link
      href={`/shop/${product.handle}`}
      className={`group flex flex-col relative bg-white/40 border-[0.5px] border-hok-mist/60 hover:border-hok-mist/90 p-3.5 sm:p-4 overflow-hidden transition-all duration-700 hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.08)] ${
        variant === "compact" ? "min-w-[200px]" : "w-full"
      }`}
    >
      {product.availableForSale === false ? (
        <div className="absolute top-4 left-4 z-10 text-[9px] font-outfit font-semibold px-3 py-1.5 tracking-[0.2em] uppercase rounded-none shadow-sm bg-hok-error text-white">
          SOLD OUT
        </div>
      ) : badge ? (
        <div className={`absolute top-4 left-4 z-10 text-[9px] font-outfit font-semibold px-3 py-1.5 tracking-[0.2em] uppercase rounded-none shadow-sm ${
          badge === "NEW" 
            ? "bg-white text-hok-espresso border border-hok-mist" 
            : "bg-hok-espresso text-white"
        }`}>
          {badge}
        </div>
      ) : null}
      
      {/* Wishlist & Quick View Buttons */}
      {isMounted && (
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button 
            onClick={handleWishlistToggle}
            className="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 hover:bg-white transition-all duration-200"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 transition-colors duration-200 ${inWishlist ? 'fill-hok-error text-hok-error' : 'text-hok-espresso group-hover:text-hok-error'}`} />
          </button>
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 hover:bg-white transition-all duration-200"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4 text-hok-espresso" />
            </button>
          )}
        </div>
      )}
      
      <div className={`relative w-full ${variant === "compact" ? "aspect-square" : "aspect-[4/5]"} bg-[#F8F6F4] overflow-hidden`}>
        {isImgLoading && (
          <div className="absolute inset-0 bg-hok-mist/60 animate-pulse z-10" />
        )}
        <Image
          src={imgError ? "/placeholder.jpg" : imgSrc}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-center transition-all duration-700 group-hover:scale-110 drop-shadow-sm ${
            isImgLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
          onLoad={() => setIsImgLoading(false)}
          onError={() => {
            setImgError(true);
            setIsImgLoading(false);
          }}
        />
      </div>

      <div className="pt-5 flex flex-col flex-grow bg-transparent">
        {product.vendor && (
          <span className="text-[9px] text-hok-stone uppercase tracking-[0.25em] font-outfit font-semibold mb-2">
            {product.vendor}
          </span>
        )}
        
        <h3 className="font-fondamento text-xl text-hok-espresso font-normal leading-snug mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-hok-champagne">
          {product.title}
        </h3>
        
        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-outfit font-bold text-base sm:text-lg text-hok-espresso">
              {formatPrice(product.price, { currencyCode: product.currencyCode })}
            </span>
            
            <div className="flex items-center text-hok-champagne">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs text-hok-stone ml-1 font-outfit">4.9</span>
            </div>
          </div>
          
          {showQuickAdd && (
            <div className="flex flex-col 2xl:flex-row items-stretch gap-1.5 sm:gap-2 mt-1 w-full max-w-full overflow-hidden">
              {/* Quantity Selector */}
              <div 
                className="flex items-center justify-between border border-hok-mist/60 rounded-none h-8 sm:h-[38px] 2xl:h-[42px] bg-white w-full 2xl:w-24 shrink-0 transition-colors hover:border-hok-mist px-1"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              >
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 sm:w-8 h-full flex items-center justify-center text-hok-stone hover:text-hok-espresso transition-colors disabled:opacity-40 shrink-0"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 min-w-0 h-full text-center text-xs font-outfit border-none focus:ring-0 p-0 text-hok-espresso bg-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  min="1"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 sm:w-8 h-full flex items-center justify-center text-hok-stone hover:text-hok-espresso transition-colors shrink-0"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              
              {/* Add to Bag Button */}
              <button
                onClick={product.availableForSale === false ? undefined : handleQuickAdd}
                disabled={product.availableForSale === false}
                className={`w-full 2xl:flex-1 h-8 sm:h-[38px] 2xl:h-[42px] font-outfit font-medium text-[10px] sm:text-[11px] tracking-[0.08em] sm:tracking-[0.15em] uppercase shadow-sm transition-all duration-300 truncate px-2 ${
                  product.availableForSale === false 
                    ? "bg-hok-mist/50 text-hok-stone cursor-not-allowed" 
                    : "bg-hok-espresso text-white hover:bg-hok-walnut active:scale-[0.97]"
                }`}
              >
                {product.availableForSale === false ? "Out of Stock" : "Add to Bag"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
