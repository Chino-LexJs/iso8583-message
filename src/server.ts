import { Prosa } from "./lib/Prosa";
import { Terminal } from "./lib/Terminal";
import { loopEcho, loopReverses } from "./loops/loops";
const express = require("express");
const { createServer } = require("http");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(require("./routes"));
const serverHTTP = createServer(app);

const TIEMPO_LOOP_REVERSE = 30000,
  TIEMPO_LOOP_ECHO = 60000;
/**
 * Instance de Prosa (Singleton)
 */
let prosa = Prosa.getInstance();

function connectToProsa() {
  if (!prosa.isConnected()) {
    console.log("Intentando conectar con prosa");
    prosa.connect();
  }
}

async function main() {
  setInterval(loopReverses, TIEMPO_LOOP_REVERSE);
  setInterval(loopEcho, TIEMPO_LOOP_ECHO);
  setInterval(connectToProsa, 1000);
}

export { serverHTTP, main };
