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

// Each slide gets its own gradient + glow color for visual impact
const SLIDE_THEMES = [
  { gradient: "linear-gradient(135deg, #FFF9F0 0%, #FAE8D4 40%, #F5D5B8 100%)", glow: "#D4A853" },
  { gradient: "linear-gradient(135deg, #F0F4FF 0%, #D6E4FF 40%, #BDD4FF 100%)", glow: "#6B9BFF" },
  { gradient: "linear-gradient(135deg, #FFF0F0 0%, #FFD6D6 40%, #FFBDBD 100%)", glow: "#FF8A8A" },
  { gradient: "linear-gradient(135deg, #F0FFF4 0%, #D4F5DC 40%, #B8EBCA 100%)", glow: "#5CB87A" },
  { gradient: "linear-gradient(135deg, #FFF5F0 0%, #FFE4D4 40%, #FFD0B8 100%)", glow: "#FF9F6B" },
];

const SLIDE_DURATION = 6000;

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlideIdx, setPrevSlideIdx] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const goToSlide = useCallback(
    (idx: number, dir: "next" | "prev" = "next") => {
      if (isAnimating || idx === currentSlide) return;
      setDirection(dir);
      setPrevSlideIdx(currentSlide);
      setCurrentSlide(idx);
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setPrevSlideIdx(-1);
      }, 800);
    },
    [currentSlide, isAnimating]
  );

  const nextSlide = useCallback(() => {
    const next = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(next, "next");
  }, [currentSlide, slides.length, goToSlide]);

  const prevSlideAction = useCallback(() => {
    const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prev, "prev");
  }, [currentSlide, slides.length, goToSlide]);

  // Touch handlers
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
      else if (distance < -minSwipeDistance) prevSlideAction();
    }
    setTimeout(() => setIsHovered(false), 2000);
  };

  // Auto-play
  useEffect(() => {
    if (isHovered || isAnimating) return;
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isHovered, isAnimating, nextSlide]);

  const getSlideAnimationClass = (index: number) => {
    if (index === currentSlide && prevSlideIdx !== -1) {
      // Incoming slide
      return direction === "next"
        ? "animate-[slideInRight_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]"
        : "animate-[slideInLeft_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]";
    }
    if (index === prevSlideIdx) {
      // Outgoing slide
      return direction === "next"
        ? "animate-[slideOutLeft_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]"
        : "animate-[slideOutRight_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]";
    }
    if (index === currentSlide) {
      return "translate-x-0 opacity-100";
    }
    return "translate-x-full opacity-0 pointer-events-none";
  };

  return (
    <>
      {/* Inject slide animation keyframes */}
      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes floatProduct {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.01); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes slideTextUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="relative w-full h-[100svh] min-h-[600px] overflow-hidden"
        onMouseEnter={() => {
          if (window.matchMedia("(hover: hover)").matches) setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHandler}
      >
        {/* Slides */}
        {slides.map((slide, index) => {
          const theme = SLIDE_THEMES[index % SLIDE_THEMES.length];
          const isActive = index === currentSlide;
          const isVisible = index === currentSlide || index === prevSlideIdx;

          if (!isVisible) return null;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full ${getSlideAnimationClass(index)}`}
              style={{ background: theme.gradient, zIndex: isActive ? 10 : 5 }}
            >
              {/* Content Container */}
              <div className="relative h-full w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-20">

                {/* Product Image — Large, Centered, Floating */}
                <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] mt-8 md:mt-0">
                  {/* Glow behind product */}
                  <div
                    className="absolute inset-0 rounded-full blur-[80px] md:blur-[120px] -z-10"
                    style={{
                      background: theme.glow,
                      animation: isActive ? "glowPulse 4s ease-in-out infinite" : "none",
                    }}
                  />
                  <div
                    style={{
                      animation: isActive ? "floatProduct 6s ease-in-out infinite" : "none",
                    }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 420px, 480px"
                    />
                  </div>
                </div>

                {/* Text Content — Below Image, Centered */}
                <div
                  className="text-center mt-6 md:mt-10 max-w-2xl mx-auto"
                  style={{
                    animation: isActive && prevSlideIdx !== -1
                      ? "slideTextUp 0.6s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both"
                      : isActive ? "none" : undefined,
                    opacity: isActive && prevSlideIdx === -1 ? 1 : undefined,
                  }}
                >
                  <span className="text-hok-champagne font-outfit uppercase tracking-[0.25em] text-[10px] sm:text-xs mb-3 block font-medium">
                    Exclusive Collection
                  </span>
                  <h1 className="font-fondamento text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-hok-espresso font-normal leading-[1.1] mb-4">
                    {slide.title}
                  </h1>
                  <p className="font-outfit text-sm sm:text-base text-hok-stone font-light mb-6 max-w-lg mx-auto leading-relaxed hidden sm:block">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.href}
                    className="inline-flex items-center gap-3 group/btn"
                  >
                    <span className="font-outfit font-medium text-xs sm:text-sm tracking-[0.2em] uppercase text-hok-espresso border-b border-hok-champagne/60 pb-1 transition-colors hover:text-hok-champagne">
                      {slide.cta}
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-hok-espresso/20 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-hok-espresso group-hover/btn:text-white group-hover/btn:border-hok-espresso">
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Controls — Centered Dots with Flanking Arrows */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 flex items-center justify-center gap-4 sm:gap-6 pointer-events-none">
          <button
            onClick={prevSlideAction}
            className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-hok-espresso hover:bg-white hover:shadow-md transition-all duration-300 active:scale-90"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() =>
                  goToSlide(idx, idx > currentSlide ? "next" : "prev")
                }
                className={`rounded-full transition-all duration-500 ${
                  currentSlide === idx
                    ? "w-8 h-2.5 bg-hok-espresso"
                    : "w-2.5 h-2.5 bg-hok-espresso/20 hover:bg-hok-espresso/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-hok-espresso hover:bg-white hover:shadow-md transition-all duration-300 active:scale-90"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Slide Counter — Bottom Right */}
        <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 z-30 font-outfit text-sm text-hok-espresso/60 select-none hidden md:flex items-center gap-2">
          <span className="font-medium text-hok-espresso">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <span className="text-hok-stone/40">/</span>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>
    </>
  );
}
