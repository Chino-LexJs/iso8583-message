/**
 * 
 * @param DEs Arreglo que contiene los DEs usados ejemplo [1,3,4,7,11, ... , 121]
 * @returns Objeto JSON que contiene:
 * {
    binaryPB: Bitmap primario en binario (string de longitud de 64 caracteres)
    hexaPB: Bitmap primario en hexadecimal (string de longitud de 16 caracteres)
    binarySB: Bitmap secundario en binario (string de longitud de 64 caracteres)
    hexaSB: Bitmap secundario en hexadecimal (string de longitud de 16 caracteres)
  }
 */
export function util_hexa_bin_Bitmap(DEs: number[]): { [key: string]: string } {
  var json_bitmaps = {
    binaryPB: "",
    hexaPB: "",
    binarySB: "",
    hexaSB: "",
  };

  for (let i = 1; i < 65; i++) {
    if (DEs.includes(i)) {
      json_bitmaps.binaryPB = json_bitmaps.binaryPB.concat("1");
    } else {
      json_bitmaps.binaryPB = json_bitmaps.binaryPB.concat("0");
    }
  }
  for (let i = 65; i < 129; i++) {
    if (DEs.includes(i)) {
      json_bitmaps.binarySB = json_bitmaps.binarySB.concat("1");
    } else {
      json_bitmaps.binarySB = json_bitmaps.binarySB.concat("0");
    }
  }

  for (let i = 0; i < 63; i++) {
    i = i + 3;
    json_bitmaps.hexaPB = json_bitmaps.hexaPB.concat(
      hexa(json_bitmaps.binaryPB.substr(i - 3, 4))
    );
  }
  for (let i = 0; i < 63; i++) {
    i = i + 3;
    json_bitmaps.hexaSB = json_bitmaps.hexaSB.concat(
      hexa(json_bitmaps.binarySB.substr(i - 3, 4))
    );
  }

  function hexa(str: string) {
    switch (str) {
      case "0000":
        return "0";
      case "0001":
        return "1";
      case "0010":
        return "2";
      case "0011":
        return "3";
      case "0100":
        return "4";
      case "0101":
        return "5";
      case "0110":
        return "6";
      case "0111":
        return "7";
      case "1000":
        return "8";
      case "1001":
        return "9";
      case "1010":
        return "A";
      case "1011":
        return "B";
      case "1100":
        return "C";
      case "1101":
        return "D";
      case "1110":
        return "E";
      case "1111":
        return "F";

      default:
        return "";
        break;
    }
  }

  return json_bitmaps;
}

export function numberOfDataElements(DEs: {
  [keys: string]: (string | number | boolean)[];
}): number[] {
  const PRESENTE = 3,
    NUMBER_DE = 1;
  let arrayOfNumbers: number[] = [];
  for (let key in DEs) {
    if (DEs[key][PRESENTE]) {
      arrayOfNumbers.push(Number(DEs[key][NUMBER_DE]));
    }
  }
  return arrayOfNumbers;
}
