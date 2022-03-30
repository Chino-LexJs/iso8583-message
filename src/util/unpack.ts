/**
 * Unpack lo que hace es trasladar la informacion llegada por msg de los data elements
 * y colocarlo en el los fields de la clase correspondiente
 *
 * @param {{[keys: string]: string}} dataElements contiene los numeros de los data elements usados en el msj
 * @param {{[keys:string]: (string | number | boolean)[]}} fields contiene los data elements enviados desde la TERMINAL
 * @param fields El contenedor de los data elements para msj 0200 ISO8583 PROSA
 */
export function unpack(
  dataElements: { [keys: string]: string },
  fields: { [key: number]: (string | number | boolean)[] }
) {
  const MANDATORIO = 3;
  const INFO = 4;
  /**
   * FORMATO DE ARCHIVO FIELDS:
   * [
   * 0: tipo (string),
   * 1: cantidad según tipo (number),
   * 2: nombre data element (string),
   * 3: M (Boolean),
   * 4: info de data element (string)
   * ]
   */
  for (let key in fields) {
    if (Object.keys(dataElements).includes(key)) {
      fields[key][MANDATORIO] = true;
      fields[key][INFO] = dataElements[key];
    }
  }
}
