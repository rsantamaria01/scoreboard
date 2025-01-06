import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { envs } from 'src/config';

import { DATABASE_CONNECTION } from './database_connection';
import * as gameSchema from './schema/schema';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: envs.DB_URL,
        });
        return drizzle(pool, {
          schema: {
            ...gameSchema,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}

const logger = new Logger('GAMES');
logger.log('Database Connection Established');
