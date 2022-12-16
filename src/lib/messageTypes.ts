////////// Mensajes entrantes al servidor desde la Terminal //////////

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
    serialnr: string; // Terminal ID
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

////////// Mensajes salientes del servidor a la Terminal //////////

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

export {
  Request_Payment,
  Request_Payment_Response,
  Execute_Payment,
  Execute_Payment_Response,
};
