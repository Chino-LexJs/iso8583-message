const { Server, Socket } = require("net"),
  JsonSocket = require("json-socket");
import { saveFolio } from "./db/saveFolio";
import { saveMessage } from "./db/saveMessage";
import { MTI0200 } from "./lib/MTI0200";

const port = 3000;
const port_PROSA = 8000;
const host = "0.0.0.0";
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
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );
  socket = new JsonSocket(socket);

  socket.on("message", async (message: { [key: string]: string }) => {
    var folio: any;
    var n_folio: any;
    folio = await saveFolio(message.TERMINAL_ID, message.AMOUNT);
    n_folio = folio[0].insertId;
    console.log(`Mensaje de Terminal:`);
    console.log(message);
    await saveMessage(n_folio, message, "0200", "terminal", "pideaky");
    message.SystemsTrace = n_folio.toString();
    clients.push({
      socket: socket,
      SystemsTrace: message.SystemsTrace,
    });
    let message0200 = new MTI0200(message);
    sendMessagePROSA(
      {
        message: message0200.getMessage(),
        SystemsTrace: message.SystemsTrace,
      },
      n_folio
    );
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
  socketProsa.connect({ host: "localhost", port: port_PROSA });
  socketProsa.on("message", async (message: { [key: string]: string }) => {
    console.log(`Mensaje de Prosa:`);
    console.log(message);
    await saveMessage(
      parseInt(message.SystemsTrace),
      message,
      "0210",
      "prosa",
      "pideaky"
    );
    clients.forEach(async (client) => {
      if (client.SystemsTrace === message.SystemsTrace) {
        await saveMessage(
          parseInt(message.SystemsTrace),
          message,
          "0210",
          "pideaky",
          "terminal"
        );
        let clientSocket = client.socket;
        console.log(`Mensaje que se envia a Terminal:`);
        console.log(message);
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
