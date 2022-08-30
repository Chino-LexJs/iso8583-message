import { Request_Payment, Terminal_InitKeys } from "../lib/messageTypes";

interface message_request {
  id_folio: number;
  mti: string;
  content: Request_Payment;
}

interface folio {
  id_terminal: string;
  date_folio: Date;
  monto_folio: number;
}

export { message_request, folio };
