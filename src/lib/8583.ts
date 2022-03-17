import { unpack } from "../util/unpack";
import obligatoryFields from "../util/obligatoryFields.js";

/**
 * Clase contenedora para mensajes ISO 8583
 * Contiene los menasjes para las llamadas:
 * 0200 Solicitud de transaccion financiera
 * 0210 Respuesta de transaccion financiera
 * 0220 Asesoramiento de transaccion financiera
 * 0230 Respuesta de aviso de transaccion financiera
 * 0420 Aviso de reversion del adquiriente
 * 0430 Respuesta de inversion del adquiriente
 * 0800 Solicitud de gestion de red
 * 0810 Respuesta de solicitud de gestion de red
 */

export abstract class ISO8583 {
  header: string;
  mti: string;

  /**
   * FIELDS:
   * [
   * 0: tipo (string),
   * 1: cantidad según tipo (number),
   * 2: nombre data element (string),
   * 3: M (Boolean),
   * 4: info de data element (string)
   * ]
   */

  public fields: {
    [keys: number]: (string | number | boolean)[];
  } = {
    0: ["n", 4, "MTI", false, "info"],
    1: ["an", 16, "Secundary Bitmap", false, "info"],
    3: ["n", 6, "Processing code", false, "info"],
    4: ["n", 12, "Transaction Amount", false, "info"],
    7: ["n", 10, "Transmission Date and Tim", false, "info"],
    11: ["n", 6, "Systems Trace Audit Number", false, "info"],
    12: ["n", 6, "Local Transaction Time", false, "info"],
    13: ["n", 4, "Local Transaction Date", false, "info"],
    17: ["n", 4, "Capture Date", false, "info"],
    18: ["n", 4, "Merchart Type", false, "info"],
    22: ["n", 3, "Point of Service Entry Mode", false, "info"],
    25: ["n", 2, "Point of Service Condition Code", false, "info"],
    32: ["n", 11, "Acquiring Intitution ID Code", false, "info"],
    35: ["ans", 37, "Track 2 Data", false, "info"],
    37: ["arn", 12, " Retrieval Reference Number", false, "info"],
    38: ["an", 6, "Authorization ID Response", false, "info"],
    39: ["an", 2, "Response Code", false, "info"],
    41: ["ans", 16, "Card Acceptor Terminal ID", false, "info"],
    42: ["ans", 15, "Card Acceptor ID Code", false, "info"],
    43: ["ans", 40, "Card Acceptor Name / Location", false, "info"],
    44: ["ans", 4, "Additional Response Date", false, "info"],
    45: ["ans", 76, "Track 1 Data", false, "info"],
    48: ["ans", 30, "Retailer Data", false, "info"],
    49: ["n", 3, "Transaction Currency Code", false, "info"],
    54: ["ans", 15, "Additionals Amounts", false, "info"],
    60: ["ans", 19, "Terminal Data", false, "info"],
    61: ["ans", 22, "Card Issuer-Caterogy - Response Code Data", false, "info"],
    62: ["ans", 13, "Postal Code", false, "info"],
    63: ["ans", 600, " Additional Data", false, "info"],
    70: ["n", 3, "Network Management Information Code", false, "info"],
    90: ["an", 42, "Original Data Elements", false, "info"],
    95: ["n", 42, "Replacement Amounts", false, "info"],
    100: ["n", 11, "Receiving Intitution ID Code", false, "info"],
    102: ["ans", 28, "Account ID 1", false, "info"],
    120: ["ans", 32, "Terminal Address-Branch", false, "info"],
    121: ["ans", 23, "Authorization Indicators", false, "info"],
    122: ["ans", 14, "Card Issuer ID Code", false, "info"],
    123: ["ans", 23, "Pos Invoice Data", false, "info"],
    125: ["ans", 15, "POS Settlement Data", false, "info"],
    126: ["ans", 41, "Pos Preauthorization and Chargeback Data", false, "info"],
  };

  constructor(msg: { [key: number]: string }, mti: string, header: string) {
    this.header = header;
    this.mti = mti;
    unpack(msg, this.fields);
  }

  /**
   * Devuelve el mensaje en formato ISO-8583
   */
  abstract getMessage(): string;

  abstract getMti(): string;
  //   abstract getHeader(): string;
  //   abstract getPBitmap_Hex(): string;
  //   abstract getPBitmao_Bin(): string;
  //   abstract validateMessage(): Boolean;
  //   abstract checkMTI(): Boolean;
}
export class MTI0200 extends ISO8583 {
  constructor(msg: { [key: number]: string }, mti: string, header: string) {
    super(msg, mti, header);
  }
  /**
   *
   * Primary bitmap:	    B238C48108E1841E
   * Secondary bitmap:	0000004210000199
   */
  private bitmap: string = "B238C48108E1841E";

  public getBitmap(): string {
    return this.bitmap;
  }

  getMessage(): string {
    let msg = "";
    msg = msg.concat(this.header, this.mti, this.bitmap);
    const keys = Object.keys(this.fields);
    for (let i = 0; i < keys.length; i++) {
      if (this.fields[parseInt(keys[i])][3]) {
        msg = msg.concat(this.fields[parseInt(keys[i])][4].toString());
      }
    }
    return msg;
  }
  getMti(): string {
    return this.mti;
  }
}
