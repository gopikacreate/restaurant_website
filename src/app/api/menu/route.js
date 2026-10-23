// src/app/api/menu/route.js
// The API: GET /api/menu returns every dish from the database as JSON.
import { asc } from "drizzle-orm";
import { db } from "@/db"; // the database connection (src/db/index.js)
import { menuItems } from "@/db/schema"; // the menu_items table

export const dynamic = "force-dynamic"; // always query the database on each request, never reuse a saved copy

export async function GET() {
  // SELECT * FROM menu_items ORDER BY id
  const items = await db.select().from(menuItems).orderBy(asc(menuItems.id));
  return Response.json(items); // sends the rows back as JSON
}