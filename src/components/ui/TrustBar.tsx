import { ShieldCheck, Truck, Lock, Sparkles } from "lucide-react";
import React from "react";

const TrustBar = () => {
  const benefits = [
    {
      icon: <Sparkles className="w-5 h-5 text-hok-champagne" />,
      title: "Clear Skin & Instant Glow",
      subtitle: "Dermatologist-backed formulas",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-hok-champagne" />,
      title: "100% Authentic",
      subtitle: "Sourced directly from Korea",
    },
    {
      icon: <Truck className="w-5 h-5 text-hok-champagne" />,
      title: "Fast Delivery",
      subtitle: "Nationwide across Nigeria",
    },
    {
      icon: <Lock className="w-5 h-5 text-hok-champagne" />,
      title: "Secure Checkout",
      subtitle: "Safe & encrypted payments",
    },
  ];

  return (
    <div className="w-full bg-hok-espresso text-white py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-hok-walnut">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center ${
                index > 0 ? "pt-6 md:pt-0" : ""
              } md:px-4`}
            >
              <div className="bg-white/10 p-3 rounded-full mb-3">
                {benefit.icon}
              </div>
              <h4 className="font-playfair font-medium text-sm md:text-base tracking-wide mb-1">
                {benefit.title}
              </h4>
              <p className="text-xs text-hok-mist/80 font-light hidden md:block">
                {benefit.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
