"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, formatNaira } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition-shadow hover:shadow-[0_8px_30px_rgba(34,31,29,0.08)]"
    >
      <div className="relative h-64 overflow-hidden" style={{ background: product.color }}>
        {product.image && !imgError && (
          <Image
            src={`/images/${product.image}`}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setImgError(true)}
          />
        )}
        {product.newArrival && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs uppercase tracking-wide text-[var(--color-ink)]">
            New
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <span className="text-xs uppercase tracking-wide text-[var(--color-ink)]/50">
          {product.category}
        </span>
        <h3 className="font-display text-lg text-[var(--color-ink)] group-hover:text-[var(--color-wine)] transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-ink)]/70">{formatNaira(product.price)}</p>
      </div>
    </Link>
  );
}
