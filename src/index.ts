const { Server, Socket } = require("net"),
  JsonSocket = require("json-socket");
import { MTI0200 } from "./lib/8583";

const port = 3000;
const port_PROSA = 8000;
const host = "0.0.0.0";

let message0800 = {
  message: "Echo message 0800",
};

/**
 * Determina si la llamada o tipo de mensaje es soportado por el servidor
 * @param {string} mti tipo de mensaje (MTI)
 * @returns {true | false} true si es un mti valido | false si es un mti que no soporta el servidor
 */
function checkMTI(mti: string): boolean {
  console.log("entre check");
  let mti_enabled = [
    "0200",
    "0210",
    "0220",
    "0230",
    "0420",
    "0430",
    "0800",
    "0810",
  ];
  return mti_enabled.includes(mti);
}

const server = new Server();

server.on("connection", (socket: { [key: string]: any }) => {
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );
  socket = new JsonSocket(socket);
  socket.on("message", (message: { [key: number]: string }) => {
    console.log(`MTI: ${message[0]}`);
    let test = new MTI0200(message, "0200", "0026000050");
    console.log(test.getBitmap());
    console.log(`Message: ${test.getMessage()}`);
    socket.end();
  });
  socket.on("close", () => {
    console.log(`Comunicacion finalizada`);
  });
  // Don't forget to catch error, for your own sake.
  socket.on("error", function (err: Error) {
    console.log(`Error: ${err}`);
  });
});

server.listen({ port, host }, () => {
  console.log(`Server on port: ${server.address().port}`);
  const socket = new JsonSocket(new Socket());
  socket.connect({ host: "localhost", port: port_PROSA });
  // Infinite loop
  setInterval(() => {
    socket.sendMessage(message0800);
  }, 10000);
  socket.on("close", () => {
    console.log(`Comunicacion finalizada`);
  });
  socket.on("error", function (err: Error) {
    console.log(`Error: ${err.message}`);
  });
});
