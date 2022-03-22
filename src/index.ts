const { Server, Socket } = require("net"),
  JsonSocket = require("json-socket");
import { util_checkMTI, util_header } from "./util/utils_dataElements/utils";
import { MTI0200 } from "./lib/8583";
import { MTI0800 } from "./lib/MTI0800";

const port = 3000;
const port_PROSA = 8000;
const host = "0.0.0.0";

function message0800(): { [key: string]: string } {
  let message = {
    0: "0800",
    1: "",
    7: "",
    11: "000578", // ID unico ver como se resuelve
    70: "",
  };
  /**
   * PDF PROSA (pag 43- 44)
   * flujo Adquiriente -> PROSA
   * header = ISO006000050
   */
  let header = "ISO006000050";
  let message_echo = new MTI0800(message, message[0], header);
  return { message: `${message_echo.getMessage()}` };
}

const server = new Server();

server.on("connection", (socket: { [key: string]: any }) => {
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );
  socket = new JsonSocket(socket);
  socket.on("message", (message: { [key: number]: any }) => {
    let checkMti = util_checkMTI(message[1].toString());
    let checkIso = util_header(message[0].toString());

    if (checkMti && checkIso) {
      console.log(
        `MTI: ${message[1]} \nHEADER: ${message[0]} \nMTI y HEADER validos`
      );
      socket.end();
    } else {
      console.log(
        `MTI: ${message[1]} \nHEADER: ${message[0]} \nERROR en MTI o HEADER`
      );
    }
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
