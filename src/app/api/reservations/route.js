// src/app/api/reservations/route.js
// POST /api/reservations: validates a booking on the server and saves it for the signed-in user.
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { reservations } from "@/db/schema";

export async function POST(request) {
  // 1. Only signed-in users can book
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ error: "Please sign in first" }, { status: 401 });
  }

  // 2. Read what the form sent
  const body = await request.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const date = String(body?.date ?? "");
  const time = String(body?.time ?? "");
  const guests = Number(body?.guests);

  // 3. Check every field on the server. The browser's checks can be bypassed, so these are the real ones
  if (name.length < 1 || name.length > 100) {
    return Response.json({ error: "Please enter your name" }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 200) {
    return Response.json({ error: "Please enter a valid email" }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    return Response.json({ error: "Please choose a valid date" }, { status: 400 });
  }
  // Today's date in the restaurant's time zone (the server runs in UTC)
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" });
  if (date < today) {
    return Response.json({ error: "That date has already passed" }, { status: 400 });
  }
  if (!/^\d{2}:\d{2}$/.test(time) || time < "09:00" || time > "22:00") {
    return Response.json({ error: "Please choose a time between 09:00 and 22:00" }, { status: 400 });
  }
  if (!Number.isInteger(guests) || guests < 1 || guests > 12) {
    return Response.json({ error: "Guests must be between 1 and 12" }, { status: 400 });
  }

  // 4. Save it. returning() gives us back the saved row
  const [reservation] = await db
    .insert(reservations)
    .values({ userId: session.user.id, name, email, date, time, guests })
    .returning();

  return Response.json(reservation, { status: 201 }); // 201 means "created"
}