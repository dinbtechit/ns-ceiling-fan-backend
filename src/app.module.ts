import { Module } from '@nestjs/common';
import { FanController } from './fan/fan.controller';
import { FanService } from './fan/fan.service';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [],
  controllers: [FanController],
  providers: [FanService, RedisService],
})
export class AppModule {}
