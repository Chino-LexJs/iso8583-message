/**
 * Servidor Server de prueba para simular la comunicacion con PROSA
 */

const Socket = require("net").Socket,
  { Server } = require("net");

const port = 8000;
const host = "0.0.0.0";

const server = new Server();
var socket = new Socket();

function sendMessagePIDEAKY(message) {
  //socket.connect({ host: "localhost", port: 3000 });
  socket.sendMessage(message);
  console.log("mensaje enviado");
}

server.on("connection", (socket) => {
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );
  // socket = new JsonSocket(socket);
  socket.setEncoding("utf8");
  socket.on(
    "data",
    (message) => {
      console.log(message);
      // sendMessagePIDEAKY(message);
      socket.write(message);
      console.log("Mensaje enviado");
    },
    "uft8"
  );
});

server.listen({ port, host }, () => {
  console.log(`Server PROSA on port: ${port}`);
});
