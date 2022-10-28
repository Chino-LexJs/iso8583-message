import { IBuilder, Message } from "./builder";

export class EchoBuilder implements IBuilder {
  private header!: string;
  private mti!: string;
  private bitmap!: string;
  private dataElements!: string;
  setHeader(): void {
    this.header = "ISO006000050";
  }
  setMti(): void {
    this.mti = "0800";
  }
  setBitmap(): void {
    this.bitmap = "8220000000000000";
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
