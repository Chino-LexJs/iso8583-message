import {
  util_hexa_bin_Bitmap,
  numberOfDataElements,
} from "../util/utils_dataElements/util_hexa_bin_Bitmap";
import { ISO8583 } from "./8583";

export class MTI0200 extends ISO8583 {
  then(arg0: (msj0200: any) => void) {
    throw new Error("Method not implemented.");
  }
  constructor(dataElements: { [keys: string]: string } & string, mti: string) {
    super(dataElements, mti);
    this.header = "ISO026000050";
    this.mti = "0200";
  }
  /**
   *
   * bitmap binary con condicionales:
   * 1011001000111000110001001000000100101000111000011000010000011110
   *
   * bitmap hexadecimal con condicionales:
   * B238C48128E1841E
   *
   * bitmap binary sin condicionales:
   * 1011001000111000110001000000000100101000101000011000000000011010
   *
   * bitmap hexadecimal sin condicionales:
   * B238C40128A1801A
   */

  private bitmap: string = "";
  public getBitmap(): string {
    let DEs = numberOfDataElements(this.fields); // DEs sin condicionales
    let json_bitmap = util_hexa_bin_Bitmap(DEs);
    this.bitmap = json_bitmap.hexaPB;
    return this.bitmap;
  }

  getMessage(): string {
    let msg = "";
    msg = msg.concat(this.header, this.mti, this.bitmap);
    const keys = Object.keys(this.fields);
    for (let i = 0; i < keys.length; i++) {
      if (this.fields[keys[i]][3]) {
        msg = msg.concat(this.fields[keys[i]][4].toString());
      }
    }
    return msg;
  }
  getMti(): string {
    return this.mti;
  }
  getFields(): {
    [keys: string]: (string | number | boolean)[];
  } {
    return this.fields;
  }
}
