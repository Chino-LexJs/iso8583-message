/**
 * Servidor Server de prueba para simular la comunicacion con PROSA
 */

import { Director } from "./lib/builder/director";
import { MessageProsa } from "./lib/messageProsa";
import {
  Terminal_InitKeys,
  Token_C4,
  Token_EX,
  Token_Q1,
  Token_Q2,
} from "./lib/messageTypes";

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
      console.log("Builder from pideaky");
      console.log(director.getBuilder());
      if (director.getField07_ES() == 1) {
        console.log(
          "SEGUN CAMPO 07 DE TOKEN_ES ES NECESARIO REALIZAR UN INICIO DE LLAVES"
        );
        directorToPideaky.getBuilder().setP63(tokens_initKeys());
      } else {
        console.log(
          "SEGUN CAMPO 07 DE TOKEN_ES NO ES NECESARIO REALIZAR UN INICIO DE LLAVES"
        );
      }
      let resTerminalToPideaky = directorToPideaky.get0210();
      console.log("\nBuilder to pideaky:");
      console.log(msgToPideaky.getBuilder());
      console.log("\n\n\n", resTerminalToPideaky);
      // console.log(message);
      // sendMessagePIDEAKY(message);
      socket.write(resTerminalToPideaky);
      console.log("Mensaje enviado");
    },
    "uft8"
  );
});

function tokens_initKeys(): string {
  let p63 = "";
  let tokenEx: Token_EX = {
    key_cifrada: "AEA40693C054BE3A65E14D572C58EAB9",
    ksn: "0102012345678AE00001",
    check_value: "E528FD",
    status: "00",
    crc32: "6B7A5FC0",
  };
  let tokenQ1: Token_Q1 = {
    id_authMode: "0",
    id_validMode: "2",
  };
  let tokenQ2: Token_Q2 = {
    id_authMode: "03",
  };
  let tokenC4: Token_C4 = {
    ind_terminal: "0",
    term_oper_ind: "0",
    loc_terminal: "0",
    ind_tarjeth: "0",
    ind_tarjet: "0",
    ind_cap_tarjet: "0",
    ind_status: "0",
    level_security: "0",
    routing_ind: "0",
    act_terminal: "0",
    ind_cap_datos: "5",
    met_ind_tarjet: "2",
  };
  let headerToken = "& 04",
    tokensData = "",
    q1 = token_Q1(tokenQ1),
    q2 = token_Q2(tokenQ2),
    c4 = token_C4(tokenC4),
    ex = token_EX(tokenEx);
  tokensData = tokensData.concat(
    `! Q1${q1.length.toString().padStart(5, "0")} ${q1}`,
    `! Q2${q2.length.toString().padStart(5, "0")} ${q2}`,
    `! C4${c4.length.toString().padStart(5, "0")} ${c4}`,
    `! EX${ex.length.toString().padStart(5, "0")} ${ex}`
  );
  p63 = p63.concat(headerToken, tokensData.length.toString(), tokensData);
  p63 = p63.length.toString().padStart(3, "0") + p63;
  return p63;
}

function token_EX(campos: Token_EX): string {
  let esData = "",
    campo01 = campos.key_cifrada,
    campo02 = campos.ksn,
    campo03 = campos.check_value,
    campo04 = campos.status,
    campo05 = campos.crc32;
  esData = esData.concat(campo01, campo02, campo03, campo04, campo05);
  return esData;
}
function token_Q1(campos: Token_Q1): string {
  let q1Data = "",
    campo01 = campos.id_authMode,
    campo02 = campos.id_validMode;
  q1Data = q1Data.concat(campo01, campo02);
  return q1Data;
}
function token_Q2(campos: Token_Q2): string {
  let q2Data = "",
    campo01 = campos.id_authMode;
  q2Data = q2Data.concat(campo01);
  return q2Data;
}
function token_C4(campos: Token_C4): string {
  let c4Data = "",
    campo01 = campos.ind_terminal,
    campo02 = campos.term_oper_ind,
    campo03 = campos.loc_terminal,
    campo04 = campos.ind_tarjeth,
    campo05 = campos.ind_tarjet,
    campo06 = campos.ind_cap_tarjet,
    campo07 = campos.ind_status,
    campo08 = campos.level_security,
    campo09 = campos.routing_ind,
    campo10 = campos.act_terminal,
    campo11 = campos.ind_cap_datos,
    campo12 = campos.met_ind_tarjet;
  c4Data = c4Data.concat(campo01, campo02);
  return c4Data;
}

server.listen({ port, host }, () => {
  console.log(`Server PROSA on port: ${port}`);
});
