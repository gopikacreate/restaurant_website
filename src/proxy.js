// src/proxy.js
// Runs before the matching requests reach their pages or routes. Blocks anyone who isn't signed in.
// (In Next.js 15 and earlier this file was called middleware.js.)
import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies"; // checks whether a session cookie exists

export function proxy(request) {
  const sessionCookie = getSessionCookie(request); // null when the visitor has no login cookie

  if (!sessionCookie) {
    // API calls get a JSON error, because a redirect page makes no sense to fetch()
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Please sign in first" }, { status: 401 });
    }
    // Page visits get sent to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // signed in: carry on
}

// Only these paths are checked. The Stripe webhook is deliberately NOT listed, because Stripe is not a signed-in user.
export const config = {
 matcher: ["/api/checkout", "/api/reservations", "/api/orders/:path*", "/order/:path*"],
};