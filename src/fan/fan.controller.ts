import { Controller, Get } from '@nestjs/common';
import { FanService } from './fan.service';
import { FanState } from './fan.model';

@Controller({ path: 'fan/pull/cord' })
export class FanController {
  constructor(private readonly fanService: FanService) {}

  @Get('1')
  pullCord1(): FanState {
    return this.fanService.pullCord1();
  }

  @Get('2')
  pullCord2(): FanState {
    return this.fanService.pullCord2();
  }
}
