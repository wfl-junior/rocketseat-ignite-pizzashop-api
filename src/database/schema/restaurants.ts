import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { char, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from ".";

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

  managerId: char("manager_id", { length: 24 }).references(() => users.id, {
    onDelete: "set null",
  }),

  name: varchar("name").notNull(),
  description: text("description"),
});

export const restaurantsRelations = relations(restaurants, ({ one }) => ({
  manager: one(users, {
    fields: [restaurants.managerId],
    references: [users.id],
    relationName: "restaurant_manager",
  }),
}));

export type Restaurant = typeof restaurants.$inferSelect;
export type NewRestaurant = typeof restaurants.$inferSelect;
