/**
 * Servidor Server de prueba para simular la comunicacion con PROSA
 */

const Socket = require("net").Socket,
  { Server } = require("net");

const port = 8000;
const host = "0.0.0.0";
const message0210 =
  "ISO0260000500210B238C4012E818018000000001000018800000000000000100008031110530001241113520803080353999001109000000003165579209013100166=0803101927000000000000001245522850093278402001_____0271234567            12341234484016FIIDTLNETETOPTID019FIIDCALN10100000000009123456789029TERMINALNAMEANDLOCATION00TBID020CLERIDCRTA0808080844012MCHOSTHOST10";
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
      socket.write(message0210);
      console.log("Mensaje enviado");
    },
    "uft8"
  );
});

server.listen({ port, host }, () => {
  console.log(`Server PROSA on port: ${port}`);
});
