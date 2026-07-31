import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { ShieldCheck, Award, ThumbsUp, SearchCheck } from "lucide-react";

export default function QualityGuaranteePage() {
  return (
    <main className="min-h-screen bg-hok-ivory">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hok-espresso/90 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/lizare-image-2.png"
            alt="Quality Guarantee"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative z-20 text-center px-4">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Authenticity Guarantee
          </h1>
          <p className="font-manrope text-white/80 max-w-xl mx-auto text-sm md:text-base">
            100% Genuine. Sourced Directly from Korea.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container-narrow">
          <SectionHeading title="Our Promise to You" subtitle="Never compromise on quality" />
          
          <div className="max-w-3xl mx-auto text-center mt-12 mb-16 font-manrope text-hok-stone leading-relaxed">
            <p className="mb-6">
              At Home of Korean Beauty, we understand that your skin deserves only the best. 
              The rise of counterfeit beauty products is a real concern, which is why we've made 
              authenticity our number one priority.
            </p>
            <p>
              Every single product on our shelves is guaranteed 100% authentic, sourced either 
              directly from the brands themselves or through their authorized official distributors 
              in South Korea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white p-8 rounded-lg border border-hok-mist flex gap-6">
              <div className="w-12 h-12 rounded-full bg-hok-champagne/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-hok-caramel" />
              </div>
              <div>
                <h3 className="font-playfair text-xl text-hok-espresso font-medium mb-3">Direct Sourcing</h3>
                <p className="font-manrope text-sm text-hok-stone leading-relaxed">
                  We cut out the middleman. By sourcing directly from South Korea, we maintain full 
                  control over our supply chain and guarantee that no fakes can enter our inventory.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border border-hok-mist flex gap-6">
              <div className="w-12 h-12 rounded-full bg-hok-champagne/20 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-hok-caramel" />
              </div>
              <div>
                <h3 className="font-playfair text-xl text-hok-espresso font-medium mb-3">Authorized Partners</h3>
                <p className="font-manrope text-sm text-hok-stone leading-relaxed">
                  We are proud to be authorized retailers for many of the brands we carry, ensuring 
                  that you receive products that have been stored and handled according to the manufacturer's exact specifications.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border border-hok-mist flex gap-6">
              <div className="w-12 h-12 rounded-full bg-hok-champagne/20 flex items-center justify-center shrink-0">
                <SearchCheck className="w-6 h-6 text-hok-caramel" />
              </div>
              <div>
                <h3 className="font-playfair text-xl text-hok-espresso font-medium mb-3">Rigorous Inspection</h3>
                <p className="font-manrope text-sm text-hok-stone leading-relaxed">
                  Every batch that arrives at our warehouse undergoes strict quality control. We check 
                  batch codes, expiration dates, and packaging integrity before any item is shipped to you.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border border-hok-mist flex gap-6">
              <div className="w-12 h-12 rounded-full bg-hok-champagne/20 flex items-center justify-center shrink-0">
                <ThumbsUp className="w-6 h-6 text-hok-caramel" />
              </div>
              <div>
                <h3 className="font-playfair text-xl text-hok-espresso font-medium mb-3">Shop with Confidence</h3>
                <p className="font-manrope text-sm text-hok-stone leading-relaxed">
                  If you ever have a concern about the authenticity of a product purchased from us, 
                  our customer service team is ready to provide batch codes and origin proofs.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/shop" 
              className="inline-flex h-12 items-center justify-center bg-hok-espresso px-8 text-xs font-bold tracking-[0.2em] text-white uppercase hover:bg-hok-walnut transition-colors"
            >
              Shop Authentic Skincare
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
