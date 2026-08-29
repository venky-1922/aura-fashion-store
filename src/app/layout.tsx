import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SitePreloader } from "@/components/layout/site-preloader";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

export const metadata: Metadata = {
  title: "AURA — Premium Athleisure & Streetwear",
  description:
    "AURA is a premium D2C athleisure and streetwear label engineered for movement — heavyweight cotton, technical fabrics, and considered silhouettes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Bebas+Neue&family=Archivo:wght@500;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
            --font-display: 'Archivo', 'Bebas Neue', ui-sans-serif, system-ui, sans-serif;
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <CartProvider>
          <SitePreloader />
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
