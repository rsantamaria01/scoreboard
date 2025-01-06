import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").unique().notNull(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
});