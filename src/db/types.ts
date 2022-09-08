import { Request_Payment, Execute_Payment } from "../lib/messageTypes";

interface message_request {
  mti: string;
  content: Request_Payment;
}

interface message_execute_Payment {
  id_folio: number;
  mti: string;
  content: Execute_Payment;
}

interface tansaction_keys {
  transaction_keys_id: number;
  id_terminal: string;
  timestamp: string;
  check_value: string;
  crc32: string;
  name: string;
  rsa: string;
  ksn: string;
  workkey_key: string;
}

export { message_request, message_execute_Payment, tansaction_keys };
