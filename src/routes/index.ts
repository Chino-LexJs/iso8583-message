import express from "express";
import { requestPayment } from "../controllers/requestPayment.controller";
import { executePayment } from "../controllers/executePayment.controller";
const router = express.Router();

// requestPayment
router.post("/requestPayment", requestPayment);

// executePayment
router.post("/executePayment", executePayment);

module.exports = router;
