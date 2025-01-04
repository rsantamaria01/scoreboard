import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameDto } from './dto/game.dto';

@Injectable()
export class GamesService {
  private games: GameDto[] = [
    {
      id: 1,
      TeamA: 'Prueba1A',
      TeamB: 'Prueba1B',
      scoreA: 0,
      scoreB: 0,
    },
    {
      id: 2,
      TeamA: 'Prueba2A',
      TeamB: 'Prueba2B',
      scoreA: 0,
      scoreB: 0,
    },
  ];


  create(createGameDto: CreateGameDto) {
    const newGame: GameDto = {
      ...createGameDto,
      id: this.games.length + 1,
    };

    this.games.push(newGame);
  }

  findAll() {
    return this.games;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
