import { pool } from "./db";

export async function saveFolio(
  terminal_id: string,
  monto: string
): Promise<number> {
  const text =
    "INSERT INTO folio(terminal_id, date_folio,monto_folio) VALUES($1, $2, $3) RETURNING *";
  const now = new Date();
  const values = [terminal_id, now, monto];
  const res = await pool.query(text, values);
  return res.rows[0].folio_id;
}
