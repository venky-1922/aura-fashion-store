import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};
  return {
    title: `${collection.name} | AURA`,
    description: collection.description,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const collectionProducts = products.filter((p) => p.collectionSlug === collection.slug);

  return (
    <>
      <section className="relative flex h-[70vh] min-h-[420px] w-full items-end overflow-hidden bg-ink">
        <Image
          src={collection.heroImage}
          alt={collection.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/30" />
        <div className="relative z-10 w-full px-4 pb-12 sm:px-8 lg:pb-16">
          <div className="mx-auto max-w-[1600px]">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-paper/70">
              Collection
            </p>
            <h1 className="font-display text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] text-paper">
              {collection.name}
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.1em] text-accent">
              {collection.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-12 max-w-2xl">
            <p className="text-sm leading-relaxed text-ink/55">{collection.description}</p>
          </Reveal>

          {collectionProducts.length > 0 ? (
            <ProductGrid products={collectionProducts} />
          ) : (
            <p className="py-10 text-sm text-ink/40">
              This collection is launching soon. Check back shortly.
            </p>
          )}
        </div>
      </section>

      <section className="border-t border-ink/10 px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/40">
            More Collections
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {collections
              .filter((c) => c.slug !== collection.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/collections/${c.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/45" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-display text-lg text-paper">{c.name}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
