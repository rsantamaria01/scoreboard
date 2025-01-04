import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    {
      id: 1,
      username: 'prueba1',
      password: 'password1',
      email: 'prueba1@prueba.com',
    },
    {
      id: 1,
      username: 'prueba2',
      password: 'password2',
      email: 'prueba2@prueba.com',
    }
  ];

  findAll() {
    return this.users;
  }
}
