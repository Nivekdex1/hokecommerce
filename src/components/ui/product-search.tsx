"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/formatPrice";
import { useSearchProducts } from "@/utils/hooks/useSearchProducts";
import { LoaderCircle, Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

const ProductSearch = ({ autoFocus = false }: { autoFocus?: boolean }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const isFirstRun = useRef(true);
  const router = useRouter();

  // Auto-focus on mount if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (!query) return;
    const handler = setTimeout(() => setDebouncedQuery(query), 1000);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch search results using the debounced query
  const { data: results = [], isLoading } = useSearchProducts(debouncedQuery);

  // Remove focus if overlay is clicked
  const handleOverlayClick = () => {
    setFocused(false);
    inputRef.current?.blur();
  };

  return (
    <>
      {focused && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={handleOverlayClick}
        />
      )}
      <div className="relative z-50">
        <div
          className={cn(
            "flex h-11 w-full items-center rounded-full border border-hok-mist/60 bg-white/70 backdrop-blur-md p-2 transition-all duration-300 shadow-sm",
            {
              "bg-white border-hok-champagne shadow-md ring-1 ring-hok-champagne/20": focused,
            },
          )}
        >
          {isLoading && query.length > 0 ? (
            <LoaderCircle className="ml-3 size-4 animate-spin text-hok-espresso/70" />
          ) : (
            <Search className="ml-3 size-4 text-hok-espresso/70" />
          )}
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for your favorite K-Beauty..."
            className="h-full w-full border-none bg-transparent px-3 text-sm font-outfit text-hok-charcoal shadow-none placeholder:text-sm placeholder:font-outfit placeholder:text-hok-stone focus:border-none focus:shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            tabIndex={focused ? 0 : -1}
          />
          {focused && query.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              <X className="h-5 w-5 text-gray-500" strokeWidth={3} />
            </Button>
          )}
        </div>
        {!isLoading && focused && query.length > 0 && (
          <div className="absolute left-0 mt-3 w-full lg:w-[400px] lg:right-0 lg:left-auto rounded-xl bg-white/95 backdrop-blur-md p-3 shadow-2xl border border-hok-mist/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {results.length === 0 ? (
              <div className="py-6 text-center text-hok-stone font-manrope">
                No results found for "<span className="text-hok-espresso font-semibold">{query}</span>"
              </div>
            ) : (
              <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto hide-scrollbar">
                <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-widest text-hok-stone/70 border-b border-hok-mist/50 mb-2">
                  Products
                </div>
                {results.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center gap-4 rounded-lg p-2.5 hover:bg-hok-linen transition-colors cursor-pointer"
                    onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                      e.preventDefault();
                      router.push(`/shop/${item.handle}`);
                      setFocused(false);
                      setQuery("");
                    }}
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-hok-mist/40 bg-white">
                      <Image
                        src={item.featuredImage?.url || "/placeholder.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-sm font-playfair font-semibold text-hok-espresso group-hover:text-hok-walnut transition-colors line-clamp-1">
                        {item.title}
                      </h2>
                      <p className="text-xs font-manrope font-bold text-hok-stone group-hover:text-hok-charcoal">
                        {formatPrice(
                          item.priceRange?.maxVariantPrice.amount || "0",
                          {
                            currencyCode:
                              item.priceRange?.maxVariantPrice.currencyCode || "NGN",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                ))}
                
                {results.length > 0 && (
                  <div 
                    className="mt-3 pt-3 border-t border-hok-mist/50 text-center"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      router.push(`/shop?q=${encodeURIComponent(query)}`);
                      setFocused(false);
                    }}
                  >
                    <button className="text-[11px] font-bold uppercase tracking-widest text-hok-walnut hover:text-hok-champagne transition-colors w-full py-1">
                      Shop All Results <span className="ml-1">→</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductSearch;
