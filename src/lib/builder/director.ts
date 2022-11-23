import { IBuilder, Message } from "./builder";
import { Execute_Payment, Request_Payment } from "../messageTypes";
import {
  Token_EX,
  Token_ES,
  Token_EW,
  Token_Q1,
  Token_Q2,
  Token_C4,
  Token_EZ,
} from "../tokensTypes";
import * as crypto from "crypto";
import { readFileSync } from "fs";
import { join } from "path";
var CRC32 = require("crc-32"); // uncomment this line if in node

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
    execute_message: Execute_Payment,
    request_message: Request_Payment
  ): Message {
    this.builder.setHeader();
    this.builder.setMti();
    this.builder.setBitmap();
    this.builder.setDataElements(
      this.addDataElements(execute_message.id, request_message, execute_message)
    );
    return this.builder.getMessage();
  }

  private addDataElements(
    id_request: number,
    request_message: Request_Payment,
    execute_message: Execute_Payment
  ) {
    let amount = request_message.amount.toString().replace(".", "");
    console.log("Request_message.amount: ", request_message.amount);
    console.log("Amount: ", amount);
    let dataElements = new Map();
    dataElements
      .set(1, "000000001000018C")
      .set(3, "000000")
      .set(4, amount.padStart(12, "0"))
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
      .set(63, this.token_transaction(request_message, execute_message)) // Tokens ES y E)
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
    console.log("DATA ELEMENTS PARA INICIO DE LLAVES:");
    console.log(dataElements);
    let dataElementsTrama = "";
    dataElements.forEach((de) => {
      dataElementsTrama += de;
    });
    return dataElementsTrama;
  }

  public BuildEchoMessage(id_echo_test: number, timestamp: string): Message {
    this.builder.setHeader();
    this.builder.setMti();
    this.builder.setBitmap();
    this.builder.setDataElements(
      this.setDataElements_echoTest(id_echo_test, timestamp)
    );
    return this.builder.getMessage();
  }
  private setDataElements_echoTest(id_echo_test: number, timestamp: string) {
    let dataElements = new Map();
    dataElements
      .set(1, "0400000000000000")
      .set(7, timestamp)
      .set(11, String(id_echo_test).padStart(6, "0"))
      .set(70, "301");
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
    let keyA: any = this.getKeyA();
    let rsa: string = this.getRSA(keyA);
    let check_value = this.getCheckValue(keyA);
    let tokenEw: Token_EW = {
      check_value: check_value,
      crc32: this.getCRC32(rsa),
      rsa: rsa,
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
    console.log(tokenEw);
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

  private getKeyA(): any {
    // Se genera llave aleatoria llave A
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }
    function toHex(number: number) {
      switch (number) {
        case 10:
          return "A";
        case 11:
          return "B";
        case 12:
          return "C";
        case 13:
          return "D";
        case 14:
          return "E";
        case 15:
          return "F";
        default:
          return number.toString();
      }
    }
    // Generar 128 bits random
    let keyA: any = "";
    for (let i = 0; i < 32; i++) {
      keyA += toHex(getRandomInt(1, 16));
    }
    keyA = Buffer.from(keyA, "hex");
    return keyA;
  }

  private getRSA(keyA: any): string {
    // Se encripta llave A con llave publica

    var encryptStringWithRsaPublicKey = function (
      toEncrypt: any,
      relativeOrAbsolutePathToPublicKey: any
    ): string {
      // var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
      // var publicKey: any = fs.readFileSync(absolutePath, "utf8");
      const publicKey = readFileSync(
        join(__dirname, relativeOrAbsolutePathToPublicKey),
        "utf-8"
      );
      console.log(publicKey);
      var buffer: Buffer = Buffer.from(toEncrypt);
      var encrypted = crypto.publicEncrypt(publicKey, buffer);
      return encrypted.toString("base64");
    };
    let encryptedKey = encryptStringWithRsaPublicKey(keyA, "./publickey.pem");
    console.log(encryptedKey);
    return encryptedKey;
  }

  private getCheckValue(keyA: any) {
    function encryptedFunction(zeros: any, keyA: string) {
      const cipher = crypto.createCipheriv("aes-128-ecb", keyA, null);
      return Buffer.concat([cipher.update(zeros), cipher.final()]).toString(
        "base64"
      );
    }
    const zeros = Buffer.alloc(8);
    const encrypted = encryptedFunction(zeros, keyA);
    const encryptedHex = Buffer.from(encrypted).toString("hex");
    return encryptedHex.substring(0, 6);
  }

  private getCRC32(encryptedKey: any): string {
    let crc01 = CRC32.str(encryptedKey);
    let buff = Buffer.from(Math.abs(crc01).toString(), "hex");
    return buff.toString("hex");
  }

  private token_transaction(
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
      campo04 = campos.bines_caja.padStart(8, "0"),
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
    console.log("Campos de TOKEN EZ:");
    console.log("campo 01: ", campo01);
    console.log("campo 02: ", campo02);
    console.log("campo 03: ", campo03);
    console.log("campo 04: ", campo04);
    console.log("campo 05: ", campo05);
    console.log("campo 06: ", campo06);
    console.log("campo 07: ", campo07);
    console.log("campo 08: ", campo08);
    console.log("campo 09: ", campo09);
    console.log("campo 10: ", campo10);
    console.log("campo 11: ", campo11);
    console.log("campo 12: ", campo12);

    return ezData;
  }
  /**
   * Token de requerimiento de Generación de Nueva Llave
   * 1: Llave aleatoria cifrada (512) lo genera el server
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
      campo03 = "A000BZPY72", // Se hardcodea preguntar a OSCAR
      campo04 = "01", // en un futuro desde terminal se agregara un campo que sea "padding" que hace referencia a este campo
      campo05 = campos.crc32;
    ewData = ewData.concat(campo01, campo02, campo03, campo04, campo05);
    console.log("Campos de TOKEN EW:");
    console.log("campo 01: ", campo01);
    console.log("campo 02: ", campo02);
    console.log("campo 03: ", campo03);
    console.log("campo 04: ", campo04);
    console.log("campo 05: ", campo05);
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
