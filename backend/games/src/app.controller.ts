import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('games.create')
  create(@Payload() createGameDto: CreateGameDto) {
    return this.appService.create(createGameDto);
  }

  @MessagePattern('games.findAll')
  findAll() {
    return this.appService.findAll();
  }

  @MessagePattern('games.findOne')
  findOne(@Payload() id: number) {
    return this.appService.findOne(id);
  }

  @MessagePattern('games.update')
  update(@Payload() updateGameDto: UpdateGameDto) {
    return this.appService.update(updateGameDto.id, updateGameDto);
  }

  @MessagePattern('games.remove')
  remove(@Payload() id: number) {
    return this.appService.remove(id);
  }
}
