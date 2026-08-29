"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);
  const photoRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactViewport = window.matchMedia("(max-width: 639px)").matches;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        delay: reduceMotion ? 0 : 1,
        stagger: 0.1,
        ease: "power2.out",
      });

      if (!reduceMotion) {
        gsap.fromTo(
          imageRef.current,
          { scale: compactViewport ? 1.04 : 1.26, yPercent: compactViewport ? 0 : -4 },
          {
            scale: compactViewport ? 1 : 1.18,
            yPercent: 0,
            duration: 1.8,
            ease: "power3.out",
          }
        );

        if (!compactViewport) {
          gsap.to(photoRef.current, {
            scale: 1.045,
            duration: 8,
            delay: 1.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          // subtle parallax on scroll
          gsap.to(imageRef.current, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex aspect-video h-auto min-h-0 w-full items-end overflow-hidden bg-ink sm:h-[86vh] sm:min-h-[560px] sm:aspect-auto lg:h-[92vh]"
    >
      <div ref={imageRef} className="absolute inset-0">
        <div ref={photoRef} className="absolute inset-0">
          <Image
            src="/images/home-hero-gym.png"
            alt="Aura athlete in a luxury gym"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-90 sm:object-[60%_center] lg:object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
      </div>

      <div className="relative z-10 w-full px-4 pb-5 sm:px-8 sm:pb-14 lg:pb-20">
        <div className="mx-auto max-w-[1600px]">
          <p
            data-hero-fade
            className="mb-2 text-[8px] font-medium uppercase tracking-[0.3em] text-paper/70 sm:mb-4 sm:text-[11px]"
          >
            AURA GYM WEAR
          </p>

          <h1 data-hero-fade className="max-w-xl font-display text-[clamp(1.4rem,5.5vw,3.5rem)] leading-[1.08] text-paper sm:text-display">
            Built for your grind.
          </h1>

          <p data-hero-fade className="mt-2 max-w-sm text-[10px] leading-4 text-paper/75 sm:mt-4 sm:text-base sm:leading-6">
            Premium performance wear designed for movement.
          </p>

          <div data-hero-fade className="mt-4 flex flex-wrap items-center gap-4 sm:mt-8">
            <Button variant="inverse" size="lg" className="scale-75 origin-left sm:scale-100" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>

      <div
        data-hero-fade
        className="absolute bottom-6 right-4 z-10 hidden items-center gap-2 text-paper/60 sm:right-8 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </div>
    </section>
  );
}
