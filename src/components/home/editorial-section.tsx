"use client";

import * as React from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export function EditorialSection({
  image,
  eyebrow,
  title,
  copy,
}: {
  image: string;
  eyebrow: string;
  title: string;
  copy: string;
}) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const imgWrapRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrapRef.current,
        { clipPath: "inset(8% 8% 8% 8%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      gsap.to(imgWrapRef.current?.querySelector("img") ?? null, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[80vh] min-h-[480px] w-full overflow-hidden bg-ink">
      <div ref={imgWrapRef} className="absolute inset-0" style={{ clipPath: "inset(8% 8% 8% 8%)" }}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="100vw"
          className="scale-100 object-cover"
        />
        <div className="absolute inset-0 bg-ink/35" />
      </div>

      <div
        ref={textRef}
        className="relative z-10 flex h-full flex-col items-start justify-end px-4 pb-14 sm:px-8 lg:pb-20"
      >
        <div className="max-w-xl">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-paper/70">
            {eyebrow}
          </p>
          <h2 className="text-display font-display text-paper">{title}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/75">{copy}</p>
        </div>
      </div>
    </section>
  );
}
