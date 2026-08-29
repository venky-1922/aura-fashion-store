import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Collection } from "@/types";
import { Reveal } from "@/components/motion/reveal";

export function CollectionSpotlight({ collection }: { collection: Collection }) {
  return (
    <section className="px-4 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-2 aspect-[4/5] w-full overflow-hidden lg:order-1">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/40">
              Collection Spotlight
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink">
              {collection.name}
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.1em] text-accent">
              {collection.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/55">
              {collection.description}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              href={`/collections/${collection.slug}`}
              className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-opacity hover:opacity-60"
            >
              Explore the Collection
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
