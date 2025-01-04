import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database_connection';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL', { infer: true }),
        });
        return drizzle(pool, {
          schema: {},
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class DatabaseModule { }
