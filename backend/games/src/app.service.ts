import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DATABASE_CONNECTION } from './database/database_connection';
import * as schema from './database/schema/schema';

@Injectable()
export class AppService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  InitMS() {
    return 'Games Controller is up and running!';
  }

  findAll() {
    return this.database.query.games.findMany();
  }

  findOne(id: number) {
    return this.database
      .select()
      .from(schema.games)
      .where(eq(schema.games.id, id));
  }
}
