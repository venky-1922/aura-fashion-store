"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Minus, Plus, Truck, RefreshCcw, Check } from "lucide-react";

import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { formatINR, cn } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-context";

export function ProductDetailPanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]?.name ?? "Default");
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [sizeError, setSizeError] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  const buildLineItem = () => ({
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images.primary,
    price: product.price,
    originalPrice: product.originalPrice,
    size: selectedSize ?? "",
    color: selectedColor,
    quantity,
  });

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(buildLineItem());
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(buildLineItem());
    router.push("/cart");
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-ink/40">{product.tagline}</p>
          <h1 className="mt-1 font-display text-2xl leading-tight text-ink sm:text-3xl">
            {product.name}
          </h1>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-3.5 w-3.5",
                i < Math.round(product.rating) ? "fill-accent text-accent" : "fill-ink/10 text-ink/10"
              )}
            />
          ))}
        </div>
        <span className="text-xs text-ink/50">
          {product.rating} ({product.reviewCount} reviews)
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="text-2xl font-semibold text-ink">{formatINR(product.price)}</span>
        {product.originalPrice && (
          <span className="text-base text-ink/35 line-through">{formatINR(product.originalPrice)}</span>
        )}
        {product.discountPercent && (
          <span className="text-sm font-medium text-accent">{product.discountPercent}% off</span>
        )}
      </div>
      <p className="mt-1 text-xs text-ink/40">Inclusive of all taxes</p>

      {/* Color selector */}
      <div className="mt-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink/60">
          Color — <span className="text-ink">{selectedColor}</span>
        </p>
        <div className="mt-3 flex gap-2">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c.name)}
              aria-label={c.name}
              className={cn(
                "h-8 w-8 rounded-full border-2 transition-all",
                selectedColor === c.name ? "border-ink scale-110" : "border-transparent"
              )}
              style={{ backgroundColor: c.hex }}
            >
              <span className="sr-only">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size selector */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink/60">
            Size {selectedSize && <span className="text-ink">— {selectedSize}</span>}
          </p>
          <button className="text-[11px] uppercase tracking-[0.1em] text-ink/40 underline underline-offset-2 hover:text-ink/70">
            Size Guide
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s.size}
              disabled={!s.inStock}
              onClick={() => {
                setSelectedSize(s.size);
                setSizeError(false);
              }}
              className={cn(
                "flex h-11 min-w-11 items-center justify-center border px-3 text-xs font-medium transition-colors",
                !s.inStock && "cursor-not-allowed border-ink/10 text-ink/25 line-through",
                s.inStock && selectedSize === s.size && "border-ink bg-ink text-paper",
                s.inStock && selectedSize !== s.size && "border-ink/20 text-ink hover:border-ink"
              )}
            >
              {s.size}
            </button>
          ))}
        </div>
        {sizeError && <p className="mt-2 text-xs text-sale">Please select a size to continue.</p>}
      </div>

      {/* Quantity */}
      <div className="mt-8">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/60">Quantity</p>
        <div className="flex w-fit items-center border border-ink/20">
          <button
            className="flex h-11 w-11 items-center justify-center text-ink/60 hover:text-ink cursor-pointer"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <button
            className="flex h-11 w-11 items-center justify-center text-ink/60 hover:text-ink cursor-pointer"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" size="lg" className="flex-1" onClick={handleAddToCart}>
          <motion.span
            key={added ? "added" : "add"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              "Add to Cart"
            )}
          </motion.span>
        </Button>
        <Button size="lg" className="flex-1" onClick={handleBuyNow}>
          Buy Now
        </Button>
      </div>

      {/* Delivery info */}
      <div className="mt-8 space-y-3 border-t border-ink/10 pt-6">
        <div className="flex items-start gap-3">
          <Truck className="mt-0.5 h-4 w-4 shrink-0 text-ink/50" />
          <p className="text-xs text-ink/60">
            Free delivery on prepaid orders above ₹2,999. Standard delivery in 3–6 business days.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <RefreshCcw className="mt-0.5 h-4 w-4 shrink-0 text-ink/50" />
          <p className="text-xs text-ink/60">30-day easy returns and exchanges.</p>
        </div>
      </div>
    </div>
  );
}
