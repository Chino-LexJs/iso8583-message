export interface Terminal_InitKeys {
  DATE_TIME: string;
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

export interface Token_ES {
  version: string; // terminal
  n_serie: string; // terminal
  bines_caja: string; // bd
  bines_pinpad: string; // bd
  bines_version: string; // bd
  llave: string; // server
}

export interface Token_EW {
  rsa: string, // terminal
  check_value: string // terminal
  rsa_name: string, // terminal 
  crc32: string // terminal
}
