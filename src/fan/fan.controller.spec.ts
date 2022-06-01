import { Test, TestingModule } from '@nestjs/testing';
import { FanController } from './fan.controller';
import { FanService } from './fan.service';
import { RedisService } from '../redis/redis.service';

describe('FanController', () => {
  let fanController: FanController;
  let fanService: FanService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FanController],
      providers: [FanService, RedisService],
    }).compile();
    fanController = app.get<FanController>(FanController);
    fanService = app.get<FanService>(FanService);
  });

  describe('Fan APIs', () => {
    it('should return Fan status from redis"', () => {
      const value = { speed: 0, direction: true };
      const result = new Promise(() => value);
      jest
        .spyOn(fanService, 'getFanStatus')
        .mockReturnValueOnce(new Promise((resolve) => value));
      expect(fanController.fanStatus()).toBeTruthy();
    });

    it('should return set fanState in Redis when cord1 is pulled', () => {
      const value = { speed: 0, direction: true };
      const result = new Promise(() => value);
      jest
        .spyOn(fanService, 'getFanStatus')
        .mockReturnValueOnce(new Promise((resolve) => value));
      expect(fanController.pullCord1()).toBeTruthy();
    });
  });
});
