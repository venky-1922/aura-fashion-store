"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AtSign } from "lucide-react";

import { img, PH } from "@/data/images";
import { Reveal } from "@/components/motion/reveal";
import { useCardScrollReveal } from "@/components/motion/use-card-scroll-reveal";

const posts = [PH.community1, PH.community2, PH.community3, PH.community4, PH.community5, PH.community6];

export function CommunitySection() {
  const cardsRef = React.useRef<HTMLDivElement>(null);
  useCardScrollReveal(cardsRef);

  return (
    <section className="px-4 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/40">
              Community
            </p>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Worn by You</h2>
          </div>
          <Link
            href="#"
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-ink/60 hover:text-ink"
          >
            <AtSign className="h-4 w-4" /> @aura.official
          </Link>
        </Reveal>

        <div ref={cardsRef} className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
          {posts.map((p, i) => (
            <div key={i} data-scroll-card className="group relative aspect-square overflow-hidden">
              <Image
                src={img(p, 500)}
                alt="Community post"
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100">
                <AtSign className="h-5 w-5 text-paper" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
