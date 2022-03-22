/**
 * Servidor Cliente de prueba para simular la comunicacion con Terminales POSNETS
 */

var Socket = require("net").Socket,
  JsonSocket = require("json-socket");
var socket = new JsonSocket(new Socket());

let message01 = {
  0: "0200",
  1: "0000004210000199",
  3: "650000",
  4: "000000002050",
  7: "0428132710",
  11: "000578",
  12: "132710",
  13: "0428",
  17: "0804",
  32: "456",
  35: "4591700012340000=",
  37: "000000230579",
  41: "A1B2C3D4E5",
  43: "SOLABTEST TEST-3 DF MX",
  48: "abcdefghij",
  49: "484",
  60: "B456PRO1+000",
  61: "1234P",
  100: "999",
  102: "ABCD",
};

/**
 * 0 : header
 * 1 : mti
 * 2 : primary bitmap
 * 3 : data elements
 */
let message02 = {
  0: "ISO002600005",
  1: "0200",
  2: "3238048028808002",
  3: [
    "0200",
    "0000004210000199",
    "650000",
    "000000002050",
    "0428132710",
    "000578",
    "132710",
    "0428",
    "0804",
    "456",
    "4591700012340000=",
    "000000230579",
    "A1B2C3D4E5",
    "SOLABTEST TEST-3 DF MX",
    "abcdefghij",
    "484",
    "B456PRO1+000",
    "1234P",
    "999",
    "ABCD",
  ],
};

socket.connect({ host: "localhost", port: 3000 }, () => {
  socket.sendMessage(message02);
  socket.end();
});
socket.on("end", function () {
  console.log("Requested an end to the TCP connection");
});
