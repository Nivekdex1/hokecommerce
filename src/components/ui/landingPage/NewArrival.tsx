"use client";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/shopify";
import { Products } from "@/lib/shopify/types";
import { formatPrice } from "@/utils/formatPrice";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const NewArrival = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featuredProducts", "anua"],
    queryFn: async () => {
      const { products: fetchedProducts } = await getProducts({
        pageSize: 4,
        searchParams: {
          vendors: "anua",
        },
      });
      return fetchedProducts;
    },
  });
  return (
    <section className="">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="font-playfair mx-auto text-center text-2xl text-stone-900 lg:text-7xl">
            New Arrivals
          </h1>
          <div className="mx-auto mt-5 max-w-2xl border-b border-stone-900"></div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-md bg-white p-4 shadow"
              >
                <div className="mb-4 h-60 w-full rounded-md bg-gray-200"></div>
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
                <div className="h-5 w-1/4 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products?.map((product: Products) => (
              <Link
                key={product.id}
                href={`/shop/${product.handle}`}
                className="font-montserrat rounded-md border border-stone-900/30 bg-white p-4 hover:shadow-lg"
              >
                {product?.featuredImage && (
                  <div className="relative mb-4 h-[200px] overflow-hidden rounded lg:h-[400px]">
                    <Image
                      src={product?.featuredImage.url}
                      alt={product?.featuredImage.altText || product.title}
                      fill

                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="mb-1 text-lg font-medium">{product.title}</h3>
                <Image src="/stars.png" alt="stars" width={100} height={100} />
                <p className="text-lg font-bold">
                  {formatPrice(product.price, {
                    currencyCode: product.currencyCode,
                  })}
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center lg:mt-24">
          <Button
            asChild
            className="bg-[#FFFDF mt-5 w-fit rounded border-2 border-[#484F56] py-5"
            variant="outline"
            size="default"
          >
            <Link href="/shop">View More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
