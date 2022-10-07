import { pool } from "./db";
import { tansaction_keys } from "./types";

/**
 * @function getTransaction_keys
 * @desc devuelve el getTransaction_keys guardado en la base de datos segun id_terminal enviado por parametro
 * @param {number} terminal_id id de terminal relacionada con transaction_keys
 * @returns {Promise<any>}
 */
async function getTransaction_keys(terminal_id: string): Promise<any> {
  try {
    let res: any = await pool.query(
      `SELECT * FROM transaction_keys WHERE terminal_id = "${terminal_id}"`
    );
    return res[0][0];
  } catch (error) {
    console.log(error);
  }
}
async function saveTransaction_keys(tk: tansaction_keys): Promise<any> {
  try {
    let res: any = await pool.query(
      "INSERT INTO transaction_keys (terminal_id, timestamp, check_value, crc32, name, rsa, ksn, workkey_key) VALUES (?,?,?,?,?,?,?,?)",
      [
        tk.id_terminal,
        tk.timestamp,
        tk.check_value,
        tk.crc32,
        tk.name,
        tk.rsa,
        tk.ksn,
        tk.workkey_key,
      ]
    );
    return res[0][0];
  } catch (error) {
    console.log(error);
  }
}

export { getTransaction_keys, saveTransaction_keys };
