import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsService } from './ws.service';

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
        server: Server;

    constructor(private readonly wsService: WsService) {}

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
        this.wsService.connection(client);
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: any): void {
        return this.wsService.message(client, payload);
    }

    @SubscribeMessage('keydown')
    handlekeydown(client: Socket, payload: any) {
        return this.wsService.keydown(client, payload);
    }

    @SubscribeMessage('keyup')
    handlekeyup(client: Socket, payload: any) {
        return this.wsService.keyup(client, payload);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        this.wsService.disconnect(client);
    }
}
