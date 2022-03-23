const { Server, Socket } = require("net"),
  JsonSocket = require("json-socket");
import {
  util_checkMTI,
  util_header,
  util_checkBitmap,
  fields,
} from "./util/utils_dataElements/utils";
import { hex_to_bin } from "./util/hex_to_bin";
import { MTI0200 } from "./lib/MTI0200";
import { MTI0800 } from "./lib/MTI0800";

const port = 3000;
const port_PROSA = 8000;
const host = "0.0.0.0";
const ACTIVO = "1";

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

const server = new Server();

server.on("connection", (socket: { [key: string]: any }) => {
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );
  socket = new JsonSocket(socket);
  socket.on("message", (message: { [key: number]: any }) => {
    /**
     * FORMATO DE MESSAGE
     * 0 : header {string}
     * 1 : mti {string}
     * 2 : primary bitmap {string}
     * 3 : data elements {array}
     */
    let checkMti = util_checkMTI(message[1].toString());
    let checkIso = util_header(message[0].toString());
    if (checkMti && checkIso) {
      console.log(
        `MTI: ${message[1]} \nHEADER: ${message[0]} \nmti and header correct`
      );
      let bin = hex_to_bin(message[2]);
      if (bin.length === 64) {
        let arrayCampos = []; // Array que contendra todos los numeros de los DEs que vienen en el msj
        for (let i = 0; i < bin.length; i++) {
          if (bin[i] === ACTIVO) {
            arrayCampos.push(i + 1);
          }
        }
        if (util_checkBitmap(arrayCampos, message[3], fields)) {
          console.log(`BITMAP: ${message[2]} \nbitmap correct`);
          // Generar msj 0200 para PROSA
          let message_0200 = new MTI0200(
            message[2],
            message[3],
            message[1],
            message[0]
          );

          console.log(message_0200.getMessage());
        }
      } else {
        console.log(bin.length);
        console.log("bitmap incorrect");
      }
    } else {
      console.log(
        `MTI: ${message[1]} \nHEADER: ${message[0]} \nERROR en MTI o HEADER`
      );
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
