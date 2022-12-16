import { saveEcho_test } from "../db/echo_test.controller";
import { GetBuilder, Message } from "../lib/builder/builder";
import { Director } from "../lib/builder/director";
import { Prosa } from "../lib/Prosa";

// instancia singleton de Prosa
const prosa = Prosa.getInstance();

async function loopReverses() {
  // hablar con Oscar para determinar los mensajes recersos
  console.log(
    `\nBuscando Reverses...\nSe encontraron: 0 mensajes reversos sin respuesta 0430`
  );
  // sendReverseMessages(reverses);
}
async function loopEcho() {
  console.log("Loop Echo");
  let echo = GetBuilder("0800");
  let director = new Director(echo);
  let timestamp =
    String(new Date().getMonth() + 1).padStart(2, "0") +
    String(new Date().getDate()).padStart(2, "0") +
    String(new Date().getHours()).padStart(2, "0") +
    String(new Date().getMinutes()).padStart(2, "0") +
    String(new Date().getSeconds()).padStart(2, "0");
  let id_echo_test = await saveEcho_test(timestamp);
  let message: Message = director.BuildEchoMessage(id_echo_test, timestamp);
  console.log(message);
  let messageToProsa =
    message.header + message.mti + message.bitmap + message.dataElements;
  Prosa.getInstance().getSocket().write(messageToProsa, "utf8");
  Prosa.getInstance().getSocket().write("\n");
  console.log("Mensaje enviado a Prosa");
}

export { loopEcho, loopReverses, prosa };
