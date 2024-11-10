import { io, Socket } from 'socket.io-client';
import { IUrlManager, JsonUrlManager, UrlPaths } from '../../utils/urls';

class WebSocketClient {
    public socket: Socket<any>;
    private _waitStep: number;
    private _connectTimeout: number;
    private _urlManager: IUrlManager;

    constructor(token?: string, connectTimeout?: number, waitStep?: number) {
        this._urlManager = new JsonUrlManager();
        this._connectTimeout = connectTimeout ? connectTimeout : 5000;
        this._waitStep = waitStep ? waitStep : 10;
        this.socket = io(this._urlManager.loadUrl(UrlPaths.Websocket).url, {
            auth: { token },
        }).emit('hello world');
    }

    async connect() {
        this.socket.connect();
        console.log('Socket Connected')
        return this.socket.connected;
    }

    async disconnect() {
        this.socket.disconnect();
        this.socket.close();
    }

    async sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

export default WebSocketClient;
