import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - The House of Korean Beauty",
  description: "Nigeria's #1 destination for trusted, dermatologist-backed K-Beauty innovation.",
};

export default function About() {
  return (
    <main className="bg-hok-ivory min-h-screen text-hok-espresso">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-40 border-b border-hok-mist bg-white">
        <div className="container-narrow px-6">
          <h1 className="text-[11px] font-bold tracking-[0.5em] uppercase text-hok-stone mb-10 text-center lg:text-left">
            Established 2024 — Lagos, Nigeria
          </h1>
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <h2 className="text-6xl lg:text-[120px] font-light tracking-tighter leading-[0.85] text-hok-espresso">
              The House of <br/>
              <span className="text-hok-caramel italic">Korean Beauty.</span>
            </h2>
            <p className="max-w-[280px] text-[12px] leading-relaxed uppercase tracking-widest text-hok-stone font-medium pb-4 border-b border-hok-mist">
              Nigeria’s #1 destination for trusted, dermatologist-backed K-Beauty innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Our Origin */}
      <section id="story" className="py-24 lg:py-40 bg-white">
        <div className="container-narrow px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 sticky top-32">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-hok-espresso mb-6 block">Our Origin</span>
            <h3 className="text-4xl font-playfair leading-tight text-hok-espresso mb-8">
              Why Home of <br/>Korean Beauty?
            </h3>
            <div className="w-12 h-px bg-hok-mist mb-8"></div>
          </div>
          
          <div className="lg:col-span-8">
            <div className="max-w-3xl">
              <p className="text-xl lg:text-2xl leading-relaxed font-light text-hok-espresso mb-12 font-manrope">
                At Home of Korean Beauty (HOK), skincare isn't just a routine—it's a journey to confidence, radiance, and self-care. We saw a growing need for authentic, high-quality Korean skincare in Nigeria, but finding the right products was a challenge.
              </p>
              <div className="space-y-8 text-hok-stone leading-loose font-light font-manrope">
                <p>
                  Too many beauty lovers struggled with counterfeit products, lack of expert guidance, and skincare that wasn't tailored to our climate. That's why we created HOK—to be Nigeria's #1 destination for trusted K-beauty, offering only genuine, dermatologist-backed skincare that works for all skin types and concerns.
                </p>
                <p>
                  From hydrating essentials to targeted treatments for acne, hyperpigmentation, and aging, we bring the best of Korean innovation straight to you. We believe that everyone deserves access to skincare that is both effective and safe.
                </p>
              </div>
              
              <div className="mt-20 grid grid-cols-2 gap-px bg-hok-mist border border-hok-mist">
                <div className="aspect-square relative overflow-hidden bg-white">
                  <Image src="/why-hok1.png" alt="HOK Narrative 1" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="aspect-square relative overflow-hidden bg-white">
                  <Image src="/why-hok2.png" alt="HOK Narrative 2" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="aspect-square relative overflow-hidden bg-white">
                  <Image src="/why-hok3.png" alt="HOK Narrative 3" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="aspect-square relative overflow-hidden bg-white">
                  <Image src="/why-hok4.png" alt="HOK Narrative 4" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Curated Partners */}
      <section id="brand" className="bg-hok-linen py-24 border-y border-hok-mist">
        <div className="container-narrow px-6">
          <div className="mb-32 text-center lg:text-left">
            <h2 className="text-5xl lg:text-7xl font-playfair tracking-tight mb-8">
              Our Curated <span className="text-hok-caramel italic">Partners.</span>
            </h2>
            <p className="max-w-2xl text-hok-stone font-light text-lg font-manrope">
              We went all the way to Korea to partner with brands that deliver real results for African skin and climates.
            </p>
          </div>
          
          <div className="space-y-px bg-hok-mist border border-hok-mist">
            {/* Brand 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-white">
              <div className="relative aspect-square lg:aspect-auto overflow-hidden border-r border-hok-mist group">
                <Image src="/derma-factory.jpg" alt="Derma Factory" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="p-12 lg:p-24 flex flex-col justify-center">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-hok-stone mb-6 block">01 / Derma Factory</span>
                <h3 className="text-4xl font-playfair mb-8">Science meets skincare.</h3>
                <p className="text-hok-stone font-light leading-relaxed mb-10 font-manrope">
                  Powered by high-performance ingredients, Derma Factory delivers effective, no-nonsense solutions for every skin type. Whether it's hydration, brightening, or anti-aging, this brand focuses on pure, concentrated formulas that work.
                </p>
                <Link href="/shop?vendors=derma-factory" className="inline-flex items-center justify-center border border-hok-mist px-12 py-6 hover:bg-hok-espresso hover:text-white uppercase text-[10px] tracking-widest font-bold transition-colors w-fit">
                  Explore Collection
                </Link>
              </div>
            </div>
            
            {/* Brand 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-white">
              <div className="p-12 lg:p-24 flex flex-col justify-center lg:order-1 order-2">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-hok-stone mb-6 block">02 / 12 Grabs</span>
                <h3 className="text-4xl font-playfair mb-8">Simple, effective beauty.</h3>
                <p className="text-hok-stone font-light leading-relaxed mb-10 font-manrope">
                  12 Grabs harnesses the power of natural extracts and skin-friendly actives to keep your skin healthy, hydrated, and glowing—without irritation. Perfect for those who love gentle yet powerful skincare.
                </p>
                <Link href="/shop?vendors=12-grabs" className="inline-flex items-center justify-center border border-hok-mist px-12 py-6 hover:bg-hok-espresso hover:text-white uppercase text-[10px] tracking-widest font-bold transition-colors w-fit">
                  Explore Collection
                </Link>
              </div>
              <div className="relative aspect-square lg:aspect-auto overflow-hidden border-l border-hok-mist group lg:order-2 order-1">
                <Image src="/12grabs.jpg" alt="12 Grabs" fill className="object-cover object-bottom grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
            </div>
            
            {/* Brand 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-white">
              <div className="relative aspect-square lg:aspect-auto overflow-hidden border-r border-hok-mist group">
                <Image src="/corsx-image.png" alt="COSRX" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="p-12 lg:p-24 flex flex-col justify-center">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-hok-stone mb-6 block">03 / COSRX</span>
                <h3 className="text-4xl font-playfair mb-8">Minimalist formulas.</h3>
                <p className="text-hok-stone font-light leading-relaxed mb-10 font-manrope">
                  A cult-favorite known for its ingredient-focused solutions like snail mucin and centella. Whether you're battling acne or dryness, COSRX is designed to heal, soothe, and transform.
                </p>
                <Link href="/shop?vendors=cosrx" className="inline-flex items-center justify-center border border-hok-mist px-12 py-6 hover:bg-hok-espresso hover:text-white uppercase text-[10px] tracking-widest font-bold transition-colors w-fit">
                  Explore Collection
                </Link>
              </div>
            </div>
            
            {/* Brand 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-white">
              <div className="p-12 lg:p-24 flex flex-col justify-center lg:order-1 order-2">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-hok-stone mb-6 block">04 / Lizara</span>
                <h3 className="text-4xl font-playfair mb-8">Traditional herbal wisdom.</h3>
                <p className="text-hok-stone font-light leading-relaxed mb-10 font-manrope">
                  Luxury meets nature in Lizara's carefully crafted skincare. Infused with premium botanical extracts, it offers a balance of tradition and modern science to nourish and rejuvenate your skin.
                </p>
                <Link href="/shop?vendors=lizara" className="inline-flex items-center justify-center border border-hok-mist px-12 py-6 hover:bg-hok-espresso hover:text-white uppercase text-[10px] tracking-widest font-bold transition-colors w-fit">
                  Explore Collection
                </Link>
              </div>
              <div className="relative aspect-square lg:aspect-auto overflow-hidden border-l border-hok-mist group lg:order-2 order-1">
                <Image src="/lizare-image.png" alt="Lizara" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
            </div>
            
          </div>

          <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-3xl md:text-4xl font-playfair mb-6">Discover More Brands</h3>
            <p className="text-hok-stone font-light leading-relaxed mb-10 max-w-2xl font-manrope">
              While these four hold a special place in our hearts, we curate a much wider selection of Nigeria's favorite, dermatologist-backed Korean skincare brands.
            </p>
            <Link href="/brands" className="inline-flex items-center justify-center bg-hok-espresso text-white px-12 py-6 hover:bg-hok-walnut uppercase text-[10px] tracking-widest font-bold transition-colors">
              View All Brands
            </Link>
          </div>

        </div>
      </section>

      {/* How we Source */}
      <section id="source" className="py-24 lg:py-40 bg-white">
        <div className="container-narrow px-6">
          <div className="max-w-4xl mb-24">
            <h2 className="text-5xl lg:text-8xl font-playfair tracking-tighter mb-10">
              How we <span className="italic text-hok-caramel">Source.</span>
            </h2>
            <p className="text-xl font-light text-hok-stone leading-relaxed uppercase tracking-wide font-manrope">
              Authentic Korean Skincare, Straight from Seoul to Nigeria. No fakes. No shortcuts. Just the real deal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-hok-mist border border-hok-mist">
            <div className="bg-white p-12 lg:p-20">
              <div className="text-4xl font-playfair text-hok-mist mb-10 text-stone-200">01</div>
              <h4 className="text-[12px] font-bold tracking-[0.4em] uppercase mb-6 text-hok-espresso">Direct Partnerships</h4>
              <p className="text-hok-stone font-light leading-relaxed text-sm lg:text-base font-manrope">
                We work directly with top K-beauty brands and authorized distributors. This ensures original formulations (no watered-down versions), fresh stock, and fair pricing by removing middleman markups.
              </p>
            </div>
            <div className="bg-white p-12 lg:p-20">
              <div className="text-4xl font-playfair text-hok-mist mb-10 text-stone-200">02</div>
              <h4 className="text-[12px] font-bold tracking-[0.4em] uppercase mb-6 text-hok-espresso">Verified Authenticity</h4>
              <p className="text-hok-stone font-light leading-relaxed text-sm lg:text-base font-manrope">
                Every product goes through strict verification checks. We track batch and serial numbers and verify ingredient lists. We don't sell expired or near-expiry products.
              </p>
            </div>
            <div className="bg-white p-12 lg:p-20">
              <div className="text-4xl font-playfair text-hok-mist mb-10 text-stone-200">03</div>
              <h4 className="text-[12px] font-bold tracking-[0.4em] uppercase mb-6 text-hok-espresso">Ethical Standards</h4>
              <p className="text-hok-stone font-light leading-relaxed text-sm lg:text-base font-manrope">
                We believe in skin health, not skin bleaching. We only stock brands that are cruelty-free, dermatologist-approved, and free from harmful chemicals.
              </p>
            </div>
            <div className="bg-white p-12 lg:p-20">
              <div className="text-4xl font-playfair text-hok-mist mb-10 text-stone-200">04</div>
              <h4 className="text-[12px] font-bold tracking-[0.4em] uppercase mb-6 text-hok-espresso">Secure Logistics</h4>
              <p className="text-hok-stone font-light leading-relaxed text-sm lg:text-base font-manrope">
                We handle logistics ourselves to guarantee proper storage conditions. No heat damage or contamination. Fast, secure shipping straight to your doorstep across Nigeria.
              </p>
            </div>
          </div>
          
          <div className="mt-24 text-center">
            <h3 className="text-2xl font-playfair mb-10 italic text-hok-caramel">
              Your glow starts with trust.
            </h3>
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <p className="text-3xl font-playfair text-hok-espresso">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-hok-stone mt-2">Authentic</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-playfair text-hok-espresso">0%</p>
                <p className="text-[10px] uppercase tracking-widest text-hok-stone mt-2">Harmful Chemicals</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-playfair text-hok-espresso">Direct</p>
                <p className="text-[10px] uppercase tracking-widest text-hok-stone mt-2">From Seoul</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hok-espresso py-24 lg:py-40 text-center">
        <div className="container-narrow px-6">
          <h2 className="text-white text-4xl lg:text-7xl font-playfair mb-12 italic">
            Ready to transform your skin?
          </h2>
          <Link href="/shop" className="inline-flex items-center justify-center bg-white text-hok-espresso hover:bg-hok-champagne hover:text-white transition-colors px-16 py-6 font-bold tracking-[0.3em] uppercase text-xs">
            Shop the Collection
          </Link>
        </div>
      </section>
      
    </main>
  );
}
