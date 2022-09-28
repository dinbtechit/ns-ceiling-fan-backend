import { Injectable } from '@nestjs/common';
import { FanState, MessageEvent } from './fan.model';
import { RedisService } from '../redis/redis.service';
import { Subject } from 'rxjs';

let fanState: FanState = {
  speed: 0,
  direction: true,
};

export type Cord = '1' | '2';

@Injectable()
export class FanService {
  public fanStatus$: Subject<MessageEvent> = new Subject();

  constructor(private redisService: RedisService) {}

  async getFanStatus(): Promise<FanState> {
    fanState = await this.redisService.getNsFanState();
    return fanState;
  }

  async onPullCord(cord: Cord) {
    await this.getFanStatus();
    if (cord === '1') {
      await FanService.onPullCord1();
    } else {
      await FanService.onPullCord2();
    }
    await this.redisService.setNsFanState(fanState);
  }

  private static async onPullCord1(): Promise<void> {
    const newFanSpeed = fanState.speed + 1;
    fanState.speed = newFanSpeed >= 4 ? 0 : newFanSpeed;
  }

  private static async onPullCord2(): Promise<void> {
    fanState.direction = !fanState.direction;
  }

  async subscribeToFanStatus() {
    await this.redisService.subscribeToEvents(async (event) => {
      if (event === 'nsfan') {
        const fanState = await this.getFanStatus();
        this.fanStatus$.next({ data: fanState });
      }
    });
  }
}
