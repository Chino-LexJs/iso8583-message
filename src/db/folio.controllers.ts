import { pool } from "./db";
import { folio } from "./types";

export async function saveFolio(folio: folio): Promise<any> {
  try {
    let res: any = await pool.query(
      "INSERT INTO folio (id_terminal, date_folio, monto_folio) VALUES (?,?,?)",
      [folio.id_terminal, folio.date_folio, folio.monto_folio]
    );
    return res[0].insertId;
  } catch (error) {
    console.log(error);
  }
}
