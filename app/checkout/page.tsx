"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/products";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-[var(--color-ink)]">Nothing to check out yet</h1>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-[var(--color-wine)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-wine-dark)]"
        >
          Shop the collection
        </Link>
      </main>
    );
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items: items.map((i) => ({ name: i.name, size: i.size, price: i.price, quantity: i.quantity })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.authorizationUrl;
    } catch {
      setError("Could not reach the payment server. Check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl text-[var(--color-ink)]">Checkout</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handlePay} className="space-y-6">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-[var(--color-ink)]/70">
              Your email (for the receipt)
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[var(--color-line)] px-4 py-3 outline-none focus:border-[var(--color-wine)]"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[var(--color-wine)] py-3.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-wine-dark)] disabled:opacity-60"
          >
            {loading ? "Redirecting to payment…" : `Pay ${formatNaira(subtotal)} with Paystack`}
          </button>

          <p className="text-xs text-[var(--color-ink)]/50">
            You&apos;ll be redirected to Paystack&apos;s secure payment page to complete your purchase.
          </p>
        </form>

        <aside className="h-fit rounded-2xl border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-display text-lg text-[var(--color-ink)]">Order summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                <span className="text-[var(--color-ink)]/70">
                  {item.name} ({item.size}) × {item.quantity}
                </span>
                <span>{formatNaira(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-[var(--color-line)] pt-4 font-medium">
            <span>Total</span>
            <span>{formatNaira(subtotal)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
