/**
 * Servidor Server de prueba para simular la comunicacion con PROSA
 */

const Socket = require("net").Socket,
  { Server } = require("net"),
  JsonSocket = require("json-socket");

const port = 8000;
const host = "0.0.0.0";

const server = new Server();
var socket = new JsonSocket(new Socket());

function sendMessagePIDEAKY(message) {
  socket.connect({ host: "localhost", port: 3000 });
  socket.sendMessage(message);
  console.log("mensaje enviado");
}

server.on("connection", (socket) => {
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );
  socket = new JsonSocket(socket);
  socket.on("message", (message) => {
    console.log(message);
    // sendMessagePIDEAKY(message);
  });
});

server.listen({ port, host }, () => {
  console.log(`Server PROSA on port: ${port}`);
});
