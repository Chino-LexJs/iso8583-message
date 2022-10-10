import { IBuilder, Message } from "./builder";
import { array_to_hexa } from "../../util/array_to_hexa";
import {
  trasmissionDateAndTime,
  localTransactionTime,
  localTransactionDate,
  captureDate,
} from "../../util/dateTime_utils";
import {
  Execute_Payment,
  Execute_Payment_Response,
  Request_Payment,
} from "../messageTypes";
import {
  Token_EX,
  Token_ES,
  Token_EW,
  Token_Q1,
  Token_Q2,
  Token_C4,
  Token_EZ,
} from "../tokensTypes";

export class Director {
  protected builder: IBuilder;
  /**
   * El director trabaja con cualquier instancia builder que el cliente le envie por parametro
   * De esta manera, el cliente puede alterar el tipo de mensaje que desea implementar
   */
  constructor(builder: IBuilder) {
    this.builder = builder;
  }

  public setBuilder(builder: IBuilder): void {
    this.builder = builder;
  }
  public getBuilder(): IBuilder {
    return this.builder;
  }
  /**
   * The Director can construct several product variations using the same
   * building steps.
   */

  // MANEJADOR PARA TERMINAL
  public BuildRequestMessage(
    id_request: number,
    request_message: Request_Payment
  ): Message {
    this.builder.setHeader();
    this.builder.setMti();
    this.builder.setBitmap();
    this.builder.setDataElements(
      this.addDataElements(id_request, request_message)
    );
    return this.builder.getMessage();
  }

  private addDataElements(
    id_request: number,
    request_message: Request_Payment
  ) {
    let amount = request_message.amount
      .toString()
      .replace(/./g, "")
      .padStart(12, "0");
    let dataElements = new Map();
    dataElements
      .set(1, "000000001000018C")
      .set(3, "000000")
      .set(4, amount)
      .set(
        7,
        String(new Date().getMonth() + 1).padStart(2, "0") +
          String(new Date().getDate()).padStart(2, "0") +
          String(new Date().getHours()).padStart(2, "0") +
          String(new Date().getMinutes()).padStart(2, "0") +
          String(new Date().getSeconds()).padStart(2, "0")
      )
      .set(11, String(id_request).padStart(6, "0"))
      .set(
        12,
        String(new Date().getHours()).padStart(2, "0") +
          String(new Date().getMinutes()).padStart(2, "0") +
          String(new Date().getSeconds()).padStart(2, "0")
      )
      .set(
        13,
        String(new Date().getMonth() + 1).padStart(2, "0") +
          String(new Date().getDate()).padStart(2, "0")
      )
      .set(
        17,
        String(new Date().getMonth() + 1).padStart(2, "0") +
          String(new Date().getDate()).padStart(2, "0")
      )
      .set(18, "5399")
      .set(22, "901") // entry mode viene de RequestPaymentMessag)
      .set(25, "00")
      .set(32, "09000000003")
      .set(37, String(id_request).padStart(12, "0"))
      .set(42, String(request_message.device.serialnr).padStart(15, "0"))
      .set(43, "0000000000000000000000000000000000000000")
      .set(48, "027000000000000000000000000000")
      .set(49, "484")
      .set(60, "0160000000000000000")
      .set(61, "0190000000000000000000")
      .set(63, "0010") // Tokens ES y E)
      .set(100, "010")
      .set(120, "02900000000000000000000000000000")
      .set(121, "02000000000000000000000")
      .set(125, "012ADINTR000000")
      .set(126, "03800000000000000000000000000000000000000");
    console.log(dataElements);
    let dataElementsTrama = "";
    dataElements.forEach((de) => {
      dataElementsTrama += de;
    });
    return dataElementsTrama;
  }

  public BuildInitKeyMessage(
    request_message: Request_Payment,
    id_request: number
  ) {
    this.builder.setHeader();
    this.builder.setMti();
    this.builder.setBitmap();
    this.builder.setDataElements(
      this.addDataElements_initKeys(request_message, id_request)
    );
    return this.builder.getMessage();
  }

