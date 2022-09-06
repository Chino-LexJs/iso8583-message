import { bitmap } from "./bitmap";

export function array_to_hexa(dataElements: number[]): bitmap {
  let bitmaps: bitmap = {
    binaryPB: "",
    binarySB: "",
    hexaPB: "",
    hexaSB: "",
  };
  for (let i = 1; i < 65; i++) {
    if (dataElements.includes(i)) {
      bitmaps.binaryPB = bitmaps.binaryPB.concat("1");
    } else {
      bitmaps.binaryPB = bitmaps.binaryPB.concat("0");
    }
  }
  for (let i = 65; i < 129; i++) {
    if (dataElements.includes(i)) {
      bitmaps.binarySB = bitmaps.binarySB.concat("1");
    } else {
      bitmaps.binarySB = bitmaps.binarySB.concat("0");
    }
  }
  for (let i = 0; i < 63; i++) {
    i = i + 3;
    bitmaps.hexaPB = bitmaps.hexaPB.concat(
      hexa(bitmaps.binaryPB.substr(i - 3, 4))
    );
  }
  for (let i = 0; i < 63; i++) {
    i = i + 3;
    bitmaps.hexaSB = bitmaps.hexaSB.concat(
      hexa(bitmaps.binarySB.substr(i - 3, 4))
    );
  }
  return bitmaps;
}

function hexa(str: string): string {
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
  }
}
