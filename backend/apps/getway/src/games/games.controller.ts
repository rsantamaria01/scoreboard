import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
    constructor(private readonly gameServices: GamesService) { }

    @Post()
    create(@Body() createGameDto: CreateGameDto) {
        return this.gameServices.create(createGameDto);
    }

    @Get()
    findAll() {
        return this.gameServices.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.gameServices.findOne(+id);
    }

    @Patch(':id')
    update(@Param(':id') id: string, updateGameDto: UpdateGameDto) {
        return this.gameServices.update(+id, updateGameDto);
    }

    @Post(':id')
    remove(@Param(':id') id: string) {
        return this.gameServices.remove(+id);
    }



}
