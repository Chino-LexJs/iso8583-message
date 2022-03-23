/**
 * Determina si la cantidad de data elements enviados en el msj de la TERMINAL corrsponde a la cantidad del bitmap
 * Determina que cada data element enviado desde la TERMINAL tenga la cantidad de caracteres suficientes
 * @param arrayCampos 
 * @param DEs 
 * @param fields 
 * @returns 
 */
export function util_checkBitmap(
  arrayCampos: number[],
  DEs: string[],
  fields: { [keys: number]: (string | number | boolean)[] }
): boolean {
  for (let i = 0; i < arrayCampos.length; i++) {
    if (DEs[i].length != fields[arrayCampos[i]][1]) {
      if (arrayCampos[i] != 35 && arrayCampos[i] != 63) {
        return false;
      }
    }
  }
  return true;
}
