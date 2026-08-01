"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Successfully subscribed to our newsletter!");
        setEmail("");
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full bg-[#FCFAF8] text-hok-espresso border-t border-hok-mist/30">
      {/* Newsletter Band */}
      <div className="border-b border-white/10">
        <div className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-md">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                <div className="w-10 h-10 bg-hok-champagne/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-hok-champagne" />
                </div>
                <h3 className="font-fondamento text-3xl font-normal text-hok-espresso">Join The HOK Tribe</h3>
              </div>
              <p className="font-outfit text-sm text-hok-stone leading-relaxed font-light">
                Subscribe for exclusive offers, early access to new arrivals, and expert Korean skincare tips.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[400px]">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-white border-hok-mist/60 text-hok-charcoal placeholder:text-hok-stone/50 focus-visible:ring-hok-champagne font-outfit text-sm rounded-none shadow-sm"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-8 bg-hok-espresso hover:bg-hok-walnut text-white font-outfit font-medium tracking-[0.2em] uppercase text-xs transition-all duration-300 hover:shadow-lg active:scale-[0.97] whitespace-nowrap rounded-none"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="mb-5 block hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/brand/new-hok-logo-black.svg"
                alt="Home of Korean Beauty Logo"
                width={120}
                height={40}
                className="h-10"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="font-outfit text-sm text-hok-stone mb-6 max-w-xs leading-relaxed font-light">
              Nigeria's #1 destination for authentic, dermatologist-backed Korean skincare. Discover your perfect glow with our curated collection of K-beauty essentials.
            </p>

            <div className="flex gap-3">
              {[
                { href: "https://www.instagram.com/thehomeofkoreanproducts/", label: "Instagram", icon: "/instagram.svg" },
                { href: "https://www.tiktok.com/@thehomeofkoreanproducts", label: "TikTok", icon: "/tiktok.svg" },
                { href: "https://www.facebook.com/share/1EK81bfAFp/", label: "Facebook", icon: "/facebook.svg" },
                { href: "https://whatsapp.com/channel/0029VbAMxdn9hXF5cKnHxz12", label: "WhatsApp", icon: "/whatsapp.svg" },
              ].map((social) => (
                  <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-hok-mist/80 bg-white flex items-center justify-center hover:bg-hok-champagne hover:border-hok-champagne hover:scale-110 hover:-translate-y-1 transition-all duration-300 group shadow-sm"
                >
                  <Image src={social.icon} alt="" width={18} height={18} className="w-[18px] h-[18px] opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="flex flex-col">
            <h3 className="font-fondamento text-xl font-normal mb-5 text-hok-espresso">Shop</h3>
            <ul className="space-y-3 font-outfit text-sm text-hok-stone font-light">
              <li><Link href="/shop" className="footer-link hover:text-hok-champagne transition-colors duration-200">All Products</Link></li>
              <li><Link href="/shop?tags=new" className="footer-link hover:text-hok-champagne transition-colors duration-200">New Arrivals</Link></li>
              <li><Link href="/shop?tags=best-seller" className="footer-link hover:text-hok-champagne transition-colors duration-200">Best Sellers</Link></li>
              <li><Link href="/skin-algorithm" className="footer-link hover:text-hok-champagne transition-colors duration-200">Skin Quiz</Link></li>
              <li><Link href="/brands" className="footer-link hover:text-hok-champagne transition-colors duration-200">Brands</Link></li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div className="flex flex-col">
            <h3 className="font-fondamento text-xl font-normal mb-5 text-hok-espresso">Information</h3>
            <ul className="space-y-3 font-outfit text-sm text-hok-stone font-light">
              <li><Link href="/about" className="footer-link hover:text-hok-champagne transition-colors duration-200">Our Story</Link></li>
              <li><Link href="/quality-guarantee" className="footer-link hover:text-hok-champagne transition-colors duration-200">Authenticity Guarantee</Link></li>
              <li><Link href="/contact" className="footer-link hover:text-hok-champagne transition-colors duration-200">Contact Us</Link></li>
              <li><Link href="/wholesale" className="footer-link hover:text-hok-champagne transition-colors duration-200">Wholesale Program</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col">
            <h3 className="font-fondamento text-xl font-normal mb-5 text-hok-espresso">Contact</h3>
            <ul className="space-y-4 font-outfit text-sm text-hok-stone font-light">
              <li>
                <span className="block text-hok-charcoal font-medium mb-1 text-[10px] uppercase tracking-[0.2em]">Email</span>
                <a href="mailto:shop@homeofkoreanbeauty.com" className="footer-link hover:text-hok-champagne transition-colors duration-200">shop@homeofkoreanbeauty.com</a>
              </li>
              <li>
                <span className="block text-hok-charcoal font-medium mb-1 text-[10px] uppercase tracking-[0.2em]">Opening Hours </span>
                <span>Mon - Sat: 9am - 5pm</span>
              </li>
              <li>
                <span className="block text-hok-charcoal font-medium mb-1 text-[10px] uppercase tracking-[0.2em]">Phone</span>
                <a href="tel:+2349164036455" className="footer-link hover:text-hok-champagne transition-colors duration-200">+234 916 403 6455</a>
              </li>
              <li>
                <span className="block text-hok-charcoal font-medium mb-1 text-[10px] uppercase tracking-[0.2em]">Location</span>
                <span className="leading-relaxed block">Shop 043 Grace of God Plaza, Opp. Kaduna Plaza, Balogun Market, Trade Fair Complex, Lagos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-hok-mist/50 bg-white">
        <div className="w-full px-6 md:px-12 lg:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-outfit text-sm text-hok-stone font-light">
            &copy; {currentYear} Home of Korean Beauty. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-outfit text-hok-stone font-light">
            <Link href="/privacy-policy" className="footer-link hover:text-hok-espresso transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="footer-link hover:text-hok-espresso transition-colors duration-200">Terms of Service</Link>
            <Link href="/returns-policy" className="footer-link hover:text-hok-espresso transition-colors duration-200">Returns & Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
