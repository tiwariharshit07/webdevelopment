// server.js
const dns = require('node:dns/promises')
dns.setServers(["1.1.1.1"])
const http = require('http')
const express = require('express')
const socketIo = require('socket.io')
require('dotenv').config()

const { connectToDB } = require('./database/db')
const userroutes = require('./routes/user-routes')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const users = new Set()

app.use(express.json())
app.use(express.static("public"))
app.use('/api/connect', userroutes)

connectToDB()

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running at PORT ${PORT}`))

// SOCKET.IO
io.on('connection', (socket) => {
    console.log('A new user is connected');

    socket.on('join', (Username) => {
        socket.username = Username;
        users.add(Username);

        io.emit('joined', Username);
        io.emit('userlist', Array.from(users));
    });

    socket.on('chatMessage', (message) => {
        io.emit('chatMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('A user left');
        users.delete(socket.username);
        io.emit('userLeft', socket.username);
        io.emit('userlist', Array.from(users));
    });
});