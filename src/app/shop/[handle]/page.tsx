import { getProduct, getProducts } from "@/lib/shopify";
import { Products } from "@/lib/shopify/types";
import { Suspense } from "react";
import ProductClient from "./product-client";

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  // Fetch initial data on the server
  const product = await getProduct(params.handle);

  // Fetch related products
  let relatedProducts: Products[] = [];
  if (product) {
    const { products: allProducts } = await getProducts();
    relatedProducts = allProducts
      .filter((p: Products) => p.handle !== params.handle)
      .slice(0, 4);
  }

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductClient
        initialProduct={product}
        initialRelatedProducts={relatedProducts}
      />
    </Suspense>
  );
}

function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="mb-8 h-6 w-1/4 rounded bg-gray-200"></div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="aspect-square rounded-md bg-gray-200"></div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded bg-gray-200"></div>
            <div className="h-6 w-1/4 rounded bg-gray-200"></div>
            <div className="h-4 w-full rounded bg-gray-200"></div>
            <div className="h-4 w-full rounded bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="mt-8 h-10 w-1/2 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
