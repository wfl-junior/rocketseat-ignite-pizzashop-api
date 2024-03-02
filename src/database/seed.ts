import { faker } from "@faker-js/faker";
import chalk from "chalk";
import { database } from ".";
import { restaurants, users } from "./schema";

// Reset database
await database.delete(users);
await database.delete(restaurants);

console.log(chalk.yellow("✅ Database reset!"));

// Create customers
await database.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: "customer",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: "customer",
  },
]);

console.log(chalk.yellow("✅ Created customers!"));

// Create manager
const [manager] = await database
  .insert(users)
  .values({
    name: faker.person.fullName(),
    email: "admin@admin.com",
    role: "manager",
  })
  .returning({ id: users.id });

console.log(chalk.yellow("✅ Created manager!"));

// Create restaurant
await database.insert(restaurants).values({
  managerId: manager.id,
  name: faker.company.name(),
  description: faker.lorem.paragraph(),
});

console.log(chalk.yellow("✅ Created restaurant!"));
console.log(chalk.greenBright("Database seeded successfully!"));
process.exit(0);
