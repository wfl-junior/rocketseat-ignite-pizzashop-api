import { eq } from "drizzle-orm";
import { database } from "../database";
import { restaurants } from "../database/schema";
import { elysia } from "../elysia";

export const getManagedRestaurantRouter = elysia.get(
  "/managed-restaurant",
  async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser();

    if (!restaurantId) {
      throw new Error("User is not a manager");
    }

    const restaurant = await database.query.restaurants.findFirst({
      where: eq(restaurants.id, restaurantId),
    });

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    return restaurant;
  },
);
