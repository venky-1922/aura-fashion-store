"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-charcoal px-4 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <h2 className="font-display text-2xl text-paper sm:text-3xl">
            Be first to the next drop
          </h2>
          <p className="mt-3 text-sm text-paper/50">
            Join the list for early access, restocks, and studio stories.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          {submitted ? (
            <div
              role="alert"
              className="mt-8 border border-paper/20 bg-paper/10 px-5 py-5 text-left backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-ink">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="text-sm font-medium text-paper">Thanks for choosing AURA GYM WEAR.</p>
                  <p className="mt-1 text-sm leading-relaxed text-paper/60">
                    You&apos;ll receive all the latest updates from our new collections.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex gap-2">
                <Input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-paper/25 bg-transparent text-paper placeholder:text-paper/40 focus:border-paper"
                />
                <Button
                  type="submit"
                  variant="inverse"
                  size="default"
                  className="shrink-0"
                  aria-label="Subscribe to the newsletter"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
