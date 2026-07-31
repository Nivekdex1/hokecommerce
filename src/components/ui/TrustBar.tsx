"use client";

import { ShieldCheck, Truck, Lock, Sparkles } from "lucide-react";
import React, { useState, useEffect } from "react";

const benefits = [
  {
    icon: <Sparkles className="w-5 h-5 text-hok-walnut" />,
    title: "Clear Skin & Glow",
    subtitle: "Dermatologist Formulas",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-hok-walnut" />,
    title: "100% Authentic",
    subtitle: "Sourced Direct from Korea",
  },
  {
    icon: <Truck className="w-5 h-5 text-hok-walnut" />,
    title: "Fast Delivery",
    subtitle: "Nationwide Across Nigeria",
  },
  {
    icon: <Lock className="w-5 h-5 text-hok-walnut" />,
    title: "Secure Checkout",
    subtitle: "Safe & Encrypted Payments",
  },
];

const TrustBar = () => {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  // Auto-slide loop for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMobileIndex((prev) => (prev + 1) % benefits.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white border-y border-hok-mist/60 py-6 text-hok-espresso">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* DESKTOP LAYOUT: Horizontal Icon + Text with Vertical Line Dividers */}
        <div className="hidden md:grid md:grid-cols-4 divide-x divide-hok-mist/80">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group flex items-center gap-4 px-6 py-2 transition-all duration-300 ${index === 0 ? "pl-2" : ""
                }`}
            >
              {/* Circular White Badge with Icon */}
              <div className="w-12 h-12 rounded-full bg-hok-ivory/50 border border-hok-mist/50 shadow-xs flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:border-hok-champagne">
                {benefit.icon}
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col text-left">
                <h4 className="font-playfair text-base lg:text-lg font-medium text-hok-espresso tracking-wide leading-tight group-hover:text-hok-walnut transition-colors">
                  {benefit.title}
                </h4>
                <p className="font-manrope text-[10px] lg:text-[11px] font-bold text-hok-stone/80 tracking-[0.15em] uppercase mt-0.5">
                  {benefit.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE LAYOUT: Infinite sliding feature row */}
        <div className="md:hidden relative w-full overflow-hidden py-1">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeMobileIndex * 100}%)` }}
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="min-w-full flex items-center justify-center gap-4 px-4 py-2"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-hok-mist/50 shadow-sm flex items-center justify-center shrink-0">
                  {benefit.icon}
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="font-playfair text-base font-medium text-hok-espresso tracking-wide leading-tight">
                    {benefit.title}
                  </h4>
                  <p className="font-manrope text-[10px] font-bold text-hok-stone/80 tracking-[0.15em] uppercase mt-0.5">
                    {benefit.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustBar;
