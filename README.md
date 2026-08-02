# HOK (Home of Korean Beauty) - Frontend Codebase

Welcome to the headless e-commerce frontend for **Home of Korean Beauty (HOK)**, Nigeria's premier destination for authentic, dermatologist-backed Korean skincare. 

This platform caters to both retail consumers looking for personalized skincare routines and B2B wholesale partners (HOK Pro). It is built as a custom headless storefront on top of Shopify.

---

## 🛠 Technology Stack

- **Core Framework:** Next.js 16 (App Router) with React 18 and TypeScript.
- **Commerce Engine:** Headless Shopify via the Shopify Storefront API (GraphQL).
- **State Management:** 
  - `zustand` (specifically `useCartStore` in `src/store`) for persistent global cart state.
  - `@tanstack/react-query` for optimized client-side data fetching.
- **Styling & UI:** 
  - Tailwind CSS v4 (with PostCSS).
  - Radix UI primitives for accessible interactive components (Dialogs, Accordions).
  - Framer Motion for sophisticated animations (e.g., `HeroCarousel`, `ScrollReveal`).
  - Lucide React for iconography.

---

## 🏗 Architecture & Key Integrations

### Shopify Integration (`src/lib/shopify`)
The application bypasses standard Shopify Liquid templates and fully relies on the Storefront API:
- **Cart Management (`cart.ts`):** Handles cart creation, line item mutations, and direct generation of Shopify checkout URLs.
- **Product Fetching (`index.ts`):** Implements cursor-based GraphQL pagination and complex filtering parameters (price, vendors, tags, collections).
- **Dynamic Metaobjects:** The platform relies heavily on Shopify Metaobjects to drive UI content. For example, the `HeroCarousel` slides and `BrandBannerCarousel` banners are fetched directly from Metaobject definitions in the Shopify Admin.

### Core Features & Routing
- **Landing Page (`/`):** A highly dynamic homepage featuring a Framer Motion-powered Hero Carousel, Best Sellers & New Arrivals grids, and a Marquee for official distributor announcements.
- **Shop Directory (`/shop`):** The primary product catalog. It features dynamic headings and metadata based on active search parameters (e.g., viewing `?collections=hyperpigmentation` automatically updates the page title to "Hyperpigmentation").
- **Skin Algorithm (`/skin-algorithm`):** A bespoke personalization quiz for tailored skincare routines.
- **HOK Pro (`/wholesale`, `/wholesale-shop`):** A dedicated B2B portal for wholesale partners.
- **Brands (`/brands`):** A dedicated directory routing to specific brand collections.

---

## ⚙️ Shopify Metaobjects Configuration

The frontend dynamically fetches content from Shopify Metaobjects. To ensure the UI renders correctly, the following Metaobject definitions must be configured in your Shopify Admin:

### 1. `hero_slide`
Used to populate the dynamic Hero Carousel on the homepage. Create multiple entries to add slides.
- `title` (Single line text)
- `subtitle` (Single line text)
- `cta_text` (Single line text) - e.g., "Shop Now"
- `cta_link` (URL or text) - e.g., "/shop"
- `image` (File) - Desktop background image.
- `mobile_image` (File) - *Optional.* Portrait image for mobile view.
- `bg_color` (Single line text) - *Optional.* Tailwind class for the slide background (e.g., `bg-hok-cream`).

*(Note: There is also a legacy fallback metaobject type `hero_section` with handle `home_hero` that accepts `hero_title`, `hero_subtitle`, etc.)*

### 2. `brand_banner`
Used to display auto-playing promotional banners at the top of the `/shop` page when a specific vendor is selected.
- **Handle:** Must exactly match the vendor handle (e.g., `cosrx`, `cerave`).
- `banners` (List of Files) - High resolution (e.g., 1920x480) banners for the brand.

### 3. `site_configuration`
Used to control global site settings, such as the scrolling announcement ticker (marquee) at the very top of the page.
- **Handle:** `global_settings`
- `announcement_text` (Single line text) - The main scrolling message.
- `announcement_link_text` (Single line text) - Text for the clickable link (e.g., "Shop Now").
- `announcement_link_url` (URL or text) - The destination URL for the link.

---

## 🎨 Design System & Aesthetics

The UI is designed to feel premium, natural, and dermatologist-backed.

- **Typography:**
  - Headings: **Fondamento** (Elegant Serif)
  - Body & UI Text: **Outfit** (Clean, modern Sans-serif)
- **Color Palette:** (Defined in Tailwind config via `globals.css`)
  - Primary text/dark elements: `hok-espresso` (#1E120A), `hok-charcoal`, `hok-stone`.
  - Accent colors: `hok-champagne` (#D4A853), `hok-walnut` (#5C3D2E).
  - Backgrounds: `hok-linen` (#FCFAF8), `hok-ivory` (#FFFCF9), `hok-cream`, `hok-mist`.
- **Effects:** The UI extensively utilizes glassmorphism (`backdrop-blur`), fading masks, and subtle micro-animations to enhance the premium feel.

---

## 📸 Image Handling & Nuances

### Hero Carousel Architecture (`HeroCarousel.tsx`)
The homepage Hero Carousel pulls slide data from Shopify Metaobjects and supports two rendering approaches to accommodate responsive design perfectly:

1. **Art-Directed Approach (Default):** 
   - The codebase expects an `image` field (for desktop) and optionally a `mobile_image` field from the Shopify Metaobject. 
   - If both are provided, it will seamlessly swap a wide desktop image (e.g., `1920x1080`) for a portrait mobile image (e.g., `1080x1350`).
2. **Safe Zone / Single Image Approach:** 
   - If you want to use a single wide image and let the browser automatically crop the sides for mobile, you can toggle the `USE_SINGLE_COVER_IMAGE` flag to `true` at the top of `HeroCarousel.tsx`. This changes the rendering from `object-fit: contain` to `object-fit: cover`.

### Brand Logos
Brand logos are stored locally in the `/public/brands` directory and rendered dynamically without a bounding circle to accommodate both tall and wide logo layouts.

---

## 🚀 Getting Started

### Environment Variables
You must set up the following environment variables in a `.env.local` file to run the app:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-storefront-api-token"
```

### Running Locally
First, install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
