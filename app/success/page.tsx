"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/products";

type VerifyResult = { paid: boolean; amount: number; reference: string } | null;

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const { clearCart } = useCart();

  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [result, setResult] = useState<VerifyResult>(null);

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      return;
    }
    fetch(`/api/paystack/verify?reference=${reference}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus("error");
          return;
        }
        setResult(data);
        setStatus("done");
        if (data.paid) clearCart();
      })
      .catch(() => setStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  if (status === "loading") {
    return <p className="text-[var(--color-ink)]/60">Confirming your payment…</p>;
  }

  if (status === "error" || !result) {
    return (
      <>
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          We couldn&apos;t confirm that payment
        </h1>
        <p className="mt-3 text-[var(--color-ink)]/60">
          If you were charged, contact support with your reference and we&apos;ll sort it out.
        </p>
      </>
    );
  }

  if (!result.paid) {
    return (
      <>
        <h1 className="font-display text-3xl text-[var(--color-ink)]">Payment not completed</h1>
        <p className="mt-3 text-[var(--color-ink)]/60">Your card wasn&apos;t charged. You can try again.</p>
        <Link href="/cart" className="mt-6 inline-block text-sm text-[var(--color-wine)] underline underline-offset-4">
          Back to cart
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="font-display text-3xl text-[var(--color-ink)]">Payment successful</h1>
      <p className="mt-3 text-[var(--color-ink)]/60">
        Reference: {result.reference}
      </p>
      <p className="mt-1 font-medium text-[var(--color-ink)]">{formatNaira(result.amount)} paid</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-[var(--color-wine)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-wine-dark)]"
      >
        Back to store
      </Link>
    </>
  );
}

export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <Suspense fallback={<p className="text-[var(--color-ink)]/60">Loading…</p>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
