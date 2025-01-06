import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('users.init')
  InitMS() {
    return this.appService.InitMS();
  }

  @MessagePattern('games.findAll')
  findAll() {
    return this.appService.findAll();
  }

  @MessagePattern('games.findOne')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.appService.findOne(id);
  }
}
