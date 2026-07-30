import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-hok-espresso text-hok-ivory">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Socials (takes up 2 columns on lg screens) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="mb-6 block">
              <Image
                src="/brand/new-hok-logo-white.svg"
                alt="Home of Korean Beauty Logo"
                width={120}
                height={40}
                className="w-auto h-10 hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="font-manrope text-sm text-hok-mist/80 mb-8 max-w-xs leading-relaxed">
              Nigeria's #1 destination for authentic, dermatologist-backed Korean skincare. Discover your perfect glow with our curated collection of K-beauty essentials.
            </p>
            
            <div className="flex gap-4">
              <Link href="https://www.instagram.com/thehomeofkoreanproducts/" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-hok-champagne hover:scale-110 hover:-translate-y-1 transition-all duration-300 group">
                <Image src="/instagram.svg" alt="" width={20} height={20} className="w-5 h-5 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="https://www.tiktok.com/@thehomeofkoreanproducts" aria-label="TikTok" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-hok-champagne hover:scale-110 hover:-translate-y-1 transition-all duration-300 group">
                <Image src="/tiktok.svg" alt="" width={20} height={20} className="w-5 h-5 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="https://www.facebook.com/share/1EK81bfAFp/" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-hok-champagne hover:scale-110 hover:-translate-y-1 transition-all duration-300 group">
                <Image src="/facebook.svg" alt="" width={20} height={20} className="w-5 h-5 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="https://whatsapp.com/channel/0029VbAMxdn9hXF5cKnHxz12" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-hok-champagne hover:scale-110 hover:-translate-y-1 transition-all duration-300 group">
                <Image src="/whatsapp.svg" alt="" width={20} height={20} className="w-5 h-5 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="flex flex-col">
            <h3 className="font-playfair text-xl font-medium mb-6 text-hok-champagne">Shop</h3>
            <ul className="space-y-4 font-manrope text-sm text-hok-mist/80">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/shop?tags=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?tags=best-seller" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="/skin-algorithm" className="hover:text-white transition-colors">Skin Quiz</Link></li>
              <li><Link href="/brands" className="hover:text-white transition-colors">Brands</Link></li>
            </ul>
          </div>

          {/* Column 3: About & Support */}
          <div className="flex flex-col">
            <h3 className="font-playfair text-xl font-medium mb-6 text-hok-champagne">Information</h3>
            <ul className="space-y-4 font-manrope text-sm text-hok-mist/80">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/quality-guarantee" className="hover:text-white transition-colors">Authenticity Guarantee</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/wholesale" className="hover:text-white transition-colors">Wholesale Program</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col">
            <h3 className="font-playfair text-xl font-medium mb-6 text-hok-champagne">Contact</h3>
            <ul className="space-y-4 font-manrope text-sm text-hok-mist/80">
              <li>
                <span className="block text-white font-medium mb-1">Email</span>
                <a href="mailto:shop@homeofkoreanbeauty.com" className="hover:text-white transition-colors">shop@homeofkoreanbeauty.com</a>
              </li>
              <li>
                <span className="block text-white font-medium mb-1">WhatsApp</span>
                <span>Available Mon - Sat</span>
              </li>
              <li>
                <span className="block text-white font-medium mb-1">Location</span>
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-manrope text-sm text-hok-mist/60">
            &copy; {currentYear} Home of Korean Beauty. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-manrope text-hok-mist/60">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/returns-policy" className="hover:text-white transition-colors">Returns & Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
