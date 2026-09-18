"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart, CartItem } from "@/lib/cart-context";
import { formatNaira } from "@/lib/products";

function CartThumbnail({ item }: { item: CartItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg"
      style={{ background: item.color }}
    >
      {item.image && !imgError && (
        <Image
          src={`/images/${item.image}`}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          Your cart is empty
        </h1>
        <p className="mt-3 text-[var(--color-ink)]/60">
          Add something from the collection.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-[var(--color-wine)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-wine-dark)]"
        >
          Shop the collection
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl text-[var(--color-ink)]">
        Your cart
      </h1>

      <div className="mt-8 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.size}`}
            className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center"
          >
            <CartThumbnail item={item} />

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-[var(--color-ink)]">
                    {item.name}
                  </p>
                  <p className="text-sm text-[var(--color-ink)]/60">
                    Size {item.size} · {formatNaira(item.price)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.productId, item.size)}
                  className="text-sm text-[var(--color-ink)]/50 hover:text-red-600"
                >
                  Remove
                </button>
              </div>

              <div className="mt-3 flex w-fit items-center rounded-full border border-[var(--color-line)]">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.size, item.quantity - 1)
                  }
                  className="px-3 py-1.5 text-[var(--color-ink)]/70 hover:text-[var(--color-wine)]"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-8 text-center text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.size, item.quantity + 1)
                  }
                  className="px-3 py-1.5 text-[var(--color-ink)]/70 hover:text-[var(--color-wine)]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <p className="text-right font-medium text-[var(--color-ink)] sm:w-28">
              {formatNaira(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link
          href="/shop"
          className="text-sm text-[var(--color-wine)] underline underline-offset-4"
        >
          Continue shopping
        </Link>
        <div className="text-right">
          <p className="text-sm text-[var(--color-ink)]/60">Subtotal</p>
          <p className="font-display text-2xl text-[var(--color-ink)]">
            {formatNaira(subtotal)}
          </p>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block w-full rounded-full bg-[var(--color-wine)] py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-[var(--color-wine-dark)]"
      >
        Proceed to checkout
      </Link>
    </main>
  );
}
