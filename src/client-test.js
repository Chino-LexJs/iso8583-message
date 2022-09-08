/**
 * Servidor Cliente de prueba para simular la comunicacion con Terminales POSNETS
 */
require("colors");
var net = require("net");
var JsonSocket = require("json-socket");
var port_PIDEAKY = 3000;
var host = "localhost";

var socket = new net.Socket(); // se crea socket de cliente
var jsonSocket = new JsonSocket(socket);

// Primer JSON que se coordino con Oscar
let JSON_01 = {
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

// JSON tomado de ejemplo de manual StramPay para una venta con banda magnetica src/lib/messageTypes
let requestPayment = {
  type: "REQUEST",
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

// JSON tomado de ejemplo de manual StramPay para Inicializacion de llaves src/lib/messageTypes
let init_keys = {
  type: "INIT",
  check_value: "CAA9B0",
  crc32: "BF8425A0",
  device: {
    serial: "PB04204S60977",
    version: "100",
  },
  isoType: "ISO",
  rsa: "8481B7D10576D49CE1AACACF284B13256D8313A104F9C68434E3A931759F659917BD7434198F5A358DCEF0F615FD6D84332710C30ABCD050C5D96752658AB02AFAAF053B3F0B9997DD02D12472B06EC9F0A8F5E740486E875F467572E39C0FC386EDBD882D624273B1AA44945942BAC597CC333CACB6C334743E5495E708A9B10D1A3461ED58F5A48000A1862DAB658B8B4A6F0BB45617E5AAA0538A12F776A9CC752BC8070802ECB5388A3C14D811D318378E13639DB7E96BD3824C127BC5B224A137470DCF7547961EA344B5138898302F04327B3846AA586E036AF8F17FEFF061A431223B15A8E185B85343D1A2387B27 4E51BD64833D15C7E0F8C6BEE861",
  rsa_name: "A000BZPY72",
};

// JSON tomado de ejemplo de manual StramPay para Check-in src/lib/messageTypes
let checkin = {
  amount: 1,
  authentication: "pin",
  cardInformation: {
    bin: "557910",
    cvv_length: 0,
    cvv_present: false,
    emv_tags:
      "9F2701809F26088AD7DDD181D667D29F3704F100D6A39F360200759C0100820239009F3303E0B8C89F34034403029A032101145F2A0204849F02060000000010009F03060000000000009F3501225F3401019F10120310A74005020000000000000000000000FF8407A00000000410109F090200029F1A020484950500000080009F1E0830303030303930359F6E009F0607A00000000410109F3901055A08520416567447099657105204165674470996D2505201000002269F21031603569F6C005F201a50455246494C455320415A554C2F5052472020202020202020205F24032505318F01069F5D009F4104000000509F53009F7C004F07A000000004101050104465626974204D6173746572636172649B02E8008E1400000000000000004201440341031E0342031F03",
    failed_counter: 0,
    holder_name: " NOMBRE DEL TARJETAHABIENTE",
    last4: "1111",
    real_counter: 9,
    serial_key: "00000153125607600009",
    track2: "E07CFF2C9A9F3CE6069C8B2585D27B229E204DC46B000309",
    track2_crc32: "68A7052A",
    track2_length: 27,
  },
  device: {
    serial: "PB04204S60041",
    version: "100",
  },
  entry_mode: "chip",
  isoType: "ISO",
  reference: "20201204190823",
};

let newRequestPayment = {
  type: "request",
  entry_mode: "magnetic_stripe",
  device: {
    serialnr: "PB04204S60977",
    version: "100",
    counter: 1,
  },
  key: {
    check_value: "CAA9BO",
    crc32: "BF8425A0",
    name: "A000BZPY72",
    rsa: "8481B7D10576D49CE1AACACF284B13256D8313A104F9C68434E3A931759F659917BD7434198F5A358DCEF0F615FD6D84332710C30ABCD050C5D96752658AB02AFAAF053B3F0B9997DD02D12472B06EC9F0A8F5E740486E875F467572E39C0FC386EDBD882D624273B1AA44945942BAC597CC333CACB6C334743E5495E708A9B10D1A3461ED58F5A48000A1862DAB658B8B4A6F0BB45617E5AAA0538A12F776A9CC752BC8070802ECB5388A3C14D811D318378E13639DB7E96BD3824C127BC5B224A137470DCF7547961EA344B5138898302F04327B3846AA586E036AF8F17FEFF061A431223B15A8E185B85343D1A2387B27",
  },
  localtime: "2022-04-22 14:13:00",
  amount: "100.00",
};
let executePayment = {
  type: "execute",
  authentication: "pin",
  cardInformation: {
    bin: "425982",
    cvv_length: 0,
    cvv_present: false,
    emv_tags:
      "9F2701809F26088AD7DDD181D667D29F3704F100D6A39F360200759C0100820239009F3303E0B8C89F34034403029A032101145F2A0204849F02060000000010009F03060000000000009F3501225F3401019F10120310A74005020000000000000000000000FF8407A00000000410109F090200029F1A020484950500000080009F1E0830303030303930359F6E009F0607A00000000410109F3901055A08520416567447099657105204165674470996D2505201000002269F21031603569F6C005F201a50455246494C455320415A554C2F5052472020202020202020205F24032505318F01069F5D009F4104000000509F53009F7C004F07A000000004101050104465626974204D6173746572636172649B02E8008E1400000000000000004201440341031E0342031F03",
    failed_counter: 0,
    cardholder: "NOMBRE DEL TARJETAHABIENTE ",
    last4: "1111",
    counter: 8,
    serial_key: "00000045467101200008",
    track2: "DDD0BD616C1DCA0B24DD0D71FF10A78D680BABD638037F3F",
    track2_crc: "BF4B379D",
    track2_length: 32,
  },
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
  process.exit();
});

console.log(
  "\nSeleccionar opcion para enviar mensaje a Pideaky: \n\n",
  "Request Payment ".padEnd(50, ". "),
  "(1)\n",
  "Execute Payment ".padEnd(50, ". "),
  "(2)\n",
  "Check-in ".padEnd(50, ". "),
  "(3)\n"
);

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("\nSeleccione una opcion: ", (op) => {
  console.log("\nSu opcion fue: ", op);
  readline.close();
  eleccionMenu(op);
});

function eleccionMenu(op) {
  switch (op) {
    case "1":
      console.log("Ejecutar Request Payment \n");
      jsonSocket.connect(port_PIDEAKY, host, () => {
        jsonSocket.sendMessage(newRequestPayment);
      });
      break;
    case "2":
      console.log("\n\n\tExecute Payment \n".green);
      const rd = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rd.question("\nIngrese ID de request: ", (op2) => {
        rd.close();
        console.log("\nID_REQUEST: ", op2);
        executePayment.id = Number(op2);
        jsonSocket.connect(port_PIDEAKY, host, () => {
          jsonSocket.sendMessage(executePayment);
        });
      });

      break;
    case "3":
      console.log("Enviando mensaje de tipo Check-in \n");
      jsonSocket.connect(port_PIDEAKY, host, () => {
        jsonSocket.sendMessage(checkin);
      });
      break;
    default:
      console.log("ERROR: Respuesta no soportada por la simulacion");
      process.exit();
  }
}
