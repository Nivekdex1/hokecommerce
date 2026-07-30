import { getProducts } from "@/lib/shopify";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://homeofkoreanbeauty.com";

  // Static routes
  const routes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/skin-algorithm",
    "/wholesale",
    "/wholesale-shop",
    "/privacy-policy",
    "/returns-policy",
    "/quality-guarantee",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic products
  let products: any[] = [];
  try {
    const productsRes = await getProducts({}); // Fetch a default batch
    if (productsRes && productsRes.products) {
      products = productsRes.products.map((product) => ({
        url: `${baseUrl}/shop/${product.handle}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  return [...routes, ...products];
}
