import { Test, TestingModule } from '@nestjs/testing';
import { GetwayController } from './getway.controller';
import { GetwayService } from './getway.service';

describe('GetwayController', () => {
  let getwayController: GetwayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GetwayController],
      providers: [GetwayService],
    }).compile();

    getwayController = app.get<GetwayController>(GetwayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(getwayController.getHello()).toBe('Hello World!');
    });
  });
});
