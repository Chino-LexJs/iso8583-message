import { pool } from "./db";

export async function saveMessage(
  folio_id: number,
  msj: { [key: string]: string },
  mti: string,
  origen: string,
  destino: string
) {
  const text_mensaje =
    "INSERT INTO mensaje(folio_id, mti, origen, destino, contenido) VALUES($1,$2,$3,$4,$5) RETURNING *";
  const values_mensaje = [folio_id, mti, origen, destino, msj];
  await pool.query(text_mensaje, values_mensaje);
}
