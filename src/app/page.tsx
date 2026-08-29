import { Hero } from "@/components/home/hero";
import Link from "next/link";
import { CategoryCards } from "@/components/home/category-cards";
import { EditorialSection } from "@/components/home/editorial-section";
import { BrandStatement } from "@/components/home/brand-statement";
import { CollectionSpotlight } from "@/components/home/collection-spotlight";
import { CommunitySection } from "@/components/home/community-section";
import { WhyUs } from "@/components/home/why-us";
import { Newsletter } from "@/components/home/newsletter";
import { ProductCarousel } from "@/components/product/product-carousel";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

import { newDrops, bestSellers } from "@/data/products";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { img, PH } from "@/data/images";

export default function Home() {
  return (
    <>
      <Hero />

      {/* New Drop */}
      <section className="px-4 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/40">
                Just Landed
              </p>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">New Drop</h2>
            </div>
            <Button variant="link" size="default" asChild>
              <Link href="/shop">View All</Link>
            </Button>
          </Reveal>
          <ProductCarousel products={newDrops} animateOnScroll />
        </div>
      </section>

      {/* Shop By Category */}
      <section className="px-4 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-10">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/40">
              Explore
            </p>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Shop By Category</h2>
          </Reveal>
          <CategoryCards categories={categories} />
        </div>
      </section>

      {/* Full-width editorial */}
      <EditorialSection
        image={img(PH.editorialWide, 1920, 85)}
        eyebrow="Mobility Lab"
        title="Built for the in-between moments."
        copy="From studio to street without changing — four-way stretch, breathable knits, and a fit that moves the way you do."
      />

      {/* Best Sellers */}
      <section className="px-4 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/40">
                Fan Favorites
              </p>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">Best Sellers</h2>
            </div>
            <Button variant="link" size="default" asChild>
              <Link href="/shop">View All</Link>
            </Button>
          </Reveal>
          <ProductGrid products={bestSellers} animateOnScroll />
        </div>
      </section>

      <BrandStatement />

      <CollectionSpotlight collection={collections[0]} />

      <CommunitySection />

      <WhyUs />

      <Newsletter />
    </>
  );
}
