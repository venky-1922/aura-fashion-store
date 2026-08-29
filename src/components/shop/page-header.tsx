import { Reveal } from "@/components/motion/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-ink/10 px-4 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/40">
            {eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-ink">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/50">{description}</p>
          )}
        </Reveal>
      </div>
    </div>
  );
}
