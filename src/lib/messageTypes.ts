interface Execute_Payment {
  id: number;
  type: string;
  device: {
    authentication: string;
    failcounter: number;
    realcounter: number;
    ksn: string;
  };
  cardInformation: {
    bin: string;
    cvv_length: number;
    cvv_present: boolean;
    emv_tags: string;
    cardholder: string;
    last4: string;
    track2: string;
    track2_crc: string;
    track2_length: number;
  };
}

interface Request_Payment {
  type: string;
  entry_mode: string;
  device: {
    serialnr: string;
    version: string;
    counter: number;
  };
  key: {
    check_value: string;
    crc32: string;
    name: string;
    rsa: string;
  };
  localtime: string;
  amount: string;
}

// NOTA: rc==-1: Continue to EXECUTE  rc>0: Reserve failed
interface Request_Payment_Response {
  id: number;
  rc: number;
  rcmessage: string;
  servertime: string;
  workkey: {
    ksn: string;
    key: string;
    crc32: string;
    check_value: string;
  };
}

interface Execute_Payment_Response {
  id: number; //debe de ser numerico sin leading zeros
  timestamp: string; // mandamos un timestamp de la respuesta "timestamp" YYYY-mm-dd HH:mm:ss
  rc: number; // request_status
  rcdatetime: string; // fecha y hora que proporciono Prosa en 0210
  rcmessage: string; //  (pueden ser muchos diferentes, va a depender de tabla Prosa y codigo)
  ticket: number; // folio? system trace audit number
  authorization: string; // Authorization ID Response
  keys_expired: boolean; // indica si hay que actualizar llaves
}

// ejemplo de respuesta a terminal por venta con banda magnetica de StramPay
interface Execute_Payment_ResponseStramPay {
  request_id: "5f79a4a6-6a7d-4c0f-bc9f-6af4d752107b";
  request_date: "2020-12-04 18:26:06";
  request_status: true;
  http_code: 0;
  id: "607127958470";
  trace_id: "009182";
  authorization: "001541";
  renew_key: false;
  description: "APROBADA";
  binInformation: {
    bin: "425982";
    bank: "IXE";
    product: "CREDITO VISA CLASICA ";
    type: "CREDITO";
    brand: "VISA";
  };
}

interface InitKeys_Response {
  request_id: string;
  request_date: string;
  request_status: boolean;
  http_code: number;
  trace_id: string;
  error_code: string;
  description: string;
  authorization: string;
  ksn: string;
  key: string;
  key_crc32: string;
  key_check_value: string;
}

interface Data_Element {
  campo: number;
  long: number;
  value: string;
  used: boolean;
}

export {
  Request_Payment,
  Request_Payment_Response,
  Execute_Payment,
  Execute_Payment_Response,
  Data_Element,
  InitKeys_Response,
};
