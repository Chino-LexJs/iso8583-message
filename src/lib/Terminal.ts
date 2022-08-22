import { Director } from "./builder/director";
import { iso8583 } from "./builder/iso8583";
import { message_db, Request_Payment, Terminal_Request } from "./messageTypes";
import { Prosa } from "./Prosa";
import { TerminalCollection } from "./TerminalCollection";
const JsonSocket = require("json-socket");

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

  constructor(socket: any) {
    this.socket = new JsonSocket(socket);
    // this.socket.setEncoding("utf8"); // se configura socket para manejar cadena de caracteres en el buffer[]
    this.socket.on("message", async (message: Request_Payment) => {
      console.log("\nMensaje de Terminal: ");
      console.log(message);

      let id_request: number = 124;
      this.terminals.saveConnection(id_request, this.socket);

      // manejador de mensajes de terminal
      let unpack: iso8583 = new iso8583();
      let director: Director = new Director(unpack);
      director.set0200(message, id_request);
      console.log("\nMensaje a Prosa:");
      console.log(director.get0200());
      let prosa = Prosa.getInstance();
      prosa.getSocket().write(director.get0200(), "utf8");
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
  public setSocketProsa(socket: any) {
    this.socketProsa = socket;
  }
  public getSocketProsa(): any {
    return this.socketProsa;
  }
}

export { Terminal };
