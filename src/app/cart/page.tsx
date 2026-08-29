"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shop/page-header";
import { formatINR } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 2999;
const SHIPPING_FEE = 149;

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Your Bag" title="Your Bag is Empty." />
        <div className="flex flex-col items-center justify-center gap-4 px-4 py-24 text-center">
          <ShoppingBag className="h-10 w-10 text-ink/20" strokeWidth={1} />
          <p className="text-sm text-ink/50">Looks like you haven&apos;t added anything yet.</p>
          <Button asChild size="lg">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Your Bag" title={`Your Bag (${items.length})`} />

      <section className="px-4 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
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
                    className="flex gap-5 py-6"
                  >
                    <Link href={`/product/${item.slug}`} className="relative h-32 w-24 shrink-0 overflow-hidden bg-line/40 sm:h-40 sm:w-32">
                      <Image src={item.image} alt={item.name} fill sizes="128px" className="object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link href={`/product/${item.slug}`} className="text-sm font-medium text-ink sm:text-base">
                            {item.name}
                          </Link>
                          <p className="mt-1 text-xs text-ink/50">
                            {item.color} / {item.size}
                          </p>
                        </div>
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
                            className="flex h-9 w-9 items-center justify-center text-ink/60 hover:text-ink cursor-pointer"
                            onClick={() => updateQuantity(item.slug, item.size, item.color, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            className="flex h-9 w-9 items-center justify-center text-ink/60 hover:text-ink cursor-pointer"
                            onClick={() => updateQuantity(item.slug, item.size, item.color, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-ink">
                            {formatINR(item.price * item.quantity)}
                          </p>
                          {item.originalPrice && (
                            <p className="text-xs text-ink/35 line-through">
                              {formatINR(item.originalPrice * item.quantity)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          {/* Order summary */}
          <div>
            <div className="sticky top-24 border border-ink/10 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                Order Summary
              </h2>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-ink/60">
                  <span>Subtotal</span>
                  <span className="text-ink">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink/60">
                  <span>Shipping</span>
                  <span className="text-ink">{shipping === 0 ? "Free" : formatINR(shipping)}</span>
                </div>
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-ink/40">
                    Add {formatINR(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.
                  </p>
                )}
                <Separator className="my-3" />
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              <Button size="lg" className="mt-6 w-full">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="mt-3 text-center text-[11px] text-ink/35">
                Taxes calculated at checkout. Secure payment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
