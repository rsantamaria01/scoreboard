import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import * as ms from 'src/config/services';

@Controller('games')
export class GamesController {
  constructor(@Inject(ms.GAMES_SERVICE) private readonly gamesClient) {}

  @Get('init/co')
  InitCo() {
    return 'Games Controller is up and running!';
  }

  @Get('init/ms')
  InitMS() {
    return this.gamesClient.send('games.init');
  }

  @Get()
  findAll() {
    return this.gamesClient.send('games.findAll');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.gamesClient.send('users.findOne', id);
  }
}
