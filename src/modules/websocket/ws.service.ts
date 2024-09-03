import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class WsService {
    private connections: Set<Socket> = new Set();
    constructor() {}

    message(client: Socket, payload: any): void {
        console.log(`Received message from ${client.id}: ${payload}`);
        // 广播消息给所有其他连接
        this.broadcastMessage(client, payload);
        return payload;
    }

    private broadcastMessage(sender: Socket, message: any): void {
        this.connections.forEach((connection) => {
            if (connection !== sender) {
                connection.emit('message', {
                    sender: sender.id,
                    message: message,
                });
            }
        });
    }

    connection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
        this.connections.add(client);
    }

    disconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        this.connections.delete(client);
    }
}
