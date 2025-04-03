CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "role" DEFAULT 'USER' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
