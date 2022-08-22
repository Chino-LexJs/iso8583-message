import { Builder } from "./builder/builder";
import { iso8583 } from "./builder/iso8583";
import { Data_Element } from "./messageTypes";

export class MessageProsa {
  private message: string;
  private builder: Builder;
  constructor(message: string) {
    this.message = message;
    this.builder = this.unpack(message);
  }
  public getMessage(): string {
    return this.message;
  }
  public getBuilder(): Builder {
    return this.builder;
  }
  private unpack(message: string): Builder {
    let unpack: Builder = new iso8583();
    let dataElementsFields: number[] = this.usedFields(message);
    let init = 0; // indice donde empiezan los data elements en el message
    let allFields: string = message.slice(32);
    console.log(allFields);
    dataElementsFields.forEach((fiedlNumber) => {
      let field = this.dataElements.find((item) => item.campo == fiedlNumber);
      if (field != undefined) {
        let dataElement: string = this.getDataElement(field, init, allFields);
        this.setBuilder(fiedlNumber, dataElement, unpack);
        init = init + dataElement.length;
      }
    });
    return unpack;
  }
  private getDataElement(
    field: Data_Element,
    init: number,
    message: string
  ): string {
    let dataElement: string = "";
    let fieldLength_03 = [48, 54, 61, 63, 100, 102, 120, 121, 122, 125, 126];
    let fieldLength_02 = [32, 35];
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
  private setBuilder(
    fiedlNumber: number,
    dataElement: string,
    builder: Builder
  ) {
    if (
      fiedlNumber == 1 ||
      fiedlNumber == 3 ||
      fiedlNumber == 4 ||
      fiedlNumber == 7 ||
      fiedlNumber == 11 ||
      fiedlNumber == 12 ||
      fiedlNumber == 13 ||
      fiedlNumber == 17 ||
      fiedlNumber == 18 ||
      fiedlNumber == 22 ||
      fiedlNumber == 25 ||
      fiedlNumber == 32 ||
      fiedlNumber == 35 ||
      fiedlNumber == 37 ||
      fiedlNumber == 38 ||
      fiedlNumber == 39 ||
      fiedlNumber == 42 ||
      fiedlNumber == 43 ||
      fiedlNumber == 44 ||
      fiedlNumber == 45 ||
      fiedlNumber == 48 ||
      fiedlNumber == 49 ||
      fiedlNumber == 54 ||
      fiedlNumber == 60 ||
      fiedlNumber == 61 ||
      fiedlNumber == 62 ||
      fiedlNumber == 63
    ) {
      builder[`setP${fiedlNumber}`](dataElement);
    }
    if (
      fiedlNumber == 70 ||
      fiedlNumber == 90 ||
      fiedlNumber == 100 ||
      fiedlNumber == 102 ||
      fiedlNumber == 120 ||
      fiedlNumber == 121 ||
      fiedlNumber == 122 ||
      fiedlNumber == 123 ||
      fiedlNumber == 125 ||
      fiedlNumber == 126
    ) {
      builder[`setS${fiedlNumber}`](dataElement);
    }
  }

  /**
   * @func usedFields Retorna los campos usados en el msj enviado desde Prosa
   * @param {string} message mensaje enviado desde Prosa en formato iso 8583
   * @summary Se debe tener en cuenta cuando empieza el bitmap primario en la trama enviada desde Prosa
   * @returns {number[]} arreglo de numeros que representan los campos iso 8583 de la trama
   */
  private usedFields(message: string): number[] {
    let fields: number[] = [];
    let bitmapPrimary = this.hex2bin(message.substr(16, 16));
    for (let i = 0; i < bitmapPrimary.length; i++) {
      if (bitmapPrimary[i] === "1") {
        fields.push(i + 1);
      }
    }
    // P-1 Secondary Bit Map
    if (bitmapPrimary[0] === "1") {
      let bitmapSecondary = this.hex2bin(message.substr(32, 16));
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
  private hex2bin(hex: string): string {
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
  private dataElements: Data_Element[] = [
    {
      campo: 1,
      long: 16,
      used: false,
      value: "",
    },
    {
      campo: 3,
      long: 6,
      used: false,
      value: "",
    },
    {
      campo: 4,
      long: 12,
      used: false,
      value: "",
    },
    {
      campo: 7,
      long: 10,
      used: false,
      value: "",
    },
    {
      campo: 11,
      long: 6,
      used: false,
      value: "",
    },
    {
      campo: 12,
      long: 6,
      used: false,
      value: "",
    },
    {
      campo: 13,
      long: 4,
      used: false,
      value: "",
    },
    {
      campo: 17,
      long: 4,
      used: false,
      value: "",
    },
    {
      campo: 18,
      long: 4,
      used: false,
      value: "",
    },
    {
      campo: 22,
      long: 3,
      used: false,
      value: "",
    },
    {
      campo: 25,
      long: 2,
      used: false,
      value: "",
    },
    {
      campo: 32,
      long: 11,
      used: false,
      value: "",
    },
    {
      campo: 35,
      long: 37,
      used: false,
      value: "",
    },
    {
      campo: 37,
      long: 12,
      used: false,
      value: "",
    },
    {
      campo: 38,
      long: 6,
      used: false,
      value: "",
    },
    {
      campo: 39,
      long: 2,
      used: false,
      value: "",
    },
    {
      campo: 41,
      long: 16,
      used: false,
      value: "",
    },
    {
      campo: 42,
      long: 15,
      used: false,
      value: "",
    },
    {
      campo: 44,
      long: 4,
      used: false,
      value: "",
    },
    {
      campo: 48,
      long: 30,
      used: false,
      value: "",
    },
    {
      campo: 49,
      long: 3,
      used: false,
      value: "",
    },
    {
      campo: 54,
      long: 15,
      used: false,
      value: "",
    },
    {
      campo: 60,
      long: 19,
      used: false,
      value: "",
    },
    {
      campo: 61,
      long: 22,
      used: false,
      value: "",
    },
    {
      campo: 62,
      long: 13,
      used: false,
      value: "",
    },
    {
      campo: 63,
      long: 600,
      used: false,
      value: "",
    },
    {
      campo: 90,
      long: 42,
      used: false,
      value: "",
    },
    {
      campo: 95,
      long: 42,
      used: false,
      value: "",
    },
    {
      campo: 100,
      long: 11,
      used: false,
      value: "",
    },
    {
      campo: 102,
      long: 28,
      used: false,
      value: "",
    },
    {
      campo: 120,
      long: 32,
      used: false,
      value: "",
    },
    {
      campo: 121,
      long: 23,
      used: false,
      value: "",
    },
    {
      campo: 122,
      long: 14,
      used: false,
      value: "",
    },
    {
      campo: 125,
      long: 15,
      used: false,
      value: "",
    },
    {
      campo: 126,
      long: 41,
      used: false,
      value: "",
    },
  ];
}
