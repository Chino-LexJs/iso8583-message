import { Execute_Payment } from "../lib/messageTypes";
import express from "express";
import { requestPayment } from "../controllers/requestPayment.controller";
const router = express.Router();

// requestPayment
router.post("/requestPayment", requestPayment);

// executePayment
// router.post("/executePayment", async (req, res) => {
//   let execute_payment: Execute_Payment = req.body;
//   console.log("/executePayment\n");
//   console.log(req.body);
//   let terminal: Terminal = new Terminal(res);
//   await terminal.executePayment(execute_payment);
// });

module.exports = router;
