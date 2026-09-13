import { Suspense } from "react";
import ShopClient from "./ShopClient";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-6 py-16">Loading…</div>}>
      <ShopClient />
    </Suspense>
  );
}
