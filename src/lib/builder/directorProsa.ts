import { Director } from "./director";
import { Builder } from "./builder";
import { InitKeys_Response } from "../messageTypes";
import { Token_EX } from "../tokensTypes";

export class DirectorProsa extends Director {
  constructor(builder: Builder) {
    super(builder);
  }
  public getRes0210_initKeys(): InitKeys_Response {
    let token_EX: Token_EX = this.get_tokenEX();
    let res: InitKeys_Response = {
      request_id: this.builder.getP37(), // retrieval reference number,
      request_date: this.builder.getP13(), // local transaction date,
      request_status: this.builder.getP39() == "00" ? true : false, // response code,
      http_code: 0,
      trace_id: this.builder.getP11(), // system trace audit number
      error_code: this.builder.getP32().slice(2), // Acquiring Intitution ID Code,
      description: this.builder.getP39() == "00" ? "APROBADA" : "DESAPROBADA",
      authorization: this.builder.getP38(),
      ksn: token_EX.ksn,
      key: token_EX.key_cifrada,
      key_crc32: token_EX.crc32,
      key_check_value: token_EX.check_value,
    };
    return res;
  }
}
