import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

type OrderItemMeta = {
  name: string;
  size: string;
  price: number;
  quantity: number;
};

export async function GET(req: NextRequest) {
  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json(
      { error: "Paystack secret key is not configured on the server." },
      { status: 500 },
    );
  }

  const reference = req.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "Missing reference." }, { status: 400 });
  }

  try {
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } },
    );

    const data = await paystackResponse.json();

    if (!paystackResponse.ok || !data.status) {
      return NextResponse.json(
        { error: data.message ?? "Could not verify transaction." },
        { status: 502 },
      );
    }

    const paid = data.data.status === "success";
    const amount = data.data.amount / 100;
    const email: string = data.data.customer?.email ?? "";
    const items: OrderItemMeta[] = data.data.metadata?.items ?? [];


    if (paid) {
      const existing = await prisma.order.findUnique({ where: { reference } });

      if (!existing) {
        await prisma.order.create({
          data: {
            reference,
            email,
            amount,
            status: "success",
            items: {
              create: items.map((item) => ({
                name: item.name,
                size: item.size,
                price: item.price,
                quantity: item.quantity,
              })),
            },
          },
        });
      }
    }

    return NextResponse.json({ paid, amount, reference: data.data.reference });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong verifying the transaction." },
      { status: 500 },
    );
  }
}
