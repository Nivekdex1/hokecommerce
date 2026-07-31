import QueryProvider from "@/components/QueryProvider";
import Footer from "@/components/ui/landingPage/Footer";
import Navbar from "@/components/ui/landingPage/Navbar";
import { Toaster } from "@/components/ui/sonner";
import CookieConsent from "@/components/ui/CookieConsent";
import BackToTop from "@/components/ui/BackToTop";
import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#FAF6EE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Home of Korean Beauty",
    default: "Home of Korean Beauty | Nigeria's #1 K-Beauty Store",
  },
  description: "Authentic, dermatologist-backed Korean skincare that works for all skin types. Sourced directly from Korea and delivered across Nigeria.",
  openGraph: {
    title: "Home of Korean Beauty",
    description: "Nigeria's premier destination for authentic Korean skincare products.",
    url: "https://homeofkoreanbeauty.com",
    siteName: "Home of Korean Beauty",
    locale: "en_NG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/brand/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/brand/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/brand/favicons/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/brand/favicons/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/brand/favicons/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/brand/favicons/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/brand/favicons/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/brand/favicons/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/brand/favicons/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/brand/favicons/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/brand/favicons/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/brand/favicons/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Home of Korean Beauty",
    url: "https://homeofkoreanbeauty.com",
    logo: "https://homeofkoreanbeauty.com/brand/new-hok-logo-black.svg",
    sameAs: [
      "https://www.facebook.com/share/1EK81bfAFp/",
      "https://www.instagram.com/thehomeofkoreanproducts/",
      "https://www.tiktok.com/@thehomeofkoreanproducts",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${playfair.variable} ${manrope.variable} antialiased min-h-screen flex flex-col`}>
        <QueryProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CookieConsent />
          <BackToTop />
          <Toaster position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
