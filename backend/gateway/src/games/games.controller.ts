import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action deletes the game with id ${id}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return `This action updates the game with id ${id}`;
  }
}
