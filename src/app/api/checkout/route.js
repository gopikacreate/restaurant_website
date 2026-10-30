// src/app/api/checkout/route.js
// POST /api/checkout: creates a pending order, then a Stripe Checkout Session, and returns the Stripe page URL.
import { headers } from "next/headers";
import { eq, inArray } from "drizzle-orm";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { menuItems, orders, orderItems } from "@/db/schema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // talks to Stripe with our secret key

export async function POST(request) {
  // 1. Who is asking? Check the real session in the database (not just the cookie)
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ error: "Please sign in first" }, { status: 401 });
  }

  // 2. Read and check what the browser sent. We only accept dish ids and quantities, NEVER prices
  const body = await request.json().catch(() => null);
  const requested = body?.items;
  const valid =
    Array.isArray(requested) &&
    requested.length > 0 &&
    requested.every(
      (item) =>
        Number.isInteger(item.menuItemId) &&
        Number.isInteger(item.quantity) &&
        item.quantity >= 1 &&
        item.quantity <= 10
    );
  if (!valid) {
    return Response.json({ error: "Invalid order" }, { status: 400 });
  }

  // 3. Look up the REAL prices in our own database
  const ids = requested.map((item) => item.menuItemId);
  const dishes = await db.select().from(menuItems).where(inArray(menuItems.id, ids));
  const lines = requested.map((item) => {
    const dish = dishes.find((d) => d.id === item.menuItemId);
    return dish && { dish, quantity: item.quantity, unitAmount: dish.price * 100 }; // pounds to pence
  });
  if (lines.some((line) => !line)) {
    return Response.json({ error: "That dish does not exist" }, { status: 400 });
  }
  const total = lines.reduce((sum, line) => sum + line.unitAmount * line.quantity, 0);

  // 4. Save the order as "pending". A transaction means both inserts happen together or not at all
  const order = await db.transaction(async (tx) => {
    const [created] = await tx.insert(orders).values({ userId: session.user.id, totalAmount: total }).returning();
    await tx.insert(orderItems).values(
      lines.map((line) => ({
        orderId: created.id,
        menuItemId: line.dish.id,
        name: line.dish.name, // copied, so old orders keep their original details
        unitAmount: line.unitAmount,
        quantity: line.quantity,
      }))
    );
    return created;
  });

  // 5. Start the Stripe Checkout Session
  const baseUrl = process.env.BETTER_AUTH_URL; // http://localhost:3000 locally, the live address on Vercel
  try {
    const checkout = await stripe.checkout.sessions.create({
      mode: "payment", // one-off payment, not a subscription
      line_items: lines.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: "gbp",
          unit_amount: line.unitAmount,
          product_data: { name: line.dish.name },
        },
      })),
      client_reference_id: String(order.id), // lets the webhook find our order later
      metadata: { orderId: String(order.id) },
      customer_email: session.user.email,
      success_url: `${baseUrl}/order/success?order_id=${order.id}`,
      cancel_url: `${baseUrl}/#menu`,
    });

    // Remember which Stripe session belongs to this order
    await db.update(orders).set({ stripeSessionId: checkout.id }).where(eq(orders.id, order.id));

    return Response.json({ url: checkout.url }); // the browser will redirect here
  } catch (error) {
    console.error("Stripe error:", error.message);
    await db.delete(orders).where(eq(orders.id, order.id)); // Stripe failed: remove the unused order
    return Response.json({ error: "Could not start checkout" }, { status: 500 });
  }
}