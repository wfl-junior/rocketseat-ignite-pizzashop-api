CREATE TABLE IF NOT EXISTS "restaurants" (
	"id" char(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"description" text
);
