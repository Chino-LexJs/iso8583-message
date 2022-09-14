import { getRequestById, saveRequest } from "../db/request.controllers";
import { message_request } from "../db/types";

import { TerminalCollection } from "./TerminalCollection";
import { Prosa } from "./Prosa";

import { DirectorTerminal } from "./builder/directorTerminal";
import { iso8583 } from "./builder/iso8583";

import {
  Execute_Payment,
  Request_Payment,
  Request_Payment_Response,
} from "./messageTypes";

class Terminal {
  /**
   * @desc Propiedad que contendra la conexion socket para recibir y enviar msj
   * @type {any}
   */
  private socket: any;
  /**
   * @desc Se establecio un limite de tiempo para la conexion socket de 55 segundos
   * @type {number}
   */
  private TIEMPO_CONEXION_RCES: number = 55000;
  /**
   * @desc Propiedad que contendra la conexion socket para enviar msj a Movistar
   * @type {any}
   */
  private socketProsa: any;

  private terminals = TerminalCollection.getInstance();

  private static terminalsCollections = TerminalCollection.getInstance();

  constructor(socket: any) {
    this.socket = socket;
    // this.socket.setEncoding("utf8"); // se configura socket para manejar cadena de caracteres en el buffer[]
    this.socket.on("message", async (message: any) => {
      console.log("\nMensaje de Terminal mediante socket: ");
      console.log(message);
    });
    this.socket.on("close", () => {
      this.terminals.closeConnection(this.socket);
      console.log("\nComunicacion finalizada con Terminal");
    });
    this.socket.on("error", function (err: Error) {
      console.log(`Error: ${err}`);
    });
    this.socket.setTimeout(this.TIEMPO_CONEXION_RCES); // Tiempo limite de conexión
    this.socket.on("timeout", () => {
      console.log("Connexion socket con RCES timeout");
      this.socket.end();
    });
  }

  public async requestPayment(
    message: Request_Payment
  ): Promise<Request_Payment_Response> {
    // manejador de mensajes de terminal
    let unpack: iso8583 = new iso8583();
    let director: DirectorTerminal = new DirectorTerminal(unpack);

    let requestMessage: Request_Payment = message;
    let request: message_request = {
      mti: "0200",
      content: requestMessage,
    };
    let id_request = await saveRequest(request);
    let res = await director.getRequestResponse(requestMessage, id_request);
    console.log("\n\nRequest response to terminal: ", res);
    return res;
  }
  public async executePayment(message: Execute_Payment) {
    let messageToProsa: string = "";
    // manejador de mensajes de terminal
    let unpack: iso8583 = new iso8583();
    let director: DirectorTerminal = new DirectorTerminal(unpack);

    let executePayment: Execute_Payment = message;
    console.log("\n\nExecute Payment de Terminal:");
    console.log(executePayment);
    let id_request = executePayment.id;
    this.terminals.saveConnection(id_request, this.socket);
    let request: message_request = await getRequestById(id_request);
    console.log("\nrequest de base da datos");
    console.log(request.content);
    director.set0200(executePayment, id_request, request.content);
    messageToProsa = director.get0200();
    console.log("\nMensaje a Prosa:");
    console.log(messageToProsa);
    Prosa.getInstance().getSocket().write(messageToProsa, "utf8");
  }
  public setSocketProsa(socket: any) {
    this.socketProsa = socket;
  }
  public getSocketProsa(): any {
    return this.socketProsa;
  }
  public static getTerminals(): TerminalCollection {
    return this.terminalsCollections;
  }
}

export { Terminal };
