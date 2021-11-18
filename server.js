require("dotenv").config();
const express = require('express')
const app = express()

const axios = require('axios')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});
const { v4: uuidV4 } = require('uuid')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/peerjs', peerServer);
io.on('connection', socket => {
    socket.on('notification', (token) => {
        socket.join(token);
    })
})
const port = process.env.PORT || 3030
server.listen(port)
console.log("runnin on port " + port)
