import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/database/schema/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.USERS_DATABASE_URL,
    },
})