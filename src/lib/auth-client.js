// src/lib/auth-client.js
// What our React components use to sign up, sign in, sign out and read the current session.
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient(); // talks to /api/auth on the same site