import { createId } from "@paralleldrive/cuid2";
import { char, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from ".";

export const authLinks = pgTable("auth_links", {
  id: char("id", { length: 24 }).$defaultFn(createId).primaryKey(),
  createdAt: timestamp("created_at")
    .notNull()
    .defaultNow()
    .$defaultFn(() => new Date()),

  userId: char("user_id", { length: 24 }).references(() => users.id, {
    onDelete: "set null",
  }),

  code: varchar("code").notNull().unique(),
});

export type AuthLink = typeof authLinks.$inferSelect;
export type NewAuthLink = typeof authLinks.$inferSelect;
