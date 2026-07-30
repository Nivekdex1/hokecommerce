import HeroCarousel from "@/components/ui/landingPage/HeroCarousel";
import TrustBar from "@/components/ui/TrustBar";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import { getProducts } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Newsletter from "@/components/ui/landingPage/Newsletter";

export default async function Home() {
  // Fetch best sellers 
  const bestSellersData = await getProducts({
    pageSize: 4,
    // Assuming tags feature is used for best-sellers, otherwise this fetches 4 random
    searchParams: { tags: "best-seller" } 
  });

  // Fetch new arrivals
  const newArrivalsData = await getProducts({
    pageSize: 4,
    // searchParams: { tags: "new" } 
  });

  // Helper to map Shopify product to ProductCard props
  const mapProduct = (p: any) => ({
    id: p.id,
    title: p.title,
    handle: p.handle,
    price: p.price,
    currencyCode: p.currencyCode || "NGN",
    image: p.featuredImage?.url || "/placeholder.jpg",
    vendor: p.vendor || "K-Beauty",
  });

  const bestSellers = bestSellersData?.products?.map(mapProduct) || [];
  const newArrivals = newArrivalsData?.products?.map(mapProduct) || [];

  return (
    <div className="flex flex-col w-full bg-hok-linen">
      <HeroCarousel />
      <TrustBar />

      {/* Brand Carousel / Logos */}
      <section className="border-b border-hok-mist py-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs text-hok-stone font-semibold tracking-widest uppercase mb-6">
            Official distributors of Nigeria's favorite brands
          </p>
          <div className="flex justify-between items-center gap-8 md:gap-12 opacity-60 overflow-x-auto hide-scrollbar">
            {["cerave", "eucerin", "posay", "cosrx", "anua", "12grabs"].map((brand) => (
              <div key={brand} className="relative w-24 h-12 md:w-32 md:h-16 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={`/${brand}.jpg`}
                  alt={`${brand} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section-padding bg-hok-linen">
        <div className="container-narrow">
          <SectionHeading title="Curated for You" subtitle="Shop our most popular skincare categories" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/shop?productType=cleanser" className="group relative h-[400px] overflow-hidden rounded-md block">
              <Image src="/cleaners.png" alt="Cleansers" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-hok-espresso/80 via-hok-espresso/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <h3 className="text-white font-playfair text-2xl font-medium">Cleansers</h3>
                <span className="bg-white text-hok-espresso rounded-full p-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                  <ArrowRightIcon />
                </span>
              </div>
            </Link>
            
            <Link href="/shop?productType=serum" className="group relative h-[400px] overflow-hidden rounded-md block">
              <Image src="/hero-products.png" alt="Serums & Treatments" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-hok-espresso/80 via-hok-espresso/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <h3 className="text-white font-playfair text-2xl font-medium">Serums</h3>
                <span className="bg-white text-hok-espresso rounded-full p-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                  <ArrowRightIcon />
                </span>
              </div>
            </Link>

            <Link href="/shop?productType=moisturizer" className="group relative h-[400px] overflow-hidden rounded-md block">
              <Image src="/specialist.png" alt="Moisturizers" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-hok-espresso/80 via-hok-espresso/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <h3 className="text-white font-playfair text-2xl font-medium">Moisturizers</h3>
                <span className="bg-white text-hok-espresso rounded-full p-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                  <ArrowRightIcon />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <SectionHeading title="Best Sellers" subtitle="The holy grail products everyone is talking about" ctaText="Shop All" ctaHref="/shop?tags=best-seller" align="left" />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.length > 0 ? (
              bestSellers.map((product: any) => (
                <ProductCard key={product.id} product={product} badge="BEST SELLER" />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-hok-stone">
                Loading products...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why HOK Value Proposition */}
      <section className="py-20 md:py-32 bg-hok-espresso text-white relative overflow-hidden">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="group order-2 md:order-1 relative h-[500px] w-full rounded-t-full overflow-hidden border-4 border-hok-champagne/20">
              <Image src="/lizare-image-2.png" alt="Glass skin model" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-playfair text-4xl md:text-5xl font-semibold mb-6">
                Why Choose <span className="text-hok-champagne italic">HOK Beauty?</span>
              </h2>
              <p className="font-manrope text-lg text-hok-mist/80 mb-10 font-light">
                We believe in authentic, dermatologist-backed skincare that brings out your natural glow. No counterfeits, no shortcuts.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 bg-hok-walnut/50 p-2 rounded-full h-fit">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="font-playfair text-xl font-medium mb-1 text-hok-ivory">Sourced Directly from Korea</h4>
                    <p className="text-hok-mist/70 text-sm">We partner with official distributors to guarantee 100% authenticity for every product.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 bg-hok-walnut/50 p-2 rounded-full h-fit">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="font-playfair text-xl font-medium mb-1 text-hok-ivory">Nigeria's #1 K-Beauty Store</h4>
                    <p className="text-hok-mist/70 text-sm">Trusted by thousands of beauty lovers nationwide for fast, reliable delivery.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 bg-hok-walnut/50 p-2 rounded-full h-fit">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="font-playfair text-xl font-medium mb-1 text-hok-ivory">Expert Guidance</h4>
                    <p className="text-hok-mist/70 text-sm">Our personalized skin algorithm helps you find the perfect routine for your skin type.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-padding bg-hok-linen">
        <div className="container-narrow">
          <SectionHeading title="New Arrivals" subtitle="Fresh from Seoul, just landed" ctaText="Discover More" ctaHref="/shop?tags=new" align="left" />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.length > 0 ? (
              newArrivals.map((product: any) => (
                <ProductCard key={product.id} product={product} badge="NEW" />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-hok-stone">
                Loading products...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skin Quiz CTA */}
      <section className="relative py-24 md:py-32 bg-hok-ivory border-y border-hok-mist overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none hidden md:block">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
             <path fill="#D4A853" d="M42.7,-73.4C55.9,-67.9,67.6,-57.3,76.5,-44.5C85.3,-31.6,91.3,-15.8,91.1,-0.1C90.9,15.6,84.4,31.2,74.7,43.5C65,55.8,52.2,64.8,38.3,71.5C24.4,78.2,9.4,82.5,-5.2,85.5C-19.8,88.5,-34.1,90.2,-46.8,84.3C-59.5,78.4,-70.6,64.8,-78.9,50C-87.3,35.1,-93,17.5,-93,0C-93,-17.5,-87.3,-35.1,-78.9,-50C-70.6,-64.8,-59.5,-78.4,-46.8,-84.3C-34.1,-90.2,-19.8,-88.5,-5.2,-85.5C9.4,-82.5,24.4,-78.2,38.3,-71.5C52.2,-64.8,65,-55.8,74.7,-43.5C84.4,-31.2,90.9,-15.6,91.1,-0.1C91.3,-15.8,85.3,-31.6,76.5,-44.5C67.6,-57.3,55.9,-67.9,42.7,-73.4Z" transform="translate(100 100) scale(1.1)" />
           </svg>
        </div>
        <div className="container-narrow text-center relative z-10">
          <span className="text-hok-champagne font-semibold tracking-widest uppercase mb-4 block">Take the guesswork out</span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-hok-espresso font-semibold mb-6 max-w-3xl mx-auto leading-tight">
            Not sure where to start? Find your perfect routine.
          </h2>
          <p className="font-manrope text-hok-stone text-lg mb-10 max-w-xl mx-auto">
            Take our 2-minute personalized skin algorithm quiz to get expert recommendations tailored to your unique skin type and concerns.
          </p>
          <Button asChild className="bg-hok-espresso hover:bg-hok-walnut text-white rounded-none px-10 py-7 text-lg font-semibold tracking-wide">
            <Link href="/skin-algorithm">
              Start the Skin Quiz
            </Link>
          </Button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-hok-cream">
        <Newsletter />
      </section>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
