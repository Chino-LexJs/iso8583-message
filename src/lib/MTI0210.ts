import { ISO8583 } from "./8583";

export class MTI0210 extends ISO8583 {
  getMti(): string {
    throw new Error("Method not implemented.");
  }
  constructor(msg: { [key: number]: string }, mti: string, header: string) {
    super(msg, mti, header);
  }

  /**
   *
   * B23884812ED1841E00000042140001CC
   * Primary bitmap:	B23884812ED1841E
   * Secondary bitmap:	00000042140001CC
   */
  private bitmap: string = "B23884812ED1841E";

  getMessage(): string {
    /**
     *
     * B23884812ED1841E00000042140001CC
     * Primary bitmap:	B23884812ED1841E
     * Secondary bitmap:	00000042140001CC
     */
    this.fields[1][3] = true;
    this.fields[1][4] = "00000042140001CC";
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
}
