"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";

import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn, formatINR } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-context";

const badgeVariantMap: Record<string, "new" | "sale" | "bestseller" | "outline"> = {
  NEW: "new",
  SALE: "sale",
  BESTSELLER: "bestseller",
  LIMITED: "outline",
};

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addItem } = useCart();
  const [adding, setAdding] = React.useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    const defaultSize = product.sizes.find((s) => s.inStock)?.size ?? product.sizes[0]?.size ?? "M";
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images.primary,
      price: product.price,
      originalPrice: product.originalPrice,
      size: defaultSize,
      color: product.colors[0]?.name ?? "Default",
      quantity: 1,
    });
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5">
        <motion.div
          className="absolute inset-0"
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={product.images.primary}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              priority={priority}
              className="object-cover object-center"
            />
          </motion.div>

          <motion.div
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 hidden md:block"
          >
            <Image
              src={product.images.secondary}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center"
            />
          </motion.div>

          {/* Badges */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            {product.badges.map((badge) => (
              <Badge key={badge} variant={badgeVariantMap[badge]}>
                {badge}
              </Badge>
            ))}
          </div>

          {/* Quick add - desktop */}
          <motion.div
            variants={{ rest: { y: 12, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-3 bottom-3 z-10 hidden md:block"
          >
            <button
              onClick={handleQuickAdd}
              className="flex w-full items-center justify-center gap-2 bg-paper py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink shadow-lg transition-colors hover:bg-ink hover:text-paper cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              {adding ? "Added" : "Quick Add"}
            </button>
          </motion.div>
        </motion.div>

        {/* Mobile quick add - always visible, compact */}
        <button
          onClick={handleQuickAdd}
          aria-label="Quick add to cart"
          className="absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center bg-paper/95 text-ink shadow-md md:hidden"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="pt-3"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-[13px] font-medium text-ink sm:text-sm">{product.name}</h3>
            <p className="mt-0.5 truncate text-xs text-ink/45">{product.tagline}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1 pt-0.5">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="text-[11px] text-ink/60">{product.rating}</span>
          </div>
        </div>

        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-sm font-semibold text-ink">{formatINR(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-ink/35 line-through">{formatINR(product.originalPrice)}</span>
          )}
          {product.discountPercent && (
            <span className="text-xs font-medium text-accent">{product.discountPercent}% off</span>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={cn("animate-pulse")}>
      <div className="aspect-[4/5] w-full bg-line/50" />
      <div className="mt-3 h-3 w-3/4 bg-line/50" />
      <div className="mt-2 h-3 w-1/2 bg-line/50" />
    </div>
  );
}
