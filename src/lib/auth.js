// src/lib/auth.js
// Configures Better Auth. The server uses this to create users, check passwords and manage sessions.
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle"; // lets Better Auth use our Drizzle database
import { nextCookies } from "better-auth/next-js"; // lets it set cookies inside Next.js
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }), // store users and sessions in Neon
  emailAndPassword: { enabled: true }, // sign up and log in with email + password
  plugins: [nextCookies()], // keep this last in the list
});