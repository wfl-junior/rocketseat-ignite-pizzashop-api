import { Elysia } from "elysia";
import { env } from "./env";

const app = new Elysia().get("/", () => {
  return "Hello World";
});

app.listen(env.PORT, server => {
  console.log(`HTTP server running at http://localhost:${server.port}`);
});
