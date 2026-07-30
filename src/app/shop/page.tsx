import Filters from "@/components/shop/filters";
import Pagination from "@/components/ui/pagination";
import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";
import { getProducts } from "@/lib/shopify";
import { Products } from "@/lib/shopify/types";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

// Updated search params interface
interface ShopPageSearchParams {
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

export default async function ShopPage(props: {
  searchParams?: Promise<ShopPageSearchParams>;
}) {
  const searchParams = await props.searchParams;
  // No need to extract cursor here, getProducts handles searchParams directly
  const pageSize = 20;

  // Get products with pagination (getProducts now reads after/before from searchParams)
  const { products, pageInfo } = await getProducts({
    searchParams,
    pageSize,
  });

  // Build URLs for pagination, preserving existing search params
  // It now generates ?before=... or ?after=...
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

    return `/shop?${params.toString()}`;
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
    return paramString ? `/shop?${paramString}` : "/shop";
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
                    href={`/shop/${product.handle}`}
                    className="group"
                  >
                    <div className="rounded border border-[#2D1801]/20 p-4 transition-shadow duration-200 group-hover:shadow-md">
                      {product.featuredImage && (
                        <Image
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          width={product.featuredImage.width}
                          height={product.featuredImage.height}
                          className="mb-2 h-48 w-full object-cover"
                        />
                      )}
                      <h3 className="font-montserrat font-semibold">
                        {product.title}
                      </h3>
                      <p className="font-montserrat font-medium text-gray-700">
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
            {/* Pass correct props and adjusted buildUrl */}
            <Pagination
              hasNextPage={pageInfo.hasNextPage}
              hasPreviousPage={pageInfo.hasPreviousPage}
              startCursor={pageInfo.startCursor}
              endCursor={pageInfo.endCursor}
              buildUrl={buildPaginationUrl}
              getBaseUrl={getBasePageUrl} // Pass function to get base URL
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
