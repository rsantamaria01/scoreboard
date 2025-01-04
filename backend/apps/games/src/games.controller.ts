import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @MessagePattern('games.create')
  create(@Payload() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @MessagePattern('games.findAll')
  findAll() {
    return this.gamesService.findAll();
  }

  @MessagePattern('games.findOne')
  findOne(@Payload() id: number) {
  return this.gamesService.findOne(id);
  }

  @MessagePattern('games.update')
  update(@Payload() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(updateGameDto.id, updateGameDto);
  }

  @MessagePattern('games.remove')
  remove(@Payload() id: number) {
    return this.gamesService.remove(id);
  }
}
