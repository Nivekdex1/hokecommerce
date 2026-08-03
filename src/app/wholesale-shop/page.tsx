import Filters from "@/components/shop/filters";
import Pagination from "@/components/ui/pagination";
import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";
import { getProducts } from "@/lib/shopify";
import ProductCard from "@/components/ui/ProductCard";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Wholesale Shop",
  description: "Browse our complete collection of authentic Korean skincare products at wholesale prices.",
};

interface ShopPageSearchParams {
  minPrice?: string;
  maxPrice?: string;
  collections?: string | string[];
  vendors?: string | string[];
  productType?: string | string[];
  tags?: string | string[];
  category?: string | string[];
  after?: string;
  before?: string;
}

export default async function WholesaleShopPage(props: {
  searchParams?: Promise<ShopPageSearchParams>;
}) {
  const searchParams = await props.searchParams;
  const pageSize = 20;

  const { products, pageInfo } = await getProducts({
    searchParams,
    pageSize,
  });

  const buildPaginationUrl = (
    cursor: string,
    type: "before" | "after",
  ): string => {
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

    params.set(type, cursor);
    return `/wholesale-shop?${params.toString()}`;
  };

  const mapProduct = (p: any) => ({
    id: p.id,
    title: p.title,
    handle: p.handle,
    price: p.price,
    currencyCode: p.currencyCode || "NGN",
    image: p.featuredImage?.url || "/placeholder.jpg",
    vendor: p.vendor,
    availableForSale: p.availableForSale,
  });

  return (
    <div className="bg-hok-linen min-h-screen">
      <div className="bg-hok-ivory border-b border-hok-mist py-10 md:py-16">
        <div className="container-narrow">
          <div className="inline-block bg-hok-espresso text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm mb-4">HOK Pro</div>
          <h1 className="font-playfair text-4xl md:text-5xl text-hok-espresso font-semibold mb-4">Wholesale Shop</h1>
          <p className="font-manrope text-hok-stone text-lg max-w-2xl">Access our exclusive B2B pricing and bulk order options for your beauty business.</p>
        </div>
      </div>
      
      <div className="container-narrow py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <div className="w-full md:w-1/4">
            <Filters />
          </div>
          <div className="w-full md:w-3/4">
            <Suspense fallback={<ProductGridSkeleton />}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                {products && products.length > 0 ? (
                  products.map((product: any) => (
                    <ProductCard key={product.id} product={mapProduct(product)} />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-hok-stone bg-white rounded-md border border-hok-mist">
                    <p className="text-xl font-playfair mb-2">No products found</p>
                    <p className="text-sm">Try adjusting your filters or search criteria.</p>
                  </div>
                )}
              </div>

              {pageInfo && (pageInfo.hasNextPage || pageInfo.hasPreviousPage) && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    hasNextPage={pageInfo.hasNextPage}
                    hasPreviousPage={pageInfo.hasPreviousPage}
                    nextUrl={pageInfo.hasNextPage ? buildPaginationUrl(pageInfo.endCursor!, "after") : undefined}
                    previousUrl={pageInfo.hasPreviousPage ? buildPaginationUrl(pageInfo.startCursor!, "before") : undefined}
                  />
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
