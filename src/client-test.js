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
    "000000", // P3 Processing code
    "000000054000", // P4 amount transaction
    "0926183724", // P7 Transmition date y time
    "190601", // P11 Systems trace audit number
    "185100", // P12 Time, local transaction
    "0926", // P13 Date, local transaction
    "901", // P22 Point of service enrty mode
    "00", // P25 Point of Service Condition Code
    "[21]5579210000000386=0000", // P35 Track 2 Data
    "000000005928", // P37 Retrieval reference number
    "CEN50FRDSS787932", // P41 Card Acceptor Terminal ID
    "484", // P49 Transaction Currency Code
    "030101B0200VAFAAR8303306", // P63 Additional Data
  ],
};

socket.connect({ host: "localhost", port: 3000 }, () => {
  socket.sendMessage(message02);
  socket.end();
});
socket.on("end", function () {
  console.log("Requested an end to the TCP connection");
});
