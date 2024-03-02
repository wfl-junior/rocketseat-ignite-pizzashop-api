import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import { Elysia, t, type Static } from "elysia";
import { env } from "./env";

const jwtPayloadSchema = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
});

export const elysia = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET,
      schema: jwtPayloadSchema,
    }),
  )
  .use(cookie())
  .derive(({ jwt, setCookie, removeCookie, cookie, set }) => ({
    async signUser(payload: Static<typeof jwtPayloadSchema>) {
      const token = await jwt.sign(payload);

      setCookie("auth", token, {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    },
    signOut() {
      removeCookie("auth");
    },
    async getCurrentUser() {
      const payload = await jwt.verify(cookie.auth);

      if (!payload) {
        set.status = 401;
        throw new Error("Unauthorized");
      }

      return {
        userId: payload.sub,
        restaurantId: payload.restaurantId,
      };
    },
  }));
