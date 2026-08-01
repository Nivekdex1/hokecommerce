"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface BannerImage {
  url: string;
  altText: string;
}

export default function BrandBannerCarousel({ banners }: { banners: BannerImage[] }) {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  if (!banners || banners.length === 0) return null;

  return (
    <div className="w-full relative mb-12">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="-ml-0">
          {banners.map((banner, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative w-full aspect-[21/9] md:aspect-[32/9] lg:aspect-[4/1] bg-hok-linen overflow-hidden">
                <Image
                  src={banner.url}
                  alt={banner.altText || `Brand banner ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {banners.length > 1 && (
          <>
            <CarouselPrevious className="left-4 bg-white/50 hover:bg-white border-none text-hok-espresso" />
            <CarouselNext className="right-4 bg-white/50 hover:bg-white border-none text-hok-espresso" />
          </>
        )}
      </Carousel>
    </div>
  );
}
