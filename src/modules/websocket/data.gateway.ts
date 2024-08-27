import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connections: Set<Socket> = new Set();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connections.add(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connections.delete(client);
  }

  @SubscribeMessage('handleMessage')
  handleMessage(client: Socket, payload: any): void {
    console.log(`Received message from ${client.id}: ${payload}`);
    
    // 广播消息给所有其他连接
    this.broadcastMessage(client, payload);
  }

  private broadcastMessage(sender: Socket, message: any): void {
    this.connections.forEach(connection => {
      if (connection !== sender) {
        connection.emit('message', {
          sender: sender.id,
          message: message
        });
      }
    });
  }
}