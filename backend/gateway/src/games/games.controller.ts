import { Controller, Get, Post, Param, Delet } from '@nestjs/common';

@Controller('games')
export class GamesController {
  constructor() {}

  @Get()
  findAll() {
    return 'This action returns all games';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a game with id ${id}`;
  }

  @Post()
  create() {
    return 'This action adds a new game';
  }
}
