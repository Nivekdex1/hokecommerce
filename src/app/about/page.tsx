import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Learn about Home of Korean Beauty, Nigeria's premier destination for authentic, dermatologist-backed Korean skincare.",
};

export default function About() {
  return (
    <main className="bg-hok-linen min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-hok-espresso flex items-center justify-center">
        <Image 
          src="/our-brand.png" 
          alt="Home of Korean Beauty Team" 
          fill 
          priority 
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="text-hok-champagne font-semibold tracking-widest uppercase mb-4 block">About Us</span>
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white font-semibold mb-6">
            The Journey to <br/> Better Skin
          </h1>
          <p className="font-manrope text-hok-ivory text-lg md:text-xl font-light">
            Bringing authentic, transformative Korean skincare directly to Nigeria.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-playfair text-4xl text-hok-espresso font-semibold mb-6">
                Why HOK?
              </h2>
              <div className="font-manrope text-hok-stone text-lg space-y-6 font-light leading-relaxed">
                <p>
                  At Home of Korean Beauty (HOK), skincare isn't just a routine—it's a journey to confidence, radiance, and self-care. We saw a growing need for authentic, high-quality Korean skincare in Nigeria, but finding the right products was a challenge.
                </p>
                <p>
                  Too many beauty lovers struggled with counterfeit products, lack of expert guidance, and skincare that wasn't tailored to our climate. That's why we created HOK—to be Nigeria's #1 destination for trusted K-beauty.
                </p>
                <p>
                  We offer only genuine, dermatologist-backed skincare that works for all skin types and concerns. From hydrating essentials to targeted treatments for acne, hyperpigmentation, and aging, we bring the best of Korean innovation straight to you.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 mt-8 md:mt-16">
                <div className="relative aspect-[4/5] rounded-full overflow-hidden">
                  <Image src="/why-hok1.png" alt="Skincare routine" fill className="object-cover" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[4/5] rounded-full overflow-hidden">
                  <Image src="/why-hok2.png" alt="Glowing skin" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Source */}
      <section className="section-padding bg-hok-ivory border-y border-hok-mist">
        <div className="container-narrow text-center">
          <SectionHeading 
            title="Sourced with Integrity" 
            subtitle="We believe in full transparency when it comes to what you put on your skin." 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-hok-champagne/20 rounded-full flex items-center justify-center mb-6">
                <Image src="/authenticity.svg" alt="" width={32} height={32} />
              </div>
              <h3 className="font-playfair text-xl font-medium text-hok-espresso mb-3">Direct from Korea</h3>
              <p className="font-manrope text-hok-stone text-sm leading-relaxed">
                We partner directly with official brands and authorized distributors in Seoul to bypass middlemen and guarantee authenticity.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-hok-champagne/20 rounded-full flex items-center justify-center mb-6">
                <Image src="/curated.svg" alt="" width={32} height={32} />
              </div>
              <h3 className="font-playfair text-xl font-medium text-hok-espresso mb-3">Expert Curated</h3>
              <p className="font-manrope text-hok-stone text-sm leading-relaxed">
                Every product is tested and vetted for efficacy, safety, and suitability for melanin-rich skin and our local climate.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-hok-champagne/20 rounded-full flex items-center justify-center mb-6">
                <Image src="/delivery.svg" alt="" width={32} height={32} />
              </div>
              <h3 className="font-playfair text-xl font-medium text-hok-espresso mb-3">Delivered to You</h3>
              <p className="font-manrope text-hok-stone text-sm leading-relaxed">
                Stored in climate-controlled facilities in Lagos and shipped nationwide with care to ensure products arrive in perfect condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-hok-espresso text-center px-4">
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-white font-semibold mb-6">
          Ready to start your journey?
        </h2>
        <p className="font-manrope text-hok-mist/80 text-lg mb-10 max-w-xl mx-auto">
          Explore our collection of authentic Korean skincare or take the skin quiz to find your perfect routine.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-hok-champagne hover:bg-white text-hok-espresso rounded-none px-10 py-6 text-base font-semibold">
            <Link href="/shop">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" className="border-hok-mist text-hok-mist hover:bg-hok-mist hover:text-hok-espresso rounded-none px-10 py-6 text-base font-semibold bg-transparent">
            <Link href="/skin-algorithm">Take Skin Quiz</Link>
          </Button>
        </div>
      </section>
      
    </main>
  );
}
