// src/db/seed.js
// A one-off script: copies the hardcoded dishes from src/data/menu.js into the database.
// Run it with: npm run db:seed
import "dotenv/config"; // must be first: loads DATABASE_URL from .env
import { db } from "./index.js"; // our database connection
import { menuItems } from "./schema.js"; // the menu_items table
import { menuItems as menuData } from "../data/menu.js"; // the old hardcoded array (renamed to avoid a name clash)

async function seed() {
  // Empty the table first and restart ids at 1, so running the script twice never makes duplicates
await db.delete(menuItems); // clears the dishes; old orders keep their copied names and prices

  // Remove the hardcoded id from each dish; the database assigns its own ids (1 to 9)
  const rows = menuData.map(({ id, ...dish }) => dish);

  // Insert all 9 dishes in one go
  await db.insert(menuItems).values(rows);

  console.log(`Seeded ${rows.length} dishes`);
}

seed()
  .then(() => process.exit(0)) // finished: exit with success
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1); // failed: exit with an error code
  });