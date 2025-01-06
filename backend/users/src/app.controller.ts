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

  @MessagePattern('users.findAll')
  findAll() {
    return this.appService.findAll();
  }

  @MessagePattern('users.findOne')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.appService.findOne(id);
  }
}
