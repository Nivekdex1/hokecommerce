"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ProductDetails, Products } from "@/lib/shopify/types";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/formatPrice";
import { CheckCircle2, ChevronRight, Minus, Plus, Truck, AlertCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";

interface ProductClientProps {
  initialProduct: ProductDetails | null;
  initialRelatedProducts: Products[];
}

export default function ProductClient({
  initialProduct: product,
  initialRelatedProducts,
}: ProductClientProps) {
  const addItem = useCartStore((state) => state.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0].id);
    }
    
    const handleScroll = () => {
      // Show sticky CTA after scrolling past main CTA
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [product]);

  if (!product) return null;

  const inStock = product.availableForSale;
  const currentPrice = product.price;
  const currentCurrencyCode = product.currencyCode || "NGN";
  
  const images = product.images || [];

  const handleAddToCart = () => {
    addItem({
      id: selectedVariant || product.id,
      title: product.title,
      price: currentPrice,
      image: images[0]?.url || "/placeholder.jpg",
      quantity,
      currencyCode: currentCurrencyCode,
    });
    toast.success(`${quantity}x ${product.title} added to cart`);
  };

  const mapRelatedProduct = (p: any) => ({
    id: p.id,
    title: p.title,
    handle: p.handle,
    price: p.price,
    currencyCode: p.currencyCode || "NGN",
    image: p.featuredImage?.url || p.images?.[0]?.url || "/placeholder.jpg",
    vendor: p.vendor,
  });

  return (
    <div className="bg-hok-linen min-h-screen">
      <div className="container-narrow py-6 md:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-hok-stone mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link href="/" className="hover:text-hok-espresso">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/shop" className="hover:text-hok-espresso">Shop</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-hok-espresso font-medium">{product.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row-reverse gap-4">
            {/* Main Image */}
            <div className="w-full md:w-5/6 aspect-square bg-hok-ivory rounded-md overflow-hidden relative">
              {images.length > 0 ? (
                <Image
                  src={images[selectedImage].url}
                  alt={images[selectedImage].altText || product.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-hok-mist text-hok-stone">
                  No Image Available
                </div>
              )}
            </div>
            
            {/* Thumbnails Desktop */}
            <div className="hidden md:flex flex-col w-1/6 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-full aspect-square bg-hok-ivory rounded-md overflow-hidden relative border-2 transition-all ${
                    selectedImage === idx ? "border-hok-espresso" : "border-transparent hover:border-hok-mist"
                  }`}
                >
                  <Image src={img.url} alt="Thumbnail" fill className="object-cover" sizes="100px" />
                </button>
              ))}
            </div>

            {/* Thumbnails Mobile */}
            <div className="flex md:hidden w-full gap-4 overflow-x-auto hide-scrollbar pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 flex-shrink-0 aspect-square bg-hok-ivory rounded-md overflow-hidden relative border-2 transition-all ${
                    selectedImage === idx ? "border-hok-espresso" : "border-transparent"
                  }`}
                >
                  <Image src={img.url} alt="Thumbnail" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {product.vendor && (
              <span className="text-sm text-hok-stone font-semibold tracking-widest uppercase mb-2">
                {product.vendor}
              </span>
            )}
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-semibold text-hok-espresso mb-4 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-hok-mist">
              <span className="font-manrope text-2xl font-bold text-hok-walnut">
                {formatPrice(currentPrice, { currencyCode: currentCurrencyCode })}
              </span>
              
              {inStock ? (
                <div className="flex items-center text-hok-success text-sm font-medium bg-hok-success/10 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> In Stock
                </div>
              ) : (
                <div className="flex items-center text-hok-error text-sm font-medium bg-hok-error/10 px-3 py-1 rounded-full">
                  <AlertCircle className="w-4 h-4 mr-1.5" /> Out of Stock
                </div>
              )}
            </div>

            {/* Quantity & CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center justify-between border border-hok-mist rounded-none h-14 w-full sm:w-1/3 bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-hok-stone hover:text-hok-espresso transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center text-hok-stone hover:text-hok-espresso transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                disabled={!inStock}
                className="h-14 w-full sm:w-2/3 rounded-none bg-hok-walnut hover:bg-hok-espresso text-white text-lg font-semibold tracking-wide transition-colors"
              >
                {inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 py-6 border-y border-hok-mist">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-hok-champagne" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-hok-espresso">Nationwide Delivery</span>
                  <span className="text-xs text-hok-stone">Lagos: 1-3 days, Others: 3-7 days</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-hok-champagne" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-hok-espresso">100% Authentic</span>
                  <span className="text-xs text-hok-stone">Sourced directly from Korea</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="mt-2">
              <Accordion type="single" collapsible defaultValue="description" className="w-full">
                <AccordionItem value="description" className="border-hok-mist">
                  <AccordionTrigger className="text-lg font-playfair hover:no-underline hover:text-hok-walnut">
                    Description
                  </AccordionTrigger>
                  <AccordionContent className="text-hok-stone leading-relaxed prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="border-hok-mist">
                  <AccordionTrigger className="text-lg font-playfair hover:no-underline hover:text-hok-walnut">
                    Shipping & Returns
                  </AccordionTrigger>
                  <AccordionContent className="text-hok-stone leading-relaxed">
                    <p className="mb-2"><strong>Delivery Fees:</strong> Calculated at checkout based on your location.</p>
                    <p className="mb-2"><strong>Timeline:</strong> Lagos (1-3 working days), Other States (3-7 working days).</p>
                    <p><strong>Returns:</strong> Due to hygiene reasons, we do not accept returns on opened skincare products. If you receive a damaged item, contact us within 24 hours.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      {showStickyCTA && inStock && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-hok-mist p-4 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] animate-in slide-in-from-bottom-full">
          <div className="flex gap-4 items-center">
            <div className="flex-1 flex flex-col">
              <span className="font-playfair font-semibold text-sm line-clamp-1">{product.title}</span>
              <span className="text-hok-walnut font-bold text-sm">{formatPrice(currentPrice, { currencyCode: currentCurrencyCode })}</span>
            </div>
            <Button 
              onClick={handleAddToCart}
              className="rounded-none bg-hok-walnut text-white font-semibold"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      )}

      {/* Related Products */}
      {initialRelatedProducts.length > 0 && (
        <div className="bg-white py-16 md:py-24 border-t border-hok-mist">
          <div className="container-narrow">
            <SectionHeading title="You Might Also Like" subtitle="Complete your skincare routine" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {initialRelatedProducts.map((p) => (
                <ProductCard key={p.id} product={mapRelatedProduct(p)} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
