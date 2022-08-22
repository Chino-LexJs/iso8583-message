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
  TERMINAL_ID: "CEN50FRDSS787932", // CEN50FRDSS787932 P41 Card Acceptor Terminal ID
  check_value: "CAA9B0",
  crc32: "BF8425A0",
  device: {
    serial: "PAS23SD3",
    version: "100",
  },
  isoType: "ISO",
  rsa: "8481B7D10576D49CE1AACACF284B13256D8313A104F9C68434E3A931759F659917BD7434198F5A358DCEF0F615FD6D84332710C30ABCD050C5D96752658AB02AFAAF053B3F0B9997DD02D12472B06EC9F0A8F5E740486E875F467572E39C0FC386EDBD882D624273B1AA44945942BAC597CC333CACB6C334743E5495E708A9B10D1A3461ED58F5A48000A1862DAB658B8B4A6F0BB45617E5AAA0538A12F776A9CC752BC8070802ECB5388A3C14D811D318378E13639DB7E96BD3824C127BC5B224A137470DCF7547961EA344B5138898302F04327B3846AA586E036AF8F17FEFF061A431223B15A8E185B85343D1A2387B274E51BD64833D15C7E0F8C6BEE861",
  rsa_name: "A000BZPY72",
};

// Json tomado de ejemplo de manual StramPay
let requestPayment = {
  amount: 0.02,
  authentication: "signature",
  cardInformation: {
    bin: "425982",
    cvv_length: 0,
    cvv_present: false,
    failed_counter: 0,
    holder_name: " NOMBRE DEL TARJETAHABIENTE ",
    last4: "1111",
    real_counter: 8,
    serial_key: "00000045467101200008",
    track2: "DDD0BD616C1DCA0B24DD0D71FF10A78D680BABD638037F3F",
    track2_crc32: "BF4B379D",
    track2_length: 32,
  },
  device: {
    serial: "PB04204S60977",
    version: "100",
  },
  entry_mode: "magnetic_stripe",
  isoType: "ISO",
  reference: "607127958470",
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
  jsonSocket.sendMessage(requestPayment);
});
