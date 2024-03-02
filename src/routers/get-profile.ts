import { eq } from "drizzle-orm";
import { database } from "../database";
import { users } from "../database/schema";
import { elysia } from "../elysia";

export const getProfileRouter = elysia.get(
  "/me",
  async ({ getCurrentUser }) => {
    const { userId } = await getCurrentUser();
    const user = await database.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
);
