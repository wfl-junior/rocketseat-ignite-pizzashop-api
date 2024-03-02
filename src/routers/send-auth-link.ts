import { createId } from "@paralleldrive/cuid2";
import chalk from "chalk";
import { eq } from "drizzle-orm";
import { t } from "elysia";
import nodemailer from "nodemailer";
import { database } from "../database";
import { authLinks, users } from "../database/schema";
import { elysia } from "../elysia";
import { env } from "../env";
import { mail } from "../lib/mail";

export const sendAuthLinkRouter = elysia.post(
  "/authenticate",
  async ({ body, request, set }) => {
    const user = await database.query.users.findFirst({
      where: eq(users.email, body.email),
      columns: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const authLinkCode = createId();
    await database
      .insert(authLinks)
      .values({ code: authLinkCode, userId: user.id });

    const authLink = new URL("/auth-links/authenticate", request.url);
    authLink.searchParams.set("code", authLinkCode);
    authLink.searchParams.set("redirect", env.AUTH_REDIRECT_URL);

    const info = await mail.sendMail({
      from: {
        name: "Pizza Shop",
        address: "hi@pizzashop.com",
      },
      to: user.email,
      subject: "Authenticate to Pizza Shop",
      text: `Use the following link to authenticate on Pizza Shop: ${authLink.toString()}`,
    });

    console.log(chalk.blue.bold(nodemailer.getTestMessageUrl(info)));
    set.status = 204;
  },
  {
    type: "application/json",
    body: t.Object({
      email: t.String({ format: "email" }),
    }),
  },
);
