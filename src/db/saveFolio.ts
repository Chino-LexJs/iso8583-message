import { pool } from "./db";

export async function saveFolio(
  terminal_id: string,
  monto: string
): Promise<any> {
  try {
    const text =
      "INSERT INTO folio (terminal_id, date_folio, monto_folio) VALUES (?)";
    const now = new Date();
    const values = {
      terminal_id: terminal_id,
      date_folio: now,
      monto_folio: monto,
    };
    const res = await pool.query(
      "INSERT INTO folio (terminal_id, date_folio, monto_folio) VALUES (?,?,?)",
      [values.terminal_id, values.date_folio, values.monto_folio]
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}
