import { saveFolio } from "../db/saveFolio";
import { saveMessage } from "../db/saveMessage";
import { MTI0200 } from "../lib/MTI0200";

function newConnection(socket: any) {
  console.log(
    `New connection from ${socket.remoteAddress} : ${socket.remotePort}`
  );
}

async function message_pos(
  message: { [key: string]: string },
  socket: any,
  clients: any[] = [],
  sendMessagePROSA: Function
) {
  console.log("hasta aca todo bien");
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
  await sendMessagePROSA(
    {
      message: message0200.getMessage(),
      SystemsTrace: message.SystemsTrace,
    },
    n_folio
  );
}

async function message_prosa(
  message: { [key: string]: string },
  clients: any[] = []
) {
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
}

export { newConnection, message_pos, message_prosa };
