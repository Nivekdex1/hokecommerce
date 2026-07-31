import HeroCarousel from "@/components/ui/landingPage/HeroCarousel";
import TrustBar from "@/components/ui/TrustBar";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import { getProducts, getMetaobject } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Home() {
  // Fetch best sellers (with fallback if no tag matches)
  let bestSellersData = await getProducts({
    pageSize: 4,
    searchParams: { tags: "best-seller" }
  });
  if (!bestSellersData?.products?.length) {
    bestSellersData = await getProducts({ pageSize: 4 });
  }

  // Fetch new arrivals
  let newArrivalsData = await getProducts({
    pageSize: 4,
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

  const heroConfig = await getMetaobject("hero_section", "home_hero");

  const fallbackSlides = [
    {
      id: 1,
      title: "Discover Your Glass Skin Era",
      subtitle: "Authentic, dermatologist-backed Korean skincare tailored to bring out your natural, luminous glow.",
      cta: "Shop Skincare",
      href: "/shop",
      image: "/hero-products.png",
      bgColor: "bg-hok-ivory",
    },
    {
      id: 2,
      title: "Our Best Sellers",
      subtitle: "The holy grail products everyone is talking about. Grab them before they sell out again.",
      cta: "Shop Best Sellers",
      href: "/shop?tags=best-seller",
      image: "/best-selling-img2.png",
      bgColor: "bg-hok-cream",
    },
    {
      id: 3,
      title: "Wholesale Partner Program",
      subtitle: "Grow your beauty business with genuine K-beauty products at competitive wholesale prices.",
      cta: "Join HOK Pro",
      href: "/wholesale",
      image: "/our-brand.png",
      bgColor: "bg-hok-linen",
    },
    {
      id: 4,
      title: "Targeted Solutions for Every Concern",
      subtitle: "From hyperpigmentation to acne, find the perfect active ingredients to transform your skin.",
      cta: "Shop by Concern",
      href: "/shop?collections=hyperpigmentation",
      image: "/specialist.png",
      bgColor: "bg-hok-ivory",
    }
  ];

  let slides = fallbackSlides;
  if (heroConfig && heroConfig.fields) {
    // Override the first slide if the dynamic config is present
    slides = [
      {
        id: 1,
        title: heroConfig.fields.hero_title || fallbackSlides[0].title,
        subtitle: heroConfig.fields.hero_subtitle || fallbackSlides[0].subtitle,
        cta: heroConfig.fields.hero_cta_text || fallbackSlides[0].cta,
        href: heroConfig.fields.hero_cta_link || fallbackSlides[0].href,
        image: heroConfig.fields.hero_image?.url || fallbackSlides[0].image,
        bgColor: "bg-hok-ivory",
      },
      fallbackSlides[1],
      fallbackSlides[2],
      fallbackSlides[3],
    ];
  }

  return (
    <div className="flex flex-col w-full bg-hok-linen">
      <HeroCarousel slides={slides} />
      <TrustBar />

      {/* Brand Carousel / Logos */}
      <section className="border-b border-hok-mist py-8 bg-white overflow-hidden">
        <div className="container-narrow">
          <p className="text-center text-xs text-hok-stone font-semibold tracking-widest uppercase mb-6">
            Official distributors of Nigeria's favorite brands
          </p>
          <div className="relative w-full opacity-60 overflow-hidden py-4">
            <div className="flex items-center gap-8 md:gap-12 w-max animate-marquee">
              {[...["cerave", "eucerin", "posay", "corsx", "anua", "12grabs"], ...["cerave", "eucerin", "posay", "corsx", "anua", "12grabs"], ...["cerave", "eucerin", "posay", "corsx", "anua", "12grabs"]].map((brand, idx) => (
                <div key={`${brand}-${idx}`} className="relative w-24 h-12 md:w-32 md:h-16 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300">
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
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section-padding bg-hok-linen">
        <div className="container-narrow">
          <SectionHeading title="Curated Just For You" subtitle="Shop our most popular skincare categories" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/shop?productType=cleanser" className="group relative h-[400px] overflow-hidden rounded-none block">
              <Image src="/cleaners.png" alt="Cleansers" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-hok-espresso/80 via-hok-espresso/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <h3 className="text-white font-playfair text-2xl font-medium">Cleansers</h3>
                <span className="bg-white text-hok-espresso rounded-full p-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                  <ArrowRightIcon />
                </span>
              </div>
            </Link>

            <Link href="/shop?productType=serum" className="group relative h-[400px] overflow-hidden rounded-none block">
              <Image src="/hero-products.png" alt="Serums & Treatments" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-hok-espresso/80 via-hok-espresso/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <h3 className="text-white font-playfair text-2xl font-medium">Serums</h3>
                <span className="bg-white text-hok-espresso rounded-full p-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                  <ArrowRightIcon />
                </span>
              </div>
            </Link>

            <Link href="/shop?productType=moisturizer" className="group relative h-[400px] overflow-hidden rounded-none block">
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
      <section className="dark-section py-20 md:py-32 bg-hok-espresso text-white relative overflow-hidden">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="group order-2 md:order-1 relative h-[500px] w-full rounded-t-full overflow-hidden border-4 border-hok-champagne/20">
              <Image src="/lizare-image-2.png" alt="Glass skin model" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-playfair text-4xl md:text-5xl font-semibold mb-6 text-white">
                Why Choose <span className="text-hok-champagne italic">HOK Beauty?</span>
              </h2>
              <p className="font-manrope text-lg text-hok-mist mb-10 font-light leading-relaxed">
                We believe in authentic, dermatologist-backed skincare that brings out your natural glow. No counterfeits, no shortcuts.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 bg-hok-walnut/50 p-2 rounded-full h-fit">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="font-playfair text-xl font-medium mb-1 text-white">Sourced Directly from Korea</h4>
                    <p className="text-hok-mist text-sm leading-relaxed">We partner with official distributors to guarantee 100% authenticity for every product.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 bg-hok-walnut/50 p-2 rounded-full h-fit">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="font-playfair text-xl font-medium mb-1 text-white">Nigeria's #1 K-Beauty Store</h4>
                    <p className="text-hok-mist text-sm leading-relaxed">Trusted by thousands of beauty lovers nationwide for fast, reliable delivery.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 bg-hok-walnut/50 p-2 rounded-full h-fit">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="font-playfair text-xl font-medium mb-1 text-white">Expert Guidance</h4>
                    <p className="text-hok-mist text-sm leading-relaxed">Our personalized skin algorithm helps you find the perfect routine for your skin type.</p>
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
      <section className="relative py-20 lg:py-28 bg-hok-ivory border-y border-hok-mist overflow-hidden flex items-center justify-center min-h-[450px] lg:min-h-[500px]">

        {/* Left Subject Image (Absolute, Full Height, Far Left) */}
        <div className="absolute left-0 bottom-0 top-0 w-[45%] md:w-[35%] lg:w-[28%] pointer-events-none z-0 opacity-40 sm:opacity-100">
          <Image
            src="/co-founder-1.png"
            alt="Personalized Skincare Consultation"
            fill
            className="object-contain object-left-bottom"
            sizes="(max-width: 768px) 45vw, 28vw"
          />
        </div>

        {/* Right Subject Image (Absolute, Full Height, Far Right) */}
        <div className="absolute right-0 bottom-0 top-0 w-[45%] md:w-[35%] lg:w-[28%] pointer-events-none z-0 opacity-40 sm:opacity-100">
          <Image
            src="/co-founder-2.png"
            alt="K-Beauty Skincare Specialist"
            fill
            className="object-contain object-right-bottom"
            sizes="(max-width: 768px) 45vw, 28vw"
          />
        </div>

        {/* Center Text Content */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <span className="text-hok-champagne font-semibold tracking-widest uppercase mb-4 text-xs sm:text-sm block">
            Take the guesswork out
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-hok-espresso font-semibold mb-6 leading-[1.1] text-balance">
            Not sure where to start? Find your perfect routine.
          </h2>
          <p className="font-manrope text-hok-stone text-base sm:text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed text-balance">
            Take our 2-minute personalized skin algorithm quiz to get expert recommendations tailored to your unique skin type and concerns.
          </p>
          <Button asChild className="btn-shimmer bg-hok-walnut hover:bg-hok-espresso text-white rounded-none px-12 py-7 text-lg font-semibold tracking-wide transition-all duration-300 active:scale-95 shadow-xl mt-2">
            <Link href="/skin-algorithm" className="flex items-center gap-3">
              <span>Start the Skin Quiz</span>
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
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

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
      <path d="M5 3v4"></path>
      <path d="M19 17v4"></path>
      <path d="M3 5h4"></path>
      <path d="M17 19h4"></path>
    </svg>
  );
}
