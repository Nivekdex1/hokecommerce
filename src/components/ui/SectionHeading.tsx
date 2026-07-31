import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  ctaText?: string;
  ctaHref?: string;
  className?: string;
  lightText?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = "center",
  ctaText,
  ctaHref,
  className = "",
  lightText = false,
}) => {
  return (
    <div
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      } mb-10 md:mb-14 ${className}`}
    >
      <div className={`flex w-full items-end justify-between gap-4 ${align === "center" ? "justify-center" : ""}`}>
        <div className={align === "center" ? "mx-auto" : ""}>
          <h2 className={`font-playfair text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 ${lightText ? "text-white" : "text-hok-espresso"}`}>
            {title}
          </h2>
          <div className={`w-12 h-0.5 ${lightText ? "bg-white/40" : "bg-hok-champagne"} mb-3 ${align === "center" ? "mx-auto" : ""}`} />
          {subtitle && (
            <p className={`md:text-lg max-w-2xl font-light ${lightText ? "text-hok-mist" : "text-hok-stone"}`}>
              {subtitle}
            </p>
          )}
        </div>
        
        {ctaText && ctaHref && align === "left" && (
          <Link
            href={ctaHref}
            className="hidden sm:flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-hok-walnut hover:text-hok-caramel transition-colors group mb-1"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      {/* Mobile CTA (centered or left) */}
      {ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className={`sm:hidden mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-hok-walnut hover:text-hok-caramel transition-colors group`}
        >
          {ctaText}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeading;
