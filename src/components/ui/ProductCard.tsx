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
      id: product.id,
      title: product.title,
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
      className={`group flex flex-col relative bg-white rounded-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-hok-mist/60 ${
        variant === "compact" ? "min-w-[200px]" : "w-full"
      }`}
    >
      {badge && (
        <div className="absolute top-3 left-3 z-10 bg-hok-espresso text-white text-[10px] font-bold px-2 py-1 tracking-wider uppercase rounded-sm">
          {badge}
        </div>
      )}
      
      <div className={`relative w-full ${variant === "compact" ? "aspect-square" : "aspect-[4/5]"} bg-hok-linen overflow-hidden`}>
        <Image
          src={product.image || "/placeholder.jpg"}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {showQuickAdd && (
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-hok-espresso/90 backdrop-blur-sm text-white font-medium py-3 rounded-md hover:bg-hok-espresso transition-colors"
            >
              Quick Add
            </button>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {product.vendor && (
          <span className="text-xs text-hok-stone uppercase tracking-widest font-semibold mb-1">
            {product.vendor}
          </span>
        )}
        
        <h3 className="font-playfair text-lg text-hok-espresso font-medium leading-tight mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-hok-caramel">
          {product.title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-manrope font-semibold text-hok-walnut">
            {formatPrice(product.price, { currencyCode: product.currencyCode })}
          </span>
          
          <div className="flex items-center text-hok-champagne">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xs text-hok-stone ml-1">4.9</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
