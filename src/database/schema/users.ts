import { createId } from "@paralleldrive/cuid2";
import { char, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["manager", "customer"]);

export const users = pgTable("users", {
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
  email: varchar("name").notNull().unique(),
  phone: varchar("phone"),
  role: userRoleEnum("role").default("customer").notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferSelect;
