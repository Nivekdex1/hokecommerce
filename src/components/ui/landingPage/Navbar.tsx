"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { Menu, ShoppingCart, ChevronDown, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ProductSearch from "../product-search";

const LeftNavLinks = [
  { 
    title: "SHOP", 
    href: "/shop",
    submenu: [
      { title: "All Products", href: "/shop" },
      { title: "Cleansers", href: "/shop?category=cleansers" },
      { title: "Toners", href: "/shop?category=toner" },
      { title: "Dark Spots & Hyperpigmentation", href: "/shop?collections=hyperpigmentation" },
      { title: "Acne & Blemishes", href: "/shop?collections=acne" },
      { title: "Dullness & Radiance", href: "/shop?collections=glow" },
      { title: "Firming & Anti-Aging", href: "/shop?collections=anti-aging" },
    ]
  },
  {
    title: "BRANDS",
    href: "/brands",
    submenu: [
      { title: "All Brands", href: "/brands" },
      { title: "12 Grabs", href: "/shop?vendors=12-grabs" },
      { title: "Anua", href: "/shop?vendors=anua" },
      { title: "CeraVe", href: "/shop?vendors=cerave" },
      { title: "Cosrx", href: "/shop?vendors=cosrx" },
      { title: "Derma Factory", href: "/shop?vendors=derma-factory" },
      { title: "Doris", href: "/shop?vendors=doris" },
      { title: "Eucerin", href: "/shop?vendors=eucerin" },
      { title: "Jigott", href: "/shop?vendors=jigott" },
      { title: "La Roche-Posay", href: "/shop?vendors=la-roche-posay" },
      { title: "Lizara", href: "/shop?vendors=lizara" },
    ],
  },
];

const RightNavLinks = [
  {
    title: "HOK PRO",
    href: "/wholesale",
    submenu: [
      { title: "Shop Wholesale", href: "/wholesale-shop" },
      { title: "Wholesaler Terms", href: "/wholesale" },
      { title: "Join The HOK Tribe", href: "https://linktr.ee/hokbeauty" },
    ],
  },
  { title: "SKIN ALGORITHM", href: "/skin-algorithm" },
  { title: "ABOUT US", href: "/about" },
];

const AllNavLinks = [...LeftNavLinks, ...RightNavLinks];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { totalItems } = useCartStore();
  const totalItemsCount = totalItems();

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

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

  return (
    <>
      <header 
        className={`w-full transition-all duration-500 z-50 relative ${
          scrolled ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3" : "bg-white/40 backdrop-blur-md py-4 lg:py-6 border-b border-white/40"
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex w-full items-center justify-between">
            
            {/* Left: Mobile Menu + Desktop Logo */}
            <div className="flex flex-1 lg:flex-none items-center justify-start gap-6 xl:gap-8">
              {/* Mobile Menu */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <button 
                      className="p-2 -ml-2 text-hok-espresso rounded-md hover:bg-hok-linen active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hok-champagne"
                      aria-label="Toggle menu"
                    >
                      <Menu className="w-6 h-6" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] border-r-0 bg-hok-linen p-0">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <div className="flex flex-col h-full p-6 overflow-y-auto hide-scrollbar">
                      <SheetClose asChild>
                        <Link href="/" className="mb-8 block w-fit">
                          <Image src="/brand/new-hok-logo-black.svg" alt="HOK Logo" width={135} height={45} className="h-12" style={{ width: "auto" }} />
                        </Link>
                      </SheetClose>
                      <div className="mb-8">
                        <ProductSearch />
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

              {/* Desktop Left Logo */}
              <Link href="/" className="hidden lg:block hover:opacity-80 transition-opacity duration-300">
                <Image
                  src="/brand/new-hok-logo-black.svg"
                  alt="HOK Logo"
                  width={120}
                  height={40}
                  className="transition-all duration-500 h-10 md:h-12"
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
                  width={120}
                  height={40}
                  className="transition-all duration-500 h-10 md:h-12"
                  style={{ width: "auto" }}
                  priority
                />
              </Link>
            </div>

            {/* Right: Desktop Nav + Utilities */}
            <div className="flex flex-1 items-center justify-end gap-4 lg:gap-6">
              {/* Desktop Right Navigation (All Links) */}
              <nav className={`hidden lg:flex items-center gap-6 xl:gap-8 mr-2 xl:mr-4 transition-all duration-300 ${searchOpen ? 'opacity-0 w-0 overflow-hidden pointer-events-none' : 'opacity-100'}`} ref={dropdownRef}>
                {AllNavLinks.map((link) => renderDesktopLink(link))}
              </nav>

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

              {/* Cart Icon */}
              <div className="relative">
                <Link href="/cart" className="relative text-hok-espresso hover:text-hok-walnut transition-all duration-200 active:scale-95 group p-2 block">
                  <ShoppingCart className="w-5 h-5 lg:w-[22px] lg:h-[22px] transition-transform duration-300 group-hover:scale-110" />
                  <span className="sr-only">Cart</span>
                  {mounted && totalItemsCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-hok-champagne text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in">
                      {totalItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </header>
    </>
  );
}
