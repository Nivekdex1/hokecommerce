"use client";

import { ShieldCheck, Truck, Lock, Sparkles } from "lucide-react";
import React, { useState, useEffect } from "react";

const benefits = [
  {
    icon: <Sparkles className="w-4 h-4 text-hok-champagne" />,
    title: "Clear Skin & Glow",
    subtitle: "Dermatologist Formulas",
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-hok-champagne" />,
    title: "100% Authentic",
    subtitle: "Sourced Direct from Korea",
  },
  {
    icon: <Truck className="w-4 h-4 text-hok-champagne" />,
    title: "Fast Delivery",
    subtitle: "Nationwide Across Nigeria",
  },
  {
    icon: <Lock className="w-4 h-4 text-hok-champagne" />,
    title: "Secure Checkout",
    subtitle: "Safe & Encrypted Payments",
  },
];

const TrustBar = () => {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMobileIndex((prev) => (prev + 1) % benefits.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white border-b border-hok-mist/40 py-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* DESKTOP */}
        <div className="hidden md:flex items-center justify-between">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-full bg-hok-champagne/8 flex items-center justify-center shrink-0">
                {benefit.icon}
              </div>
              <div className="flex flex-col">
                <h4 className="font-outfit text-sm font-medium text-hok-charcoal leading-tight">
                  {benefit.title}
                </h4>
                <p className="font-outfit text-[10px] text-hok-stone tracking-[0.1em] uppercase mt-0.5 font-light">
                  {benefit.subtitle}
                </p>
              </div>
              {index < benefits.length - 1 && (
                <div className="w-px h-8 bg-hok-mist/60 ml-6" />
              )}
            </div>
          ))}
        </div>

        {/* MOBILE */}
        <div className="md:hidden relative w-full overflow-hidden py-1">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeMobileIndex * 100}%)` }}
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="min-w-full flex items-center justify-center gap-3 px-4"
              >
                <div className="w-8 h-8 rounded-full bg-hok-champagne/8 flex items-center justify-center shrink-0">
                  {benefit.icon}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-outfit text-sm font-medium text-hok-charcoal leading-tight">
                    {benefit.title}
                  </h4>
                  <p className="font-outfit text-[10px] text-hok-stone tracking-[0.1em] uppercase mt-0.5 font-light">
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
