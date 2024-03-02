import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .optional()
    .default("production"),

  // Auth
  AUTH_REDIRECT_URL: z.string().url(),
  JWT_SECRET: z.string().min(1),

  // Drizzle
  DATABASE_CONNECTION_STRING: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables",
    parsedEnv.error.flatten().fieldErrors,
  );

  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