  private addDataElements_initKeys(
    request_payment: Request_Payment,
    id_request: number
  ): string {
    let amount = "".padStart(12, "0");
    let dataElements = new Map();
    dataElements
      .set(1, "000000001000018C")
      .set(3, "000000")
      .set(4, "000000000000")
      .set(
        7,
        String(new Date().getMonth() + 1).padStart(2, "0") +
          String(new Date().getDate()).padStart(2, "0") +
          String(new Date().getHours()).padStart(2, "0") +
          String(new Date().getMinutes()).padStart(2, "0") +
          String(new Date().getSeconds()).padStart(2, "0")
      )
      .set(11, String(id_request).padStart(6, "0"))
      .set(
        12,
        String(new Date().getHours()).padStart(2, "0") +
          String(new Date().getMinutes()).padStart(2, "0") +
          String(new Date().getSeconds()).padStart(2, "0")
      )
      .set(
        13,
        String(new Date().getMonth() + 1).padStart(2, "0") +
          String(new Date().getDate()).padStart(2, "0")
      )
      .set(
        17,
        String(new Date().getMonth() + 1).padStart(2, "0") +
          String(new Date().getDate()).padStart(2, "0")
      )
      .set(18, "5399")
      .set(22, "901") // entry mode viene de RequestPaymentMessag)
      .set(25, "00")
      .set(32, "09000000000")
      .set(37, String(id_request).padStart(12, "0"))
      .set(42, String(request_payment.device.serialnr).padStart(15, "0"))
      .set(43, "0000000000000000000000000000000000000000")
      .set(48, "027000000000000000000000000000")
      .set(49, "484")
      .set(60, "0160000000000000000")
      .set(61, "0190000000000000000000")
      .set(63, this.tokens_initKeys(request_payment))
      .set(100, "010")
      .set(120, "02900000000000000000000000000000")
      .set(121, "02000000000000000000000")
      .set(125, "012ADINTR000000")
      .set(126, "03800000000000000000000000000000000000000");
    console.log(dataElements);
    let dataElementsTrama = "";
    dataElements.forEach((de) => {
      dataElementsTrama += de;
    });
    return dataElementsTrama;
  }

  // /**
  //  * Retorna un valor booleano del contenido del campo 07 del token ES
  //  * Esta funcion esta ajustada a que el token siempre tenga una longitud fija de 00060 como dicta el pdf ESTÁNDAR HOST POS ADQUIRENTE Versión 7.0.8
  //  * @returns {boolean} Si el campo 07 del token ES es 1 se retorna true, en caso contrario false
  //  */
  // public getField07_ES(): number {
  //   let p63 = this.builder.getP63();
  //   return Number(p63[p63.indexOf("! ES") + 69]);
  // }
  // protected get_tokenEX(): Token_EX {
  //   let p63 = this.builder.getP63();
  //   let indexEX = p63.indexOf("! EX") + 2;
  //   let tokenEX: Token_EX = {
  //     key_cifrada: p63.substr(indexEX + 8, 32),
  //     ksn: p63.substr(indexEX + 40, 20),
  //     check_value: p63.substr(indexEX + 60, 6),
  //     status: p63.substr(indexEX + 66, 2),
  //     crc32: p63.substr(indexEX + 68, 8),
  //   };
  //   return tokenEX;
  // }

