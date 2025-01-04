import { Module } from '@nestjs/common';
import { GetwayController } from './getway.controller';
import { GetwayService } from './getway.service';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [UsersModule, GamesModule],
  controllers: [GetwayController],
  providers: [GetwayService],
})
export class GetwayModule {}