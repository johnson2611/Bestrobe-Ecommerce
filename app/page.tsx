import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  const featured = products.filter((p) => p.featured);
  const newArrivals = products.filter((p) => p.newArrival);

  return (
    <main>
      <HeroCarousel />

      <section className="border-y border-[var(--color-line)] bg-[var(--color-sand)]/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 text-sm text-[var(--color-ink)]/70">
          <span>Free delivery in Lagos on orders over ₦40,000</span>
          <span className="hidden sm:inline">Secure checkout via Paystack</span>
          <span>Easy 14-day returns</span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl text-[var(--color-ink)]">Featured</h2>
          <Link href="/shop" className="text-sm text-[var(--color-wine)] underline underline-offset-4">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-ink)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl text-white">New arrivals</h2>
            <Link href="/shop?filter=new" className="text-sm text-white/70 underline underline-offset-4">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
