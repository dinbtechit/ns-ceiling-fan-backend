import { Module } from '@nestjs/common';
import { FanController } from './fan/fan.controller';
import { FanService } from './fan/fan.service';
import { RedisService } from './redis/redis.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.environment',
    }),
  ],
  controllers: [FanController],
  providers: [RedisService, FanService],
})
export class AppModule {}
