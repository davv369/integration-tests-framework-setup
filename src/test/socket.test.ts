import { JsonUserManager } from '../utils/users';
import BookingConnector from '../apps/bookings/connectors/BookingConnector';
import WebSocketClient from "../apps/websocket/WebSocketClient";

describe('Authorization Functionalities', () => {
    let userManager: JsonUserManager;
    let usersConnector: BookingConnector;
    let wsClient: WebSocketClient;

    beforeEach(() => {
        userManager = new JsonUserManager();
        usersConnector = new BookingConnector();
        wsClient = new WebSocketClient('', 100);
    });

    beforeEach(() => {
        if (!wsClient.socket.connected) {
            wsClient.socket.connect();
        }
    })

    afterEach(() => {
        if (wsClient.socket.connected) {
            wsClient.disconnect();
        }
    });


    it('should connect to ws server', async () => {
        await new Promise<void>((resolve, reject) => {
            wsClient.socket.on('connect', () => {
                resolve()
            })

            wsClient.socket.on('connect_error', (err) => {
                console.error('Connection error:', err);
                reject(err);
            });
            wsClient.socket.connect()
        })
        expect(wsClient.socket.connected).toBe(true);
    })

    it('should send and receive a message from ws server', async () => {
        await new Promise<void>((resolve, reject) => {
            if (!wsClient.socket.connected) {
                wsClient.socket.connect();
            }

            wsClient.socket.on('response', (msg: string) => {
                console.log('Received response:', msg);
                expect(msg).toBe('Server response: Test message');
                resolve();
            });

            wsClient.socket.on('connect_error', (err) => {
                console.error('Connection error:', err);
                reject(err);
            });

            wsClient.socket.on('connect', () => {
                wsClient.socket.emit('message', 'Test message');
            });
        });
    });
});