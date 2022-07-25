import { Terminal_InitKeys, Token_ES } from "../messageTypes";

class Director {
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
  /**
   * The Director can construct several product variations using the same
   * building steps.
   */
  public get0200_InitKeys(): string {
    let message = "";
    let header = "ISO026000050",
      bitmap = "B238C4810861801A";
    this.builder.setP3("000000").setP4("000000000000").setP22("010");
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
  /**
   * mensaje de terminal para inicio de llaves
   * {
   *    "DATE_TIME": "2022-03-29 12:24:22",
   *    "check_value": "CAA9B0", 
   *    "crc32": "BF8425A0", 
   *    "device": 
   *    {
   *        "serial": "PB04204560977", 
   *        "version": "100"
   *    },
   *    "isoType": "ISO",
   *    "rsa":"8481B7D10576D49CEAACACF284B13256D8313A104F9C68434E3A931759F659917BD7434198F5A358DCEFOF615FD6D84332710C30ABCD050C5D96752658ABOZAFAAF053B3F0B9997DD02D12472B06EC9F0A8F5E740486E875F467572E39COFC386EDBD882D624273B1AA44945942BAC597CC333CACB6C334743E5495E708A9B10D1A3461ED58F5A48000A1862DAB658B8B4A6FOBB45617E5AAA0538A12F776A9CC752BC8070802ECB5388A3C14D811D318378E13639DB7E96BD3824C127BC5B224A137470DCF7547961EA344B5138898302F04327B3846AA586E036AF8F17FEFF061A431223B15A8E185B85343D1A2387B27 4E51BD64833D15C7E0F8C6BEE861",
   *    "rsa_name": "A000BZPY72",
    }       
   */
  public set0200_InitKeys(
    message: Terminal_InitKeys,
    id_request: number
  ): void {
    this.builder
      .setP1("000000001000018C")
      .setP3("000000")
      .setP4("000000000000")
      .setP7(this.trasmissionDateAndTime())
      .setP11(id_request.toString().padStart(6, "0")) // id_request 6 digitos
      .setP12(this.localTransactionTime(message.DATE_TIME))
      .setP13(this.localTransactionDate(message.DATE_TIME))
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
      .setP63("") // @todo function con Tokens Q1, Q2, C4, ES y EW
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
  private localTransactionTime(terminalDate: string): string {
    let p12 = "";
    let terminalDateTime = new Date(terminalDate);
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
  private localTransactionDate(terminalDate: string): string {
    let p13 = "";
    let terminalDateTime = new Date(terminalDate);
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
   * @function tokens
   * @funcdesc Tokens usados: Q1, Q2, C4, ES y EW
   * @funcdesc Armado de estructura para tokens formato: [length][Header Token]:[[token header, token data], [token header, token data], ...]
   * @funcdesc Header Token: "& 0230" (02): Cantidad de tokens en el msj | (30): longitud de data element
   * @funcdesc Token header: "! 133011101361109261209 " (13): Token ID | (30): Token lenght| (11101361109261209): Token Data
   * @returns {string} P-63
   */
  private tokens(): string {
    let p63 = "";
    let headerToken = "& 05",
      tokensData = "",
      q1 = "FUNCION_DETERMINADA_PARA_CADA_TOKEN_01",
      q2 = "FUNCION_DETERMINADA_PARA_CADA_TOKEN__02",
      c4 = "FUNCION_DETERMINADA_PARA_CADA_TOKEN___03",
      es = "FUNCION_DETERMINADA_PARA_CADA_TOKEN____04",
      ew = "FUNCION_DETERMINADA_PARA_CADA_TOKEN_____05";
    tokensData = tokensData.concat(
      `! Q1${q1.length.toString().padStart(5, "0")}${q1}`,
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
   * "1: VersionSoftare", // (20) version de la aplicacion pin pad
   * "2: Serie del PIN PAD", // (20) Marca y numero de serie del dispositivo
   * "3: Configuracion del cifrado", // (1) "5" Activo para cifrado de datos sensitivos con DUKPT "0" No cifrar
   * "4: ID Tabla de bines locales informado por la caja", // (8) Identificado alfanumerico asignado al comercio
   * "5: ID Tabla de bines locales cargada en el PIN PAD", // (8) Identificado alfanumerico de la tabla de bines locales cargadas en el PIN PAD, eran puros ceros si el PID PAN nunca ah cargado una tabla de bines
   * "6: Version tabla de bines locales cargadas en el PIN PAD", // (2) Valor numerico para identificar la version de tabla de bines cargadas ene el PIN PAD, si no tiene cargadas se coloca "00"
   * "7: Bandera Peticion de Nueva Lllave" // (1) Indica si el PIN PAD esta pidiendo inicializacion de llaves "1" se requiere llave "0" no se pide llave
   * @param {*} param0
   * @returns {string} TOKEN ES
   */
  private tokenES(campos: Token_ES) {
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
}
