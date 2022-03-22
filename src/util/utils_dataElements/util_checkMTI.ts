/**
 * Determina si la llamada o tipo de mensaje es soportado por el servidor
 * @param {string} mti tipo de mensaje (MTI)
 * @returns {true | false} true si es un mti valido | false si es un mti que no soporta el servidor
 */
export function util_checkMTI(mti: string): boolean {
  let mti_enabled = [
    "0200",
    "0210",
    "0220",
    "0230",
    "0420",
    "0430",
    "0800",
    "0810",
  ];
  return mti_enabled.includes(mti);
}
