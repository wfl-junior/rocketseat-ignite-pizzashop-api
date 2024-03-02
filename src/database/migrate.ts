import chalk from "chalk";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "../env";

const connection = postgres(env.DATABASE_CONNECTION_STRING, { max: 1 });
const database = drizzle(connection);

await migrate(database, { migrationsFolder: "drizzle" });
await connection.end();
console.log(chalk.greenBright("Migrations applied successfully!"));
process.exit(0);
