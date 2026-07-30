"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ProductCategories() {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Cleansers Category */}
          <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#eaeaea]">
            <div className="flex h-full flex-col items-center">
              <div className="relative h-[400px] w-full overflow-hidden">
                <Image
                  src="/cleaners.png"
                  alt="COSRX Low pH Good Morning Gel Cleanser"
                  fill

                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
              <div className="absolute right-6 bottom-6 z-10 flex w-[161px] flex-col items-end rounded-lg bg-black/30 py-3 pr-3">
                <div className="mb-3">
                  <h3 className="font-montserrat text-2xl font-medium text-white">
                    Cleansers
                  </h3>
                </div>
                <Link href="/shop?category=cleansers">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded border-2 border-black bg-[#FAF2E7] text-xs hover:bg-gray-100"
                  >
                    SHOP NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Toner Category */}
          <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#eaeaea]">
            <div className="flex h-full flex-col items-center">
              <div className="relative h-[400px] w-full overflow-hidden">
                <Image
                  src="/toner.jpeg"
                  alt="COSRX Low pH Good Morning Gel Cleanser"
                  fill

                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
              <div className="absolute right-6 bottom-6 z-10 flex w-[161px] flex-col items-end rounded-lg bg-black/30 py-3 pr-3">
                <div className="mb-3">
                  <h3 className="font-montserrat text-2xl font-medium text-white">
                    Toner
                  </h3>
                </div>
                <Link href="/shop?category=toner">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded border-2 border-black bg-[#FAF2E7] text-xs hover:bg-gray-100"
                  >
                    SHOP NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
