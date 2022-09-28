import {
  Controller,
  Get,
  OnApplicationBootstrap,
  Put,
  Sse,
} from '@nestjs/common';
import { FanService } from './fan.service';
import { FanState, MessageEvent } from './fan.model';
import { Observable } from 'rxjs';

@Controller({ path: 'fan' })
export class FanController implements OnApplicationBootstrap {
  constructor(private readonly fanService: FanService) {}

  async onApplicationBootstrap() {
    await this.fanService.subscribeToFanStatus();
  }

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
    return this.fanService.fanStatus$;
  }
}
