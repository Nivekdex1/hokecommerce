import Filters from "@/components/shop/filters";
import Pagination from "@/components/ui/pagination";
import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";
import { getProducts, getMetaobject } from "@/lib/shopify";
import BrandBannerCarousel from "@/components/ui/BrandBannerCarousel";
import ProductCard from "@/components/ui/ProductCard";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(
  props: { searchParams?: Promise<ShopPageSearchParams> }
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  let title = "Shop Skincare";
  
  if (searchParams?.collections) {
    const col = Array.isArray(searchParams.collections) ? searchParams.collections[0] : searchParams.collections;
    title = col.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  } else if (searchParams?.category) {
    const cat = Array.isArray(searchParams.category) ? searchParams.category[0] : searchParams.category;
    title = cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  } else if (searchParams?.vendors) {
    const vendor = Array.isArray(searchParams.vendors) ? searchParams.vendors[0] : searchParams.vendors;
    title = vendor.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  } else if (searchParams?.tags) {
    const tag = Array.isArray(searchParams.tags) ? searchParams.tags[0] : searchParams.tags;
    if (tag === 'new') title = 'New Arrivals';
    else if (tag === 'best-seller') title = 'Best Sellers';
  }

  return {
    title,
    description: "Browse our complete collection of authentic Korean skincare products.",
  };
}

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

export default async function ShopPage(props: {
  searchParams?: Promise<ShopPageSearchParams>;
}) {
  const searchParams = await props.searchParams;
  
  let pageTitle = "Shop Skincare";
  let pageDescription = "Authentic K-beauty essentials for every skin concern. Sourced directly from Korea for your perfect glow.";

  if (searchParams?.collections) {
    const col = Array.isArray(searchParams.collections) ? searchParams.collections[0] : searchParams.collections;
    pageTitle = col.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    pageDescription = `Shop our ${pageTitle} collection for your specific skin concerns.`;
  } else if (searchParams?.category) {
    const cat = Array.isArray(searchParams.category) ? searchParams.category[0] : searchParams.category;
    pageTitle = cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    pageDescription = `Browse our complete selection of authentic Korean ${pageTitle.toLowerCase()}.`;
  } else if (searchParams?.vendors) {
    const vendor = Array.isArray(searchParams.vendors) ? searchParams.vendors[0] : searchParams.vendors;
    pageTitle = vendor.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    pageDescription = `Discover the complete collection from ${pageTitle}.`;
  } else if (searchParams?.tags) {
    const tag = Array.isArray(searchParams.tags) ? searchParams.tags[0] : searchParams.tags;
    if (tag === 'new') {
       pageTitle = 'New Arrivals';
       pageDescription = 'Discover the latest Korean skincare products that just landed.';
    } else if (tag === 'best-seller') {
       pageTitle = 'Best Sellers';
       pageDescription = 'Shop our most loved and highly rated K-beauty essentials.';
    }
  }
  const pageSize = 20;

  const { products, pageInfo } = await getProducts({
    searchParams,
    pageSize,
  });

  let brandBanners: any[] = [];
  if (searchParams?.vendors) {
    const vendorHandle = Array.isArray(searchParams.vendors) ? searchParams.vendors[0] : searchParams.vendors;
    const bannerData = await getMetaobject("brand_banner", vendorHandle);
    if (bannerData && bannerData.fields.banners) {
      brandBanners = bannerData.fields.banners;
    }
  }

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
    return `/shop?${params.toString()}`;
  };

  const mapProduct = (p: any) => ({
    id: p.id,
    title: p.title,
    handle: p.handle,
    price: p.price,
    currencyCode: p.currencyCode || "NGN",
    image: p.featuredImage?.url || "/placeholder.jpg",
    vendor: p.vendor,
  });

  return (
    <div className="bg-hok-linen min-h-screen">
      <div className="bg-hok-ivory border-b border-hok-mist py-10 md:py-16">
        <div className="container-narrow">
          <h1 className="font-playfair text-4xl md:text-5xl text-hok-espresso font-semibold mb-4">{pageTitle}</h1>
          <p className="font-manrope text-hok-stone text-lg max-w-2xl">{pageDescription}</p>
        </div>
      </div>
      
      <div className="container-narrow py-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <div className="w-full md:w-1/4">
            <Filters />
          </div>
          <div className="w-full md:w-3/4">
            {brandBanners.length > 0 && <BrandBannerCarousel banners={brandBanners} />}
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
