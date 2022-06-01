import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { FanState } from '../fan/fan.model';

@Injectable()
export class RedisService implements OnModuleInit {
  public redisClient: RedisClientType;
  public publisherClient: RedisClientType;
  private subscriberClient: RedisClientType;

  async onModuleInit() {
    this.redisClient = await RedisService.newRedisClient();
    this.subscriberClient = await RedisService.newRedisClient();
    this.publisherClient = await RedisService.newRedisClient();

    await this.redisClient.connect();
    await this.subscriberClient.connect();
    await this.publisherClient.connect();

    await this.subscribeToEvents();
  }

  private static newRedisClient(): RedisClientType {
    return createClient({
      url: 'redis://localhost:6379',
    });
  }

  public subscribeToEvents(): RedisClientType {
    return this.subscriberClient;
  }

  public async getNsFanState(): Promise<FanState> {
    const { speed, direction } = await this.publisherClient.hGetAll('nsfan');
    return { speed: Number(speed), direction: direction === 'true' };
  }

  public async setNsFanState({ speed, direction }: FanState): Promise<void> {
    const values = Object.entries({
      speed: speed,
      direction: String(direction),
    });
    await this.publisherClient.hSet('nsfan', values);
  }
}
