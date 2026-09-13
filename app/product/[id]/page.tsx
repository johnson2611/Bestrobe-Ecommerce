import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

// Pre-render all product pages at build time (Server Component + generateStaticParams)
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
