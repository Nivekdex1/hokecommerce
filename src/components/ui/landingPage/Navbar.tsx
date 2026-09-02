"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
<<<<<<< HEAD
import { Menu, ShoppingBag, ChevronDown, Search, Heart, X } from "lucide-react";
=======
import { useWishlistStore } from "@/store/useWishlistStore";
import { Menu, ShoppingCart, ChevronDown, Search, X, Heart } from "lucide-react";
>>>>>>> d9c85c2be52f1ea0099c79b0326f879c8a84c5b2
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import ProductSearch from "../product-search";

<<<<<<< HEAD
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
=======
const LeftNavLinks = [
  {
    title: "SHOP",
>>>>>>> d9c85c2be52f1ea0099c79b0326f879c8a84c5b2
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
<<<<<<< HEAD
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
=======
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [badgeBounce, setBadgeBounce] = useState(false);
>>>>>>> d9c85c2be52f1ea0099c79b0326f879c8a84c5b2
  const searchRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { totalItems } = useCartStore();
  const totalItemsCount = totalItems();
  const prevCountRef = useRef(totalItemsCount);
  const wishlistItemsCount = useWishlistStore((state) => state.items.length);

  // Trigger bounce when cart count increases
  useEffect(() => {
    if (mounted && totalItemsCount > prevCountRef.current) {
      setBadgeBounce(true);
      const timer = setTimeout(() => setBadgeBounce(false), 400);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = totalItemsCount;
  }, [totalItemsCount, mounted]);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
<<<<<<< HEAD
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
=======

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
>>>>>>> d9c85c2be52f1ea0099c79b0326f879c8a84c5b2
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

<<<<<<< HEAD
  const activeCategory = NavCategories.find((c) => c.title === activeDropdown);
=======
  const renderDesktopLink = (
    link: {
      title: string;
      href: string;
      submenu?: { title: string; href: string }[];
    },
    alignRight = false
  ) => {
    const isOpen = openDropdown === link.title;

    return (
      <div key={link.title} className="relative">
        {link.submenu ? (
          <button
            onClick={() => setOpenDropdown(isOpen ? null : link.title)}
            className="nav-link-underline flex items-center gap-1 font-outfit text-[12px] font-medium tracking-[0.2em] text-hok-charcoal hover:text-hok-champagne uppercase py-2 whitespace-nowrap transition-colors duration-300"
          >
            {link.title}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        ) : (
          <Link
            href={link.href}
            className="nav-link-underline flex items-center gap-1 font-outfit text-[12px] font-medium tracking-[0.2em] text-hok-charcoal hover:text-hok-champagne uppercase py-2 whitespace-nowrap transition-colors duration-300"
          >
            {link.title}
          </Link>
        )}
        {link.submenu && (
          <div className={`absolute top-full ${alignRight ? 'right-0' : 'left-0'} pt-3 transition-all duration-300 z-50 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
            <div className="bg-white border border-hok-mist/60 shadow-xl rounded-lg py-2 w-52 flex flex-col">
              {link.submenu.map((subItem) => (
                <Link
                  key={subItem.title}
                  href={subItem.href}
                  onClick={() => setOpenDropdown(null)}
                  className="px-5 py-2.5 text-sm font-medium text-hok-stone hover:text-hok-espresso hover:bg-hok-linen/80 transition-colors duration-200"
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
>>>>>>> d9c85c2be52f1ea0099c79b0326f879c8a84c5b2

  return (
    <>
      <header
<<<<<<< HEAD
        className={`w-full transition-all duration-500 z-50 relative ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.04)] py-3"
            : "bg-white/50 backdrop-blur-md py-4 lg:py-5 border-b border-hok-mist/30"
        }`}
=======
        className={`w-full transition-all duration-500 z-50 relative ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3" : "bg-white/40 backdrop-blur-md py-4 lg:py-6 border-b border-white/40"
          }`}
>>>>>>> d9c85c2be52f1ea0099c79b0326f879c8a84c5b2
      >
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div className="flex w-full items-center justify-between">
<<<<<<< HEAD
            
            {/* Left: Mobile Menu */}
            <div className="flex flex-1 lg:flex-none items-center justify-start">
=======

            {/* Left: Mobile Menu + Desktop Logo */}
            <div className="flex flex-1 lg:flex-none items-center justify-start gap-6 xl:gap-8">
>>>>>>> d9c85c2be52f1ea0099c79b0326f879c8a84c5b2
              {/* Mobile Menu */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
<<<<<<< HEAD
                    <button 
                      className="p-2 -ml-2 text-hok-espresso transition-all duration-200 focus-visible:outline-none"
=======
                    <button
                      className="p-2 -ml-2 text-hok-espresso rounded-md hover:bg-hok-linen active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hok-champagne"
>>>>>>> d9c85c2be52f1ea0099c79b0326f879c8a84c5b2
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
<<<<<<< HEAD
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
=======

                      {/* Mobile Wishlist Link */}
                      <div className="mb-6 px-4">
                        <SheetClose asChild>
                          <Link
                            href="/wishlist"
                            className="flex items-center gap-3 py-3 px-4 bg-white rounded-lg shadow-sm border border-hok-mist/30 text-hok-espresso hover:text-hok-walnut transition-colors group"
                          >
                            <div className="relative">
                              <Heart className="w-5 h-5 group-hover:fill-hok-champagne/20 transition-all" />
                              {mounted && wishlistItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-hok-error text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                                  {wishlistItemsCount}
                                </span>
                              )}
                            </div>
                            <span className="font-outfit font-medium text-sm tracking-[0.1em] uppercase">My Wishlist</span>
                          </Link>
                        </SheetClose>
                      </div>

                      <nav className="flex flex-col gap-1 font-outfit">
                        {AllNavLinks.map((link) => (
                          <div key={link.title} className="flex flex-col">
                            {link.submenu ? (
                              <SheetClose asChild>
                                <Link
                                  href={link.href}
                                  className="text-sm font-bold text-hok-espresso uppercase tracking-wider py-3 border-b border-hok-mist/50 block hover:text-hok-walnut transition-colors flex items-center justify-between"
                                >
                                  {link.title}
                                </Link>
                              </SheetClose>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={link.href}
                                  className="text-sm font-bold text-hok-espresso uppercase tracking-wider py-3 border-b border-hok-mist/50 block hover:text-hok-walnut transition-colors"
                                >
                                  {link.title}
                                </Link>
                              </SheetClose>
                            )}
                            {link.submenu && (
                              <div className="flex flex-col py-2 pl-4 mb-1">
                                {link.submenu.map((subItem) => (
                                  <SheetClose asChild key={subItem.title}>
                                    <Link
                                      href={subItem.href}
                                      className="text-sm text-hok-stone hover:text-hok-walnut transition-colors block py-2"
                                    >
                                      {subItem.title}
                                    </Link>
                                  </SheetClose>
>>>>>>> d9c85c2be52f1ea0099c79b0326f879c8a84c5b2
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

<<<<<<< HEAD
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
                <Link
                  href="/shop"
                  className="p-2 text-hok-espresso hover:text-hok-champagne transition-colors duration-200"
                  aria-label="Wishlist"
                >
                  <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </Link>

                {/* Cart */}
                <div className="relative">
                  <Link
                    href="/cart"
                    className="relative text-hok-espresso hover:text-hok-champagne transition-colors duration-200 p-2 block"
                  >
                    <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    <span className="sr-only">Cart</span>
                    {mounted && totalItemsCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-hok-champagne text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                        {totalItemsCount}
=======
              {/* Search Icon (Desktop) */}
              <div className="hidden lg:block relative" ref={searchRef}>
                {searchOpen ? (
                  <div className="w-72 lg:w-96 animate-in fade-in zoom-in-95 duration-300">
                    <ProductSearch autoFocus />
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-hok-espresso hover:text-hok-walnut hover:bg-hok-linen rounded-md transition-all duration-200 active:scale-95"
                    aria-label="Search products"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Wishlist Icon */}
                <div className="relative">
                  <Link href="/wishlist" className="relative text-hok-espresso hover:text-hok-walnut transition-all duration-200 active:scale-95 group p-2 block">
                    <Heart className="w-5 h-5 lg:w-[22px] lg:h-[22px] transition-transform duration-300 group-hover:scale-110" />
                    <span className="sr-only">Wishlist</span>
                    {mounted && wishlistItemsCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-hok-error text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in">
                        {wishlistItemsCount}
>>>>>>> d9c85c2be52f1ea0099c79b0326f879c8a84c5b2
                      </span>
                    )}
                  </Link>
                </div>
<<<<<<< HEAD
=======

                {/* Cart Icon */}
                <div className="relative">
                  <button
                    onClick={() => useCartStore.getState().setOpen(true)}
                    className="relative text-hok-espresso hover:text-hok-walnut transition-all duration-200 active:scale-95 group p-2 block"
                  >
                    <ShoppingCart className="w-5 h-5 lg:w-[22px] lg:h-[22px] transition-transform duration-300 group-hover:scale-110" />
                    <span className="sr-only">Cart</span>
                    {mounted && totalItemsCount > 0 && (
                      <span className={`absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-hok-champagne text-white text-[10px] font-bold flex items-center justify-center rounded-full ${badgeBounce ? 'animate-badge-bounce' : ''}`}>
                        {totalItemsCount}
                      </span>
                    )}
                  </button>
                </div>
>>>>>>> d9c85c2be52f1ea0099c79b0326f879c8a84c5b2
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
