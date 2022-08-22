import { Director } from "./builder/director";
import { MessageProsa } from "./messageProsa";
import { TerminalCollection } from "./TerminalCollection";

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
  private onData(message: string) {
    let mtiMessage = this.getMti(message);
    switch (mtiMessage) {
      case "0210":
        console.log("Mensaje de Prosa: ", message);
        let message0210 = new MessageProsa(message);
        let director = new Director(message0210.getBuilder());
        let resTerminal = director.getRes0210();
        console.log("resTerminal:");
        console.log(resTerminal);
        let terminalConnections = TerminalCollection.getInstance();
        terminalConnections.sendMessageConnection(
          Number(resTerminal.trace_id),
          resTerminal
        );
        break;
      case "0430":
        // this.message0430(message);
        break;
      case "0800":
      // this.message0800(message);
      default:
        console.log("\nTipo de mensaje (MTI) no soportado por el Servidor");
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
        console.log(`\nComunicacion con MOVISTAR finalizada`);
        this.setConnected(false);
        this.socket.destroy();
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
