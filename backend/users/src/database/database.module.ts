import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database_connection';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as userSchema from './schema/schema';
import { envs } from 'src/config';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: envs.DB_URL,
        });
        return drizzle(pool, {
          schema: {
            ...userSchema
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule { }
