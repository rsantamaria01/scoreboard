CREATE TABLE "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_a" text DEFAULT 'Team A' NOT NULL,
	"team_b" text DEFAULT 'Team B' NOT NULL,
	"score_a" text DEFAULT '0' NOT NULL,
	"score_b" text DEFAULT '0' NOT NULL
);
