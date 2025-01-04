import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'GAMES_CLIENT',
                transport: Transport.TCP,
                options: {
                    port: 3002,
                },
            },
        ]),
    ],
    providers: [GamesService],
    controllers: [GamesController]
})
export class GamesModule { }
