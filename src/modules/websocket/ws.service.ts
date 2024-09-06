import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class WsService {
    private socketClients: SocketClient[] = [];
    constructor() {}

    message(client: Socket, payload: any): void {
        this.broadcastMessage(client, payload);
    }

    private broadcastMessage(sender: Socket, message: any): void {
        this.socketClients.forEach((connection) => {
            if (connection.client !== sender) {
                connection.client.send(`{"event": "keydown", "data": "${message}" }`)
            }
        });
    }

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
        // 先告知当前连接的用户

        // 通知其他用户有新连接
        this.socketClients.forEach((item) => {

        });

        this.socketClients.push({
            id: uuid,
            client: client
        })

        // Object.keys(this.socketClients).forEach((id) => {
        //     this.socketClients[id].send( JSON.stringify({event: "new", data: id }))
        // })
        // this.socketClients[uuid] = client
        // // this.connections.add(client);
        // console.log(this.socketClients)
    }

    disconnect(client: Socket) {

        // Object.keys(this.socketClients).forEach((id) => {
        //     if(this.socketClients[id] === client) {
        //         delete this.socketClients[id]
        //     }
        // })
    }
}
interface SocketClient {
    id: string;
    client: Socket
}
