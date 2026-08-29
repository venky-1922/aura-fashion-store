import type { Metadata } from "next";
import Image from "next/image";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { img, PH } from "@/data/images";

export const metadata: Metadata = {
  title: "About | AURA",
  description: "The story behind AURA — engineered movement, considered design.",
};

const values = [
  {
    title: "Engineered, Not Assembled",
    copy: "Every silhouette goes through multiple fit rounds with our own athletes before it's approved for production.",
  },
  {
    title: "Made in India",
    copy: "We manufacture close to home, working with mills and factories we visit in person.",
  },
  {
    title: "Built to Last",
    copy: "Heavyweight fabrics and reinforced seams so pieces outlive a single season.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative flex h-[60vh] min-h-[420px] w-full items-end overflow-hidden bg-ink">
        <Image
          src={img(PH.editorialWide2, 1920, 85)}
          alt="Aura studio"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/20" />
        <div className="relative z-10 w-full px-4 pb-14 sm:px-8">
          <div className="mx-auto max-w-[1600px]">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-paper/70">
              About Aura
            </p>
            <h1 className="max-w-2xl font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-paper">
              Designed for how you actually move.
            </h1>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-ink/70">
              AURA began in 2021 with a simple frustration: most athleisure was either built
              for the gym and looked out of place everywhere else, or built to look good and
              fell apart after a workout. We set out to make one wardrobe that could do both —
              technical enough to train in, considered enough to wear all day.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Every piece is developed in-house in our Bengaluru studio, sampled through
              multiple fit rounds, and tested by our own community before it ever reaches
              the rack. We keep our palette restrained and our fabrics heavy, because we
              believe the best design gets out of your way.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-paper px-4 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-12">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/40">
              What We Believe
            </p>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Our Standard</h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {values.map((v, i) => (
              <RevealItem key={v.title}>
                <span className="font-display text-4xl text-ink/15">0{i + 1}</span>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.1em] text-ink">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/50">{v.copy}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-1 sm:grid-cols-3">
        {[PH.community1, PH.community3, PH.community5].map((p, i) => (
          <div key={i} className="relative aspect-[3/4]">
            <Image
              src={img(p, 900)}
              alt="Aura studio life"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </section>
    </>
  );
}
