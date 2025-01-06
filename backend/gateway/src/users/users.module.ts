import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';
import * as ms from 'src/config/services';

import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: ms.USER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.USER_MICROSERVICE_HOST,
          port: envs.USER_MICROSERVICE_PORT,
        },
      },
    ]),
  ],
})
export class UsersModule {}
