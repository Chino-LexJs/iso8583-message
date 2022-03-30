/**
 * Servidor Cliente de prueba para simular la comunicacion con Terminales POSNETS
 */

var net = require("net");
var JsonSocket = require("json-socket");
var port_PIDEAKY = 3000;
var host = "localhost";

var socket = new net.Socket(); // se crea socket de cliente
var jsonSocket = new JsonSocket(socket);

let JSON = {
  MTI: "REQUEST", // Message Type Indetifier 0200
  ProcessingCode: "000000", // P3 Processing code
  TransactionAmount: "000000054000", // P4 amount transaction
  TransmissionDateTim: "0926183724", // P7 Transmition date y time
  LocalTransactionTime: "185100", // P12 Time, local transaction
  LocalTransactionDate: "0926", // P13 Date, local transaction
  PointServiceEntryMode: "901", // P22 Point of service enrty mode
  PointServiceConditionCode: "00", // P25 Point of Service Condition Code
  CardAcceptorTerminalID: "CEN50FRDSS787932", // P41 Card Acceptor Terminal ID
  AdditionalData: "030101B0200VAFAAR8303306", // P63 Additional Data
  ID: "",
};

function connect() {
  console.log(`Servidor en puerto: ${port_PIDEAKY} de host: ${host}`);
  socket.removeAllListeners("error");
  // socket.destroy();
}
function error() {
  console.log(`SIN servidor en el puerto : ${port_PIDEAKY} de host: ${host}`);
}
function end() {
  console.log("Requested an end to the TCP connection");
}
jsonSocket.on("connect", connect);
jsonSocket.on("error", error);
jsonSocket.on("end", end);
jsonSocket.on("message", (data) => {
  console.log(data);
  socket.end();
});

jsonSocket.connect(port_PIDEAKY, host, () => {
  jsonSocket.sendMessage(JSON);
});
