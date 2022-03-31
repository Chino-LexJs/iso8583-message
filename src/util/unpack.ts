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
  let date = new Date(Date.parse(dataElements.DATE_TIME));
  let LocalTransactionTime = "";
  let LocalTransactionDate = "";
  let Amount = "";
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

  let props_to_fields: { [keys: string]: string } = {
    TransactionAmount: dataElements.AMOUNT.split(".").join(""), // falta agregarle ceros restantes para completar N(12)
    LocalTransactionTime: LocalTransactionTime,
    LocalTransactionDate: LocalTransactionDate,
    PointServiceEntryMode: dataElements.ENTRY_MODE,
    PointServiceConditionCode: dataElements.CONDITION_CODE,
    CardAcceptorTerminalID: dataElements.TERMINAL_ID,
  };
  for (let key in fields) {
    if (Object.keys(props_to_fields).includes(key)) {
      fields[key][MANDATORIO] = true;
      fields[key][INFO] = props_to_fields[key];
    }
  }
}
