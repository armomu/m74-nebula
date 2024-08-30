import { Global, Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { WsService } from './ws.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  providers: [WsGateway, WsService], // 这个是 HTTP 服务, 可有可无
  exports: [WsService],
})
export class WsModule {}
