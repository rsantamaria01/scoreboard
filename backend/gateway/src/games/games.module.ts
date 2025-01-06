import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';
import * as ms from 'src/config/services';

import { GamesController } from './games.controller';

@Module({
  controllers: [GamesController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: ms.GAMES_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.GAME_MICROSERVICE_HOST,
          port: envs.GAME_MICROSERVICE_PORT,
        },
      },
    ]),
  ],
})
export class GamesModule {}
