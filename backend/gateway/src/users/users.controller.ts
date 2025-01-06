import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import * as ms from 'src/config/services';

@Controller('users')
export class UsersController {
  constructor(@Inject(ms.USER_SERVICE) private readonly usersClient) {}

  @Get('init/co')
  InitCo() {
    return 'Users Controller is up and running!';
  }

  @Get('init/ms')
  InitMS() {
    return this.usersClient.send('users.init');
  }

  @Get()
  findAll() {
    return this.usersClient.send('users.findAll');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersClient.send('users.findOne', id);
  }
}
