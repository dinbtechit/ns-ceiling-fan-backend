import { Controller, Get, Put, Sse } from '@nestjs/common';
import { FanService } from './fan.service';
import { FanState, MessageEvent } from './fan.model';
import { Observable, Subject } from 'rxjs';
import { RedisService } from '../redis/redis.service';

@Controller({ path: 'fan' })
export class FanController {
  subject$: Subject<MessageEvent> = new Subject();

  constructor(
    private readonly fanService: FanService,
    private readonly redisService: RedisService,
  ) {}

  @Get('status')
  async fanStatus(): Promise<FanState> {
    return await this.fanService.getFanStatus();
  }

  @Put('cord/pull/1')
  async pullCord1(): Promise<void> {
    await this.fanService.onPullCord('1');
  }

  @Put('cord/pull/2')
  async pullCord2(): Promise<void> {
    await this.fanService.onPullCord('2');
  }

  @Sse('cord/pull/sse')
  sendFanState(): Observable<MessageEvent> {
    this.redisService.subscribeToEvents((event) => {
      if (event === 'nsfan') {
        this.fanService.getFanStatus().then((fanState) => {
          this.subject$.next({ data: fanState });
        });
      }
    });
    return this.subject$;
  }
}
