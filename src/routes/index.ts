import { Terminal } from "../lib/Terminal";

import {
  Execute_Payment,
  Request_Payment,
  Request_Payment_Response,
} from "../lib/messageTypes";
import express from "express";
const router = express.Router();

// requestPayment
router.post("/requestPayment", async (req, res) => {
  let request_payment: Request_Payment = req.body;
  console.log("/requestPayment\n");
  console.log(req.body);
  let terminal: Terminal = new Terminal(res);
  let response: Request_Payment_Response = await terminal.requestPayment(
    request_payment
  );
  res.send(response);
});

// executePayment
router.post("/executePayment", async (req, res) => {
  let execute_payment: Execute_Payment = req.body;
  console.log("/executePayment\n");
  console.log(req.body);
  let terminal: Terminal = new Terminal(res);
  await terminal.executePayment(execute_payment);
});

module.exports = router;
