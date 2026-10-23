// src/db/index.js
// Opens the connection to Neon. Other files import `db` to run queries.
import { neon } from "@neondatabase/serverless"; // Neon's connection tool
import { drizzle } from "drizzle-orm/neon-http"; // Drizzle, set up for Neon
import * as schema from "./schema.js"; // our table definitions

const sql = neon(process.env.DATABASE_URL); // the secret URL comes from .env
export const db = drizzle(sql, { schema }); // `db` is what we query with