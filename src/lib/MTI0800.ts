import { ISO8583 } from "./8583";

export class MTI0800 extends ISO8583 {
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
   * Primary bitmap:	8200000000000000
   * Secondary bitmap:	4000000000000000
   */
  private bitmap: string = "8200000000000000";

  /**
   * Data Element S-70
   * Sirve para identificar el status de la Red
   * Se usa en los mensajes 0800 y 0810
   */
  private NetworkManagementInformationCode: string = "301";

  public getBitmap(): string {
    return this.bitmap;
  }
  public getNetworkManagementInformationCode(): string {
    return this.NetworkManagementInformationCode;
  }

  getMessage(): string {
    /**
     * P-7 Eso significa fecha y hora el server
     * (MMDDHHMMSS)
     */
    let date = new Date();
    let TransmissionDateTime = "";
    TransmissionDateTime = TransmissionDateTime.concat(
      date.getMonth().toString(),
      date.getDay().toString(),
      date.getHours().toString(),
      date.getMinutes().toString(),
      date.getSeconds().toString()
    );
    this.fields[7][3] = true;
    this.fields[7][4] = TransmissionDateTime;
    this.fields[70][3] = true; // Se habilita el campo
    this.fields[70][4] = this.getNetworkManagementInformationCode(); // Se llena la info del campo con la correspondiente para 0800
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
