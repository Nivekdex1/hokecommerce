"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { Menu, ShoppingCart, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductSearch from "../product-search";
import AnnouncementBar from "../AnnouncementBar";

const NavLinks = [
  { title: "SHOP", href: "/shop" },
  {
    title: "BRANDS",
    href: "/brands",
    submenu: [
      { title: "Cosrx", href: "/shop?vendors=cosrx" },
      { title: "Derma Factory", href: "/shop?vendors=derma-factory" },
      { title: "Lizara", href: "/shop?vendors=lizara" },
      { title: "12 Grabs", href: "/shop?vendors=12-grabs" },
      { title: "Anua", href: "/shop?vendors=anua" },
    ],
  },
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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <>
      <AnnouncementBar />
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex w-full items-center justify-between">
            
            {/* Mobile Menu & Search */}
            <div className="flex items-center gap-4 lg:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-hok-espresso -ml-2">
                    <Menu className="w-6 h-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] border-r-0 bg-hok-linen p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex flex-col h-full p-6">
                    <Link href="/" onClick={() => setOpen(false)} className="mb-8">
                      <Image src="/brand/new-hok-logo-black.svg" alt="HOK Logo" width={80} height={80} />
                    </Link>
                    <div className="mb-8">
                      <ProductSearch />
                    </div>
                    <nav className="flex flex-col gap-6 font-manrope">
                      {NavLinks.map((link) => (
                        <div key={link.title} className="flex flex-col">
                          <Link
                            href={link.href}
                            className="text-lg font-semibold text-hok-espresso uppercase tracking-wide mb-2"
                            onClick={() => !link.submenu && setOpen(false)}
                          >
                            {link.title}
                          </Link>
                          {link.submenu && (
                            <div className="flex flex-col gap-3 pl-4 border-l-2 border-hok-champagne/30">
                              {link.submenu.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
                                  className="text-sm font-medium text-hok-stone hover:text-hok-walnut transition-colors"
                                  onClick={() => setOpen(false)}
                                >
                                  {subItem.title}
                                </Link>
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 w-1/3">
              {NavLinks.slice(0, 2).map((link) => (
                <div key={link.title} className="relative group">
                  <Link 
                    href={link.href}
                    className="flex items-center gap-1 font-manrope text-sm font-semibold tracking-wider text-hok-espresso hover:text-hok-walnut uppercase py-2"
                  >
                    {link.title}
                    {link.submenu && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                  </Link>
                  {link.submenu && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="bg-white border border-hok-mist shadow-xl rounded-md py-3 w-48 flex flex-col">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="px-5 py-2 text-sm font-medium text-hok-stone hover:text-hok-espresso hover:bg-hok-linen transition-colors"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Logo */}
            <div className="flex justify-center w-1/3">
              <Link href="/">
                <Image
                  src="/brand/new-hok-logo-black.svg"
                  alt="HOK Logo"
                  width={scrolled ? 50 : 64}
                  height={scrolled ? 50 : 64}
                  className="transition-all duration-300"
                />
              </Link>
            </div>

            {/* Right Desktop Nav & Utilities */}
            <div className="flex items-center justify-end gap-6 w-1/3">
              <div className="hidden lg:flex items-center gap-8 mr-4">
                {NavLinks.slice(2).map((link) => (
                  <div key={link.title} className="relative group">
                    <Link 
                      href={link.href}
                      className="flex items-center gap-1 font-manrope text-sm font-semibold tracking-wider text-hok-espresso hover:text-hok-walnut uppercase py-2"
                    >
                      {link.title}
                      {link.submenu && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                    </Link>
                    {link.submenu && (
                      <div className="absolute top-full right-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                        <div className="bg-white border border-hok-mist shadow-xl rounded-md py-3 w-56 flex flex-col">
                          {link.submenu.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="px-5 py-2 text-sm font-medium text-hok-stone hover:text-hok-espresso hover:bg-hok-linen transition-colors"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Search */}
              <div className="hidden lg:block">
                <ProductSearch />
              </div>

              {/* Cart icon */}
              <div className="relative">
                <Link href="/cart" className="relative text-hok-espresso hover:text-hok-walnut transition-colors group p-2 block">
                  <ShoppingCart className="w-6 h-6 transition-transform group-hover:scale-110" />
                  <span className="sr-only">Cart</span>
                  {mounted && totalItemsCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-hok-champagne text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in">
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
