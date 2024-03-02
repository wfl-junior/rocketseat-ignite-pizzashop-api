import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { t } from "elysia";
import { database } from "../database";
import { authLinks, restaurants } from "../database/schema";
import { elysia } from "../elysia";

export const authenticateFromLinkRouter = elysia.get(
  "/auth-links/authenticate",
  async ({ query, signUser, set }) => {
    const authLink = await database.query.authLinks.findFirst({
      where: eq(authLinks.code, query.code),
      columns: {
        id: true,
        userId: true,
        createdAt: true,
      },
    });

    if (!authLink) {
      throw new Error("Auth link not found");
    }

    const daysSinceAuthLinkWasCreated = dayjs().diff(
      authLink.createdAt,
      "days",
    );

    if (daysSinceAuthLinkWasCreated > 7) {
      throw new Error("Auth link expired, please generate a new one");
    }

    const managedRestaurant = await database.query.restaurants.findFirst({
      where: eq(restaurants.managerId, authLink.userId),
      columns: {
        id: true,
      },
    });

    await signUser({
      sub: authLink.userId,
      restaurantId: managedRestaurant?.id,
    });

    await database.delete(authLinks).where(eq(authLinks.id, authLink.id));
    set.redirect = query.redirect;
  },
  {
    query: t.Object({
      code: t.String(),
      redirect: t.String(),
    }),
  },
);
