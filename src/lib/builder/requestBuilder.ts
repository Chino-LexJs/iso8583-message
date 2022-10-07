import { IBuilder, Message } from "./builder";

export class RequestBuilder implements IBuilder {
  private header!: string;
  private mti!: string;
  private bitmap!: string;
  private dataElements!: string;
  setHeader(): void {
    this.header = "ISO026000050";
  }
  setMti(): void {
    this.mti = "0200";
  }
  setBitmap(): void {
    this.bitmap = "B238C4810861801A";
  }
  setDataElements(data: string): void {
    this.dataElements = data;
  }
  getMessage(): Message {
    let message: Message = {
      header: this.header,
      mti: this.mti,
      bitmap: this.bitmap,
      dataElements: this.dataElements,
    };
    return message;
  }
  
}
