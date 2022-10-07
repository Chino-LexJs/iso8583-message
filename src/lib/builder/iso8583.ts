import { unpack } from "./unpack";

export class iso8583 implements unpack {
  P1!: string;
  P3!: string;
  P4!: string;
  P7!: string;
  P11!: string;
  P12!: string;
  P13!: string;
  P17!: string;
  P18!: string;
  P22!: string;
  P25!: string;
  P32!: string;
  P35!: string;
  P37!: string;
  P38!: string;
  P39!: string;
  P41!: string;
  P42!: string;
  P43!: string;
  P44!: string;
  P45!: string;
  P48!: string;
  P49!: string;
  P54!: string;
  P60!: string;
  P61!: string;
  P62!: string;
  P63!: string;
  P70!: string;
  P90!: string;
  P95!: string;
  P100!: string;
  P102!: string;
  P120!: string;
  P121!: string;
  P122!: string;
  P123!: string;
  P125!: string;
  P126!: string;
  constructor() {}
  getP1(): string {
    return this.P1;
  }
  getP3(): string {
    return this.P3;
  }
  getP4(): string {
    return this.P4;
  }
  getP7(): string {
    return this.P7;
  }
  getP11(): string {
    return this.P11;
  }
  getP12(): string {
    return this.P12;
  }
  getP13(): string {
    return this.P13;
  }
  getP17(): string {
    return this.P17;
  }
  getP18(): string {
    return this.P18;
  }
  getP22(): string {
    return this.P22;
  }
  getP25(): string {
    return this.P25;
  }
  getP32(): string {
    return this.P32;
  }
  getP35(): string {
    return this.P35;
  }
  getP37(): string {
    return this.P37;
  }
  getP38(): string {
    return this.P38;
  }
  getP39(): string {
    return this.P39;
  }
  getP41(): string {
    return this.P41;
  }
  getP42(): string {
    return this.P42;
  }
  getP43(): string {
    return this.P43;
  }
  getP44(): string {
    return this.P44;
  }
  getP45(): string {
    return this.P45;
  }
  getP48(): string {
    return this.P48;
  }
  getP49(): string {
    return this.P49;
  }
  getP54(): string {
    return this.P54;
  }
  getP60(): string {
    return this.P60;
  }
  getP61(): string {
    return this.P61;
  }
  getP62(): string {
    return this.P62;
  }
  getP63(): string {
    return this.P63;
  }
  getS70(): string {
    return this.P70;
  }
  getS90(): string {
    return this.P90;
  }
  getS95(): string {
    return this.P95;
  }
  getS100(): string {
    return this.P100;
  }
  getS102(): string {
    return this.P102;
  }
  getS120(): string {
    return this.P120;
  }
  getS121(): string {
    return this.P121;
  }
  getS122(): string {
    return this.P122;
  }
  getS123(): string {
    return this.P123;
  }
  getS125(): string {
    return this.P125;
  }
  getS126(): string {
    return this.P126;
  }

  /**
   * SETERS para los data elements
   */

  setP1(data: string): unpack {
    this.P1 = data;
    return this;
  }
  setP3(data: string): unpack {
    this.P3 = data;
    return this;
  }
  setP4(data: string): unpack {
    this.P4 = data;
    return this;
  }
  setP7(data: string): unpack {
    this.P7 = data;
    return this;
  }
  setP11(data: string): unpack {
    this.P11 = data;
    return this;
  }
  setP12(data: string): unpack {
    this.P12 = data;
    return this;
  }
  setP13(data: string): unpack {
    this.P13 = data;
    return this;
  }
  setP17(data: string): unpack {
    this.P17 = data;
    return this;
  }
  setP18(data: string): unpack {
    this.P18 = data;
    return this;
  }
  setP22(data: string): unpack {
    this.P22 = data;
    return this;
  }
  setP25(data: string): unpack {
    this.P25 = data;
    return this;
  }
  setP32(data: string): unpack {
    this.P32 = data;
    return this;
  }
  setP35(data: string): unpack {
    this.P35 = data;
    return this;
  }
  setP37(data: string): unpack {
    this.P37 = data;
    return this;
  }
  setP38(data: string): unpack {
    this.P38 = data;
    return this;
  }
  setP39(data: string): unpack {
    this.P39 = data;
    return this;
  }
  setP41(data: string): unpack {
    this.P41 = data;
    return this;
  }
  setP42(data: string): unpack {
    this.P42 = data;
    return this;
  }
  setP43(data: string): unpack {
    this.P43 = data;
    return this;
  }
  setP44(data: string): unpack {
    this.P44 = data;
    return this;
  }
  setP45(data: string): unpack {
    this.P45 = data;
    return this;
  }
  setP48(data: string): unpack {
    this.P48 = data;
    return this;
  }
  setP49(data: string): unpack {
    this.P49 = data;
    return this;
  }
  setP54(data: string): unpack {
    this.P54 = data;
    return this;
  }
  setP60(data: string): unpack {
    this.P60 = data;
    return this;
  }
  setP61(data: string): unpack {
    this.P61 = data;
    return this;
  }
  setP62(data: string): unpack {
    this.P62 = data;
    return this;
  }
  setP63(data: string): unpack {
    this.P63 = data;
    return this;
  }
  setS70(data: string): unpack {
    this.P70 = data;
    return this;
  }
  setS90(data: string): unpack {
    this.P90 = data;
    return this;
  }
  setS95(data: string): unpack {
    this.P95 = data;
    return this;
  }
  setS100(data: string): unpack {
    this.P100 = data;
    return this;
  }
  setS102(data: string): unpack {
    this.P102 = data;
    return this;
  }
  setS120(data: string): unpack {
    this.P120 = data;
    return this;
  }
  setS121(data: string): unpack {
    this.P121 = data;
    return this;
  }
  setS122(data: string): unpack {
    this.P122 = data;
    return this;
  }
  setS123(data: string): unpack {
    this.P123 = data;
    return this;
  }
  setS125(data: string): unpack {
    this.P125 = data;
    return this;
  }
  setS126(data: string): unpack {
    this.P126 = data;
    return this;
  }
}
