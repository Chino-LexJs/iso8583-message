const { Server, Socket } = require("net"),
  JsonSocket = require("json-socket");
import { iso8583 } from "./lib/builder/iso8583";
import { saveMessage } from "./db/saveMessage";
import { Director } from "./lib/builder/director";
import { message_pos, message_prosa } from "./util/util_Socket";
import { MessageProsa } from "./lib/messageProsa";

const port = 3000;
const host = "0.0.0.0";
const to_PROSA = {
  host: "localhost",
  port: 8000,
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
  socketProsa.write(message.message, "utf8");
}

server.on("connection", (socket: any) => {
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );
  socket = new JsonSocket(socket);

  socket.on("message", async (message: { [key: string]: any } & string) => {
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

function connectProsa() {
  socketProsa = new Socket();
  socketProsa.connect(to_PROSA);
  socketProsa.setEncoding("utf8");
  socketProsa.on("data", async (message: string) => {
    //message_prosa(message, clients);
    let messageProsa: MessageProsa = new MessageProsa(message);
    let messageISO = messageProsa.getBuilder();
    console.log(messageISO);
  });
  socketProsa.on("close", () => {
    console.log(`Comunicacion con PROSA finalizada`);
  });
  socketProsa.on("error", (err: Error): void => {
    console.log(err);
  });
}
server.listen({ port, host }, async () => {
  console.log(`Server on port: ${server.address().port}`);
  connectProsa();
});
