import React from "react";
import Link from "next/link";
import { getMetaobject } from "@/lib/shopify";

interface AnnouncementItem {
  text: string;
  linkText?: string;
  linkUrl?: string;
}

const AnnouncementBar = async () => {
  const config = await getMetaobject("site_configuration", "global_settings");

  const rawText = config?.fields?.announcement_text;
  const defaultLinkText = config?.fields?.announcement_link_text || "SHOP NOW";
  const defaultLinkUrl = config?.fields?.announcement_link_url || "/shop";
  const rawAnnouncements = config?.fields?.announcements || config?.fields?.announcement_list;

  let announcementItems: AnnouncementItem[] = [];

  if (Array.isArray(rawAnnouncements) && rawAnnouncements.length > 0) {
    announcementItems = rawAnnouncements.map((item: any) => ({
      text: item.text || item.fields?.text || String(item),
      linkText: item.linkText || item.fields?.link_text || defaultLinkText,
      linkUrl: item.linkUrl || item.fields?.link_url || defaultLinkUrl,
    }));
  } else if (typeof rawText === "string" && (rawText.includes("\n") || rawText.includes("|"))) {
    // Allows multi-line text input from Shopify metaobject textarea or pipe (|) separation
    const lines = rawText.split(/[\n|]/).map((l) => l.trim()).filter(Boolean);
    announcementItems = lines.map((line) => ({
      text: line,
      linkText: defaultLinkText,
      linkUrl: defaultLinkUrl,
    }));
  } else if (rawText) {
    announcementItems = [{ text: rawText, linkText: defaultLinkText, linkUrl: defaultLinkUrl }];
  } else {
    announcementItems = [
      { text: "✨ DISCOVER YOUR PERFECT GLOW! FREE DELIVERY ON ORDERS OVER ₦50,000.", linkText: "SHOP NOW", linkUrl: "/shop" },
      { text: "🌿 100% AUTHENTIC KOREAN SKINCARE DIRECTLY FROM KOREA.", linkText: "EXPLORE", linkUrl: "/about" },
      { text: "💫 NEED SKIN CONSULTATION? TRY OUR SKIN ALGORITHM QUIZ.", linkText: "TAKE QUIZ", linkUrl: "/skin-quiz" },
    ];
  }

  // Duplicate items array to ensure a smooth, unbroken ticker loop
  const tickerSequence = [
    ...announcementItems,
    ...announcementItems,
    ...announcementItems,
    ...announcementItems,
  ];

  return (
    <div className="w-full bg-hok-walnut text-white text-xs md:text-sm font-light py-2.5 md:py-3 relative z-50 overflow-hidden flex items-center whitespace-nowrap">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {tickerSequence.map((item, i) => (
          <div key={i} className="flex items-center justify-center px-4 md:px-8">
            <p className="font-medium tracking-wide flex items-center gap-1.5">
              <span>{item.text}</span>
              {item.linkText && (
                <Link
                  href={item.linkUrl || "/shop"}
                  className="underline underline-offset-2 hover:text-hok-champagne transition-colors ml-1 font-semibold"
                >
                  {item.linkText}
                </Link>
              )}
              <span className="ml-3 text-hok-champagne/60 text-[10px]">✦</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
