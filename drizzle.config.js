// drizzle.config.js
// Used by the drizzle-kit command to create tables in the database.
import "dotenv/config"; // loads .env so DATABASE_URL is available
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.js", // where our tables are described
  out: "./drizzle", // where drizzle keeps its working files
  dialect: "postgresql", // we are using Postgres
  dbCredentials: { url: process.env.DATABASE_URL }, // which database to change
});