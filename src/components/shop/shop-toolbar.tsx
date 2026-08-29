"use client";

import * as React from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export function ShopToolbar({
  count,
  sort,
  onSortChange,
  onFilterClick,
}: {
  count: number;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  onFilterClick?: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-between border-b border-ink/10 pb-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onFilterClick}
          className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/70 hover:text-ink"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filter
        </button>
        <span className="text-[11px] text-ink/40">{count} products</span>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/70 hover:text-ink"
        >
          Sort: {sortOptions.find((s) => s.value === sort)?.label}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
        </button>
        {open && (
          <div className="absolute right-0 top-full z-20 mt-2 w-52 border border-ink/10 bg-paper py-1 shadow-lg">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onSortChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-2 text-left text-xs hover:bg-line/40",
                  sort === opt.value && "font-medium text-ink"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
