"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, formatNaira } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      color: product.color,
      image: product.image,
      size,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/shop" className="text-sm text-[var(--color-wine)] underline underline-offset-4">
        ← Back to shop
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative h-[420px] overflow-hidden rounded-2xl sm:h-[520px]" style={{ background: product.color }}>
          {product.image && !imgError && (
            <Image
              src={`/images/${product.image}`}
              alt={product.name}
              fill
              className="object-cover"
              sizes="50vw"
              onError={() => setImgError(true)}
            />
          )}
          {product.newArrival && (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs uppercase tracking-wide text-[var(--color-ink)]">
              New
            </span>
          )}
        </div>

        <div>
          <span className="text-xs uppercase tracking-wide text-[var(--color-ink)]/50">
            {product.category}
          </span>
          <h1 className="mt-2 font-display text-4xl text-[var(--color-ink)]">{product.name}</h1>
          <p className="mt-3 text-xl text-[var(--color-ink)]/80">{formatNaira(product.price)}</p>
          <p className="mt-6 max-w-md text-[var(--color-ink)]/70">{product.description}</p>

          <div className="mt-8">
            <p className="mb-2 text-xs uppercase tracking-wide text-[var(--color-ink)]/50">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${size === s
                      ? "border-[var(--color-wine)] bg-[var(--color-wine)] text-white"
                      : "border-[var(--color-line)] hover:border-[var(--color-wine)]/50"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="mt-8 w-full rounded-full bg-[var(--color-ink)] py-3.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-wine)] sm:w-auto sm:px-10"
          >
            {added ? "Added to cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </main>
  );
}
