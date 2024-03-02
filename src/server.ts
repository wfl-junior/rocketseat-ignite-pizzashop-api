import { elysia } from "./elysia";
import { env } from "./env";
import { authenticateFromLinkRouter } from "./routers/authenticate-from-link";
import { getManagedRestaurantRouter } from "./routers/get-managed-restaurant";
import { getProfileRouter } from "./routers/get-profile";
import { registerRestaurantRouter } from "./routers/register-restaurant";
import { sendAuthLinkRouter } from "./routers/send-auth-link";
import { signOutRouter } from "./routers/sign-out";

const app = elysia
  .use(registerRestaurantRouter)
  .use(sendAuthLinkRouter)
  .use(authenticateFromLinkRouter)
  .use(signOutRouter)
  .use(getProfileRouter)
  .use(getManagedRestaurantRouter)
  .onError(({ code, error, set }) => {
    switch (code) {
      case "VALIDATION": {
        set.status = error.status;
        return error.toResponse();
      }
      default: {
        set.status = 500;
        console.error(error);

        return {
          code: "INTERNAL_SERVER_ERROR",
          message: "Houston, we have a problem",
        };
      }
    }
  });

app.listen(env.PORT, server => {
  console.log(`HTTP server running at http://localhost:${server.port} 🚀`);
});
