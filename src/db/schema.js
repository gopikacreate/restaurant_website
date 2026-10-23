// src/db/schema.js
// Describes our database tables. Drizzle turns this into real Postgres tables.
import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

// ---------- Our own table: the menu ----------
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(), // auto-numbered unique id
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // whole pounds
  category: text("category").notNull(), // "Starters", "Mains" or "Desserts"
  image: text("image").notNull(),
  alt: text("alt").notNull(),
});

// ---------- Auth tables: these are the ones Better Auth expects ----------

// One row per person who signs up
export const user = pgTable("user", {
  id: text("id").primaryKey(), // unique id
  name: text("name").notNull(), // display name
  email: text("email").notNull().unique(), // no two accounts share an email
  emailVerified: boolean("email_verified").notNull().default(false), // we don't verify emails in this project
  image: text("image"), // optional profile picture
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// One row per active login. The browser holds a cookie with the token, and this table says who it belongs to
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(), // when the login stops working
  token: text("token").notNull().unique(), // the value stored in the cookie
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }), // belongs to a user; deleted with them
});

// How a user signs in. For email and password, the hashed password lives here
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(), // "credential" means email and password
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"), // stored hashed, never as plain text
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Used for email verification and password reset links (we don't use it yet, but the library expects it)
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});