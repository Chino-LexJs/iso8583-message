import { loopEcho, loopReverses, prosa } from "./to-prosa/loops";

const TIEMPO_LOOP_REVERSE = 30000,
  TIEMPO_LOOP_ECHO = 60000;

function connectToProsa() {
  if (!prosa.isConnected()) {
    console.log("Intentando conectar con prosa");
    prosa.connect();
  }
}

export async function main() {
  setInterval(loopReverses, TIEMPO_LOOP_REVERSE);
  setInterval(loopEcho, TIEMPO_LOOP_ECHO);
  setInterval(connectToProsa, 1000);
}
