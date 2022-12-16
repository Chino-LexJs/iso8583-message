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

export { Token_ES, Token_EX, Token_EZ };
