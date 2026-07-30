"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useFetchAllCollections } from "@/utils/hooks/useFetchAllCollections";
import Image from "next/image";
import Link from "next/link";

export default function EnhancedCarousel() {
  const { data: collections, isLoading, error } = useFetchAllCollections();

  // Loading state with skeleton
  if (isLoading) {
    return (
      <section className="container mx-auto max-w-5xl px-4 lg:py-16">
        <div className="mb-10 text-center">
          <h1 className="font-playfair mx-auto text-center text-2xl text-stone-900 lg:max-w-80 lg:text-7xl">
            Our Collections
          </h1>
        </div>

        <div className="mx-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="mb-3 h-60 rounded-lg bg-gray-200"></div>
              <div className="mx-auto h-6 w-24 rounded-md bg-gray-200"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="mb-10 text-center">
          <h1 className="font-playfair mx-auto text-center text-2xl text-stone-900 lg:text-7xl">
            Our Collections
          </h1>
        </div>
        <div className="rounded-lg bg-red-50 p-4 text-center text-red-500">
          {error.message}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-8xl container mx-auto px-4 py-8 lg:py-16">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="font-playfair mx-auto text-center text-2xl text-stone-900 lg:text-7xl">
          Our Collections
        </h1>
        <div className="mx-auto mt-5 max-w-2xl border-b border-stone-900"></div>
      </div>

      {/* Mobile Grid View */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {collections?.slice(0, 4).map((collection) => (
          <div key={collection.id} className="mb-6">
            <Link
              href={`/shop?collections=${collection.handle}`}
              className="block"
            >
              <div className="mb-3 overflow-hidden rounded-lg">
                <div className="relative h-[180px] w-full">
                  {collection.image ? (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      fill

                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <p className="text-sm font-medium text-gray-500">
                        {collection.title}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <Button
                className="bg-[#FFFDF mt-2 w-full rounded-none border-2 border-[#484F56] py-2"
                variant="outline"
                size="sm"
              >
                <h3 className="font-montserrat text-center text-xs font-semibold uppercase">
                  {collection.title}
                </h3>
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Carousel for larger screens */}
      <div className="relative hidden md:block">
        {/* Slides container */}
        <Carousel
          className="w-full"
          opts={{
            align: "center",
            loop: true,
            slidesToScroll: 1,
            containScroll: "trimSnaps",
            dragFree: true,
          }}
        >
          <CarouselContent className="flex px-1">
            {collections?.slice(0, 4).map((collection) => (
              <CarouselItem
                key={collection.id}
                className="overflow-hidden md:basis-1/4 lg:basis-1/4"
              >
                <Link
                  href={`/shop?collections=${collection.handle}`}
                  className="block"
                >
                  <div className={cn("mb-3 overflow-hidden rounded-l")}>
                    <div className="relative h-[400px] w-full lg:h-[500px]">
                      {collection.image ? (
                        <Image
                          src={collection.image.url}
                          alt={collection.image.altText || collection.title}
                          fill

                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                          <p className="text-lg font-medium text-gray-500">
                            {collection.title}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    className="bg-[#FFFDF mt-5 w-full rounded-none border-2 border-[#484F56] py-5"
                    variant="outline"
                    size="default"
                  >
                    <h3 className="font-montserrat text-center text-sm font-semibold uppercase">
                      {collection.title}
                    </h3>
                  </Button>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