  /**
   * @function tokens_initKeys
   * @funcdesc Tokens usados: Q1, Q2, C4, ES y EW
   * @funcdesc Armado de estructura para tokens formato: [length][Header Token]:[[token header, token data], [token header, token data], ...]
   * @funcdesc Header Token: "& 0230" (02): Cantidad de tokens en el msj | (30): longitud de data element
   * @funcdesc Token header: "! 133011101361109261209 " (13): Token ID | (30): Token lenght| (11101361109261209): Token Data
   * @returns {string} P-63
   */
  private tokens_initKeys(message: Request_Payment): string {
    let p63 = "";
    let tokenEs: Token_ES = {
      version: message.device.version,
      n_serie: message.device.serialnr,
      bines_caja: "",
      bines_pinpad: "",
      bines_version: "00",
      llave: "1",
    };
    let tokenEw: Token_EW = {
      check_value: message.key.check_value,
      crc32: message.key.crc32,
      rsa: message.key.rsa,
      rsa_name: message.key.name,
    };
    let tokenQ1: Token_Q1 = {
      id_authMode: "0",
      id_validMode: "2",
    };
    let tokenQ2: Token_Q2 = {
      id_authMode: "03",
    };
    let tokenC4: Token_C4 = {
      ind_terminal: "0",
      term_oper_ind: "0",
      loc_terminal: "0",
      ind_tarjeth: "0",
      ind_tarjet: "0",
      ind_cap_tarjet: "0",
      ind_status: "0",
      level_security: "0",
      routing_ind: "0",
      act_terminal: "0",
      ind_cap_datos: "5",
      met_ind_tarjet: "2",
    };
    let headerToken = "& 05",
      tokensData = "",
      q1 = this.tokenQ1(tokenQ1),
      q2 = this.tokenQ2(tokenQ2),
      c4 = this.tokenC4(tokenC4),
      es = this.tokenES(tokenEs),
      ew = this.tokenEW(tokenEw);
    tokensData = tokensData.concat(
      `! Q1${q1.length.toString().padStart(5, "0")} ${q1}`,
      `! Q2${q2.length.toString().padStart(5, "0")} ${q2}`,
      `! C4${c4.length.toString().padStart(5, "0")} ${c4}`,
      `! ES${es.length.toString().padStart(5, "0")} ${es}`,
      `! EW${ew.length.toString().padStart(5, "0")} ${ew}`
    );
    p63 = p63.concat(headerToken, tokensData.length.toString(), tokensData);
    p63 = p63.length.toString().padStart(3, "0") + p63;
    return p63;
  }

