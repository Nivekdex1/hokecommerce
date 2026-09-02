"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Menu, ShoppingBag, ChevronDown, Search, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import ProductSearch from "../product-search";

// ─── Nav Data: 3 Primary Categories with Rich Content ─────────────────────────

interface NavLinkItem {
  title: string;
  href: string;
  description?: string;
}

interface NavColumn {
  heading: string;
  links: NavLinkItem[];
}

interface NavFeatureCard {
  tag?: string;
  title: string;
  description: string;
  href: string;
  ctaText: string;
}

interface NavCategory {
  title: string;
  href: string;
  columns?: NavColumn[];
  featureCard?: NavFeatureCard;
}

const NavCategories: NavCategory[] = [
  {
    title: "Shop",
    href: "/shop",
    featureCard: {
      tag: "CURATED ROUTINES",
      title: "Glass Skin Sets",
      description: "Dermatologist-selected Korean routines for deep hydration and radiance.",
      href: "/shop?collections=curated-bundles",
      ctaText: "Shop Bundles",
    },
    columns: [
      {
        heading: "By Type",
        links: [
          { title: "All Products", href: "/shop" },
          { title: "Cleansers", href: "/shop?category=Cleanser" },
          { title: "Toners", href: "/shop?category=Toner" },
          { title: "Serums", href: "/shop?category=Serum" },
          { title: "Moisturizers", href: "/shop?category=Moisturizer" },
        ],
      },
      {
        heading: "By Concern",
        links: [
          { title: "Dry Skin", href: "/shop?collections=dry-skin" },
          { title: "Oily Skin", href: "/shop?collections=oily-skin" },
          { title: "Hyperpigmentation", href: "/shop?collections=hyperpigmentation" },
          { title: "Acne & Blemishes", href: "/shop?collections=acne-blemishes" },
        ],
      },
      {
        heading: "By Brand",
        links: [
          { title: "CeraVe", href: "/shop?vendors=cerave" },
          { title: "COSRX", href: "/shop?vendors=cosrx" },
          { title: "Anua", href: "/shop?vendors=anua" },
          { title: "Eucerin", href: "/shop?vendors=eucerin" },
          { title: "Derma Factory", href: "/shop?vendors=derma-factory" },
          { title: "All Brands →", href: "/brands" },
        ],
      },
      {
        heading: "Featured",
        links: [
          { title: "Best Sellers", href: "/shop?tags=best-seller" },
          { title: "New Arrivals", href: "/shop?sort=newest" },
          { title: "Skin Algorithm", href: "/skin-algorithm" },
        ],
      },
    ],
  },
  {
    title: "Explore",
    href: "/skin-algorithm",
    featureCard: {
      tag: "PERSONALIZED CARE",
      title: "The Skin Algorithm",
      description: "Take our 2-minute diagnostic quiz for tailored Korean skincare recommendations.",
      href: "/skin-algorithm",
      ctaText: "Take The Quiz",
    },
    columns: [
      {
        heading: "Our Story & Values",
        links: [
          { title: "About HOK", href: "/about", description: "Our sourcing & authenticity promise" },
          { title: "Quality Guarantee", href: "/quality-guarantee", description: "100% verified Korean skincare" },
          { title: "Brand Partners", href: "/brands", description: "Official distribution network" },
        ],
      },
      {
        heading: "Client Care",
        links: [
          { title: "Skin Algorithm Quiz", href: "/skin-algorithm", description: "Find your ideal routine" },
          { title: "Contact Us", href: "/contact", description: "Inquiries & skincare consultations" },
          { title: "Returns & Shipping", href: "/returns-policy", description: "Delivery across Nigeria" },
        ],
      },
    ],
  },
  {
    title: "HOK Pro",
    href: "/wholesale",
    featureCard: {
      tag: "B2B WHOLESALE",
      title: "Grow Your Beauty Business",
      description: "Official wholesale pricing and direct Korean supply for beauty businesses across Nigeria.",
      href: "/wholesale",
      ctaText: "Apply For HOK Pro",
    },
    columns: [
      {
        heading: "Wholesale Portal",
        links: [
          { title: "Shop Wholesale", href: "/wholesale-shop", description: "Browse bulk catalog & pricing" },
          { title: "Wholesale Terms", href: "/wholesale", description: "MOQs, tiers & partner policies" },
          { title: "Request a Quote", href: "/wholesale", description: "Custom volume inquiries" },
        ],
      },
      {
        heading: "Community & Support",
        links: [
          { title: "Join The HOK Tribe", href: "https://linktr.ee/hokbeauty", description: "Connect with our retailer network" },
          { title: "Book a Store Tour", href: "/wholesale", description: "Visit our Lagos showroom" },
          { title: "Quality Guarantee", href: "/quality-guarantee", description: "Authentic distributor stock" },
        ],
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { totalItems } = useCartStore();
  const totalCartCount = totalItems();

  const { totalItems: totalWishlistItems } = useWishlistStore();
  const totalWishlistCount = totalWishlistItems();

  useEffect(() => {
    setMounted(true);
    useCartStore.persist?.rehydrate?.();
    useWishlistStore.persist?.rehydrate?.();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // Hover handlers with debounce to prevent flicker
  const handleMouseEnter = useCallback((title: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(title);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const activeCategory = NavCategories.find((c) => c.title === activeDropdown);

  return (
    <>
      <header
        className={`w-full transition-all duration-500 z-50 relative ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.04)] py-3"
            : "bg-white/50 backdrop-blur-md py-4 lg:py-5 border-b border-hok-mist/30"
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div className="flex w-full items-center justify-between">
            
            {/* Left: Desktop Logo & Mobile Menu */}
            <div className="flex flex-1 items-center justify-start">
              {/* Mobile Menu */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <button 
                      className="p-2 -ml-2 text-hok-espresso transition-all duration-200 focus-visible:outline-none"
                      aria-label="Toggle menu"
                    >
                      <Menu className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] border-r-0 bg-white p-0">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <div className="flex flex-col h-full p-6 overflow-y-auto hide-scrollbar">
                      <SheetClose asChild>
                        <Link href="/" className="mb-8 block w-fit">
                          <Image src="/brand/new-hok-logo-black.svg" alt="HOK Logo" width={120} height={40} className="h-10" style={{ width: "auto" }} />
                        </Link>
                      </SheetClose>
                      <div className="mb-6">
                        <ProductSearch />
                      </div>
                      <nav className="flex flex-col font-outfit">
                        {NavCategories.map((cat) => (
                          <div key={cat.title} className="border-b border-hok-mist/40 py-2">
                            <SheetClose asChild>
                              <Link
                                href={cat.href}
                                className="text-[13px] font-semibold text-hok-espresso uppercase tracking-[0.15em] py-2 block transition-colors hover:text-hok-champagne"
                              >
                                {cat.title}
                              </Link>
                            </SheetClose>
                            {cat.columns && (
                              <div className="pb-2">
                                {cat.columns.map((col) => (
                                  <div key={col.heading} className="mb-2">
                                    <span className="text-[10px] text-hok-stone uppercase tracking-[0.2em] font-semibold block px-2 py-1">
                                      {col.heading}
                                    </span>
                                    {col.links.map((link) => (
                                      <SheetClose asChild key={link.title}>
                                        <Link
                                          href={link.href}
                                          className="text-[13px] text-hok-stone hover:text-hok-espresso transition-colors block py-1 px-2"
                                        >
                                          {link.title}
                                        </Link>
                                      </SheetClose>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop Logo */}
              <Link href="/" className="hidden lg:block hover:opacity-80 transition-opacity duration-300">
                <Image
                  src="/brand/new-hok-logo-black.svg"
                  alt="HOK Logo"
                  width={110}
                  height={36}
                  className="transition-all duration-500 h-9"
                  style={{ width: "auto" }}
                  priority
                />
              </Link>
            </div>

            {/* Center: Desktop 3 Nav Links (Centered) & Mobile Logo */}
            <div className="flex items-center justify-center">
              {/* Mobile Logo */}
              <Link href="/" className="flex lg:hidden shrink-0 items-center justify-center px-4 hover:opacity-80 transition-opacity duration-300">
                <Image
                  src="/brand/new-hok-logo-black.svg"
                  alt="HOK Logo"
                  width={110}
                  height={36}
                  className="transition-all duration-500 h-9"
                  style={{ width: "auto" }}
                  priority
                />
              </Link>

              {/* Desktop Navigation — 3 Centered Categories with Carets */}
              <nav
                ref={navRef}
                className={`hidden lg:flex items-center justify-center gap-10 xl:gap-14 transition-all duration-300 ${
                  searchOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                {NavCategories.map((cat) => (
                  <div
                    key={cat.title}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(cat.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={cat.href}
                      className={`flex items-center gap-1.5 font-outfit text-[12px] font-medium tracking-[0.2em] uppercase py-2 whitespace-nowrap transition-colors duration-300 ${
                        activeDropdown === cat.title
                          ? "text-hok-champagne"
                          : "text-hok-charcoal hover:text-hok-champagne"
                      }`}
                    >
                      {cat.title}
                      {cat.columns && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ${
                            activeDropdown === cat.title ? "rotate-180" : ""
                          }`}
                          strokeWidth={1.5}
                        />
                      )}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>

            {/* Right: Desktop & Mobile Utilities */}
            <div className="flex flex-1 items-center justify-end gap-1.5">
              {/* Search */}
              <div className="hidden lg:block relative" ref={searchRef}>
                {searchOpen ? (
                  <div className="w-64 lg:w-80 animate-in fade-in zoom-in-95 duration-200">
                    <ProductSearch autoFocus />
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-hok-espresso hover:text-hok-champagne transition-colors duration-200"
                    aria-label="Search products"
                  >
                    <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </button>
                )}
              </div>

              {/* Wishlist */}
              <div className="relative">
                <Link
                  href="/wishlist"
                  className="relative text-hok-espresso hover:text-hok-champagne transition-colors duration-200 p-2 block"
                  aria-label="Wishlist"
                >
                  <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  {mounted && totalWishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-hok-champagne text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                      {totalWishlistCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Cart */}
              <div className="relative">
                <Link
                  href="/cart"
                  className="relative text-hok-espresso hover:text-hok-champagne transition-colors duration-200 p-2 block"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  <span className="sr-only">Cart</span>
                  {mounted && totalCartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-hok-champagne text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                      {totalCartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </header>

      {/* ─── Mega Menu Dropdown Panel ─────────────────────────────────────── */}
      {activeCategory && activeCategory.columns && (
        <div
          className="fixed left-0 right-0 z-40"
          style={{ top: scrolled ? "57px" : "65px" }}
          onMouseEnter={() => handleMouseEnter(activeCategory.title)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/5 -z-10" onClick={() => setActiveDropdown(null)} />
          
          {/* Panel */}
          <div className="bg-white border-b border-hok-mist/40 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.08)] animate-mega-menu-enter">
            <div className="w-full px-6 md:px-12 lg:px-16 flex justify-center">
              <div className="py-8 flex flex-col lg:flex-row gap-10 w-full max-w-6xl items-stretch justify-between">
                
                {/* Left Highlight / Feature Card */}
                {activeCategory.featureCard && (
                  <div className="w-full lg:w-72 shrink-0 bg-[#FAF8F5] border border-hok-mist/50 rounded-xl p-6 flex flex-col justify-between group hover:border-hok-champagne/40 transition-all duration-300 shadow-sm">
                    <div>
                      {activeCategory.featureCard.tag && (
                        <span className="text-[9px] font-outfit font-semibold tracking-[0.2em] uppercase text-hok-champagne mb-2.5 block">
                          {activeCategory.featureCard.tag}
                        </span>
                      )}
                      <h4 className="font-fondamento text-2xl text-hok-espresso font-normal mb-2.5 leading-snug">
                        {activeCategory.featureCard.title}
                      </h4>
                      <p className="font-outfit text-xs text-hok-stone font-light leading-relaxed mb-6">
                        {activeCategory.featureCard.description}
                      </p>
                    </div>
                    <Link
                      href={activeCategory.featureCard.href}
                      onClick={() => setActiveDropdown(null)}
                      className="inline-flex items-center gap-2 text-xs font-outfit font-medium text-hok-espresso hover:text-hok-champagne transition-colors group-hover:translate-x-0.5 transform duration-200 uppercase tracking-wider"
                    >
                      <span>{activeCategory.featureCard.ctaText}</span>
                      <span className="text-hok-champagne text-sm font-normal">→</span>
                    </Link>
                  </div>
                )}

                {/* Columns */}
                <div className={`grid gap-8 flex-1 w-full ${
                  activeCategory.columns.length === 2
                    ? "grid-cols-2"
                    : activeCategory.columns.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-4"
                }`}>
                  {activeCategory.columns.map((col) => (
                    <div key={col.heading}>
                      <h4 className="font-outfit text-[10px] font-semibold tracking-[0.2em] uppercase text-hok-stone mb-4">
                        {col.heading}
                      </h4>
                      <ul className="space-y-2">
                        {col.links.map((link) => (
                          <li key={link.title}>
                            <Link
                              href={link.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group/link block py-1"
                            >
                              <span className="font-outfit text-[13px] text-hok-charcoal group-hover/link:text-hok-champagne transition-colors duration-200 block font-normal">
                                {link.title}
                              </span>
                              {link.description && (
                                <span className="font-outfit text-[11px] text-hok-stone font-light block leading-tight mt-0.5">
                                  {link.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
