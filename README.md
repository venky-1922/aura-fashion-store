# AURA — Premium Athleisure & Streetwear (Demo Storefront)

An original, premium D2C fashion/athleisure e-commerce front-end, built with:

- **Next.js 16** (App Router, TypeScript, Server Components by default)
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **Hand-built shadcn-style UI primitives** (`src/components/ui`) on Radix
- **Framer Motion** — nav, mobile menu, product card hover states, cart drawer, viewport reveals
- **GSAP + ScrollTrigger** — hero parallax/text reveal, pinned editorial image scaling
- **lucide-react** icons
- **next/image** everywhere, with `prefers-reduced-motion` respected throughout

Structurally inspired by allofficials.in (section order / IA only) — all copy, imagery,
branding ("AURA"), and visual design are original.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
src/
  app/                 routes (App Router)
    page.tsx            homepage
    shop/                /shop, /shop/men, /shop/women
    collections/[slug]/  collection detail
    product/[slug]/      product detail
    search/ about/ contact/ cart/
  components/
    ui/                 shadcn-style primitives (Button, Sheet, Badge, Tabs…)
    layout/             Navbar, MobileNav, Footer, AnnouncementBar
    home/               homepage sections (Hero, EditorialSection, WhyUs…)
    product/             ProductCard, ProductGallery, ProductDetailPanel…
    cart/               CartProvider (context + localStorage) and CartDrawer
    shop/               ShopToolbar, ShopGridClient, PageHeader
    motion/             Reveal / RevealGroup Framer Motion helpers
  data/                 mock Product / Category / Collection / Review data (INR pricing)
  lib/                  utils.ts (cn, formatINR), gsap.ts (ScrollTrigger registration)
  types/                shared TypeScript interfaces
```

## Notes

- Product imagery is sourced from Unsplash as placeholder editorial photography —
  swap `src/data/images.ts` / `src/data/products.ts` for real product photography
  when you have it.
- Fonts are loaded via a `<link>` tag in `src/app/layout.tsx` (Inter + Archivo/Bebas
  Neue) rather than `next/font/google`, so the build has no external network
  dependency; swap in `next/font` if you prefer self-hosted fonts.
- Cart state persists to `localStorage` client-side; there's no backend/checkout —
  `Proceed to Checkout` is a placeholder for wiring up real payments.
- `npm run build` produces a fully static-optimized production build (25 routes).
