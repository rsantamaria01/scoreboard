import { Module } from '@nestjs/common';
import { GetwayController } from './getway.controller';
import { GetwayService } from './getway.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [GetwayController],
  providers: [GetwayService],
})
export class GetwayModule {}
