const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('message', (msg) => {
        console.log('Received message:', msg);
        socket.emit('response', `Server response: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3001, () => {
    console.log('Socket.IO server running on http://localhost:3001');
});