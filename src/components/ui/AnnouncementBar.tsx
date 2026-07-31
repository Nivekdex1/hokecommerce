import React from "react";
import Link from "next/link";
import { getMetaobject } from "@/lib/shopify";

const AnnouncementBar = async () => {
  const config = await getMetaobject("site_configuration", "global_settings");

  const text = config?.fields?.announcement_text || "✨ Discover your perfect glow! Free delivery on orders over ₦50,000.";
  const linkText = config?.fields?.announcement_link_text || "Shop Now";
  const linkUrl = config?.fields?.announcement_link_url || "/shop";

  return (
    <div className="w-full bg-hok-walnut text-white text-xs md:text-sm py-2 relative z-50 overflow-hidden flex whitespace-nowrap">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center justify-center px-8 md:px-16">
            <p className="font-medium tracking-wide">
              <span>{text}</span>
              {" "}
              <Link href={linkUrl} className="underline underline-offset-2 hover:text-hok-champagne transition-colors ml-1 font-semibold">
                {linkText}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
