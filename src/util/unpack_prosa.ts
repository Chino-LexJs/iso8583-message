/**
 * Unpack Prosa lo que hace es trasladar la informacion llegada por msg en tipo string de los data elements
 * y colocarlo en el los fields de la clase correspondiente
 *
 * @param { string } dataElements contiene toda la informacion del msj en formato IOS-8583 PROSA
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

import { hex_to_bin } from "./hex_to_bin";
export function unpack_prosa(
  dataElements: string,
  fields: { [key: number]: (string | number | boolean)[] }
) {
  const MANDATORIO = 3;
  const INFO = 4;
  const ISOHEADER = dataElements.substr(0, 12);
  const MTI = dataElements.substr(12, 4);
  const PRIMARY_BITMAP = dataElements.substr(16, 16);
  const DATA_ELEMENTS = dataElements.slice(32);
  const PBM_BINARY = hex_to_bin(PRIMARY_BITMAP);
  // let date = new Date(Date.parse(dataElements.DATE_TIME));
  let date = new Date();
  let LocalTransactionTime = "";
  let LocalTransactionDate = "";
  let day =
    date.getDate() < 10
      ? `0${date.getDate().toString()}`
      : date.getDate().toString();
  let month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;

  LocalTransactionDate = LocalTransactionDate.concat(month, day);
  LocalTransactionTime = LocalTransactionTime.concat(
    date.getHours().toString(),
    date.getMinutes().toString(),
    date.getSeconds().toString()
  );

  //   for (let key in fields) {
  //     if (Object.keys(props_to_fields).includes(key)) {
  //       fields[key][MANDATORIO] = true;
  //       fields[key][INFO] = props_to_fields[key];
  //     }
  //   }
}
