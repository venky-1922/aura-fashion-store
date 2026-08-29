"use client";

import * as React from "react";
import { Product } from "@/types";
import { ProductGrid } from "@/components/product/product-grid";
import { ShopToolbar, SortKey } from "./shop-toolbar";
import { cn } from "@/lib/utils";

export function ShopGridClient({
  products,
  categoryFilters,
}: {
  products: Product[];
  categoryFilters?: { slug: string; label: string }[];
}) {
  const [sort, setSort] = React.useState<SortKey>("featured");
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const categoryCounts = React.useMemo(
    () =>
      products.reduce<Record<string, number>>((counts, product) => {
        counts[product.category] = (counts[product.category] ?? 0) + 1;
        return counts;
      }, {}),
    [products]
  );

  const filtered = React.useMemo(() => {
    let list = products;
    if (activeCategory) {
      list = list.filter((p) => p.category === activeCategory);
    }
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return sorted;
  }, [products, activeCategory, sort]);

  return (
    <div>
      {categoryFilters && categoryFilters.length > 0 && (
        <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            aria-pressed={activeCategory === null}
            className={cn(
              "shrink-0 border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors",
              activeCategory === null
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 text-ink/60 hover:border-ink/40"
            )}
          >
            All
          </button>
          {categoryFilters.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActiveCategory(c.slug)}
              aria-pressed={activeCategory === c.slug}
              className={cn(
                "shrink-0 border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors",
                activeCategory === c.slug
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink/60 hover:border-ink/40"
              )}
            >
              {c.label}
              <span className="ml-1.5 text-[10px] opacity-60">{categoryCounts[c.slug] ?? 0}</span>
            </button>
          ))}
        </div>
      )}

      <ShopToolbar count={filtered.length} sort={sort} onSortChange={setSort} />

      <div className="mt-8">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-sm text-ink/40">No products match this filter.</p>
        ) : (
          <ProductGrid key={`${activeCategory ?? "all"}-${sort}`} products={filtered} />
        )}
      </div>
    </div>
  );
}
