/**
 * Unpack lo que hace es trasladar la informacion llegada por msg de los data elements
 * y colocarlo en el los fields de la clase correspondiente
 *
 * @param {number[]} camposDEs contiene los numeros de los data elements usados en el msj
 * @param {string[]} dataElements contiene los data elements enviados desde la TERMINAL
 * @param fields El contenedor de los data elements para msj 0200 ISO8583 PROSA
 */
export function unpack(
  bitmap: string,
  dataElements: string[],
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
  const ACTIVO = "1";

  let camposDEs = []; // Array que contendra todos los numeros de los DEs que vienen en el msj
  for (let i = 0; i < bitmap.length; i++) {
    if (bitmap[i] === ACTIVO) {
      camposDEs.push(i + 1);
    }
  }
  // Se recorre el arreglo de camposDEs que contiene los numeros de los DEs usados [1,3,4,7, ... ,63]
  for (let i = 0; i < camposDEs.length; i++) {
    fields[camposDEs[i]][MANDATORIO] = true; // Se activa el parametro M en fields, esto quiere decir que se va a usar en el msj 0200 PROSA
    fields[camposDEs[i]][INFO] = dataElements[i]; // Se rellena el parametro correspondiente de fields con la info del data element enviado
  }
}
