import { Truck, RefreshCcw, ShieldCheck, Leaf } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const points = [
  {
    icon: Truck,
    title: "Free Shipping",
    copy: "On all prepaid orders above ₹2,999, pan-India.",
  },
  {
    icon: RefreshCcw,
    title: "30-Day Returns",
    copy: "Easy exchanges and returns, no questions asked.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    copy: "Every batch tested for fit, fabric and finish.",
  },
  {
    icon: Leaf,
    title: "Responsibly Made",
    copy: "Low-impact dyes and recycled fibers where possible.",
  },
];

export function WhyUs() {
  return (
    <section className="border-y border-ink/10 bg-paper px-4 py-16 sm:px-8">
      <RevealGroup className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 lg:grid-cols-4">
        {points.map((p) => (
          <RevealItem key={p.title} className="flex flex-col items-start gap-3">
            <p.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink">
              {p.title}
            </h3>
            <p className="text-xs leading-relaxed text-ink/50">{p.copy}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
