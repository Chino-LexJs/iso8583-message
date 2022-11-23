import { getTerminal_RequestById } from "../db/terminal_request.controllers";
import { tansaction_keys } from "../db/types";
import { MessageProsa } from "./messageProsa";
import {
  Execute_Payment_Response,
  InitKeys_Response,
  Request_Payment_Response,
} from "./messageTypes";
import { TerminalCollection } from "./TerminalCollection";
import { Token_EX } from "./tokensTypes";
import { terminal_request } from "../db/types";
import { saveTransaction_keys } from "../db/transaction_keys.controller";
import { updateRes } from "../db/echo_test.controller";

const { Socket } = require("net");
const to_prosa = {
  host: "localhost",
  port: 8000,
};

/**
 * @classdesc Esta clase esta diseñada con el patron Singleton, sirve para ser la conexion con Prosa
 * @clase
 * Contiene la conexion socket a prosa y el comportamiento de los msj entrantes y salientes
 */
export class Prosa {
  private connected: boolean;
  private socket: any;
  private tiempoRespuesta: number = 55;
  private static instance: Prosa;
  /**
   * @constructor The Singleton's constructor should always be private to prevent direct
   * @hideconstructor
   */
  private constructor() {
    this.connected = false;
  }
  /**
   * @function getInstance
   * @desc Static method that controls the access to the singleton instance.
   * @return {Prosa} unica instancia de prosa
   */
  public static getInstance(): Prosa {
    if (!Prosa.instance) {
      Prosa.instance = new Prosa();
    }
    return Prosa.instance;
  }
  /**
   * @function getSocket
   * @desc Devuelve la conexion socket a Prosa
   * @returns {any} Socket con conexion a Prosa
   */
  public getSocket(): any {
    return this.socket;
  }
  /**
   * @function setConnected
   * @desc Dependiendo el valor que se envia por parametro, se modifica el estado conectado de la instancia
   * @param {boolean} state estado de conectado(true) o desconectado (false)
   */
  private setConnected(state: boolean): void {
    this.connected = state;
  }
  /**
   * @function getMti
   * @desc La trama message debe tener el mti en los primeros 4 caracteres
   * @borrows substr
   * @param {string} message Mensaje ISO 8583 de Movistar
   * @returns {string} mti type of message ej: 0200, 0210, 0430, 0800, 0810
   */
  private getMti(message: string): string {
    return message.substr(12, 4);
  }
  /**
   * @function onData
   * @desc Recibe msj en formato sio 8583 y determina que manejador usar segun su mti
   * @param {string} message msj de movistar en formato iso8583
   */
  private async onData(message: string) {
    let mtiMessage = this.getMti(message);
    switch (mtiMessage) {
      case "0210":
        console.log("Mensaje de Prosa: ", message);
        let message0210 = new MessageProsa(message);
        console.log("\nBuilder from Prosa:");
        console.log(message0210.getUnpack());
        let p63 = message0210.getUnpack().getP63();
        if (p63 && p63.indexOf("! EX") != -1) {
          // Respuesta 0210 de incio de llaves
          let token_EX: Token_EX = message0210.get_tokenEX();
          let terminal_request: terminal_request =
            await getTerminal_RequestById(
              Number(message0210.getUnpack().getP37())
            );
          let transaction_keys: tansaction_keys = {
            id_terminal: terminal_request.terminal_id,
            timestamp: new Date().toDateString(),
            check_value: token_EX.check_value,
            crc32: token_EX.crc32,
            name: terminal_request.request.key.name,
            rsa: terminal_request.request.key.rsa,
            ksn: token_EX.ksn,
            workkey_key: token_EX.key_cifrada,
            real_counter: 0,
          };
          await saveTransaction_keys(transaction_keys);
          let res: Request_Payment_Response = {
            id: Number(message0210.getUnpack().getP37()),
            rc: 0,
            rcmessage: "EN CURSO",
            servertime: String(new Date()),
            workkey: {
              check_value: transaction_keys.check_value,
              crc32: transaction_keys.crc32,
              key: transaction_keys.workkey_key,
              ksn: transaction_keys.ksn,
            },
          };
          console.log("resTerminal:");
          console.log(res);
          let terminalConnections = TerminalCollection.getInstance();
          terminalConnections.sendMessageConnection(Number(res.id), res);
        } else {
          // Respuesta 0210 de transaccion normal
          let res: Execute_Payment_Response = {
            id: Number(message0210.getUnpack().getP37()), // retrieval reference number
            timestamp: String(new Date()),
            rc: message0210.getUnpack().getP39() == "00" ? 0 : 1, // response code
            rcdatetime: message0210.getUnpack().getP13(), // local transaction date
            rcmessage:
              message0210.getUnpack().getP39() == "00"
                ? "APROBADA"
                : "DESAPROBADA", // cambiar a posibles respestas
            ticket: Number(message0210.getUnpack().getP11()), // system trace audit number
            authorization: message0210.getUnpack().getP38(), // Authorization ID Response
            keys_expired: false,
          };
          console.log("resTerminal:");
          console.log(res);
          let terminalConnections = TerminalCollection.getInstance();
          terminalConnections.sendMessageConnection(Number(res.id), res);
        }
        break;
      case "0430":
        // this.message0430(message);
        break;
      case "0810":
        console.log("\nMENSAJE RESPUESTA DE ECHO TEST: ");
        console.log(message);
        let message0810 = new MessageProsa(message);
        console.log("\nBuilder from Prosa:");
        console.log(message0810.getUnpack());
        await updateRes(Number(message0810.getUnpack().getP11()), true);
        break;
      default:
        console.log("\nTipo de mensaje (MTI) no soportado por el Servidor");
        console.log(message);
        break;
    }
  }
  /**
   * @function connect
   * @description Establece conexion socket a Movistar
   * @desc Se conecta mediante socket a Movistar si la conexion esta cerrada
   */
  public connect() {
    if (!this.connected) {
      this.socket = new Socket();
      this.socket.connect(to_prosa);
      this.setConnected(true);
      this.socket.setEncoding("utf8"); // se configura socket para manejar cadena de caracteres en el buffer[]
      this.socket.on("data", (message: string) => this.onData(message));
      this.socket.on("close", () => {
        this.setConnected(false);
        this.socket.destroy();
        console.log(`\nComunicacion con MOVISTAR finalizada`);
      });
      this.socket.on("error", (err: Error): void => {
        this.setConnected(false);
        this.socket.destroy();
      });
    }
  }
  public isConnected(): boolean {
    return this.connected;
  }
}
