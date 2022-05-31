import { Module } from '@nestjs/common';
import { FanController } from './fan/fan.controller';
import { FanService } from './fan/fan.service';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [SocketModule],
  controllers: [FanController],
  providers: [FanService],
})
export class AppModule {}
