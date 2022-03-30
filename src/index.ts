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
let socketProsa: any;
let socketClient: any;

const server = new Server();

var clients: any[] = [];
var p37: number = 0;
/**
 * Funcion que envia msj echo a PROSA
 * Sufrio cambios por modificaciones en la clase
 * NOTA REVISAR!
 * @returns
 
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
   
  let header = "ISO006000050";
  let message_echo = new MTI0800(bitmap, message, message[0], header);
  return { message: `${message_echo.getMessage()}` };
}
*/
function sendMessagePROSA(message: { [key: string]: string }): void {
  // const socket = new JsonSocket(new Socket());
  // socket.connect({ host: "localhost", port: port_PROSA });
  socketProsa.sendMessage(message);
}

function recibe_and_sent() {
  return new Promise(function (resolve) {
    setTimeout(() => resolve("mensaje tardio"), 2000);
  });
}

server.on("connection", (socket: any) => {
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );

  socket = new JsonSocket(socket);
  socket.on("message", (message: { [key: string]: string }) => {
    p37 = p37 + 1; // Ahora esta hard-codeado después se buscara en BD u otro metodo
    message.ID = p37.toString();
    clients.push({
      socket: socket,
      ID: message.ID,
    });
    console.log(message);
    /**
     * Llega mensaje de Terminal
     * Se crea msj ISO8583 de tipo 0200
     * Se envia mensaje a Prosa
     * Se recibe mensaje de Prosa
     * Se envia respuesta a Terminal
     */
    let message0200 = new MTI0200(message);
    sendMessagePROSA({
      message: message0200.getMessage(),
      ID: message.ID,
    }); // se envia mensaje a Prosa
    // sendMessagePROSA(message);
    // se recibe mensaje de Prosa
  });
  socket.on("close", () => {
    console.log(`Cantidad de clientes: ${clients.length}`);
    clients.forEach((client) => {
      let index = clients.indexOf(client);
      clients.splice(index, 1);
    });
    console.log(
      `Comunicacion finalizada \nCantidad de clientes : ${clients.length}`
    );
  });
  // Don't forget to catch error, for your own sake.
  socket.on("error", function (err: Error) {
    console.log(`Error: ${err}`);
  });
});

server.listen({ port, host }, () => {
  console.log(`Server on port: ${server.address().port}`);
  socketProsa = new JsonSocket(new Socket());
  socketProsa.connect({ host: "localhost", port: port_PROSA });
  // Infinite loop
  // setInterval(() => {
  //   socket.sendMessage(message0800());
  // }, 10000);
  socketProsa.on("message", (message: { [key: string]: string }) => {
    console.log("Mensaje de PROSA");
    console.log(message);
    clients.forEach((client) => {
      if (client.ID === message.ID) {
        let clientSocket = client.socket;
        clientSocket.sendMessage(message);
        clientSocket.end();
      }
    });
  });
  socketProsa.on("close", () => {
    console.log(`Comunicacion finalizada`);
  });
  socketProsa.on("error", (): void => {});
});
