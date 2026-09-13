import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function GET(req: NextRequest) {
  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json(
      { error: "Paystack secret key is not configured on the server." },
      { status: 500 }
    );
  }

  const reference = req.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "Missing reference." }, { status: 400 });
  }

  try {
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
    );

    const data = await paystackResponse.json();

    if (!paystackResponse.ok || !data.status) {
      return NextResponse.json(
        { error: data.message ?? "Could not verify transaction." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      paid: data.data.status === "success",
      amount: data.data.amount / 100,
      reference: data.data.reference,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong verifying the transaction." },
      { status: 500 }
    );
  }
}
