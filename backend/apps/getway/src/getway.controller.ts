import { Controller, Get } from '@nestjs/common';
import { GetwayService } from './getway.service';

@Controller()
export class GetwayController {
  constructor(private readonly getwayService: GetwayService) {}

  @Get()
  getHello(): string {
    return this.getwayService.getHello();
  }
}
