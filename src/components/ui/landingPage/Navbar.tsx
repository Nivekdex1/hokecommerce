"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Menu, ShoppingBag, ChevronDown, Search, Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import ProductSearch from "../product-search";

// ─── Nav Data: 3 Primary Categories ───────────────────────────────────────────

interface NavColumn {
  heading: string;
  links: { title: string; href: string }[];
}

interface NavCategory {
  title: string;
  href: string;
  columns?: NavColumn[];
}

const NavCategories: NavCategory[] = [
  {
    title: "Shop",
    href: "/shop",
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
          { title: "Curated Bundles", href: "/shop?collections=curated-bundles" },
        ],
      },
    ],
  },
  {
    title: "Explore",
    href: "/skin-algorithm",
    columns: [
      {
        heading: "Discover",
        links: [
          { title: "Skin Algorithm", href: "/skin-algorithm" },
          { title: "About Us", href: "/about" },
          { title: "Quality Guarantee", href: "/quality-guarantee" },
          { title: "Contact Us", href: "/contact" },
        ],
      },
    ],
  },
  {
    title: "HOK Pro",
    href: "/wholesale",
    columns: [
      {
        heading: "Wholesale",
        links: [
          { title: "Shop Wholesale", href: "/wholesale-shop" },
          { title: "Wholesaler Terms", href: "/wholesale" },
          { title: "Join The HOK Tribe", href: "https://linktr.ee/hokbeauty" },
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
            
            {/* Left: Mobile Menu */}
            <div className="flex flex-1 lg:flex-none items-center justify-start">
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
                          <div key={cat.title} className="border-b border-hok-mist/40">
                            <SheetClose asChild>
                              <Link
                                href={cat.href}
                                className="text-[13px] font-semibold text-hok-espresso uppercase tracking-[0.15em] py-3.5 block transition-colors hover:text-hok-champagne"
                              >
                                {cat.title}
                              </Link>
                            </SheetClose>
                            {cat.columns && (
                              <div className="pb-3">
                                {cat.columns.map((col) => (
                                  <div key={col.heading} className="mb-2">
                                    <span className="text-[10px] text-hok-stone uppercase tracking-[0.2em] font-semibold block px-3 py-1">
                                      {col.heading}
                                    </span>
                                    {col.links.map((link) => (
                                      <SheetClose asChild key={link.title}>
                                        <Link
                                          href={link.href}
                                          className="text-[13px] text-hok-stone hover:text-hok-espresso transition-colors block py-1.5 px-3"
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

            {/* Center: Mobile Logo */}
            <div className="flex lg:hidden shrink-0 items-center justify-center px-4">
              <Link href="/" className="block hover:opacity-80 transition-opacity duration-300">
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

            {/* Right: Desktop Nav + Utilities */}
            <div className="flex flex-1 items-center justify-end gap-2">
              {/* Desktop Navigation — 3 categories */}
              <nav
                ref={navRef}
                className={`hidden lg:flex items-center gap-8 mr-6 transition-all duration-300 ${
                  searchOpen ? "opacity-0 w-0 overflow-hidden pointer-events-none" : "opacity-100"
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
                      className={`flex items-center gap-1 font-outfit text-[12px] font-medium tracking-[0.18em] uppercase py-2 whitespace-nowrap transition-colors duration-300 ${
                        activeDropdown === cat.title
                          ? "text-hok-champagne"
                          : "text-hok-charcoal hover:text-hok-champagne"
                      }`}
                    >
                      {cat.title}
                      {cat.columns && cat.columns.length > 1 && (
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

              {/* Icon Cluster: Search, Wishlist, Cart */}
              <div className="flex items-center gap-1">
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
          <div className="bg-white border-b border-hok-mist/40 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] animate-mega-menu-enter">
            <div className="w-full px-6 md:px-12 lg:px-16">
              <div className={`py-8 grid gap-8 ${
                activeCategory.columns.length === 1
                  ? "grid-cols-1 max-w-xs"
                  : activeCategory.columns.length === 2
                  ? "grid-cols-2 max-w-lg"
                  : activeCategory.columns.length === 3
                  ? "grid-cols-3 max-w-3xl"
                  : "grid-cols-4 max-w-5xl"
              }`}>
                {activeCategory.columns.map((col) => (
                  <div key={col.heading}>
                    <h4 className="font-outfit text-[10px] font-semibold tracking-[0.2em] uppercase text-hok-stone mb-4">
                      {col.heading}
                    </h4>
                    <ul className="space-y-1">
                      {col.links.map((link) => (
                        <li key={link.title}>
                          <Link
                            href={link.href}
                            onClick={() => setActiveDropdown(null)}
                            className="font-outfit text-[13px] text-hok-charcoal hover:text-hok-champagne transition-colors duration-200 py-1.5 block"
                          >
                            {link.title}
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
      )}
    </>
  );
}
