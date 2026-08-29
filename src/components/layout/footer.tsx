import Link from "next/link";
import { AtSign, Play, Rss } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop/men", label: "Men" },
      { href: "/shop/women", label: "Women" },
      { href: "/shop", label: "New Drop" },
      { href: "/collections/monochrome-01", label: "Collections" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/shop", label: "Shipping & Returns" },
      { href: "/shop", label: "Size Guide" },
      { href: "/shop", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Aura" },
      { href: "/shop", label: "Sustainability" },
      { href: "/shop", label: "Careers" },
      { href: "/shop", label: "Press" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <p className="font-display text-2xl tracking-[0.24em]">AURA</p>
            <p className="mt-4 max-w-xs text-sm text-paper/50">
              Premium athleisure and streetwear engineered in India, designed for the world.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link href="#" aria-label="Instagram" className="text-paper/60 hover:text-paper">
                <AtSign className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-paper/60 hover:text-paper">
                <Rss className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="Youtube" className="text-paper/60 hover:text-paper">
                <Play className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-paper/40">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-paper/70 hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-6 text-xs text-paper/40 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Aura Studios Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/shop" className="hover:text-paper/70">Privacy Policy</Link>
            <Link href="/shop" className="hover:text-paper/70">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
