// src/app/api/orders/route.js
// GET /api/orders?id=5: returns one order and its items, but only if it belongs to the signed-in user.
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";

export const dynamic = "force-dynamic"; // always read the latest status from the database

export async function GET(request) {
  // Who is asking?
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ error: "Please sign in first" }, { status: 401 });
  }

  // Which order? It must be a whole number
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!Number.isInteger(id)) {
    return Response.json({ error: "Invalid order id" }, { status: 400 });
  }

  // Match the id AND the owner, so nobody can look at someone else's order
  const [order] = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, id), eq(orders.userId, session.user.id)));
  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  return Response.json({
    id: order.id,
    status: order.status,
    totalAmount: order.totalAmount, // pence
    currency: order.currency,
    paidAt: order.paidAt,
    items: items.map((item) => ({ name: item.name, unitAmount: item.unitAmount, quantity: item.quantity })),
  });
}