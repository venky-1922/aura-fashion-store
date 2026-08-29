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
