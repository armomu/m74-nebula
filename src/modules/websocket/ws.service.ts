import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class WsService {

    private connections: Set<Socket> = new Set();

    private socketClients: any = {};

    constructor() {}

    message(client: Socket, payload: any): void {
        console.log(`Received message from ${client.id}: ${payload}`);
        // 广播消息给所有其他连接
        this.broadcastMessage(client, payload);
        // return payload;
    }

    private broadcastMessage(sender: Socket, message: any): void {
        this.connections.forEach((connection) => {
            if (connection !== sender) {
                connection.send(`{"event": "keydown", "data": "${message}" }`)
            }
        });
    }

    // private broadcastMessage(sender: Socket, message: any): void {
    //     this.connections.forEach((connection) => {
    //         if (connection !== sender) {
    //             connection.send(`{"event": "keydown", "data": "${message}" }`)
    //         }
    //     });
    // }

    keydown(client: Socket, payload: string) {
        this.broadcastMessage(client, payload);
        client.send(JSON.stringify({event: 'keydown', data: payload}));
    }

    keyup(client: Socket, payload: string) {
        this.broadcastMessage(client, payload);
        client.send(JSON.stringify({event: 'keyup', data: payload }));
    }

    connection(client: Socket) {
        const uuid  = uuidv4();
        Object.keys(this.socketClients).forEach((id) => {
            this.socketClients[id].send( JSON.stringify({event: "new", data: id }))
        })
        this.socketClients[uuid] = client
        // this.connections.add(client);
        console.log(this.socketClients)
    }

    disconnect(client: Socket) {
        // this.connections.delete(client);
        Object.keys(this.socketClients).forEach((id) => {
            if(this.socketClients[id] === client) {
                delete this.socketClients[id]
            }
            // this.socketClients[id].send(`{"event": "new", "data": "${id}" }`)
        })
        console.log(this.socketClients)
    }
}
