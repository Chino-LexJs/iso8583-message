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

const path = "/retail/charge";

let JSON = {
  MTI: "REQUEST", // Message Type Indetifier 0200
  ProcessingCode: "000000", // P3 Processing code
  AmountTransaction: "000000054000", // P4 amount transaction
  TransmissionDateTim: "0926183724", // P7 Transmition date y time
  LocalTransactionTime: "185100", // P12 Time, local transaction
  LocalTransactionDate: "0926", // P13 Date, local transaction
  PointServiceEntryMode: "901", // P22 Point of service enrty mode
  PointServiceConditionCode: "00", // P25 Point of Service Condition Code
  CardAcceptorTerminalID: "CEN50FRDSS787932", // P41 Card Acceptor Terminal ID
  AdditionalData: "030101B0200VAFAAR8303306", // P63 Additional Data
};

socket.connect({ host: "localhost", port: 3000 }, () => {
  socket.sendMessage(JSON);
  socket.end();
});
socket.on("end", function () {
  console.log("Requested an end to the TCP connection");
});
