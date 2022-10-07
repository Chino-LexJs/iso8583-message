import { pool } from "./db";
import { terminal_request, message_execute_Payment } from "./types";

async function getTerminal_RequestById(id: number): Promise<any> {
  try {
    let res: any = await pool.query(
      `SELECT * FROM terminal_request WHERE id = ${id}`
    );
    return res[0][0];
  } catch (error) {
    console.log(error);
  }
}
async function saveTerminal_request(message: terminal_request): Promise<any> {
  try {
    let request = JSON.stringify(message.request);
    let res: any = await pool.query(
      "INSERT INTO terminal_request (terminal_id, timestamp, request) VALUES (?,?,?)",
      [message.terminal_id, message.timestamp, request]
    );
    return res[0].insertId;
  } catch (error) {
    console.log(error);
  }
}
async function setResponseDataRequest(
  request_id: number,
  responsedate: Date,
  responsetime: Date
): Promise<any> {
  try {
    let res: any = await pool.query(
      `UPDATE request SET responsedate = ?, responsetime = ? WHERE id=${request_id};`,
      [responsedate, responsetime]
    );
    return res[0];
  } catch (error) {
    console.log(error);
  }
}
async function setReverse_idRequest(
  request_id: number,
  reverse_id: number
): Promise<any> {
  try {
    let res: any = await pool.query(
      `UPDATE request SET reverse_id = ? WHERE id=${request_id};`,
      [reverse_id]
    );
    return res[0];
  } catch (error) {
    console.log(error);
  }
}

export {
  getTerminal_RequestById,
  saveTerminal_request,
  setResponseDataRequest,
  setReverse_idRequest,
};
