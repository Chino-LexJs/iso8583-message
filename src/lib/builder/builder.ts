import { EchoBuilder } from "./echoBuilder";
import { RequestBuilder } from "./requestBuilder";

/**
 * The Builder interface specifies methods for creating the different parts of
 * the Product objects.
 */
export interface IBuilder {
  setHeader(): void;
  setMti(): void;
  setBitmap(): void;
  setDataElements(data: string): void;
  getMessage(): Message;
}

export interface Message {
  header: string;
  mti: string;
  bitmap: string;
  dataElements: string;
}
export function GetBuilder(builderType: string): IBuilder {
  if (builderType == "0200") {
    return new RequestBuilder();
  }
  if (builderType == "0800") {
    return new EchoBuilder();
  }
  return new RequestBuilder();
}
