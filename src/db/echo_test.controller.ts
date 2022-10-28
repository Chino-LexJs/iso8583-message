import { pool } from "./db";

async function saveEcho_test(timestamp: string): Promise<any> {
  try {
    let res: any = await pool.query(
      "INSERT INTO echo_test (timestamp, res) VALUES (?,?)",
      [timestamp, false]
    );
    console.log(res);
    return res[0].insertId;
  } catch (error) {
    console.log(error);
  }
}

async function updateRes(id: number, res0810: boolean) {
  try {
    let res: any = await pool.query(
      `UPDATE echo_test SET res = ${res0810} WHERE id = ${id}`
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export { saveEcho_test, updateRes };
