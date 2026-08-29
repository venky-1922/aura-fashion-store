"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, User, ShoppingBag } from "lucide-react";

import { MobileNav } from "./mobile-nav";
import { useCart } from "@/components/cart/cart-context";
import { cn } from "@/lib/utils";

const links = [
  { href: "/shop/men", label: "Men" },
  { href: "/shop/women", label: "Women" },
  { href: "/shop", label: "New Drop" },
  { href: "/collections/monochrome-01", label: "Collections" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  // Hero-driven transparency only really matters on the homepage;
  // other pages get a solid bar from the start.
  const isHome = pathname === "/";

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-500",
        isHome && "-mb-20",
        solid ? "bg-paper/90 backdrop-blur-md border-b border-ink/10" : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1600px] items-center justify-between px-4 transition-[height] duration-500 sm:px-8",
          solid ? "h-16" : "h-20"
        )}
      >
        <div className="flex items-center gap-2 lg:hidden">
          <MobileNav
            trigger={
              <button
                aria-label="Open menu"
                className={cn(
                  "flex h-9 w-9 items-center justify-center transition-colors cursor-pointer",
                  solid ? "text-ink" : "text-paper"
                )}
              >
                <Menu className="h-5 w-5" />
              </button>
            }
          />
        </div>

        <Link
          href="/"
          className={cn(
            "font-display text-xl tracking-[0.24em] transition-colors sm:text-2xl",
            solid ? "text-ink" : "text-paper"
          )}
        >
          AURA
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-[11px] font-medium uppercase tracking-[0.16em] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full",
                solid ? "text-ink/80 hover:text-ink" : "text-paper/85 hover:text-paper"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className={cn(
              "hidden h-9 w-9 items-center justify-center transition-colors sm:flex cursor-pointer",
              solid ? "text-ink" : "text-paper"
            )}
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <button
            type="button"
            aria-label="Account coming soon"
            className={cn(
              "hidden h-9 w-9 items-center justify-center transition-colors sm:flex cursor-pointer",
              solid ? "text-ink" : "text-paper"
            )}
          >
            <User className="h-[18px] w-[18px]" />
          </button>
          <button
            aria-label="Open cart"
            onClick={openCart}
            className={cn(
              "relative flex h-9 w-9 items-center justify-center transition-colors cursor-pointer",
              solid ? "text-ink" : "text-paper"
            )}
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-paper"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
}
