import { Injectable } from '@nestjs/common';
import { FanState } from './fan.model';

@Injectable()
export class FanService {
  pullCord1(): FanState {
    return {
      speed: 0,
      direction: true,
    };
  }

  pullCord2(): FanState {
    return {
      speed: 0,
      direction: false,
    };
  }
}
