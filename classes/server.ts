import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets'

export default class Server {

    private static _instance:Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO( this.httpServer );

        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    private escucharSockets(){
            console.log('Escuchando conexxiones - sockets');

            this.io.on('connection',cliente =>{
                console.log("Nuevo cliente conectado");

                //Mensajes
                socket.mensaje(cliente, this.io);
                //desconectar 
                socket.deconectar(cliente);
            });
    }
    start (callback : Function){
        //this.app.listen(this.port,callback);
        this.httpServer.listen(this.port,callback);
    }
}