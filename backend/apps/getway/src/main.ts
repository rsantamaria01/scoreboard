import { NestFactory } from '@nestjs/core';
import { GetwayModule } from './getway.module';

async function bootstrap() {
  const app = await NestFactory.create(GetwayModule);
  await app.listen(3000);
}
bootstrap();
