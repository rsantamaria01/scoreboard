import { Injectable } from '@nestjs/common';

@Injectable()
export class GetwayService {
  getHello(): string {
    return 'getway active';
  }
}
