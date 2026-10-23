// src/db/index.js
// Opens the connection to Neon. Other files import `db` to run queries.
// We use the standard "pg" driver because it supports transactions, which signing up needs.
import { drizzle } from "drizzle-orm/node-postgres"; // Drizzle, set up for the pg driver
import pg from "pg"; // the standard Postgres driver
import * as schema from "./schema.js"; // our table definitions

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 5 }); // at most 5 connections at once
export const db = drizzle(pool, { schema }); // `db` is what we query with