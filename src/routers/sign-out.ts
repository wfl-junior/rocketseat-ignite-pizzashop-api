import { elysia } from "../elysia";

export const signOutRouter = elysia.post("/sign-out", ({ signOut, set }) => {
  signOut();
  set.status = 204;
});
