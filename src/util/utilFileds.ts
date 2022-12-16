/**
 * @func usedFields Retorna los campos usados en el msj enviado desde Prosa
 * @param {string} message mensaje enviado desde Prosa en formato iso 8583
 * @summary Se debe tener en cuenta cuando empieza el bitmap primario en la trama enviada desde Prosa
 * @returns {number[]} arreglo de numeros que representan los campos iso 8583 de la trama
 */
function usedFields(message: string): number[] {
  let fields: number[] = [];
  let bitmapPrimary = hex2bin(message.substr(16, 16));
  for (let i = 0; i < bitmapPrimary.length; i++) {
    if (bitmapPrimary[i] === "1") {
      fields.push(i + 1);
    }
  }
  // P-1 Secondary Bit Map
  if (bitmapPrimary[0] === "1") {
    let bitmapSecondary = hex2bin(message.substr(32, 16));
    for (let i = 0; i < bitmapSecondary.length; i++) {
      if (bitmapSecondary[i] === "1") {
        fields.push(i + 65);
      }
    }
  }
  return fields;
}
/**
 * @param hex Cadena de caracteres en formato hexadecimal
 * @returns Cadena de caracteres en formato binario de hex
 */
function hex2bin(hex: string): string {
  hex = hex.replace("0x", "").toLowerCase();
  var out = "";
  for (var c of hex) {
    switch (c) {
      case "0":
        out += "0000";
        break;
      case "1":
        out += "0001";
        break;
      case "2":
        out += "0010";
        break;
      case "3":
        out += "0011";
        break;
      case "4":
        out += "0100";
        break;
      case "5":
        out += "0101";
        break;
      case "6":
        out += "0110";
        break;
      case "7":
        out += "0111";
        break;
      case "8":
        out += "1000";
        break;
      case "9":
        out += "1001";
        break;
      case "a":
        out += "1010";
        break;
      case "b":
        out += "1011";
        break;
      case "c":
        out += "1100";
        break;
      case "d":
        out += "1101";
        break;
      case "e":
        out += "1110";
        break;
      case "f":
        out += "1111";
        break;
      default:
        return "";
    }
  }
  return out;
}

interface Data_Element {
  campo: number;
  long: number;
  value: string;
  used: boolean;
}
function getDataElement(
  field: Data_Element,
  init: number,
  message: string
): string {
  let dataElement: string = "";
  let fieldLength_03 = [48, 54, 61, 63, 102, 120, 121, 122, 125, 126];
  let fieldLength_02 = [32, 35, 100];
  if (fieldLength_03.includes(field.campo)) {
    let length: number = Number(message.substr(init, 3));
    dataElement = message.substr(init, length + 3);
  } else if (fieldLength_02.includes(field.campo)) {
    let length: number = Number(message.substr(init, 2));
    length = field.campo == 35 ? length + 16 : length;
    dataElement = message.substr(init, length + 2);
  } else {
    dataElement = message.substr(init, field.long);
  }
  return dataElement;
}

export { usedFields, hex2bin, getDataElement, Data_Element };
