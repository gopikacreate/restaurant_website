// src/db/schema.js
// Describes our database tables in JavaScript. Drizzle turns this into real Postgres tables.
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

// The menu_items table: one row per dish
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(), // auto-numbered unique id (1, 2, 3...)
  name: text("name").notNull(), // dish name, required
  description: text("description").notNull(), // short description, required
  price: integer("price").notNull(), // price in whole pounds, required
  category: text("category").notNull(), // "Starters", "Mains" or "Desserts"
  image: text("image").notNull(), // path or link to the photo
  alt: text("alt").notNull(), // photo description for screen readers
});