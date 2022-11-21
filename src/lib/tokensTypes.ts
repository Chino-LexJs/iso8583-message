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

export { Token_C4, Token_ES, Token_EW, Token_EX, Token_EZ, Token_Q1, Token_Q2 };
