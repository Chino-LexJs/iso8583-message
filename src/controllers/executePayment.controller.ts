import { Request, Response } from "express";
import {
  getTerminal_RequestById,
  updateExecute,
} from "../db/terminal_request.controllers";
import { terminal_request } from "../db/types";
import { GetBuilder, Message } from "../lib/builder/builder";
import { Director } from "../lib/builder/director";
import {
  Execute_Payment,
  Request_Payment,
  Request_Payment_Response,
} from "../lib/messageTypes";
import { Prosa } from "../lib/Prosa";
import { TerminalCollection } from "../lib/TerminalCollection";

export const executePayment = async (req: Request, res: Response) => {
  let execute_payment: Execute_Payment = req.body;
  console.log("/executePayment\n");
  try {
    let terminal_request_DB: terminal_request = await getTerminal_RequestById(
      execute_payment.id
    );
    if (terminal_request_DB != undefined) {
      let terminal_request: Request_Payment = terminal_request_DB.request;
      let request = GetBuilder("0200");
      let director = new Director(request);
      let message: Message = await director.BuildRequestMessage(
        execute_payment,
        terminal_request
      );
      TerminalCollection.getInstance().saveConnection(execute_payment.id, res);
      let messageToProsa =
        message.header + message.mti + message.bitmap + message.dataElements;
      if (!Prosa.getInstance().isConnected) {
        Prosa.getInstance().connect();
      }
      await updateExecute(execute_payment.id, String(new Date()));
      Prosa.getInstance().getSocket().write(messageToProsa, "utf8");
      Prosa.getInstance().getSocket().write("\n");
      console.log("Mensaje enviado a Prosa:");
      console.log(messageToProsa);
      // ver respuesta de prosa en Prosa.onData() de tipo 0210
    } else {
      let response_error: Request_Payment_Response = {
        id: 0,
        rc: 3,
        rcmessage: `ERROR: No se encontro terminal_request con id: ${execute_payment.id}`,
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
  } catch (error) {
    console.log(error);
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
