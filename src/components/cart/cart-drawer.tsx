"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "./cart-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatINR } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 2999;
const SHIPPING_FEE = 149;

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount, openCart } =
    useCart();

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <SheetContent side="right" className="p-0">
        <SheetHeader className="border-b border-ink/10 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Your Bag ({itemCount})</SheetTitle>
          </div>
          {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
            <p className="text-xs text-ink/50">
              Add {formatINR(remainingForFree)} more for free shipping
            </p>
          )}
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-ink/20" strokeWidth={1} />
            <p className="text-sm text-ink/50">Your bag is empty.</p>
            <Button variant="outline" size="sm" onClick={closeCart} asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="divide-y divide-ink/10">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.li
                      key={`${item.slug}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex gap-4 py-5"
                    >
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        aria-label={`View ${item.name}`}
                        className="relative h-24 w-20 shrink-0 overflow-hidden bg-line/40"
                      >
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <Link href={`/product/${item.slug}`} onClick={closeCart} className="group min-w-0">
                            <p className="text-sm font-medium leading-tight">{item.name}</p>
                            <p className="mt-1 text-xs text-ink/50 group-hover:text-ink">
                              {item.color} / {item.size}
                            </p>
                          </Link>
                          <button
                            onClick={() => removeItem(item.slug, item.size, item.color)}
                            className="text-ink/40 transition-colors hover:text-ink cursor-pointer"
                            aria-label="Remove item"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-ink/15">
                            <button
                              className="flex h-7 w-7 items-center justify-center text-ink/60 hover:text-ink cursor-pointer"
                              onClick={() =>
                                updateQuantity(item.slug, item.size, item.color, item.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-xs">{item.quantity}</span>
                            <button
                              className="flex h-7 w-7 items-center justify-center text-ink/60 hover:text-ink cursor-pointer"
                              onClick={() =>
                                updateQuantity(item.slug, item.size, item.color, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-medium">{formatINR(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>

            <SheetFooter className="border-t border-ink/10 pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-ink/60">
                  <span>Subtotal</span>
                  <span className="text-ink">{formatINR(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-ink/60">
                  <span>Shipping</span>
                  <span className="text-ink">{shipping === 0 ? "Free" : formatINR(shipping)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between text-base font-medium">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>
              <Button size="lg" className="w-full" asChild>
                <Link href="/cart" onClick={closeCart}>
                  Checkout
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={closeCart}>
                Continue Shopping
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
