import { fakerPT_BR as faker } from "@faker-js/faker";
import chalk from "chalk";
import { database } from ".";
import { restaurants, users } from "./schema";

// Reset database
await database.delete(users);
await database.delete(restaurants);

console.log(chalk.green("✅ Database reset!"));

// Create customers
await database.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: "customer",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: "customer",
  },
]);

console.log(chalk.green("✅ Created customers!"));

// Create manager
const [manager] = await database
  .insert(users)
  .values({
    name: faker.person.fullName(),
    email: "admin@admin.com",
    phone: faker.phone.number(),
    role: "manager",
  })
  .returning({ id: users.id });

console.log(chalk.green("✅ Created manager!"));

// Create restaurant
await database.insert(restaurants).values({
  managerId: manager.id,
  name: faker.company.name(),
  description: faker.lorem.paragraph(),
});

console.log(chalk.green("✅ Created restaurant!"));
console.log(chalk.greenBright("Database seeded successfully!"));
process.exit(0);
