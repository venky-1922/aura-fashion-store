"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";

import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
  const [quickAddOpen, setQuickAddOpen] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);

  const openQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(null);
    setQuickAddOpen(true);
  };

  const handleQuickAdd = () => {
    if (!selectedSize) return;
    setAdding(true);
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images.primary,
      price: product.price,
      originalPrice: product.originalPrice,
      size: selectedSize,
      color: product.colors[0]?.name ?? "Default",
      quantity: 1,
    });
    setQuickAddOpen(false);
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <div className="group">
      <motion.div
        className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <Link href={`/product/${product.slug}`} className="absolute inset-0 block" aria-label={product.name}>
          <motion.div className="absolute inset-0">
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

            <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
              {product.badges.map((badge) => (
                <Badge key={badge} variant={badgeVariantMap[badge]}>
                  {badge}
                </Badge>
              ))}
            </div>
          </motion.div>
        </Link>

        <motion.div
          initial="rest"
          variants={{ rest: { y: 12, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-3 bottom-3 z-10 hidden md:block"
        >
          <button
            type="button"
            onClick={openQuickAdd}
            className="flex w-full items-center justify-center gap-2 bg-paper py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink shadow-lg transition-colors hover:bg-ink hover:text-paper cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            {adding ? "Added" : "Quick Add"}
          </button>
        </motion.div>
        <button
          type="button"
          onClick={openQuickAdd}
          aria-label="Quick add to cart"
          className="absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center bg-paper/95 text-ink shadow-md md:hidden"
        >
          <Plus className="h-4 w-4" />
        </button>
      </motion.div>

      <Link href={`/product/${product.slug}`} className="block">
        <motion.div initial="rest" whileHover="hover" animate="rest" className="pt-3">
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

      <Sheet open={quickAddOpen} onOpenChange={setQuickAddOpen}>
        <SheetContent side="right" className="p-0">
          <SheetHeader className="border-b border-ink/10 pb-4">
            <SheetTitle>Choose a size</SheetTitle>
            <p className="text-sm text-ink/55">{product.name}</p>
          </SheetHeader>
          <div className="flex flex-1 flex-col px-6 py-6">
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size.size}
                  type="button"
                  disabled={!size.inStock}
                  onClick={() => setSelectedSize(size.size)}
                  className={cn(
                    "flex h-11 min-w-11 items-center justify-center border px-3 text-xs font-medium transition-colors",
                    !size.inStock && "cursor-not-allowed border-ink/10 text-ink/25 line-through",
                    size.inStock && selectedSize === size.size && "border-ink bg-ink text-paper",
                    size.inStock && selectedSize !== size.size && "border-ink/20 text-ink hover:border-ink"
                  )}
                >
                  {size.size}
                </button>
              ))}
            </div>
            <Button onClick={handleQuickAdd} disabled={!selectedSize} size="lg" className="mt-auto w-full">
              Add to Cart
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
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
