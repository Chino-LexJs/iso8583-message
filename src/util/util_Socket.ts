import { saveFolio } from "../db/saveFolio";
import { saveMessage } from "../db/saveMessage";
import { MTI0200 } from "../lib/MTI0200";
import { unpack_prosa } from "./unpack_prosa";
import { fields } from "./utils_dataElements/fields";

async function message_pos(
  message: { [key: string]: any } & string,
  socket: any,
  clients: any[] = [],
  sendMessagePROSA: Function
) {
  var n_folio: any;
  n_folio = await saveFolio(message.TERMINAL_ID, message.AMOUNT);
  console.log(`Mensaje de Terminal:`);
  console.log(message);
  message.SYSTEMS_TRANCE = n_folio.toString(); // SystemsTraceAuditNumber
  await saveMessage(n_folio, message, "0200", "terminal", "pideaky");
  clients.push({
    socket: socket,
    SystemsTrace: message.SYSTEMS_TRANCE,
  });

  let message0200 = new MTI0200(message, message.MTI);
  console.log(message0200.getFields());
  await sendMessagePROSA(
    {
      message: message0200.getMessage(),
      SystemsTrace: message.SystemsTrace,
    },
    n_folio
  );
}

async function message_prosa(message: string, clients: any[] = []) {
  console.log(`Mensaje de Prosa:`);
  console.log(message);
  let messageTerminal: { [key: string]: string } = unpack_prosa(
    message,
    fields
  );
  await saveMessage(
    Number(messageTerminal.SystemsTraceAuditNumber),
    { message },
    "0210",
    "prosa",
    "pideaky"
  );
  clients.forEach(async (client) => {
    if (
      Number(client.SystemsTrace) ===
      Number(messageTerminal.SystemsTraceAuditNumber)
    ) {
      console.log("Encontre a la terminal!!!!");
      await saveMessage(
        Number(messageTerminal.SystemsTraceAuditNumber),
        messageTerminal,
        "0210",
        "pideaky",
        "terminal"
      );
      let clientSocket = client.socket;
      console.log(`Mensaje que se envia a Terminal:`);
      console.log(messageTerminal);
      clientSocket.sendMessage(messageTerminal);
      clientSocket.end();
    }
  });
}

export { message_pos, message_prosa };
