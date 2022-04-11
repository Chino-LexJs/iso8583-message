import { pool } from "./db";

export async function saveMessage(
  folio_id: number,
  msj: { [key: string]: string },
  mti: string,
  origen: string,
  destino: string
) {
  try {
    const text =
      "INSERT INTO mensaje (id_folio, mti, origen, destino, contenido) VALUES (?,?,?,?,?)";
    const values = {
      id_folio: folio_id,
      mti: mti,
      origen: origen,
      destino: destino,
      contenido: JSON.stringify(msj),
    };
    await pool.query(text, [
      values.id_folio,
      values.mti,
      values.origen,
      values.destino,
      values.contenido,
    ]);
  } catch (error) {
    console.log(error);
  }
}
