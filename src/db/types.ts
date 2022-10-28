import { Request_Payment, Execute_Payment } from "../lib/messageTypes";

interface terminal_request {
  terminal_id: string;
  timestamp: string;
  request: Request_Payment;
}

interface message_execute_Payment {
  id_folio: number;
  mti: string;
  content: Execute_Payment;
}

interface tansaction_keys {
  id_terminal: string;
  timestamp: string;
  check_value: string;
  crc32: string;
  name: string;
  rsa: string;
  ksn: string;
  workkey_key: string;
}

interface echo_test {
  timestamp: string;
  res: boolean;
}

export {
  terminal_request,
  message_execute_Payment,
  tansaction_keys,
  echo_test,
};
