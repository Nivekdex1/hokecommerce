"use client";

import { formatPrice } from "@/utils/formatPrice";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

export interface ProductType {
  id: string;
  title: string;
  handle: string;
  price: string;
  currencyCode: string;
  image: string;
  vendor?: string;
}

interface ProductCardProps {
  product: ProductType;
  variant?: "default" | "compact" | "featured";
  showQuickAdd?: boolean;
  badge?: "NEW" | "BEST SELLER" | "LOW STOCK" | null;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = "default",
  showQuickAdd = true,
  badge = null,
}) => {
  const { addItem } = useCartStore();

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
      quantity: 1,
      currencyCode: product.currencyCode,
    });
    toast.success(`${product.title} added to cart`);
  };

  return (
    <Link
      href={`/shop/${product.handle}`}
      className={`group flex flex-col relative bg-white/40 border-[0.5px] border-hok-mist/60 hover:border-hok-mist/90 p-2 overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] ${
        variant === "compact" ? "min-w-[200px]" : "w-full"
      }`}
    >
      {badge && (
        <div className={`absolute top-4 left-4 z-10 text-[9px] font-outfit font-semibold px-3 py-1.5 tracking-[0.2em] uppercase rounded-none shadow-sm ${
          badge === "NEW" 
            ? "bg-hok-champagne/10 text-hok-caramel backdrop-blur-sm border border-hok-champagne/30" 
            : "bg-hok-espresso text-white"
        }`}>
          {badge}
        </div>
      )}
      
      <div className={`relative w-full ${variant === "compact" ? "aspect-square" : "aspect-[4/5]"} bg-[#F8F6F4] overflow-hidden`}>
        <Image
          src={product.image || "/placeholder.jpg"}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-[1500ms] group-hover:scale-110 drop-shadow-sm"
        />
        
        {showQuickAdd && (
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-white/95 backdrop-blur-md text-hok-espresso font-outfit font-medium text-xs tracking-[0.2em] uppercase py-3.5 hover:bg-hok-espresso hover:text-white transition-all duration-300 active:scale-[0.97] shadow-sm"
            >
              Add to Bag
            </button>
          </div>
        )}
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
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-outfit font-medium text-hok-charcoal">
            {formatPrice(product.price, { currencyCode: product.currencyCode })}
          </span>
          
          <div className="flex items-center text-hok-champagne">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs text-hok-stone ml-1 font-outfit">4.9</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
