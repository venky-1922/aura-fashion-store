import type { Metadata } from "next";
import { products } from "@/data/products";
import { PageHeader } from "@/components/shop/page-header";
import { ShopGridClient } from "@/components/shop/shop-grid-client";

export const metadata: Metadata = {
  title: "Women | AURA",
  description: "Women's athleisure and streetwear — leggings, sports bras, jackets and more.",
};

const categoryFilters = [
  { slug: "leggings", label: "Leggings" },
  { slug: "activewear", label: "Activewear" },
  { slug: "jackets", label: "Jackets" },
  { slug: "sweatshirts", label: "Sweatshirts" },
  { slug: "footwear", label: "Footwear" },
];

export default function WomenShopPage() {
  const womenProducts = products.filter((p) => p.gender === "women" || p.gender === "unisex");
  return (
    <>
      <PageHeader
        eyebrow="Women"
        title="Sculpted for Edge."
        description="Second-skin fabrics and considered silhouettes for training and everyday."
      />
      <div className="px-4 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-[1600px]">
          <ShopGridClient products={womenProducts} categoryFilters={categoryFilters} />
        </div>
      </div>
    </>
  );
}
