import { Test, TestingModule } from '@nestjs/testing';
import { FanController } from './fan.controller';
import { FanService } from './fan.service';

describe('FanController', () => {
  let fanController: FanController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FanController],
      providers: [FanService],
    }).compile();

    fanController = app.get<FanController>(FanController);
  });

  describe('Fan APIs', () => {
    it('should return Fan status from redis"', () => {
      expect(fanController.fanStatus()).toBe({ speed: 0, direction: true });
    });
  });
});
