import { Elysia, t } from "elysia";
import { database } from "./database";
import { restaurants, users } from "./database/schema";
import { env } from "./env";

const app = new Elysia().post(
  "/restaurants",
  async ({ body, set }) => {
    const restaurant = await database.transaction(async transaction => {
      const [manager] = await transaction
        .insert(users)
        .values({
          name: body.manager.name,
          email: body.manager.email,
          phone: body.manager.phone,
          role: "manager",
        })
        .returning({ id: users.id });

      const [restaurant] = await transaction
        .insert(restaurants)
        .values({
          managerId: manager.id,
          name: body.name,
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

app.listen(env.PORT, server => {
  console.log(`HTTP server running at http://localhost:${server.port} 🚀`);
});
