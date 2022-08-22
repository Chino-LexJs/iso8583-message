import { Prosa } from "./lib/Prosa";
import { Terminal } from "./lib/Terminal";
import { loopEcho, loopReverses } from "./loops/loops";
const { Server, Socket } = require("net"),
  server = new Server(),
  TIEMPO_LOOP_REVERSE = 30000,
  TIEMPO_LOOP_ECHO = 60000;
/**
 * Instance de Prosa (Singleton)
 */
let prosa = Prosa.getInstance();
/**
 * Configuracion del server para que conteste a los distintos mensajes RCES entrantes
 */
server.on("connection", (socket: any) => {
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );
  new Terminal(socket);
});

function connectToProsa() {
  if (!prosa.isConnected()) {
    console.log("Intentando conectar con prosa");
    prosa.connect();
  }
}

async function main() {
  setInterval(loopReverses, TIEMPO_LOOP_REVERSE);
  setInterval(loopEcho, TIEMPO_LOOP_ECHO);
  setInterval(connectToProsa, 1000);
}

export { server, main };
