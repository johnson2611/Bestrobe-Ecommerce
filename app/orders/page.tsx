"use client";

import { useState } from "react";
import Link from "next/link";
import { formatNaira } from "@/lib/products";

type OrderItem = {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  reference: string;
  amount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export default function OrdersPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setOrders(null);

    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      setOrders(data.orders);
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl text-[var(--color-ink)]">Order history</h1>
      <p className="mt-2 text-sm text-[var(--color-ink)]/60">
        Enter the email you used at checkout to see your past orders.
      </p>

      <form onSubmit={handleLookup} className="mt-6 flex gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-xl border border-[var(--color-line)] px-4 py-3 outline-none focus:border-[var(--color-wine)]"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[var(--color-wine)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-wine-dark)] disabled:opacity-60"
        >
          {loading ? "Looking up…" : "Find orders"}
        </button>
      </form>

      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {orders && orders.length === 0 && (
        <p className="mt-10 text-center text-[var(--color-ink)]/50">
          No orders found for that email.
        </p>
      )}

      {orders && orders.length > 0 && (
        <div className="mt-8 space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-[var(--color-ink)]/50">
                    {new Date(order.createdAt).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-[var(--color-ink)]/40">Ref: {order.reference}</p>
                </div>
                <span className="rounded-full bg-[var(--color-sand)] px-3 py-1 text-xs uppercase tracking-wide text-[var(--color-ink)]">
                  {order.status}
                </span>
              </div>

              <div className="mt-4 divide-y divide-[var(--color-line)]">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between py-2 text-sm">
                    <span className="text-[var(--color-ink)]/70">
                      {item.name} (Size {item.size}) × {item.quantity}
                    </span>
                    <span>{formatNaira(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between border-t border-[var(--color-line)] pt-4 font-medium">
                <span>Total</span>
                <span>{formatNaira(order.amount)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link href="/shop" className="mt-10 inline-block text-sm text-[var(--color-wine)] underline underline-offset-4">
        ← Back to shop
      </Link>
    </main>
  );
}
