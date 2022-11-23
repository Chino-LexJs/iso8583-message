import { Request_Payment, Request_Payment_Response } from "../lib/messageTypes";
import { Request, Response } from "express";
import { getTerminal } from "../db/terminal.controller";
import { saveTerminal_request } from "../db/terminal_request.controllers";
import { tansaction_keys, terminal_request } from "../db/types";
import { getTransaction_keys } from "../db/transaction_keys.controller";
import { Director } from "../lib/builder/director";
import { GetBuilder, Message } from "../lib/builder/builder";
import { Prosa } from "../lib/Prosa";
import { TerminalCollection } from "../lib/TerminalCollection";

export const requestPayment = async (req: Request, res: Response) => {
  let request_payment: Request_Payment = req.body;
  console.log("/requestPayment\n");
  console.log(req.body);
  try {
    let terminal = await getTerminal(request_payment.device.serialnr);
    if (terminal != undefined) {
      let terminal_request: terminal_request = {
        request: request_payment,
        terminal_id: request_payment.device.serialnr,
        timestamp: String(new Date()),
      };
      let terminal_requestDB_id = await saveTerminal_request(terminal_request);
      if (terminal_requestDB_id != undefined) {
        let transaction_keys: tansaction_keys = await getTransaction_keys(
          request_payment.device.serialnr
        );
        if (transaction_keys != undefined) {
          let response: Request_Payment_Response = {
            id: terminal_requestDB_id,
            rc: 0,
            rcmessage: "EN CURSO",
            servertime: String(new Date()),
            workkey: {
              check_value: transaction_keys.check_value,
              crc32: transaction_keys.crc32,
              key: transaction_keys.workkey_key,
              ksn: transaction_keys.ksn,
            },
          };
          res.send(response);
        } else {
          console.log("INICIO DE LLAVES ");
          // inicio de llaves a Prosa
          TerminalCollection.getInstance().saveConnection(
            terminal_requestDB_id,
            res
          );
          await init_keys(request_payment, terminal_requestDB_id);
        }
      } else {
        let response_error: Request_Payment_Response = {
          id: 0,
          rc: 3,
          rcmessage: "ERROR: No se pudo almacenar request",
          servertime: String(new Date()),
          workkey: {
            check_value: "",
            crc32: "",
            key: "",
            ksn: "",
          },
        };
        res.send(response_error);
      }
    } else {
      let response_error: Request_Payment_Response = {
        id: 0,
        rc: 2,
        rcmessage: "ERROR: No se encuentra terminal en data base",
        servertime: String(new Date()),
        workkey: {
          check_value: "",
          crc32: "",
          key: "",
          ksn: "",
        },
      };
      res.send(response_error);
    }
  } catch (error: any) {
    let response_error: Request_Payment_Response = {
      id: 0,
      rc: -1,
      rcmessage: "ERROR",
      servertime: String(new Date()),
      workkey: {
        check_value: "",
        crc32: "",
        key: "",
        ksn: "",
      },
    };
    res.send(response_error);
  }
};

const init_keys = async (
  request_payment: Request_Payment,
  terminal_requestDB_id: number
) => {
  let initKeys = GetBuilder("0200");
  let director = new Director(initKeys);
  let message: Message = await director.BuildInitKeyMessage(
    request_payment,
    terminal_requestDB_id
  );
  console.log("\nMensaje a prosa:");
  console.log(message);
  let messageToProsa =
    message.header + message.mti + message.bitmap + message.dataElements;
  Prosa.getInstance().getSocket().write(messageToProsa, "utf8");
  Prosa.getInstance().getSocket().write("\n");
  console.log("Mensaje enviado a Prosa");
};
