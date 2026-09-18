"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-stone)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl tracking-tight text-[var(--color-ink)]"
        >
          BestRobe
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <Link
            href="/shop"
            className="hidden sm:inline hover:text-[var(--color-wine)] transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/shop?filter=new"
            className="hidden sm:inline hover:text-[var(--color-wine)] transition-colors"
          >
            New Arrivals
          </Link>
          <Link
            href="/orders"
            className="hidden sm:inline hover:text-[var(--color-wine)] transition-colors"
          >
            Order History
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full border border-[var(--color-ink)]/15 px-4 py-2 hover:border-[var(--color-wine)] transition-colors"
          >
            Cart
            {itemCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-wine)] px-1 text-xs font-medium text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
