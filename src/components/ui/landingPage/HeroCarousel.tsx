"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Discover Your Glass Skin Era",
    subtitle: "Authentic, dermatologist-backed Korean skincare tailored to bring out your natural, luminous glow.",
    cta: "Shop Skincare",
    href: "/shop",
    image: "/hero-products.png", // Will need to optimize this in Phase 6
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
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px) to register as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
    >
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full flex flex-col md:flex-row">
            {/* Mobile: Image Top, Text Bottom. Desktop: Text Left 45%, Image Right 55% */}
            
            <div className={`w-full md:w-[45%] flex flex-col justify-center px-6 py-12 md:px-12 lg:px-20 ${slide.bgColor} min-h-[40vh] md:min-h-[70vh] order-2 md:order-1`}>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-hok-espresso font-semibold leading-tight mb-4 md:mb-6 animate-in slide-in-from-bottom-4 duration-700 fade-in fill-mode-both">
                {slide.title}
              </h1>
              <p className="font-manrope text-base md:text-lg text-hok-stone mb-8 md:mb-10 max-w-md animate-in slide-in-from-bottom-4 duration-700 delay-150 fade-in fill-mode-both">
                {slide.subtitle}
              </p>
              <div className="animate-in slide-in-from-bottom-4 duration-700 delay-300 fade-in fill-mode-both">
                <Button 
                  asChild 
                  className="bg-hok-walnut hover:bg-hok-espresso text-white rounded-none px-8 py-6 text-sm md:text-base font-semibold tracking-wide"
                >
                  <Link href={slide.href}>
                    {slide.cta} <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="w-full md:w-[55%] relative h-[45vh] md:h-auto order-1 md:order-2 bg-hok-mist overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-hok-espresso hover:bg-white transition-colors z-10 hidden md:flex opacity-0 group-hover:opacity-100"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-hok-espresso hover:bg-white transition-colors z-10 hidden md:flex opacity-0 group-hover:opacity-100"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 md:left-[22.5%] -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === idx ? "bg-hok-walnut w-8" : "bg-hok-stone/40 hover:bg-hok-stone"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
