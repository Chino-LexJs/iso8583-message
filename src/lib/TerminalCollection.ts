import { Request_Payment_Response, Terminal_Response } from "./messageTypes";

class TerminalCollection {
  /**
   * Map que guarda las distintas conexiones sockets de TERMINAL de la siguiente forma
   * key: es el id de Request de TERMINAL (P-11 y P-37)
   * valor: conexion socket
   * terminalCollections: new Map() : key(id_request) => socket connection
   */
  private terminalCollections: Map<number, any> = new Map();
  private static instance: TerminalCollection;

  public static getInstance(): TerminalCollection {
    if (!TerminalCollection.instance) {
      TerminalCollection.instance = new TerminalCollection();
    }
    return TerminalCollection.instance;
  }

  public getCollections(): Map<number, any> {
    return this.terminalCollections;
  }

  public saveConnection(id_request: number, socket: any) {
    this.terminalCollections.set(id_request, socket);
  }

  public findConnection(id_request: number): boolean {
    return this.terminalCollections.has(id_request);
  }

  public closeConnection(socket: any) {
    for (let client of this.terminalCollections.keys()) {
      if (socket == this.terminalCollections.get(client)) {
        this.terminalCollections.delete(client);
      }
    }
  }

  public sendMessageConnection(
    id_request: number,
    message: Request_Payment_Response
  ) {
    let client = this.terminalCollections.get(id_request);
    client.sendMessage(message);
    this.terminalCollections.delete(id_request);
    client.end();
  }
}

export { TerminalCollection };
