"use client";

import * as React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageHeader } from "@/components/shop/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch."
        description="Questions about an order, sizing, or a wholesale enquiry — we usually respond within one business day."
      />

      <section className="px-4 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            {submitted ? (
              <div className="flex h-full flex-col items-start justify-center">
                <p className="font-display text-2xl text-ink">Message sent.</p>
                <p className="mt-2 text-sm text-ink/50">
                  Thanks for reaching out — our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required placeholder="you@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required placeholder="Order enquiry, sizing, wholesale…" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell us how we can help"
                    className="w-full border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-ink"
                  />
                </div>
                <Button type="submit" size="lg">
                  Send Message
                </Button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.1} className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-ink">Email</p>
                <p className="mt-1 text-sm text-ink/50">support@auraofficial.in</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-ink">Phone</p>
                <p className="mt-1 text-sm text-ink/50">+91 80 4567 8900 (Mon–Sat, 10am–7pm)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-ink">Studio</p>
                <p className="mt-1 text-sm text-ink/50">
                  4th Floor, Indiranagar 100ft Road, Bengaluru, Karnataka 560038
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
