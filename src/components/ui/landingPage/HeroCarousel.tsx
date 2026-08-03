"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./HeroCarousel.module.css";
import Image from "next/image";

export type HeroSlide = {
  id: string | number;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
  mobileImage?: string;
  bgColor?: string;
};

// Toggle this to true to use Approach 1 (Single wide image filling the screen using object-fit: cover)
// Set to false to use Approach 2 (Separate desktop and mobile images using object-fit: contain)
export const USE_SINGLE_COVER_IMAGE = false;

// Define some rich gradients and accents for the HOK slides to emulate renket.org
const SLIDE_THEMES = [
  { bg: "linear-gradient(135deg, #FFF9F0 0%, #FAE8D4 40%, #F5D5B8 100%)", accent: "#D4A853", badge: "NEW ARRIVAL" },
  { bg: "linear-gradient(135deg, #F0F4FF 0%, #D6E4FF 40%, #BDD4FF 100%)", accent: "#6B9BFF", badge: "BESTSELLER" },
  { bg: "linear-gradient(135deg, #FFF0F0 0%, #FFD6D6 40%, #FFBDBD 100%)", accent: "#FF8A8A", badge: "PREMIUM" },
  { bg: "linear-gradient(135deg, #F0FFF4 0%, #D4F5DC 40%, #B8EBCA 100%)", accent: "#5CB87A", badge: "PURE & GENTLE" },
];



export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slide = slides[current];
  const theme = SLIDE_THEMES[current % SLIDE_THEMES.length];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section
      className={styles.carousel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id="hero-carousel"
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          className={styles.slide}
          style={{ background: theme.bg }}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className={styles.imageSide}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          >
            <div className={styles.imageWrapper}>
              {USE_SINGLE_COVER_IMAGE ? (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={current === 0}
                  className={styles.productImage}
                  style={{ objectFit: "cover", objectPosition: "center center" }}
                  sizes="100vw"
                />
              ) : slide.mobileImage ? (
                <>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={current === 0}
                    className={`${styles.productImage} hidden md:block`}
                    style={{ objectFit: "cover", objectPosition: "center center" }}
                    sizes="100vw"
                  />
                  <Image
                    src={slide.mobileImage}
                    alt={slide.title}
                    fill
                    priority={current === 0}
                    className={`${styles.productImage} block md:hidden`}
                    style={{ objectFit: "cover", objectPosition: "center center" }}
                    sizes="100vw"
                  />
                </>
              ) : (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={current === 0}
                  className={styles.productImage}
                  style={{ objectFit: "cover", objectPosition: "center center" }}
                  sizes="100vw"
                />
              )}
              <div
                className={styles.imageGlow}
                style={{ background: theme.accent }}
              />
            </div>
          </motion.div>

        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className={styles.navControls}>
        <button
          onClick={prev}
          className={styles.navBtn}
          aria-label="Previous slide"
          id="carousel-prev"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ""
                }`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              id={`carousel-dot-${i}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className={styles.navBtn}
          aria-label="Next slide"
          id="carousel-next"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <Link href={slide.href} className={styles.ctaBtn}>
          {slide.cta}
          <span className={styles.ctaIconWrapper}>
            <ArrowRight className={styles.ctaIcon} />
          </span>
        </Link>
      </div>

      {/* Slide counter */}
      <div className={styles.counter}>
        <span className={styles.counterCurrent}>
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className={styles.counterSep}>/</span>
        <span className={styles.counterTotal}>
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
