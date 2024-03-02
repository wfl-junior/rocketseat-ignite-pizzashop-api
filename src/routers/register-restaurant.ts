import { t } from "elysia";
import { database } from "../database";
import { restaurants, users } from "../database/schema";
import { elysia } from "../elysia";

export const registerRestaurantRouter = elysia.post(
  "/restaurants",
  async ({ body, set }) => {
    const restaurant = await database.transaction(async transaction => {
      const [manager] = await transaction
        .insert(users)
        .values({
          role: "manager",
          name: body.manager.name,
          email: body.manager.email,
          phone: body.manager.phone,
        })
        .returning({ id: users.id });

      const [restaurant] = await transaction
        .insert(restaurants)
        .values({
          name: body.name,
          managerId: manager.id,
        })
        .returning();

      return restaurant;
    });

    set.status = 201;
    return restaurant;
  },
  {
    type: "application/json",
    body: t.Object({
      name: t.String(),
      manager: t.Object({
        name: t.String(),
        email: t.String({ format: "email" }),
        phone: t.String(),
      }),
    }),
  },
);
