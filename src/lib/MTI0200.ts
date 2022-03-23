import { ISO8583 } from "./8583";

export class MTI0200 extends ISO8583 {
  then(arg0: (msj0200: any) => void) {
    throw new Error("Method not implemented.");
  }
  constructor(
    bitmap: string,
    dataElements: string[],
    mti: string,
    header: string
  ) {
    super(bitmap, dataElements, mti, header);
  }
  /**
   *
   * Primary bitmap de la TERMINAL: 3238048028808002
   *
   * Primary bitmap para PROSA:	    B238C48108E1841E
   * Secondary bitmap para PROSA:	  0000004210000199
   */
  private bitmap: string = "B238C48108E1841E";

  public getBitmap(): string {
    return this.bitmap;
  }

  getMessage(): string {
    let msg = "";
    msg = msg.concat(this.header, this.mti, this.bitmap);
    const keys = Object.keys(this.fields);
    for (let i = 0; i < keys.length; i++) {
      if (this.fields[parseInt(keys[i])][3]) {
        msg = msg.concat(this.fields[parseInt(keys[i])][4].toString());
      }
    }
    return msg;
  }
  getMti(): string {
    return this.mti;
  }
}
