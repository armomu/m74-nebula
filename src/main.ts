/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:30:13
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { WsAdapter } from '@nestjs/platform-ws';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        session({
            secret: 'isme',
            name: 'isme.session',
            rolling: true,
            cookie: { maxAge: null },
            resave: false,
            saveUninitialized: true,
        })
    );
    app.useWebSocketAdapter(new WsAdapter(app));
    await app.listen(process.env.APP_PORT || 8085, '0.0.0.0');

    console.log(`🚀 启动成功: http://localhost:${process.env.APP_PORT}`);
}
bootstrap();
