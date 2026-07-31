"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  }
];

const SLIDE_DURATION = 6000;

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [progressKey, setProgressKey] = useState(0);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setProgressKey((k) => k + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgressKey((k) => k + 1);
  }, []);

  const goToSlide = useCallback((idx: number) => {
    setCurrentSlide(idx);
    setProgressKey((k) => k + 1);
  }, []);

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
    if (distance > minSwipeDistance) nextSlide();
    else if (distance < -minSwipeDistance) prevSlide();
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  return (
    <div 
      className="relative w-full overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
    >
      {/* Slides */}
      <div 
        className="flex transition-transform duration-700 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="min-w-full flex flex-col md:flex-row">
            {/* Text Side */}
            <div className={`w-full md:w-[45%] flex flex-col justify-center px-6 py-10 md:px-12 lg:px-20 ${slide.bgColor} min-h-[35vh] md:min-h-[70vh] order-2 md:order-1`}>
              <div className={currentSlide === index ? "animate-in fade-in slide-in-from-bottom-4 duration-700" : "opacity-0"}>
                <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-hok-espresso font-semibold leading-[1.1] mb-4 md:mb-6">
                  {slide.title}
                </h1>
              </div>
              <div className={currentSlide === index ? "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150" : "opacity-0"}>
                <p className="font-manrope text-sm sm:text-base md:text-lg text-hok-stone mb-6 md:mb-10 max-w-md leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>
              <div className={currentSlide === index ? "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300" : "opacity-0"}>
                <Button 
                  asChild 
                  className="bg-hok-walnut hover:bg-hok-espresso text-white rounded-none px-8 py-6 text-sm md:text-base font-semibold tracking-wide transition-all duration-300 hover:shadow-lg active:scale-[0.98] w-fit"
                >
                  <Link href={slide.href}>
                    {slide.cta} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Image Side */}
            <div className="w-full md:w-[55%] relative h-[40vh] sm:h-[45vh] md:h-auto order-1 md:order-2 bg-hok-mist overflow-hidden">
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

      {/* Arrow Controls — always visible on desktop, subtle semi-transparent */}
      <button 
        onClick={prevSlide}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-sm text-hok-espresso hover:bg-white hover:shadow-md transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 active:scale-90"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-sm text-hok-espresso hover:bg-white hover:shadow-md transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 active:scale-90"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Bottom Navigation: Dots + Progress */}
      <div className="absolute bottom-5 left-1/2 md:left-[22.5%] -translate-x-1/2 flex items-center gap-2.5 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className="relative h-2 rounded-full transition-all duration-500 overflow-hidden"
            style={{ width: currentSlide === idx ? '2rem' : '0.5rem' }}
            aria-label={`Go to slide ${idx + 1}`}
          >
            {/* Background */}
            <span className={`absolute inset-0 rounded-full transition-colors duration-300 ${
              currentSlide === idx ? "bg-hok-walnut/30" : "bg-hok-stone/30 hover:bg-hok-stone/60"
            }`} />
            {/* Active fill / progress */}
            {currentSlide === idx && (
              <span
                key={progressKey}
                className="absolute inset-y-0 left-0 rounded-full bg-hok-walnut animate-slide-progress"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
