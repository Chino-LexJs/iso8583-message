const { Server, Socket } = require("net"),
  JsonSocket = require("json-socket");
import {
  util_checkMTI,
  util_header,
  util_checkBitmap,
  fields,
} from "./util/utils_dataElements/utils";
import { componentsMessage } from "./util/componentsMessage";
import { MTI0200 } from "./lib/MTI0200";
import { MTI0800 } from "./lib/MTI0800";

const port = 3000;
const port_PROSA = 8000;
const host = "0.0.0.0";
const path = "/retail/charge";

const server = new Server();

/**
 * Funcion que envia msj echo a PROSA
 * Sufrio cambios por modificaciones en la clase
 * NOTA REVISAR!
 * @returns
 */
function message0800(): { [key: string]: string } {
  let message = [
    "0800",
    "",
    "",
    "000578", // ID unico ver como se resuelve
    "",
  ];
  let bitmap = "super(bitmap, dataElements, mti, header);"; // revisar
  /**
   * PDF PROSA (pag 43- 44)
   * flujo Adquiriente -> PROSA
   * header = ISO006000050
   */
  let header = "ISO006000050";
  let message_echo = new MTI0800(bitmap, message, message[0], header);
  return { message: `${message_echo.getMessage()}` };
}

function sendMessagePROSA(message: { [key: string]: string }): void {
  const socket = new JsonSocket(new Socket());
  socket.connect({ host: "localhost", port: port_PROSA });
  socket.sendMessage(message);
}

server.on("connection", (socket: { [key: string]: any }) => {
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );
  socket = new JsonSocket(socket);
  socket.on("message", (message: { [key: string]: string }) => {
    if (util_checkMTI(message.MTI)) {
      console.log(`MTI: ${message.MTI} \nmti correct`);
      /**
       * Crear Componentes del msj 0200
       * ISO literl
       * Header
       * Message Type Identifier
       * Primary Bitmap
       * Data Elements
       */
      sendMessagePROSA(message);
    }

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
    socket.sendMessage(message0800());
  }, 10000);
  socket.on("close", () => {
    console.log(`Comunicacion finalizada`);
  });
  socket.on("error", function (err: Error) {
    console.log(`Error: ${err.message}`);
  });
});
