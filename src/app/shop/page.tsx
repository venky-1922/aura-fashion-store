import type { Metadata } from "next";
import { products } from "@/data/products";
import { PageHeader } from "@/components/shop/page-header";
import { ShopGridClient } from "@/components/shop/shop-grid-client";

export const metadata: Metadata = {
  title: "Shop All | AURA",
  description: "Shop the full AURA range — apparel, footwear and accessories.",
};

const categoryFilters = [
  { slug: "hoodies", label: "Hoodies" },
  { slug: "t-shirts", label: "T-Shirts" },
  { slug: "jackets", label: "Jackets" },
  { slug: "pants", label: "Pants" },
  { slug: "leggings", label: "Leggings" },
  { slug: "sweatshirts", label: "Sweatshirts" },
  { slug: "activewear", label: "Activewear" },
  { slug: "footwear", label: "Footwear" },
];

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop All"
        title="Every Piece."
        description="The complete AURA range — technical athleisure and off-duty essentials, cut for movement."
      />
      <div className="px-4 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-[1600px]">
          <ShopGridClient products={products} categoryFilters={categoryFilters} />
        </div>
      </div>
    </>
  );
}
