"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Product } from "@/types";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import { useCardScrollReveal } from "@/components/motion/use-card-scroll-reveal";

export function ProductCarousel({
  products,
  animateOnScroll = false,
}: {
  products: Product[];
  animateOnScroll?: boolean;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  useCardScrollReveal(rootRef, animateOnScroll);

  const updateArrows = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  React.useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const distance = card ? card.getBoundingClientRect().width + 20 : 320;
    el.scrollBy({ left: dir * distance * 2, behavior: "smooth" });
  };

  return (
    <div ref={rootRef} className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-6"
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            data-scroll-card={animateOnScroll || undefined}
            className="w-[62vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw] lg:w-[23vw]"
          >
            <ProductCard product={product} priority={i < 2} />
          </div>
        ))}
      </div>

      <div className="mt-6 hidden items-center justify-end gap-2 sm:flex">
        <button
          onClick={() => scrollBy(-1)}
          disabled={!canScrollLeft}
          className={cn(
            "flex h-11 w-11 items-center justify-center border border-ink/15 transition-colors cursor-pointer",
            canScrollLeft ? "text-ink hover:bg-ink hover:text-paper" : "text-ink/20 cursor-not-allowed"
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          disabled={!canScrollRight}
          className={cn(
            "flex h-11 w-11 items-center justify-center border border-ink/15 transition-colors cursor-pointer",
            canScrollRight ? "text-ink hover:bg-ink hover:text-paper" : "text-ink/20 cursor-not-allowed"
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
