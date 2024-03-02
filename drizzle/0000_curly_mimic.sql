DO $$ BEGIN
 CREATE TYPE "user_role" AS ENUM('manager', 'customer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" char(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"phone" varchar,
	"role" "user_role" DEFAULT 'customer' NOT NULL,
	CONSTRAINT "users_name_unique" UNIQUE("name")
);
