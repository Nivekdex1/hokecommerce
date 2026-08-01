import HeroCarousel from "@/components/ui/landingPage/HeroCarousel";
import TrustBar from "@/components/ui/TrustBar";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/ui/ProductCard";
import { getProducts, getMetaobject } from "@/lib/shopify";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
    <div className="flex flex-col w-full bg-white -mt-[100px]">
      <HeroCarousel slides={slides} />

      {/* Trust Bar + Brand Carousel */}
      <TrustBar />
      <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-[14px] text-hok-stone font-outfit font-medium tracking-[0.25em] uppercase mb-10">
            Official distributors of Nigeria&apos;s favorite brands
          </p>
          <div className="relative w-full overflow-hidden py-2">
            <div className="flex items-center gap-12 md:gap-20 w-max animate-marquee opacity-60 hover:opacity-80 transition-opacity duration-500">
              {[...["cerave", "corsx", "eucerin", "anua", "posay", "12grabs"], ...["cerave", "corsx", "eucerin", "anua", "posay", "12grabs"], ...["cerave", "corsx", "eucerin", "anua", "posay", "12grabs"]].map((brand, idx) => (
                <div key={`${brand}-${idx}`} className="relative w-24 h-12 md:w-32 md:h-14 flex-shrink-0 transition-all duration-500 hover:scale-105">
                  <Image
                    src={`/${brand}.png`}
                    alt={`${brand} logo`}
                    fill
                    sizes="(max-width: 768px) 96px, 128px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 md:py-28 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading title="Curated Just For You" subtitle="Featured Categories" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[
              { href: "/shop?productType=cleanser", image: "/cleaners.png", label: "Cleansers" },
              { href: "/shop?productType=serum", image: "/hero-products.png", label: "Serums" },
              { href: "/shop?productType=moisturizer", image: "/specialist.png", label: "Moisturizers" },
            ].map((cat) => (
              <Link key={cat.label} href={cat.href} className="group relative h-[500px] overflow-hidden block bg-white transition-all duration-700 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)]">
                <div className="absolute inset-0 overflow-hidden">
                  <Image src={cat.image} alt={cat.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start">
                  <h3 className="text-hok-espresso font-fondamento text-2xl md:text-3xl font-normal mb-2">{cat.label}</h3>
                  <span className="text-hok-champagne font-outfit text-[10px] tracking-[0.25em] uppercase flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    Shop Now <ArrowRightIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading title="Best Sellers" subtitle="Most Popular" ctaText="Shop All" ctaHref="/shop?tags=best-seller" align="left" />

          <ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
              {bestSellers.length > 0 ? (
                bestSellers.map((product: any) => (
                  <ProductCard key={product.id} product={product} badge="BEST SELLER" />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-hok-stone">
                  No best sellers available.
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why HOK Value Proposition */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal className="relative">
              {/* Soft Gradient Glow behind the oval */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E6E1DC]/60 via-hok-champagne/20 to-white blur-3xl -z-10 rounded-full scale-[1.1] md:scale-[1.2]" />
              <div className="group order-2 md:order-1 relative h-[600px] w-[85%] mx-auto overflow-hidden rounded-[150px] md:rounded-[250px] transition-transform duration-[1500ms] hover:scale-[1.02]">
                <div className="relative h-full w-full overflow-hidden">
                  <Image src="/lizare-image-2.png" alt="Glass skin model" fill className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale-[10%]" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="order-1 md:order-2">
              <span className="text-hok-champagne font-outfit uppercase tracking-[0.2em] text-xs mb-4 block">
                Our Commitment
              </span>
              <h2 className="font-fondamento text-4xl md:text-5xl lg:text-6xl font-normal mb-8 text-hok-espresso leading-tight">
                Why Choose <br /><span className="text-hok-champagne">HOK Beauty?</span>
              </h2>
              <p className="font-outfit text-lg text-hok-stone mb-12 font-light leading-relaxed">
                We believe in authentic, dermatologist-backed skincare that brings out your natural glow. No counterfeits, no shortcuts. Just pure, proven formulas.
              </p>

              <div className="space-y-10">
                <div className="flex gap-6 group cursor-default">
                  <div className="mt-1 text-hok-champagne transition-transform duration-300 group-hover:scale-110">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="font-outfit text-xl font-normal mb-2 text-hok-charcoal">Sourced Directly from Korea 🇰🇷</h4>
                    <p className="text-hok-stone text-sm leading-relaxed font-light">We partner with official distributors to guarantee 100% authenticity for every product.</p>
                  </div>
                </div>

                <div className="flex gap-6 group cursor-default">
                  <div className="mt-1 text-hok-champagne transition-transform duration-300 group-hover:scale-110">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="font-outfit text-xl font-normal mb-2 text-hok-charcoal">Nigeria's Premier K-Beauty Destination</h4>
                    <p className="text-hok-stone text-sm leading-relaxed font-light">Trusted by thousands of beauty connoisseurs nationwide for reliable delivery.</p>
                  </div>
                </div>

                <div className="flex gap-6 group cursor-default">
                  <div className="mt-1 text-hok-champagne transition-transform duration-300 group-hover:scale-110">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="font-outfit text-xl font-normal mb-2 text-hok-charcoal">Curated Expert Guidance</h4>
                    <p className="text-hok-stone text-sm leading-relaxed font-light">Our personalized skin algorithm helps you find the perfect routine for your skin type.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 md:py-28 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading title="New Arrivals" subtitle="Just Landed" ctaText="Discover More" ctaHref="/shop?tags=new" align="left" />

          <ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
              {newArrivals.length > 0 ? (
                newArrivals.map((product: any) => (
                  <ProductCard key={product.id} product={product} badge="NEW" />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-hok-stone">
                  No new arrivals available.
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Skin Quiz CTA */}
      <section className="relative py-28 lg:py-36 bg-[#FAFAF8] overflow-hidden flex items-center justify-center min-h-[550px]">
        {/* Soft Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-hok-champagne/4 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hok-mist/30 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Left Subject Image */}
        <div className="absolute left-0 bottom-0 top-0 w-[45%] md:w-[35%] lg:w-[25%] pointer-events-none z-0 opacity-20 sm:opacity-40 transition-opacity duration-700 hover:opacity-60">
          <Image
            src="/co-founder-1.png"
            alt="Personalized Skincare Consultation"
            fill
            className="object-contain object-left-bottom grayscale-[50%]"
            sizes="(max-width: 768px) 45vw, 25vw"
          />
        </div>

        {/* Right Subject Image */}
        <div className="absolute right-0 bottom-0 top-0 w-[45%] md:w-[35%] lg:w-[25%] pointer-events-none z-0 opacity-20 sm:opacity-40 transition-opacity duration-700 hover:opacity-60">
          <Image
            src="/co-founder-2.png"
            alt="K-Beauty Skincare Specialist"
            fill
            className="object-contain object-right-bottom grayscale-[50%]"
            sizes="(max-width: 768px) 45vw, 25vw"
          />
        </div>

        {/* Center Text Content */}
        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm p-12 rounded-2xl border border-hok-mist/20 shadow-2xl">
          <span className="text-hok-champagne font-outfit font-medium tracking-[0.2em] uppercase mb-6 text-xs sm:text-sm block">
            Bespoke Skincare
          </span>
          <h2 className="font-fondamento text-4xl sm:text-5xl md:text-6xl text-hok-espresso font-normal mb-6 leading-[1.1] text-balance">
            Discover Your Perfect Routine.
          </h2>
          <p className="font-outfit text-hok-stone text-base sm:text-lg mb-10 max-w-lg mx-auto font-light leading-relaxed text-balance">
            Take our 2-minute personalized skin algorithm quiz to receive expert, tailored recommendations for your unique skin type.
          </p>
          <Link
            href="/skin-algorithm"
            className="inline-flex items-center gap-4 group/btn"
          >
            <span className="font-outfit font-medium text-sm tracking-[0.2em] uppercase text-hok-espresso border-b border-hok-champagne pb-1 transition-colors hover:text-hok-champagne">
              Start The Quiz
            </span>
            <div className="w-12 h-12 rounded-full border border-hok-champagne/30 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-hok-champagne group-hover/btn:text-white group-hover/btn:border-hok-champagne group-hover/btn:shadow-lg">
              <ArrowRightIcon />
            </div>
          </Link>
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
