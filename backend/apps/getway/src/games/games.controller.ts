import { Controller, Get, Patch, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { Payload } from '@nestjs/microservices';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
    constructor(private readonly gameServices: GamesService) { }

    @Post()
    create(@Payload() createGameDto: CreateGameDto) {
        return this.gameServices.create(createGameDto);
    }

    @Get()
    findAll() {
        return this.gameServices.findAll();
    }

    @Get()
    findOne(@Payload() id: number) {
        return this.gameServices.findOne(id);
    }

    @Patch()
    update(@Payload() updateGameDto: UpdateGameDto) {
        return this.gameServices.update(updateGameDto.id, updateGameDto);
    }

    @Post()
    remove(@Payload() id: number) {
        return this.gameServices.remove(id);
    }



}
