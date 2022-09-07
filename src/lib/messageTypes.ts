interface Terminal_InitKeys {
  type: string; // CAMPO PARA DIFERENCIAR MSJ DE TERMINAL
  check_value: string;
  crc32: string;
  device: {
    serial: string;
    version: string;
  };
  isoType: string;
  rsa: string;
  rsa_name: string;
}

interface Terminal_Request {
  MTI: string;
  AMOUNT: string;
  DATE_TIME: string;
  ENTRY_MODE: string;
  CONDITION_CODE: string;
  TERMINAL_ID: string;
  check_value: string;
  crc32: string;
  device: {
    serial: string;
    version: string;
  };
  isoType: string;
  rsa: string;
  rsa_name: string;
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

interface Request_Payment {
  type: string; // CAMPO PARA DIFERENCIAR MSJ DE TERMINAL
  amount: number;
  authentication: string;
  cardInformation: {
    bin: string;
    cvv_length: number;
    cvv_present: boolean;
    failed_counter: number;
    holder_name: string;
    last4: string;
    real_counter: number;
    serial_key: string;
    track2: string;
    track2_crc32: string;
    track2_length: number;
  };
  device: {
    serial: string;
    version: string;
  };
  entry_mode: string;
  isoType: string;
  reference: string;
}

interface Request_Payment_Response {
  request_id: string;
  request_date: string;
  request_status: boolean;
  http_code: number;
  id: string;
  trace_id: string;
  authorization: string;
  renew_key: boolean;
  description: string;
  binInformation: {
    bin: string;
    bank: string;
    product: string;
    type: string;
    brand: string;
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

interface Token_ES {
  version: string; // terminal
  n_serie: string; // terminal
  bines_caja: string; // bd
  bines_pinpad: string; // bd
  bines_version: string; // bd
  llave: string; // server
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
  Terminal_InitKeys,
  Terminal_Request,
  Terminal_Response,
  Token_ES,
  Token_EX,
  Token_EW,
  Token_Q1,
  Token_Q2,
  Token_C4,
  Data_Element,
  Request_Payment,
  Request_Payment_Response,
  InitKeys_Response,
  message_db,
};
