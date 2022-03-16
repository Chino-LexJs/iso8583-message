"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Server } = require("net"), JsonSocket = require("json-socket");
const _8583_1 = require("./lib/8583");
const port = 3000;
const host = "0.0.0.0";
const server = new Server();
server.on("connection", (socket) => {
    console.log(`New connection from ${socket.remoteAddress} : ${socket.remotePort}`);
    socket = new JsonSocket(socket);
    socket.on("message", (message) => {
        console.log(message);
        let test = new _8583_1.MTI0200(message, "0200", "0026000050");
        console.log(test.getMessage());
        console.log(test.getBitmap());
        console.log(test.getMti());
    });
});
server.listen({ port, host }, () => {
    console.log(`Server on port: ${port}`);
});
