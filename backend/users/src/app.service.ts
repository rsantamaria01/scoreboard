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
    return 'Users Microservice is up and running!';
  }

  findAll() {
    return this.database.query.users.findMany();
  }

  findOne(id: number) {
    return this.database
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
  }
}
