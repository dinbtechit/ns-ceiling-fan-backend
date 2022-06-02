import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { FanState } from '../fan/fan.model';
import { ConfigService } from '@nestjs/config';

export type EventCallBack = (events: any) => any;

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

  public async subscribeToEvents(listener: EventCallBack): Promise<void> {
    await this.subscriberClient.pSubscribe('__key*__:hset', listener);
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
