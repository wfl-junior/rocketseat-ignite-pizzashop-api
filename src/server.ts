import { Elysia } from "elysia";
import { env } from "./env";
import { registerRestaurantRouter } from "./routers/register-restaurant";
import { sendAuthLinkRouter } from "./routers/send-auth-link";

const app = new Elysia().use(registerRestaurantRouter).use(sendAuthLinkRouter);

app.listen(env.PORT, server => {
  console.log(`HTTP server running at http://localhost:${server.port} 🚀`);
});
