import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://homeofkoreanbeauty.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/cart",
        "/api/",
        "/*?*q=", // Block search query URLs
        "/*?*minPrice=", // Block filter permutations
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
