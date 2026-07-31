import React from "react";
import Link from "next/link";
import { getMetaobject } from "@/lib/shopify";

const AnnouncementBar = async () => {
  const config = await getMetaobject("site_configuration", "global_settings");

  const text = config?.fields?.announcement_text || "✨ Discover your perfect glow! Free delivery on orders over ₦50,000.";
  const linkText = config?.fields?.announcement_link_text || "Shop Now";
  const linkUrl = config?.fields?.announcement_link_url || "/shop";

  return (
    <div className="w-full bg-hok-walnut text-white text-xs md:text-sm py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="text-center font-medium tracking-wide">
          <span className="hidden sm:inline">{text}</span>
          {" "}
          <Link href={linkUrl} className="underline underline-offset-2 hover:text-hok-champagne transition-colors ml-1 font-semibold">
            {linkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
