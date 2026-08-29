"use client";

import * as React from "react";
import { Search as SearchIcon, X } from "lucide-react";

import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { PageHeader } from "@/components/shop/page-header";

export default function SearchPage() {
  const [query, setQuery] = React.useState("");

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <PageHeader eyebrow="Search" title="Find Your Fit." />
      <div className="px-4 py-10 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-[1600px]">
          <div className="relative mx-auto mb-10 max-w-xl">
            <SearchIcon className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/30" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for hoodies, sneakers, leggings…"
              className="w-full border-b border-ink/20 bg-transparent py-3 pl-8 pr-8 text-lg outline-none transition-colors focus:border-ink"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {query && (
            <p className="mb-8 text-xs uppercase tracking-[0.14em] text-ink/40">
              {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>
          )}

          {query && results.length === 0 && (
            <p className="py-16 text-center text-sm text-ink/40">
              No products found. Try &ldquo;hoodie&rdquo;, &ldquo;sneaker&rdquo;, or &ldquo;legging&rdquo;.
            </p>
          )}

          {results.length > 0 && <ProductGrid products={results} />}

          {!query && (
            <div className="py-16 text-center">
              <p className="text-sm text-ink/40">Start typing to search the AURA catalog.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
