"use client";

import Link from "next/link";
import { useState } from "react";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/shop?filter=New" },
    { label: "Denim", href: "/shop?filter=Denim" },
    { label: "Outerwear", href: "/shop?filter=Outerwear" },
    { label: "T-Shirts", href: "/shop?filter=T-Shirts" },
    { label: "Sale", href: "/shop?filter=Sale" },
  ],
  Help: [
    { label: "Size Guide", href: "/help/size-guide" },
    { label: "Shipping", href: "/help/shipping" },
    { label: "Returns", href: "/help/returns" },
    { label: "Track Order", href: "/help/track-order" },
    { label: "Contact Us", href: "/contact" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers", href: "/careers" },
    { label: "Stores", href: "/stores" },
    { label: "Journal", href: "/journal" },
  ],
};

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire up to your newsletter API (e.g. /api/newsletter)
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[var(--color-ink)] text-white/80">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Top: brand + newsletter */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <Link href="/" className="font-display text-2xl text-white">
              BestRobe
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Considered essentials, built to last. Cut straight, made to age
              with you.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg text-white">Join the list</h3>
            <p className="mt-2 text-sm text-white/60">
              Early access to drops, restocks, and 10% off your first order.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-white px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition-opacity hover:opacity-90"
              >
                Subscribe
              </button>
            </form>

            {subscribed && (
              <p className="mt-2 text-sm text-emerald-400">
                Thanks — check your inbox to confirm.
              </p>
            )}
          </div>
        </div>

        {/* Middle: link columns */}
        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-3 md:gap-12">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-medium uppercase tracking-widest text-white/50">
                {heading}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: legal */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} BestRobe. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
