"use client";

import * as React from "react";
import { gsap } from "@/lib/gsap";

const DRAW_DURATION = 4_800;
const FADE_DURATION = 700;

export function SitePreloader() {
  const [isLeaving, setIsLeaving] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const markFrameRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("preloader-active");
    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.fromTo(
          markFrameRef.current,
          { autoAlpha: 0, scale: 0.94, y: 14 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out" }
        );
        gsap.to(markFrameRef.current, {
          y: -5,
          duration: 1.8,
          delay: 1.15,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
        });
      }
    }, markFrameRef);

    const drawTimer = window.setTimeout(
      () => setIsLeaving(true),
      reduceMotion ? 250 : DRAW_DURATION
    );
    const dismissTimer = window.setTimeout(
      () => {
        document.documentElement.classList.remove("preloader-active");
        setIsVisible(false);
      },
      (reduceMotion ? 250 : DRAW_DURATION) + FADE_DURATION
    );

    return () => {
      window.clearTimeout(drawTimer);
      window.clearTimeout(dismissTimer);
      ctx.revert();
      document.documentElement.classList.remove("preloader-active");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      aria-label="Loading AURA GYM WEAR"
      aria-live="polite"
      className={`site-preloader${isLeaving ? " site-preloader--leaving" : ""}`}
    >
      <div ref={markFrameRef} className="site-preloader__frame">
        <div className="site-preloader__pentagon" aria-hidden="true" />
        <svg
          className="site-preloader__mark"
          viewBox="0 0 760 180"
          role="img"
          aria-label="AURA GYM WEAR"
        >
          <text x="380" y="79" textAnchor="middle" className="site-preloader__aura">
            AURA
          </text>
          <text x="380" y="133" textAnchor="middle" className="site-preloader__gymwear">
            GYM WEAR
          </text>
        </svg>
      </div>
    </div>
  );
}
