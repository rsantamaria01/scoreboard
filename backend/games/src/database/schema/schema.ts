import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const games = pgTable('games', {
  id: serial('id').primaryKey(),
  teamA: text('team_a').notNull().default('Team A'),
  teamB: text('team_b').notNull().default('Team B'),
  scoreA: text('score_a').notNull().default('0'),
  scoreB: text('score_b').notNull().default('0'),
});
