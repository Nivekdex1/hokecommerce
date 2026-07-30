import Filters from "@/components/shop/filters";
import { Badge } from "@/components/ui/badge";
import Pagination from "@/components/ui/pagination";
import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";
import { getProducts } from "@/lib/shopify";
import { Products } from "@/lib/shopify/types";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

// Use the updated search params interface with before/after cursors
interface WholesaleShopPageSearchParams {
  minPrice?: string;
  maxPrice?: string;
  collections?: string | string[];
  vendors?: string | string[];
  productType?: string | string[];
  tags?: string | string[];
  category?: string | string[];
  after?: string; // Cursor for forward pagination
  before?: string; // Cursor for backward pagination
}

const WholesaleShop = async (props: {
  searchParams?: Promise<WholesaleShopPageSearchParams>;
}) => {
  const searchParams = await props.searchParams;
  // getProducts now handles reading before/after cursors from searchParams
  const pageSize = 15;

  // Get products with pagination using updated logic
  const { products, pageInfo } = await getProducts({
    searchParams,
    pageSize,
  });

  // Build URLs for pagination, preserving existing search params
  // Generates ?before=... or ?after=...
  const buildPaginationUrl = (
    cursor: string,
    type: "before" | "after",
  ): string => {
    const params = new URLSearchParams();

    // Add all existing search params *except* cursor params
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (key !== "before" && key !== "after") {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v));
          } else if (value) {
            params.append(key, value);
          }
        }
      });
    }

    // Add the new cursor parameter based on type
    params.set(type, cursor);

    // Ensure URL points to the wholesale shop
    return `/wholesale-shop?${params.toString()}`;
  };

  // Function to get the URL for the base page (no cursors)
  const getBasePageUrl = (): string => {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (key !== "before" && key !== "after") {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v));
          } else if (value) {
            params.append(key, value);
          }
        }
      });
    }
    const paramString = params.toString();
    // Ensure URL points to the wholesale shop
    return paramString ? `/wholesale-shop?${paramString}` : "/wholesale-shop";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Use container for better spacing */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          {/* Render the Filters component */}
          <Filters />
        </div>
        <div className="md:col-span-3">
          <Suspense fallback={<ProductGridSkeleton />}>
            {/* Render the filtered products directly */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products && products.length > 0 ? (
                products.map((product: Products) => (
                  <Link
                    key={product.id}
                    href={`/wholesale-shop/${product.handle}`}
                    className="group"
                  >
                    <div className="rounded border p-4 transition-shadow duration-200 group-hover:shadow-md">
                      {product.featuredImage && (
                        <Image
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          width={product.featuredImage.width}
                          height={product.featuredImage.height}
                          className="mb-2 h-48 w-full object-cover"
                        />
                      )}
                      <Badge
                        variant="default"
                        className="my-2 rounded-3xl bg-[#73512C] px-3 py-1 text-white"
                      >
                        Buy 5 get 5% off
                      </Badge>
                      <div className="">
                        <h3 className="text-base font-medium">
                          {product.title}
                        </h3>
                      </div>
                      <p className="font-medium">
                        {formatPrice(product.price, {
                          currencyCode: product.currencyCode,
                        })}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No products found matching your filters.</p>
              )}
            </div>

            {/* Use the updated Pagination component with correct props */}
            <Pagination
              hasNextPage={pageInfo.hasNextPage}
              hasPreviousPage={pageInfo.hasPreviousPage}
              startCursor={pageInfo.startCursor}
              endCursor={pageInfo.endCursor}
              buildUrl={buildPaginationUrl}
              getBaseUrl={getBasePageUrl}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default WholesaleShop;
