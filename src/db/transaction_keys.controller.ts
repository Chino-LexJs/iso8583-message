import { pool } from "./db";

/**
 * @function getTransaction_keys
 * @desc devuelve el getTransaction_keys guardado en la base de datos segun id_terminal enviado por parametro
 * @param {number} id_terminal id de terminal relacionada con transaction_keys
 * @returns {Promise<any>}
 */
async function getTransaction_keys(id_terminal: string): Promise<any> {
  try {
    let res: any = await pool.query(
      `SELECT * FROM transaction_keys WHERE id_terminal = "${id_terminal}"`
    );
    return res[0][0];
  } catch (error) {
    console.log(error);
  }
}

export { getTransaction_keys };
