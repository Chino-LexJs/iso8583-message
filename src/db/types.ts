import { Request_Payment, Terminal_InitKeys } from "../lib/messageTypes";

interface message_request {
  id_folio: number;
  mti: string;
  content: Request_Payment;
}

interface message_request_initKeys {
  id_folio: number;
  mti: string;
  content: Terminal_InitKeys;
}

interface folio {
  id_terminal: string;
  date_folio: Date;
  monto_folio: number;
}

export { message_request, message_request_initKeys, folio };
