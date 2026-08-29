import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { generateReviews } from "@/data/reviews";

import { ProductGallery } from "@/components/product/product-gallery";
import { ProductDetailPanel } from "@/components/product/product-detail-panel";
import { ProductInfoTabs } from "@/components/product/product-info-tabs";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | AURA`,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const reviews = generateReviews(product.id, Math.min(6, product.reviewCount), product.rating);

  return (
    <div className="px-4 py-10 sm:px-8 lg:py-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images.gallery} name={product.name} />
          <ProductDetailPanel product={product} />
        </div>

        <div className="mt-16 border-t border-ink/10 pt-10 lg:mt-24 lg:pt-14">
          <ProductInfoTabs product={product} reviews={reviews} />
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-ink/10 pt-10 lg:mt-24 lg:pt-14">
            <Reveal className="mb-8">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/40">
                You May Also Like
              </p>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">Complete the Look</h2>
            </Reveal>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </div>
  );
}
