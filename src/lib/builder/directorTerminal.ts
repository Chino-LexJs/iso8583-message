import { Director } from "./director";
import { Builder } from "./builder";
import { tansaction_keys } from "../../db/types";
import { getTerminal } from "../../db/terminal.controller";
import { getTransaction_keys } from "../../db/transaction_keys.controller";
import { array_to_hexa } from "../../util/array_to_hexa";
import {
  captureDate,
  localTransactionDate,
  localTransactionTime,
  trasmissionDateAndTime,
} from "../../util/dateTime_utils";
import {
  Execute_Payment,
  Request_Payment,
  Request_Payment_Response,
} from "../messageTypes";

export class DirectorTerminal extends Director {
  constructor(builder: Builder) {
    super(builder);
  }
  public async getRequestResponse(
    request: Request_Payment,
    id_request: number
  ): Promise<Request_Payment_Response> {
    let id_terminal = request.device.serialnr;
    // buscar terminal
    let terminal = await getTerminal(id_terminal);
    console.log("\n\nTerminal de bd");
    console.log(terminal);
    let transaction_keys: tansaction_keys = await getTransaction_keys(
      id_terminal
    );
    console.log("\nTransaction_key de bd");
    console.log(transaction_keys);
    let res: Request_Payment_Response = {
      servertime: new Date().toString(),
      rc: id_request ? -1 : 0,
      rcmessage: "bla bla bla",
      id: id_request ? id_request : -1,
      workkey: {
        ksn: transaction_keys.ksn,
        key: transaction_keys.workkey_key,
        crc32: transaction_keys.crc32,
        check_value: transaction_keys.check_value,
      },
    };
    return res;
  }
  public set0200(
    message: Execute_Payment, //Execute_Payment
    id_request: number,
    request: Request_Payment
  ): void {
    this.builder
      .setP1("000000001000018C") // DEBE SER AUTOGENERADO
      .setP3("000000")
      .setP4(request.amount.toString().replace(/./g, "").padStart(12, "0"))
      .setP7(trasmissionDateAndTime())
      .setP11(id_request.toString().padStart(6, "0"))
      .setP12(localTransactionTime())
      .setP13(localTransactionDate())
      .setP17(captureDate())
      .setP18("5399") // @todo Merchart Type otorga PROSA
      .setP22(this.entryMode(request.entry_mode))
      .setP25("00")
      .setP32("1109000000003") // @todo Acquiring Institution ID Code otorga PROSA se recupera de la DB
      .setP37(id_request.toString().padStart(12, "0")) // id_request 12 digitos
      .setP42(request.device.serialnr.padStart(15, "0"))
      .setP43("0000000000000000000000000000000000000000") // @todo function buscar en DB información de la terminal (direccion) 40 digitos
      .setP48("027000000000000000000000000000") // @todo function buscarn en DB Retailer ID, Group y Region (aclarar con OSCAR)
      .setP49("484")
      .setP60("0160000000000000000") // @todo function procesar en SERVER y buscar en BD Terminal Owner FIID, Logical Network, Time Offset y Pseudo Terminal ID
      .setP61("0190000000000000000000") // @todo informacion de la tarjeta Category, Save Account Indicator, Interchange Response Code
      .setP63(this.token_transaction(request, message)) // @todo function con TOKEN ES, TOKEN EZ
      .setS100("010") // @todo function recupera de DB codigo fijo otorgado por PROSA
      .setS120("02900000000000000000000000000000") // @todo function buscar en DB datos de la Terminal: Name and Location, Terminal Brach ID
      .setS121("02000000000000000000000") // @todo function buscar en DB datos varios de Terminal (CRT)
      .setS125("012ADINTR000000") // @todo function procesar datos de Tarjteta (Services|Originador|Destination|Draft Capture Flag)
      .setS126("03800000000000000000000000000000000000000"); // @todo Aclarar con Oscar si todos son ceros
  }
  public get0200(): string {
    let dataElements: number[] = [];
    Object.keys(this.getBuilder()).forEach((de) => {
      dataElements.push(Number(de.slice(1)));
    });
    let message: string = "";
    let header = "ISO026000050",
      messageTypeId = "0200",
      bitmap = array_to_hexa(dataElements).hexaPB;
    this.builder.setP1(array_to_hexa(dataElements).hexaSB);
    message = message.concat(
      header,
      messageTypeId,
      bitmap,
      this.builder.getP1(),
      this.builder.getP3(),
      this.builder.getP4(),
      this.builder.getP7(),
      this.builder.getP11(),
      this.builder.getP12(),
      this.builder.getP13(),
      this.builder.getP17(),
      this.builder.getP18(),
      this.builder.getP22(),
      this.builder.getP25(),
      this.builder.getP32(),
      this.builder.getP37(),
      this.builder.getP42(),
      this.builder.getP43(),
      this.builder.getP48(),
      this.builder.getP49(),
      this.builder.getP60(),
      this.builder.getP61(),
      this.builder.getP63(),
      this.builder.getS100(),
      this.builder.getS120(),
      this.builder.getS121(),
      this.builder.getS125(),
      this.builder.getS126()
    );
    return message;
  }
}
