import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './database/schema/schema';
import { DATABASE_CONNECTION } from './database/database_connection';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) { }

  private users: UserDto[] = [
    {
      id: 1,
      username: 'prueba1',
      password: 'password1',
      email: 'prueba1@prueba.com',
    },
    {
      id: 2,
      username: 'prueba2',
      password: 'password2',
      email: 'prueba2@prueba.com',
    }
  ];

  findAll() {
    //return this.database.query.users.findMany();
    return this.users;
  }
}
