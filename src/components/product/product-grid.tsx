"use client";

import * as React from "react";
import { Product } from "@/types";
import { ProductCard } from "./product-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { useCardScrollReveal } from "@/components/motion/use-card-scroll-reveal";

export function ProductGrid({
  products,
  columns = 4,
  animateOnScroll = false,
}: {
  products: Product[];
  columns?: 2 | 3 | 4;
  animateOnScroll?: boolean;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  useCardScrollReveal(rootRef, animateOnScroll);
  const colClass =
    columns === 2
      ? "grid-cols-2"
      : columns === 3
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  if (animateOnScroll) {
    return (
      <div ref={rootRef} className={`grid ${colClass} gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12`}>
        {products.map((product, i) => (
          <div key={product.id} data-scroll-card>
            <ProductCard product={product} priority={i < 4} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <RevealGroup className={`grid ${colClass} gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12`}>
      {products.map((product, i) => (
        <RevealItem key={product.id}>
          <ProductCard product={product} priority={i < 4} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
