import { defineConfig } from 'drizzle-kit';
import { envs } from 'src/config';

export default defineConfig({
  schema: './src/**/schema/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: envs.DB_URL,
  },
});
