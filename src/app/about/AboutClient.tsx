"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const typewriterContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const charVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const flipIn = {
  hidden: { opacity: 0, rotateX: 90, rotateY: 90, scale: 0.8 },
  visible: { 
    opacity: 1, 
    rotateX: 0, 
    rotateY: 0, 
    scale: 1, 
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const } 
  },
};

export default function AboutClient() {
  const [typewriterKey, setTypewriterKey] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTypewriterKey(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-hok-ivory min-h-screen text-hok-espresso">

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 border-b border-hok-mist bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-hok-linen/40 -skew-x-12 translate-x-1/4 -z-0"></div>
        <div className="container-narrow px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-[11px] font-bold uppercase text-hok-stone mb-10 text-center lg:text-left"
          >
            Established 2024 — Lagos, Nigeria
          </motion.h1>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row justify-between items-end gap-12"
          >
            <motion.h2
              key={typewriterKey}
              variants={typewriterContainer}
              className="text-6xl lg:text-[120px] font-light tracking-tighter leading-[0.85] text-hok-espresso whitespace-pre-wrap"
            >
              {"The House of ".split("").map((char, index) => (
                <motion.span key={`t1-${index}`} variants={charVariant}>
                  {char}
                </motion.span>
              ))}
              <br />
              <span className="text-hok-caramel italic">
                {"Korean Beauty.".split("").map((char, index) => (
                  <motion.span key={`t2-${index}`} variants={charVariant}>
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="max-w-[280px] text-[12px] leading-relaxed uppercase tracking-widest text-hok-stone font-medium pb-4 border-b border-hok-mist"
            >
              Nigeria’s #1 destination for trusted, dermatologist-backed K-Beauty innovation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Origin */}
      <section id="story" className="py-24 lg:py-40 bg-hok-ivory">
        <div className="container-narrow px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-hok-espresso mb-6 block">Our Origin</span>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-playfair leading-tight text-hok-espresso mb-8">
              Why Home of <br />Korean Beauty?
            </h3>
            <div className="w-12 h-px bg-hok-mist mb-8"></div>
            <p className="text-xl lg:text-2xl leading-relaxed font-light text-hok-espresso mb-8 font-manrope">
              At Home of Korean Beauty (HOK), skincare isn't just a routine—it's a journey to confidence, radiance, and self-care.
            </p>
            <div className="space-y-6 text-hok-stone leading-loose font-light font-manrope">
              <p>
                Too many beauty lovers struggled with counterfeit products, lack of expert guidance, and skincare that wasn't tailored to our climate. That's why we created HOK.
              </p>
              <p>
                From hydrating essentials to targeted treatments for acne, hyperpigmentation, and aging, we bring the best of Korean innovation straight to you.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.div
              key={typewriterKey}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 gap-4 lg:gap-8 mt-10 lg:mt-0"
              style={{ perspective: 1000 }}
            >
              <div className="space-y-4 lg:space-y-8 mt-12 lg:mt-24">
                <motion.div variants={flipIn} className="aspect-[4/5] relative overflow-hidden bg-white shadow-sm group rounded-sm">
                  <Image src="/why-hok1.png" alt="HOK Narrative 1" fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                </motion.div>
                <motion.div variants={flipIn} className="aspect-square relative overflow-hidden bg-white shadow-sm group rounded-sm">
                  <Image src="/why-hok3.png" alt="HOK Narrative 3" fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                </motion.div>
              </div>
              <div className="space-y-4 lg:space-y-8">
                <motion.div variants={flipIn} className="aspect-square relative overflow-hidden bg-white shadow-sm group rounded-sm">
                  <Image src="/why-hok2.png" alt="HOK Narrative 2" fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                </motion.div>
                <motion.div variants={flipIn} className="aspect-[4/5] relative overflow-hidden bg-white shadow-sm group rounded-sm">
                  <Image src="/why-hok4.png" alt="HOK Narrative 4" fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Curated Partners */}
      <section id="brand" className="bg-white py-24 lg:py-40">
        <div className="container-narrow px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-24 text-center"
          >
            <h2 className="text-5xl lg:text-7xl font-playfair tracking-tight mb-8">
              Our Curated <span className="text-hok-caramel italic">Partners.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-hok-stone font-light text-lg font-manrope">
              We went all the way to Korea to partner with brands that deliver real results for African skin and climates.
            </p>
          </motion.div>

          <div className="space-y-24 lg:space-y-32">
            {/* Brand 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <motion.div variants={slideInLeft} className="lg:col-span-7 relative aspect-[4/3] overflow-hidden group rounded-sm">
                <Image src="/derma-factory.jpg" alt="Derma Factory" fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
              </motion.div>
              <motion.div variants={slideInRight} className="lg:col-span-5 lg:pl-8">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-hok-stone mb-6 block">01 / Derma Factory</span>
                <h3 className="text-4xl font-playfair mb-6 text-hok-espresso">Science meets skincare.</h3>
                <p className="text-hok-stone font-light leading-relaxed mb-10 font-manrope">
                  Powered by high-performance ingredients, Derma Factory delivers effective, no-nonsense solutions for every skin type. Whether it's hydration, brightening, or anti-aging, this brand focuses on pure, concentrated formulas that work.
                </p>
                <Link href="/shop?vendors=derma-factory" className="inline-flex items-center justify-center border-b border-hok-espresso pb-2 hover:text-hok-caramel hover:border-hok-caramel uppercase text-[10px] tracking-widest font-bold transition-all w-fit">
                  Explore Collection
                </Link>
              </motion.div>
            </motion.div>

            {/* Brand 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <motion.div variants={slideInLeft} className="lg:col-span-5 lg:order-1 order-2 lg:pr-8">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-hok-stone mb-6 block">02 / 12 Grabs</span>
                <h3 className="text-4xl font-playfair mb-6 text-hok-espresso">Simple, effective beauty.</h3>
                <p className="text-hok-stone font-light leading-relaxed mb-10 font-manrope">
                  12 Grabs harnesses the power of natural extracts and skin-friendly actives to keep your skin healthy, hydrated, and glowing—without irritation. Perfect for those who love gentle yet powerful skincare.
                </p>
                <Link href="/shop?vendors=12-grabs" className="inline-flex items-center justify-center border-b border-hok-espresso pb-2 hover:text-hok-caramel hover:border-hok-caramel uppercase text-[10px] tracking-widest font-bold transition-all w-fit">
                  Explore Collection
                </Link>
              </motion.div>
              <motion.div variants={slideInRight} className="lg:col-span-7 relative aspect-[4/3] overflow-hidden group rounded-sm lg:order-2 order-1">
                <Image src="/12grabs.jpg" alt="12 Grabs" fill className="object-cover object-bottom scale-105 group-hover:scale-100 transition-transform duration-1000" />
              </motion.div>
            </motion.div>

            {/* Brand 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <motion.div variants={slideInLeft} className="lg:col-span-7 relative aspect-[4/3] overflow-hidden group rounded-sm">
                <Image src="/corsx-image.png" alt="COSRX" fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
              </motion.div>
              <motion.div variants={slideInRight} className="lg:col-span-5 lg:pl-8">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-hok-stone mb-6 block">03 / COSRX</span>
                <h3 className="text-4xl font-playfair mb-6 text-hok-espresso">Minimalist formulas.</h3>
                <p className="text-hok-stone font-light leading-relaxed mb-10 font-manrope">
                  A cult-favorite known for its ingredient-focused solutions like snail mucin and centella. Whether you're battling acne or dryness, COSRX is designed to heal, soothe, and transform.
                </p>
                <Link href="/shop?vendors=cosrx" className="inline-flex items-center justify-center border-b border-hok-espresso pb-2 hover:text-hok-caramel hover:border-hok-caramel uppercase text-[10px] tracking-widest font-bold transition-all w-fit">
                  Explore Collection
                </Link>
              </motion.div>
            </motion.div>

            {/* Brand 4 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <motion.div variants={slideInLeft} className="lg:col-span-5 lg:order-1 order-2 lg:pr-8">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-hok-stone mb-6 block">04 / Lizara</span>
                <h3 className="text-4xl font-playfair mb-6 text-hok-espresso">Traditional herbal wisdom.</h3>
                <p className="text-hok-stone font-light leading-relaxed mb-10 font-manrope">
                  Luxury meets nature in Lizara's carefully crafted skincare. Infused with premium botanical extracts, it offers a balance of tradition and modern science to nourish and rejuvenate your skin.
                </p>
                <Link href="/shop?vendors=lizara" className="inline-flex items-center justify-center border-b border-hok-espresso pb-2 hover:text-hok-caramel hover:border-hok-caramel uppercase text-[10px] tracking-widest font-bold transition-all w-fit">
                  Explore Collection
                </Link>
              </motion.div>
              <motion.div variants={slideInRight} className="lg:col-span-7 relative aspect-[4/3] overflow-hidden group rounded-sm lg:order-2 order-1">
                <Image src="/lizare-image.png" alt="Lizara" fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-32 flex flex-col items-center justify-center text-center px-4"
          >
            <h3 className="text-3xl md:text-4xl font-playfair mb-6">Discover More Brands</h3>
            <p className="text-hok-stone font-light leading-relaxed mb-10 max-w-2xl font-manrope">
              While these four hold a special place in our hearts, we curate a much wider selection of Nigeria's favorite, dermatologist-backed Korean skincare brands.
            </p>
            <Link href="/brands" className="inline-flex items-center justify-center bg-hok-espresso text-white px-12 py-5 hover:bg-hok-caramel uppercase text-[10px] tracking-widest font-bold transition-colors rounded-sm shadow-xl hover:shadow-2xl">
              View All Brands
            </Link>
          </motion.div>

        </div>
      </section>

      {/* How we Source */}
      <section id="source" className="py-24 lg:py-40 bg-hok-linen">
        <div className="container-narrow px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mb-24"
          >
            <h2 className="text-5xl lg:text-8xl font-playfair tracking-tighter mb-10 text-hok-espresso">
              How we <span className="italic text-hok-caramel">Source.</span>
            </h2>
            <p className="text-xl font-light text-hok-stone leading-relaxed uppercase tracking-wide font-manrope">
              Authentic Korean Skincare, Straight from Seoul to Nigeria. No fakes. No shortcuts. Just the real deal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hok-mist/50 border border-hok-mist/50 rounded-sm overflow-hidden">
            {[
              { num: "01", title: "Direct Partnerships", desc: "We work directly with top K-beauty brands and authorized distributors. This ensures original formulations (no watered-down versions), fresh stock, and fair pricing by removing middleman markups." },
              { num: "02", title: "Verified Authenticity", desc: "Every product goes through strict verification checks. We track batch and serial numbers and verify ingredient lists. We don't sell expired or near-expiry products." },
              { num: "03", title: "Ethical Standards", desc: "We believe in skin health, not skin bleaching. We only stock brands that are cruelty-free, dermatologist-approved, and free from harmful chemicals." },
              { num: "04", title: "Secure Logistics", desc: "We handle logistics ourselves to guarantee proper storage conditions. No heat damage or contamination. Fast, secure shipping straight to your doorstep across Nigeria." }
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white p-12 lg:p-20 group hover:bg-hok-ivory/50 transition-colors duration-500"
              >
                <div className="text-4xl font-playfair text-hok-mist mb-10 text-stone-200 group-hover:text-hok-caramel transition-colors">{item.num}</div>
                <h4 className="text-2xl lg:text-3xl font-playfair mb-6 text-hok-espresso">{item.title}</h4>
                <p className="text-hok-stone font-light leading-relaxed text-sm lg:text-base font-manrope">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-32 text-center"
          >
            <motion.h3 variants={fadeInUp} className="text-2xl font-playfair mb-16 italic text-hok-caramel">
              Your glow starts with trust.
            </motion.h3>
            <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24">
              <motion.div variants={fadeInUp} className="text-center">
                <p className="text-4xl md:text-5xl font-playfair text-hok-espresso mb-3">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-hok-stone">Authentic</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <p className="text-4xl md:text-5xl font-playfair text-hok-espresso mb-3">0%</p>
                <p className="text-[10px] uppercase tracking-widest text-hok-stone">Harmful Chemicals</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="text-center">
                <p className="text-4xl md:text-5xl font-playfair text-hok-espresso mb-3">Direct</p>
                <p className="text-[10px] uppercase tracking-widest text-hok-stone">From Seoul 🇰🇷</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hok-espresso py-32 lg:py-48 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lizare-image.png')] opacity-[0.03] bg-cover bg-center"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container-narrow px-6 relative z-10"
        >
          <motion.h2 variants={fadeInUp} className="text-white text-4xl lg:text-7xl font-playfair mb-16 italic">
            Ready to transform your skin?
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <Link href="/shop" className="inline-flex items-center justify-center bg-white text-hok-espresso hover:bg-hok-caramel hover:text-white transition-colors px-16 py-6 font-bold tracking-[0.3em] uppercase text-xs rounded-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-300">
              Shop the Collection
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}
