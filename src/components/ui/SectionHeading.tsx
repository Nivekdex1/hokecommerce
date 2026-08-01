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
      } mb-12 md:mb-16 ${className}`}
    >
      <div className={`flex w-full items-end justify-between gap-4 ${align === "center" ? "justify-center" : ""}`}>
        <div className={align === "center" ? "mx-auto" : ""}>
          <span className={`font-outfit uppercase tracking-[0.25em] text-[10px] sm:text-xs block mb-3 font-medium ${lightText ? "text-white/60" : "text-hok-champagne"}`}>
            {subtitle || ""}
          </span>
          <h2 className={`font-fondamento text-3xl md:text-4xl lg:text-5xl font-normal mb-0 ${lightText ? "text-white" : "text-hok-espresso"}`}>
            {title}
          </h2>
        </div>
        
        {ctaText && ctaHref && align === "left" && (
          <Link
            href={ctaHref}
            className="hidden sm:flex items-center gap-3 group"
          >
            <span className="font-outfit font-medium text-xs tracking-[0.2em] uppercase text-hok-charcoal hover:text-hok-champagne transition-colors border-b border-hok-champagne/40 pb-0.5">
              {ctaText}
            </span>
            <ArrowRight className="w-4 h-4 text-hok-champagne transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      {/* Mobile CTA */}
      {ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className={`sm:hidden mt-5 inline-flex items-center gap-2 font-outfit text-xs font-medium tracking-[0.2em] uppercase text-hok-charcoal hover:text-hok-champagne transition-colors group`}
        >
          {ctaText}
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeading;
