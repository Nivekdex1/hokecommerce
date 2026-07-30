import Image from "next/image";
import Link from "next/link";

export default function DiscoveredForYou() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-10 w-full md:mb-0 md:w-1/2 pl-10">
            <h1 className="font-playfair mb-6 text-4xl md:text-5xl lg:text-6xl">
              Discovered
              <br />
              For You
            </h1>
            <div>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-[#2C1500] px-8 py-3 text-white transition-colors hover:bg-[#3a1c00]"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
          <div className="relative w-full md:w-1/2">
            <div className="relative h-[400px] md:h-[500px] lg:h-[800px]">
              <Image
                src="/hero-products.png"
                alt="Korean beauty products featuring skincare items"
                fill

                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                priority
              />
              <div className="absolute -top-20 -left-32 hidden md:block">
                <Image
                  src="/flower.png"
                  alt="Decorative apple blossom"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
