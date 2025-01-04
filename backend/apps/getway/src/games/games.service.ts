import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
    constructor(@Inject('GAMES_CLIENT') private gameClient: ClientProxy) { }

    create(createGameDto: CreateGameDto) {
        return this.gameClient.send('games.create', createGameDto);
    }

    findAll() {
        return this.gameClient.send('games.findAll', {});
    }


    findOne(id: number) {
        return this.gameClient.send('games.findOne', id);
    }

    update(id: number, updateGameDto: UpdateGameDto) {
        return this.gameClient.send('games.update', { id, ...updateGameDto });
    }

    remove(id: number) {
        return this.gameClient.send('games.remove', id);
    }

}
