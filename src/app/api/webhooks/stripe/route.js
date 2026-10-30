// src/app/api/webhooks/stripe/route.js
// Stripe calls this URL after a payment. It is the ONLY place an order is marked "paid".
import Stripe from "stripe";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  // 1. Read the body as raw text. The signature check needs the exact original bytes, so no request.json() here
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  // 2. Prove the message really came from Stripe. A fake request fails here
  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  // 3. We only care about a finished checkout
  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object;

    // Make sure the money has really been received
    if (session.payment_status === "paid") {
      const orderId = Number(session.metadata?.orderId); // we stored this when creating the session

      // Find the matching order
      const [order] = await db
        .select()
        .from(orders)
        .where(and(eq(orders.id, orderId), eq(orders.stripeSessionId, session.id)));

      // Mark it paid only if the order exists and Stripe charged exactly what we expected
      if (order && order.status !== "paid" && session.amount_total === order.totalAmount) {
        await db.update(orders).set({ status: "paid", paidAt: new Date() }).where(eq(orders.id, order.id));
      }
    }
  }

  return Response.json({ received: true }); // tells Stripe "got it", so it stops retrying
}