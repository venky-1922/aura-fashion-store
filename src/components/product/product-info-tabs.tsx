import { Star } from "lucide-react";
import { Product, Review } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function ProductInfoTabs({ product, reviews }: { product: Product; reviews: Review[] }) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specs">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <p className="max-w-2xl text-sm leading-relaxed text-ink/60">{product.description}</p>
      </TabsContent>

      <TabsContent value="specs">
        <dl className="max-w-md divide-y divide-ink/10">
          {product.specifications.map((spec) => (
            <div key={spec.label} className="flex justify-between py-3 text-sm">
              <dt className="text-ink/50">{spec.label}</dt>
              <dd className="font-medium text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </TabsContent>

      <TabsContent value="reviews">
        <div className="mb-8 flex items-center gap-6">
          <div className="text-center">
            <p className="font-display text-4xl text-ink">{product.rating}</p>
            <div className="mt-1 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.round(product.rating) ? "fill-accent text-accent" : "fill-ink/10 text-ink/10"
                  )}
                />
              ))}
            </div>
            <p className="mt-1 text-xs text-ink/40">{product.reviewCount} reviews</p>
          </div>
        </div>

        <ul className="max-w-2xl space-y-6">
          {reviews.map((r) => (
            <li key={r.id} className="border-b border-ink/10 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3",
                          i < r.rating ? "fill-accent text-accent" : "fill-ink/10 text-ink/10"
                        )}
                      />
                    ))}
                  </div>
                  {r.verified && (
                    <span className="text-[10px] uppercase tracking-[0.1em] text-ink/35">
                      Verified Buyer
                    </span>
                  )}
                </div>
                <span className="text-xs text-ink/35">{r.date}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-ink">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/55">{r.comment}</p>
              <p className="mt-2 text-xs text-ink/40">— {r.author}</p>
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