  /*
  public getRes0210(): Execute_Payment_Response {
    let res: Execute_Payment_Response = {
      id: Number(this.builder.getP37()), // retrieval reference number
      timestamp: new Date().toDateString(),
      rc: this.builder.getP39() == "00" ? 0 : 1, // response code
      rcdatetime: this.builder.getP13(), // local transaction date
      rcmessage: this.builder.getP39() == "00" ? "APROBADA" : "DESAPROBADA", // cambiar a posibles respestas
      ticket: Number(this.builder.getP11()), // system trace audit number
      authorization: this.builder.getP38(), // Authorization ID Response
      keys_expired: false,
    };
    return res;
  }

  // MANEJADOR PARA PROSA

  public get0200_InitKeys(): string {
    let dataElements: number[] = [];
    Object.keys(this.getBuilder()).forEach((de) => {
      dataElements.push(Number(de.slice(1)));
    });
    let message = "";
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
  public set0200_InitKeys(message: any, id_request: number): void {
    this.builder
      .setP1("000000001000018C")
      .setP3("000000")
      .setP4("0".padStart(12, "0"))
      .setP7(trasmissionDateAndTime())
      .setP11(id_request.toString().padStart(6, "0"))
      .setP12(localTransactionTime())
      .setP13(localTransactionDate())
      .setP17(captureDate())
      .setP18("5399") // @todo Merchart Type otorga PROSA
      .setP22(this.entryMode(""))
      .setP25("00")
      .setP32("1100000000000") // @todo Acquiring Institution ID Code otorga PROSA se recupera de la DB
      .setP37(id_request.toString().padStart(12, "0")) // id_request 12 digitos
      .setP42(message.device.serial.padStart(15, "0"))
      .setP43("0000000000000000000000000000000000000000") // @todo function buscar en DB información de la terminal (direccion) 40 digitos
      .setP48("027000000000000000000000000000") // @todo function buscarn en DB Retailer ID, Group y Region (aclarar con OSCAR)
      .setP49("484")
      .setP60("0160000000000000000") // @todo function procesar en SERVER y buscar en BD Terminal Owner FIID, Logical Network, Time Offset y Pseudo Terminal ID
      .setP61("0190000000000000000000") // @todo informacion de la tarjeta Category, Save Account Indicator, Interchange Response Code
      .setP63(this.tokens_initKeys(message)) // @todo function con TOKEN ES, TOKEN EZ
      .setS100("010") // @todo function recupera de DB codigo fijo otorgado por PROSA
      .setS120("02900000000000000000000000000000") // @todo function buscar en DB datos de la Terminal: Name and Location, Terminal Brach ID
      .setS121("02000000000000000000000") // @todo function buscar en DB datos varios de Terminal (CRT)
      .setS125("012ADINTR000000") // @todo function procesar datos de Tarjteta (Services|Originador|Destination|Draft Capture Flag)
      .setS126("03800000000000000000000000000000000000000"); // @todo Aclarar con Oscar si todos son ceros
  }
  public get0210(): string {
    let dataElements: number[] = [];
    Object.keys(this.getBuilder()).forEach((de) => {
      dataElements.push(Number(de.slice(1)));
    });
    let message: string = "";
    let header = "ISO026000050",
      messageTypeId = "0210",
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
      this.builder.getP32(),
      this.builder.getP35(),
      this.builder.getP37(),
      this.builder.getP38(),
      this.builder.getP39(),
      this.builder.getP41(),
      this.builder.getP48(),
      this.builder.getP49(),
      this.builder.getP60(),
      this.builder.getP61(),
      this.builder.getP63() ? this.builder.getP63() : "",
      this.builder.getS100(),
      this.builder.getS120(),
      this.builder.getS121(),
      this.builder.getS125()
    );
    return message;
  }


  protected token_transaction(
    request: Request_Payment,
    message: Execute_Payment
  ): string {
    let p63 = "";
    let tokenEs: Token_ES = {
      version: request.device.version,
      n_serie: request.device.serialnr,
      bines_caja: message.cardInformation.bin,
      bines_pinpad: "",
      bines_version: "00", // No hay pinpad cargago -> 00, sino [00, FF]
      llave: "0", // para transaccion normal no es necesario inicio de llaves
    };
    let tokenEz: Token_EZ = {
      serial_key: message.device.ksn,
      counter: message.device.realcounter,
      failed_counter: message.device.failcounter,
      track2_flag: "1",
      read_mode: "05",
      track2_length: message.cardInformation.track2_length,
      cvv_flag: message.cardInformation.cvv_present ? "1" : "0",
      cvv_length: message.cardInformation.cvv_length,
      track_flag: "0",
      track2: message.cardInformation.track2,
      last4: message.cardInformation.last4,
      crc32: request.key.crc32,
    };
    let headerToken = "& 02",
      tokensData = "",
      ez = this.tokenEZ(tokenEz),
      es = this.tokenES(tokenEs);
    tokensData = tokensData.concat(
      `! ES${es.length.toString().padStart(5, "0")} ${es}`,
      `! EZ${ez.length.toString().padStart(5, "0")} ${ez}`
    );
    p63 = p63.concat(headerToken, tokensData.length.toString(), tokensData);
    p63 = p63.length.toString().padStart(3, "0") + p63;
    return p63;
  }

  /**
   * "1: Version Softare (20) se envia en el msj de la terminal como "version"
   * "2: Serie del PIN PAD (20) se envia en el msj de la terminal como "n_serie"
   * "3: Configuracion del cifrado (1) valor fijo "5"
   * "4: ID Tabla de bines locales informado por la caja (8) n de comercio guardado en la DB
   * "5: ID Tabla de bines locales cargada en el PIN PAD (8) n de tabla de bines guardad en la DB
   * "6: Version tabla de bines locales cargadas en el PIN PAD (2) n almacenado en la DB, si no se encuentra se coloca "00"
   * "7: Bandera Peticion de Nueva Lllave (1) Indica si el PIN PAD esta pidiendo inicializacion de llaves "1" se requiere llave "0" no se pide llave
   * @param {Token_ES} campos
   * @returns {string} TOKEN ES
   */
  private tokenES(campos: Token_ES): string {
    let esData = "",
      campo01 = campos.version.padStart(20, "0"),
      campo02 = campos.n_serie.padStart(20, "0"),
      campo03 = "5",
      campo04 = campos.bines_caja.padStart(8),
      campo05 = campos.bines_pinpad.padStart(8, "0"),
      campo06 = campos.bines_version,
      campo07 = campos.llave;
    esData = esData.concat(
      campo01,
      campo02,
      campo03,
      campo04,
      campo05,
      campo06,
      campo07
    );
    return esData;
  }
  private tokenEZ(campos: Token_EZ): string {
    let ezData = "",
      campo01 = campos.serial_key,
      campo02 = campos.counter.toString(),
      campo03 = campos.failed_counter.toString(),
      campo04 = campos.track2_flag,
      campo05 = campos.read_mode,
      campo06 = campos.track2_length.toString(),
      campo07 = campos.cvv_flag,
      campo08 = campos.cvv_length.toString(),
      campo09 = campos.track_flag,
      campo10 = campos.track2,
      campo11 = campos.last4,
      campo12 = campos.crc32;
    ezData = ezData.concat(
      campo01,
      campo02,
      campo03,
      campo04,
      campo05,
      campo06,
      campo07,
      campo08,
      campo09,
      campo10,
      campo11,
      campo12
    );
    return ezData;
  }
  /**
   * Token de requerimiento de Generación de Nueva Llave
   * 1: Llave aleatoria cifrada (512) viene en el msj de la terminal como "rsa"
   * 2: Check Value (6) se envia en el msj de la terminal como "check_value"
   * 3: Version llave RSA publica (10) se envia en el msj de la terminal como "rsa_name"
   * 4: Algoritmo de padding (2) metodo de padding, queda "01" como valor fijo
   * 5: CRC32 de llave cifrada (8) se envia en el msj de la terminal como "crc32"
   * @param {Token_EW} campos
   * @returns {string} TOKEN EW
   */
  private tokenEW(campos: Token_EW): string {
    let ewData = "",
      campo01 = campos.rsa,
      campo02 = campos.check_value,
      campo03 = campos.rsa_name,
      campo04 = "01", // en un futuro desde terminal se agregara un campo que sea "padding" que hace referencia a este campo
      campo05 = campos.crc32;
    ewData = ewData.concat(campo01, campo02, campo03, campo04, campo05);
    return ewData;
  }
  private tokenQ1(campos: Token_Q1): string {
    let q1Data = "",
      campo01 = campos.id_authMode,
      campo02 = campos.id_validMode;
    q1Data = q1Data.concat(campo01, campo02);
    return q1Data;
  }
  private tokenQ2(campos: Token_Q2): string {
    let q2Data = "",
      campo01 = campos.id_authMode;
    q2Data = q2Data.concat(campo01);
    return q2Data;
  }
  private tokenC4(campos: Token_C4): string {
    let c4Data = "",
      campo01 = campos.ind_terminal,
      campo02 = campos.term_oper_ind,
      campo03 = campos.loc_terminal,
      campo04 = campos.ind_tarjeth,
      campo05 = campos.ind_tarjet,
      campo06 = campos.ind_cap_tarjet,
      campo07 = campos.ind_status,
      campo08 = campos.level_security,
      campo09 = campos.routing_ind,
      campo10 = campos.act_terminal,
      campo11 = campos.ind_cap_datos,
      campo12 = campos.met_ind_tarjet;
    c4Data = c4Data.concat(
      campo01,
      campo02,
      campo03,
      campo04,
      campo05,
      campo06,
      campo07,
      campo08,
      campo09,
      campo10,
      campo11,
      campo12
    );
    return c4Data;
  }
  /**
   * P-22 Point of Service Entry Mode
   * POR EL MOMENTO SOLO SE ENVIA ESO DESPUES icc  or  stripe  creo srria (OSCAR)
   * magnetic_stripe ---> 901
   * @param {string} entry
   * @returns {string} entry mode
   */
  protected entryMode(entry: string): string {
    switch (entry) {
      case "magnetic_stripe":
        return "901";

      default:
        return "901";
    }
  }
}
