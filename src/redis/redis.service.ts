import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { FanState } from '../fan/fan.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit {
  public redisClient: RedisClientType;
  public publisherClient: RedisClientType;
  private subscriberClient: RedisClientType;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.redisClient = await this.newRedisClient();
    this.subscriberClient = await this.newRedisClient();
    this.publisherClient = await this.newRedisClient();

    await this.redisClient.connect();
    await this.subscriberClient.connect();
    await this.publisherClient.connect();
  }

  private newRedisClient(): RedisClientType {
    const redisHost = this.configService.get<string>('REDIS_HOST');
    return createClient({
      url: `redis://${redisHost}:6379`,
    });
  }

  public subscribeToEvents(): RedisClientType {
    return this.subscriberClient;
  }

  public async getNsFanState(): Promise<FanState> {
    const { speed, direction } = await this.publisherClient.hGetAll('nsfan');
    return {
      speed: isNaN(Number(speed)) ? 0 : Number(speed),
      direction: direction === 'true',
    };
  }

  public async setNsFanState({ speed, direction }: FanState): Promise<void> {
    const values = Object.entries({
      speed: speed,
      direction: String(direction),
    });
    await this.publisherClient.hSet('nsfan', values);
  }
}
