"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type HeroSlide = {
  id: string | number;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
  bgColor?: string; 
};

const SLIDE_DURATION = 6000;

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [progressKey, setProgressKey] = useState(0);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setProgressKey((k) => k + 1);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgressKey((k) => k + 1);
  }, [slides.length]);

  const goToSlide = useCallback((idx: number) => {
    setCurrentSlide(idx);
    setProgressKey((k) => k + 1);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (touchStart && touchEnd) {
      const distance = touchStart - touchEnd;
      if (distance > minSwipeDistance) nextSlide();
      else if (distance < -minSwipeDistance) prevSlide();
    }
    setTimeout(() => setIsHovered(false), 2000);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  return (
    <div 
      className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden group bg-gradient-to-br from-[#FFFCF9] via-[#FAF6EE] to-[#F9F4ED]"
      onMouseEnter={() => {
        if (window.matchMedia('(hover: hover)').matches) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <div className="container-narrow h-full relative flex flex-col md:flex-row items-center justify-between pt-24 pb-12">
            
            {/* Text Side (Overlaid/Left) */}
            <div className={`w-full md:w-1/2 z-20 flex flex-col justify-center px-4 md:px-0 transition-transform duration-1000 delay-100 ${currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <span className="text-hok-champagne font-outfit uppercase tracking-widest text-xs md:text-sm mb-4 block animate-fade-up">
                Exclusive Collection
              </span>
              <h1 className="font-fondamento text-5xl md:text-6xl lg:text-[5rem] text-hok-espresso font-normal leading-[1.05] mb-6 animate-fade-up delay-100 drop-shadow-sm">
                {slide.title}
              </h1>
              <p className="font-outfit text-base md:text-lg text-hok-stone font-light mb-10 max-w-md leading-relaxed animate-fade-up delay-200">
                {slide.subtitle}
              </p>
              <div className="animate-fade-up delay-300">
                <Link 
                  href={slide.href}
                  className="inline-flex items-center gap-4 group/btn"
                >
                  <span className="font-outfit font-medium text-sm tracking-[0.2em] uppercase text-hok-espresso border-b border-hok-champagne pb-1 transition-colors hover:text-hok-champagne">
                    {slide.cta}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-hok-champagne/30 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-hok-champagne group-hover/btn:text-white group-hover/btn:border-hok-champagne">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className={`w-full md:w-[55%] absolute md:relative right-0 h-[50vh] md:h-[70vh] flex items-center justify-center z-10 transition-transform duration-[1500ms] ${currentSlide === index ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              {/* Ambient Glow */}
              <div className="absolute w-[60%] h-[60%] bg-hok-champagne/10 rounded-full blur-[80px] -z-10 mix-blend-multiply"></div>
              
              <div className="relative w-full h-full hover-soft-scale">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-contain object-center md:object-right drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Luxury Navigation Overlay */}
      <div className="absolute bottom-8 left-0 w-full z-30 pointer-events-none">
        <div className="container-narrow flex items-center justify-between pointer-events-auto px-4 md:px-0">
          
          {/* Counter (renket.org style) */}
          <div className="flex items-center gap-3 font-outfit text-sm text-hok-charcoal">
            <span className="font-medium">{String(currentSlide + 1).padStart(2, '0')}</span>
            <div className="w-12 h-[1px] bg-hok-stone/30"></div>
            <span className="text-hok-stone">{String(slides.length).padStart(2, '0')}</span>
          </div>

          {/* Dots & Controls */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="group relative py-2"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className={`h-[2px] transition-all duration-500 rounded-full ${
                    currentSlide === idx ? "w-8 bg-hok-espresso" : "w-4 bg-hok-stone/30 group-hover:bg-hok-stone/60"
                  }`} />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-hok-stone/20 text-hok-charcoal hover:bg-white hover:shadow-sm transition-all duration-300 active:scale-90"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-hok-stone/20 text-hok-charcoal hover:bg-white hover:shadow-sm transition-all duration-300 active:scale-90"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
