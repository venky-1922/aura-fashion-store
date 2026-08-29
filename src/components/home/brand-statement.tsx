import { Reveal } from "@/components/motion/reveal";

export function BrandStatement() {
  return (
    <section className="bg-paper px-4 py-24 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/40">
            The Aura Standard
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-ink">
            We don&apos;t chase trends. We build pieces engineered to outlast
            them — cut for movement, finished for the street.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-sm text-ink/50">
            Every garment is developed in-house, sampled through multiple
            fit rounds, and tested by our own athletes before it ever reaches
            the rack.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
