interface Execute_Payment {
  id: number;
  type: string;
  authentication: string;
  cardInformation: {
    bin: string;
    cvv_length: number;
    cvv_present: boolean;
    emv_tags: string;
    failed_counter: number;
    cardholder: string;
    last4: string;
    counter: number;
    serial_key: string;
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
  servertime: string;
  rc: number;
  rcmessage: string;
  id: number;
  workkey: {
    ksn: string;
    key: string;
    crc32: string;
    check_value: string;
  };
}

interface Execute_Payment_Response {
  request_id: number;
  request_date: string;
  request_status: boolean;
  id: string; // Acquiring Intitution ID Code
  trace_id: number;
  authorization: string;
  description: string; // APROBADA | DESARPOBADA
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

interface Terminal_Response {
  MTI: string;
  PROCESSING_CODE: string;
  AMOUNT: string;
  TRASMISSION_DATE_TIME: string;
  SYSTEM_TRACE_AUDIT_NUMBER: string;
  LOCAL_TRANSACTION_TIME: string;
  RETRIEVAL_REFERENCE_NUMBER: string;
  AUTHORIZATION_ID_RESPONSE: string;
  RESPONSE_CODE: string;
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

interface Token_ES {
  version: string; // terminal
  n_serie: string; // terminal
  bines_caja: string; // bd
  bines_pinpad: string; // bd
  bines_version: string; // bd
  llave: string; // server
}

interface Token_EZ {
  serial_key: string;
  counter: number;
  failed_counter: number;
  track2_flag: string;
  read_mode: string;
  track2_length: number;
  cvv_flag: string;
  cvv_length: number;
  track_flag: string;
  track2: string;
  last4: string;
  crc32: string;
}

interface Token_EX {
  key_cifrada: string;
  ksn: string;
  check_value: string;
  status: string;
  crc32: string;
}

interface Token_EW {
  rsa: string; // terminal
  check_value: string; // terminal
  rsa_name: string; // terminal
  crc32: string; // terminal
}

interface Token_Q1 {
  id_authMode: string;
  id_validMode: string;
}

interface Token_Q2 {
  id_authMode: string;
}

interface Token_C4 {
  ind_terminal: string;
  term_oper_ind: string;
  loc_terminal: string;
  ind_tarjeth: string;
  ind_tarjet: string;
  ind_cap_tarjet: string;
  ind_status: string;
  level_security: string;
  routing_ind: string;
  act_terminal: string;
  ind_cap_datos: string;
  met_ind_tarjet: string;
}

interface Data_Element {
  campo: number;
  long: number;
  value: string;
  used: boolean;
}

interface message_db {
  id_folio: number;
  msj: { [key: string]: string };
  mti: string;
  origen: string;
  destino: string;
}

export {
  Request_Payment,
  Request_Payment_Response,
  Execute_Payment,
  Execute_Payment_Response,
  Terminal_Response,
  Token_ES,
  Token_EZ,
  Token_EX,
  Token_EW,
  Token_Q1,
  Token_Q2,
  Token_C4,
  Data_Element,
  InitKeys_Response,
  message_db,
};
