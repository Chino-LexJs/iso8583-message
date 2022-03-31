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
  AMOUNT: "100.00", // P4 amount transaction
  DATE_TIME: "2022-03-29 12:24:22", // P12 y P13
  ENTRY_MODE: "901", // P22 Point of service enrty mode
  CONDITION_CODE: "00", // P25 Point of Service Condition Code PUEDE QUE NO SE USE
  TERMINAL_ID: "CEN50FRDSS787932", // P41 Card Acceptor Terminal ID
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
