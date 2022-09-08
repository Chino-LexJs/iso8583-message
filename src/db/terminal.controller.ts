import { pool } from "./db";

/**
 * @function getTerminal
 * @desc devuelve la terminal guardada en la base de datos segun el terminal_id enviado por parametro
 * @param {number} terminal_id  id de la terminal enviada desde la terminal como serial number
 * @returns {Promise<any>}
 */
async function getTerminal(terminal_id: string): Promise<any> {
  try {
    let res: any = await pool.query(
      `SELECT * FROM terminal WHERE terminal_id = "${terminal_id}"`
    );
    console.log(res);
    return res[0][0];
  } catch (error) {
    console.log(error);
  }
}

export { getTerminal };
