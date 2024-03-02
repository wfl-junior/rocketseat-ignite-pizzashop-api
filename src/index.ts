import { Elysia } from "elysia";

const app = new Elysia().get("/", () => {
  return "Hello World";
});

app.listen(3333, server => {
  console.log(`HTTP server running at http://localhost:${server.port}`);
});
