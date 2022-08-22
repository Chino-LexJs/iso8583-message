import { message_db } from "../lib/messageTypes";
import { pool } from "./db";

/**
 * @function getMessage
 * @desc devuelve el mensaje guardado en la base de datos segun el trace number enviado por parametro
 * @param {number} tracenr es el System Trace Audit Number (P-11) y Retrieval Reference Number (P-37)
 * @returns {Promise<any>}
 */
async function getMessage(tracenr: number): Promise<any> {
  try {
    let res: any = await pool.query(
      `SELECT * FROM mensaje WHERE tracenr = ${tracenr}`
    );
    return res[0][0];
  } catch (error) {
    console.log(error);
  }
}
/**
 * @function getMessageById
 * @desc devuelve el mensaje guardado en la base de datos segun el id por parametro
 * @param {number} id id del mensaje almacenado en la base de datos
 * @returns {Promise<any>}
 */
async function getMessageById(id: number): Promise<any> {
  try {
    let res: any = await pool.query(`SELECT * FROM message WHERE id = ${id}`);
    return res[0][0];
  } catch (error) {
    console.log(error);
  }
}
/**
 * @function saveMessage
 * @desc almacena un mesaje en la base de datos dado los parametros
 * @param {message_db} msg
 * @returns {Promise<any>}
 */
async function saveMessage(msg: message_db): Promise<any> {
  try {
    let { destino, id_folio, msj, mti, origen } = msg;
    let res: any = await pool.query(
      "INSERT INTO mensaje (id_folio, mti, origen, destino, contenido) VALUES (?,?,?,?,?)",
      [id_folio, mti, origen, destino, JSON.stringify(msj)]
    );
    return res[0].insertId;
  } catch (error) {
    console.log(error);
  }
}

export { getMessage, getMessageById, saveMessage };
