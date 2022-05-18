import { hex_to_bin } from "./hex_to_bin";
/**
 * Unpack Prosa lo que hace es trasladar la informacion llegada por msg en tipo string de los data elements
 * y colocarlo en el los fields de la clase correspondiente
 *
 * @param { string } messageProsa contiene toda la informacion del msj en formato IOS-8583 PROSA
 * @param {{[keys:string]: (string | number | boolean)[]}} fields contiene los data elements 
 * @param fields El contenedor de los data elements para msj 0200 ISO8583 PROSA

   * FORMATO DE ARCHIVO FIELDS:
   * [
   * 0: tipo (string),
   * 1: cantidad según tipo (number),
   * 2: nombre data element (string),
   * 3: M (Boolean),
   * 4: info de data element (string)
   * ]

 */

export function unpack_prosa(
  messageProsa: string,
  fields: { [key: number]: (string | number | boolean)[] }
): { [key: number]: string } {
  let fieldsTerminal: { [key: string]: string } = {};
  const MANDATORIO = 3,
    INFO = 4,
    ISOHEADER = messageProsa.substr(0, 12),
    MTI = messageProsa.substr(12, 4),
    PRIMARY_BITMAP = messageProsa.substr(16, 16),
    DATA_ELEMENTS = messageProsa.slice(32),
    PBM_BINARY = hex_to_bin(PRIMARY_BITMAP),
    SUB_CAMPOS_DATA_ELEMENTS: number[] = dataElementsUsed(PBM_BINARY),
    NUMBER = 0,
    VALOR = 4,
    LONG = 2;
  for (let key in fields) {
    let inicio = 0;
    if (SUB_CAMPOS_DATA_ELEMENTS.includes(Number(fields[key][NUMBER]))) {
      let longitud = fields[key][LONG];
      fields[key][VALOR] = DATA_ELEMENTS.substr(inicio, Number(longitud));
      inicio += Number(longitud);
    }
  }
  for (const key in fields) {
    if (fields[key][3]) {
      fieldsTerminal[key] = fields[key][4].toString();
    }
  }
  return fieldsTerminal;
}

/**
 *
 * @param bitmapBinary String que contiene el bitmap primario del mensaje en binario
 * @returns un arreglo con los sub campo de los data elements usados ej: [1, 3, 4, 7, 11, 12, ... , 63]
 */
function dataElementsUsed(bitmapBinary: string): number[] {
  let arrayOfDataElements: number[] = [];
  bitmapBinary.split("").forEach((datalement, index) => {
    if (datalement === "1") {
      arrayOfDataElements.push(++index);
    }
  });
  return arrayOfDataElements;
}
