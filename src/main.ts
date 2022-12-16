import { loopEcho, loopReverses, prosa } from "./to-prosa/loops";

const TIEMPO_LOOP_REVERSE = 30000,
  TIEMPO_LOOP_ECHO = 60000,
  VERIFICAR_CONN_PROSA = 1000;

function connectToProsa() {
  if (!prosa.isConnected()) {
    prosa.connect();
  }
}

export async function main() {
  setInterval(loopReverses, TIEMPO_LOOP_REVERSE);
  setInterval(loopEcho, TIEMPO_LOOP_ECHO);
  setInterval(connectToProsa, VERIFICAR_CONN_PROSA);
}
