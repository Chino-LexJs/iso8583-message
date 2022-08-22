import {
  Request_Payment,
  Request_Payment_Response,
  Terminal_InitKeys,
  Terminal_Request,
  Terminal_Response,
  Token_ES,
  Token_EW,
} from "../messageTypes";
import { Builder } from "./builder";

export class Director {
  private builder: Builder;
  /**
   * El director trabaja con cualquier instancia builder que el cliente le envie por parametro
   * De esta manera, el cliente puede alterar el tipo de mensaje que desea implementar
   */
  constructor(builder: Builder) {
    this.builder = builder;
  }

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }
  public getBuilder(): Builder {
    return this.builder;
  }
  /**
   * The Director can construct several product variations using the same
   * building steps.
   */

  public getRes0210(): Request_Payment_Response {
    /*
    let res1: Terminal_Response = {
      MTI: "0210",
      PROCESSING_CODE: this.builder.getP3(),
      AMOUNT: this.builder.getP4(),
      TRASMISSION_DATE_TIME: this.builder.getP7(),
      SYSTEM_TRACE_AUDIT_NUMBER: this.builder.getP11(),
      LOCAL_TRANSACTION_TIME: this.builder.getP12(),
      RETRIEVAL_REFERENCE_NUMBER: this.builder.getP37(),
      AUTHORIZATION_ID_RESPONSE: this.builder.getP38(),
      RESPONSE_CODE: this.builder.getP39(),
    }; 
    */
    let res: Request_Payment_Response = {
      request_id: this.builder.getP37(), // retrieval reference number
      request_date: this.builder.getP13(), // local transaction date
      request_status: this.builder.getP39() == "00" ? true : false, // response code
      http_code: 0,
      id: this.builder.getP32().slice(2), // Acquiring Intitution ID Code
      trace_id: this.builder.getP11(), // system trace audit number
      authorization: this.builder.getP38(), // Authorization ID Response
      renew_key: false, // inicio de llaves?
      description: this.builder.getP39() == "00" ? "APROBADA" : "DESAPROBADA",
      binInformation: {
        bin: "binInformation_bin",
        bank: "binInformation_bank",
        product: "binInformation_product",
        type: "binInformation_type",
        brand: "binInformation_brand",
      },
    };
    return res;
  }
  public get0200_InitKeys(): string {
    let message = "";
    let header = "ISO026000050",
      bitmap = "B238C4812861801A";
    message = message.concat(
      header,
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
  public set0200_InitKeys(message: Request_Payment, id_request: number): void {
    this.builder
      .setP1("000000001000018C")
      .setP3("000000")
      .setP4("000000000000")
      .setP7(this.trasmissionDateAndTime())
      .setP11(id_request.toString().padStart(6, "0")) // id_request 6 digitos
      .setP12(this.localTransactionTime())
      .setP13(this.localTransactionDate())
      .setP17(this.captureDate())
      .setP18("????") // @todo Merchart Type otorga PROSA
      .setP22("010")
      .setP25("00")
      .setP32("11???????????") // @todo Acquiring Institution ID Code otorga PROSA se recupera de la DB
      .setP37(id_request.toString().padStart(12, "0")) // id_request 12 digitos
      .setP42(message.device.serial.padStart(15, "0"))
      .setP43("????????????????????????????????????????") // @todo function buscar en DB información de la terminal (direccion) 40 digitos
      .setP48("027???????????????????????????") // @todo function buscarn en DB Retailer ID, Group y Region (aclarar con OSCAR)
      .setP49("484")
      .setP60("016????????????????") // @todo function procesar en SERVER y buscar en BD Terminal Owner FIID, Logical Network, Time Offset y Pseudo Terminal ID
      .setP61("01900000000???????????") // @todo informacion de la tarjeta Category, Save Account Indicator, Interchange Response Code
      .setP63(this.tokens_initKeys(message)) // @todo function con Tokens Q1, Q2, C4, ES y EW
      .setS100("???????????") // @todo function recupera de DB codigo fijo otorgado por PROSA
      .setS120("029?????????????????????????????") // @todo function buscar en DB datos de la Terminal: Name and Location, Terminal Brach ID
      .setS121("020????????????????????") // @todo function buscar en DB datos varios de Terminal (CRT)
      .setS125("012????????????") // @todo function procesar datos de Tarjteta (Services|Originador|Destination|Draft Capture Flag)
      .setS126("03800000000000000000000000000000000000000"); // @todo Aclarar con Oscar si todos son ceros
  }
  public get0200(): string {
    let message: string = "";
    let header = "ISO026000050",
      bitmap = "B238C4810861801A";
    message = message.concat(
      header,
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
  public set0200(message: Request_Payment, id_request: number): void {
    this.builder
      .setP1("000000001000018C")
      .setP3("000000")
      .setP4(message.amount.toString().replace(/./g, "").padStart(12, "0"))
      .setP7(this.trasmissionDateAndTime())
      .setP11(id_request.toString().padStart(6, "0"))
      .setP12(this.localTransactionTime())
      .setP13(this.localTransactionDate())
      .setP17(this.captureDate())
      .setP18("????") // @todo Merchart Type otorga PROSA
      .setP22(this.entryMode(message.entry_mode))
      .setP25("00")
      .setP32("11???????????") // @todo Acquiring Institution ID Code otorga PROSA se recupera de la DB
      .setP37(id_request.toString().padStart(12, "0")) // id_request 12 digitos
      .setP42(message.device.serial.padStart(15, "0"))
      .setP43("????????????????????????????????????????") // @todo function buscar en DB información de la terminal (direccion) 40 digitos
      .setP48("027???????????????????????????") // @todo function buscarn en DB Retailer ID, Group y Region (aclarar con OSCAR)
      .setP49("484")
      .setP60("016????????????????") // @todo function procesar en SERVER y buscar en BD Terminal Owner FIID, Logical Network, Time Offset y Pseudo Terminal ID
      .setP61("01900000000???????????") // @todo informacion de la tarjeta Category, Save Account Indicator, Interchange Response Code
      .setP63(this.tokens_initKeys(message)) // @todo function con TOKEN ES, TOKEN EZ
      .setS100("???????????") // @todo function recupera de DB codigo fijo otorgado por PROSA
      .setS120("029?????????????????????????????") // @todo function buscar en DB datos de la Terminal: Name and Location, Terminal Brach ID
      .setS121("020????????????????????") // @todo function buscar en DB datos varios de Terminal (CRT)
      .setS125("012????????????") // @todo function procesar datos de Tarjteta (Services|Originador|Destination|Draft Capture Flag)
      .setS126("03800000000000000000000000000000000000000"); // @todo Aclarar con Oscar si todos son ceros
  }

  /**
   * @function trasmissionDateAndTime
   * @funcdesc Data element P-7 fecha y hora del servidor en formato: MMDDhhmmss
   * @returns {string} P-7
   */
  private trasmissionDateAndTime(): string {
    let p7 = "";
    let date = new Date();
    let arrayDate: string[] = [];
    arrayDate.push((date.getMonth() + 1).toString());
    arrayDate.push(date.getDate().toString());
    arrayDate.push(date.getHours().toString());
    arrayDate.push(date.getMinutes().toString());
    arrayDate.push(date.getSeconds().toString());
    for (let i = 0; i < arrayDate.length; i++) {
      p7 = p7.concat(arrayDate[i].padStart(2, "0"));
    }
    return p7;
  }
  /**
   * @function localTransactionTime
   * @funcdesc Data element P-12 hora de la terminal en formato: HHMMSS
   * @returns {string} P-12
   */
  private localTransactionTime(): string {
    let p12 = "";
    let terminalDateTime = new Date();
    p12 = p12.concat(
      terminalDateTime.getHours().toString().padStart(2, "0"),
      terminalDateTime.getMinutes().toString().padStart(2, "0"),
      terminalDateTime.getSeconds().toString().padStart(2, "0")
    );
    return p12;
  }
  /**
   * @function localTransactionDate
   * @funcdesc Data element P-13 fecha de la terminal en formato: MMDD
   * @param {string} terminalDate
   * @returns {string} P-13
   */
  private localTransactionDate(): string {
    let p13 = "";
    let terminalDateTime = new Date();
    p13 = p13.concat(
      (terminalDateTime.getMonth() + 1).toString().padStart(2, "0"),
      terminalDateTime.getDate().toString().padStart(2, "0")
    );
    return p13;
  }
  /**
   * @function captureDate
   * @funcdesc Data element P-17 decha de la terminal en formato: MMDD
   * @returns {string} P-17
   */
  private captureDate(): string {
    let p17 = "";
    let date = new Date();
    p17 = p17.concat(
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getDate().toString().padStart(2, "0")
    );
    return p17;
  }
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
      n_serie: message.device.serial,
      bines_caja: "",
      bines_pinpad: "",
      bines_version: "",
      llave: "1",
    };
    let headerToken = "& 05",
      tokensData = "",
      q1 = "FUNCION_DETERMINADA_PARA_CADA_TOKEN_01",
      q2 = "FUNCION_DETERMINADA_PARA_CADA_TOKEN__02",
      c4 = "FUNCION_DETERMINADA_PARA_CADA_TOKEN___03",
      es = "FUNCION_DETERMINADA_PARA_CADA_TOKEN____04",
      ew = "FUNCION_DETERMINADA_PARA_CADA_TOKEN_____05";
    tokensData = tokensData.concat(
      `! Q1${q1.length.toString().padStart(5, "0")} ${q1}`,
      `! Q2${q2.length.toString().padStart(5, "0")} ${q2}`,
      `! C4${c4.length.toString().padStart(5, "0")} ${c4}`,
      `! ES${es.length.toString().padStart(5, "0")} ${es}`,
      `! EW${ew.length.toString().padStart(5, "0")} ${ew}`
    );
    p63 = p63.concat(headerToken, tokensData.length.toString(), tokensData);
    p63 = p63.length.toString().padStart(5, "0") + p63;
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
      campo01 = campos.version,
      campo02 = campos.n_serie,
      campo03 = "5",
      campo04 = campos.bines_caja,
      campo05 = campos.bines_pinpad,
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
  private tokenEW(campos: Token_EW) {
    let ewData = "",
      campo01 = campos.rsa,
      campo02 = campos.check_value,
      campo03 = campos.rsa_name,
      campo04 = "01",
      campo05 = campos.crc32;
    ewData = ewData.concat(campo01, campo02, campo03, campo04, campo05);
    return ewData;
  }

  /**
   * P-22 Point of Service Entry Mode
   * magnetic_stripe ---> 901
   * @param {string} entry
   * @returns {string} entry mode
   */
  private entryMode(entry: string): string {
    switch (entry) {
      case "magnetic_stripe":
        return "901";

      default:
        return "901";
    }
  }
}
