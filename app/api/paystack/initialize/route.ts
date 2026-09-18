// import { NextRequest, NextResponse } from "next/server";

// const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// type CheckoutItem = {
//   name: string;
//   size: string;
//   price: number;
//   quantity: number;
// };

// export async function POST(req: NextRequest) {
//   if (!PAYSTACK_SECRET_KEY) {
//     return NextResponse.json(
//       { error: "Paystack secret key is not configured on the server." },
//       { status: 500 },
//     );
//   }

//   try {
//     const body = await req.json();
//     const { email, items } = body as { email: string; items: CheckoutItem[] };

//     if (!email || !items?.length) {
//       return NextResponse.json(
//         { error: "Missing email or items." },
//         { status: 400 },
//       );
//     }

//     const serverCalculatedTotal = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0,
//     );

//     const paystackResponse = await fetch(
//       "https://api.paystack.co/transaction/initialize",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           amount: serverCalculatedTotal * 100, // Paystack expects kobo
//           currency: "NGN",
//           callback_url: `${req.nextUrl.origin}/success`,
//           metadata: { items },
//         }),
//       },
//     );

//     const data = await paystackResponse.json();

//     if (!paystackResponse.ok || !data.status) {
//       return NextResponse.json(
//         {
//           error:
//             data.message ?? "Paystack failed to initialize this transaction.",
//         },
//         { status: 502 },
//       );
//     }

//     return NextResponse.json({
//       authorizationUrl: data.data.authorization_url,
//       reference: data.data.reference,
//     });
//   } catch {
//     return NextResponse.json(
//       { error: "Something went wrong initializing the transaction." },
//       { status: 500 },
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

type CheckoutItem = {
  name: string;
  size: string;
  price: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json(
      { error: "Paystack secret key is not configured on the server." },
      { status: 500 },
    );
  }

  try {
    const body = await req.json();
    const { email, items } = body as { email: string; items: CheckoutItem[] };

    if (!email || !items?.length) {
      return NextResponse.json(
        { error: "Missing email or items." },
        { status: 400 },
      );
    }

    // Recompute the total server-side from the item list rather than trusting
    // a client-sent amount, so a tampered request can't under-charge.
    const serverCalculatedTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Prefer an explicit site URL over the request's own origin. On Netlify,
    // req.nextUrl.origin can resolve to a per-deploy URL (the long hash-prefixed
    // one) instead of your main domain, which sends customers to the wrong place
    // after payment. Netlify sets URL to your site's real, stable domain — we
    // fall back to the request origin only for local development, where that
    // env var isn't set.
    const siteUrl = process.env.URL ?? req.nextUrl.origin;

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: serverCalculatedTotal * 100, // Paystack expects kobo
          currency: "NGN",
          callback_url: `${siteUrl}/success`,
          metadata: { items },
        }),
      },
    );

    const data = await paystackResponse.json();

    if (!paystackResponse.ok || !data.status) {
      return NextResponse.json(
        {
          error:
            data.message ?? "Paystack failed to initialize the transaction.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong initializing the transaction." },
      { status: 500 },
    );
  }
}
