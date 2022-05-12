import { unpack } from "../util/unpack";
import { unpack_prosa } from "../util/unpack_prosa";
import obligatoryFields from "../util/obligatoryFields.js";
import { fields } from "../util/utils_dataElements/fields";

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
  header: string = "";
  mti: string = "";

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
    [keys: string]: (string | number | boolean)[];
  } = fields;

  constructor(dataElements: { [keys: string]: string } & string, mti: string) {
    switch (mti) {
      case "REQUEST" || "0200":
        unpack(dataElements, this.fields);
        break;
      case "0210":
        unpack_prosa(dataElements, this.fields);
        break;
      default:
        unpack(dataElements, this.fields);
        break;
    }
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
