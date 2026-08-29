import type { Metadata } from "next";
import { products } from "@/data/products";
import { PageHeader } from "@/components/shop/page-header";
import { ShopGridClient } from "@/components/shop/shop-grid-client";

export const metadata: Metadata = {
  title: "Men | AURA",
  description: "Men's athleisure and streetwear — hoodies, jackets, tees and more.",
};

const categoryFilters = [
  { slug: "hoodies", label: "Hoodies" },
  { slug: "t-shirts", label: "T-Shirts" },
  { slug: "jackets", label: "Jackets" },
  { slug: "pants", label: "Pants" },
  { slug: "footwear", label: "Footwear" },
];

export default function MenShopPage() {
  const menProducts = products.filter((p) => p.gender === "men" || p.gender === "unisex");
  return (
    <>
      <PageHeader
        eyebrow="Men"
        title="Tailored for Movement."
        description="Considered essentials built from heavyweight cotton and technical fabrics."
      />
      <div className="px-4 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-[1600px]">
          <ShopGridClient products={menProducts} categoryFilters={categoryFilters} />
        </div>
      </div>
    </>
  );
}
