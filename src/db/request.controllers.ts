import { pool } from "./db";
import { message_request } from "./types";

async function getRequestById(id: number): Promise<any> {
  try {
    let res: any = await pool.query(`SELECT * FROM request WHERE id = ${id}`);
    return res[0];
  } catch (error) {
    console.log(error);
  }
}
async function saveRequest(message: message_request): Promise<any> {
  try {
    let res: any = await pool.query(
      "INSERT INTO message_request (request_id, id_folio, mti, content) VALUES (?,?,?,?)",
      [message.request_id, message.id_folio, message.mti, message.content]
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
  getRequestById,
  saveRequest,
  setResponseDataRequest,
  setReverse_idRequest,
};
