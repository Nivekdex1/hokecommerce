import { getProduct, getProducts } from "@/lib/shopify";
import { Products } from "@/lib/shopify/types";
import { Suspense } from "react";
import ProductClient from "./product-client";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.substring(0, 160),
      images: product.images?.[0] ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-playfair text-3xl text-hok-espresso">Product Not Found</h1>
      </div>
    );
  }

  let relatedProducts: Products[] = [];
  try {
    const { products: allProducts } = await getProducts({ pageSize: 5 });
    relatedProducts = allProducts
      .filter((p: Products) => p.handle !== params.handle)
      .slice(0, 4);
  } catch (e) {
    console.error("Failed to fetch related products", e);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images?.[0]?.url,
    description: product.description,
    offers: {
      "@type": "Offer",
      url: `https://homeofkoreanbeauty.com/shop/${product.handle}`,
      priceCurrency: product.currencyCode || "NGN",
      price: product.price,
      availability: product.availableForSale 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<ProductSkeleton />}>
        <ProductClient
          initialProduct={product}
          initialRelatedProducts={relatedProducts}
        />
      </Suspense>
    </>
  );
}

function ProductSkeleton() {
  return (
    <div className="container-narrow py-12">
      <div className="animate-pulse">
        <div className="mb-6 h-4 w-1/4 rounded bg-hok-mist"></div>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 aspect-square rounded-md bg-hok-mist"></div>
          <div className="w-full md:w-1/2 space-y-6">
            <div className="h-4 w-1/4 rounded bg-hok-mist"></div>
            <div className="h-10 w-3/4 rounded bg-hok-mist"></div>
            <div className="h-6 w-1/4 rounded bg-hok-mist"></div>
            <div className="space-y-3 pt-6">
              <div className="h-4 w-full rounded bg-hok-mist"></div>
              <div className="h-4 w-full rounded bg-hok-mist"></div>
              <div className="h-4 w-3/4 rounded bg-hok-mist"></div>
            </div>
            <div className="mt-8 h-14 w-full rounded bg-hok-mist"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
