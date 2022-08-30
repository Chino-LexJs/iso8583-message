/**
 * Servidor Server de prueba para simular la comunicacion con PROSA
 */

import { Director } from "./lib/builder/director";
import { MessageProsa } from "./lib/messageProsa";

const Socket = require("net").Socket,
  { Server } = require("net");

const port = 8000;
const host = "0.0.0.0";
const message0210 =
  "ISO0260000500210B238C4012E818018000000001000018800000000000000100008031110530001241113520803080353999001109000000003165579209013100166=0803101927000000000000001245522850093278402001_____0271234567            12341234484016FIIDTLNETETOPTID019FIIDCALN10100000000010029TERMINALNAMEANDLOCATION00TBID020CLERIDCRTA0808080844012MCHOSTHOST10";
const server = new Server();
var socket = new Socket();

server.on("connection", (socket: any) => {
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );
  // socket = new JsonSocket(socket);
  socket.setEncoding("utf8");
  socket.on(
    "data",
    (message: string) => {
      let msg = new MessageProsa(message);
      let director = new Director(msg.getBuilder());
      let resTerminal = director.get0200();
      let referenceNumber = director.getBuilder().getP37();
      let msgToPideaky = new MessageProsa(message0210);
      let directorToPideaky = new Director(msgToPideaky.getBuilder());
      directorToPideaky
        .getBuilder()
        .setP11(Number(referenceNumber).toString().padStart(6, "0"));
      directorToPideaky.getBuilder().setP37(referenceNumber);
      let resTerminalToPideaky = directorToPideaky.get0210();
      console.log(msgToPideaky.getBuilder());
      console.log("\n\n");
      console.log(msg.getBuilder());
      console.log("\n\n\n", resTerminal);
      // console.log(message);
      // sendMessagePIDEAKY(message);
      socket.write(resTerminalToPideaky);
      console.log("Mensaje enviado");
    },
    "uft8"
  );
});

server.listen({ port, host }, () => {
  console.log(`Server PROSA on port: ${port}`);
});
