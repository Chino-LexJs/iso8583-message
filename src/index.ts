const { Server, Socket } = require("net"),
  JsonSocket = require("json-socket");
import { saveFolio } from "./db/saveFolio";
import { saveMessage } from "./db/saveMessage";
import { MTI0200 } from "./lib/MTI0200";
import {
  newConnection,
  message_pos,
  message_prosa,
} from "./util/util_Socket";

const port = 3000;
const host = "0.0.0.0";
const port_PROSA = 8000;
const to_PROSA = {
  host: "localhost",
  port: port_PROSA,
};
let socketProsa: any;

const server = new Server();

var clients: any[] = [];

async function sendMessagePROSA(
  message: {
    [key: string]: string;
  },
  n_folio: number
): Promise<void> {
  await saveMessage(n_folio, message, "0200", "pideaky", "prosa");
  console.log(`Mensaje que se envia a Prosa:`);
  console.log(message);
  socketProsa.sendMessage(message);
}

server.on("connection", (socket: any) => {
  newConnection(socket);
  socket = new JsonSocket(socket);

  socket.on("message", async (message: { [key: string]: string }) => {
    message_pos(message, socket, clients, sendMessagePROSA);
  });
  socket.on("close", () => {
    // console.log(`Cantidad de clientes: ${clients.length}`);
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
  socketProsa.connect(to_PROSA);
  socketProsa.on("message", async (message: { [key: string]: string }) => {
    message_prosa(message, clients);
  });
  socketProsa.on("close", () => {
    console.log(`Comunicacion con PROSA finalizada`);
  });
  socketProsa.on("error", (err: Error): void => {
    console.log(err);
  });
});
