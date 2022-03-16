/**
 * Unpack lo que hace es trasladar la informacion llegada por msg de los data elements
 * y colocarlo en el los fields de la clase correspondiente
 *
 * @param msg Es el mensaje en formato JSON de los data elements
 * @param fields El contenedor de los data elements
 */
export function unpack(
  msg: { [key: number]: string },
  fields: { [key: number]: (string | number | boolean)[] }
) {
  for (let key in msg) {
    fields[key][3] = true;
    fields[key][4] = msg[key];
  }
}
