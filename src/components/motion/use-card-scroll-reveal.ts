"use client";

import * as React from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useCardScrollReveal(
  rootRef: React.RefObject<HTMLElement | null>,
  enabled = true
) {
  React.useEffect(() => {
    if (!enabled) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-scroll-card]");
      if (!cards.length) return;

      if (reduceMotion) {
        gsap.set(cards, { autoAlpha: 1, x: 0, scale: 1 });
        return;
      }

      const distance = window.matchMedia("(max-width: 639px)").matches ? 60 : 120;
      gsap.set(cards, {
        autoAlpha: 0,
        scale: 0.96,
        x: (index) => (index % 2 === 0 ? -distance : distance),
      });

      ScrollTrigger.batch(cards, {
        start: "top 80%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: "auto",
          }),
      });
    }, rootRef);

    return () => ctx.revert();
  }, [enabled, rootRef]);
}
