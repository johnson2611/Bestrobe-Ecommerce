"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter");
  const [activeCategory, setActiveCategory] = useState<string>(
    initialFilter && initialFilter !== "new" ? initialFilter : "All"
  );
  const [newOnly, setNewOnly] = useState(initialFilter === "new");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesNew = !newOnly || p.newArrival;
      return matchesCategory && matchesNew;
    });
  }, [activeCategory, newOnly]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl text-[var(--color-ink)]">Shop the collection</h1>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              activeCategory === cat
                ? "border-[var(--color-wine)] bg-[var(--color-wine)] text-white"
                : "border-[var(--color-line)] hover:border-[var(--color-wine)]/50"
            }`}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => setNewOnly((v) => !v)}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            newOnly
              ? "border-[var(--color-wine)] bg-[var(--color-wine)] text-white"
              : "border-[var(--color-line)] hover:border-[var(--color-wine)]/50"
          }`}
        >
          New arrivals only
        </button>
      </div>

      <p className="mt-6 text-sm text-[var(--color-ink)]/50">
        {filtered.length} {filtered.length === 1 ? "item" : "items"}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-[var(--color-ink)]/50">
          Nothing matches that filter yet.
        </p>
      )}
    </main>
  );
}
