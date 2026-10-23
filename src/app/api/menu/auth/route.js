// src/app/api/auth/[...all]/route.js
// One route handles every auth request: /api/auth/sign-up/email, /sign-in/email, /sign-out, /get-session...
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);