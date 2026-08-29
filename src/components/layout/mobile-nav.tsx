"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, User, Search } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/shop/men", label: "Men" },
  { href: "/shop/women", label: "Women" },
  { href: "/shop", label: "New Drop" },
  { href: "/collections/monochrome-01", label: "Collections" },
  { href: "/about", label: "About" },
];

export function MobileNav({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs p-0">
        <SheetHeader className="border-b border-ink/10 pb-5">
          <SheetTitle className="font-display text-lg tracking-[0.2em]">AURA</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-1 flex-col px-6 py-2">
          {links.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-ink/10 py-4 text-xl font-medium tracking-tight"
              >
                {link.label}
                <ChevronRight className="h-4 w-4 text-ink/30" />
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-6 border-t border-ink/10 px-6 py-5">
          <Link
            href="/search"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-ink/60"
          >
            <Search className="h-4 w-4" /> Search
          </Link>
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-ink/60"
          >
            <User className="h-4 w-4" /> Account
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
