/**
 *
 * @param {string} header cadena con 12 caracteres de longitud, con ISO literal en los 3 primeros caracteres
 * Ejemplo de header: ISO002600005
 * @returns {true | false} true si cumple con el standar header ISO-8583
 */
export function util_header(header: string): boolean {
  let checkISO = header.slice(0, 3) === "ISO";
  let checkLength = header.length === 12;
  return checkISO && checkLength ? true : false;
}
