import { unpack } from "./builder/unpack";
import { iso8583 } from "./builder/iso8583";
import { Token_EX } from "./tokensTypes";
import { Data_Element, getDataElement, usedFields } from "../util/utilFileds";

export class MessageProsa {
  private message: string;
  private unpack: unpack;

  constructor(message: string) {
    this.message = message;
    this.unpack = this.unpack_message(message);
  }
  public getMessage(): string {
    return this.message;
  }
  public getUnpack(): unpack {
    return this.unpack;
  }
  private unpack_message(message: string): unpack {
    let unpack: unpack = new iso8583();
    let dataElementsFields: number[] = usedFields(message);
    let init = 0; // indice donde empiezan los data elements en el message
    let allFields: string = message.slice(32); // desde el indice 32 de la trama hasta el final estan los data elements
    dataElementsFields.forEach((fiedlNumber) => {
      let field = this.dataElements.find((item) => item.campo == fiedlNumber);
      if (field != undefined) {
        let dataElement: string = getDataElement(field, init, allFields);
        this.setUnpack(fiedlNumber, dataElement, unpack);
        init = init + dataElement.length;
      }
    });
    return unpack;
  }
  private setUnpack(fiedlNumber: number, dataElement: string, unpack: unpack) {
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
      fiedlNumber == 41 ||
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
      unpack[`setP${fiedlNumber}`](dataElement);
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
      unpack[`setS${fiedlNumber}`](dataElement);
    }
  }
  public get_tokenEX(): Token_EX {
    let p63 = this.unpack.getP63();
    let indexEX = p63.indexOf("! EX") + 2;
    let tokenEX: Token_EX = {
      key_cifrada: p63.substr(indexEX + 8, 32),
      ksn: p63.substr(indexEX + 40, 20),
      check_value: p63.substr(indexEX + 60, 6),
      status: p63.substr(indexEX + 66, 2),
      crc32: p63.substr(indexEX + 68, 8),
    };
    return tokenEX;
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
      campo: 43,
      long: 40,
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
