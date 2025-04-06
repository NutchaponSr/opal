CREATE TABLE "group" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"year" text NOT NULL,
	"icon" text,
	"banner" text,
	"inTrash" boolean NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" text NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"updatedBy" text NOT NULL
);
