/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:30:08
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { WsModule } from './modules/websocket/ws.module';
import { CorsMiddleware } from './common/middleware/cors.middleware';

@Module({
    imports: [
        /* 配置文件模块 */
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.local', '.env'],
        }),
        UserModule,
        PermissionModule,
        RoleModule,
        AuthModule,
        SharedModule,
        WsModule,
    ],
})
export class AppModule {
    // configure(consumer: MiddlewareConsumer) {
    //     consumer.apply(CorsMiddleware).forRoutes('*');
    // }
}
