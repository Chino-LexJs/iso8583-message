/**
 * Formato de campos
 * nombre del campo : [ subcampo, inicio, longitud, final, valor ]
 */
const campos: {
  [keys: string]: (string | number)[];
} = {
  eyeCatcher: ["H1", 1, 1, 1, "!"], // Valor Fijo
  userFld1: ["H2", 2, 1, 2, " "], // Valor Fijo
  identificadorDelToken: ["H3", 3, 2, 4, "ES"], // Valor Fijo
  longitudDeDatos: ["H4", 5, 5, 9, "00060"], // Valor Fijo
  userFld2: ["H5", 10, 1, 10, " "], // Valor Fijo
  versionSoftware: ["1", 11, 20, 30, "info"],
  serieDelPinPad: ["2", 31, 20, 50, "info"],
  configuracionDeCofrado: ["3", 51, 1, 51, "5"], // Valor Fijo
  idTablaDeBinesCaja: ["4", 52, 8, 59, "info"],
  idTablaDeBinesPinPad: ["5", 60, 8, 67, "info"],
  versionTablaDeBines: ["6", 68, 2, 69, "00"], // Valor Fijo
  banderaPeticionNuevaLlave: ["7", 70, 1, 70, "info"],
};

/**
 * Funcion para armar token ES (Terminal Status) devuelve un JSON
 * Deben enviar mediante parametros los siguientes datos:
 * Version del PAD (versionSoftware) TERMINAL
 * Serial Number del PAD (serieDelPinPad) TERMINAL
 * ID tabla de BINES de la caja (idTablaDeBinesCaja) DATA BASE
 * ID tabla de BINES cargadas en el PIN PAD (idTablaDeBinesPinPad) DATA BASE
 * Bandera de peticion de inicio de nueva llaves (banderaPeticionNuevaLlave) TERMINAL
 */
export function util_tokenES(
  versionSoftware: string,
  serieDelPinPad: string,
  idTablaDeBinesCaja: string,
  idTablaDeBinesPinPad: string,
  banderaPeticionNuevaLlave: string
): string {
  const VALOR = 4;
  campos.versionSoftware[VALOR] = versionSoftware;
  campos.serieDelPinPad[VALOR] = serieDelPinPad;
  campos.idTablaDeBinesCaja[VALOR] = idTablaDeBinesCaja;
  campos.idTablaDeBinesPinPad[VALOR] = idTablaDeBinesPinPad;
  campos.banderaPeticionNuevaLlave[VALOR] = banderaPeticionNuevaLlave;

  let msg = "";
  const keys = Object.keys(campos);
  for (let i = 0; i < keys.length; i++) {
    msg = msg.concat(campos[keys[i]][VALOR].toString());
  }
  return msg;
}
