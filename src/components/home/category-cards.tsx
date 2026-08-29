"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Category } from "@/types";
import { useCardScrollReveal } from "@/components/motion/use-card-scroll-reveal";

export function CategoryCards({ categories }: { categories: Category[] }) {
  const rootRef = React.useRef<HTMLDivElement>(null);

  useCardScrollReveal(rootRef);

  return (
    <div ref={rootRef} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          data-scroll-card
          href={
            cat.slug === "men" || cat.slug === "women"
              ? `/shop/${cat.slug}`
              : `/shop?category=${cat.slug}`
          }
          className="group relative block aspect-[3/4] overflow-hidden bg-line/50"
        >
          <Image
            src={cat.image}
            alt={cat.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
            <div>
              <h3 className="font-display text-xl text-paper sm:text-2xl">{cat.name}</h3>
              <p className="mt-1 hidden max-w-[16ch] text-xs text-paper/70 sm:block">
                {cat.description}
              </p>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper/15 text-paper transition-colors group-hover:bg-paper group-hover:text-ink">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
