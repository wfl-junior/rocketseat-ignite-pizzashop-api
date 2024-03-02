import { elysia } from "./elysia";
import { env } from "./env";
import { authenticateFromLinkRouter } from "./routers/authenticate-from-link";
import { registerRestaurantRouter } from "./routers/register-restaurant";
import { sendAuthLinkRouter } from "./routers/send-auth-link";

const app = elysia
  .use(registerRestaurantRouter)
  .use(sendAuthLinkRouter)
  .use(authenticateFromLinkRouter);

app.listen(env.PORT, server => {
  console.log(`HTTP server running at http://localhost:${server.port} 🚀`);
});
