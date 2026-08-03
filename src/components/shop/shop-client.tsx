"use client";

import Filters from "@/components/shop/filters";
import ProductGrid from "@/components/shop/product-grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProducts } from "@/lib/shopify";
import { Products } from "@/lib/shopify/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface ShopClientProps {
  initialProducts: Products[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const [sortOption, setSortOption] = useState("featured");

  // Use initialProducts for the initial data
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: () => getProducts().then(res => res.products),
    initialData: initialProducts,
  });

  // Render the product content based on loading/error state
  const renderProductContent = () => {
    if (isLoading && !initialProducts.length) {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-2 aspect-square rounded-md bg-gray-200"></div>
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="py-10 text-center text-red-500">
          <h2 className="text-xl font-medium">Error</h2>
          <p className="mt-2">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </div>
      );
    }

    if (products && products.length === 0) {
      return (
        <div className="py-10 text-center">
          <h2 className="text-xl font-medium">No products found</h2>
          <p className="mt-2 text-gray-500">
            Try adjusting your filters or check back later.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products?.map((product) => (
          <ProductGrid key={product.id} products={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
      <div className="md:col-span-1">
        <Filters />
      </div>
      <div className="md:col-span-3">
        {/* Sort Dropdown */}
        <div className="mb-5 flex items-center justify-end">
          <Select
            value={sortOption}
            onValueChange={(value) => {
              setSortOption(value);
            }}
          >
            <SelectTrigger className="w-[180px] bg-white">
              <span className="mr-2">Sort</span>
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {renderProductContent()}
      </div>
    </div>
  );
}
