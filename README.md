# Bestrobe — Clothing Store (Next.js)

A fuller e-commerce build on Next.js (App Router), TypeScript, and Tailwind CSS —
an animated hero carousel, category filtering, individual product pages, a real
cart, and direct server-side Paystack integration.

## Features

- **Animated hero carousel** (Framer Motion) — auto-advancing slides with slide/fade
  transitions and manual dot navigation, linking into filtered shop views
- **Product catalog** with categories, descriptions, and a "new arrivals" flag
- **Shop page** with live category filtering + a "new arrivals only" toggle
  (client-side filtering, no page reload)
- **Individual product pages** at `/product/[id]`, statically pre-rendered at build
  time via `generateStaticParams` (fast page loads, good for SEO)
- **Real cart**: add, remove, update quantity, persisted in localStorage
- **Checkout** with direct, server-verified Paystack integration (same secure
  initialize → redirect → verify pattern a production app would use)
- **Image support with graceful fallback** — drop files into `public/images` and
  reference them in `lib/products.ts`; missing images fall back to a colored
  placeholder instead of a broken image icon

## How the Paystack integration works

1. `/checkout` sends the cart items + email to `POST /api/paystack/initialize`.
2. That API route runs server-side, **recalculates the true total from the item
   list** (never trusts a client-sent amount), and calls Paystack's API using your
   secret key — which is never exposed to the browser.
3. Paystack returns an `authorization_url`; the browser redirects there to pay.
4. After payment, Paystack redirects to `/success?reference=...`, which calls
   `GET /api/paystack/verify?reference=...` to independently confirm the payment
   actually succeeded before clearing the cart.

This is the more production-grade pattern (compared to a client-only Inline JS
integration) because the amount and payment status are both verified server-side.

## Setup

```bash
npm install
cp .env.local.example .env.local
# paste your Paystack TEST secret key into .env.local
npm run dev
```

Visit http://localhost:3000

## Adding product images

Drop image files into `public/images/`, then reference the filename in
`lib/products.ts`:

```ts
{
  id: "oxford-shirt",
  ...
  image: "shirt.jpg",
}
```

If `image` is omitted, or the file can't be found, the product falls back to its
`color` swatch automatically.

## Testing a payment

Use Paystack's test card (only works with `sk_test_` keys):
- Card: 4084 0840 8408 4081
- CVV: 408, Expiry: any future date, PIN: 0000, OTP: 123456

## Deploying (Vercel — recommended)

1. Push to GitHub, import the repo on vercel.com.
2. Add `PAYSTACK_SECRET_KEY` in the project's Environment Variables settings.
3. Deploy — Vercel builds Next.js projects natively, no extra config needed.

## Project structure

```
app/
  page.tsx                       → homepage (hero + featured + new arrivals)
  shop/page.tsx + ShopClient.tsx  → shop page with category filtering
  product/[id]/                   → individual product pages (statically generated)
  cart/page.tsx                    → cart page
  checkout/page.tsx                 → checkout form
  success/page.tsx                   → payment confirmation
  api/paystack/
    initialize/route.ts               → server-side: starts a Paystack transaction
    verify/route.ts                     → server-side: confirms payment succeeded
lib/
  cart-context.tsx                → cart state, persisted to localStorage
  products.ts                      → product catalog + categories
components/
  Navbar.tsx                      → nav with live cart count
  HeroCarousel.tsx                 → animated hero (Framer Motion)
  ProductCard.tsx                   → product tile used on homepage + shop
```

## Before you put this on your resume/portfolio

Be able to explain, from memory: how `generateStaticParams` pre-renders the product
pages, how the cart persists across reloads, and why the checkout total is
recalculated server-side rather than trusted from the browser. That's what makes
this a real project you can defend, not just code sitting in a folder.
