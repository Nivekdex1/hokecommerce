import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const BRANDS = [
  { name: "Cosrx", slug: "cosrx", desc: "Minimalist skincare tailored for your specific skin needs.", image: "/brands/corsx.png" },
  { name: "Derma Factory", slug: "derma-factory", desc: "High-efficacy clinical ingredients for visible results.", image: "/brands/dermafactory.png" },
  { name: "Lizara", slug: "lizara", desc: "Luxurious care deeply rooted in Korean beauty traditions.", image: "/brands/lizara.png" },
  { name: "12 Grabs", slug: "12-grabs", desc: "Effective, natural formulas that embrace the skin's balance.", image: "/brands/12grabs.png" },
  { name: "Anua", slug: "anua", desc: "Soothing formulations featuring heartleaf for calm, clear skin.", image: "/brands/anua.png" },
  { name: "CeraVe", slug: "cerave", desc: "Developed with dermatologists, offering ceramides for skin barrier restoration.", image: "/brands/cerave.png" },
  { name: "Doris", slug: "doris", desc: "Effective, no-nonsense daily skincare for radiant, healthy skin.", image: "/brands/doris.png" },
  { name: "Eucerin", slug: "eucerin", desc: "Science-based skincare tailored to maintain and restore skin health.", image: "/brands/eucerin.png" },
  { name: "Jigott", slug: "jigott", desc: "Nourishing, ingredient-focused Korean skincare for radiant vitality.", image: "/brands/jigott.png" },
  { name: "La Roche-Posay", slug: "la-roche-posay", desc: "Dermatologist-recommended skincare featuring thermal spring water.", image: "/brands/posay.png" },
];

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-hok-ivory">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hok-espresso/90 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/lizare-image-2.png"
            alt="Brands hero"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative z-20 text-center px-4">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Our Brands
          </h1>
          <p className="font-manrope text-white/80 max-w-xl mx-auto text-sm md:text-base">
            Discover our curated collection of premium Korean skincare brands, selected for their effective formulations and transformative results.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20">
        <div className="container-narrow">
          <SectionHeading title="Shop by Brand" subtitle="Find your favorite Korean beauty brands" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {BRANDS.map((brand) => (
              <Link 
                key={brand.slug} 
                href={`/shop?vendors=${brand.slug}`}
                className="group bg-white rounded-lg border border-hok-mist p-8 transition-all duration-300 hover:border-hok-caramel hover:shadow-lg flex flex-col items-center text-center"
              >
                <div className="h-20 w-full mb-6 flex items-center justify-center px-4">
                  <Image 
                    src={brand.image}
                    alt={brand.name}
                    width={140}
                    height={80}
                    className="max-h-[80px] w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="font-playfair text-2xl text-hok-espresso mb-3 group-hover:text-hok-walnut transition-colors">
                  {brand.name}
                </h3>
                <p className="font-manrope text-sm text-hok-stone mb-6 flex-grow">
                  {brand.desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-hok-caramel group-hover:text-hok-espresso transition-colors">
                  Shop Brand <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
