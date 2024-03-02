import { createId } from "@paralleldrive/cuid2";
import { char, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const restaurants = pgTable("restaurants", {
  id: char("id", { length: 24 }).$defaultFn(createId).primaryKey(),
  createdAt: timestamp("created_at")
    .notNull()
    .defaultNow()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$defaultFn(() => new Date()),

  name: varchar("name").notNull(),
  description: text("description"),
});

export type Restaurant = typeof restaurants.$inferSelect;
export type NewRestaurant = typeof restaurants.$inferSelect;
