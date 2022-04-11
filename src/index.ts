const { Server, Socket } = require("net"),
  JsonSocket = require("json-socket");
import { saveFolio } from "./db/saveFolio";
import { saveMessage } from "./db/saveMessage";
import { MTI0200 } from "./lib/MTI0200";
import { pool } from "./db/db";

const port = 3000;
const port_PROSA = 8000;
const host = "0.0.0.0";
let socketProsa: any;

const server = new Server();

var clients: any[] = [];
var p37: number = 0;
var n_folio: any;
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

server.on("connection", (socket: any) => {
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );

  socket = new JsonSocket(socket);
  socket.on("message", async (message: { [key: string]: string }) => {
    p37 = p37 + 1; // Ahora esta hard-codeado después se buscara en BD u otro metodo
    n_folio = await saveFolio(message.TERMINAL_ID, message.AMOUNT);
    console.log(message);
    await saveMessage(
      n_folio[0].insertId,
      message,
      "0200",
      "terminal",
      "pideaky"
    );
    message.SystemsTrace = p37.toString();
    clients.push({
      socket: socket,
      SystemsTrace: message.SystemsTrace,
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
      SystemsTrace: message.SystemsTrace,
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

server.listen({ port, host }, async () => {
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
    clients.forEach(async (client) => {
      if (client.SystemsTrace === message.SystemsTrace) {
        await saveMessage(n_folio[0].insertId, message, "0210", "prosa", "pideaky");
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
